# Shanghai Discovery

> AI-powered platform simplifying access to Shanghai's local events, trends, and insider tips for foreigners, with smart content curation and translation.

[🌐 Live Demo](#) | [📊 Architecture](#) | [🎯 Roadmap](#)

---

## 🎯 The Problem

**40 million English speakers visit/live in Shanghai annually.**

They miss out on:
- current trending local/new places, popUp event ,MOnthly events (only on 小红书/Xiaohongshu)
- Current local gossip, plans looking forward to in the weekend thats shanghai related(only on Weibo)
- Local insider tips (Chinese-only platforms)

**Why RedNote/Weibo don't work for foreigners:**
-Local content thats shanghai related is burried by Surface level content that is used for tourist (not Shanghai local focus)
- Poor translations & no english support for videos (machine-translated captions)
- No context for slang/cultural references

---

## 💡 The Solution

**Shanghai Discovery = Pinterest + Threads, but for Shanghai locals content**

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

## 📸 Screenshots

### Discovery Feed
![Feed](./docs/images/feed.png)
*Pinterest-style visual posts + Twitter-style text updates*

### Post Detail with Translation
![Modal](./docs/images/modal.png)
*English translation + "For Foreigners" insider tips*

### Image Text Translation (Novel Feature)
![Image Translation](./docs/images/image-translation.png)
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

## 🚀 Roadmap

### ✅ Tier 1: Translated Feed (DONE)
- Basic XHS scraping + translation
- Simple feed display

### ✅ Tier 2: Cross-Platform + Media (CURRENT)
- Weibo integration
- Image text translation (novel feature)
- Video dubbing
- Responsive feed UI

### 🔨 Tier 3: Smart + Legal (IN PROGRESS)
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

### 🔮 Tier 4: Booking Integration
- Direct reservations
- Event tickets
- Restaurant bookings

### 🌍 Tier 5: Multi-City Expansion
- Beijing, Shenzhen, Chengdu
- B2B platform for tourism agencies

---

## 🎨 Novel Features

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

## 🙏 Acknowledgments

Built with:
- Anthropic Claude
- Google Cloud Vision
- Alibaba Qwen
- OpenAI Whisper
- ElevenLabs
