# Chatty 💬

A modern, high-performance, and privacy-focused real-time chat application with End-to-End Encryption (E2EE) and temporary rooms.

---

## 🚀 Key Features & Implementation

### 1. 🔐 End-to-End Encryption (E2EE)
**Feature:** Every message is encrypted on your device and can only be decrypted by people in the same room.
- **How it's implemented:**
  - **Web Crypto API**: Utilizes the browser's native `SubtleCrypto` library for high-speed encryption.
  - **AES-GCM (256-bit)**: Military-grade symmetric encryption used for the message content.
  - **PBKDF2 Key Derivation**: The Room Code is transformed into a cryptographically strong 256-bit key using 100,000 iterations of SHA-256. This ensures your "password" (Room Code) is practically impossible to brute-force.

### 2. 🕒 Secure Chat History
**Feature:** See what was discussed before you joined without compromising security.
- **How it's implemented:**
  - **Server-Side Caching**: The Node.js backend maintains a `Map` of the last 50 encrypted message objects per room.
  - **E2EE Preservation**: Since messages are stored in their *encrypted* form, the server only sees gibberish. Only users with the Room Code can decrypt the history upon joining.

### 3. ✨ Glassmorphic UI & Premium UX
- **Feature:** A stunning "frosted glass" aesthetic with smooth transitions.
- **How it's implemented:**
  - **Tailwind CSS & DaisyUI**: Core styling using modern utility classes and the DaisyUI component library.
  - **Backdrop Blur**: Advanced CSS `backdrop-filter` effects for the premium "glass" look.
  - **Micro-Animations**: Custom CSS keyframes (Fade-In-Up, Scale-In) for a fluid feel.

### 4. 📝 Rich Markdown Support
**Feature:** Send code blocks, bold text, lists, and links.
- **How it's implemented:**
  - **React-Markdown**: Parses message strings into React components.
  - **Tailwind Typography (@tailwindcss/typography)**: Provides the `prose` classes to beautifully style technical content (code, blockquotes, etc.).

### 5. 👥 Real-Time Presence & Typing
**Feature:** Live "Online" status and "Typing..." indicators.
- **How it's implemented:**
  - **WebSockets (ws)**: A full-duplex communication channel between client and server.
  - **Zustand**: Lightweight global state management to handle room data and user status across components.

---

## 🛠️ Tech Stack

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

## 🏁 Getting Started

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

## 🛡️ Security Note
All encryption keys are local to the browser. Your messages are never stored in plain text anywhere in the infrastructure.
