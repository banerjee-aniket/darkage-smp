
<h1 align="center">⚔️ DarkAge SMP — Bedrock Server Status Dashboard</h1>

<p align="center">
  <strong>Live Minecraft Bedrock Server Status Page</strong><br>
  Built with <b>React + TypeScript + Tailwind CSS</b> — deployed on <b>Vercel</b> 🚀
</p>

<p align="center">
  <a href="https://darkage-smp.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Live-Demo-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/banerjee-aniket/darkage-smp" target="_blank"><img src="https://img.shields.io/github/stars/banerjee-aniket/darkage-smp?style=for-the-badge&logo=github&color=gold" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/Minecraft-Bedrock%20Edition-3C873A?style=for-the-badge&logo=minecraft" alt="Minecraft Bedrock">
</p>

---

### 🌍 Live API Endpoint
> [`https://api.mcsrvstat.us/bedrock/3/darkagesmp.enderman.cloud:31938`](https://api.mcsrvstat.us/bedrock/3/darkagesmp.enderman.cloud:31938)

The dashboard pulls **real-time server data** (status, MOTD, player count, version) directly from this open API — no authentication required.  
To reduce API load, data refreshes only when you click the **Refresh** button or after **30 minutes**.

---

### 🧩 Key Features

- ⚡ **Instant Online/Offline Detection**  
- 👥 **Live Player Count** — e.g. `1/10`  
- 🧱 **Server Version Info** — displays `1.21.120` dynamically  
- 💬 **MOTD Fetching** with color-code parsing  
- 🔁 **Manual Refresh Button** (prevents API rate-limit issues)  
- 🧠 Built with **React Hooks**, **ShadCN UI**, and **Lucide Icons**  
- 🧑‍💻 100% **Open Source + Zero Backend**

---

### 🧱 Tech Stack

| Purpose | Tools |
|----------|-------|
| Framework | React + TypeScript |
| Styling | Tailwind CSS |
| UI Components | ShadCN/UI |
| Icons | Lucide React |
| Notifications | Sonner |
| API Source | [mcsrvstat.us](https://api.mcsrvstat.us) |
| Deployment | Vercel |

---

### 🧠 How It Works

```ts
fetch("https://api.mcsrvstat.us/bedrock/3/darkagesmp.enderman.cloud:31938")
  .then(res => res.json())
  .then(data => {
    console.log("Server status:", data.online ? "Online" : "Offline");
  });
