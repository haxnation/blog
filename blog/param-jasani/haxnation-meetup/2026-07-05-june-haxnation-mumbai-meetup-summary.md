---
slug: haxnation-mumbai-meetup-june26-summary
title: Summary of Haxnation Mumbai Meetup held on 27th June 2026
authors: [param-jasani]

tags:
  - GRC
  - AI
  - Security
  - Phishing
  - Social-Engineering
  - Email-Security
  - Evilginx
  - GoPhish
  - Session-Hijacking
  - DPDP-Act-2023
  - ISO-42001
  - QUIC-Bypass
  - Haxnation-Meetup-Summary

date: 2026-08-09T04:00:00.000Z

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
GRC stands for Governance, Risk, and Compliance - the three core components that keep an organization secure and legally sound. 
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

> *"GRC professionals are the new AI guardians." - Dr. Deepak D. Kalambkar*

<br/>


## Session 2: "Everything Looks Legit Until It Doesn't" by Mahadev Gavas

Alright, now this is where the fun begins. If Session 1 was about building the walls, Session 2 is about understanding the people who try to walk right through them - while looking like they belong there.

### What is Phishing?
- <mark>Phishing is a type of attack where an attacker **tricks people into trusting something fake** and getting them to take an action they normally would.</mark>
- Phishing works by **pretending to be something legitimate**, such as:
    - A trusted company or brand
    - A colleague, supplier, or manager
    - A login page, cloud service, or internal system
- <mark>It relies on **abusing human trust and normal behavior.**</mark>

> Think about it - when you receive an email from "HR" asking you to review a new policy document, your first instinct is to click the link, not to check the email headers. That's exactly what phishing exploits: the fact that we trust our daily workflows and the people we interact with.

### Defense → Attack: Why Understanding Detection Matters

This part was really interesting. Mahadev made a point that really stuck:

- <mark>Understanding detection is more important than simply performing a phishing attack</mark>, particularly in professional and defensive security engagements.
- What **separates a serious security professional from a script-kiddie** is knowing:
    - *Why* an email was blocked?
    - *Which control* caught it?
    - At *what stage* it was detected?
- **If you don't understand detection, you're just pressing "send".**

> This is a crucial mindset shift. Anyone can clone a website and send a phishing email using a template. But if you don't know *why* your email got blocked or *how* the target's email gateway flagged it, you're not doing security - you're doing guesswork. Understanding the defensive side first is what makes you effective on the offensive side.

### Detection Methods (and How Attackers Try to Bypass Them)

Now this is where it gets really juicy. Mahadev covered the various detection methods that email security gateways, proxies, and security tools use to catch phishing - and by extension, what an attacker needs to understand if they want to operate professionally in red team engagements.

#### 1. Suspicious TLD (Top-Level Domain)
- **What is it?** <mark>A Top-Level Domain (TLD) is the last part of a domain name - the `.com`, `.org`, `.in` part.</mark> Security tools maintain lists of TLDs that are commonly abused for phishing, such as `.xyz`, `.top`, `.click`, `.buzz`, `.rest`, etc. These are cheap to register and frequently used by attackers, so email gateways flag or block emails coming from or linking to these TLDs.
- **How attackers exploit/bypass it:** They register domains under reputable TLDs like `.com`, `.org`, `.net`, or country-code TLDs like `.in` to avoid suspicion. Using a legitimate-looking TLD is step one in making a phishing domain blend in.

#### 2. Signature Detection
- **What is it?** <mark>Signature-based detection works by matching known malicious patterns - specific strings, hashes of known phishing kits, or recognized malware payloads - against incoming emails and attachments.</mark> If the content matches a known signature, it's blocked immediately.
- **How attackers exploit/bypass it:** They modify their payloads slightly (changing variable names, recompiling, adding junk data) so the hash changes, or they use custom-built phishing kits that haven't been fingerprinted yet. Polymorphic payloads that change their signature on every delivery are also used.

#### 3. URL Signature
- **What is it?** <mark>Security tools maintain databases of known malicious URLs. When an email contains a link, the URL is checked against these blocklists.</mark> If it matches a known phishing URL, the email is quarantined or the link is defanged.
- **How attackers exploit/bypass it:** They use newly registered domains that haven't been reported yet, or they use URL shorteners, redirectors (like open redirects on legitimate sites), or encode URLs to evade exact-match blocklists.

#### 4. DNS Hunting
- **What is it?** <mark>DNS hunting involves analyzing the DNS records and registration history of domains used in emails.</mark> Security tools look for newly registered domains (NRDs), domains with suspicious WHOIS info, or domains that resolve to known malicious IP ranges.
- **How attackers exploit/bypass it:** They "age" their domains by registering them weeks or months before the campaign so they don't trigger NRD alerts. They also set up proper DNS records (MX, SPF, DKIM, DMARC) to look legitimate.

#### 5. Visual Signature
- **What is it?** <mark>Visual signature detection uses image recognition and template matching to compare the visual appearance of a phishing page or email against known legitimate brands.</mark> If a page looks like a Microsoft login but is hosted on a random domain, it gets flagged.
- **How attackers exploit/bypass it:** They make subtle changes to the visual layout - altering logos slightly, changing color schemes, or using CSS tricks to make the page look different to automated scanners while still appearing legitimate to a human eye.

#### 6. URL Filtering
- **What is it?** <mark>URL filtering categorizes and blocks URLs based on their category (e.g., "phishing," "malware," "newly registered") using real-time cloud-based intelligence.</mark> Unlike URL signature (which is exact-match), URL filtering is more dynamic and uses reputation scoring.
- **How attackers exploit/bypass it:** They host phishing pages on trusted platforms (like Google Sites, Azure Blob Storage, or AWS S3) that are categorized as "Cloud/SaaS" rather than "Malicious." This way the URL inherits the trusted platform's reputation.

#### 7. TLS/SSL Fingerprinting
- **What is it?** <mark>TLS/SSL fingerprinting analyzes the characteristics of a server's TLS handshake (cipher suites, extensions, certificate details) to identify suspicious or anomalous servers.</mark> A phishing server using a free Let's Encrypt cert with unusual TLS configurations can be flagged.
- **How attackers exploit/bypass it:** They use proper SSL certificates (even paid ones), configure standard TLS settings, and use CDNs like Cloudflare that normalize TLS fingerprints behind their proxy.

#### 8. Domain Reputation
- **What is it?** <mark>Domain reputation is a score assigned to a domain based on its history - how long it's been around, whether it's been associated with spam or malware before, the volume of emails it sends, and whether it has proper email authentication (SPF, DKIM, DMARC).</mark>
- **How attackers exploit/bypass it:** They build up domain reputation over time by sending legitimate-looking emails, setting up proper authentication records, and slowly warming up the domain before launching a campaign. Some attackers even compromise existing high-reputation domains instead of registering new ones.

#### 9. Domain Categorization
- **What is it?** <mark>Web proxies and security tools categorize domains (e.g., "Business," "Technology," "Phishing," "Uncategorized"). Uncategorized or newly categorized domains are often blocked or flagged</mark> because legitimate businesses usually have an established category.
- **How attackers exploit/bypass it:** They submit their phishing domains to categorization services *before* the campaign, requesting classification as "Business" or "Technology." Or they host content on already-categorized platforms to inherit their category.

#### 10. IP Reputation
- **What is it?** <mark>Similar to domain reputation, IP reputation scores the IP address hosting the phishing infrastructure. IPs associated with spam networks, bulletproof hosting, or known malicious activity are blocklisted.</mark>
- **How attackers exploit/bypass it:** They use clean, reputable IP ranges from major cloud providers (AWS, Azure, GCP), rotate IPs, or use CDNs that mask the origin IP behind a shared, trusted IP pool.

#### 11. Server Location
- **What is it?** <mark>Security tools may flag or block content served from certain geographic locations that are commonly associated with malicious activity.</mark> If a "Bank of India" login page is hosted on a server in Eastern Europe, that's a red flag.
- **How attackers exploit/bypass it:** They host infrastructure in the same geographic region as their target. If targeting an Indian company, they use Indian cloud regions or CDN edge nodes that serve from local points of presence.

#### 12. OCR Detection
- **What is it?** <mark>OCR (Optical Character Recognition) detection scans images embedded in emails for text. Attackers sometimes embed phishing content as images to bypass text-based filters</mark> - but OCR-enabled security tools can "read" those images and detect malicious text within them.
- **How attackers exploit/bypass it:** They use visual obfuscation techniques - slightly distorting text in images, using unusual fonts, adding noise/watermarks, or splitting text across multiple images so OCR cannot reconstruct the full message.

#### 13. Sandbox Detection
- **What is it?** <mark>Sandboxing involves executing email attachments or opening links in an isolated virtual environment to observe their behavior.</mark> If a payload tries to steal credentials, download malware, or phone home to a C2 server, the sandbox catches it before it reaches the user.
- **How attackers exploit/bypass it:** They build sandbox-aware payloads that check for signs of a virtual environment (checking MAC addresses, screen resolution, mouse movement, or timing analysis) and only execute the malicious behavior when they detect a real user environment. Some payloads require user interaction (like clicking a specific button or scrolling) that automated sandboxes can't replicate.

### Phishing Requirements (What You Actually Need to Set Up)

Now that we've covered how detection works and how people try to get around it, Mahadev broke down what a phishing operation actually requires from an infrastructure standpoint. This is important for red teamers and pentesters who need to set up professional, realistic engagements, and how to prevent the target org from reaching us.

#### Infrastructure

- **Location:** Host your infrastructure in a geographic region appropriate for your target. Mahadev gives an example that supposedly the org is planning to shift its premises to a different location or open a new branch for e.g. in Dubai, so there are chances that the org has already whitelisted the IPs from that location.
- **ASN (Autonomous System Number):** <mark>The ASN identifies the network provider. Using a reputable ASN (like a major cloud provider) rather than a sketchy bulletproof hoster makes your infrastructure look legitimate.</mark>
- **Trusted Sites:** The SaaS products that the org uses comes under trusted sites.
- **Avoid Blacklisted IPs:** Ensure the IPs you use are clean and not on any blocklists.
- **Compromised SMTP:** Some attackers use compromised legitimate SMTP servers to send emails - inheriting the sender's existing reputation.

#### Domain

- **Right Domain:** Choose a domain that looks relevant and trustworthy for the campaign context.
- **Vendor Impersonation:** Register domains that mimic the target's vendors or partners.
- **Typosquatting:** <mark>Registering domains that are slight misspellings of legitimate domains (e.g., `micosoft.com` instead of `microsoft.com`, `googel.com` instead of `google.com`).</mark> Users often don't notice a single character difference.
- **TLD Change:** Using the right brand name but with a different TLD (e.g., `microsoft.org` instead of `microsoft.com`).
- **Third Party SaaS:** Using legitimate SaaS platforms (Google Forms, Typeform, etc.) to host credential harvesting pages.

#### Misc

- **SSL Certificate:** Always use HTTPS - users are trained to look for the padlock icon, and security tools flag HTTP-only sites.
- **WAF (Web Application Firewall):** Placing a WAF or CDN (like Cloudflare) in front of your phishing page to mask the origin server and add a layer of legitimacy.
- **Website Cloner:** Tools that create pixel-perfect copies of legitimate login pages.
- **SMTP:** Setting up a properly configured mail server with SPF, DKIM, and DMARC records so emails don't land in spam.

### Phishing Templates in Action

Mahadev then showed us two real phishing templates to demonstrate how legitimate these emails can look.

#### Template 1: Azure Cloud Storage Full
The first template was an email that says something along the lines of *"Your Azure Cloud Storage is full, please login to review and manage your files."* - a perfectly normal-looking notification that anyone using Azure would expect.

Now here's the interesting part - <mark>the phishing page uses **URL rewriting** (also called a transparent proxy or relay). When the victim enters their credentials on the fake login page, the attacker captures the credentials, and then the page actually logs the user into the **real Microsoft portal** using those same credentials.</mark> From the user's perspective, they typed their password, hit enter, and boom - they're on their actual Azure dashboard. Nothing suspicious happened, right? Wrong. The attacker already has the creds sitting in their logs.

> This is what makes modern phishing so dangerous - the victim never even realizes they were phished because they end up on the legitimate site. No error page, no weird redirect, no "hmm that was strange" moment. Just a smooth, clean login experience - except someone else now has your password.

#### Template 2: Amazon Voucher / Certification Discount
The second template was an **Amazon voucher email**. We've all seen these - sometimes we get mails about certification discounts, reimbursements, gift cards, or "You've won a voucher!" type deals. These are extremely effective in corporate environments because employees are used to receiving benefits, training reimbursements, and discount codes from HR or their organization's learning platforms. You see a `₹5000 Amazon Gift Card` in your inbox, and your brain goes "nice!" before it goes "wait, is this legit?"

### Email Authentication Records: SPF, DKIM, DMARC (and How Attackers Exploit Them)

Before we get into the tooling and the war story, let's quickly cover the email authentication mechanisms that defenders rely on and attackers need to understand (or abuse).

#### SPF (Sender Policy Framework)
- **What is it?** <mark>SPF is a DNS TXT record that specifies which mail servers (IP addresses) are authorized to send emails on behalf of a domain.</mark> When an email arrives, the receiving server checks if the sender's IP is listed in the domain's SPF record. If not, the email fails SPF validation.
- **How attackers exploit it:** If SPF is not configured or is set to a soft-fail (`~all`) instead of a hard-fail (`-all`), the receiving server may still accept the email - just mark it as suspicious. Attackers also exploit SPF by sending emails from compromised servers that *are* in the SPF record, or by using domains that have overly permissive SPF records (e.g., `include:_spf.google.com` which covers all of Google's infrastructure).

#### DKIM (DomainKeys Identified Mail)
- **What is it?** <mark>DKIM adds a cryptographic signature to outgoing emails. The sending server signs the email with a private key, and the receiving server verifies the signature using the public key published in the sender's DNS records.</mark> This ensures the email hasn't been tampered with in transit.
- **How attackers exploit it:** If DKIM is not configured, there's no signature to verify - so spoofed emails pass through unchecked. Attackers setting up their own phishing infrastructure will configure DKIM properly on *their* domain so their phishing emails pass DKIM validation (because DKIM validates that the email came from the domain it claims - and the attacker *does* own the phishing domain).

#### DMARC (Domain-based Message Authentication, Reporting & Conformance)
- **What is it?** <mark>DMARC ties SPF and DKIM together and tells receiving servers what to do when an email fails authentication - `none` (do nothing, just report), `quarantine` (send to spam), or `reject` (drop the email entirely).</mark> It also provides a reporting mechanism so domain owners can see who is sending emails on behalf of their domain.
- **How attackers exploit it:** Many organizations set their DMARC policy to `p=none` (monitoring mode) and never move to `quarantine` or `reject`. This means even if SPF and DKIM fail, the email still gets delivered. Attackers love this.

#### Hard Bounce vs Soft Bounce
- **Hard Bounce:** <mark>The email is permanently rejected - the recipient address doesn't exist, the domain is invalid, or the server flat-out refuses the message.</mark> Hard bounces are bad for sender reputation; too many and your sending IP/domain gets blocklisted.
- **Soft Bounce:** <mark>The email is temporarily rejected - the recipient's mailbox is full, the server is temporarily unavailable, or the message is too large.</mark> The sending server will typically retry delivery.
- **Why this matters for attackers:** When sending phishing campaigns at scale, attackers monitor bounce rates. Too many hard bounces means their sending infrastructure gets flagged and blacklisted quickly. So they validate email addresses beforehand (using tools like email verification APIs) to minimize bounces and maintain sender reputation for as long as possible.

### Real-World Phishing Engagement: A War Story from Mahadev

Now this was the absolute highlight of the session. Mahadev walked us through an actual red team phishing engagement he performed on an organization. This wasn't a hypothetical - this was a real operation, and the way it played out was wild.

#### Step 1: Initial Credential Harvest
They did the usual - set up phishing infrastructure, sent convincing emails, and harvested user credentials. Standard stuff so far. Multiple employees fell for the phish and their credentials were captured.

#### Step 2: The SOC Responds
Now here's where it gets interesting. The organization had an active SOC team, and the SOC detected that something was off. <mark>The SOC team sent out a legitimate email to the affected employees saying something like - *"You have clicked on a phishing link. Please click here to reset your password immediately."*</mark>

Note - this was a **real email from the actual SOC team**, not an impersonation. The SOC was doing their job. But Mahadev and his team were watching everything unfold in real-time from the compromised accounts, and they had to act fast.

#### Step 3: Session Hijacking (Why Password Resets Don't Always Work)
Here's the thing - <mark>Mahadev's team had already hijacked the user sessions by stealing cookies and tokens. So even if the user resets their password, **the already-active session remains valid.**</mark> Logging in and having an active session are two different things. A password reset changes the *authentication credential*, but it doesn't necessarily invalidate *existing sessions* that were already authenticated.

Making it worse, this organization was using **old Office 365** - and in older O365 implementations, <mark>resetting the password does **not** automatically log out already signed-in devices.</mark> So Mahadev's team was sitting pretty with full access even after password resets.

On top of that, as soon as they saw the SOC email come in, they quickly **added their device as a trusted device** on the compromised accounts. This meant that even if the user went through a full password reset flow, the attacker's device would remain authorized because it's now "trusted."

> Someone from the audience asked - "If we are hijacking sessions, doesn't the session eventually expire?"
>
> Great question. Mahadev explained the concept of **refresh tokens**. <mark>Most modern authentication systems use short-lived access tokens paired with longer-lived refresh tokens. When the access token expires, the refresh token is used to silently obtain a new one without re-authentication.</mark> If the attacker continuously uses the refresh token before it expires, they can maintain access indefinitely - the session essentially never dies.
>
> However, there are limits. <mark>If the organization is using server-side session management (like PHP or other server-side scripts), the server can enforce absolute session timeouts</mark> - meaning the session will be terminated after a fixed duration regardless of activity. Some systems also terminate sessions based on inactivity or anomalous behavior patterns. But many cloud services like O365 rely heavily on the refresh token model, and if the organization hasn't configured strict token lifetime policies, the attacker stays in.

#### Step 4: Scaling Up - Targeting Multiple Users
Mahadev mentioned that <mark>they don't compromise just one user at a time - they typically target 15-20 users from the organization simultaneously.</mark> Why? Because it helps them:
- **Identify defensive patterns** - how does the SOC respond? How fast do they detect? Do they email users? Do they force logouts? Do they block at the proxy level?
- **Exploit user behavior** - some users assume it's just a SOC drill or a phishing awareness exercise, so they don't bother resetting their passwords or even reading the SOC's warning email.

This multi-user approach gives the red team a much clearer picture of the organization's actual security posture.

#### Step 5: Deleting the SOC's Warning Emails
Now this was the really sneaky part. To prevent users from seeing the SOC's password reset emails and actually resetting their passwords, Mahadev's team <mark>created an **inbox rule** in the compromised email accounts.</mark>

The rule was simple - if the incoming message contains specific keywords like `"RE: Password Reset Request"` or `"Password Reset Request"`, **automatically delete the message.** This way, the SOC keeps sending warnings, but the user never sees them in their inbox.

But wait - the deleted messages were going to the **Trash folder**. A curious user might open their trash and find them. So how did they handle that?

Luckily, the organization was using a **third-party email provider** that had an option to configure auto-deletion timers for trash items. <mark>Mahadev's team turned on **developer mode** in the email settings and reduced the trash auto-delete timer to **1 hour.**</mark> So even if a deleted SOC email landed in trash, it would be permanently purged within an hour - long before most users would think to check.

#### Step 6: PWA/OVA File Abuse for URL Delivery
For delivering phishing URLs, they used **PWA (Progressive Web App) / OVA file** techniques.

> <mark>**What is this?** A PWA (Progressive Web App) is essentially a web application that can be installed on a user's device and behaves like a native app. Attackers can abuse PWAs by creating a malicious PWA that, when installed, opens a phishing page in what looks like a standalone application window - no browser URL bar visible, no obvious signs that you're on a fake site.</mark> The `.ova` (Open Virtual Appliance) format can be similarly abused to package malicious environments. In this case, Mahadev's team leveraged developer mode to push URLs through PWA functionality, making the phishing delivery mechanism harder to detect by traditional email-based controls since the URL isn't sitting directly in the email body in a conventional way.

#### Step 7: Blocked by Proxy AutoConfig (PAC) - But Not Everyone
Eventually, the SOC caught on and <mark>blocked the attacker's infrastructure at the **Proxy AutoConfig (PAC)** level.</mark>

> **What is Proxy AutoConfig (PAC)?** <mark>A PAC file is a JavaScript file that tells a web browser which proxy server to use for a given URL. Organizations deploy PAC files to route employee web traffic through their security proxies, where traffic is inspected, filtered, and logged.</mark> By adding the attacker's domains/IPs to the PAC file's blocklist, the SOC effectively cut off access for any employee whose browser was configured to use the corporate proxy.

But here's the catch - <mark>some employees were connected via **VPN**, and the VPN implementation was not properly configured.</mark> These VPN-connected users were either not routing all traffic through the corporate proxy, or their VPN split-tunneling configuration allowed direct internet access bypassing the proxy. So even though the PAC file was updated to block the phishing infrastructure, the VPN-connected employees were still reachable and exploitable.

> This is a classic example of why defense-in-depth matters. A single control (PAC/proxy blocking) failed because of a gap in another control (VPN configuration). Security is only as strong as its weakest link.

### Tooling: GoPhish & Evilginx

#### GoPhish Framework
Mahadev then gave an overview of **GoPhish**, one of the most widely used open-source phishing frameworks for security assessments.

- <mark>**GoPhish** is an open-source phishing toolkit designed for businesses and penetration testers to conduct phishing simulations.</mark> It provides a clean web UI to manage campaigns, track results, and measure employee awareness.
- The core workflow in GoPhish is:
    1. **SMTP Configuration** - Set up your sending mail server (with proper SPF, DKIM, DMARC as we discussed earlier).
    2. **Email Templates** - Create or import the phishing email. GoPhish supports template variables like `{{.FirstName}}`, `{{.LastName}}`, `{{.Email}}`, `{{.Position}}` to personalize each email.
    3. **Tracking** - GoPhish uses a `.Tracker` variable that embeds a unique tracking pixel in each email. <mark>Each recipient gets a unique `rid` (recipient ID) parameter appended to URLs and tracking pixels.</mark> This allows the framework to track who opened the email, who clicked the link, and who submitted credentials - all tied back to individual users.
    4. **Landing Page** - This is one of the most important parts. The landing page is what the user sees after clicking the link. GoPhish can clone existing login pages or host custom-built ones. Credentials submitted on the landing page are captured and logged.

#### Evilginx
Mahadev also mentioned **Evilginx**, which takes phishing to a completely different level.

- <mark>**Evilginx** is a man-in-the-middle (MiTM) attack framework used for phishing login credentials along with session cookies/tokens.</mark> Unlike traditional phishing that just captures a username and password, Evilginx acts as a **reverse proxy** sitting between the victim and the real login page.
- When the victim enters their credentials on the Evilginx-proxied page, the credentials are forwarded to the real server, the real server authenticates the user and returns session tokens/cookies, and <mark>Evilginx captures both the credentials **and** the session tokens in real-time.</mark>
- This means the attacker can bypass **MFA (Multi-Factor Authentication)** - because the victim completes the full MFA flow on the real server, and Evilginx captures the authenticated session token that comes after MFA validation. The attacker then imports this token into their own browser and has a fully authenticated session - no password or MFA needed from their side.

> This is exactly what Mahadev was doing in the real-world engagement story above - Evilginx-style session token capture is how they were able to maintain access even after password resets.

### Q&A Highlights

The audience had some great questions, and a few stood out:

#### "If we're logging in from a different device, wouldn't the SOC get alerted?"
Mahadev clarified - **logging in and stealing a session are two different things.** A new login from an unfamiliar device/location *would* trigger alerts in most SIEM/security tools. But <mark>importing a stolen session token doesn't generate a "new login" event - it looks like a continuation of the victim's existing session.</mark> To the SOC, it appears as if the legitimate user is still using their account normally.

#### "Why can't next-gen firewalls detect this? They maintain session info."
Mahadev's honest answer was - <mark>in theory, yes, next-gen firewalls and advanced security solutions *can* detect session anomalies. But in practice, it's extremely costly for businesses to maintain such granular session inspection at scale.</mark> The compute and storage overhead of tracking every session's behavioral fingerprint across thousands of users is significant. So while the technology exists, most organizations don't deploy it at the depth required to catch this kind of attack.

#### "Would a proxy detect a phishing link when it's opened?"
He said **yes, if properly configured**, the proxy would detect and block it. But here's where it gets interesting - <mark>some proxies like **Zscaler** cannot block the **QUIC protocol**.</mark>

> **What is QUIC?** <mark>QUIC (Quick UDP Internet Connections) is a modern transport layer protocol developed by Google. Unlike traditional HTTPS which runs over TCP, QUIC runs over **UDP** and uses its own encryption (built on TLS 1.3).</mark> Under the hood, it uses UDP and WebSockets, and the flow of QUIC traffic is fundamentally different from standard HTTPS traffic.
>
> Mahadev explained that they set up a **QUIC server** and rendered an **iframe** on their server to load the target website. Because <mark>Zscaler (and similarly **Netskope**) cannot natively inspect or block QUIC traffic the same way they handle HTTP/HTTPS</mark>, the phishing page loaded through QUIC effectively bypassed the proxy's URL filtering and inspection capabilities. This is a known gap in several popular CASB/SWG (Secure Web Gateway) solutions.

### Final Thoughts

The rest of the session was a live demo - Mahadev walked through setting up campaigns in GoPhish, attaching payloads, configuring email templates, and demonstrating the full attack flow end-to-end.

> **Bottom Line:** The key takeaway from Mahadev's session was this - phishing is not just about sending a dodgy email. It's an entire operation that requires careful planning of infrastructure, domains, and evasion techniques. And on the flip side, as defenders, understanding this entire chain is what helps us build better detection and response mechanisms. Every detection method has a bypass, every control has a gap - but layering them together and continuously improving is what makes the attacker's job harder.
