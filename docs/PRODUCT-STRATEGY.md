# PRODUCT STRATEGY: From Infrastructure to Killer App
> Night session research — 2026-03-26/27

## The Core Insight

We have **infrastructure**. The AI gateway, the LOG, the routing, the PII engine — all solid, all deployed. But nobody wakes up excited about "an AI gateway with intelligent routing." They wake up excited about **experiences**.

The LOG is the product. But the LOG is invisible unless you design the experience around it.

## What Makes a Killer App (Research-Based)

### The "Aha Moment" Framework (from Brian Balfour, HubSpot/Reforge)
1. **Time to value** — How long until the user feels the product's core promise?
2. **Frequency of core action** — How often does the user return?
3. **Habit loop** — Trigger → Action → Variable Reward → Investment

For LOG: The core promise is "your AI remembers everything." 

**Current time to value**: ~2 minutes (sign up → type message → get response). Too slow.
**Target**: 10 seconds. Landing page → "Try it" → first AI response → **show the memory**.

### The Invisibility Problem

The LOG's power is invisible. You send a message, get a response — looks like ChatGPT. The magic only shows when you:
1. Resume a session after weeks and the AI knows the context
2. Ask "what did we talk about last time?"
3. See the routing get smarter over time

**Solution: Make the invisible visible.**

### Killer App Pattern Analysis

| App | What Made It Kill | First 10 Seconds |
|-----|-------------------|------------------|
| ChatGPT | Conversational AI that felt magical | Type anything → get intelligent response |
| Midjourney | /imagine prompt → beautiful image in seconds | One command, instant visual reward |
| Notion | Flexible workspace that adapts to your brain | Start typing → it just works |
| Obsidian | Your second brain, plain text | Open a note → backlinks reveal connections |
| Roll20 | Play D&D online | See the map → place tokens → roll dice |
| D&D Beyond | Digital character sheet | Your character, always available |

**Common threads**: Instant gratification, zero learning curve, visual evidence of the product working.

## The DMlog.ai Experience Design

### Phase 1: The 10-Second Demo (This Week)

The landing page should NOT be a list of features. It should be an **experience**:

**Option A: "Start a Campaign" Button**
```
User clicks "Start a Campaign"
→ AI generates a world in 3 sentences: "You stand at the edge of the Thornwood Forest..."
→ Character creation: "Choose your class" (3 buttons: Fighter, Wizard, Rogue)
→ Immediate first scene: "You hear something in the underbrush. What do you do?"
→ User types → dramatic response → THEY'RE IN THE GAME
```

This is the killer demo. No signup wall. No settings. Just play.

**Option B: "Tell Me About Your Campaign"**
```
User pastes session notes or types freeform
→ AI generates: NPCs discovered, plot threads, relationships, unresolved cliffhangers
→ Shows a visual "Campaign Snapshot" with all the extracted data
→ "Save this campaign? Create account to continue."
```

This demonstrates the LOG — the AI understood and organized your data.

### Phase 2: The Memory Pitch (Week 2)

After the demo, show the memory:

**"Your DM remembers everything."**
- Session timeline in the sidebar
- "Previously on..." button generates instant recap
- NPC panel: every NPC mentioned, with their last appearance
- Relationship web: who knows who, who hates who
- Click any NPC → "The innkeeper from session 2. Last seen: the tavern. Player bribed him."

This is where DMlog.ai is different from ChatGPT. ChatGPT forgets. DMlog.ai doesn't.

### Phase 3: The Compound Moat (Week 3-4)

**Route optimization becomes visible:**
- "Based on 47 interactions, DeepSeek-chat is best for your combat descriptions (94% positive feedback)"
- "Your exploration scenes work better with longer max_tokens. Routing updated."
- Show a simple dashboard: model usage, feedback trends, cost savings

**The comparative dataset:**
- Export button: "Download your interaction history as JSON"
- This data is unique — nobody else has it. It's the moat.
- Open source it partially → community contribution → stronger moat

### Phase 4: Multi-Player (Week 5-6)

**The DM + Players + Spectators model:**
- DM starts a campaign → gets a room code
- Players join with the code → see the scene, type actions
- Spectators watch → see narration, reactions, dice rolls
- AI fills empty player slots if needed
- All interactions logged in the campaign's LOG

This is the OpenMAIC director-orchestrator pattern in action. The director decides when the DM speaks, when NPCs speak, when to describe the scene. Players just type.

## Technical Priorities (Ordered by Impact)

### This Week
1. ✅ Web UI renders in browser (preact-shim fix)
2. ✅ Guest mode works (5 free messages)
3. 🔲 Landing page has a one-click demo experience
4. 🔲 "Start a Campaign" flow (world gen → class pick → first scene)
5. 🔲 Session timeline visible in sidebar

### Next Week
6. 🔲 NPC extraction from chat (parse AI narration for NPC mentions)
7. 🔲 NPC panel with history and relationships
8. 🔲 "Previously on..." auto-recap button
9. 🔲 Route optimization dashboard (simple: feedback per model)

### Week 3-4
10. 🔲 Multi-player rooms (room code, join, spectate)
11. 🔲 Director orchestrator for DMlog (manages DM + NPC + scene flow)
12. 🔲 Character sheet (interactive, auto-updates from gameplay)
13. 🔲 Campaign export (full JSON/Markdown download)

### Month 2
14. 🔲 DMlog.ai custom domain (DMlog.ai)
15. 🔲 StudyLog.ai deployment with interactive classroom
16. 🔲 MakerLog.ai deployment with code-first personality
17. 🔲 Cross-platform PWA (installable on mobile)

## What NOT to Build (Yet)

- ❌ World builder (Microscope mode) — nobody asks for this first
- ❌ Faction/kingdom system — Phase 3 content
- ❌ Pantheon/magic builder — niche
- ❌ Async play — infrastructure works but no demand yet
- ❌ LFG/matchmaking — separate product problem
- ❌ Voice/TTS — cool but not the wedge
- ❌ Map generation — hard, and theater of the mind works fine for text-first

## The Real Competition

| Competitor | What They Have | What They Don't |
|------------|---------------|-----------------|
| ChatGPT | Massive model quality | No memory across sessions, no TTRPG context, no routing |
| AI Dungeon | Text adventure | No real rules, hallucinates, takes over player agency |
| Friends & Fables | Good AI DM | Closed source, limited worldbuilding, no session memory |
| Roll20 | Best VTT | No AI, expensive, terrible performance |
| Foundry VTT | Best self-hosted | No AI, requires technical setup |
| World Anvil | Best worldbuilding | No AI integration, separate from gameplay |

**DMlog.ai's unique position**: AI + memory + TTRPG + free + open source. Nobody else combines all four.

## Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Landing → first message | < 10 seconds | < 5 seconds |
| Guest → account conversion | 20% | 40% |
| DAU (with unique sessions) | 50 | 500 |
| Avg session length | 10 messages | 25 messages |
| Feedback rate | 5% of interactions | 15% |
| NPS | 40+ | 60+ |
| Return rate (day 7) | 20% | 40% |

## The Next 8 Hours (While Casey Sleeps)

1. ✅ Fix web UI (preact-shim)
2. ✅ Deploy dmlog-ai to Cloudflare
3. 🔲 Build "Start a Campaign" flow in landing page
4. 🔲 Add NPC extraction from AI responses
5. 🔲 Build NPC panel component
6. 🔲 Deploy studylog-ai to Cloudflare
7. 🔲 Write custom domain setup guide
8. 🔲 Update MEMORY.md with full project state
