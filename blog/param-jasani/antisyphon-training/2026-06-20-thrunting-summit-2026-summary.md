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

date: 2026-06-20T04:00:00.000Z

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
- By deceiving the AI directly - Threat actors can embed instructions in logs/telemetry that the AI later reads during threat hunting and in turn performing a prompt injection attack on the AI model.
- Deceiving via deception - Attackers operate in a medium of lies. While telemetry itself may be technically accurate but threat actor might have staged benign looking activity masking malicious actions. Because AI models are bad at subtlety(adversarial deception in our case), they may misinterpret these signals and produce inaccurate assessments or reports.

### The Hunter's Paradox
Modern security environments generate terabytes of telemetry everyday. 
The sheer volume and velocity at which these telemetry gets ingested makes it difficult for humans to read and analyse it all, even large teams can't keep up with this scale. 
Modern day threat actors with the help of AI operate at machine speed, so we have to act quickly as well which can only done with the help of AI, but we can't trust it as well.

This is Hunter's Paradox - We can’t hunt at scale without AI, but we can’t fully trust the AI we need.

### Proposing a new era of threat hunting
In 2015, organizations increasingly recognized the need for threat hunting, driven by the fear that attackers could already be present in their environments and that traditional detection systems were insufficient, but people were not sure on what it was or how to perform it, there was no single framework to define that. So to teach people threat hunting and sell their product, Sqrrl Threat Hunting Loop was created. Sqrrl’s framework was the first published “how to” for threat hunting.
It Focused on hypothesis-driven hunting and detection improvement
Later: PEAK Threat Hunting Framework (Splunk, 2023) was built on similar ideas.

Both frameworks defined threat hunting as:
"Any manual or machine-assisted process for identifying security incidents your automated detection systems missed."

For many years this definition was valid as machine assited humans by accelerating investigations but at the end we needed a human to drive the hunt, but he thinks that this is coming to an end.

So if it can't be manual or machine assisted then what it should be? 
Now David proposes a new definition as Threat hunting might be…
“Any reasoning-driven process for identifying security incidents your automated detection systems missed.” 
as today, humans are not only the ones who can reason, AI can also reason, these models are not perfect but it can do the work.
So if hunting is reason driven, then we should allow AI to drive the hunts. 

### Blueprint for Autonomous AI Hunts - The Three Pillars
Now we have to allow AI to drive the process, where should we start?
We can't just give AI so much data and tell it to hunt, we need some structure and guardrails to be really effective.

1. Tight Focus – AI should initially be assigned well-scoped, familiar, and highly contained hunting tasks. These are hunts with established procedures, known objectives, and clear success criteria rather than open-ended investigations requiring deep contextual understanding. A good starting point is existing hunt procedures developed by experienced threat hunters. For example, communities such as the THOR Collective have documented hunt procedures that provide structured workflows while still requiring some level of reasoning.
2. Strict Guidelines – Clear rules on what the AI can and cannot do. We can't afford to deploy AI systems without strong identity and access management (IAM) controls. AI agents should be treated much like service accounts: they need unique identities, well-defined permissions, continuous monitoring, and comprehensive audit trails. Every action they take should be attributable, traceable, and governed by clear security policies. Treat AI as a capable but inexperienced employee.
3. Graduated Autonomy – Begin with advisory roles with limited actions then later give more autonomy as trust builds.

### Existing AI Hunting Capabilities
- Tools and assistants already exist (e.g., David’s open-source PEAK Assistant targets the Prepare phase: scoping and planning).
- Automation is stronger in Execute and Act phases.
- Combination of agent skills + MCP servers can go quite far.

### Recommendations Going Forward
- Reframe hunting as reasoning-driven.
- Three Pillars - Narrow scope + strict guidelines + graduated autonomy.
- Humans set the agenda and drive creative/strategic elements.
- Experiment as a community.
- Don’t over rely on AI always keep humans in the driver’s seat.

## Talk 1: "How Agents Solve Threat Huntings Biggest Problem" by Faan Rossouw

### Introduction
Faan picks up exactly where David's keynote left off. 
He walks on the same line of questions that David presented us in the keynote and suggests what would happen if we replace human judgement with a pattern matching agent. 
To present the problem to us, he takes help of an analogy.

### The Analogy - Spotting the deer in the forest
- You’re in a forest with a radio, Faan tells you to report over the radio as soon as you see a deer.
- You spot a deer, you report it to Faan.
- You spot a deer with a mustache, you laugh and report the variation naturally.
- Now, Replace the human with a rigid pattern matching agent (GOF deterministic detection signature) it only sees exact “deer” and misses variants.

Now how to solve this problem? One way would be to just relax the detection criteria so that the agent spots the variation as well. But it introduces another problem, i.e. False Positive Deluge.

So if detection criteria is -
- Too Strict = Miss slight variations, FNs = Brittle
- Too Relaxed = Introduce too many FPs = Noisy

So what he is trying to suggest is that Alert based security is low resolution.

### Why alert based security is low resolution?
So in a typical SOC environment, if we focus only on the alert part, from a machine's perspective it will be just a boolean value, i.e., it will be an alert or not one, but for us as humans there is more to it, we use initial breadcrumbs to derive a conclusion or there is some kind of chain of thoughts associated to it which drives our process to evaluate, we like to connect the dots to arrive at a conclusion, or for that matter make intuitive calls during the process, that is what human judgement is all about in threat hunting, we drive the process, we are involved in the detection itself and not just in reviewing the output.

The main goal of threat hunting is not just to find threats, it's main goal is to drive overall improvement in security posture, as David reframed it in the PEAK framework.

### If threat hunting is so great, why is it still seen as a luxury?
As David also highlighted in his keynote, the detection demand is increasing but human judgement can't dramatically scale with it and match the requirements.

### So what is his core thesis? 
Faan suggests that "We can dramatically scale human judgement through the intentional integration of an agentic layer in a threat hunting system."

#### How to then do intentional integration?
Identify where you can utilize transformer based intelligence to maximize strengths of your organisations while also retaining deterministic code and human intelligence, if there is a chance of AI hallucination then stick to the basics of using the good old fashion deterministic code. So it all boils down in identifying key areas where you can boost your overall security posture and use the strengths of all three.
Keypoints - 
- Use where it presents value
- Omit where it does not present value
- Maximize strengths
- Minimize + mitigate weaknesses 

So to cover all these keypoints he proposes 9 fundamental methods to integrate Agentic AI into existing systems.

### 9 fundamental methods for integrating Agentic AI into existing systems
#### 1. Data-Agent Interface
You cannot simply dump millions of logs into an LLM and tell it to "find evil." Agents are designed for reasoning, not raw calculation. Doing so leads to context overflow, the "lost in the middle" fallacy, high latency, and spurious correlations. To bridge this gap efficiently, defenders must use:

- Pre-Emptive Data Analysis (Distillation): Using traditional compute to run statistical analysis on all the telemetry and then using that probability in your hypothesis generation.

- On-Demand Analysis & Retrieval: Leveraging frameworks like CodeAct or Roberto Rodriguez’s concepts which helps in standardizing the tooling that the AI can use, then the AI can query and analyze data dynamically, after the generation of initial hypothesis.

- Relational Structuring (Knowledge Graphs): KGs are a very efficient way to elucidate the relationships between different data entities, so first process your telemetry into KGs before agents deal with it.

- Agentic Detection Engineering: After parsing IOCs from your intel feeds, use agents to run sigma detections on your telemetry.

- GUI / Vision Mediation (Legion)

#### 2. Shared State
We do standard LLM interactions by sending streaming tokens via an API call to the LLM and receive streaming tokens back as an answer, even when LLM runs a tool, its a json request to run the tool, the model can't really run the tool. 
So the question arises that how do we preserve those values returned by different API calls that are running in parallel during hunts so that these values are accessible to future agents?
The answer to it is Knowledge Graphs.
Faan highlights KGs as a highly effective way to map out this shared state, especially when tracking the complex connections between different entities during a hunt.

#### 3. Tools
Hunters love their tools, and agents can be given the ability to use them either by asking the harness to perform the action or through automated workflows.  Models do not execute the tools directly; the harness makes the API call on their behalf.  
- Inline Functions: Any inline function created in the harness can be exposed to the model.  
- Shell Use (CLI): Models are highly capable at CLI use due to its short, corrective feedback loop.  
- API Calls (Cross-Process): CLIs are a flexible and popular approach for making API calls, and the Model Context Protocol (MCP) can also be utilized.  
- GUI Automation: While classically viewed as expensive and slow, GUI automation is improving, allowing agents to learn by shadowing human interactions on the interface.  

#### 4. Orchestration
Default agent interactions often occur in a sequential manner, where a user asks a question and the model replies.  
When scalling we want to move away from this sequential pattern, how to do that?
- Parallelization: When scaling, independent tasks can be run in parallel to reduce latency.  
- Maker-Checker Design: Models can review each other's outputs, sometimes acting as an "LLM as a judge."
- Gates: Multiple agents can act as review gates in a workflow before critical decisions cascade and affect other areas.  

#### 5. Skills
Skills are the evolutionary progression from simple "prompts." Its where we concretize the fuzzy knowledge of organization(what lives in a hunter's head) into Standard Operating Procedures (SOPs).

Characteristics: They must be executable, automatable, and atomic (targeting a very specific method or objective).

Lifecycle: Skills should be composable (combinable), version-controlled, A/B tested, and shareable with the community.

Direction: You cannot just tell an agent to "go find stuff." Skills provide the strict boundaries: "Here is the telemetry, here is the specific thing you are looking for, and here are the conditional workflows and reference scripts to use."

#### 6. Context Engineering
Everything a base model knows lives in its pre-trained weights.
There are two flaws associated with it first is that the knowledge base lags behind by few months and another is that they are inherently flawed for enterprise defense because they know absolutely nothing about your specific organization, network architecture, or crown jewels.
So to give them the context, we can -
Optimizing inference-time knowledge. Using mechanisms like RAG (Retrieval-Augmented Generation) or DuckDB to inject specific organizational context right when the agent needs it.

#### 7. Feedback Loops
A dedicated, skills-based node in the workflow that forces the AI system to engage in intentional reflection after a hunt is completed—regardless of whether it found a threat or not.

The Goal: Generating concrete suggestions on how the system, the telemetry pipeline, or the hunt itself can be improved for the next run.

#### 8. Evaluations (Evals)
When you alter the system's architecture, prompts, or skills, you need a way to measure the impact of those changes.

The Goal: Ensuring that system improvements are driven by hard metrics and verifiable performance data, rather than just relying on "vibes" or gut feelings about the AI's output.

#### 9. Adversarial Resilience
As David Bianco mentioned in the keynote, introducing an AI agent layer inherently increases your attack surface.

The Threat: Threat actors can exploit the AI via prompt injection hidden within telemetry logs, manipulated MCP servers, or poisoned RAG databases.

The Goal: Actively guarding and remediating every vector where an attacker could theoretically influence or hijack the agent's reasoning.