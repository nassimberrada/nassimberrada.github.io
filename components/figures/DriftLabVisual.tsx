"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCw, Sparkles, Activity, ShieldAlert, Cpu, Database, CheckCircle2, AlertTriangle, Eye } from "lucide-react";

interface DriftScenario {
  id: string;
  name: string;
  world: string;
  driftType: string;
  driftDescription: string;
  driftEncounter: number; // encounter index (0-based) where drift occurs
  encounters: {
    step: number;
    encounterNum: number;
    taskKey: string;
    inputQuery: string;
    trueActionBefore: string;
    trueActionAfter: string;
    feedbackTone: "positive" | "negative" | "misleading";
    surfaceStyle: "standard" | "reformatted";
  }[];
  substrateBehaviors: Record<
    string,
    {
      actions: string[]; // action produced at each encounter
      confidences: number[]; // confidence 0..1
      memoryStates: string[];
      metrics: {
        detection: string;
        recovery: string;
        retention: string;
        overUpdate?: string;
        staleness?: string;
      };
    }
  >;
}

const SCENARIOS: DriftScenario[] = [
  {
    id: "substantive_rule",
    name: "Substantive Rule Flip",
    world: "rule_world (Intake Desk)",
    driftType: "Abrupt Substantive Drift",
    driftDescription: "Corporate routing policy flips high-priority enterprise claims from Queue-Alpha to Queue-Gamma unannounced.",
    driftEncounter: 3,
    encounters: [
      {
        step: 12,
        encounterNum: 1,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #891: Tier-1 SLA validation pending director sign-off.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Alpha)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 25,
        encounterNum: 2,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #904: Quarterly compliance check with escrow holds.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Alpha)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 39,
        encounterNum: 3,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #921: High-volume settlement dispute across entities.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Alpha)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 54,
        encounterNum: 4,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #937: Unannounced mandate flip. Priority routing required.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Gamma)",
        feedbackTone: "negative",
        surfaceStyle: "standard",
      },
      {
        step: 68,
        encounterNum: 5,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #952: Multinational treasury branch dispute.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Gamma)",
        feedbackTone: "negative",
        surfaceStyle: "standard",
      },
      {
        step: 81,
        encounterNum: 6,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #968: Immediate escrow release request under memo #42.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Gamma)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 97,
        encounterNum: 7,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #984: Cross-border asset verification workflow.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Gamma)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 112,
        encounterNum: 8,
        taskKey: "enterprise_audit",
        inputQuery: "Enterprise audit req #999: End-of-quarter consolidated clearing report.",
        trueActionBefore: "route(Queue-Alpha)",
        trueActionAfter: "route(Queue-Gamma)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
    ],
    substrateBehaviors: {
      notes: {
        actions: [
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)", // enc 4: obsolete rule
          "route(Queue-Beta)",  // enc 5: exploring (stops old rule) -> d(c)=2
          "route(Queue-Gamma)", // enc 6: recovery -> rho(c)=3
          "route(Queue-Gamma)", // enc 7: stable
          "route(Queue-Gamma)", // enc 8: retained
        ],
        confidences: [0.94, 0.95, 0.96, 0.88, 0.52, 0.82, 0.91, 0.95],
        memoryStates: [
          "Rule: enterprise_audit -> Queue-Alpha (verified)",
          "Rule: enterprise_audit -> Queue-Alpha (confirmed)",
          "Rule: enterprise_audit -> Queue-Alpha (locked)",
          "Warning: Queue-Alpha rejected! Consolidating failure log.",
          "Hypothesis: Queue-Alpha deprecated. Probing alternatives.",
          "Consolidated Note: New directive maps enterprise -> Queue-Gamma.",
          "Active Policy: enterprise_audit -> Queue-Gamma (validated)",
          "Active Policy: enterprise_audit -> Queue-Gamma (stable)",
        ],
        metrics: {
          detection: "d = 2 encounters",
          recovery: "ρ = 3 encounters",
          retention: "R = 1.00 (100%)",
          staleness: "S = 0.00",
        },
      },
      world_model: {
        actions: [
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)", // enc 4: obsolete rule
          "route(Queue-Gamma)", // enc 5: immediate invalidation rewrite -> d(c)=1, rho(c)=2
          "route(Queue-Gamma)", // enc 6: confirmed
          "route(Queue-Alpha)", // enc 7: relapse under noisy belief
          "route(Queue-Gamma)", // enc 8: recovered
        ],
        confidences: [0.98, 0.99, 0.99, 0.92, 0.76, 0.91, 0.65, 0.88],
        memoryStates: [
          "State Hypothesis: P(enterprise -> Alpha)=0.98. Invalidation: r <= 0.",
          "State Hypothesis: P(enterprise -> Alpha)=0.99. Invalidation: r <= 0.",
          "State Hypothesis: P(enterprise -> Alpha)=0.99. Invalidation: r <= 0.",
          "Invalidation Triggered! Outcome r=0 falsified Alpha hypothesis.",
          "Explicit Revision: Formulated new hypothesis -> Gamma.",
          "State Hypothesis: P(enterprise -> Gamma)=0.91. Invalidation: r <= 0.",
          "Stale Belief Glitch: Alpha resurfaced during context pruning.",
          "State Hypothesis: P(enterprise -> Gamma)=0.94. Rule restored.",
        ],
        metrics: {
          detection: "d = 1 encounter",
          recovery: "ρ = 2 encounters",
          retention: "R = 0.75 (75%)",
          staleness: "S = 0.25 (relapse)",
        },
      },
      transcript: {
        actions: [
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)",
          "route(Queue-Alpha)", // enc 5: repeating obsolete rule
          "route(Queue-Gamma)", // enc 6: saw error in sliding window
          "route(Queue-Gamma)",
          "route(Queue-Gamma)",
        ],
        confidences: [0.90, 0.91, 0.93, 0.85, 0.72, 0.84, 0.89, 0.92],
        memoryStates: [
          "Raw history [t=12]: Alpha +1.0",
          "Raw history [t=12..25]: Alpha +1.0, Alpha +1.0",
          "Raw history [t=12..39]: 3x Alpha success in window",
          "Raw history [t=25..54]: Last step failed! But 3 prior succeeded.",
          "Raw history [t=39..68]: 2 consecutive Alpha failures logged.",
          "Raw history [t=54..81]: Gamma attempted, +1.0 reward received.",
          "Raw history [t=68..97]: Context window now dominated by Gamma.",
          "Raw history [t=81..112]: Stable in-context Gamma exemplars.",
        ],
        metrics: {
          detection: "d = 3 encounters",
          recovery: "ρ = 3 encounters",
          retention: "R = 1.00 (100%)",
          staleness: "S = 0.00",
        },
      },
    },
  },
  {
    id: "cosmetic_drift",
    name: "Cosmetic Format Drift",
    world: "form_filler (Prose Intake)",
    driftType: "Cosmetic Surface Drift",
    driftDescription: "Task intake is re-structured from raw key-values into prose narrative; the underlying schema & valid actions remain 100% identical.",
    driftEncounter: 3,
    encounters: [
      {
        step: 8,
        encounterNum: 1,
        taskKey: "invoice_entry",
        inputQuery: "NAME: John Doe | AMOUNT: $450.00 | DATE: 2026-09-12 | CODE: INV-882",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 22,
        encounterNum: 2,
        taskKey: "invoice_entry",
        inputQuery: "NAME: Sarah Connor | AMOUNT: $1,280.50 | DATE: 2026-09-14 | CODE: INV-910",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 37,
        encounterNum: 3,
        taskKey: "invoice_entry",
        inputQuery: "NAME: Alex Vance | AMOUNT: $64.20 | DATE: 2026-09-15 | CODE: INV-944",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 51,
        encounterNum: 4,
        taskKey: "invoice_entry",
        inputQuery: "Memos indicate Alex Vance requested $64.20 on 2026-09-15 under code INV-944.",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "reformatted",
      },
      {
        step: 66,
        encounterNum: 5,
        taskKey: "invoice_entry",
        inputQuery: "Incoming notification: Account holder Elena Rostova billed $3,400.00 dated 2026-09-18.",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "reformatted",
      },
      {
        step: 82,
        encounterNum: 6,
        taskKey: "invoice_entry",
        inputQuery: "Auditor report notes claim by Marcus Brody for $180.00 on 2026-09-20.",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "reformatted",
      },
      {
        step: 99,
        encounterNum: 7,
        taskKey: "invoice_entry",
        inputQuery: "Disbursement record: $940.10 issued on 2026-09-22 to vendor TechCorp Ltd.",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "reformatted",
      },
      {
        step: 115,
        encounterNum: 8,
        taskKey: "invoice_entry",
        inputQuery: "Invoice summary: Arthur Dent was reimbursed $42.00 on 2026-09-25.",
        trueActionBefore: "emit(Amount, Date, Name)",
        trueActionAfter: "emit(Amount, Date, Name)",
        feedbackTone: "positive",
        surfaceStyle: "reformatted",
      },
    ],
    substrateBehaviors: {
      transcript: {
        actions: [
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Name, Amount, Date)", // OVER-REACTION! Discarded correct field order
          "emit(Name, Date, Amount)", // Parsing disorientation
          "emit(Amount, Date, Name)", // Realigned
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
        ],
        confidences: [0.96, 0.96, 0.97, 0.44, 0.51, 0.81, 0.92, 0.95],
        memoryStates: [
          "Schema anchor: [Amount, Date, Name] from delimiter format.",
          "Schema anchor: [Amount, Date, Name] confirmed.",
          "Schema anchor: [Amount, Date, Name] validated.",
          "ALERT: Surface structure altered! Delimiters absent. Re-parsing schema.",
          "Confusion: Inverted prose syntax prompted field order re-arrangement.",
          "Correction: Realized underlying schema requirements remain unchanged.",
          "Restored: Resumed standard [Amount, Date, Name] canonical emission.",
          "Stable: Resilient against further narrative template variations.",
        ],
        metrics: {
          detection: "Cosmetic loss: -0.133",
          recovery: "Over-reaction: High",
          retention: "R = 0.80 (80%)",
          overUpdate: "U = 0.40",
        },
      },
      notes: {
        actions: [
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)", // notes agent ignored cosmetic drift!
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
          "emit(Amount, Date, Name)",
        ],
        confidences: [0.95, 0.95, 0.96, 0.92, 0.94, 0.95, 0.96, 0.96],
        memoryStates: [
          "Contract: Regardless of input style, output must be [Amount, Date, Name].",
          "Contract: Output specification locked.",
          "Contract: Output specification locked.",
          "Observation: Text arrived in narrative prose. Output contract unaffected.",
          "Observation: Output contract intact. Fields extracted robustly.",
          "Contract: Resilient against prose variations.",
          "Contract: Stable across all 8 encounters.",
          "Contract: 100% schema compliance verified.",
        ],
        metrics: {
          detection: "Cosmetic loss: -0.02 (n.s.)",
          recovery: "Over-reaction: Zero",
          retention: "R = 1.00 (100%)",
          overUpdate: "U = 0.00",
        },
      },
    },
  },
  {
    id: "misleading_noise",
    name: "Misleading Feedback",
    world: "rule_world (Stochastic Feedback)",
    driftType: "15% Misleading Inverted Feedback",
    driftDescription: "The world rules stay 100% constant, but 15% of feedback is corrupt/misleading (punishing correct actions with negative reward).",
    driftEncounter: 3,
    encounters: [
      {
        step: 10,
        encounterNum: 1,
        taskKey: "support_tier2",
        inputQuery: "Ticket #401: Internal API gateway timeout with 504 error.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 24,
        encounterNum: 2,
        taskKey: "support_tier2",
        inputQuery: "Ticket #418: Kubernetes pod crashloop backoff on worker node.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 38,
        encounterNum: 3,
        taskKey: "support_tier2",
        inputQuery: "Ticket #435: Postgres connection pool exhausted during peak load.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 52,
        encounterNum: 4,
        taskKey: "support_tier2",
        inputQuery: "Ticket #452: SSL certificate expiry on ingress endpoint. [NOISE INJECTED]",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "misleading", // Correct action was route(Eng-Platform), but supervisor falsely punished it!
        surfaceStyle: "standard",
      },
      {
        step: 67,
        encounterNum: 5,
        taskKey: "support_tier2",
        inputQuery: "Ticket #469: Redis memory pressure eviction spike.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 83,
        encounterNum: 6,
        taskKey: "support_tier2",
        inputQuery: "Ticket #486: VPC peering route table dropped packet alert.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 98,
        encounterNum: 7,
        taskKey: "support_tier2",
        inputQuery: "Ticket #503: DNS resolution failure across microservices.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
      {
        step: 114,
        encounterNum: 8,
        taskKey: "support_tier2",
        inputQuery: "Ticket #520: Kafka consumer lag exceeding 100k records.",
        trueActionBefore: "route(Eng-Platform)",
        trueActionAfter: "route(Eng-Platform)",
        feedbackTone: "positive",
        surfaceStyle: "standard",
      },
    ],
    substrateBehaviors: {
      world_model: {
        actions: [
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)", // enc 4: correct action falsely punished (r=-1.0)
          "route(Sec-Ops)",      // enc 5: OVER-UPDATED! Abandoned still-correct rule!
          "route(Sec-Ops)",      // enc 6: Stuck in wrong belief
          "route(Eng-Platform)", // enc 7: Re-falsified and reverted
          "route(Eng-Platform)", // enc 8: Restored
        ],
        confidences: [0.98, 0.99, 0.99, 0.95, 0.88, 0.85, 0.62, 0.89],
        memoryStates: [
          "Hypothesis: support_tier2 -> Eng-Platform. Condition: r > 0.",
          "Hypothesis: support_tier2 -> Eng-Platform. Condition: r > 0.",
          "Hypothesis: support_tier2 -> Eng-Platform. Condition: r > 0.",
          "FALSIFICATION EVENT! Step 52 outcome r=-1 contradicted hypothesis.",
          "IMMEDIATE REWRITE: Discarded Eng-Platform. Formulated Sec-Ops hypothesis.",
          "Hypothesis: support_tier2 -> Sec-Ops. Testing prediction.",
          "Hypothesis Falsified again! Sec-Ops rejected with r=-1.",
          "Hypothesis Rewritten: Restored Eng-Platform after circular falsification.",
        ],
        metrics: {
          detection: "Over-Update: U = 0.81",
          recovery: "Susceptibility: Severe",
          retention: "R = 0.62 (62%)",
          overUpdate: "High Volatility",
        },
      },
      notes: {
        actions: [
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)", // enc 5: Resisted noise! Maintained still-correct rule.
          "route(Eng-Platform)",
          "route(Eng-Platform)",
          "route(Eng-Platform)",
        ],
        confidences: [0.94, 0.95, 0.95, 0.82, 0.88, 0.92, 0.94, 0.95],
        memoryStates: [
          "Working Note: Infrastructure & backend tickets route to Eng-Platform.",
          "Working Note: Route validated 2x.",
          "Working Note: Route validated 3x.",
          "Anomaly logged: Single rejection on step 52. Withholding rewrite until pattern confirms.",
          "Working Note: Step 67 confirmed Eng-Platform. Prior rejection marked as supervisor noise.",
          "Working Note: Stable confidence restored.",
          "Working Note: 7/8 total successes on Eng-Platform.",
          "Working Note: Robust consolidation against stochastic feedback.",
        ],
        metrics: {
          detection: "Over-Update: U = 0.30",
          recovery: "Noise Dampening: High",
          retention: "R = 1.00 (100%)",
          overUpdate: "Stable Baseline",
        },
      },
    },
  },
];

export function DriftLabVisual() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("substantive_rule");
  const [selectedSubstrate, setSelectedSubstrate] = useState<string>("notes");
  const [currentEncounterIdx, setCurrentEncounterIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2200); // ms per step

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const availableSubstrates = Object.keys(scenario.substrateBehaviors);
  const activeSubstrate = availableSubstrates.includes(selectedSubstrate)
    ? selectedSubstrate
    : availableSubstrates[0];

  const substrateData = scenario.substrateBehaviors[activeSubstrate];
  const currentEncounter = scenario.encounters[currentEncounterIdx];
  const currentAction = substrateData.actions[currentEncounterIdx];
  const currentConfidence = substrateData.confidences[currentEncounterIdx];
  const currentMemory = substrateData.memoryStates[currentEncounterIdx];

  // Determine true action at this encounter
  const isPostDrift = currentEncounterIdx >= scenario.driftEncounter;
  const currentTrueAction = isPostDrift
    ? currentEncounter.trueActionAfter
    : currentEncounter.trueActionBefore;

  const isActionCorrect = currentAction === currentTrueAction;

  // Automated playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentEncounterIdx((prev) => (prev + 1) % scenario.encounters.length);
    }, playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, scenario.encounters.length]);

  return (
    <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
      {/* Top Header / Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[var(--border)] bg-[var(--muted-bg)]/40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <span>DriftLab Adaptive Dynamics Simulator</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-normal bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Seeded Loop
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] font-mono">
              World: {scenario.world} · Latent Truth vs. Agent Observation
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause timeline scan" : "Play timeline scan"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--foreground)] transition-colors shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentEncounterIdx(0)}
            title="Reset to Encounter 01"
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario & Memory Substrate Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border-b border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs">
        {/* Scenario Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[var(--muted)] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-emerald-500" />
            <span>Select Change Protocol:</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setCurrentEncounterIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
                  selectedScenarioId === s.id
                    ? "bg-emerald-500 text-white border-emerald-600 font-semibold shadow-xs"
                    : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Substrate Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[var(--muted)] flex items-center gap-1">
            <Database className="w-3 h-3 text-emerald-500" />
            <span>Memory Substrate (Controlled Factor):</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableSubstrates.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubstrate(sub)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] capitalize transition-all border ${
                  activeSubstrate === sub
                    ? "bg-emerald-600 text-white border-emerald-700 font-semibold shadow-xs"
                    : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]"
                }`}
              >
                {sub.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Timeline Slider Bar */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[var(--muted)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Encounter Timeline (Unit: Affected Key Encounters)</span>
          </span>
          <span className="font-bold text-[var(--foreground)]">
            Encounter {String(currentEncounterIdx + 1).padStart(2, "0")} / 08 (Step {currentEncounter.step})
          </span>
        </div>

        {/* Encounter Blocks Grid */}
        <div className="grid grid-cols-8 gap-1.5">
          {scenario.encounters.map((enc, idx) => {
            const isChangePoint = idx === scenario.driftEncounter;
            const isCurrent = idx === currentEncounterIdx;
            const isPast = idx < currentEncounterIdx;
            const stepAction = substrateData.actions[idx];
            const stepTrue = idx >= scenario.driftEncounter ? enc.trueActionAfter : enc.trueActionBefore;
            const isCorrect = stepAction === stepTrue;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentEncounterIdx(idx);
                  setIsPlaying(false);
                }}
                className={`relative p-2 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/10 shadow-sm"
                    : isPast
                    ? isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
                      : "border-red-500/30 bg-red-500/5 hover:border-red-500/50"
                    : "border-[var(--border)] bg-[var(--muted-bg)]/30 opacity-70 hover:opacity-100"
                }`}
              >
                {isChangePoint && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 rounded text-[8px] font-mono font-bold bg-amber-500 text-white uppercase tracking-tight shadow-xs">
                    Drift
                  </span>
                )}
                <div className="text-[10px] font-mono text-[var(--muted)] flex justify-between">
                  <span>e{idx + 1}</span>
                  <span>t={enc.step}</span>
                </div>
                <div className="mt-1 font-mono text-[11px] font-bold truncate">
                  {isCorrect ? (
                    <span className="text-emerald-600 dark:text-emerald-400">Match</span>
                  ) : (
                    <span className="text-red-500">Error</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Panel Inspection Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--card)]">
        {/* Panel 1: World Environment State */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              <span>World Observation</span>
            </span>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                isPostDrift
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              }`}
            >
              {isPostDrift ? "Latent Drift Active" : "Pre-Drift Regime"}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2">
            <div>
              <span className="text-[10px] text-[var(--muted)] block">Incoming Task Prompt:</span>
              <p className="text-[var(--foreground)] mt-0.5 leading-snug break-words">
                &ldquo;{currentEncounter.inputQuery}&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border)]/60 flex items-center justify-between text-[11px]">
              <span className="text-[var(--muted)]">Task Key:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {currentEncounter.taskKey}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--muted)]">Surface Format:</span>
              <span className="capitalize text-[var(--foreground)]">
                {currentEncounter.surfaceStyle}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>HIDDEN GROUND TRUTH:</span>
              <span>Evaluator Only</span>
            </div>
            <p className="text-[11px] font-bold text-[var(--foreground)]">
              f<sub>t</sub>(&kappa;<sub>t</sub>) = {currentTrueAction}
            </p>
          </div>
        </div>

        {/* Panel 2: Agent Perception & Memory */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              <span>Agent Reply &amp; Memory</span>
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold capitalize">
              {activeSubstrate.replace("_", " ")}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--muted)]">Parsed Action a<sub>t</sub>:</span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded border ${
                  isActionCorrect
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-red-500/15 text-red-500 border-red-500/30"
                }`}
              >
                {currentAction}
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-[var(--muted)]">
                <span>Stated Confidence:</span>
                <span className="font-bold text-[var(--foreground)]">
                  {(currentConfidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${currentConfidence * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Memory State View */}
          <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-mono space-y-1">
            <span className="text-[10px] text-[var(--muted)] block uppercase font-semibold">
              Active Memory Substrate State:
            </span>
            <p className="text-[11px] text-[var(--foreground)] leading-snug italic">
              &ldquo;{currentMemory}&rdquo;
            </p>
          </div>
        </div>

        {/* Panel 3: Evaluator Engine & Telemetry */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span>Immutable Run Record</span>
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              Post Hoc Scored
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/40 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--muted)]">Verification Status:</span>
              <span className="font-semibold flex items-center gap-1">
                {isActionCorrect ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Match (r = +1.0)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-red-500">Mismatch (r = 0.0)</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--muted)]">In-Role Feedback:</span>
              <span
                className={`capitalize font-medium ${
                  currentEncounter.feedbackTone === "positive"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : currentEncounter.feedbackTone === "misleading"
                    ? "text-amber-500 font-bold"
                    : "text-red-500"
                }`}
              >
                {currentEncounter.feedbackTone === "misleading" ? "Corrupted (-1.0)" : currentEncounter.feedbackTone}
              </span>
            </div>
          </div>

          {/* Computed Metrics Box */}
          <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-mono space-y-1.5">
            <span className="text-[10px] text-[var(--muted)] uppercase font-semibold block">
              Encounter Metrics (This Arm):
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <div className="p-1 rounded bg-[var(--muted-bg)]/40">
                <span className="text-[9px] text-[var(--muted)] block">Detection:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {substrateData.metrics.detection}
                </span>
              </div>
              <div className="p-1 rounded bg-[var(--muted-bg)]/40">
                <span className="text-[9px] text-[var(--muted)] block">Recovery:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {substrateData.metrics.recovery}
                </span>
              </div>
              <div className="p-1 rounded bg-[var(--muted-bg)]/40">
                <span className="text-[9px] text-[var(--muted)] block">Retention:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {substrateData.metrics.retention}
                </span>
              </div>
              <div className="p-1 rounded bg-[var(--muted-bg)]/40">
                <span className="text-[9px] text-[var(--muted)] block">
                  {substrateData.metrics.overUpdate ? "Over-Update:" : "Staleness:"}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {substrateData.metrics.overUpdate || substrateData.metrics.staleness}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Description Footer */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--muted-bg)]/20 text-xs font-mono text-[var(--muted)] flex items-center justify-between">
        <span className="truncate pr-4">
          <strong className="text-[var(--foreground)]">{scenario.driftType}:</strong> {scenario.driftDescription}
        </span>
        <span className="text-[10px] shrink-0 text-emerald-600 dark:text-emerald-400">
          95% Bootstrap Paired Verification
        </span>
      </div>
    </div>
  );
}

// Background SVG representation for the portfolio hero card
export function getDriftLabCardSvg(): string {
  return `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <defs>
        <linearGradient id="driftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <!-- Timeline grid -->
      <line x1="20" y1="120" x2="380" y2="120" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" opacity="0.4"/>
      <!-- Pre-change steps -->
      <circle cx="50" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <circle cx="100" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <circle cx="150" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <!-- Change line -->
      <line class="driftlab-change-marker" x1="175" y1="40" x2="175" y2="200" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="3 3"/>
      <!-- Post-change steps -->
      <circle class="driftlab-change-point" cx="200" cy="120" r="12" fill="#ef4444" fill-opacity="0.3" stroke="#ef4444" stroke-width="2"/>
      <circle class="driftlab-recovery-step" cx="250" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <circle class="driftlab-recovery-step" cx="300" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <circle class="driftlab-recovery-step" cx="350" cy="120" r="12" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <!-- Latency brackets -->
      <path d="M 175 60 L 250 60" stroke="#10b981" stroke-width="1.5"/>
      <path d="M 250 180 L 350 180" stroke="#10b981" stroke-width="1.5"/>
      <!-- Evaluator lane -->
      <rect x="30" y="25" width="340" height="20" rx="4" fill="url(#driftGrad)" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
    </svg>
  `;
}
