
  /*
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃  Recruiter Gift: Konami Code surprise for curious humans     ┃
   ┃  Author: albertobuenox (front-end · UX)                      ┃
   ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃  How to trigger:                                             ┃
   ┃   Just focus my personal site’s window (make sure the        ┃
   ┃   DevTools aren’t active) and type:                          ┃
   ┃   ↑ ↑ ↓ ↓ ← → ← → B A                                        ┃
   ┃                                                              ┃
   ┃  Why: If you made it this far reading source files, you      ┃
   ┃  deserve a little smile :)                                   ┃
   ┃                                                              ┃
   ┃                        ________________                      ┃
   ┃                       /.,------------,.\                     ┃
   ┃                      ///  .=^^^^^^^\__|\\\                   ┃
   ┃                      \\\   `------.   .//                    ┃
   ┃                       `\\`--...._  `;//'                     ┃
   ┃                         `\\.-,___;.//'                       ┃
   ┃                           `\\-..-//'                         ┃
   ┃                             `\\//'                           ┃
   ┃                               ""                             ┃
   ┃                                                              ┃
   ┃                        (press start ►)                       ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
*/



(() => {
  const GIFT_NAME = "Recruiter Gift";
  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const BUF = [];
  let active = false;
  let stylesEl, toastEl, confettiWrap;

  const injectStyles = () => {
    if (stylesEl) return;
    stylesEl = document.createElement('style');
    stylesEl.setAttribute('data-recruiter-gift', 'css');
    stylesEl.textContent = `
  @keyframes rg-fall{0%{transform:translateY(-10vh) rotate(0deg);opacity:0}10%{opacity:1}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
  @keyframes rg-pop{0%{transform:scale(.9);opacity:0}60%{transform:scale(1.02);opacity:1}100%{transform:scale(1)}}
  .rg-mode .brand span,
  .rg-mode .timeline-title,
  .rg-mode .footer{
    text-shadow:0 0 20px rgba(162,132,255,.25),0 0 40px rgba(45,212,191,.18);
    filter:saturate(1.1);
  }
  .rg-toast{position:fixed;inset:auto 20px 20px auto;display:inline-flex;align-items:center;gap:12px;padding:14px 16px;border-radius:14px;background:rgba(17,18,19,.85);color:#eaeaea;border:1px solid rgba(255,255,255,.12);box-shadow:0 10px 30px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);backdrop-filter:blur(10px);font:600 14px/1.2 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue";z-index:99999;animation:rg-pop .32s ease}
  .rg-toast b{font-weight:800}
  .rg-btn{cursor:pointer;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#eaeaea;border-radius:10px;padding:8px 12px;font-weight:700}
  .rg-btn:hover{background:rgba(255,255,255,.12)}
  .rg-confetti{pointer-events:none;position:fixed;inset:0;overflow:hidden;z-index:99998}
  .rg-piece{position:absolute;top:-10vh;will-change:transform,opacity;font-size:clamp(14px,2.8vw,28px)}
  .recruiter-easter-egg::after{content:"You found the Easter Egg. Let’s build something great 🚀";display:inline-block;margin-left:8px;font-size:12px;opacity:.7}
  @media (prefers-reduced-motion:reduce){.rg-piece{animation:none!important}.rg-toast{animation:none!important}}
`;

    document.head.appendChild(stylesEl);
  };

  const makeToast = () => {
    if (toastEl) return;
    toastEl = document.createElement('div');
    toastEl.className = 'rg-toast';
    toastEl.innerHTML = `
      <span>↑ ↑ ↓ ↓ ← → ← → B A — <b>Nice find</b> 👾</span>
      <button class="rg-btn" data-action="toggle">Turn Off</button>
      <button class="rg-btn" data-action="close">Close</button>
    `;
    toastEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.rg-btn');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      if (action === 'toggle') toggle();
      if (action === 'close') deactivate(false);
    });
    document.body.appendChild(toastEl);
  };

  const selectors = '.timeline-title,.brand span,.footer';
  const applyMark = (on) => {
    document.querySelectorAll(selectors).forEach(el => {
      el.classList.toggle('recruiter-easter-egg', on);
    });
  };

  const confetti = (on) => {
    if (on) {
      if (confettiWrap) return;
      confettiWrap = document.createElement('div');
      confettiWrap.className = 'rg-confetti';
      const emojis = ['🎉','✨','👾','🕹️','⭐','💾','🎮','🧩'];
      const N = 42;
      for (let i=0;i<N;i++){
        const s = document.createElement('span');
        s.className = 'rg-piece';
        s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        const left = Math.random()*100;
        const delay = Math.random()*0.9;
        const duration = 6 + Math.random()*5;
        const rotate = (Math.random()*720 - 360);
        s.style.left = left + 'vw';
        s.style.animation = `rg-fall ${duration}s ease-in ${delay}s 1 both`;
        s.style.transform = `rotate(${rotate}deg)`;
        confettiWrap.appendChild(s);
      }
      document.body.appendChild(confettiWrap);
      setTimeout(() => { confetti(false) }, 12000);
    } else {
      confettiWrap && confettiWrap.remove();
      confettiWrap = null;
    }
  };

  const activate = () => {
    if (active) return;
    active = true;
    injectStyles();
    document.documentElement.classList.add('rg-mode');
    applyMark(true);
    makeToast();
    confetti(true);
    if (toastEl) {
      const tBtn = toastEl.querySelector('[data-action="toggle"]');
      if (tBtn) tBtn.textContent = 'Turn Off';
    }
  };

  const deactivate = (keepToast = false) => {
    active = false;
    document.documentElement.classList.remove('rg-mode');
    applyMark(false);
    confetti(false);
    if (!keepToast && toastEl) { toastEl.remove(); toastEl = null; }
    if (toastEl) {
      const tBtn = toastEl.querySelector('[data-action="toggle"]');
      if (tBtn) tBtn.textContent = 'Turn On';
    }
  };

const toggle = () => active ? deactivate(true) : activate();

  window.addEventListener('keydown', (e) => {
    BUF.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (BUF.length > SEQ.length) BUF.shift();
    const match = SEQ.every((k, i) => BUF[i] === k);
    if (match) activate();
    if (e.key === 'Escape') deactivate();
  });

  if (new URLSearchParams(location.search).get('recruiter') === '1') {
    activate();
  }

  Object.defineProperty(window, 'recruiterGift', { value: { activate, deactivate, toggle, name: GIFT_NAME }, enumerable: true });
})();
