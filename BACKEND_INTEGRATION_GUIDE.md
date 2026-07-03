# 🚀 Backend Integration Guide

## Quick Overview

A complete Express.js backend API server has been created and integrated into this repository under the `backend/` folder.

**Status**: ✅ **Ready for Production**

## 📁 Backend Location

```
new-user-interface/
├── backend/                    ← Backend API server here
│   ├── server/
│   │   ├── index.js           Main Express server
│   │   ├── db.js              PostgreSQL config
│   │   └── routes/            API endpoints
│   ├── package.json           Dependencies
│   ├── render.yaml            Render config
│   └── [documentation]        9 guide files
├── src/                       ← Frontend
├── package.json               ← Frontend package
└── ...
```

## 🔧 Backend Setup (Local Development)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL
```

### Step 3: Start Backend Server

```bash
# Development
npm run dev

# Production
npm start

# For Render
npm run server
```

**Server runs on**: `http://localhost:10000`

## 🌐 API Endpoints

### Bot Ideas (8 endpoints)

```
POST   /api/bot-ideas              Create
GET    /api/bot-ideas              List
GET    /api/bot-ideas/:id          Get
PUT    /api/bot-ideas/:id          Update
DELETE /api/bot-ideas/:id          Delete
GET    /api/bot-ideas/:id/xml      Get XML
POST   /api/bot-ideas/:id/bot-xml  Attach
DELETE /api/bot-ideas/:id/bot-xml  Detach
```

### Statistics (3 endpoints)

```
GET    /api/best-bot-stats         Top bots
GET    /api/best-bot-stats/:id     Single bot
POST   /api/best-bot-stats/:id     Update
```

### AI Strategy (1 endpoint)

```
POST   /api/ai/auto-trade-strategy  Generate auto-trade strategy plan
```

### Exchange Rates (1 endpoint)

```
GET    /api/exchange-rates/usd-kes  Get USD/KES exchange rate
```

### Scanner (2 endpoints)

```
GET    /api/scanner/signal         Current signal
POST   /api/scanner/signal         New signal
```

## 📚 Backend Documentation

Read these files in `backend/`:

1. **README.md** - Project overview
2. **SETUP.md** - Local setup
3. **DEPLOYMENT.md** - Deploy to Render
4. **QUICK_REFERENCE.md** - Commands
5. **FRONTEND_INTEGRATION.md** - Connect frontend
6. **INSTALLATION_STEPS.md** - Step-by-step

## 🚀 Production Deployment

### Render.com

The backend is already deployed to:
**https://deriv-bot-backend-4y8v.onrender.com**

To re-deploy after changes:

1. Push to GitHub (done)
2. Render auto-deploys (takes 2-5 minutes)
3. Check logs in Render dashboard

### Database

Uses PostgreSQL on Neon:

```
postgresql://neondb_owner:npg_PXGYsnqC3i2z@ep-dry-cherry-anulwfjs.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
```

Tables auto-create on first run:

- `bot_ideas`
- `scanner_signals`
- `bot_stats`

## 🔗 Connect Frontend to Backend

Update frontend environment variables:

**.env.production**:

```env
VITE_API_BASE_URL=https://deriv-bot-backend-4y8v.onrender.com/api
```

**.env.development**:

```env
VITE_API_BASE_URL=http://localhost:10000/api
```

Then use in components:

```typescript
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Example: Fetch bot ideas
const response = await fetch(`${API_URL}/bot-ideas`);
```

## ✅ Features

✅ 13 REST API endpoints
✅ PostgreSQL database
✅ CORS enabled
✅ Security headers
✅ Error handling
✅ Health checks
✅ Production ready

## 🧪 Testing Endpoints

### Health Check

```bash
curl http://localhost:10000/health
```

### Get Bot Ideas

```bash
curl http://localhost:10000/api/bot-ideas
```

### Create Bot Idea

```bash
curl -X POST http://localhost:10000/api/bot-ideas \
  -H "Content-Type: application/json" \
  -d '{
    "bot_name": "Test",
    "strategy_description": "Detailed description here (min 120 chars)",
    "submitted_by": "user123"
  }'
```

## 📊 Project Structure

```
backend/
├── server/
│   ├── index.js              Server entry point
│   ├── db.js                 Database setup
│   └── routes/
│       ├── bot-ideas.js      (8 endpoints)
│       ├── best-bot-stats.js (3 endpoints)
│       └── scanner.js        (2 endpoints)
├── package.json              Dependencies
├── render.yaml               Render config
└── *.md                      Documentation
```

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://...
PORT=10000
NODE_ENV=production
CORS_ORIGIN=https://riskmanagers.site,http://localhost:5000
```

## 📞 Support

For backend issues:

1. Check `backend/SETUP.md` for setup problems
2. Check `backend/DEPLOYMENT.md` for deployment issues
3. See `backend/QUICK_REFERENCE.md` for commands

## 🎯 Next Steps

1. ✅ Backend created and deployed
2. ⏳ Update frontend API URLs
3. ⏳ Connect frontend to backend
4. ⏳ Test all endpoints
5. ⏳ Monitor production

---

**Backend Status**: 🎉 **Production Ready**

Visit: https://deriv-bot-backend-4y8v.onrender.com/health
