# Productivity Enhancement

A full-stack community productivity tracking system built on top of Telegram polls. Members vote daily on their hours spent across 4 categories — Productivity, Islamic Studies, Early Masjid, and Sleep — and the web app visualizes individual stats, leaderboards, historical trends, and member comparisons.

---

## How It Works

1. Every day at 9:00 PM (Asia/Dhaka), a Google Apps Script automatically sends polls to 4 Telegram group topics
2. Members vote on their hours for each category (multiple options allowed, values summed)
3. Telegram sends poll answers to the Express.js webhook via Telegram Bot API
4. The webhook upserts data into PostgreSQL (vote changes are handled automatically)
5. The Next.js frontend reads from the Express API and displays dashboards, leaderboards, charts, and comparisons

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| Poll Automation | Google Apps Script |
| Messaging | Telegram Bot API |
| Frontend Hosting | Vercel (free) |
| Backend Hosting | Railway or Render (free tier) |
| Database Hosting | Neon.tech or Supabase (free tier) |

---

## Project Structure

```
productivity-tracker/
│
├── frontend/                        # Next.js app
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx             # Redirects to /dashboard
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx         # Everyone's daily stats
│   │   │   ├── leaderboard/
│   │   │   │   └── page.jsx         # Rankings by topic & period
│   │   │   ├── profile/
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx     # Individual member page
│   │   │   ├── analytics/
│   │   │   │   └── page.jsx         # Historical charts & trends
│   │   │   ├── compare/
│   │   │   │   └── page.jsx         # Member vs member comparison
│   │   │   └── admin/
│   │   │       └── page.jsx         # Manage members & polls
│   │   ├── components/
│   │   │   ├── StatCard.jsx
│   │   │   ├── TopicChart.jsx
│   │   │   ├── MemberRow.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── CompareChart.jsx
│   │   │   └── Navbar.jsx
│   │   ├── lib/
│   │   │   └── api.js               # Axios/fetch wrapper for backend calls
│   │   └── styles/
│   │       └── globals.css
│   ├── .env.local
│   ├── next.config.js
│   └── package.json
│
├── backend/                         # Express.js app
│   ├── src/
│   │   ├── db/
│   │   │   ├── index.js             # PostgreSQL connection pool (pg)
│   │   │   └── migrations/
│   │   │       └── 001_init.sql     # All table definitions & indexes
│   │   ├── routes/
│   │   │   ├── webhook.js           # POST /webhook — receives Telegram votes
│   │   │   ├── members.js           # GET /members, GET /members/:id
│   │   │   ├── votes.js             # GET /votes/today, GET /votes/history
│   │   │   ├── leaderboard.js       # GET /leaderboard
│   │   │   ├── analytics.js         # GET /analytics/trends, /compare
│   │   │   └── admin.js             # Admin-only routes (protected)
│   │   ├── middleware/
│   │   │   └── adminAuth.js         # Secret key middleware for admin routes
│   │   └── index.js                 # Express entry point
│   ├── .env
│   └── package.json
│
├── apps-script/
│   └── Code.gs                      # Google Apps Script (poll sender + old webhook)
│
└── README.md
```

---

## Database Schema

### `members`
Stores every Telegram user who has voted at least once.

```sql
CREATE TABLE members (
  id           SERIAL PRIMARY KEY,
  telegram_id  BIGINT UNIQUE NOT NULL,
  first_name   VARCHAR(100),
  last_name    VARCHAR(100),
  username     VARCHAR(100),
  is_active    BOOLEAN DEFAULT TRUE,
  joined_at    TIMESTAMP DEFAULT NOW()
);
```

### `topics`
The 4 poll categories. Stored in DB so they can be managed from the admin panel.

```sql
CREATE TABLE topics (
  id                  SERIAL PRIMARY KEY,
  name                VARCHAR(100) UNIQUE NOT NULL,
  telegram_thread_id  INT NOT NULL,
  options             JSONB NOT NULL,
  is_active           BOOLEAN DEFAULT TRUE
);
```

### `polls`
One row per poll sent per day per topic.

```sql
CREATE TABLE polls (
  id               SERIAL PRIMARY KEY,
  topic_id         INT REFERENCES topics(id),
  telegram_poll_id VARCHAR(100) UNIQUE NOT NULL,
  poll_date        DATE NOT NULL,
  sent_at          TIMESTAMP DEFAULT NOW()
);
```

### `votes`
One row per member per poll. The `UNIQUE(poll_id, member_id)` constraint makes vote updates automatic via `ON CONFLICT DO UPDATE`.

```sql
CREATE TABLE votes (
  id               SERIAL PRIMARY KEY,
  poll_id          INT REFERENCES polls(id),
  member_id        INT REFERENCES members(id),
  total_value      DECIMAL(5,2) NOT NULL,
  selected_options JSONB NOT NULL,
  voted_at         TIMESTAMP DEFAULT NOW(),
  updated_at       TIMESTAMP DEFAULT NOW(),
  UNIQUE(poll_id, member_id)
);

CREATE INDEX idx_votes_poll   ON votes(poll_id);
CREATE INDEX idx_votes_member ON votes(member_id);
CREATE INDEX idx_polls_date   ON polls(poll_date);
CREATE INDEX idx_polls_topic  ON polls(topic_id);
```

---

## API Endpoints

### Public routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/members` | List all active members |
| `GET` | `/members/:id` | Single member profile + all-time stats |
| `GET` | `/votes/today` | Today's votes across all topics |
| `GET` | `/votes/history?member_id=&topic=&days=` | Vote history for charts |
| `GET` | `/leaderboard?topic=&period=` | Ranked members by total hours |
| `GET` | `/analytics/trends?member_id=&topic=` | Daily trend data for a member |
| `GET` | `/analytics/compare?member_a=&member_b=&topic=` | Side-by-side comparison data |
| `POST` | `/webhook` | Receives Telegram poll answers |

### Admin routes (require `x-admin-key` header)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/members` | All members including inactive |
| `PATCH` | `/admin/members/:id` | Update member (toggle active etc.) |
| `GET` | `/admin/polls` | All polls ever sent |
| `DELETE` | `/admin/polls/:id` | Remove a poll and its votes |

---

## Environment Variables

### `backend/.env`

```env
PORT=4000
DATABASE_URL=postgresql://user:password@host:5432/productivity_tracker
TELEGRAM_BOT_TOKEN=your_bot_token_here
ADMIN_SECRET_KEY=your_strong_random_secret
```

### `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (local or cloud via Neon/Supabase)
- A Telegram Bot token from @BotFather

### 1. Clone the repo

```bash
git clone https://github.com/yourname/productivity-tracker.git
cd productivity-tracker
```

### 2. Set up the database

Create a PostgreSQL database and run the migration:

```bash
psql -U postgres -c "CREATE DATABASE productivity_tracker;"
psql -U postgres -d productivity_tracker -f backend/src/db/migrations/001_init.sql
```

Then seed the 4 topics:

```sql
INSERT INTO topics (name, telegram_thread_id, options) VALUES
  ('Productivity',    17, '["0","0.5","1","2","3","4","5","6","7","8","9"]'),
  ('Islamic Studies', 26, '["0","0.25","0.5","0.75","1","2","3"]'),
  ('Early Masjid',    21, '["0","1","2","3","4","5"]'),
  ('Sleep Hour',      24, '["0","0.5","1","2","3","4","5","6","7","8","9"]');
```

### 3. Start the backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:4000
```

### 4. Start the frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_API_URL
npm run dev                         # runs on http://localhost:3000
```

### 5. Register the Telegram webhook

Once your backend is deployed and has a public URL, point Telegram to it:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-backend.railway.app/webhook", "allowed_updates": ["poll_answer"]}'
```

---

## Deployment

### Backend → Railway

1. Push `backend/` to a GitHub repo
2. Create a new Railway project → connect the repo
3. Set all environment variables from `backend/.env` in Railway's dashboard
4. Railway auto-deploys on every push

### Frontend → Vercel

1. Push `frontend/` to a GitHub repo
2. Import the repo on vercel.com
3. Set `NEXT_PUBLIC_API_URL` to your Railway backend URL
4. Vercel auto-deploys on every push

### Database → Neon.tech

1. Create a free account at neon.tech
2. Create a new project → copy the connection string
3. Run the migration SQL in the Neon SQL editor
4. Paste the connection string into `DATABASE_URL` in Railway

---

## Google Apps Script

The `apps-script/Code.gs` file handles **only poll sending** (the 9 PM trigger). Vote receiving is handled by the Express webhook directly.

The Apps Script needs these Script Properties set:

| Key | Value |
|---|---|
| `BOT_TOKEN` | Your Telegram bot token |
| `GROUP_ID` | Your Telegram supergroup ID |

The time trigger for `sendDailyPolls` should be set to **9 PM Asia/Dhaka** in the Apps Script triggers panel.

> Note: After migrating to the Express webhook, make sure to run `setWebhook()` pointing to your backend URL, not the Apps Script Web App URL.

---

## Pages Overview

### `/dashboard`
Shows today's votes for all members across all 4 topics. Refreshes when you reload. No login required.

### `/leaderboard`
Filter by topic (Productivity, Islamic Studies, Early Masjid, Sleep Hour) and period (today, this week, this month, all time). Members ranked by total hours.

### `/profile/[id]`
Individual member page showing their all-time stats per topic, participation streak, and a weekly trend chart for each category.

### `/analytics`
Pick any member and topic to see a line chart of their daily values over time. Useful for spotting consistency patterns.

### `/compare`
Pick two members and a topic. Renders a side-by-side line chart showing their daily values on the same axis.

### `/admin`
Protected by the `ADMIN_SECRET_KEY`. Lets you view all members, toggle active status, view all polls sent, and remove erroneous polls.

---

## Key Design Decisions

**Why PostgreSQL instead of Google Sheets?**
Sheets can't handle concurrent writes reliably (race conditions), has no relational integrity, and makes complex queries like rankings and trends very slow. PostgreSQL handles all of this natively.

**Why no sockets?**
The polls happen once a day at 9 PM. Real-time push is unnecessary — a simple page refresh or short polling interval is sufficient for this use case, and it keeps the architecture simple and free.

**Why keep Google Apps Script for sending polls?**
Apps Script has a free, reliable, always-on scheduler (time-based triggers) with zero hosting cost. It's the right tool for the job. The webhook (receiving votes) is moved to Express because it needs a persistent database connection.

**Why `ON CONFLICT DO UPDATE` for votes?**
Telegram sends a new `poll_answer` update every time a member changes their vote. Using PostgreSQL's upsert means vote changes are handled in one query with no manual comparison logic needed.
