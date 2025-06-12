// Matrix background effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00ff41';
  ctx.font = fontSize + 'px monospace';
  
  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
    
    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

setInterval(draw, 30);

// Wallet scanner logic
const logBox = document.getElementById('logBox');
const scannedEl = document.getElementById('scanned');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const foundWallet = document.getElementById('foundWallet');
const httpCounter = document.getElementById('httpCounter');

const btcAmount = document.getElementById('btcAmount');
const btcValue = document.getElementById('btcValue');
const bnbAmount = document.getElementById('bnbAmount');
const bnbValue = document.getElementById('bnbValue');
const sglAmount = document.getElementById('sglAmount');
const sglValue = document.getElementById('sglValue');

let scanning = false;
let scanned = 0;
let httpRequests = 284587513;
let found = false;
let scanInterval;

const words = [
  'cover', 'trust', 'bleak', 'problem', 'robot', 'clutch', 'equal', 'scissors',
  'instant', 'level', 'price', 'broom', 'elbow', 'swallow', 'crack', 'iron',
  'ceiling', 'cane', 'equip', 'year', 'unique', 'ranch', 'test', 'artist',
  'mechanic', 'agent', 'address', 'salt', 'usage', 'similar', 'man', 'among',
  'fee', 'net', 'along', 'senior', 'public', 'clean', 'prevent', 'oven',
  'million', 'cake', 'reward', 'symbol', 'monkey', 'wld', 'winck', 'mad',
  'ladder', 'strike', 'im', 'fan', 'measure', 'bird', 'castle', 'fat',
  'daily', 'frettage', 'fortune', 'world', 'valid', 'battle', 'build', 'approve'
];

function generatePhrase() {
  return Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
}

function logScan(phrase, balance = 0) {
  const div = document.createElement('div');
  div.textContent = `Balance: ${balance} | Wallet check: ${phrase}`;
  logBox.prepend(div);
  logBox.scrollTop = 0;
}

function updateHttpCounter() {
  httpRequests++;
  const randomNum = Math.floor(Math.random() * 15000) + 10000;
  httpCounter.textContent = `http: ${httpRequests} [Frid ${Math.floor(Math.random() * 5)}] = ${randomNum}`;
}

function startScanning() {
  if (scanning) return;
  
  scanning = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  foundWallet.style.display = 'none';
  found = false;
  
  scanInterval = setInterval(() => {
    scanned++;
    scannedEl.textContent = scanned;
    updateHttpCounter();
    
    const phrase = generatePhrase();
    
    // 1 in 500 chance to "find" a wallet
    if (Math.random() < 1/500 && !found) {
      found = true;
      foundWallet.style.display = 'flex';
      const btc = (0.01 + Math.random() * 0.02).toFixed(4);
      const btcVal = (1000 + Math.random() * 300).toFixed(2);
      const bnb = (0.1 + Math.random() * 0.2).toFixed(1);
      const bnbVal = (100 + Math.random() * 40).toFixed(2);
      const sgl = (0.3 + Math.random() * 0.2).toFixed(1);
      const sglVal = (50 + Math.random() * 40).toFixed(2);
      
      logScan(phrase, btc);
      btcAmount.textContent = `${btc} BTC`;
      btcValue.textContent = `= ${btcVal}$`;
      bnbAmount.textContent = `${bnb} BNB`;
      bnbValue.textContent = `= ${bnbVal}$`;
      sglAmount.textContent = `${sgl} SGL`;
      sglValue.textContent = `= ${sglVal}$`;
    } else {
      logScan(phrase);
    }
  }, 100);
}

function stopScanning() {
  scanning = false;
  clearInterval(scanInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.onclick = startScanning;
stopBtn.onclick = stopScanning;

// Initialize with stop button disabled
stopBtn.disabled = true;

// Add some initial log entries
for (let i = 0; i < 15; i++) {
  logScan(generatePhrase());
}