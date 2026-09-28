---
title: "GRC for AI: A Beginner's Guide to Governance, Risk, and Compliance"
author: "Rishi Shukla"
date: "2026-09-26"
tags: [GRC, AI Governance, Cybersecurity, Compliance, ISO 42001, NIST AI RMF, DPDP Act]
---

# GRC for AI: A Beginner's Guide to Governance, Risk, and Compliance

Imagine you walk into your bank and apply for a loan. You hand over your salary slips, your PAN card, your address, your spending history. That data doesn't just sit in a drawer — the bank uses it, stores it, and shares parts of it with credit bureaus, insurers, and regulators. But there's one thing the bank is *not* allowed to do: hand your data over to some random third party so that party can profit from it. Banking regulation exists precisely to stop that.

Now compare that to a free AI chatbot. Paste the same salary slip into it to "summarize my finances," and by default, on many consumer AI tools, that conversation can be stored and used to improve the company's models — unless you specifically go into settings and opt out. It's not illegal, it's usually disclosed somewhere in the terms of service, but it's a completely different data relationship than the one you have with your bank. Nobody signed you up for it explicitly, and most people never read the settings page closely enough to notice.

That gap — the difference between "data handled inside a regulated, accountable system" and "data handled inside a system with looser or unclear rules" — is exactly the problem **GRC** exists to close.

This post breaks down what GRC is, why it suddenly matters so much in the age of AI, and how organizations actually use it — in plain language, with real examples.

## What is GRC?

GRC stands for **Governance, Risk, and Compliance**.

It's a structured approach organizations use to make sure technology (and now, specifically, AI) is used safely, responsibly, and within the law — instead of everything happening in an unmonitored, ad-hoc way.

A simple way to think about the three pieces:

- **Governance** — who decides the rules, and who is accountable for them. In the bank example, this is the bank's internal data-handling policy plus the regulations RBI imposes on it.
- **Risk** — what could go wrong, and how likely and damaging is it. What happens if that salary data leaks? What happens if an AI model trained partly on customer data starts leaking patterns back out to other users?
- **Compliance** — are we actually following the laws and standards we're supposed to. Is the bank actually enforcing its own policy, or is it just a PDF nobody reads?

## The AI Risk Landscape: Why This Suddenly Matters

Here's a scenario almost everyone can relate to: we give AI tools like ChatGPT *everything* — our questions, our documents, sometimes even sensitive company data — but we rarely stop to ask what happens to that data after we hit send.

This isn't hypothetical. In 2023, engineers at **Samsung's semiconductor division** pasted confidential source code and internal meeting notes into ChatGPT to get help fixing bugs and summarizing meetings. Because that data left the company's systems and entered a third-party AI tool, Samsung had no way to guarantee it wouldn't be retained, reviewed, or used elsewhere. The company responded by banning generative AI tools on company devices entirely and started building internal AI tools instead. This single incident is now one of the most cited case studies in enterprise AI governance — it's the textbook example of what happens when there's no GRC policy governing how employees use AI.

Many people assume "it's fine, our data probably doesn't leave our country" or "surely they don't actually use my chats" — but those are assumptions, not guarantees, and they depend entirely on the specific tool, its data-residency settings, its subscription tier, and its contract terms. For instance, OpenAI has stated that consumer ChatGPT conversations may by default be used to help train and improve its models unless the user actively opts out in settings — while its business/API tiers are handled differently. That's a legitimate business practice, disclosed in the terms of service — but it's precisely the kind of detail a GRC framework forces an organization to actually check, rather than assume.

This is exactly why organizations that handle sensitive data increasingly look at private, self-hosted, or enterprise-tier AI deployments — with contractual guarantees around data use — rather than relying purely on free public AI tools.

### Example: BFSI (Banking, Financial Services, and Insurance)

This is exactly why the **BFSI sector** is so cautious with AI. A bank can't let customer financial data flow freely into an external AI tool — a leak here isn't just embarrassing, it can trigger regulatory penalties, lawsuits, and a total collapse of customer trust. Going back to our opening example: the bank is bound, by law and by contract, to protect your salary data. A general-purpose AI company with no such binding relationship to you is under no obligation to treat your data with the same level of care — unless a GRC framework is deliberately built to require it.

This is where GRC steps in: it creates rules for how AI can be used, and shapes those rules so that data stays safe and the organization stays accountable — closing exactly the gap illustrated above.

## Adapting Your GRC Framework for AI

AI systems make mistakes — they can hallucinate facts, encode bias, or leak information they shouldn't. Because of this, organizations are adapting their GRC programs with AI-specific standards and frameworks. Here are the major ones, explained simply:

- **ISO/IEC 27001** — the long-standing international standard for information security management systems (ISMS). It's about protecting *all* organizational information, not AI-specific, but it's the foundation most AI governance work builds on top of.
- **ISO/IEC 42001** — the world's first international standard specifically for an **AI Management System (AIMS)**, published in December 2023. It gives organizations a certifiable, auditable way to govern how they develop, provide, or use AI — covering things like risk assessment, transparency, and accountability across the AI lifecycle. Companies including AWS, Microsoft, and Anthropic have been certified against it.
- **NIST AI Risk Management Framework (AI RMF)** — a voluntary framework from the US National Institute of Standards and Technology, first published in January 2023. It's built around four core functions:
  - **Govern** — build the culture, policies, and accountability structures that hold everything together
  - **Map** — understand the context: what is this AI system for, who does it affect, what could go wrong
  - **Measure** — actually test and quantify the risks (bias, security gaps, reliability issues)
  - **Manage** — act on what you found: prioritize, fix, and keep monitoring

  In July 2024, NIST extended this with a **Generative AI Profile**, adding risk categories specific to large language models — things like hallucination, data poisoning, and misuse for harmful content generation. Unlike ISO 42001, the NIST AI RMF is **not certifiable** — it's a shared vocabulary and methodology, not a badge you can earn.
- **RBI / SEBI** — India's financial regulators. The most significant recent development here is the RBI's **FREE-AI Framework** (Framework for Responsible and Ethical Enablement of Artificial Intelligence), released on 13 August 2025 after a committee chaired by IIT Bombay's Prof. Pushpak Bhattacharyya. It sets out 7 guiding principles ("Sutras") and 26 recommendations across six pillars — Infrastructure, Policy, Capacity, Governance, Protection, and Assurance — for how Indian banks, NBFCs, and fintechs should govern their use of AI, covering bias, explainability, cybersecurity, and incident reporting.

## A Simple Mental Model: 4 Layers of AI Governance

Beyond specific standards, it helps to have a simple internal model for how AI governance actually works day-to-day inside a team. One useful way to structure it:

**1. Govern**
Decide the policies and rules for how AI can and can't be used in the organization. This includes staying current — following credible security and AI governance blogs, vendor advisories, and regulator updates. This is also where an organization would have written the rule Samsung didn't have in early 2023: "do not paste source code or confidential documents into third-party AI tools."

**2. Identify**
Actively look for vulnerabilities and risks in your AI systems. A classic example: your AI model might be biased against certain groups — for instance, evaluating loan applications less favorably for one demographic than another purely due to skewed training data. Catching this early is the whole point of this step.

**3. Control**
Once a risk is identified, put safeguards in place to prevent it from actually happening — access controls, output filtering, human review for high-stakes decisions, blocking uploads of certain file types to consumer AI tools, and so on.

**4. Monitor**
Governance doesn't stop at deployment. This is the continuous work of watching the AI system in production to make sure it keeps behaving as expected — and watching *how employees are actually using AI tools* day to day, since that's where most real-world incidents (like Samsung's) actually happen.

*(Note: this four-layer model is a practical mental map for teams, not a formal named standard — it's a simplified way to think through the lifecycle, distinct from the official NIST AI RMF functions listed above.)*

## Regulator Reality: The Laws You Actually Have to Follow (India Focus)

- **DPDP Act, 2023** (Digital Personal Data Protection Act) — India's dedicated personal data protection law, enacted 11 August 2023.
- **RBI Master Directions / FREE-AI Framework** — sector-specific rules and guidance for regulated financial entities.
- **ISO/IEC standards** — including 27001 and 42001, discussed above.

### What AI Teams Must Know About the DPDP Act, 2023

- **Consent is central.** Processing personal data generally requires clear, informed consent from the "Data Principal" (the individual the data belongs to) — organizations can't assume old consent automatically covers new AI use cases. This is exactly the difference between our bank and AI-chatbot example: the bank has explicit consent for a defined purpose (processing your loan), while a general AI tool's consent is buried in a terms-of-service checkbox most people never read.
- **Extra protection for children's data.** The Act requires verifiable parental/guardian consent before processing a child's personal data, and bars tracking, behavioral monitoring, or targeted advertising directed at children.
- **Right to grievance redressal and correction.** Data Principals have rights including access, correction, erasure, and grievance redressal — companies need to be able to explain how someone's data is being used.
- **A dedicated regulator exists.** The **Data Protection Board of India (DPBI)** handles breach investigations, complaints, and enforcement.
- **Penalties are significant.** Depending on the violation, financial penalties can reach up to ₹250 crore (roughly USD 30 million) for failing to implement reasonable security safeguards leading to a breach, with other violation categories carrying penalties up to ₹200 crore or ₹50 crore. Individuals (Data Principals) can also be fined up to ₹10,000 for violating their own duties under the Act, such as furnishing false information.

## Data Fiduciary: Who's Responsible?

Under the DPDP Act, any entity that decides *why* and *how* personal data is processed is called a **Data Fiduciary**, and it is directly responsible for protecting that data — this is not optional. Your bank is a Data Fiduciary for your loan data. If a company builds an internal AI tool that processes customer data, that company becomes a Data Fiduciary for whatever that AI tool touches too — the obligation follows the data, not just the original collection point.

### What Happens If There's a Breach?

- If a breach occurs, the Data Fiduciary is expected to notify the Data Protection Board and the affected individuals without undue delay so they can protect themselves.
- **Penalties** scale with the severity and nature of the violation, as outlined above — this is exactly why GRC isn't just paperwork; it has real financial and legal consequences attached to it.

## Shadow AI: The Risk Most Organizations Underestimate

One risk worth calling out on its own: **"Shadow AI"** — employees using AI tools the organization never approved, reviewed, or even knows about. Samsung's 2023 incident is a textbook Shadow AI case: individual engineers, trying to be helpful and efficient, used a public tool without realizing they were moving confidential data outside the company's control. A mature GRC program doesn't just write a policy and hope people read it — it actively looks for where AI tools are already being used across the organization (browser extensions, personal accounts, free-tier signups) so it can bring that usage under governance rather than banning it outright and pushing it further underground.

## 5 Things a GRC Team Should Do to Get Started

If an organization wants to get serious about AI GRC, here's a simple starting checklist:

1. **Build an AI inventory** — know exactly which AI tools and models are being used across the organization, including the kind of Shadow AI usage described above
2. **Appoint an AI risk owner** — someone directly accountable for AI-related risk decisions
3. **Run a DPDP consent audit** — verify that valid, specific consent actually exists for how data is being used with AI tools
4. **Pilot ISO/IEC 42001 controls** — start testing this AI-specific management system standard in one business unit before rolling it out organization-wide
5. **Brief the board** — make sure leadership understands the risks involved and is aligned on the governance plan

## The CISO's AI GRC Charter

At the end of the day, it comes down to a simple idea:

**GRC professionals are the new guardians of trustworthy AI.**

As AI becomes part of everyday business operations, the people managing Governance, Risk, and Compliance aren't "checking boxes" anymore — they're the ones standing between an organization and serious data, legal, and reputational damage. The line between "a bank that protects your data" and "a tool that quietly trains on it" isn't drawn by the technology itself — it's drawn by governance.

---

*That's GRC in a nutshell: it's not about slowing AI down — it's about making sure it's used responsibly enough that it doesn't blow up in an organization's face later.*

## Sources

- ISO — [ISO/IEC 42001 explained](https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html)
- NIST — AI Risk Management Framework (AI RMF 1.0), January 2023; Generative AI Profile (NIST AI 600-1), July 2024
- Reserve Bank of India — FREE-AI Committee Report, 13 August 2025
- Digital Personal Data Protection Act, 2023 (Act 22 of 2023), Government of India
- Bloomberg / Fortune — Samsung ChatGPT data leak and generative AI ban, May 2023
- OpenAI — "How your data is used to improve model performance," Data Controls FAQ
