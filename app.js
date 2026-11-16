document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

document.querySelectorAll('.faq h3 button').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!expanded));
    panel.inert = expanded;
    panel.classList.toggle('open', !expanded);
  });
});

const dialog = document.getElementById('install-dialog');
let closeTimer;
let dialogTrigger;
function closeInstall() {
  dialog.classList.remove('is-open');
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    dialog.close();
    document.body.classList.remove('modal-open');
    dialogTrigger?.focus({ preventScroll: true });
  }, reducedMotion.matches ? 0 : 250);
}
document.querySelectorAll('[data-open-install]').forEach(button => {
  button.addEventListener('click', () => {
    clearTimeout(closeTimer);
    dialogTrigger = button;
    dialog.showModal();
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => dialog.classList.add('is-open'));
  });
});
dialog.querySelector('.close-dialog').addEventListener('click', closeInstall);
dialog.addEventListener('cancel', event => { event.preventDefault(); closeInstall(); });
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeInstall();
  }
});

// Illustrative values only. The website never connects to an authenticator account.
const examples = ['742569', '386204', '519837', '628145'];
let exampleIndex = 0;
let remaining = 24;
let filling = false;
const demoCode = document.getElementById('demo-code');
const demoTime = document.getElementById('demo-time');
const ring = document.getElementById('timer-ring');
const codeRow = document.querySelector('.code-row');
const fillButton = document.getElementById('fill-demo');
const digits = [...document.querySelectorAll('#demo-digits > span')];
const success = document.getElementById('demo-success');
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
function updateCountdown() {
  demoTime.textContent = remaining;
  ring.style.strokeDashoffset = String(106.82 * (1 - remaining / 30));
  codeRow.classList.toggle('expiring', remaining <= 5);
}
setInterval(() => {
  if (filling || document.hidden) return;
  remaining--;
  if (remaining <= 0) {
    remaining = 30;
    exampleIndex = (exampleIndex + 1) % examples.length;
    const code = examples[exampleIndex];
    demoCode.textContent = code.slice(0, 3) + ' ' + code.slice(3);
    demoCode.classList.remove('code-flip');
    requestAnimationFrame(() => demoCode.classList.add('code-flip'));
  }
  updateCountdown();
}, 1000);
fillButton.addEventListener('click', async () => {
  if (filling) return;
  filling = true;
  fillButton.disabled = true;
  fillButton.textContent = 'Filling…';
  const code = examples[exampleIndex];
  for (let i = 0; i < digits.length; i++) {
    if (!reducedMotion.matches) await delay(95);
    digits[i].textContent = code[i];
    digits[i].classList.add('filled');
  }
  document.getElementById('demo-digits').setAttribute('aria-label', 'Demo verification code filled: ' + code);
  fillButton.textContent = '✓ Verification code filled';
  success.classList.add('visible');
  await delay(2500);
  success.classList.remove('visible');
  digits.forEach(digit => { digit.textContent = '–'; digit.classList.remove('filled'); });
  document.getElementById('demo-digits').setAttribute('aria-label', 'Demo verification code, empty');
  fillButton.innerHTML = 'Try it again <span aria-hidden="true">↗</span>';
  fillButton.disabled = false;
  filling = false;
});
updateCountdown();
