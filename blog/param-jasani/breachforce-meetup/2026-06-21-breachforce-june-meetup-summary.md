---
slug: breachforce-mumbai-meetup-june26-summary
title: Summary of Breachforce Meetup, Mumbai held on 21st June 2026 
authors: [param-jasani]

tags:
  - Docker
  - K8s
  - Kubernetes
  - Containers
  - Pods
  - Breachforce-Meetup-Mumbai-Summary

date: 2026-06-21T19:00:00.000Z

description: >
  This blog is a summary of talk held at Breachforce Meetup, Mumbai held on 21st June 2026.
---
This blog is a summary of talk held at Breachforce Meetup, Mumbai held on 21st June 2026.

<!-- truncate -->

## "Kubernetes Penetration Testing & Configuration Review" by **Abhishek Pal**

### Introduction

#### The Evolution: From Physical Servers to Containers
* **Physical Servers:** Originally, applications ran on single physical servers. This caused resource allocation issues; if one application spiked in resource usage, others would underperform. Scaling meant buying and maintaining more physical hardware, which was expensive and inefficient.
* **Virtualization (VMs):** To solve this, virtualization was introduced. It allowed multiple *Virtual Machines (VMs)* to run on a single physical server. Each VM has its own full *Operating System (OS)* and virtualized hardware. This improved resource utilization and isolation, but VMs were heavy, slow to boot, and consumed significant overhead since each required a full OS.
* **Containers:** Containers were created to solve the "heavyweight" problem of VMs. Instead of virtualizing the hardware, <mark>containers virtualize the Operating System</mark>. They share the host OS kernel but run in isolated user spaces. This makes them *extremely lightweight, fast to boot, and highly portable*.

#### Core Linux Technologies Behind Containers
Containerization relies heavily on two native Linux kernel features:
* **Namespaces:** Provide *process isolation*. They ensure that a container only sees its own restricted view of the system (e.g., its own process ID tree, network interfaces, and mount points).
* **cgroups (Control Groups):** Provide *resource management*. They limit and monitor the amount of resources (CPU, memory, disk I/O) that a specific container can use, preventing one container from exhausting the host's resources.

#### The Emergence of Docker
* While container technologies existed in Linux (like LXC), they were complex to use and manage.
* **Docker** came into place to democratize containerization. It provided a simple, user-friendly interface, a standardized image format, and robust tooling to easily build, ship, and run containers anywhere, which sparked the modern container revolution.

#### Docker vs Kubernetes
* **Docker** is a platform used to *create, share, and run* individual containers.
* **Kubernetes** is an orchestration system used to *manage, scale, and orchestrate* multiple containers across a cluster of machines.

#### Container Registry
* A centralized repository where container images are stored, managed, and distributed (e.g., *Docker Hub*, *Amazon ECR*, *Google Container Registry*).
* Organizations often use a **Private Registry** to securely store their proprietary container images. A major advantage of container images is that when small changes are made to the application, only the modified layers need to be rebuilt and pushed to the registry. We can quickly reuse the rest of the image layers when spinning it up again, making deployments extremely fast and efficient.

### Core Kubernetes Concepts

#### What are Pods?
* The **smallest and simplest** Kubernetes object. A Pod represents a single instance of a running process in your cluster and can contain one or more containers.

#### Other Key Resources
* **Namespace:** Provides a mechanism for isolating groups of resources within a single cluster.
* **Replica Set:** Ensures that a specified number of pod replicas are running at any given time.
* **Deployment:** Provides declarative updates for Pods and ReplicaSets.
* **ConfigMap:** Used to store non-confidential data in key-value pairs, keeping environment-specific configuration decoupled from image content.
* **Secret:** Used to store sensitive information, such as passwords, OAuth tokens, and SSH keys. (Encoded, not encrypted, by default).
* **Volume:** A directory containing data, accessible to the containers in a pod.
* **Persistent Volume (PV):** A piece of storage in the cluster that has a lifecycle independent of any individual pod that uses it.
* **Persistent Volume Claim (PVC):** A request for storage resources made by a user or application.
* **Ingress:** An API object that manages external access to the services in a cluster, typically HTTP.

### Structure of a Kubernetes YAML File
To deploy resources in Kubernetes, we use YAML manifests. Here is a breakdown of the key elements in a standard Deployment manifest:

* `apiVersion`: Specifies the Kubernetes API version being used (e.g., `apps/v1`).
* `kind`: Indicates the type of Kubernetes object being created (e.g., `Deployment`).
* `metadata.name`: Specifies the name of the deployment resource.
* `spec.replicas`: Defines the number of Pods to run at any time.
* `spec.strategy.rollingUpdate.maxSurge`: The maximum number of Pods to be created on top of the desired count during deployment.
* `spec.strategy.rollingUpdate.maxUnavailable`: The maximum number of Pods that can be unavailable during deployment.
* `spec.selector.matchLabels` and `spec.template.metadata.labels`: Both labels should match to create a Pod.
* `spec.template.metadata`: Defines the Pod manifest.
* `spec.template.spec.containers.name`: The name of the container within the pod.
* `spec.template.spec.containers.image`: The name of the container image to pull and run.
* `spec.template.spec.containers.ports.containerPort`: The application listening/running port.

<div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/deployment-manifest-nginx-k8s.PNG"
      alt="Example of a Kubernetes Deployment Manifest YAML structure"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 1:</strong> Example of a Kubernetes Deployment Manifest YAML structure
    </figcaption>
  </figure>
</div>

### Kubernetes Components
A Kubernetes cluster consists of a set of worker machines, called nodes, that run containerized applications. Every cluster has at least one worker node.

<div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/Kubernetes-Architecture-Diagram.jpg"
      alt="Kubernetes Cluster Architecture Diagram"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 2:</strong> Kubernetes Cluster Architecture Diagram
    </figcaption>
  </figure>
</div>

#### Control Plane (Master Node)
The Control Plane manages the worker nodes and the Pods in the cluster.
* **API Server:** The central management entity that receives all REST requests and serves as the front end for the Kubernetes control plane.
* **etcd:** A consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data.
* **Scheduler:** Watches for newly created Pods with no assigned node, and selects a node for them to run on.
* **Controller Manager:** Think of the Controller Manager as a continuous **state machine**. It constantly monitors two states: the *Desired State* (which we provide via YAML manifests) and the *Current State* (the actual running state of the cluster). If the current state is not equivalent to the desired state, it takes action to bring it to the desired state. This is exactly how **self-healing** is achieved in Kubernetes.
  > **Integration Example:** Security tools like **Qualys VMDR** can coordinate with the Controller Manager. When a vulnerability is found and patched, Qualys can trigger an update to the desired state, prompting the Controller Manager to gracefully roll out the patched containers while terminating the vulnerable ones, ensuring zero downtime patching.
* **Cloud Controller Manager:** Embeds cloud-specific control logic, linking the cluster into the cloud provider's API.

#### Data Plane (Worker Nodes)
The Data Plane contains the components that run on every node, maintaining running pods and providing the Kubernetes runtime environment.
* **kubelet:** An agent that runs on each node in the cluster and ensures that containers are running in a Pod.
* **kube-proxy:** A network proxy that runs on each node, maintaining network rules that allow network communication to Pods from inside or outside the cluster.
* **Container Runtime:** The software that is responsible for running containers (e.g., Docker, containerd).

### Kubernetes Attack Surface & Penetration Testing
During the session, an audience member asked which area generally presents the largest attack surface: the Infrastructure, the Application, or Kubernetes itself. The speaker responded that the **Kubernetes side often presents a much larger and complex attack surface** due to its numerous components, configurations, and internal networking.

#### Approaches to Kubernetes Assessment
The assessment of a Kubernetes environment mainly follows two approaches:
* **Black Box Penetration Testing:** The penetration tester starts with no internal knowledge and **no `kubeconfig` file**. The goal is to determine how much damage an attacker can do purely from the outside (e.g., exploiting a vulnerable public-facing application to gain initial access to a pod, and then attempting to break out of the container or move laterally).
* **White/Grey Box Penetration Testing (With `kubeconfig`):** The tester is provided with a `kubeconfig` file (often simulating a compromised developer's machine or insider threat). The goal here is to assess the impact and see how far privileges can be escalated within the cluster due to misconfigurations in **RBAC (Role-Based Access Control)** or weak policies.

#### A Simple Threat Model
When modeling threats for Kubernetes, consider the following:
* **Who are the attackers?** External (from the internet), Internal (attacker in a pod), Developer (User with some access in the cluster), Malicious Administrator, or an End User.
* **What can they attack?** Cluster state storage (`etcd`), Secrets, Volumes (Data Breach), Container Images (Private Repository), or Compute Resources (e.g., for Crypto Mining).
* **How can they attack?** Configuration Weaknesses, exploiting vulnerabilities, exploiting trust across components, lack of appropriate AuthZ (Authorization) controls, or lack of security hardening.

> **Most Dangerous Finding in a K8s Pentest**
> When someone from the audience asked the speaker what was his most dangerous finding during a K8s pentest, Abhishek shared that it was <mark>**Hardcoded Credentials**</mark>.
> 
> By discovering hardcoded credentials, he was able to access the complete Kubernetes dashboard. Because there was absolutely no security hardening in place, he gained **Admin access**. From there, he changed the authorization configurations, changed user passwords to achieve complete cluster takeover, and effectively locked the client out of their own environment to demonstrate the severity of the misconfiguration.

### Recent Kubernetes Attacks (Threat Landscape)

#### 1. Kinsing Hacker Group (Cryptojacking)
The **Kinsing** hacker group has been actively exploiting various flaws to expand their botnet primarily for **Cryptojacking** (unauthorized use of compute resources to mine cryptocurrency).
* **Attack Flow:** They start by exploiting a vulnerable workload (e.g., a vulnerable Openfire server, misconfigured Redis, or an open Docker API).
* **Execution:** Once initial access is gained, they run memory-resident malware.
* **Persistence & Impact:** The malware establishes encrypted communication with their C2 (Command & Control) server, downloads shell scripts, and runs a cryptominer hidden by a rootkit to evade detection.
* **Common Vulnerabilities Exploited:** Misconfigured Remote Docker APIs (open to the internet without auth), Misconfigured Redis Servers, and various RCEs (Remote Code Execution) in WordPress, SaltStack, Apache Hadoop, etc.

#### 2. SCARLETEEL 2.0 (2024)
A highly sophisticated attack campaign targeting AWS EC2 and other Kubernetes infrastructure. It perfectly demonstrates the critical risks of lateral movement.
* **Initial Access & Execution:** The attackers exploit a public-facing web application (e.g., a vulnerable Jupyter Notebook). The malicious scripts are aware of being in a Fargate-hosted container and actively collect credentials.
* **Information Gathering & Escalation:** They install tools like AWS CLI, `pacu`, and `peirates`. They attempt to exploit **IMDSv2** to retrieve tokens and subsequently AWS credentials.
* **Privilege Escalation & Persistence:** By escalating to Admin in the victim's AWS account, they spin up EC2 instances running miners. They use `peirates` to further exploit Kubernetes and frequently change C2 domains (utilizing public services) for defense evasion.


> **Container-to-Kubernetes Lateral Movement**
> 
> SCARLETEEL 2.0 highlights the severe danger of <mark>**Container-to-Kubernetes Lateral Movement**</mark>, where a single container compromise can lead to a full Kubernetes account breach.
> 
> When questioned about this lateral movement, the speaker clarified:
> * By default, Kubernetes is relatively secure due to modern **RBAC (Role-Based Access Control)** mechanisms.
> * However, if an attacker successfully escapes a container, they might gain access to the underlying platform (like minikube) and use command-line tools like `kubectl` to interact with the cluster.
> * **The "Complete Mess" of Caveats:** In reality, lateral movement can take many convoluted paths:
>   * **Container to Container:** Jumping to a container that has higher privileges or sensitive credentials mounted.
>   * **Container to Cluster:** Gaining direct API access to the Kubernetes cluster from within the compromised pod.
>   * **Container to Runtime:** Accessing the container runtime itself (e.g., containerd, docker, cri-o).
>   * **Container to Node (Host):** In cases of misconfigured shared mounts, an attacker might achieve arbitrary file writes on the host file system. This allows them to break out to the underlying node and potentially steal highly privileged credentials.

### Common Initial Attack Vectors (How They Get In)
According to the presentation, attackers typically gain their initial foothold through the following vectors:
* <mark>**Misconfigurations (#1 Cause):**</mark> This includes exposing the Kubernetes API server to the internet, having overly permissive RBAC roles (especially `cluster-admin` bound to default service accounts), storing secrets in plaintext or environment variables, and running containers with `privileged: true` or as root.
* **Unpatched Software:** Failing to update Kubernetes components (`kube-apiserver`, `kubelet`), container runtimes (like runc vulnerabilities e.g., **CVE-2024-21626**), or workloads.
* **Compromised Credentials:** Stolen Kubernetes provider IAM keys, service account tokens, or developer CI/CD credentials.
* **Vulnerable Applications:** Web applications running inside containers with common vulnerabilities (like SQLi or RCE) that provide an initial foothold.

### Scrutiny Weaponized for Silent Cryptojacking
A growing trend in the threat landscape is the weaponization of legitimate security tools:
* Attackers run legitimate open-source auditing tools like **kubeaudit** and **kubescape** inside compromised clusters to actively identify misconfigurations they can exploit. This allows them to deploy hidden, low-resource cryptojacking containers that evade typical monitoring.
* Another vector involves attackers uploading malicious container images or Helm charts (embedded with cryptominers or credential stealers) to public repositories like Docker Hub. Developers who pull these images without proper vetting inadvertently compromise their entire clusters.

---

### Hands-On Lab: Kubernetes Goat Walkthrough
Abhishek ensured the session was highly interactive by providing attendees with a pre-configured Ubuntu Virtual Machine (OVA file). This lab environment had everything completely set up for us—a huge shoutout and credit to the speaker for removing the friction of setting up a local cluster!

The lab heavily featured **Kubernetes Goat**, an intentionally vulnerable cluster environment created by **Madhu Akula**, designed to help security professionals learn and practice Kubernetes security practically. 

#### Setting up the Lab Environment
Getting the lab running inside the VM was straightforward:
1. **Start the cluster:** We simply ran `minikube start` to spin up our local Kubernetes control plane and worker nodes.
   <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/minikube-start.png"
      alt="Starting the local minikube cluster inside the Ubuntu VM"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 3:</strong> Starting the local minikube cluster inside the Ubuntu VM
    </figcaption>
  </figure>
</div>

2. **Expose Kubernetes Goat:** We navigated to the `kubernetes-goat` directory and ran the provided script: `bash access-kubernetes-goat.sh`. This automatically created the necessary port forwards (e.g., ports 1230 to 1236) and hosted the vulnerable application guide locally on `http://127.0.0.1:1234`.
   <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/kubegoat-deply.png"
      alt="Setting up and exposing Kubernetes Goat locally"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 4:</strong> Setting up and exposing Kubernetes Goat locally
    </figcaption>
  </figure>
</div>

#### Scenario 1: Sensitive Keys in Codebases
Abhishek kicked off the walkthrough with the first scenario: *Sensitive keys in codebases*.

* In modern CI/CD and GitOps workflows, developers sometimes accidentally commit sensitive information to version control systems.
* The vulnerability often stems from web servers misconfigured to serve the `.git` directory publicly. An attacker can navigate to `url.com/.git/config` to verify the exposure.
* The attacker downloads the `.git` directory locally using `git-dumper`. From there, they can view the commit history, find previous commit hashes, and change the `HEAD` to an older commit. In the walkthrough demonstration, reverting to an older commit revealed a `.env` file that had been accidentally committed, ultimately exposing highly sensitive application credentials.

#### Scenario 2: Container Escape to the Host System
The second example demonstrated a critical vulnerability: breaking out of a container to gain access to the underlying host node.

* Abhishek started by running `capsh --print` inside the compromised pod. This command prints the current capabilities of the container, including the Bounding set and Ambient set, which helps attackers understand what privileged actions they are allowed to perform.
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/capsh-demo.png"
      alt="Demonstration of using capsh to view container capabilities"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 5:</strong> Demonstration of using capsh to view container capabilities
    </figcaption>
  </figure>
</div>

* He then demonstrated that a misconfigured shared mount allowed him to see the host's filesystem by running `ls /host-system/`. 
* By executing `chroot /host-system bash`, the attacker effectively breaks out of the container's isolated filesystem and drops into a root shell on the underlying host node.
* Once on the host, Abhishek ran `crictl pods`, successfully listing all pods running on that specific node, demonstrating a complete node compromise.

#### Scenario 3: RBAC Least Privileges Misconfiguration
The final scenario highlighted the dangers of overly permissive Role-Based Access Control (RBAC), a common issue addressed in Madhu Akula's blogs.

* Developers and DevOps teams often assign extra privileges to service accounts to ensure things "just work." In this scenario, a pod is only supposed to have access to a `webhookapikey`, but due to a misconfiguration, the attached service account has broader permissions.
* From inside the pod, the attacker navigates to `/var/run/secrets/kubernetes.io/serviceaccount/` to find the mounted service account credentials (`ca.crt`, `namespace`, and `token`).
* By exporting these values into environment variables (`TOKEN`, `CACERT`, `APISERVER`), the attacker uses `curl` to authenticate directly with the Kubernetes API Server.
* Running a command like `curl --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/secrets` successfully dumps all secrets in the namespace (including a highly sensitive `vaultapikey`). This perfectly illustrates how failing to implement the principle of least privilege can turn a minor pod compromise into a massive data breach.

---

### Telemetry, Dashboards, and Auditing Tools
The latter half of the presentation shifted focus towards defense, monitoring, and automated auditing.

#### Defending with Falco
Abhishek emphasized the importance of runtime security monitoring. He showcased **Falco** as a vital tool for SOC teams.
* **Why Falco?** It provides crucial telemetry, allowing security teams to detect anomalous behavior in real-time. If a penetration tester (or a malicious actor) manages to execute commands or manipulate files within a Kubernetes environment, Falco generates alerts based on those runtime events.
* In the Kubernetes Goat lab, this was demonstrated via the *Falco - Runtime security monitoring & detection* scenario, showing how easily it can be deployed using Helm charts.

#### The Dangers of an Unsecured Kubernetes Dashboard
After a short break, the session resumed with Abhishek deploying the official Kubernetes Dashboard using the `minikube dashboard` command. 
* He explicitly discussed the severe consequences of leaving this dashboard unsecured and exposed to the internet. 
* **The Impact:** An attacker gaining access to the dashboard can easily view the entire workload status (Deployments, Pods, Replica Sets). More critically, they can inspect YAML configurations, view namespace details, read pod logs, delete images, and even gain direct SSH/exec access into running containers straight from the browser interface.
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/minikube-dashboard.png"
      alt="Unsecured Kubernetes Dashboard overview interface"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 6:</strong> Unsecured Kubernetes Dashboard overview interface
    </figcaption>
  </figure>
</div>

#### Automated Security Scanning Tools
To wrap up the technical demonstrations, Abhishek ran through a battery of popular open-source auditing and scanning tools to show how defenders can proactively identify the vulnerabilities discussed throughout the meetup:
* **KICS (Keeping Infrastructure as Code Secure):** He demonstrated dumping secrets from all namespaces via `kubectl` and passing them to KICS. The resulting scan report clearly highlighted exposed secrets (e.g., `k8svaultapikey` and `k8swebhookapikey`), proving its utility in finding hardcoded credentials in configurations.
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/kicksscan-output.png"
      alt="KICS scan report indicating exposed configuration secrets"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 7:</strong> KICS scan report indicating exposed configuration secrets
    </figcaption>
  </figure>
</div>

* **Kube-bench:** He then ran `kube-bench` to evaluate the cluster against CIS Kubernetes Benchmarks. The tool highlighted specific security postures (PASS, FAIL, WARN) for various components, such as whether API server token expiration was properly configured or if profiling was disabled on the controller manager.
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/kubebench-output.png"
      alt="kube-bench audit checks against CIS benchmarks"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 8:</strong> kube-bench audit checks against CIS benchmarks
    </figcaption>
  </figure>
</div>

* **Kubescape:** Finally, he ran a `kubescape scan`, summarizing the overall security posture of the cluster and identifying misconfigurations against established security frameworks. He showed various results returned from Kubescape, highlighting what was not enabled on the control plane and detailing compliance scores. He then specifically ran `kubescape scan framework mitre` to evaluate the cluster against the MITRE ATT&CK framework, highlighting high-severity findings such as "Applications credentials in configuration files" (with compliance score details), "List Kubernetes secrets", and "Writable hostPath mount".
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/kubescape-scan-output.png"
      alt="Kubescape scan security posture results"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 9:</strong> Kubescape scan security posture results
    </figcaption>
  </figure>
</div>

* **Grype:** He also briefly ran `grype` (e.g., `grype alpine:latest`), which is a vulnerability scanner for container images and filesystems. This tool is essential for identifying CVEs (Common Vulnerabilities and Exposures) within the base images and packages running in your cluster before they can be exploited.
  <div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/breachforce-meetup/imgs/grype-output.png"
      alt="Grype container image vulnerability scan output"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 10:</strong> Grype container image vulnerability scan output
    </figcaption>
  </figure>
</div>

---

### Kubernetes Hardening & Security
To conclude the session, Abhishek moved back to the slideshow to discuss fundamental Kubernetes hardening and security concepts. 

The golden rule underlying all these concepts is simple: <mark>**Follow the "Principle of least privilege."**</mark>

He outlined several key areas for securing a cluster, including Open Policy Agent (OPA), Network Policies, Secrets management, and most notably, Pod Security Policies.

#### Pod Security Policy (PSP)
A Pod Security Policy (PSP) is a cluster-level resource that controls the security-related attributes of pods, specifically managing container privilege levels. Key guidelines when defining a PSP include:
* **Do not run application processes as root:** Ensure containers run as non-root users.
* **Do not allow privilege escalation:** Prevent child processes from gaining more privileges than their parent.
* **Use a read-only root filesystem:** Mitigate the impact of a compromised container by preventing file writes.
* **Use the default (masked) `/proc` filesystem mount:** Protect sensitive kernel parameters.
* **Do not use the host network or process space:** Isolate the container from the underlying node's network and process ID namespaces.
* **Drop unused and unnecessary Linux capabilities:** Strip away any capabilities the application doesn't strictly need (e.g., dropping `NET_RAW` if ping isn't required).
* **Service Account control:** Tightly manage what service accounts are mounted into pods.

> **Crucial Note on Pod Security Policies**
> 
> When a PSP resource is created, *it does nothing* on its own. You must explicitly authorize it using **RBAC (Role-Based Access Control)** for it to take effect!

#### Open Policy Agent (OPA) / Gatekeeper
While PSPs are great for Pod-level security, what if you need to control fields in other resources or enforce complex, custom logic? This is where **Open Policy Agent (Gatekeeper)** comes in.

Gatekeeper acts as a customizable admission controller. It gives you the ability to:
* Enforce required labels on all resources.
* Mandate a required resources section (CPU/Memory limits).
* Mutate container images to always point to an internal corporate image registry.
* Set strict node and pod affinity/anti-affinity selectors to Deployments.
* Essentially, you can enforce *anything* that you want to see (or not see) in your Kubernetes configurations.

**Example: Restricting Image Registries**
Abhishek showed an example of a Gatekeeper constraint (`K8sAllowedRepos`) designed to enforce the use of only allowed container registries (e.g., `openpolicyagent/` and `myregistry.com/`). When a user attempts to run a pod with an unapproved image (`kubectl run my-pod --image=nginx`), the admission webhook intercepts the request and strictly denies it, returning a "Forbidden" error.

#### Network Policies
If OPA is your configuration enforcer, a **Network Policy** is your internal cluster firewall. 

By default in Kubernetes, pods can communicate freely with each other. Network Policies allow you to lock this down by explicitly defining **Ingress** (incoming) and **Egress** (outgoing) traffic rules at the Namespace or Pod level.

* **Default Deny:** The best practice is to implement a "Default Deny" policy that blocks all traffic, and then explicitly allow only what is necessary.
* **Granular Control:** You can restrict traffic based on IP blocks, namespaces, or specific pod labels.
  * *Ingress Example:* Allowing traffic to a `webapp` pod only on ports 80 and 443 from specific internal IP subnets.
  * *Egress Example:* Restricting outbound traffic so a pod can only resolve DNS (UDP port 53 to `kube-dns`) and cannot arbitrarily reach out to the internet or other namespaces.

#### Secrets Management
Abhishek posed an important question: *"Where do I version control my secrets?"*
* In his slides, he joked about bad solutions like "Paper / USB / CD / Two fireproof safes?" ~caught my eye :)
* The actual solution: Integrate an external KMS (Key Management System) like **HashiCorp Vault** (or Consul).
* **How it works:** Rather than storing secrets plainly in `etcd`, you configure the Kubernetes API server to encrypt secrets at rest using a transit encryption key managed by Vault (via a `vault-kubernetes-kms` provider).
* *Reference:* He recommended checking out the official [HashiCorp Vault Secrets Operator tutorial](https://developer.hashicorp.com/vault/tutorials/kubernetes-introduction/vault-secrets-operator).

#### Securing the Core Cluster Components
Finally, he ran through rapid-fire configurations for hardening the critical components of the Kubernetes cluster itself:

* **API Server:** 
  * By default, it might listen on an insecure port (8080) where requests bypass all authentication and authorization checks.
  * *Fix:* Close the insecure port by setting the `--insecure-port` flag to `0`, and ensure `--insecure-bind-address` is not set.
* **etcd:** 
  * This backend database is critical and must be secured.
  * *Fix:* Close its insecure ports similarly. Crucially, the etcd server should be configured to *only* trust certificates assigned to API servers.
* **Kubelet:** 
  * The agent responsible for launching pods.
  * *Fix:* Disable anonymous access (`--anonymous-auth=false`). Ensure requests are authorized by setting `--authorization-mode=Webhook` (avoiding `AlwaysAllow`) and strictly defining the CA certificate (`--client-ca-file=/etc/kubernetes/pki/ca.crt`).
* **Kubernetes Dashboard:** 
  * Historically a prime target for attackers.
  * *Fix:* Allow only authenticated access (known users), enforce RBAC to limit user privileges strictly to what they need, and **never** expose the dashboard to the public internet unless you are absolutely sure of what you are doing.

**Control Plane Ports to Monitor:**
He also shared a quick reference table of control plane ports. A good quick-check is to try `curl`ing these ports to ensure they are properly secured:
* **6443 / 8080 (TCP Inbound):** Kubernetes API Server
* **2379, 2380 (TCP Inbound):** etcd server client API
* **10250 (TCP Inbound):** Kubelet API
* **10251 (TCP Inbound):** kube-scheduler
* **10252 (TCP Inbound):** kube-controller-manager
* **10258 (TCP Inbound):** Kubernetes-controller-manager (Optional)

---

### Additional Tooling for Kubernetes Security
As a final takeaway, Abhishek provided a rapid-fire list of essential tools that can help audit, secure, and monitor Kubernetes environments:
* **Trivy:** A comprehensive vulnerability scanner for containers and artifacts.
* **Grype:** A vulnerability scanner specifically for container images and filesystems.
* **KICS (Keeping Infrastructure as Code Secure):** Finds security vulnerabilities and misconfigurations in IaC.
* **Kubescape:** A Kubernetes security posture management tool that tests if a cluster is deployed securely against frameworks like NSA and MITRE.
* **Kubectl:** The indispensable Kubernetes command-line tool.
* **kubiscan:** A tool to scan Kubernetes clusters for risky permissions and RBAC issues.
* **Kube-hunter:** Hunts for security weaknesses in Kubernetes clusters from an attacker's perspective.
* **Kube-bench:** Checks whether Kubernetes is deployed securely according to CIS benchmarks.
* **kubeaudit:** A command-line tool to audit a cluster for various security concerns (e.g., checking if containers run as non-root, use read-only root filesystems, drop scary capabilities, and don't run privileged). It directly points out missing annotations like AppArmor or problematic default ServiceAccount token mounts.
* **kube-score:** Performs static code analysis of your Kubernetes object definitions with recommendations for improved reliability and security.
* **Checkov:** A static code analysis tool for infrastructure as code.
* **Kubesec:** A Kubectl plugin for scanning pods, deployments, daemonsets, and statefulsets that suggests specific improvements (e.g., dropping `CAP_SYS_ADMIN` or forcing `runAsNonRoot`).
* **kubesploit:** A cross-platform post-exploitation HTTP/2 Command & Control server and agent for Kubernetes environments.
