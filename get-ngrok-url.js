const ngrok = require('ngrok');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('webapp/dist'));

app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: 0,
    blockedUsers: 0,
    totalTickets: 0,
    closedTickets: 0
  });
});

app.get('/api/users', (req, res) => res.json([]));
app.get('/api/config', (req, res) => res.json({
  welcome_message: 'Welcome!',
  ticket_created: 'Ticket created!',
  user_blocked: 'Blocked!',
  maintenance_message: 'Maintenance!',
  maintenance_mode: '0'
}));
app.get('/api/templates', (req, res) => res.json([]));

async function start() {
  const server = app.listen(3000, async () => {
    console.log('✅ Local server running on port 3000');
    
    try {
      const url = await ngrok.connect({
        addr: 3000,
        authtoken_from_env: true,
      });
      
      console.log('\n🚀 Ngrok tunnel is ready!');
      console.log(`   Public URL: ${url}`);
      console.log('\n📋 Next steps:');
      console.log('1. Add this URL as WEBAPP_URL in .env');
      console.log('2. Add your BOT_TOKEN and other config to .env');
      console.log('3. Then run "npm run dev" to start everything');
      
      // Update .env automatically
      if (fs.existsSync('.env')) {
        let envContent = fs.readFileSync('.env', 'utf8');
        envContent = envContent.replace(/WEBAPP_URL=.*/g, `WEBAPP_URL=${url}`);
        fs.writeFileSync('.env', envContent);
        console.log(`\n✅ Updated WEBAPP_URL in .env to ${url}`);
      }
    } catch (err) {
      console.error('❌ Error starting ngrok:', err);
      server.close();
      process.exit(1);
    }
  });
}

start();
