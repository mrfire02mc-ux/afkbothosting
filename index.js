const mineflayer = require('mineflayer');
const express = require('express');

// --- KEEP-ALIVE WEB SERVER FOR FREE HOSTS ---
const app = express();
app.get('/', (req, res) => res.send('Minecraft AFK Bot is running 24/7!'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Keep-alive server listening on port 3000');
});

// --- MINECRAFT BOT LOGIC ---
function createBot() {
  const bot = mineflayer.createBot({
    host: 'xLapataSMPx.aternos.me', // e.g. LapataSMP.aternos.me
    port: 25565,                  // Default port
    username: 'Op24_7YT',
    auth: 'offline'               // 'offline' for Cracked/Aternos servers
  });

  bot.on('spawn', () => {
    console.log('✅ Bot successfully connected to server!');
    
    // Anti-AFK jump loop every 20 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 20000);
  });

  // Auto-reconnect if server restarts or bot gets kicked
  bot.on('end', () => {
    console.log('❌ Disconnected! Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Bot Error:', err.message));
}

createBot();
