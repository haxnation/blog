---
slug: 2026-09-22-red-team-vs-blue-team-in-the-cloud-aws
title: Red Team vs Blue Team in the Cloud - What Changes When the Battlefield Is AWS
authors: [trupti-vibhute]
tags:
  - red-team
  - blue-team
  - AWS
  - cloud-security
  - IAM
  - CloudTrail
  - GuardDuty
  - IMDS
  - incident-response
  - cloud-penetration-testing

date: 2026-09-22T04:00:00.000Z

description: >
  A breakdown of how red team and blue team operations change when the battlefield moves
  from a traditional on-prem network to AWS ‚  where identity, not the network, is the
  new perimeter.
---
For years, red team vs blue team exercises were built around a familiar map: a corporate network, a perimeter firewall, some VLANs, and a handful of servers sitting in a data center you could physically walk into. Red teams broke in through phishing or an exposed RDP port; blue teams watched network traffic and endpoint logs for anomalies.

<!-- truncate -->

Move that same exercise into AWS, and the map changes completely. There's no perimeter to breach in the traditional sense ‚there's an API. There's no "inside the network" ,there's IAM. And the artifacts both sides fight over aren't servers, they're roles, policies, and temporary credentials that can vanish in an hour. This post looks at what actually changes for red and blue teams when the battlefield shifts to AWS, and what that means for how both sides need to operate.

---

## The Perimeter Is Gone ‚  Identity Is the New Boundary

In a traditional network, segmentation does a lot of the defensive work. In AWS, everything is reachable via an API call if you have the right credentials.

> *A single IAM role with excessive permissions can matter more than any firewall rule.* <mark>In the cloud, identity is the perimeter.</mark>

This is why red teamers increasingly talk about "IAM privilege escalation paths" the way they used to talk about "lateral movement across the LAN," and why blue teams now spend as much time on policy review as they do on network monitoring.

The shared responsibility model reinforces this. AWS secures the underlying infrastructure; the customer secures what they configure on top of it. This is why <mark>almost every real-world AWS breach traces back to misconfiguration, not a flaw in AWS itself</mark>. A public S3 bucket, an overly permissive role, or a forgotten access key sitting in a GitHub repo does more damage than any zero-day.

---

## Red Team: Attacking AWS

A red team engagement against an AWS environment typically follows a different playbook than an on-prem one.

### Reconnaissance Shifts to the Control Plane
Instead of port-scanning subnets, attackers enumerate S3 buckets, look for exposed API Gateway endpoints, and search public code repositories for leaked access keys. Cloud recon is often quieter and faster than network recon because so much of it can be done anonymously against public-facing resources.

### The Instance Metadata Service (IMDS) Becomes a Favorite Target
Any EC2 instance with an attached IAM role exposes temporary credentials to anything that can reach `169.254.169.254`. A server-side request forgery (SSRF) vulnerability in a web app running on that instance is often enough to pull those credentials and inherit whatever permissions the role carries ‚  turning a modest web bug into full account compromise.

> *This single technique has been behind several major breaches* ‚  <mark>which is exactly why AWS pushed IMDSv2 (token-based, much harder to abuse via SSRF) as the default.</mark>

### Privilege Escalation Looks Like Policy Analysis, Not Exploit Development
Rather than chaining kernel exploits, red teamers map IAM policies looking for permissions like:
- `iam:PassRole`
- `iam:CreatePolicyVersion`
- `sts:AssumeRole`

Any of these can let a low-privilege identity pivot into a high-privilege one. There are dozens of known escalation patterns here, and tools like **Pacu** and **PMapper** exist specifically to walk these graphs automatically.

### Persistence Looks Different Too
Instead of planting a backdoor on a server that might get rebuilt tomorrow, attackers create a new IAM user with an access key, add themselves to a trust policy on an existing role, or drop a small Lambda function that quietly maintains access. Because infrastructure is often ephemeral and rebuilt from templates, <mark>persistence has to live in the identity layer or the account configuration, not on a disk.</mark>

### Lateral Movement Means Moving Between Accounts, Not Just Hosts
In an AWS Organization with dozens of linked accounts, a compromised role in a low-security dev account can sometimes assume a role into production if trust policies aren't tightly scoped. This cross-account blast radius has no real equivalent in flat on-prem networks.

---

## Blue Team: Defending AWS

Defenders get a different toolkit too ‚  arguably a better one, if it's configured and actually watched.

### Logging Is Native and (Mostly) Free of Gaps
CloudTrail records essentially every API call made in an account: who called it, from where, using what credentials. This is a defender's dream compared to trying to reconstruct activity from scattered host logs ‚  **but only if** CloudTrail is enabled everywhere, sent to a centralized and immutable log store, and actually monitored.

### Purpose-Built Detection Services Do a Lot of the Heavy Lifting
- **GuardDuty** analyzes CloudTrail, VPC Flow Logs, and DNS logs for known malicious patterns ‚  like credential use from an unusual location, or an instance calling out to a crypto-mining pool.
- **Security Hub** aggregates findings across services into one view.
- **IAM Access Analyzer** flags resources and roles that are unintentionally exposed to the outside world.

### Prevention Shifts Left Into Policy-as-Code
**Service Control Policies (SCPs)** at the AWS Organization level can hard-block entire categories of dangerous actions account-wide ‚  disabling root user activity, restricting regions, or preventing the disabling of CloudTrail ‚  regardless of what an individual IAM role allows. Combined with tools like **AWS Config** rules that continuously check resources against a baseline, a lot of blue team work becomes about writing guardrails once rather than manually reviewing every change.

### Least Privilege Is the Actual Battleground
Because a stolen credential inherits whatever permissions its role has, the single highest-leverage blue team activity in AWS is tightening IAM policies down to only what's needed, rotating and short-lifetime-ing credentials, and requiring MFA for anything sensitive.

> <mark>This is less glamorous than watching a SIEM dashboard, but it's usually the difference between a contained incident and a full account takeover.</mark>

---

## A Composite Attack Path

To make this concrete, a realistic cloud intrusion often looks like this:

1. Red team finds an SSRF bug in a web application running on an EC2 instance.
2. They use it to query IMDS and steal the instance's temporary IAM credentials.
3. Those credentials have `iam:PassRole` and `lambda:CreateFunction` ‚  enough to create a new Lambda function with a more privileged role attached, executing arbitrary code as that role.
4. From there, they enumerate S3 buckets across the account and exfiltrate sensitive data.

For blue team, the detections that should have fired at each stage:
- Unusual outbound requests to IMDS from application logs.
- GuardDuty alerting on anomalous API behavior from an EC2 instance role.
- CloudTrail showing a rare `lambda:CreateFunction` call paired with `iam:PassRole`.
- Ideally, an SCP that never let that role touch IAM in the first place.

---

## What This Means in Practice

> *On-prem red/blue exercises are fundamentally about network visibility and host forensics.* <mark>Cloud red/blue exercises are fundamentally about identity, permissions, and API activity.</mark>

The tools change (CloudTrail instead of packet captures, IAM policy graphs instead of Active Directory trust maps), the pace changes (infrastructure can be stood up, attacked, and torn down in minutes), and the stakes of a single misconfiguration go up, because one over-permissioned role can be the entire ballgame.

For teams running these exercises, that means red teams need people who think like cloud architects as much as exploit developers, and blue teams need to treat IAM policy review, log centralization, and SCP guardrails as core defensive infrastructure ‚  not an afterthought bolted onto a lift-and-shift migration.

<mark>The fight hasn't gone away. It's just moved from the network layer to the control plane.</mark>

---

## References & Further Reading

- **AWS Shared Responsibility Model** ‚  [aws.amazon.com/compliance/shared-responsibility-model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- **IMDSv2** ‚  AWS's token-based metadata service hardening. [docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)
- **Pacu** ‚  Open-source AWS exploitation framework. [github.com/RhinoSecurityLabs/pacu](https://github.com/RhinoSecurityLabs/pacu)
- **PMapper** ‚  IAM privilege escalation graphing tool. [github.com/nccgroup/PMapper](https://github.com/nccgroup/PMapper)
- **Amazon GuardDuty** ‚  [aws.amazon.com/guardduty](https://aws.amazon.com/guardduty/)
- **AWS Security Hub** ‚  [aws.amazon.com/security-hub](https://aws.amazon.com/security-hub/)
- **IAM Access Analyzer** ‚  [aws.amazon.com/iam/access-analyzer](https://aws.amazon.com/iam/access-analyzer/)
- **Service Control Policies (SCPs)** ‚  [docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

