---
slug: the-purdue-model
title: The Purdue Model
authors: [param-jasani]

tags:
  - ICS
  - OT
  - purdue
  - SCADA
  - DCS
  - industrial-security
  - critical-infrastructure

date: 2026-06-05T08:00:00.000Z

description: >
  The Purdue Model is a foundational architecture used to organize Industrial Control Systems (ICS) and Operational Technology (OT) environments into distinct levels. By separating industrial processes, control systems, and business networks, it helps organizations improve visibility, security, and network segmentation.
---

In this blog, we'll explore the Purdue Model, its different levels, and its role in modern industrial cybersecurity.

<style>
.diagram-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.diagram-container figure {
  text-align: center;
}

.diagram-img {
  max-width: 100%;
  height: auto;
}
</style>

<!-- truncate -->

# The Purdue Model

## Introduction 
### What is Purdue Model?
- It is a <mark>foundational hierarchical framework for organizing industrial control systems (ICS) and operational technology (OT) environments.</mark>

### Historical Context
- To understand how Purdue model came into existence, we have to take a look at CIM first, so let's start with CIM first.
- Now what is CIM? **CIM stands for Computer Integrated Manufacturing**, <mark>a technique by which discrete manufacturing companies might take advantage of computer technology to reorganize the way in which information was collected, analyzed, and used to streamline their manufacturing plants’ operations.</mark>
- CIM *was made to improve product quality, better responsiveness to customer and market and changes, higher productivity, reduced costs and higher profits, increased flexibility and faster introduction of new products.*
- So basically, in simpler words, <mark>CIM was made for the comprehensive integration of all computer systems across the entire manufacturing enterprise.</mark>
- But early CIM projects often failed or were under delivered.
- Why they failed? Often they were too narrow, ignored huge scale and complexity, paid insufficient attention to human and organizational factors and lack of a master plan.
- This is the reason why Purdue Model was developed.
> - Purdue Model is named so because it originated at **Purdue University**.
> - **Theodore J. Williams**, a professor at Purdue University and Director of the Purdue Laboratory for Applied Industrial Control, led the effort.
- CIM Reference Model Committee developed the foundational Purdue Reference Model for CIM (published as a book by Instrument Society of America in October 1989).
  - This is Type 1 Architecture.
  - Blueprint/Model of the physical organization or structure of an enterprise.
- Then Industry-Purdue University Consortium for CIM took place, in which 10 companies from the Industry took part; developed the Implementation Procedures Manual to turn the Reference Model into Master Plans.
- So that's how Purdue Enterprise Reference Architecture (PERA) came into existence (the modern day Purdue Model), PERA solved the gaps that CIM model had and became foundational.
  - This is Type 2 Architecture.
  - Models the steps of the process of developing enterprise integration.
  - Provides the framework or roadmap for analysis, design, implementation, operation, and disposal.

### But if Purdue Model was made for CIM then how did it evolve into ICS/OT security?
- As we previously discussed, **The Purdue Reference Model for CIM (Type 1)** and **Purdue Enterprise Reference Architecture (PERA) (Type 2)** were created **to solve integration problems in manufacturing**.
- It *defined hierarchical layers for how information should flow in a Computer Integrated Manufacturing environment.*
- These hierarchical structures turned out to be perfect for security as it provided -
  - Network segmentation
  - Defense in depth
  - Controlled information flows
  - Security zones and conduits
  - Placement of industrial DMZs
- So ultimately what was designed for integration became an excellent reference architecture for segmentation and zoning. 
- The Purdue Model strongly influenced many ICS security standards such as IEC 62443 (we will cover it in upcoming blogs).

Ok, enough of beating around the bush, let's get straight into learning the layers of the model.

## The Purdue/PERA Model

The Purdue Model divides an industrial environment into multiple hierarchical levels. Each level has its own purpose, systems, and responsibilities.

<div class="diagram-container">
  <figure>
    <img
      class="diagram-img"
      src="https://raw.githubusercontent.com/haxnation/blog/main/blog/param-jasani/ics-ot-sec-blogs/imgs/purdue-model.jpg"
      alt="ICS cybersecurity architecture and convergence"
    />
    <figcaption class="diagram-caption">
      <strong>Fig 1.1:</strong> The Purdue/PERA Model
    </figcaption>
  </figure>
</div>


> **Points to remember -**
> - Lower Levels = Physical Industrial Processes = Critical/Higher Potential Impact = Tough to Reach
> - Higher Levels = Business Operations = Larger Attack Surface = Easier to reach


### Layer 0 - The Physical Process
- Layer 0 contains the **physical assets and processes that produce real-world outcomes.**
- So it includes - sensors, actuators and field devices.

### Layer 1 - Basic Control
- Layer 1 contains **devices that interact directly with the physical process.**
- These devices gather information from the environment and perform actions based on instructions.
- Common examples include:
  - Sensors
  - Actuators
  - RTUs (Remote Terminal Units)
  - IEDs (Intelligent Electronic Devices)

### Layer 2 - Area Supervisory Control
- Layer 2 deals with all the **aggregation stuff for process monitoring and control, it aggregates the data from the controllers; it includes HMI and SCADA systems.**

### Layer 3 - Site Operations
- Layer 3 includes the **systems that we need to provide visibility across multiple controllers and production areas**.
- So it consists of Manufacturing Execution Systems (MES) and historians for managing and optimizing production processes.

### Layer 3.5 - The Industrial DMZ
- Layer 3.5 **acts as a Demilitarized Zone,** instead of allowing direct communication between enterprise and industrial systems, DMZ acts as a secure buffer as traffic is routed through it. 
- It consists of firewalls, IDS/IPS, etc. 

### Layer 4 - Business Planning and Logistics
- Layer 4 is where we enter the IT world from OT, it consists of **applications that are important for business operations** rather than industrial processes.
- It includes Email Servers, Corporate DBs, etc.

### Layer 5 - Enterprise Network
- Layer 5 hosts the corporate services, thus **represents the enterprise environment.**
- This layer is most exposed to external threats.
- Includes directory services, ERP systems, etc.


### Summary Table
| Level | Name                  | Primary Systems & Devices                       | Security Focus & Controls                      | Likelihood of Compromise      | Potential Impact                       |
| -------| -----------------------| -------------------------------------------------| ------------------------------------------------| -------------------------------| ----------------------------------------|
| 5     | Enterprise Network    | Corporate IT, ERP, email, internet              | Standard IT security, largest attack surface   | Higher                        | Moderate to high business impact       |
| 4     | Business Logistics    | Plant-level IT, scheduling, maintenance systems | IT/OT boundary security                        | Higher                        | Moderate to high business impact       |
| 3.5   | Industrial DMZ        | Firewalls, proxies, jump servers, data diodes   | Critical buffer zone, controlled data exchange | Medium                        | Critical buffer breach (pivoting risk) |
| 3     | Operations Management | MES, historians, engineering workstations       | Highest risk in OT; strict access controls     | Medium                        | High operational impact                |
| 2     | Supervisory Control   | SCADA servers, HMIs                             | Strong access control, continuous monitoring   | Lower (if properly segmented) | Very high physical/process impact      |
| 1     | Basic Control         | PLCs, RTUs, DCS controllers, IEDs               | Protocol security, strictly limited access     | Lower (if properly segmented) | Very high physical/process impact      |
| 0     | Physical Process      | Sensors, actuators, motors, valves, instruments | Physical security, device hardening            | Lower (if properly segmented) | Highest physical safety/process impact |

## How do we use Purdue Model in ICS/OT Security?
### Zones and Conduits
The Purdue Model’s real power in cybersecurity comes from the concepts of **Zones and Conduits**, which were formalized in IEC 62443.
- **Zones:** <mark>Logical groupings of assets that share similar security requirements and risk profiles.</mark> In practice, each Purdue level (or group of levels) often becomes one or more zones.
- **Conduits:** <mark>The secure communication channels between zones.</mark> Every conduit must be protected to the level of the highest-risk zone it connects.
- This creates clear trust boundaries and enforces defense in depth.

### Implementation in Practice
#### For New Enterprises (Greenfield) 
Easiest Scenario as we have an empty ground to play with.
- Design the network topology using Purdue levels from the beginning.
- Build physical and logical segmentation (dedicated switches, VLANs, or SDN per zone).
- Include a Level 3.5 DMZ from day one.
- Procure IEC 62443-certified components.
- Define conduits and security policies early in the project.
- Combine with zero-trust and micro-segmentation for modern flexibility.


#### For Existing Systems (Brownfield)
Legacy environments are difficult to deal with, so let's segregate it into phases -
- Assessment: Use passive discovery tools (e.g., Nozomi, Claroty, Dragos) to map assets to Purdue levels without disrupting operations.
- Gap Analysis: Identify flat networks and dangerous direct IT–OT connections.
- Phased Segmentation:
  - Start at the highest-risk boundary (usually Level 3 ↔ 3.5 or 3.5 ↔ 4).
  - Deploy industrial firewalls and data diodes.
  - Use “bump-in-the-wire” solutions for deeper levels during maintenance windows.
> **Compensating Controls for Legacy Systems** </br>
> In many brownfield environments, some Level 0–2 devices are too old to support modern segmentation or cannot be taken offline. In these cases, compensating controls are used to reduce risk:
> - **Protocol Gateways:** Act as secure intermediaries that translate protocols while enforcing strict allow/deny rules on commands and data.
> - **Network Access Control (NAC):** Restricts which devices can join the network and what they can access.
> - **Unidirectional Gateways (Data Diodes):** Allow data to flow in only one direction.



## Benefits and Remaining Challenges
### What the Purdue Model Solves Well:
- Prevents lateral movement.
- Reduces attack surface through controlled data flows
- Provides a clear framework for compliance (IEC 62443, NIST SP 800-82, etc.)
- Protects legacy systems without full replacement
- Improves visibility and incident response

### Ongoing Challenges:
- **IT/OT Convergence & IIoT:** Cloud, remote access, and wireless devices blur traditional levels.
- **Legacy Equipment:** Many Level 0–2 devices lack modern security features.
- **Cost & Disruption:** Full segmentation can be expensive in brownfield sites.
- **Rigidity**: Not every environment fits perfectly, always combine with proper risk assessment.