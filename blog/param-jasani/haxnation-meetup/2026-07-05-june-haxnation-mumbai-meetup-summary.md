---
slug: haxnation-mumbai-meetup-june26-summary
title: Summary of Haxnation Mumbai Meetup held on 27th June 2026
authors: [param-jasani]

tags:
  - GRC
  - AI
  - Security
  - Haxnation-Meetup-Summary

date: 2026-07-05T04:00:00.000Z

description: >
  This blog is a summary of what was taught at 
  Haxnation Meetup Mumbai held on 27th June 2026.
---
This blog is a summary of what was taught at Haxnation Meetup Mumbai held on 27th June 2026.

<!-- truncate -->

<style>
.diagram-container { margin: 1.5rem auto; max-width: 820px; text-align: center; }
.diagram-caption { font-size: 0.95rem; color: #3a3a3a; margin-top: 0.5rem; }
.diagram-img { width: 100%; max-width: 780px; border-radius: 8px; box-shadow: 0 12px 28px rgba(0,0,0,0.06); display: inline-block; }
.diagram-img.small-diagram { max-width: 350px; }
.diagram-svg { width: 100%; max-width: 780px; height: auto; display: inline-block; transition: transform 0.25s ease; }
.diagram-svg:hover { transform: scale(1.01); }
.diagram-text { font-family: ui-sans-serif, system-ui, sans-serif; fill: #4c7ece; font-size: 12px; }
.diagram-title { font-family: ui-sans-serif, system-ui, sans-serif; fill: #4c7ece; font-size: 13px; font-weight: 700; }
</style>

Before beginning the summary, I would like to tell you that if you are reading this and you did'nt show up, then you missed some serious fun and learning, come down to meetups whenever you are free, this session was packed with back to back questionaire and we had a wonderfull time learning and having fun together.

Alright alright, enough with promoting our community, so before you all cuss me virtually or cuss me in your heads, I will begin with my usual thing of summarizing the meetup down.



## Session 1: "GRC in the AI Era" by Dr. Deepak Kalambkar

### What is GRC?
GRC stands for Governance, Risk, and Compliance — the three core components that keep an organization secure and legally sound. 
- **Governance**: <mark>The governance of all policies and procedures.</mark> Depending on our company's internal rules and goals, we prepare policies that dictate how things should be run.
- **Risk**: <mark>Identifying the risks that are present in our organization</mark> and can negatively impact our business operations. 
- **Compliance**: <mark>Following the regulations put in place by various governing organizations.</mark> Depending on the field our company operates in, we must adhere to specific laws and standards (e.g., if we are in the financial sector, we must follow RBI guidelines; if dealing with healthcare, HIPAA; or DPDP Act for data protection in India).

### Why GRC Must Evolve in the AI Era
Traditional GRC was designed for humans, operating at human speed with periodic audits and annual risk reviews. But what happens when AI runs the enterprise?
- AI operates 24x7 and processes millions of micro-decisions daily.
- Our controls must match this velocity. Traditional frameworks often don't know what the AI is doing inside the organization in real-time.

#### The GRC–AI Gap
- **Risk Velocity:** Traditional cycles are quarterly/annual. AI model drift is detectable in hours.
- **Decision Maker:** Humans are auditable and explainable. Algorithms are often a black box.
- **Audit Trail:** Traditional methods rely on documented sign-offs. AI makes billions of micro-decisions where logging everything is infeasible.
- **Regulatory Triggers:** Traditional triggers involve data breaches. AI triggers involve algorithmic bias, hallucinations, and model outputs.

### The AI Risk Landscape
Dr. Deepak highlighted six critical categories every GRC professional must own:
1. **Model Risk (Hallucination & Drift):** AI confidently giving wrong answers. Model performance degrades silently over time.
2. **Data Risk (Poisoning & Privacy):** Malicious training data corrupting model behavior. Processing personal data triggers DPDP obligations.
3. **Ethical Risk (Bias & Discrimination):** AI reinforcing historical biases (gender, geography) in critical decisions like credit or hiring.
4. **Governance Risk (Shadow AI):** Employees adopting AI tools (like ChatGPT) without IT/GRC awareness. Ungoverned models mean ungoverned risk.
5. **Supply Chain Risk (Third-Party AI Vendors):** Assessing outsourced AI vendor risks, including training data lineage and architecture.
6. **Compliance Risk (Explainability Failure):** Regulators demanding to know *why* an AI made a certain decision. Without an Explainable AI (XAI) layer, this cannot be answered legally or ethically.

> <mark>**Note on BFSI Spotlight:**</mark>
> In the financial sector, these risks manifest as AI credit scoring biases (e.g., scoring applicants lower based on geography instead of credit history) or fraud detection models silently failing and being overridden by operators without an audit trail.

### Adapting the Framework (The 4-Layer AI Governance Model)
We should extend, not replace, our existing frameworks (like ISO 27001, ISO 42001, NIST AI RMF, and RBI/SEBI guidelines). The 4-layer model includes:
1. **Govern**: Board-level AI Risk Policy, AI Inventory, assigning an AI Owner, and establishing an AI Ethics Charter.
2. **Identify**: Conducting Model Risk Assessments, classifying training data, and mapping DPDP consent for AI inputs.
3. **Control**: Validating models, requiring an XAI layer, governing access to AI systems, and adversarial testing (red-teaming).
4. **Monitor**: Continuous model drift detection, automated compliance alerts, and quarterly performance audits.

### Regulatory Reality (DPDP Act 2023)
The DPDP (Digital Personal Data Protection) Act 2023 is live and AI is squarely in its scope:
- **Consent is Required:** Any AI system processing personal data to make decisions must obtain free, specific, and informed consent.
- **Right to Explanation:** Data Principals can request explanations of automated decisions affecting them.
- **Data Fiduciary Duty:** The organization remains liable even if an AI vendor processes the data.
- **Penalties:** Up to INR 250 crore per violation! 

### 5 Things to Do on Monday Morning
To summarize, here are the actionable steps for GRC professionals:
1. **Build your AI Inventory:** List every AI model and SaaS tool in use before the regulator asks.
2. **Appoint an AI Risk Owner:** Assign a Model Risk Officer.
3. **DPDP Consent Audit:** Map all AI-driven processing against consent requirements.
4. **Pilot ISO 42001 Controls:** Pick a few controls like an AI risk register and vendor questionnaire.
5. **Brief the Board:** Make AI risk a Board agenda item.

> *"GRC professionals are the new AI guardians." — Dr. Deepak D. Kalambkar*

<br/>


## Session 2: "Everything Looks Legit Until It Doesn't" by Mahadev Gavas


