---
slug: htb-mumbai-meetup-19-summary
title: Summary of HTB Mumbai Meetup held on 12th September 2026 
authors: [param-jasani]

tags:
  - BYOVD
  - Kernel
  - Windows
  - EDR
  - Driver
  - PPL
  - IOCTL
  - DSE
  - EPROCESS
  - LOLDrivers
  - IoT-Security
  - Hardware-Security
  - OSINT
  - HTB-Mumbai-Meetup-Summary

date: 2026-09-13T04:00:00.000Z

description: >
  This blog is a comprehensive technical summary of the sessions presented at 
  HTB Meetup Mumbai #19 held on 12th September 2026, covering Windows Kernel BYOVD 
  attacks and IoT-to-Corporate network pivoting.
---
This blog is a summary of what was discussed and demonstrated at HTB Meetup Mumbai #19 held on 12th September 2026.

<!-- truncate -->

<style>
.diagram-container { margin: 1.8rem auto; max-width: 820px; text-align: center; }
.diagram-caption { font-size: 0.92rem; color: #4a5568; margin-top: 0.6rem; font-weight: 500; }
.diagram-img { width: 100%; max-width: 780px; border-radius: 8px; box-shadow: 0 12px 28px rgba(0,0,0,0.06); display: inline-block; }
.diagram-img.small-diagram { max-width: 450px; }
.diagram-svg { width: 100%; max-width: 780px; height: auto; display: inline-block; transition: transform 0.25s ease; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.04)); }
.diagram-svg:hover { transform: scale(1.008); }
.diagram-svg rect, .diagram-svg circle, .diagram-svg path { transition: all 0.2s ease; }
.diagram-text { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #2d3748; font-size: 12px; }
.diagram-text-muted { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #718096; font-size: 11px; }
.diagram-title { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #1a202c; font-size: 13px; font-weight: 700; }
.diagram-badge { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; fill: #2b6cb0; font-size: 11px; font-weight: 600; }
</style>

The meetup featured two deep-dive sessions focusing on offensive security, low-level architecture, and real-world penetration testing case studies:

1. **Session 1:** *"Signed Does Not Mean Safe: The BYOVD Trust Problem"* by **Sushant Mane** (Founder, The Cyber Veda India)
2. **Session 2:** *"Coffee Shop to Corporate Network: Understanding the Hidden Risks of Connected IoT Devices"* by **Omkar Mali** (Hardware & OT Security Researcher, Former IBM X-Force Red Team Member)

---

## Session 1: "Signed Does Not Mean Safe: The BYOVD Trust Problem" by Sushant Mane

The first session focused on modern Windows endpoint security, the mechanisms endpoint detection and response (EDR) solutions use to protect themselves, and how attackers leverage legitimately signed, vulnerable kernel drivers to dismantle these protections from Ring 0.

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 190" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff" />
      <stop offset="100%" stop-color="#bee3f8" />
    </linearGradient>
    <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#feebc8" />
      <stop offset="100%" stop-color="#fbd38d" />
    </linearGradient>
    <linearGradient id="flowGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7d7" />
      <stop offset="100%" stop-color="#feb2b2" />
    </linearGradient>
    <marker id="wfArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4a5568" />
    </marker>
  </defs>

  <!-- Step 1 -->
  <rect x="15" y="25" width="135" height="135" rx="10" fill="url(#flowGrad1)" stroke="#3182ce" stroke-width="1.8" />
  <rect x="25" y="35" width="24" height="20" rx="4" fill="#3182ce" />
  <text x="37" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">1</text>
  <text x="82" y="70" text-anchor="middle" class="diagram-title">OS Architecture</text>
  <text x="82" y="91" text-anchor="middle" class="diagram-text-muted">User Mode (Ring 3)</text>
  <text x="82" y="107" text-anchor="middle" class="diagram-text-muted">vs Kernel (Ring 0)</text>
  <text x="82" y="125" text-anchor="middle" class="diagram-text-muted">Driver Translation</text>

  <!-- Arrow 1-2 -->
  <line x1="150" y1="92" x2="168" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 2 -->
  <rect x="170" y="25" width="135" height="135" rx="10" fill="url(#flowGrad1)" stroke="#3182ce" stroke-width="1.8" />
  <rect x="180" y="35" width="24" height="20" rx="4" fill="#3182ce" />
  <text x="192" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">2</text>
  <text x="237" y="70" text-anchor="middle" class="diagram-title">Defenses</text>
  <text x="237" y="91" text-anchor="middle" class="diagram-text-muted">PPL Hierarchy</text>
  <text x="237" y="107" text-anchor="middle" class="diagram-text-muted">Kernel Callbacks</text>
  <text x="237" y="125" text-anchor="middle" class="diagram-text-muted">DSE Enforcement</text>

  <!-- Arrow 2-3 -->
  <line x1="305" y1="92" x2="323" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 3 -->
  <rect x="325" y="25" width="135" height="135" rx="10" fill="url(#flowGrad2)" stroke="#dd6b20" stroke-width="1.8" />
  <rect x="335" y="35" width="24" height="20" rx="4" fill="#dd6b20" />
  <text x="347" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">3</text>
  <text x="392" y="70" text-anchor="middle" class="diagram-title">BYOVD Concept</text>
  <text x="392" y="91" text-anchor="middle" class="diagram-text-muted">Signed != Safe</text>
  <text x="392" y="107" text-anchor="middle" class="diagram-text-muted">LOLDrivers Abuse</text>
  <text x="392" y="125" text-anchor="middle" class="diagram-text-muted">Local Admin Load</text>

  <!-- Arrow 3-4 -->
  <line x1="460" y1="92" x2="478" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 4 -->
  <rect x="480" y="25" width="135" height="135" rx="10" fill="url(#flowGrad2)" stroke="#dd6b20" stroke-width="1.8" />
  <rect x="490" y="35" width="24" height="20" rx="4" fill="#dd6b20" />
  <text x="502" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">4</text>
  <text x="547" y="70" text-anchor="middle" class="diagram-title">IOCTL Exploit</text>
  <text x="547" y="91" text-anchor="middle" class="diagram-text-muted">DeviceIoControl()</text>
  <text x="547" y="107" text-anchor="middle" class="diagram-text-muted">Buffer Flaws</text>
  <text x="547" y="125" text-anchor="middle" class="diagram-text-muted">Ring 0 Primitives</text>

  <!-- Arrow 4-5 -->
  <line x1="615" y1="92" x2="633" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 5 -->
  <rect x="635" y="25" width="130" height="135" rx="10" fill="url(#flowGrad3)" stroke="#e53e3e" stroke-width="1.8" />
  <rect x="645" y="35" width="24" height="20" rx="4" fill="#e53e3e" />
  <text x="657" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">5</text>
  <text x="700" y="70" text-anchor="middle" class="diagram-title">EDR Neutralized</text>
  <text x="700" y="91" text-anchor="middle" class="diagram-text-muted">PPL Stripping</text>
  <text x="700" y="107" text-anchor="middle" class="diagram-text-muted">Callback Blinding</text>
  <text x="700" y="125" text-anchor="middle" class="diagram-text-muted">LSASS Dumping</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.1:</strong> Technical workflow of Session 1 covering Windows Kernel Architecture, EDR defenses, and BYOVD exploitation.</figcaption>
</figure>
</div>

---

### Part 1: Operating System Fundamentals & Privilege Boundaries

To understand how security tools defend Windows and why attackers target the kernel, it is necessary to examine how the operating system partitions memory and privilege.

#### 1. User Mode (Ring 3) vs. Kernel Mode (Ring 0)

Modern processor architectures (such as x86/x64) implement hardware privilege rings to enforce execution boundaries:

- **User Mode (Ring 3):** Standard user applications, background services, and third-party software execute here. In User Mode, every process operates inside its own isolated virtual address space. A user-mode application cannot directly read or write memory belonging to another process or the kernel, nor can it execute privileged CPU instructions. If an application crashes due to an unhandled exception, only that individual process terminates; the underlying operating system remains intact.
- **Kernel Mode (Ring 0):** The core operating system executive (`ntoskrnl.exe`), the Hardware Abstraction Layer (HAL), and kernel-mode device drivers execute here. Kernel code runs in a single, shared flat virtual address space with unrestricted access to physical memory, hardware I/O ports, and CPU control registers. An unhandled exception or memory corruption in Ring 0 triggers a system bugcheck (`KeBugCheckEx`), resulting in a **Blue Screen of Death (BSOD)**.

<div class="diagram-container">
<figure>
<img class="diagram-img small-diagram" src="https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Priv_rings.svg/330px-Priv_rings.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" alt="CPU privilege rings - Ring 0 kernel mode vs Ring 3 user mode" />
<figcaption class="diagram-caption"><strong>Fig 1.2:</strong> CPU privilege rings. Ring 0 operates with full hardware authority, while Ring 3 enforces process isolation.</figcaption>
</figure>
</div>

#### 2. The Role of Device Drivers

A **device driver** is a software component that facilitates communication between the Windows Executive and physical hardware (or virtual devices). Because hardware devices require direct memory mapping and interrupt handling, hardware drivers execute in **Kernel Mode (Ring 0)**.

To visualize this, consider an application sending a print job:
1. The application issues a high-level API call.
2. The operating system formats the request and passes it to the printer driver.
3. The printer driver translates the abstract print command into hardware-specific commands understood by the printer's internal controller.

:::tip
Because drivers reside in **Ring 0**, any vulnerability inside a driver runs with the full authority of the Windows kernel, completely bypassing user-mode restrictions.
::: 

---

### Part 2: Windows Defensive Primitives Explained

Security products (Antivirus, EDR, and digital forensics tools) deploy kernel-mode drivers to gain visibility and enforce active defenses. The session examined four fundamental defensive mechanisms:

#### 1. Protected Process Light (PPL)

Windows historically allowed any process running with administrative privileges (`SeDebugPrivilege`) to inspect, modify, or terminate any other user-mode process. To prevent malware with local administrator rights from tampering with core system components, Microsoft introduced the **Protected Process (PP)** model in Windows Vista (initially for digital rights management) and expanded it in Windows 8.1 to **Protected Process Light (PPL)**.

PPL creates a protected container around critical services such as `lsass.exe` (Local Security Authority Subsystem Service) and antimalware processes (like Windows Defender's `MsMpEng.exe`).

PPL enforces a hierarchical trust model governed by the process signer level:

| Level (Decimal) | Signer Value (Hex) | Signer Name | Hierarchy Rank | Target Protected Processes |
|:---:|:---:|---|---|---|
| **7** | `0x07` / `0x82` | `WinSystem` | **Highest Authority** | Core kernel system components, `smss.exe` |
| **6** | `0x06` / `0x72` | `WinTcb` | Trusted Computing Base | `csrss.exe`, `services.exe` |
| **5** | `0x05` / `0x62` | `Windows` | Standard OS Services | `wininit.exe`, `lsaiso.exe` |
| **4** | `0x04` / `0x52` | `Lsa` | Identity & Secrets Target | **`lsass.exe`** (Credential storage) |
| **3** | `0x03` / `0x42` | `Antimalware` | Security Software | **AV/EDR Engines** (`MsMpEng.exe`) |
| **2** | `0x02` / `0x32` | `CodeGen` | Compiler Services | Dynamic code generation tools |
| **1** | `0x01` / `0x22` | `Authenticode` | Signed Applications | Authenticode-signed 3rd-party software |
| **0** | `0x00` / `0x00` | `None` | **Lowest (Unprotected)** | Standard user applications & malware |

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pplGradHigh" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2b6cb0" />
      <stop offset="100%" stop-color="#2c5282" />
    </linearGradient>
    <linearGradient id="pplGradMid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#319795" />
      <stop offset="100%" stop-color="#285e61" />
    </linearGradient>
    <linearGradient id="pplGradTarget" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#805ad5" />
      <stop offset="100%" stop-color="#553c9a" />
    </linearGradient>
    <linearGradient id="pplGradLow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e53e3e" />
      <stop offset="100%" stop-color="#9b2c2c" />
    </linearGradient>
  </defs>

  <!-- Background container -->
  <rect x="10" y="10" width="760" height="320" rx="14" fill="#f7fafc" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Level 7 / 6 -->
  <rect x="40" y="28" width="700" height="40" rx="8" fill="url(#pplGradHigh)" />
  <text x="60" y="53" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Level 7 / 6: WinSystem / WinTcb</text>
  <text x="720" y="53" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Highest Authority ,  CSRSS, SMSS, Services</text>

  <!-- Level 5 -->
  <rect x="40" y="76" width="700" height="40" rx="8" fill="url(#pplGradHigh)" />
  <text x="60" y="101" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Level 5: Windows</text>
  <text x="720" y="101" text-anchor="end" font-family="sans-serif" font-size="12" fill="#e2e8f0">Standard Windows OS Services (wininit.exe)</text>

  <!-- Level 4 - LSA (High Value Target) -->
  <rect x="40" y="124" width="700" height="46" rx="8" fill="url(#pplGradTarget)" stroke="#d6bcfa" stroke-width="2" />
  <text x="60" y="152" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Level 4: Lsa (lsass.exe)</text>
  <text x="720" y="152" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fed7e2">[Target] Credential Storage & Kerberos Tickets</text>

  <!-- Level 3 - Antimalware -->
  <rect x="40" y="178" width="700" height="40" rx="8" fill="url(#pplGradMid)" />
  <text x="60" y="203" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Level 3: Antimalware</text>
  <text x="720" y="203" text-anchor="end" font-family="sans-serif" font-size="12" fill="#e6fffa">Third-Party EDR / AV Engines (MsMpEng.exe)</text>

  <!-- Level 1 - Authenticode -->
  <rect x="40" y="226" width="700" height="38" rx="8" fill="#4a5568" />
  <text x="60" y="250" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Level 1: Authenticode</text>
  <text x="720" y="250" text-anchor="end" font-family="sans-serif" font-size="12" fill="#cbd5e0">Signed User Applications</text>

  <!-- Level 0 - None (Unprotected) -->
  <rect x="40" y="272" width="700" height="38" rx="8" fill="url(#pplGradLow)" />
  <text x="60" y="296" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Level 0: None (Unprotected)</text>
  <text x="720" y="296" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fff5f5">Lowest Rank ,  Standard Apps & Malware (Blocked from Levels 1-7)</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.3:</strong> Windows Protected Process Light (PPL) Signer Hierarchy. Lower tiers cannot acquire write/terminate handles to higher tiers.</figcaption>
</figure>
</div>

The protection level is stored inside the kernel's internal process representation structure, `EPROCESS`, in the `PS_PROTECTION` field:

```c
typedef struct _PS_PROTECTION {
    union {
        UCHAR Level;
        struct {
            UCHAR Type   : 3; // PS_PROTECTED_TYPE (None=0, ProtectedLight=1, Protected=2)
            UCHAR Audit  : 1; // Audit mode flag
            UCHAR Signer : 4; // PS_PROTECTED_SIGNER (None, Authenticode, Antimalware, Lsa, Windows, WinTcb, etc.)
        } s;
    };
} PS_PROTECTION, *PPS_PROTECTION;
```

When a process requests a handle to another process via the standard Windows API `OpenProcess`, the kernel evaluates the caller's protection level against the target:
- A non-PPL process (`Level 0`) attempting to open a handle to a PPL process (`Level 3` or `Level 4`) with permissions such as `PROCESS_TERMINATE`, `PROCESS_VM_READ`, or `PROCESS_VM_WRITE` will receive an `ACCESS_DENIED` (error code `5`) response, even if the caller is running as `NT AUTHORITY\SYSTEM`.

#### 2. Kernel Callbacks (The EDR Nervous System)

To detect and intercept threats in real time, EDR drivers register **Kernel Callbacks**. These routines subscribe to operating system events directly inside the kernel:

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cbArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2b6cb0" />
    </marker>
    <marker id="cbArrowRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e53e3e" />
    </marker>
  </defs>

  <!-- User Space Box -->
  <rect x="20" y="20" width="210" height="200" rx="10" fill="#edf2f7" stroke="#cbd5e0" stroke-width="1.8" />
  <text x="125" y="48" text-anchor="middle" class="diagram-title">User Mode (Ring 3)</text>
  <rect x="35" y="65" width="180" height="60" rx="6" fill="#ffffff" stroke="#a0aec0" />
  <text x="125" y="90" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Attacker / Malware</text>
  <text x="125" y="108" text-anchor="middle" class="diagram-text-muted">Calls OpenProcess() / Exec</text>

  <rect x="35" y="140" width="180" height="65" rx="6" fill="#fff5f5" stroke="#feb2b2" />
  <text x="125" y="165" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#c53030">Blocked Action</text>
  <text x="125" y="185" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e53e3e">STATUS_ACCESS_DENIED</text>

  <!-- Kernel Space Box -->
  <rect x="280" y="20" width="480" height="200" rx="10" fill="#ebf8ff" stroke="#bee3f8" stroke-width="1.8" />
  <text x="520" y="48" text-anchor="middle" class="diagram-title">Kernel Mode (Ring 0)</text>

  <!-- Windows Executive -->
  <rect x="300" y="65" width="200" height="135" rx="8" fill="#ffffff" stroke="#3182ce" />
  <text x="400" y="90" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2b6cb0">Windows Executive</text>
  <text x="400" y="108" text-anchor="middle" class="diagram-text-muted">(ntoskrnl.exe Core)</text>
  <line x1="315" y1="120" x2="485" y2="120" stroke="#e2e8f0" />
  <text x="400" y="138" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4a5568">PspCreateProcessNotify</text>
  <text x="400" y="156" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4a5568">ObRegisterCallbacks</text>
  <text x="400" y="174" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4a5568">PspLoadImageNotify</text>

  <!-- EDR Kernel Driver -->
  <rect x="540" y="65" width="200" height="135" rx="8" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="1.8" />
  <text x="640" y="90" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2c5282">EDR Kernel Driver</text>
  <text x="640" y="108" text-anchor="middle" class="diagram-text-muted">(Registered Routines)</text>
  <line x1="555" y1="120" x2="725" y2="120" stroke="#bee3f8" />
  <text x="640" y="142" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2b6cb0">Synchronous Inspection</text>
  <text x="640" y="162" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4a5568">Handle Stripping</text>
  <text x="640" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4a5568">Pre-Execution Block</text>

  <!-- Arrows -->
  <line x1="215" y1="95" x2="292" y2="95" stroke="#2b6cb0" stroke-width="1.8" marker-end="url(#cbArrow)" />
  <line x1="500" y1="100" x2="532" y2="100" stroke="#2b6cb0" stroke-width="1.8" marker-end="url(#cbArrow)" />
  <line x1="540" y1="150" x2="508" y2="150" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#cbArrowRed)" />
  <line x1="300" y1="170" x2="223" y2="170" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#cbArrowRed)" />
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.4:</strong> Kernel Callbacks Model. EDR drivers subscribe to low-level system events to inspect and block malicious operations synchronously.</figcaption>
</figure>
</div>

The primary kernel callback registration APIs include:

- **`PsSetCreateProcessNotifyRoutineEx`:**
  - *Standard Usage:* Allows drivers to receive notifications whenever a process is created or exits.
  - *EDR Enforcement:* The callback receives a pointer to `PS_CREATE_NOTIFY_INFO`. If the EDR determines the binary or parent-child relationship is malicious, it sets `CreationStatus = STATUS_ACCESS_DENIED`. The kernel immediately aborts process creation before the main thread ever executes.
- **`PsSetCreateThreadNotifyRoutine`:**
  - *Standard Usage:* Tracks thread creation across the system.
  - *EDR Enforcement:* Detects remote thread creation (such as process injection via `CreateRemoteThread`).
- **`PsSetLoadImageNotifyRoutine`:**
  - *Standard Usage:* Notifies registered drivers when an executable image (EXE, DLL, or driver) is mapped into memory.
  - *EDR Enforcement:* Scans mapped modules and checks digital signatures before execution starts.
- **`ObRegisterCallbacks`:**
  - *Standard Usage:* Object Manager callback that intercepts handle operations on processes, threads, and desktop objects.
  - *EDR Enforcement:* When an attacker attempts to open a handle to a security process (`OpenProcess`), the EDR driver intercepts the pre-operation callback (`OB_PRE_OPERATION_CALLBACK`) and dynamically strips high-privilege access masks (such as `PROCESS_TERMINATE`, `PROCESS_VM_WRITE`, and `PROCESS_DUP_HANDLE`).
- **`CmRegisterCallbackEx`:**
  - *Standard Usage:* Registers a registry filtering callback.
  - *EDR Enforcement:* Blocks unauthorized modifications to persistence keys (e.g., Run keys, Services registry hives).

#### 3. Driver Signature Enforcement (DSE)

To prevent attackers from loading unsigned rootkits, 64-bit Windows enforces **Driver Signature Enforcement (DSE)**. Managed by the Code Integrity module (`CI.dll`), DSE requires all kernel drivers to have a valid digital signature counter-signed by Microsoft before they can be loaded into memory.

DSE state is controlled by global variables inside `CI.dll`, primarily `g_CiEnabled` (and `g_CiOptions` on modern releases). If a driver binary is unsigned or its certificate chain is invalid, `NtLoadDriver` fails with `STATUS_INVALID_IMAGE_HASH`.

---

### Part 3: The Trust Breakdown & The BYOVD Concept

While DSE ensures that only digitally signed drivers can be loaded, **a cryptographic signature validates authorship and integrity, it does not validate code safety.**

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 180" xmlns="http://www.w3.org/2000/svg">
  <!-- Box 1: What DSE Checks -->
  <rect x="20" y="20" width="350" height="140" rx="10" fill="#ebf8ff" stroke="#3182ce" stroke-width="1.8" />
  <rect x="35" y="32" width="20" height="20" rx="10" fill="#38a169" />
  <text x="45" y="46" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">✓</text>
  <text x="65" y="47" class="diagram-title" fill="#2b6cb0">What DSE Validates</text>
  <text x="35" y="76" class="diagram-text">• Valid CA Certificate Chain</text>
  <text x="35" y="96" class="diagram-text">• Microsoft WHQL Counter-Signature</text>
  <text x="35" y="116" class="diagram-text">• Binary Hash Matches Digest</text>
  <text x="35" y="136" font-family="sans-serif" font-size="11" font-weight="bold" fill="#38a169">Result: Driver Loads Successfully</text>

  <!-- Box 2: What DSE Ignores -->
  <rect x="410" y="20" width="350" height="140" rx="10" fill="#fff5f5" stroke="#e53e3e" stroke-width="1.8" />
  <rect x="425" y="32" width="20" height="20" rx="10" fill="#e53e3e" />
  <text x="435" y="46" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">✕</text>
  <text x="455" y="47" class="diagram-title" fill="#c53030">What DSE Does NOT Validate</text>
  <text x="425" y="76" class="diagram-text">• Unchecked IOCTL Input Buffers</text>
  <text x="425" y="96" class="diagram-text">• Arbitrary Kernel Read/Write Logic</text>
  <text x="425" y="116" class="diagram-text">• Unvalidated Process Kill Routines</text>
  <text x="425" y="136" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e53e3e">Result: Attackers Exploit Ring 0 Flaws</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.5:</strong> The BYOVD Trust Paradox. Cryptographic validity does not guarantee memory safety or exploit resistance.</figcaption>
</figure>
</div>

#### What is Bring Your Own Vulnerable Driver (BYOVD)?

**BYOVD** is an offensive technique in which an attacker with local administrative privileges drops a legitimate, officially signed third-party driver that contains known security vulnerabilities (such as arbitrary memory read/write primitives or unvalidated process control routines) onto the target machine.

Because the driver is properly signed, Windows loads it through standard service mechanisms (`sc create` / `sc start`). The attacker then communicates with the driver from user space to exploit its flaws, executing arbitrary logic with Kernel Mode (Ring 0) authority.

Known vulnerable drivers are indexed publicly on repositories like **[LOLDrivers.io](https://www.loldrivers.io)** (Living Off The Land Drivers), tracking thousands of drivers capable of bypassing security controls.

---

### Part 4: The Communication Mechanism ,  The IOCTL Interface

To interact with a kernel driver, user-mode software uses the standard Windows Input/Output Control (**IOCTL**) interface.

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ioctlArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3182ce" />
    </marker>
  </defs>

  <!-- User Mode Left -->
  <rect x="20" y="20" width="320" height="190" rx="10" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.8" />
  <text x="180" y="48" text-anchor="middle" class="diagram-title">User Mode (Ring 3 Client)</text>
  <rect x="35" y="65" width="290" height="55" rx="6" fill="#ffffff" stroke="#e2e8f0" />
  <text x="45" y="88" font-family="monospace" font-size="11" fill="#2b6cb0">CreateFile("\\\\.\\DeviceName")</text>
  <text x="45" y="106" font-family="sans-serif" font-size="11" fill="#718096">Acquires open HANDLE to driver</text>

  <rect x="35" y="130" width="290" height="65" rx="6" fill="#ffffff" stroke="#e2e8f0" />
  <text x="45" y="152" font-family="monospace" font-size="11" fill="#2b6cb0">DeviceIoControl(hDev, CODE, InBuf)</text>
  <text x="45" y="172" font-family="sans-serif" font-size="11" fill="#e53e3e">Crafted malicious payload buffer</text>

  <!-- Kernel Mode Right -->
  <rect x="440" y="20" width="320" height="190" rx="10" fill="#ebf8ff" stroke="#3182ce" stroke-width="1.8" />
  <text x="600" y="48" text-anchor="middle" class="diagram-title">Kernel Mode (Vulnerable Driver)</text>
  <rect x="455" y="65" width="290" height="55" rx="6" fill="#ffffff" stroke="#bee3f8" />
  <text x="465" y="88" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2c5282">Named Device Object</text>
  <text x="465" y="106" font-family="sans-serif" font-size="11" fill="#4a5568">\\Device\\VulnDriver created in DriverEntry</text>

  <rect x="455" y="130" width="290" height="65" rx="6" fill="#fff5f5" stroke="#feb2b2" />
  <text x="465" y="152" font-family="monospace" font-size="11" font-weight="bold" fill="#c53030">IRP_MJ_DEVICE_CONTROL</text>
  <text x="465" y="172" font-family="sans-serif" font-size="11" fill="#e53e3e">Flawed buffer validation executes Ring 0 write</text>

  <!-- Connecting Arrows -->
  <line x1="325" y1="92" x2="442" y2="92" stroke="#3182ce" stroke-width="1.8" marker-end="url(#ioctlArrow)" />
  <line x1="325" y1="162" x2="442" y2="162" stroke="#3182ce" stroke-width="1.8" marker-end="url(#ioctlArrow)" />
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.6:</strong> IOCTL Communication Architecture. User-mode clients issue control codes to kernel driver dispatch handlers via DeviceIoControl.</figcaption>
</figure>
</div>

#### 1. Legitimate API Usage

1. **`CreateFile`:**
   - *Standard Function:* Opens a handle to a file, directory, or device object.
   - *Driver Usage:* The user-mode client calls `CreateFile` with a device interface path (e.g., `\\\\.\\VulnDriverDevice`) to obtain an open handle (`HANDLE`) to the driver.
2. **`DeviceIoControl`:**
   - *Standard Function:* Sends a control code and data buffers directly to a device driver.
   - *Syntax:*
     ```c
     BOOL DeviceIoControl(
       HANDLE       hDevice,
       DWORD        dwIoControlCode,
       LPVOID       lpInBuffer,
       DWORD        nInBufferSize,
       LPVOID       lpOutBuffer,
       DWORD        nOutBufferSize,
       LPDWORD      lpBytesReturned,
       LPOVERLAPPED lpOverlapped
     );
     ```
   - *Driver Handling:* Inside the driver, the I/O Manager wraps this request into an I/O Request Packet (IRP) with major function code `IRP_MJ_DEVICE_CONTROL` and routes it to the driver's registered dispatch routine.

#### 2. The Vulnerability Mechanism

Vulnerabilities arise when the driver's dispatch routine processes input buffers without validating memory pointers, buffer lengths, or caller authorization:
- **Arbitrary Memory Read/Write:** The driver accepts raw memory addresses from `lpInBuffer` and performs direct memory copies (`memcpy`, `memmove`) between user space and kernel space without verifying address ranges (e.g., failing to use `ProbeForRead` / `ProbeForWrite`).
- **Exposed Kernel Functionality:** The driver exposes an IOCTL that directly calls privileged kernel routines (such as `ZwTerminateProcess`, `ZwOpenProcess`, or physical memory mapping functions) on behalf of any user-mode caller.

---

### Part 5: Complete BYOVD Attack Workflow & EDR Killer Mechanics

The session demonstrated the end-to-end execution chain used by real-world threat actors and modern ransomware families (such as BlackCat, AvosLocker, and Akira) to neutralize security controls:

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 270" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="atArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e53e3e" />
    </marker>
  </defs>

  <!-- Row 1 -->
  <!-- Step 1 -->
  <rect x="20" y="20" width="220" height="95" rx="8" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.5" />
  <rect x="30" y="30" width="22" height="18" rx="4" fill="#3182ce" />
  <text x="41" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">1</text>
  <text x="60" y="44" class="diagram-title">Initial Access & Admin</text>
  <text x="30" y="68" class="diagram-text-muted">Foothold via Phishing / Exploit</text>
  <text x="30" y="86" class="diagram-text-muted">Elevates to SeLoadDriverPrivilege</text>

  <!-- Arrow 1-2 -->
  <line x1="240" y1="67" x2="272" y2="67" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#atArrow)" />

  <!-- Step 2 -->
  <rect x="280" y="20" width="220" height="95" rx="8" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.5" />
  <rect x="290" y="30" width="22" height="18" rx="4" fill="#3182ce" />
  <text x="301" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">2</text>
  <text x="320" y="44" class="diagram-title">Drop & Load Driver</text>
  <text x="290" y="68" class="diagram-text-muted">Drops signed vulnerable .sys</text>
  <text x="290" y="86" class="diagram-text-muted">Loads via sc create / sc start</text>

  <!-- Arrow 2-3 -->
  <line x1="500" y1="67" x2="532" y2="67" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#atArrow)" />

  <!-- Step 3 -->
  <rect x="540" y="20" width="220" height="95" rx="8" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.5" />
  <rect x="550" y="30" width="22" height="18" rx="4" fill="#3182ce" />
  <text x="561" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">3</text>
  <text x="580" y="44" class="diagram-title">Open Device Handle</text>
  <text x="550" y="68" class="diagram-text-muted">CreateFile("\\\\.\\VulnDev")</text>
  <text x="550" y="86" class="diagram-text-muted">Connects user-mode exploit loader</text>

  <!-- Clean Loop-Around Arrow from Row 1 [Step 3] to Row 2 [Step 4] -->
  <path d="M 650 115 L 650 133 L 130 133 L 130 142" fill="none" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#atArrow)" />

  <!-- Row 2 -->
  <!-- Step 4 -->
  <rect x="20" y="150" width="220" height="95" rx="8" fill="#fff5f5" stroke="#feb2b2" stroke-width="1.5" />
  <rect x="30" y="160" width="22" height="18" rx="4" fill="#e53e3e" />
  <text x="41" y="173" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">4</text>
  <text x="60" y="174" class="diagram-title" fill="#c53030">Send Malicious IOCTL</text>
  <text x="30" y="198" class="diagram-text-muted">DeviceIoControl(IOCTL_CODE)</text>
  <text x="30" y="216" class="diagram-text-muted">Triggers Ring 0 write / routine</text>

  <!-- Arrow 4-5 -->
  <line x1="240" y1="197" x2="272" y2="197" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#atArrow)" />

  <!-- Step 5 -->
  <rect x="280" y="150" width="220" height="95" rx="8" fill="#fff5f5" stroke="#feb2b2" stroke-width="1.5" />
  <rect x="290" y="160" width="22" height="18" rx="4" fill="#e53e3e" />
  <text x="301" y="173" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">5</text>
  <text x="320" y="174" class="diagram-title" fill="#c53030">Neutralize Defenses</text>
  <text x="290" y="198" class="diagram-text-muted">Kill MsMpEng.exe / EDR</text>
  <text x="290" y="216" class="diagram-text-muted">Strip PPL / Blind Callbacks</text>

  <!-- Arrow 5-6 -->
  <line x1="500" y1="197" x2="532" y2="197" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#atArrow)" />

  <!-- Step 6 -->
  <rect x="540" y="150" width="220" height="95" rx="8" fill="#ebf8ff" stroke="#3182ce" stroke-width="1.5" />
  <rect x="550" y="160" width="22" height="18" rx="4" fill="#3182ce" />
  <text x="561" y="173" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff">6</text>
  <text x="580" y="174" class="diagram-title" fill="#2b6cb0">Unrestricted Action</text>
  <text x="550" y="198" class="diagram-text-muted">Dump LSASS via Mimikatz</text>
  <text x="550" y="216" class="diagram-text-muted">DSE Patching / Unsigned Rootkit</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 1.7:</strong> End-to-end BYOVD Attack Chain from initial access to kernel-level defense impairment.</figcaption>
</figure>
</div>

#### Step 1: Establishing Administrative Privileges
Loading a kernel driver requires `SeLoadDriverPrivilege` (granted to local Administrators and `SYSTEM`). Once an initial foothold is gained, standard privilege escalation techniques are used to elevate to administrative context.

#### Step 2: Dropping and Registering the Vulnerable Driver
The attacker writes the signed driver binary (e.g., `wsftprm.sys`, `truesight.sys`, or `mhyprot2.sys`) to disk. Because the driver carries a valid digital certificate, default file scanners do not block it.

The driver is registered and started using the Service Control Manager (`sc.exe`):
```cmd
sc create THM_LOVES_TCV binPath= "C:\Users\creep\Desktop\vulndriver.sys" type= kernel
sc start THM_LOVES_TCV
```

#### Step 3: Communicating with the Driver
The user-mode exploit loader acquires a handle to the driver:
```c
HANDLE hDriver = CreateFileA(
    "\\\\.\\WSFTPRM",
    GENERIC_READ | GENERIC_WRITE,
    0,
    NULL,
    OPEN_EXISTING,
    FILE_ATTRIBUTE_NORMAL,
    NULL
);
```

#### Step 4: Neutralizing EDR Defenses

Attackers employ several methods depending on the vulnerable driver's capabilities:

##### Method A: Direct Process Termination via Driver Dispatch
In the live demonstration, the speaker leveraged a vulnerable driver (`wsftprm.sys`, CVE-2023-52271) abused by `AV-EDR-Killer`:
- **Vulnerability Details:** Triggered via IOCTL `0x22201C` with a 1036-byte buffer. The first 4 bytes contain the target Process ID (PID) as a DWORD.
- **Underlying Execution:** Upon receiving this IOCTL, the driver executes the kernel API `ZwTerminateProcess` on the requested PID.
- Because `ZwTerminateProcess` originates from **Ring 0**, user-mode PPL protections and `ObRegisterCallbacks` filters are completely bypassed.
- **Target Processes Terminated:**
  - `MsMpEng.exe` (Microsoft Defender core antimalware service)
  - `NisSrv.exe` (Microsoft Network Realtime Inspection Service)
  - `SecurityHealthService.exe` (Windows Security Center service)
  - `smartscreen.exe` (Windows Defender SmartScreen)

```
[+] Driver initialized successfully!
[+] Driver ready for operation, Handle: 0x8aadcff970
[*] Scanning for target processes...
  -- Found MsMpEng.exe - PID: 2296
[*] Killing MsMpEng.exe ...
[+] IOCTL 0x22201C sent for PID: 2296
  -- Found NisSrv.exe - PID: 4776
[*] Killing NisSrv.exe ...
[+] IOCTL 0x22201C sent for PID: 4776
```

##### Method B: PPL Stripping via Direct Kernel Object Manipulation (DKOM)
When using a driver that provides arbitrary read/write primitives (such as the RTCore64 driver utilized in `PPLKiller` by Mattiwatti):
1. The exploit locates the base address of the kernel (`ntoskrnl.exe`) and finds the active process list (`PsInitialSystemProcess`).
2. It walks the `ActiveProcessLinks` doubly linked list to locate the target `EPROCESS` structure (e.g., `lsass.exe` or the EDR process).
3. Using documented struct offsets (cataloged by the **Vergilius Project** across various Windows build versions), it targets the `_PS_PROTECTION` byte.
4. **PPL Stripping:** It writes `0x00` into `EPROCESS.Protection.Level`, downgrading the process to an unprotected state. Standard tools can then open handles with full access rights.
5. **PPL Elevation:** Alternatively, the exploit writes `0x72` (`WinTcb`) into the attacker's own process `_PS_PROTECTION` field, granting it authority to inspect any other protected process on the machine.

##### Method C: Blinding Kernel Callbacks
Instead of terminating the EDR process (which might trigger external watchdog alerts), advanced attackers zero out kernel callback arrays:
1. The attacker locates unexported kernel callback arrays such as `PspCreateProcessNotifyRoutine`, `PspCreateThreadNotifyRoutine`, and `PspLoadImageNotifyRoutine`.
2. Each array holds up to 64 callback routine pointers encoded using pointer alignment masks.
3. The exploit locates the entries belonging to the EDR's driver module and writes `NULL` (or replaces them with pointers to a dummy `RET` instruction).
4. **Result:** The EDR user-mode agent continues running normally, reporting a healthy state, while remaining completely blind to newly spawned processes, injected threads, and loaded modules.

---

### Part 6: Post-Exploitation & DSE Patching

Once kernel-level control is established and security software is neutralized:

#### 1. LSASS Credential Dumping
With PPL stripped or EDR drivers blinded, tools such as **Mimikatz** execute unhindered:
```cmd
mimikatz # privilege::debug
mimikatz # sekurlsa::logonpasswords
mimikatz # coffee
```
Attackers dump cleartext credentials, NTLM hashes, and Kerberos tickets directly from `lsass.exe` memory.

#### 2. DSE Patching (The Door to Unsigned Rootkits)
Using the kernel write primitive, tools like `DSE-Patcher` locate the Code Integrity variable `g_CiEnabled` (or `g_CiOptions`) in `CI.dll` memory:
1. The exploit overwrites `g_CiOptions` with `0x0` (disabling digital signature checks).
2. The attacker loads custom, unsigned kernel rootkits to achieve persistent, covert Ring 0 control.
3. The exploit restores the original `g_CiOptions` value to evade periodic integrity validation routines.

---

### Part 7: Defensive Countermeasures & Mitigations

Defending against BYOVD requires a defense-in-depth strategy:

1. **Microsoft Vulnerable Driver Blocklist & WDAC:**
   - Enforce **Windows Defender Application Control (WDAC)** policies configured with Microsoft's recommended driver block rules.
   - Enable **Hypervisor-Protected Code Integrity (HVCI)** / Memory Integrity to enforce driver blocklists at the hypervisor layer.
2. **Logic-Based YARA Rules:**
   - Rather than matching volatile file hashes (which attackers modify by altering non-functional metadata or padding), YARA rules should match specific IOCTL dispatch opcodes and unique code patterns of known-vulnerable drivers.
3. **Kernel Telemetry & Integrity Watchdogs:**
   - Implement EDR self-monitoring that periodically verifies the integrity of registered kernel callbacks and driver service states.
4. **Credential Guard & Zero Trust:**
   - Enable **Windows Defender Credential Guard**, which isolates LSASS secrets inside a Virtual Secure Mode (VSM) enclave powered by the Hyper-V hypervisor, preventing even Ring 0 kernel code from accessing plaintext keys.

---

## Session 2: "Coffee Shop to Corporate Network: Understanding the Hidden Risks of Connected IoT Devices" by Omkar Mali

The second session presented an end-to-end red team case study demonstrating how a seemingly benign, untrusted smart device, a smart refrigerator in a corporate café, can be exploited to compromise an enterprise active directory environment, corporate email systems, VPN gateways, and internal video surveillance infrastructure.

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 190" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iotGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#feebc8" />
      <stop offset="100%" stop-color="#fbd38d" />
    </linearGradient>
    <linearGradient id="iotGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff" />
      <stop offset="100%" stop-color="#bee3f8" />
    </linearGradient>
    <linearGradient id="iotGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7d7" />
      <stop offset="100%" stop-color="#feb2b2" />
    </linearGradient>
  </defs>

  <!-- Step 1 -->
  <rect x="15" y="25" width="135" height="135" rx="10" fill="url(#iotGrad1)" stroke="#dd6b20" stroke-width="1.8" />
  <rect x="25" y="35" width="24" height="20" rx="4" fill="#dd6b20" />
  <text x="37" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">1</text>
  <text x="82" y="70" text-anchor="middle" class="diagram-title">Physical Access</text>
  <text x="82" y="91" text-anchor="middle" class="diagram-text-muted">Kiosk Multi-Touch</text>
  <text x="82" y="107" text-anchor="middle" class="diagram-text-muted">Panel Escape</text>
  <text x="82" y="125" text-anchor="middle" class="diagram-text-muted">Network Intel</text>

  <!-- Arrow 1-2 -->
  <line x1="150" y1="92" x2="168" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 2 -->
  <rect x="170" y="25" width="135" height="135" rx="10" fill="url(#iotGrad1)" stroke="#dd6b20" stroke-width="1.8" />
  <rect x="180" y="35" width="24" height="20" rx="4" fill="#dd6b20" />
  <text x="192" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">2</text>
  <text x="237" y="70" text-anchor="middle" class="diagram-title">OSINT & Auth</text>
  <text x="237" y="91" text-anchor="middle" class="diagram-text-muted">Chinese Docs (.cn)</text>
  <text x="237" y="107" text-anchor="middle" class="diagram-text-muted">AI Translation</text>
  <text x="237" y="125" text-anchor="middle" class="diagram-text-muted">Dev Wi-Fi Creds</text>

  <!-- Arrow 2-3 -->
  <line x1="305" y1="92" x2="323" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 3 -->
  <rect x="325" y="25" width="135" height="135" rx="10" fill="url(#iotGrad2)" stroke="#3182ce" stroke-width="1.8" />
  <rect x="335" y="35" width="24" height="20" rx="4" fill="#3182ce" />
  <text x="347" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">3</text>
  <text x="392" y="70" text-anchor="middle" class="diagram-title">Device Exploit</text>
  <text x="392" y="91" text-anchor="middle" class="diagram-text-muted">Unauth Web Portal</text>
  <text x="392" y="107" text-anchor="middle" class="diagram-text-muted">Compressor Off</text>
  <text x="392" y="125" text-anchor="middle" class="diagram-text-muted">Firmware Flashing</text>

  <!-- Arrow 3-4 -->
  <line x1="460" y1="92" x2="478" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 4 -->
  <rect x="480" y="25" width="135" height="135" rx="10" fill="url(#iotGrad2)" stroke="#3182ce" stroke-width="1.8" />
  <rect x="490" y="35" width="24" height="20" rx="4" fill="#3182ce" />
  <text x="502" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">4</text>
  <text x="547" y="70" text-anchor="middle" class="diagram-title">Network Pivot</text>
  <text x="547" y="91" text-anchor="middle" class="diagram-text-muted">No VLAN Isolation</text>
  <text x="547" y="107" text-anchor="middle" class="diagram-text-muted">30+ Workstations</text>
  <text x="547" y="125" text-anchor="middle" class="diagram-text-muted">5 Network Printers</text>

  <!-- Arrow 4-5 -->
  <line x1="615" y1="92" x2="633" y2="92" stroke="#4a5568" stroke-width="1.8" marker-end="url(#wfArrow)" />

  <!-- Step 5 -->
  <rect x="635" y="25" width="130" height="135" rx="10" fill="url(#iotGrad3)" stroke="#e53e3e" stroke-width="1.8" />
  <rect x="645" y="35" width="24" height="20" rx="4" fill="#e53e3e" />
  <text x="657" y="49" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">5</text>
  <text x="700" y="70" text-anchor="middle" class="diagram-title">Domain & VPN</text>
  <text x="700" y="91" text-anchor="middle" class="diagram-text-muted">OWA Spray & MFA 0</text>
  <text x="700" y="107" text-anchor="middle" class="diagram-text-muted">VPN Password Reset</text>
  <text x="700" y="125" text-anchor="middle" class="diagram-text-muted">Camera Feeds</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 2.1:</strong> Technical workflow of Session 2 covering the Coffee Shop to Corporate Network Attack Path.</figcaption>
</figure>
</div>

---

### Part 1: The Expanding IoT & Automotive Attack Surface

The speaker introduced the concept that modern IoT devices are full-fledged networked computers embedded with sensors, proprietary firmware, and continuous cloud connectivity. 

To contextualize the severity of IoT and connected embedded architectures, the speaker highlighted the **Connected Vehicle Attack Surface**, referencing real-world research against modern autonomous and connected vehicles (such as the KIA vehicle vulnerability). In that scenario, security researchers demonstrated that knowing only a vehicle's public **Vehicle Identification Number (VIN)** allowed attackers to query backend telematics web APIs, remotely track live GPS coordinates, unlock vehicle doors, honk horns, and start engines over the internet without requiring physical proximity or access to the key fob.

The same architectural flaws observed in automotive ecosystems, weak API authentication, hardcoded developer credentials, and lack of firmware validation, exist in everyday smart appliances.

---

### Part 2: The Coffee Shop Attack Scenario & Physical UI Escape

:::note

**Engagement Scenario & Constraints:**
> **Environment:** An operator is seated in a ground-floor coffee shop/café shared with upper-floor corporate employees as an auxiliary break room.


> **Hardware Footprint:** Minimalist setup consisting solely of a standard laptop, no Software-Defined Radios (SDRs), high-gain directional antennas, or physical network taps.
:::

#### 1. Physical Footprint & UI Kiosk Escape
To identify attack vectors without raising suspicion from café staff or patrons:
- The operator approached the smart refrigerator under the guise of dispensing water from the integrated panel.
- **Kiosk Mode Bypass:** Modern interactive appliance touchscreens run locked-down Android or embedded Linux user interfaces. The operator performed a **multi-finger long-press gesture (3-finger or 4-finger hold)** on the display.
- This interaction triggered the underlying operating system's engineering menu, escaping the kiosk environment into standard system settings.
- **Data Harvested from Screen:** Internal IP address, subnet mask, default gateway, device model number, and the local Wi-Fi configuration.

---

### Part 3: OSINT, AI-Assisted Translation & Default Developer Credentials

#### 1. Vendor Reconnaissance
- Inspecting the device model confirmed the manufacturer was headquartered in China.
- Standard search queries on English domains (`.com`) yielded basic promotional brochures and user manuals with no administrative details.

#### 2. AI-Assisted Foreign Language Intelligence
- The operator pivoted searches to Chinese domains (`.cn`), searching for developer documentation, engineering guides, and test specifications.
- To analyze technical Chinese documentation, the operator utilized language models (Claude and DeepSeek) to translate engineering schematics and developer references.
- By translating technical terms such as "Default SSID" and "Factory Test Configuration" into Chinese, the operator located an engineering manual containing default Wi-Fi access point patterns:
  - **Credential Pattern:** `<ModelName>@<LaunchYear>`
- Using this pattern, the operator successfully authenticated to the refrigerator's broadcasted Wi-Fi access point.

---

### Part 4: Device Compromise & Unauthenticated Web Interfaces

Once connected to the appliance's local network:
- An Nmap port scan revealed open services:
  - Port `22/tcp` (SSH)
  - Port `80/tcp` / `8080/tcp` (HTTP Management Web Interface)
- Navigating to `http://<Refrigerator_IP>:8080/` redirected directly to the internal administrative dashboard without requesting authentication (`index.html`).
- **Management Capabilities:**
  - Full temperature control and compressor power toggles (Denial of Service).
  - Unauthenticated **Firmware Update / Upload** endpoint.
- **Firmware Flashing Analysis:** Post-assessment analysis revealed that the device accepted unsigned firmware images over USB or HTTP without cryptographic signature checks, granting unrestricted remote code execution (RCE) and low-level hardware debugging toolkit access (UART/JTAG).

---

### Part 5: Pivoting to the Corporate Network (The Missing VLAN)

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="netArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3182ce" />
    </marker>
    <marker id="netArrowRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e53e3e" />
    </marker>
  </defs>

  <!-- Left Zone: Cafe Breakroom -->
  <rect x="20" y="20" width="220" height="210" rx="10" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.5" />
  <text x="130" y="45" text-anchor="middle" class="diagram-title">Coffee Shop Breakroom</text>
  <rect x="35" y="60" width="190" height="65" rx="6" fill="#ffffff" stroke="#e2e8f0" />
  <text x="130" y="85" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Attacker Laptop</text>
  <text x="130" y="105" text-anchor="middle" class="diagram-text-muted">Wi-Fi Connection</text>

  <rect x="35" y="140" width="190" height="75" rx="6" fill="#feebc8" stroke="#fbd38d" />
  <text x="130" y="165" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c05621">Smart Refrigerator</text>
  <text x="130" y="183" text-anchor="middle" class="diagram-text-muted">Exposed AP & Web UI</text>
  <text x="130" y="200" text-anchor="middle" class="diagram-text-muted">Unauthenticated Firmware</text>

  <!-- Center Bridge: Missing Segmentation -->
  <rect x="280" y="65" width="180" height="120" rx="8" fill="#fff5f5" stroke="#feb2b2" stroke-width="1.8" />
  <text x="370" y="95" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c53030">Shared Corporate Switch</text>
  <text x="370" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e53e3e">✕ NO VLAN Isolation</text>
  <text x="370" y="140" text-anchor="middle" class="diagram-text-muted">(Cost & NOC Shortcut)</text>
  <text x="370" y="160" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2b6cb0">Flat /24 Subnet</text>

  <!-- Right Zone: Enterprise Network -->
  <rect x="500" y="20" width="260" height="210" rx="10" fill="#ebf8ff" stroke="#bee3f8" stroke-width="1.5" />
  <text x="630" y="45" text-anchor="middle" class="diagram-title">Corporate Network</text>

  <rect x="515" y="60" width="230" height="48" rx="6" fill="#ffffff" stroke="#bee3f8" />
  <text x="630" y="82" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2c5282">30+ Enterprise Workstations</text>
  <text x="630" y="98" text-anchor="middle" class="diagram-text-muted">Active Directory Domain Joined</text>

  <rect x="515" y="115" width="230" height="48" rx="6" fill="#ffffff" stroke="#bee3f8" />
  <text x="630" y="137" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2c5282">5 Network Printers</text>
  <text x="630" y="153" text-anchor="middle" class="diagram-text-muted">Unauthenticated Bulk Printing</text>

  <rect x="515" y="170" width="230" height="48" rx="6" fill="#ffffff" stroke="#bee3f8" />
  <text x="630" y="192" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2c5282">Exchange / OWA Gateways</text>
  <text x="630" y="208" text-anchor="middle" class="diagram-text-muted">mail.corporate.com / VPN</text>

  <!-- Connecting Arrows -->
  <line x1="225" y1="175" x2="272" y2="125" stroke="#e53e3e" stroke-width="1.8" marker-end="url(#netArrowRed)" />
  <line x1="460" y1="125" x2="492" y2="125" stroke="#3182ce" stroke-width="1.8" marker-end="url(#netArrow)" />
</svg>
<figcaption class="diagram-caption"><strong>Fig 2.2:</strong> The Missing VLAN Architecture. The smart refrigerator bridged the untrusted physical café directly into the internal corporate network.</figcaption>
</figure>
</div>

#### 1. Architectural Failure: Lack of Network Segmentation
The café was located directly beneath a corporate office and served as an employee break room. To avoid Network Operations Center (NOC) overhead, device registration costs, and separate VLAN provisioning, network administrators had connected the smart refrigerator directly to the **primary corporate subnet**.

#### 2. Subnet Discovery
Using tools such as `nmap` and `Angry IP Scanner`, the operator enumerated the local `/24` subnet:
- **Discovered Assets:**
  - **30+ Enterprise Workstations:** Active Directory domain-joined machines exposing NetBIOS/SMB names indicating employee workstations and departmental groups.
  - **5 Enterprise Network Printers:** Exposing unauthenticated management dashboards with bulk print capabilities (uploading arbitrary documents or initiating denial-of-service paper feed loops).

---

### Part 6: External OSINT, Breached Credential Mining & Account Validation

Having identified the target corporate domain name from workstation NetBIOS responses, the operator initiated external reconnaissance:

#### 1. Email Harvesting via Phonebook.cz
- Searched the target corporate domain on **Phonebook.cz** (which indexes billions of public breach records, URLs, and email addresses).
- Retrieved dozens of corporate email addresses belonging to active employees.

#### 2. Cleartext Password Mining via DeHashed
- The operator leveraged the **DeHashed** database via an automated Python wrapper (`dehashed.py`) and **Leak-Lookup** to cross-reference the harvested email list against historical public breaches.
- **Findings:** Multiple cleartext passwords exposed from third-party non-work services (e.g., flight booking websites, hotel loyalty rewards, and personal accounts where employees registered using their corporate email addresses).
- **Password Patterns:** Predictable enterprise structures (e.g., `Company@2026!`, `Google@2026!`, `Summer2026#`) rotated quarterly.
- Deduplicating and filtering yielded 30 unique employee email addresses and 25 candidate passwords.

#### 3. Username Validation & Domain Enumeration
To avoid triggering account lockouts by blindly spraying unverified users:
- The operator used **`msmailprobe`** and **`Invoke-UsernameHarvestOWA`** / **`TraverseSpray`** against Microsoft 365 / Exchange Web Services (EWS) endpoints.
- By analyzing server timing responses and metadata validation, the operator confirmed **6 active corporate accounts** associated with the target domain.

```powershell
# Validating harvested accounts against Exchange / OWA endpoints without triggering lockouts
Invoke-UsernameHarvestOWA -ExchHostname mail.<target_domain>.com -UserList .\users.txt -Threads 3 -OutFile validated.users.txt
```

---

### Part 7: Email Account Takeover & Password Spraying

With 6 validated usernames and candidate passwords:
- The operator executed a slow password spray against the Outlook Web Access (OWA) portal using `Invoke-PasswordSprayOWA`:
  - Enforced a 10-minute sleep interval between attempts with randomized jitter to stay beneath account lockout thresholds.
- **Success:** Authenticated successfully into an active employee mailbox.

:::note
**Target Authentication Status & Security Gaps:**
> **Target Environment:** Microsoft 365 Outlook Web Access (`https://mail.<target_domain>.com/owa/`)</br>
> **Authentication Status:** Successful takeover of employee domain account.</br>
> **Critical Vulnerability 1:** **No Multi-Factor Authentication (MFA)** was enforced for this account.</br>
> **Critical Vulnerability 2:** Account status was marked **"Out of Office" (OOO / Vacation)**, minimizing risk of concurrent session alerts.
:::

#### Stealthy Email Reconnaissance
To avoid triggering endpoint DLP or SOC file-download alerts:
- The operator reviewed messages exclusively through OWA's **web preview mode**.
- The mailbox contained internal communications, client spreadsheets, and technical onboarding messages.

---

### Part 8: Corporate VPN Gateway Compromise

Inside the compromised mailbox, the operator discovered a recent email sent from an encrypted ProtonMail address containing VPN onboarding credentials:
- **VPN Password Reset Interception:**
  1. The operator navigated to the corporate **Palo Alto GlobalProtect VPN** portal.
  2. Initiated a "Forgot Password" self-service reset for the compromised employee email.
  3. The time-sensitive One-Time Passcode (OTP) was delivered directly into the compromised Outlook inbox.
  4. The operator completed verification, established a new VPN password, and deleted the password-reset notification email to maintain persistence.
- **Internal Network Access:** Authenticated to the corporate network through the GlobalProtect VPN client.

---

### Part 9: Surveillance Infrastructure Discovery & Critical Intelligence

Operating from inside the corporate internal network via the VPN tunnel, the operator conducted subnet discovery:

#### 1. Video Management System (VMS) Access
- Located exposed internal surveillance servers running **Milestone / Camera XP IP Camera** systems with default/weak credentials.
- Gained access to live video surveillance feeds across multiple operational zones:
  - Main floor cameras
  - VIP gaming areas (Blackjack, High-Limit tables, Roulette)

#### 2. Underground Operations Discovered
- Deeper reconnaissance of connected internal management applications uncovered live streaming of illicit Russian Roulette competitions (displaying prize boards structured at $1M, $20M, and $60M tiers).
- Internal database records revealed tracking telemetry for physical shock collars, matching profiles of individuals cataloged in public missing persons databases.
- Exposed administrative documents recorded falsified hospital records and unauthorized post-mortem organ trade logs.
- The operator immediately halted assessment activities, documented forensic artifacts, and escalated the findings to authorized legal and investigative authorities.

---

### Part 10: Threat Modeling, OPSEC & Defensive Lessons

#### 1. Threat Modeling with the STRIDE Framework
The session highlighted that structured threat modeling must always precede technical testing:

| STRIDE Category | Description | IoT / Refrigerator Scenario Mapping |
|---|---|---|
| **Spoofing** | Impersonating an identity or device | Connecting to Wi-Fi using hardcoded developer credentials; MAC spoofing |
| **Tampering** | Modifying data in transit or memory | Unauthenticated firmware flashing; altering temperature settings |
| **Repudiation** | Denying performed actions | Lack of audit logging on embedded appliance endpoints |
| **Information Disclosure** | Exposing sensitive data | Leaking corporate subnets; cleartext password exposure via DeHashed |
| **Denial of Service** | Disrupting service availability | Shutting down refrigerator compressors; printer paper flood attacks |
| **Elevation of Privilege** | Gaining unauthorized access | Escaping touch panel kiosk mode; resetting corporate VPN passwords |

<div class="diagram-container">
<figure>
<svg class="diagram-svg" viewBox="0 0 780 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="triGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3182ce" />
      <stop offset="100%" stop-color="#2b6cb0" />
    </linearGradient>
    <linearGradient id="triGradBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff" />
      <stop offset="100%" stop-color="#bee3f8" />
    </linearGradient>
  </defs>

  <!-- Container Box -->
  <rect x="20" y="15" width="740" height="230" rx="12" fill="#f7fafc" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Triangle Integrity (Top) -->
  <polygon points="390,30 270,140 510,140" fill="url(#triGradTop)" stroke="#2b6cb0" stroke-width="2" />
  <text x="390" y="85" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">INTEGRITY (I)</text>
  <text x="390" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e2e8f0">The Bedrock of Trust</text>
  <text x="390" y="125" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bee3f8">Firmware • Memory • Signatures</text>

  <!-- Confidentiality (Bottom Left) -->
  <polygon points="270,140 150,225 390,225" fill="url(#triGradBase)" stroke="#3182ce" stroke-width="1.5" />
  <text x="270" y="180" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2c5282">CONFIDENTIALITY (C)</text>
  <text x="270" y="200" text-anchor="middle" class="diagram-text-muted">Credential & Data Protection</text>

  <!-- Availability (Bottom Right) -->
  <polygon points="510,140 390,225 630,225" fill="url(#triGradBase)" stroke="#3182ce" stroke-width="1.5" />
  <text x="510" y="180" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#2c5282">AVAILABILITY (A)</text>
  <text x="510" y="200" text-anchor="middle" class="diagram-text-muted">Operational Continuity</text>

  <!-- Side Annotations -->
  <rect x="40" y="45" width="190" height="70" rx="6" fill="#fff5f5" stroke="#feb2b2" />
  <text x="135" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#c53030">If INTEGRITY Fails:</text>
  <text x="135" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e53e3e">• Firmware is backdoored</text>
  <text x="135" y="102" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e53e3e">• Memory structs manipulated</text>

  <rect x="550" y="45" width="190" height="70" rx="6" fill="#fff5f5" stroke="#feb2b2" />
  <text x="645" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#c53030">Cascade Consequence:</text>
  <text x="645" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e53e3e">• Confidentiality Leaks (PPL strip)</text>
  <text x="645" y="102" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e53e3e">• Availability Outages (BSOD/DoS)</text>
</svg>
<figcaption class="diagram-caption"><strong>Fig 2.3:</strong> The CIA Triad Hierarchy. Integrity is the foundational pillar; if Integrity collapses, Confidentiality and Availability fail.</figcaption>
</figure>
</div>

#### 2. Operational Security (OPSEC) Pitfalls
- **Browser Maximization Fingerprinting:** Maximizing Tor Browser or privacy browsers leaks exact desktop display dimensions and monitor aspect ratios, enabling canvas and viewport fingerprinting across web sessions.
- **ISP-Level Monitoring:** Tor traffic entry and exit nodes remain visible to Internet Service Providers without dedicated encrypted encapsulation.

#### 3. Core Defensive Takeaways
- **Network Micro-Segmentation:** Isolate all IoT, smart appliances, building controls, and guest networks into dedicated VLANs with zero routing to corporate Active Directory environments.
- **Mandatory Phishing-Resistant MFA:** Enforce hardware-token (FIDO2/WebAuthn) or authenticator-based MFA across all external identity providers (OWA, M365, VPNs).
- **Disable Default Services & Interfaces:** Deactivate unnecessary Wi-Fi access points, Bluetooth discovery, and unauthenticated web interfaces on embedded hardware.
- **Credential Exposure Monitoring:** Regularly monitor breach databases for compromised corporate email credentials and enforce strict credential hygiene.

---

## References and Further Reading

### Windows Kernel & BYOVD Security (Session 1)
- **[LOLDrivers.io](https://www.loldrivers.io)** ,  Living Off The Land Drivers curated database of vulnerable, signed Windows drivers used in real-world attacks.
- **[Vergilius Project](https://www.vergiliusproject.com/)** ,  Comprehensive index of undocumented Windows kernel structures (`_EPROCESS`, `_ETHREAD`, `_PS_PROTECTION`) across OS versions.
- **[Microsoft Recommended Driver Block Rules](https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-defender-application-control/microsoft-recommended-driver-block-rules)** ,  Official WDAC and HVCI driver blocklist guidelines.
- **[TrueSight Killer (GitHub)](https://github.com/jnahmias/truesight-killer)** ,  Proof-of-concept tool demonstrating EDR termination via vulnerable driver IOCTL abuse.
- **[AV-EDR-Killer (GitHub)](https://github.com/Ph4nt0m-c/AV-EDR-Killer)** ,  Open-source BYOVD implementation leveraging `wsftprm.sys` (CVE-2023-52271).
- **[PPLKiller by Mattiwatti (GitHub)](https://github.com/Mattiwatti/PPLKiller)** ,  Tool demonstrating PPL stripping and DKOM manipulation via vulnerable signed drivers.
- **[DSE Patcher (GitHub)](https://github.com/fengjixuchui/DsePatcher)** ,  Demonstrates disabling Driver Signature Enforcement via kernel write primitives.
- **[Protected Processes & PPL Architecture (Alex Ionescu)](https://www.alex-ionescu.com/?p=97)** ,  Fundamental research on Windows Protected Process Light internals.
- **[Windows Kernel Programming by Pavel Yosifovich](https://leanpub.com/windowskernelprogramming)** ,  Reference book for Windows kernel architecture, driver development, and IOCTL dispatching.
- **[HEVD Windows Kernel Exploitation: Stack Overflow (Sushant Mane)](https://medium.com/@sushant.m.mane/hevd-windows-kernel-exploitation-stack-overflow-12be551350f1)** ,  Practical analysis of stack-overflow exploitation in the HackSys Extreme Vulnerable Driver.
- **[Kernel Shield: Reversing the NSEckrnl Malops.io Rootkit Driver (Sushant Mane)](https://medium.com/@sushant.m.mane/kernel-shield-reversing-the-nseckrnl-malops-io-rootkit-driver-fb4af6bcb19c)** ,  Reverse-engineering research on the NSEckrnl rootkit driver and kernel-level defensive techniques.

### IoT Security, Threat Modeling & OSINT (Session 2)
- **[OWASP Internet of Things (IoT) Top 10](https://owasp.org/www-project-internet-of-things/)** ,  Standard security awareness documentation covering weak passwords, insecure interfaces, and lack of firmware validation.
- **[Phonebook.cz](https://phonebook.cz)** ,  Open-source intelligence tool for domain and email enumeration.
- **[DeHashed](https://www.dehashed.com/)** & **[Leak-Lookup](https://leak-lookup.com/)** ,  Public breach search engines for credential exposure auditing.
- **[Microsoft STRIDE Threat Model](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)** ,  Structural framework for categorizing threats (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).
- **[Automotive Security Research: Remote Vehicle Takeover](https://samcurry.net/web-hackers-vs-the-auto-industry/)** ,  Detailed analysis of connected vehicle API vulnerabilities allowing remote tracking and control via VIN numbers.
- **[TraverseSpray & msmailprobe (GitHub)](https://github.com)** ,  Tools for enumerating Microsoft 365 Exchange endpoints and performing password spraying.
