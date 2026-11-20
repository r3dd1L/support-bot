const ngrok = require('ngrok');
const fs = require('fs');
const { spawn } = require('child_process');

async function start() {
  console.log('🚀 Starting ngrok tunnel...');
  
  try {
    // Start ngrok on port 3000
    const url = await ngrok.connect({
      addr: 3000,
      authtoken_from_env: true,
    });
    
    console.log(`✅ Ngrok tunnel started: ${url}`);
    
    // Update .env file with new WEBAPP_URL
    let envContent = fs.readFileSync('.env', 'utf8');
    envContent = envContent.replace(/WEBAPP_URL=.*/g, `WEBAPP_URL=${url}`);
    fs.writeFileSync('.env', envContent);
    console.log('✅ Updated WEBAPP_URL in .env');
    
    // Start the bot server
    console.log('🚀 Starting bot server...');
    const botProcess = spawn('node', ['bot.js'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });
    
    botProcess.on('error', (err) => {
      console.error('❌ Bot server error:', err);
    });
    
    botProcess.on('close', (code) => {
      console.log(`❌ Bot server exited with code ${code}`);
      process.exit(code);
    });
    
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

start();
