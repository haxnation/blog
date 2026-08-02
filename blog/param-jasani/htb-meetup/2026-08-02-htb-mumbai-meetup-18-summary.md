---
slug: htb-mumbai-meetup-18-summary
title: Summary of HTB Mumbai Meetup held on 01st August 2026 
authors: [param-jasani]

tags:
  - K8s
  - Kubernetes
  - Containers
  - Pods
  - Social-Engineering
  - Physical-Pentesting
  - Psychology
  - HTB-Mumbai-Meetup-Summary

date: 2026-08-2T04:00:00.000Z

description: >
  This blog is a summary of what was taught at 
  HTB Meetup Mumbai #18 held on 01st August 2026.
---
This blog is a summary of what was taught at HTB Meetup Mumbai #18 held on 01st August 2026.

<!-- truncate -->

In my opinion, the sessions were really fun and bite-sized. Let's see what happened....

## Session 1: "Kubernetes Misconfigurations 101: From Leaked Secrets to Host Compromise" by Deepak Yadav

### Introduction

In the earlier days of application hosting, running a service meant renting a physical server, configuring DNS, and making sure the application was reachable from the outside world. The biggest challenge was reproducibility. A web app that worked perfectly on a developer's laptop could still fail on the server due to differences in environment, dependencies, or runtime configuration. This was the classic "works on my machine" problem.

To solve this, cloud providers introduced managed services that made deployment simpler, enabled autoscaling, and allowed traffic to be distributed through load balancers. But that also introduced a new set of concerns, especially around vendor lock-in and portability. Moving an application from one cloud provider to another often meant reworking parts of the infrastructure and configuration.

This is where containerization changed the game. Containers made applications lightweight, portable, and easier to deploy. But as organizations started running many containers, managing them manually became difficult. That is where Kubernetes entered the picture.

### Why Kubernetes became important

Kubernetes, often abbreviated as K8s, became popular because it solved a very practical problem: how do you manage a large number of containers at scale?

Instead of deploying services manually, Kubernetes lets you define the desired state of your application and then automatically ensures that state is maintained. If a container crashes, Kubernetes can recreate it. If traffic increases, it can scale the number of replicas. If a service becomes unhealthy, it can replace it. This makes applications more resilient and easier to manage.

The talk also highlighted that Kubernetes is not only about scaling. It is also about portability and flexibility. Unlike some vendor-specific platforms, Kubernetes is cloud-agnostic and can be deployed on-premises, in private data centers, or on public clouds. That makes it a very attractive choice for organizations that do not want to depend too heavily on a single provider.

### The rise of containers and the need for orchestration

Before containers, virtualization existed, but it was still heavy. Virtual machines had their own full operating systems and required more resources. Containers were more lightweight because they shared the host operating system kernel while still providing application-level isolation.

This made containers much easier to package and ship. Images became smaller, deployments became faster, and scaling became more practical. But when dozens or hundreds of containers started running together, orchestration became a necessity. Kubernetes was designed to fill that role.

The session emphasized that Kubernetes is essentially an orchestration engine for containerized applications. It handles scheduling, networking, storage, service discovery, and self-healing. In short, it helps teams run modern distributed systems in a more structured way.

> To know/learn more about the architecture or related stuff, you can check out the [K8s Concepts that were covered in other meetup](https://haxnation.org/blog/breachforce-mumbai-meetup-june26-summary#introduction)


### Secret management in Kubernetes

One of the most important security topics in the session was secret management. Secrets are sensitive values such as API keys, access tokens, database passwords, SSH keys, and TLS material. If these are mishandled, they can become the easiest path to compromise.

The speaker pointed out that Kubernetes secrets are not magically secure just because they are called secrets. By default, Kubernetes stores them as base64-encoded values, which is not the same as encryption. That means a misconfigured cluster can still expose them if access controls are weak. This is why secret management is such a major topic in cloud-native security.

The talk also connected this to OWASP K03: Secrets Management Failures, which highlights how often organizations fail to securely store, rotate, or restrict access to secrets. Some of the common problems include:

- hardcoding credentials into source code or container images
- storing sensitive values in environment variables without proper protection
- granting overly broad access to service accounts
- failing to rotate tokens and keys regularly
- relying on weak or inconsistent secret storage practices

The session also discussed better approaches to secret handling. These include using dedicated secret management systems such as HashiCorp Vault or cloud-native services like AWS Secrets Manager or Azure Key Vault. The speaker emphasized that organizations should not rely on Kubernetes alone for all secret protection. A stronger design usually includes:

- encryption at rest
- role-based access control (RBAC)
- short-lived credentials where possible
- workload identity instead of static long-lived secrets
- strong auditing and monitoring

In other words, secrets should be treated as a first-class security concern rather than an afterthought.

### Morpheus helping us to escape the small matrix 

The second half of the session focused on container escape. Sorry for my cringy analogy out there, but that is the only thing that came to my mind while writing. The speaker looked like morepheus too, jk :)
A container escape happens when an attacker moves from a compromised application container to the underlying host or node. Once that happens, the attacker may gain access to other containers, shared volumes, cluster metadata, or even the host operating system itself.

The talk explained that container escape is a serious risk because it turns an application-level compromise into a platform-level compromise. In a Kubernetes environment, that can quickly lead to lateral movement and cluster takeover.

Some of the techniques discussed included:

- kernel exploits that break the isolation boundary between the container and the host
- abuse of privileged containers
- abuse of Linux capabilities that grant excessive permissions
- mounting sensitive host paths into the container
- abusing the Docker socket or similar runtime interfaces

One of the most commonly cited examples is the misuse of the Docker socket. If a container has access to the host's Docker daemon socket, it may be able to start additional containers with host-level access. This is exactly the kind of vulnerability that can turn a small foothold into a major breach.

A simple demonstration discussed during the session involved mounting the host filesystem into a container and then accessing the host environment from within it. The example command that was shown was:

```bash
docker run -v /:/host -i alpine chroot /host bash
```

This is a classic illustration of how dangerous it can be when a container is given access to the host root filesystem. Once the attacker escapes to the host, the situation changes dramatically because the host often has access to secrets, logs, node credentials, and the broader cluster environment.

### Demo highlights from the session

The speaker also walked through a small demo involving a vulnerable DNS application and some practical exploitation scenarios. 

Also he recommended checking out - manipulation of Git Hooks to achieve RCE.

```
Also a small pun for our Indian readers, the best practice while creating any container is described in a song, which goes like -
Andar se koi bahar na jaa sake, Bahar se koi andar na aa sake, socho kabhi aisa ho toh kya ho, socho kabhi aisa ho toh kya ho
Nothing will happen its just a wet dream of SOC team :)
```


## Session 2: "Psychology of Social Engineering - Trust, Authority Bias & Emotional Triggers" by Prathmesh Dharkar

After a long long long time, I finally heard something related to physical pentesting, IDK in our country, its a very underrated art. Like, I still remember that last time when I heard about something related to physical pentesting it was either Darknet Diaries or it was Deviant Ollam.

Anyways....
Now what was the second talk really about? It focused on compromising the people part of physical pentesting... Yeah what we call **Social Engineering**, you all already get that from the title of the session.

Compromising the human brain or pressing the specific pain points of people to reveal information, noticing patterns, reading the room, etc etc... that's what all *social engineering* is all about, one of the dark arts of our industry.

The speaker highlighted that this was one of those talks that should not be limited to just **security people**. If you are in any kind of professional environment, whether you are working in cybersecurity, sales, operations, support, or even everyday life, this talk hits home. Because at the end of the day, a lot of breaches do not start with a technical failure. They start with someone clicking, trusting, panicking, or being pressured into doing something they should not have done.

### The main idea: people are the real target

Social engineering is basically the art of making someone do what you want by playing with trust, emotions, urgency, or bias. It sounds scary because it is. But it is also extremely useful to understand if we want to defend against it.

The speaker highlighted a few pressure points like **fear**, **panic**, **greed**, **desire**, **curiosity**, **guilt**, **obligation**, **urgency**, **motivation**, and **needs**. 

### Trust, authority, and the human need to comply

One of the biggest themes of the session was trust. People trust things that look familiar, things that look official, and things that seem to come from someone who has authority. This is known as authority bias.

The speaker talked about authority bias in a very practical way. If someone appears to be in charge, or if they mention a manager, a team lead, a receptionist, or even a senior executive, the other person may stop questioning and start complying. The whole point is not that the target is stupid. The whole point is that humans are busy, distracted, and often making decisions under pressure.

This is why the speaker emphasized the importance of not treating every situation as normal just because it looks routine. A lot of people follow the process without thinking too much. And that is exactly where manipulation becomes possible.

### Emotional triggers are often more powerful than technical tricks

The talk also spent a good amount of time on emotional triggers. Fear makes people react fast. Curiosity makes them click. Greed makes them ignore caution. Guilt makes them feel bad for saying no. Empathy makes them want to help. All of these emotions have been used over and over again in phishing, scams, impersonation, and social attacks.

The speaker made a very good point here: the attacker often does not need to be brilliant. They only need to know which button to press. If they can trigger the right emotion at the right time, the target may take the action without even realizing what is happening.

### OSINT, recon, and the art of preparation

The speaker also shared some examples from real-world experiences, especially around reconnaissance and preparation. Even if the target is a company, an office, or a building, the first step is usually to understand the environment. Who are the people involved? What does the place look like? What is the normal flow of people? What are the visible and invisible barriers? This is where OSINT and recon come into play.

The talk explained that even basic public information can be valuable. Blueprints, building layouts, lanyards, IDs, office routines, public social media posts, and even casual observations can all become clues. 

### Pretext, rapport, and the power of a believable story

Another big topic in the session was the **pretext**. A pretext is basically a believable reason or story that makes someone accept your presence or your request. You should appear like you belong there, tone should be calm, body language should be confident, etc. People will ask less questions if you really look like its your daily routine.

The speaker explained that *rapport building* is not just about being friendly, Its about making the other person feel comfortable enough to continue the conversation, if he/she agrees to do what you say, voilà you already gained their *trust*, now you can exploit the person to reveal more information.

### Situational awareness: read the room before you act

One of the most practical ideas in the session was situational awareness. In simple terms, it means paying attention to what is going on around you. Who is nervous? Who is talkative? Who looks confident? Who looks out of place? Who is in a hurry? What is the normal flow of the environment? The speaker said that once you understand what normal looks like, it becomes easier to spot the unusual.

This is an important lesson not just for security professionals, but for everyone. We often walk into a room, a meeting, or a conversation without really observing what is happening. But the people who are good at reading situations are usually the ones who are more difficult to fool.

The speaker also emphasized body language and behavior. A person’s face, posture, gestures, and tone can reveal a lot. You do not need to become a mind reader. You just need to pay attention.

### The alter ego angle: becoming a role on purpose

The talk also touched on a very interesting idea: the **alter ego**. The speaker did not mean becoming fake or toxic. He meant developing a version of yourself that can step in when needed. In other words, you can train yourself to be calm, confident, and observant when the situation demands it.

The speaker even talked about creating mental anchors and switching into a more controlled mindset. He said to create boxes with scripts of personas that you want to mimic in your mental space and whenever you want to be that person just think of the script and start mimicking it. 
Also *emotional detachment* from the character is also a key part of this practice as you don't want to land up in a gray area where you can't figure out the difference between the real you and your persona.

### References and Further Reading

**Kubernetes & Container Security (Session 1)**
- [OWASP Kubernetes Top 10](https://owasp.org/www-project-kubernetes-top-ten/) - A critical awareness document. Pay special attention to **K03: Secrets Management Failures** and **K01: Insecure Workload Configurations**.
- [NSA/CISA Kubernetes Hardening Guidance](https://www.cisa.gov/news-events/alerts/2022/03/15/updated-kubernetes-hardening-guide) - Comprehensive best practices on defense-in-depth, RBAC, and preventing container escapes.
- [HackTricks: Docker Breakout / Container Escape](https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-security/docker-breakout-privilege-escalation) - A deep dive into exploiting misconfigurations, including the Docker socket mounts and privileged container escapes demonstrated in the talk.
- [Kubernetes Secrets - Official Documentation](https://kubernetes.io/docs/concepts/configuration/secret/) - Core concepts on how K8s handles (and base64 encodes) secrets natively.
- [Kubernetes Security Overview](https://kubernetes.io/docs/concepts/security/overview/) - High-level cloud-native security principles.

**Psychology, Social Engineering & Physical Pentesting (Session 2)**
- *Social Engineering: The Science of Human Hacking* by Christopher Hadnagy - A foundational book on OSINT, pretexting, elicitation, and the psychology of human manipulation.
- *Influence: The Psychology of Persuasion* by Robert B. Cialdini - A must-read on the psychological triggers discussed in the talk, such as Authority Bias, Scarcity, and Reciprocity.
- *Practical Lock Picking* & *Keys to the Kingdom* by Deviant Ollam - Highly recommended books for understanding the physical security side of the industry.
- [Darknet Diaries Podcast](https://darknetdiaries.com/) - Essential listening for physical red-teaming stories. Check out **Ep 134: Deviant** (featuring Deviant Ollam sharing stories of physical bypasses, lockpicking, and social engineering), **Ep 90: Jenny** (about physical penetration tester Jenny Radcliffe), **Ep 40: No Parking**, and **Ep 41: Just Visiting**.
- [Social-Engineer.org (SEORG) Framework](https://www.social-engineer.org/framework/general-discussion/) - An open-source framework mapping out the dark arts of human hacking, pretexting, and rapport building.