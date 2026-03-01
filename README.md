# Shanghai Discovery

  The only platform aggregating Shanghai's best local content (小红书, 微博, 抖音) with full English translation that discovers what  locals actually talk about, not tourist guides

[ Live Demo](#https://github.com/) | [Architecture](#) | [ Roadmap](#)

---

##  The Problem

**Shanghai's real culture lives on Chinese-only platforms.**

**Where locals share:**
- 小红书 (Xiaohongshu/RedNote): Hidden cafes, vintage shops, photo spots
- 微博 (Weibo): Breaking news, events tonight, local gossip
- 抖音 (Douyin): Viral food spots, nightlife, weekend activities

**Why foreigners miss out:**
- ❌ Platforms are Chinese-only (no English interface)
- ❌ Content is in Chinese (machine translation is garbage)
- ❌ Scattered across 3+ apps (exhausting to monitor)
- ❌ Generic translate features/machine (not Shanghai-focused)
- ❌ Cultural context missing (what's 绝绝子? Why's everyone going to 田子坊?)

**Result:** 40M+ English speakers in Shanghai rely on:
- Outdated TripAdvisor lists (tourist traps)
- Expat WeChat groups (slow, spam-filled)
- Word of mouth (limited reach)

**They never see what's actually trending in Shanghai TODAY.**

##  The Solution


**Shanghai Discovery = All Chinese platforms, one English feed**

**We aggregate content from:**
- 小红书 (aesthetic discoveries, hidden gems)
- 微博 (real-time updates, events, local buzz)
- 抖音 (coming soon - viral trends, food reviews)

**Then make it accessible:**
- ✅ Full English translation (context-aware, not machine)
- ✅ Cultural context ("For Foreigners" tips)
- ✅ Shanghai-only filter (no random China content)
- ✅ One unified feed (no app-switching)
**What you get:**
```
Instead of:                          You see:
┌─────────────────┐                 ┌─────────────────┐
│ 小红书 (Chinese) │                 │ English feed    │
│ + 微博 (Chinese) │  ────────────>  │ All platforms   │
│ + 抖音 (Chinese) │                 │ Shanghai-only   │
└─────────────────┘                 │ Translated      │
3 apps, all Chinese                 └─────────────────┘
                                    One app, one language
```

**Think:** Pinterest (for XHS photos) + Threads (for Weibo updates) + TikTok (for Douyin videos), but English-only and Shanghai-focused.

---

##  Our Focus

**Not another city guide. Not another travel app.**

**We're the bridge between:**
- What **locals** are talking about (Chinese platforms)
- What **foreigners** want to know (English, context, accessibility)

**Scope:**
- ✅ Shanghai hyperlocal content only
- ✅ Current trends & events (not evergreen guides)
- ✅ What's happening NOW (not "Top 10 Things to Do")
- ✅ Community-driven (real people, not marketing)

**Use cases:**
- "Where are locals going for brunch this weekend?"
- "What's the buzz about that new bar in Jing'an?"
- "Why is everyone posting about this vintage market?"
- "Event tonight that foreigners would actually enjoy?"

**We answer the question:** *"What are Shanghai locals doing/talking about RIGHT NOW?"*

**Current (Tier 1-2):** Automated pipeline
- Daily scrapes 1,500+ posts from XHS + Weibo
- AI filters for Shanghai-relevant content (90%+ accuracy)
- Translates with context (slang, cultural nuance)
- **Novel feature:** Translates text IN images (preserves fonts)
- Auto-dubs videos to English

**Future (Tier 3):** User-driven + Legal
- Community pinning (users submit content)
- On-demand processing (no bulk scraping)
- Personalized algorithm (learns what Shanghai foreigners love)
- Creator analytics (drive traffic back to creators)

---

##  Screenshots

### Discovery Feed
<img width="1034" height="816" alt="image" src="https://github.com/user-attachments/assets/bb2f54e5-faa6-4bcc-aa93-5fb0cc4c25ee" />

*Pinterest-style visual posts + Twitter-style text updates*

<br><br>

### Post Detail with Translation
<img width="1065" height="811" alt="image" src="https://github.com/user-attachments/assets/0485eafa-eccd-463e-9110-ee5f57791844" />

*English translation + "For Foreigners" insider tips*

<br><br>

### Image Text Translation (Novel Feature)
<img width="1064" height="825" alt="image" src="https://github.com/user-attachments/assets/4db6d7ef-6a10-41a7-bbea-a80660ad2ab1" />

*Before: Chinese text overlay → After: English (font preserved)*

---

## 🏗️ Architecture

### Current Pipeline (Tier 2)
```
Daily (GitHub Actions)
    ↓
Scrape XHS + Weibo (Python/Playwright)
    ↓
AI Filter (Claude: Shanghai-relevant?)
    ↓
Translate (Claude: context-aware)
    ↓
Process Media:
├─ Images: Vision OCR → Qwen edit
└─ Videos: Whisper → ElevenLabs TTS
    ↓
Store (Supabase PostgreSQL + Storage)
    ↓
Serve (React feed)
```

### Tech Stack
- **Scraping:** Python, Playwright
- **AI/ML:** Claude API, Google Vision, Qwen, Whisper, ElevenLabs
- **Backend:** Node.js, GitHub Actions
- **Frontend:** React 19, Vite, Tailwind
- **Database:** Supabase (PostgreSQL + Storage)

---

##  Roadmap

###  Tier 1: Translated Feed (DONE)
- Basic XHS scraping + translation
- Simple feed display

###  Tier 2: Cross-Platform + Media (CURRENT)
- Weibo integration
- Image text translation (novel feature)
- Video dubbing
- Responsive feed UI

###  Tier 3: Smart + Legal (IN PROGRESS)
**Why:** Move from bulk scraping to user-driven, legally defensible model

**Features:**
1. **Community Pinning**
   - Users share XHS/Weibo URLs
   - App processes on-demand
   - Stores metadata only (URL + summary)
   
2. **Personalized Algorithm**
```
   score = (user_engagement × 0.4) +
           (shanghai_relevance × 0.3) +
           (recency × 0.15) +
           (community_pins × 0.15)
```
   
3. **On-Scroll Processing**
   - Process visible cards only
   - Cache for 24h
   - Scales with real usage

4. **Creator Analytics Dashboard**
   - Show creators their foreign reach
   - Drive traffic back to originals
   - Build partnership pipeline

###  Tier 4: Booking Integration
- Direct reservations
- Event tickets
- Restaurant bookings

###  Tier 5: Multi-City Expansion
- Beijing, Shenzhen, Chengdu
- B2B platform for tourism agencies

---

##  Novel Features

### 1. Image Text Translation (First-of-its-kind)
**Problem:** Chinese text overlays on images unreadable to foreigners

**Solution:**
```
Google Vision: Detect Chinese text
    ↓
Claude: Classify (caption vs scene text)
    ↓
Qwen: Edit image (replace with English, preserve font/style)
```

**Result:** English text that LOOKS native to the image

**Why this matters:** Major translation apps (Google, DeepL) don't do this

### 2. Context-Aware Translation
- Handles Chinese internet slang (绝绝子, yyds, 种草)
- Shanghai-specific terms (魔都, 外滩, 田子坊)
- "For Foreigners" tips (payment methods, cultural context)

### 3. Full Video Dubbing
- Not just subtitles
- English voiceover replaces Chinese audio
- Preserves background music

---

## 📊 Current Metrics

- **Posts processed:** 1,500+/month
- **Platforms:** Xiaohongshu + Weibo
- **Pipeline uptime:** 90%+
- **Translation accuracy:** 90%+ (AI-filtered)
- **Processing cost:** $38/month (vs $5,000 manual)
- **Automation:** Fully automated via GitHub Actions

---

## 🔧 Setup

[Keep your existing setup instructions here]

---

## 📈 Why This Matters

**Market opportunity:**
- 40M+ English speakers in Shanghai annually
- Growing expat community
- RedNote's international expansion (timing!)

**Technical innovation:**
- Multi-AI orchestration (4+ APIs)
- Novel image translation approach
- Production-ready automation

**Business model:**
- Tier 3+: Creator partnerships (legal, scalable)
- Tier 4: Booking commissions
- Tier 5: B2B platform

---

## 📄 License

MIT

---

##  Acknowledgments

Built with:
- Anthropic Claude
- Google Cloud Vision
- Alibaba Qwen
- OpenAI Whisper
- ElevenLabs
