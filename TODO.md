# RAD — TODO

## 🧠 Phase 1: Core Engine (Deterministic State Machine)

- [ ] Define core types (NodeId, Answers, ArchitectureLock)
- [ ] Implement state machine nodes (intent → generate flow)
- [ ] Implement transition function (deterministic next state)
- [ ] Build RADStateMachine class (submit + state tracking)
- [ ] Add answer storage per node

---

## 🔒 Phase 2: Architecture Lock System

- [ ] Build ArchitectureLock schema
- [ ] Implement buildArchitectureLock() function
- [ ] Ensure lock is immutable once created
- [ ] Add validation to prevent post-lock mutation

---

## ⚛️ Phase 3: React Generator

- [ ] Create generateReactApp() function
- [ ] Output React + TypeScript SPA scaffold
- [ ] Enforce functional components only
- [ ] Inject inline learning comments:
  - [ ] state usage explanation
  - [ ] props flow explanation
  - [ ] event handling explanation
- [ ] Ensure SPA-only (no routing frameworks, no Next.js)

---

## 💻 Phase 4: CLI Interface

- [ ] Build readline-based CLI runner
- [ ] Connect CLI to RADStateMachine
- [ ] Implement step-by-step questioning flow
- [ ] Print architecture lock to terminal
- [ ] Output generated React code

---

## 🧪 Phase 5: Testing & Simulation

- [ ] Simulate full flow (intent → generate)
- [ ] Validate deterministic transitions
- [ ] Check architecture lock consistency
- [ ] Ensure no skipped states
- [ ] Test multiple app types (todo, dashboard, form)

---

## 📦 Phase 6: Package Structure

- [ ] Split into packages/core, packages/cli
- [ ] Export core engine as reusable module (@rad/core)
- [ ] Ensure zero CLI dependency in core logic
- [ ] Add proper TypeScript build setup

---

## 🧠 Phase 7: Plugin Preparation (Claude Code)

- [ ] Create plugin folder structure
- [ ] Add plugin.json manifest
- [ ] Write SKILL.md (RAD behavior rules)
- [ ] Add command definitions:
  - [ ] rad-start
  - [ ] rad-next
  - [ ] rad-lock
  - [ ] rad-generate
- [ ] Ensure plugin only calls core engine (no logic duplication)

---

## 🚀 Phase 8: Polish & Productization

- [ ] Add RAD branding (name, CLI output, banners)
- [ ] Improve generated React code quality
- [ ] Add better inline learning annotations
- [ ] Add error handling for invalid transitions
- [ ] Document architecture in README

---

## 🔥 Stretch Goals

- [ ] Add visual decision tree debugger
- [ ] Add complexity scoring system
- [ ] Add “anti-pattern detection” for React mistakes
- [ ] Add multi-app session memory