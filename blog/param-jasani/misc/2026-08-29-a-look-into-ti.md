---
slug: ti
title: How intelligently, intelligent people do threat intelligence?
authors: [param-jasani]
tags:
  - misc
  - threat-intelligence
  - cti
  - stix
  - taxii
  - diamond-model

date: 2026-08-29T08:00:00.000Z
description: >
    A deeper look into how IOCs are collected and shared, What organisations facilitate this process?, How do CTI experts interact with APTs?, How do we govern these things?, yada yada, this blog covers the entire TI process from collection to enrichment.
---

A deeper look into how IOCs are collected and shared? What organizations facilitate this process? How do CTI experts interact with APTs? How do we govern these things? What is TAXII and STIX? yada yada, this blog covers the entire TI process from collection to enrichment.

<!-- truncate -->

### Some Pre-Blog Talk
Hey folks!! It's been a month since I wrote a blog (was busy with something), so here I am with something good. I decided to cover TI, as people don't recognize how important a role they play in our domain, and we should definitely give them credit where it is due.

A very underrated field in our country but has a lot of scope and fun. Hope that this blog helps someone out there and the number of CTI experts from our country increases. Also, ping me if you love the blog and the tongue-twisting title (see!! I did that again!! I am getting good with my alliteration game, I think it's the perfect time that I should start doing hip hop). I would definitely love to have some criticism in my DMs (having criticism from professionals is definitely better than having criticism from my ex). Alright, enough of the banter, let's start with our topic!

---

## Introduction: What is TI/CTI and Why Do We Need It?
First things first, what exactly are we talking about here?
- **TI** stands for **Threat Intelligence**.
- **CTI** stands for **Cyber Threat Intelligence**. 
- *Is there any difference between them?* Nope, we use those terms interchangeably!

CTI is essentially evidence-based and contextual knowledge about emerging cyber shenanigans. What do I mean by that?
- Have you ever read an article about how an APT operates?
- Or the **IoCs** (Indicators of Compromise) associated with them?
- What impact they made on the compromised org, their motives, or the **TTPs** (Tactics, Techniques, and Procedures) seen in the MITRE ATT&CK framework?
- **Yup, that is Threat Intelligence!** And the people who collect it? We call them **TI Analysts, CTI Analysts, or Threat Researchers**.

> **Side Note:** Using this TI, you make context-aware decisions because you now know the indicators and their implications rather than just blindly blocking IPs.

### The Three Levels of Threat Intelligence
We tend to divide this intelligence into three different levels. What is the basis of division? We divide it based on the **level of detail** and **who** will consume it to make decisions.

**1. Tactical TI**
- **What does it consist of?** IoCs and immediate context. Simple as that. It includes file hashes, IP addresses, domains, URLs, email signatures, malware signatures, Yara rules, etc.
- **Who consumes it?** Our dear **SOC Analyst**. It helps them triage alerts and correlate whether an alert is actually a True Positive (TP) or False Positive (FP).
> **Example:** When a SOC analyst pastes an IoC on VirusTotal's dashboard, VT compares it against databases of different third-party AV engines. EDRs, Firewalls, and IPS systems receive these IoCs automatically when their vendor pushes an update so they can automatically block them!

**2. Operational TI**
- **What does it consist of?** TTPs, campaign patterns, and infrastructure graphs.
- **Who consumes it?** **Threat Hunters, Incident Responders, Malware Analysts, and DFIR responders**. They use it to find security gaps.
- **Major Use Case:** After drafting a hypothesis, threat hunters need context on what IoCs or attack vectors to target. They look for related linkages they might have missed.

**3. Strategic TI**
- **What does it consist of?** Top-level trends, threats to the organization, geopolitical motivations, and long-term risk trends. All in all, it consists of **who** is behind the attack and their **motivation/intention**.
- **Who consumes it?** Our beloved **"C-Suite Operatives"**. It helps them make strategic decisions for the enterprise.
> **Quote from a C-Level Exec:** “Which threat actors could realistically disrupt our business, what are they targeting, and what should we change because of that?”
- Strategic CTI focuses on intent, capability, business impact, and future risk rather than individual indicators.

---

## Why Does TI Exist in the First Place?
Why do we need it beyond "We get alerts" or "We do proactive threat hunting"?

- **Evolution of Threats:** Cyber threats have evolved from isolated incidents to nation-state campaigns, Ransomware-as-a-Service (RaaS), and supply-chain attacks.
- **Blind Defense is Impossible:** Traditional "alerts only" (IDS/IPS/SOAR rules) cannot keep up. They are purely reactive. TI provides the **why** and **how** behind the alerts.
- **The Foundation for Hunting:** Proactive threat hunting is valuable, but it needs a target list. TI gives you those targets (actor profiles, TTPs, infrastructure). Without it, you are basically shooting in the dark!

> **The Reality Check:** Companies without CTI programs suffer 2–3x higher breach costs. Organizations with mature TI programs detect threats days or weeks earlier.

---

## The Intelligence Cycle: How Threat Intel is Born
TI doesn't just magically appear in a CSV file. It follows a structured, iterative 6-phase intelligence lifecycle:

![The Threat Intelligence Cycle](https://www.researchgate.net/publication/379583763/figure/fig3/AS:11431281234441896@1712327060001/The-Threat-Intelligence-Cycle.png)

*Figure 1: The Threat Intelligence Cycle illustrating the 6 continuous phases from Planning to Feedback.*

1. **Planning and Direction:** Setting Priority Intelligence Requirements (PIRs). What are we defending? Who are our likely adversaries? What business risks matter most?
2. **Collection:** Gathering raw data from internal logs, open-source intelligence (OSINT), dark web chatter, malware analysis, commercial feeds, and ISACs.
3. **Processing:** Cleaning, normalizing, translating, and structuring the raw data (e.g., extracting IoCs from unorganized text into STIX JSON format).
4. **Analysis and Production:** Transforming processed data into actual intelligence. Analysts connect the dots using frameworks like the Diamond Model and MITRE ATT&CK to establish context, attribution, and confidence scores.
5. **Dissemination:** Getting the intelligence to the right consumer at the right time like pushing machine-readable feeds to SIEMs/EDRs via TAXII, or delivering strategic intelligence reports to executives.
6. **Feedback:** Evaluating the output. Did this intel help the SOC prevent a breach? Did it answer the leadership's questions? The cycle adjusts accordingly.

---

## The Pyramid of Pain: Why TTPs Matter More Than Hashes
To truly appreciate why we do Threat Intelligence beyond simple IP blacklisting, you have to know David Bianco's **Pyramid of Pain**:

![The Pyramid of Pain](https://www.attackiq.com/wp-content/uploads/2019/06/blog-pyramid-pain-01-1024x576.jpg)

*Figure 2: David Bianco's Pyramid of Pain illustrating the degree of difficulty an adversary faces when defenders block indicators across different layers.*

- **Hash Values (Trivial):** A single bit flipped in malware changes the hash. Blocking hashes causes trivial pain to the attacker.
- **IP Addresses (Easy):** Attackers change proxy IPs and VPNs within minutes.
- **Domain Names (Simple):** Dynamic DNS and fast-flux domains are dirt cheap to register.
- **Network / Host Artifacts (Annoying):** Modifying registry keys or specific URI patterns forces the attacker to do minor rework.
- **Tools (Challenging):** If you detect and block their custom C2 framework (like Cobalt Strike or custom loaders), they must write or buy a new tool.
- **TTPs - Tactics, Techniques & Procedures (Tough / Painful):** If you understand and block their core behavioral playbook (how they move laterally, dump credentials, or establish persistence), you force the adversary to completely reinvent their entire operating model.

---

## The Diamond Model of Intrusion Analysis (In Depth)
To analyze and correlate malicious cyber activity systematically, we use the **Diamond Model** (established in 2013 by Sergio Caltagirone, Andrew Pendergast, and Christopher Betz). 

Instead of tracking simple, disconnected indicators, the Diamond Model establishes that every malicious intrusion is an **Event** defined by four core interconnected vertices:

![The Diamond Model of Intrusion Analysis](https://uploads.teamt5.org/upload/original/What_is_Diamond_Model_of_Intrusion_%20Analysis_pic_en_update.jpg)

*Figure 3: The Core Diamond Model showing the four core vertices, the Socio-Political axis, and the Technical axis.*

### The 4 Core Vertices
- **Adversary:** The threat actor behind the intrusion. This distinguishes between the **Adversary Operator** (the hacker running keyboards) and the **Adversary Customer** (the state entity or sponsor who benefits from the operation).
- **Capability:** The tools, techniques, exploits, and malware payloads deployed by the adversary.
- **Infrastructure:** The physical and logical communication channels the adversary uses to deliver capabilities and control operations (e.g., C2 IP addresses, hijacked domains, compromised email relays).
- **Victim:** The target organization, person, domain, or digital asset (e.g., customer PII databases, SCADA controllers).

### The Two Principal Axes
The model connects these vertices across two fundamental axes:
1. **The Socio-Political Axis (Adversary <-> Victim):** Captures intent, motive, geopolitical tensions, and victimology. Why is this specific adversary targeting this specific victim?
2. **The Technical Axis (Capability <-> Infrastructure):** Captures how the technology operates. How does the malware payload interact with the C2 infrastructure to execute the attack?

### Meta-Features: Adding Critical Context
To make each diamond event actionable, the model attaches **meta-features**:
- **Timestamp:** The exact start and end time of the event.
- **Phase:** The step within the intrusion lifecycle / Cyber Kill Chain (e.g., Reconnaissance, Weaponization, Delivery, Exploitation, C2, Actions on Objectives).
- **Result:** Whether the attempt succeeded, failed, or was partially mitigated.
- **Direction:** The flow of the event (e.g., Adversary-to-Infrastructure, Infrastructure-to-Victim, Bidirectional).
- **Methodology:** The general classification of the action (e.g., Spearphishing with attachment, Port scanning).
- **Resources:** Hardware, software, knowledge, or access required to pull off the action.

### Activity Threads & Activity Groups
- **Activity Threads:** Linking consecutive diamond events over time to reconstruct an entire intrusion path from initial compromise to data exfiltration.
- **Activity Groups:** Clustering multiple activity threads across different victims that share common Capabilities, Infrastructure, or Adversary features. This is how intelligence firms officially track and identify persistent threat groups like APT28, APT29, or Lazarus.
- **Gap Analysis:** If you discover malware on your server (Capability) targeting your database (Victim), the Diamond Model immediately reveals the missing puzzle pieces: *What infrastructure did it talk to? Who sent it?* This directs your forensic investigation.

---

## The Backbone of Sharing: STIX, TAXII, and SIEM Ingestion
If you are doing TI, you need to share it. If I find a threat, I need my firewall to know about it instantly. This is where **STIX** and **TAXII** come into play. But what are they, and how do they actually look and get into our SIEM?

**The Problem They Solve:** Historically, sharing threat intelligence involved manual, error-prone processes like sending PDFs, Excel sheets, or long email threads. Security tools couldn't ingest a PDF automatically. We needed a machine-readable standard and an automated protocol!

### STIX (Structured Threat Information Expression)
- **What is it?** STIX is the **language** (the "what").
- It is a standardized, JSON-based language used to describe cyber threat intelligence so that disparate security tools (SIEMs, EDRs, TIPs) interpret intelligence identically.
- **Key Object Categories (STIX 2.1 Specification):**
  - **SDOs (STIX Domain Objects):** Core intelligence objects such as `indicator`, `malware`, `threat-actor`, `identity`, `attack-pattern`, `campaign`, and `vulnerability`.
  - **SROs (STIX Relationship Objects):** Connections that link SDOs together, primarily `relationship` (e.g., indicating, using, targeting) and `sighting` (recording that an indicator was seen in the wild).

### How STIX Looks in Practice: A Real-World Scenario
To see how STIX objects connect in real life, consider a scenario with two organizations in a sharing community: **Company A** (Producer) and **Company B** (Consumer).

#### 1. Common Properties in STIX
Every SDO and SRO in STIX shares common required properties, such as `type`, a unique `id`, and timestamps (`created`, `modified`):

```json
{
  "type": "indicator",
  "id": "indicator--71312c48-925d-44b7-b10e-c11086995358",
  "created": "2017-02-06T09:13:07.243000Z",
  "modified": "2017-02-06T09:13:07.243000Z"
}
```

#### 2. STIX Producer: Company A
Company A detects malicious activity on their network. They create intelligence to share with peers:
- **Indicator SDO:** Contains the detection pattern (e.g., SHA-256 hash of CryptoLocker):
```json
{
  "type": "indicator",
  "spec_version": "2.1",
  "id": "indicator--71312c48-925d-44b7-b10e-c11086995358",
  "created": "2017-02-06T09:13:07.243000Z",
  "modified": "2017-02-06T09:13:07.243000Z",
  "name": "CryptoLocker Hash",
  "description": "This file is a part of CryptoLocker",
  "pattern": "[file:hashes.'SHA-256' = '46afeb295883a5efd6639d4197eb18bcba3bff49125b810ca4b9509b9ce4dfbf']",
  "pattern_type": "stix",
  "indicator_types": ["malicious-activity"],
  "valid_from": "2017-01-01T09:00:00.000000Z"
}
```
- **Malware SDO:** Details the specific malware instance:
```json
{
  "type": "malware",
  "id": "malware--81be4588-96a8-4de2-9938-9e16130ce7e6",
  "spec_version": "2.1",
  "created": "2017-02-06T09:26:21.647000Z",
  "modified": "2017-02-06T09:26:21.647000Z",
  "name": "CryptoLocker",
  "description": "CryptoLocker is known to hold files hostage for ransom.",
  "malware_types": ["ransomware"]
}
```
- **Relationship SRO:** Links the Indicator to the Malware using `source_ref`, `target_ref`, and `relationship_type` (`indicates`):
```json
{
  "type": "relationship",
  "id": "relationship--a19fac85-f6f5-47f3-aacd-4bfb54557852",
  "spec_version": "2.1",
  "created": "2017-02-06T09:30:51.987000Z",
  "modified": "2017-02-06T09:30:51.987000Z",
  "relationship_type": "indicates",
  "source_ref": "indicator--71312c48-925d-44b7-b10e-c11086995358",
  "target_ref": "malware--81be4588-96a8-4de2-9938-9e16130ce7e6"
}
```

![STIX Relationship Diagram](https://oasis-open.github.io/cti-documentation/img/stix2_relationship_example_2.png)

*Figure 4: STIX Relationship showing an Indicator SDO linked via an "indicates" SRO to a Malware SDO.*

- **STIX Bundle:** Company A wraps these objects into a single JSON container called a **Bundle** and publishes it to a TAXII server:
```json
{
  "type": "bundle",
  "id": "bundle--1736e032-a96a-41e9-8302-126677d4d781",
  "objects": [
    {
      "type": "indicator",
      "id": "indicator--71312c48-925d-44b7-b10e-c11086995358",
      "spec_version": "2.1",
      "created": "2017-02-06T09:13:07.243000Z",
      "modified": "2017-02-06T09:13:07.243000Z",
      "name": "CryptoLocker Hash",
      "description": "This file is a part of CryptoLocker",
      "pattern": "[file:hashes.'SHA-256' = '46afeb295883a5efd6639d4197eb18bcba3bff49125b810ca4b9509b9ce4dfbf']",
      "pattern_type": "stix",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2017-01-01T09:00:00.000000Z"
    },
    {
      "type": "malware",
      "id": "malware--81be4588-96a8-4de2-9938-9e16130ce7e6",
      "spec_version": "2.1",
      "created": "2017-02-06T09:26:21.647000Z",
      "modified": "2017-02-06T09:26:21.647000Z",
      "name": "CryptoLocker",
      "description": "CryptoLocker is known to be malicious ransomware.",
      "malware_types": ["ransomware"]
    },
    {
      "type": "relationship",
      "id": "relationship--a19fac85-f6f5-47f3-aacd-4bfb54557852",
      "spec_version": "2.1",
      "created": "2017-02-06T09:30:51.987000Z",
      "modified": "2017-02-06T09:30:51.987000Z",
      "relationship_type": "indicates",
      "source_ref": "indicator--71312c48-925d-44b7-b10e-c11086995358",
      "target_ref": "malware--81be4588-96a8-4de2-9938-9e16130ce7e6"
    }
  ]
}
```

#### 3. STIX Consumer: Company B & Sightings
Company B subscribes to the TAXII server and pulls Company A's bundle. 
- Company B runs a search across their endpoints and finds the same hash on their network!
- To notify the community that the threat is active in the wild, Company B creates a **Sighting SRO**:
```json
{
  "type": "sighting",
  "id": "sighting--4eebf1e1-5351-49ed-9b7b-28f0da806d82",
  "spec_version": "2.1",
  "created": "2017-02-07T20:08:31.154Z",
  "modified": "2017-02-07T20:08:31.154Z",
  "sighting_of_ref": "indicator--71312c48-925d-44b7-b10e-c11086995358"
}
```

![STIX Sighting Diagram](https://oasis-open.github.io/cti-documentation/img/sighting-of-an-indicator.PNG)

*Figure 5: STIX Sighting SRO communicating that an Indicator was observed in the wild.*

---

### TAXII (Trusted Automated Exchange of Indicator Information)
- **What is it?** TAXII is the **transport mechanism** (the "how").
- It is the application-layer protocol used to transport STIX data over HTTPS.
- It defines how intelligence is shared, allowing systems to "push" or "pull" data automatically to and from centralized servers via API endpoints and Collections.

![TAXII Architecture](https://oasis-open.github.io/cti-documentation/img/taxii_diagram2.png)

*Figure 6: TAXII Architecture showing Producer publishing to TAXII Server and Consumer pulling intelligence feeds.*

---

### How do we ingest threat feeds using STIX and TAXII to our SIEM?
Getting this data into your SIEM (like Splunk, Microsoft Sentinel, or QRadar) is a game-changer for automated defense:
1. **The TAXII Server:** A TI provider (or an ISAC) hosts a TAXII Server containing Collections of STIX data.
2. **The TAXII Client / TIP:** Your organization configures a TAXII Client within your SIEM, or uses a Threat Intelligence Platform (TIP) like ThreatConnect, Anomali, or OpenCTI as middleware.
3. **Polling and Transformation:** The client authenticates (via API keys or mTLS certificates) and subscribes to a TAXII Collection. It periodically polls the server for new STIX JSON files.
4. **SIEM Ingestion:** The SIEM parses the STIX JSON, normalizes the fields, and extracts the actionable indicators (IPs, hashes, domains). It automatically writes these to dynamic Watchlists or Threat Indicator Lookups.
5. **Correlation:** The SIEM runs correlation rules that constantly compare incoming telemetry (firewall logs, DNS queries, authentication logs) against these Watchlists. If a match is found, a high-fidelity alert is instantly generated for the SOC!

> **TL;DR:** STIX is the standardized format of the threat data, TAXII is the secure delivery truck, and your SIEM acts as the automated warehouse that processes the deliveries to catch bad guys instantly.

---

## Traffic Light Protocol (TLP v2.0): How We Share Intel Safely
When intelligence is shared across organizations or ISACs, how do we know who is allowed to see it? We use the **Traffic Light Protocol (TLP)** maintained by FIRST:

- **TLP:RED (For your eyes only):** Restricted to participants in the meeting or conversation only. Cannot be shared outside.
- **TLP:AMBER+STRICT (Organization only):** Restricted to members of your organization only.
- **TLP:AMBER (Organization & Clients):** Restricted to your organization and its clients who need to know to protect themselves.
- **TLP:GREEN (Community wide):** Can be shared within the broader sector, partner organizations, and peers, but not publicly.
- **TLP:CLEAR (Public):** No restrictions. Information is open for the public.

---

## Major Providers of TI
You don't have to build all this intelligence yourself. There are major players who do this for a living:
- **Mandiant (Google Cloud):** Famous for their deep-dive incident response and nation-state tracking.
- **CrowdStrike (Falcon Intelligence):** Known for attributing attacks to specific adversaries (they name them after animals like Fancy Bear or Spider).
- **Recorded Future:** A massive intelligence aggregator that scrapes the open, deep, and dark web.
- **Anomali, ThreatConnect & OpenCTI:** Leaders in Threat Intelligence Platforms (TIPs) that help you manage and ingest feeds.
- **VirusTotal:** The community-driven powerhouse for malware analysis and basic indicator reputation.

---

## ISACs: Information Sharing and Analysis Centers
Okay, so we can buy data from providers. But *who* else are we sharing it with? Enter **ISACs**. 

- **What are they?** ISACs are sector-specific, member-driven, non-profit organizations that serve as trusted hubs for sharing cyber threat intelligence among competing companies in the same industry.
- **Examples:** **FS-ISAC** (Financial Services), **Health-ISAC**, **Energy-ISAC**, **Auto-ISAC**.

### Why do they exist if you have internal teams and commercial feeds?
Commercial feeds are great for broad indicators. But ISACs solve a unique problem: **secure, sector-specific, real-time sharing among peers.**

- **Collective Defense:** Members contribute their own observed incidents (often anonymized). The ISAC analyzes this and warns others: *"APT29 is actively targeting the financial sector today, here are the exact TTPs seen in 12 similar banks last week."*
- **Legal & Trust Framework:** They use secure platforms (powered by STIX/TAXII and TLP!) and have strict legal agreements to protect liability when sharing breach details.
- **Early Warning:** They capture novel TTPs and emerging threats that commercial feeds might lag on, acting as a highly trusted, peer-to-peer early warning system.

---

## Real-Life TI: Why This Field is Actually Fun!
If you think TI is just staring at spreadsheets of IP addresses, you are missing the best parts. This field is a literal global game of digital cat-and-mouse.

- **The SolarWinds Discovery:** A perfect real-life example is how Mandiant discovered the massive SolarWinds supply-chain attack. They didn't find it by looking for SolarWinds. A Mandiant analyst noticed a bizarre, mundane anomaly: an unauthorized device registering for 2FA on their own network. By pulling that tiny thread using threat intelligence and forensics, they uncovered "SUNBURST", one of the most sophisticated espionage campaigns in history by a Russian intelligence agency. That is pure detective work!
- **Tracking Cyber Heists:** Analysts track North Korean groups (like Lazarus) who literally hack banks and crypto exchanges to fund their nation's missile programs. By mapping their infrastructure, analysts can sometimes predict and disrupt massive heists before they happen.
- **De-anonymizing Hackers:** It’s incredibly satisfying to reverse-engineer malware, find a careless mistake the author left behind (like a hardcoded nickname or a timezone), and use that intel to trace the attack back to a specific building on the other side of the world.

---

## How CTI Experts Interact with APTs (Undercover Work!)
Now for the spicy part! How do analysts actually research these APTs from the ground level? 

- **Going Undercover:** Analysts venture into the dark web, join ransomware RSVP channels, or infiltrate Telegram chats. 
- **Social Engineering:** They use social engineering techniques to make threat actors believe they are eligible to work as affiliates for them. 
- **The Language Game:** They have to learn how people *actually* communicate in their native languages. 
> **An example for our Indian readers:** We don't write Hindi the exact same way we speak it. Someone living in Maharashtra will incorporate Marathi words here and there and same goes for other places around the world as well!! If an analyst uses an LLM to talk to threat actors, they will easily get detected because the LLM uses pure dictionary words.
- **Initiation Rites:** Sometimes APTs ask for a blockchain payment as a "signup fee" to prove you are serious. A "smaller" task might even involve you performing a pentest on a target(illegally, of course!! to prove your skills!! that's what they say!!)

---

## References and Further Reading
For those who want to dive deeper into the rabbit hole of Cyber Threat Intelligence:

- **STIX 2.1 Specification:** [OASIS STIX v2.1 Official Standard](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html)
- **TAXII 2.1 Specification:** [OASIS TAXII v2.1 Documentation](https://docs.oasis-open.org/cti/taxii/v2.1/os/taxii-v2.1-os.html)
- **The Diamond Model of Intrusion Analysis:** Sergio Caltagirone, Andrew Pendergast, Christopher Betz (2013) - [A Technical Report on the Diamond Model](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond_intrusion_model.pdf)
- **Diamond Model Deep Dive:** [The Diamond Model of Intrusion Analysis on Medium](https://anticitizenone.medium.com/the-diamond-model-of-intrusion-analysis-cf24934b3c18)
- **Pyramid of Pain:** David Bianco's original paper on [The Pyramid of Pain](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- **Traffic Light Protocol (TLP v2.0):** [FIRST Standards - TLP Version 2.0](https://www.first.org/tlp/)
- **MITRE ATT&CK Framework:** [MITRE ATT&CK Matrix for Enterprise](https://attack.mitre.org/)

---

And that’s a wrap, folks! This is your neela dal paglu signing off until next time!! See you there in the next blog, I have more things cooking!!
