# Chatty

A modern, high-performance, and privacy-focused real-time chat application with temporary rooms.

---

## Key Features & Implementation

### 1. Chat History & Rolling Message Cap
**Feature:** See what was discussed before you joined, and maintain a rolling window of 50 messages.
- **How it's implemented:**
  - **Server-Side Caching**: The Node.js backend maintains a `Map` of the last 50 message objects per room in memory.
  - **Client-Side Rolling Window**: The frontend maintains a strict rolling limit of 50 messages. If messages in the active room exceed 50, the oldest message is shifted out of state/memory.
  - **History Preservation**: Messages are stored in memory, so users joining later can catch up on the conversation.

### 2. Glassmorphic UI & Premium UX
- **Feature:** A stunning "frosted glass" aesthetic with smooth transitions and compact desktop layouts.
- **How it's implemented:**
  - **Tailwind CSS & DaisyUI**: Core styling using modern utility classes and the DaisyUI component library.
  - **Backdrop Blur**: Advanced CSS `backdrop-filter` effects for the premium "glass" look.
  - **Micro-Animations**: Custom CSS keyframes (Fade-In-Up, Scale-In) for a fluid feel.
  - **Compact Layouts (Medium UI)**: Balanced sizing of UI elements on the Join and Chat components (optimized headers, padding, buttons, fields, and sidebar widths) for a professional dashboard experience.

### 3. Rich Markdown Support
**Feature:** Send code blocks, bold text, lists, and links.
- **How it's implemented:**
  - **React-Markdown**: Parses message strings into React components.
  - **Tailwind Typography (@tailwindcss/typography)**: Provides the `prose` classes to beautifully style technical content (code, blockquotes, etc.).

### 4. Real-Time Presence & Typing
**Feature:** Live "Online" status and "Typing..." indicators.
- **How it's implemented:**
  - **WebSockets (ws)**: A full-duplex communication channel between client and server.
  - **Zustand**: Lightweight global state management to handle room data and user status across components.

---

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS, DaisyUI
- **Icons**: Phosphor Icons
- **State Management**: Zustand

### Backend
- **Environment**: Node.js
- **Language**: TypeScript
- **Communication**: WebSockets (ws)
- **Runtime**: Nodemon (Development)

---

## Getting Started

### 1. Backend Setup
```bash
cd Real-time-Chat
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd "Real-Time-Chat FrontEnd"
npm install
npm run dev
```

---

## Deployment

### 1. Backend (Render)
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: 8080 (Render usually provides this)
  - `URL`: Your Render app URL (e.g., `https://chatty-backend.onrender.com`) - *Used for self-ping to prevent sleeping.*

### 2. Frontend (Vercel)
- **Framework Preset**: Vite
- **Root Directory**: `Real-Time-Chat FrontEnd`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_WS_URL`: Your Render backend URL (e.g., `chatty-backend.onrender.com`) - *Do not include ws:// or wss://, the app handles it.*

---
