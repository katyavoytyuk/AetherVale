const joinButtons = document.querySelectorAll('.server-join');
const modal = document.getElementById('server-modal');
const serverId = document.getElementById('server-id');
const copyButton = document.querySelector('.server-copy');

const openModal = () => {
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.server-modal-close').focus();
};

const closeModal = () => {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
};

joinButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
});

modal.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(serverId.textContent);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = serverId.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }

  copyButton.textContent = 'Скопійовано!';
  window.setTimeout(() => {
    copyButton.textContent = 'Скопіювати';
  }, 1500);
});

const eventModal = document.getElementById('event-modal');
const eventModalTitle = document.getElementById('event-modal-title');
const eventModalTime = document.getElementById('event-modal-time');

const closeEventModal = () => {
  eventModal.hidden = true;
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.event-open').forEach((button) => {
  button.addEventListener('click', () => {
    eventModalTitle.textContent = button.dataset.event;
    eventModalTime.textContent = button.dataset.time;
    eventModal.hidden = false;
    document.body.classList.add('modal-open');
    eventModal.querySelector('.event-modal-close').focus();
  });
});

eventModal.querySelectorAll('[data-close-event]').forEach((element) => {
  element.addEventListener('click', closeEventModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !eventModal.hidden) closeEventModal();
});

const passModal = document.getElementById('pass-modal');
const passModalTitle = document.getElementById('pass-modal-title');
const passSelectedName = document.getElementById('pass-selected-name');
const passSelectedPrice = document.getElementById('pass-selected-price');
const passForm = document.getElementById('pass-form');
const passFormStatus = document.getElementById('pass-form-status');
const nicknameInput = document.getElementById('minecraft-nickname');
const cardFields = document.getElementById('card-fields');
const cardNumberInput = document.getElementById('card-number');
const cardExpiryInput = document.getElementById('card-expiry');
const cardCvvInput = document.getElementById('card-cvv');
const cardHolderInput = document.getElementById('card-holder');
const confirmModal = document.getElementById('confirm-modal');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');
const successModal = document.getElementById('success-modal');
const successModalText = document.getElementById('success-modal-text');
const successClose = document.getElementById('success-close');

const updatePaymentFields = () => {
  const payment = new FormData(passForm).get('payment');
  const isCard = payment === 'Картка';
  cardFields.hidden = !isCard;
  cardFields.querySelectorAll('input').forEach((input) => {
    input.disabled = !isCard;
  });
};

const closePassModal = () => {
  passModal.hidden = true;
  document.body.classList.remove('modal-open');
  passFormStatus.textContent = '';
  passForm.reset();
  updatePaymentFields();
};

document.querySelectorAll('.pass-buy').forEach((button) => {
  button.addEventListener('click', () => {
    passModalTitle.textContent = `Привілей «${button.dataset.pass}»`;
    passSelectedName.textContent = button.dataset.pass;
    passSelectedPrice.textContent = button.dataset.price;
    passModal.hidden = false;
    document.body.classList.add('modal-open');
    passModal.querySelector('.pass-modal-close').focus();
  });
});

passModal.querySelectorAll('[data-close-pass]').forEach((element) => {
  element.addEventListener('click', closePassModal);
});

passForm.querySelectorAll('input[name="payment"]').forEach((input) => {
  input.addEventListener('change', updatePaymentFields);
});

cardNumberInput.addEventListener('input', () => {
  const digits = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
  cardNumberInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

cardExpiryInput.addEventListener('input', () => {
  const digits = cardExpiryInput.value.replace(/\D/g, '').slice(0, 4);
  cardExpiryInput.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
});

cardCvvInput.addEventListener('input', () => {
  cardCvvInput.value = cardCvvInput.value.replace(/\D/g, '').slice(0, 4);
});

cardHolderInput.addEventListener('input', () => {
  cardHolderInput.value = cardHolderInput.value.toUpperCase();
});

updatePaymentFields();

passForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!nicknameInput.checkValidity()) {
    nicknameInput.reportValidity();
    return;
  }

  const payment = new FormData(passForm).get('payment');
  if (payment === 'Картка') {
    for (const input of cardFields.querySelectorAll('input')) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }
  }

  passFormStatus.textContent = '';
  confirmModal.hidden = false;
});

confirmNo.addEventListener('click', () => {
  confirmModal.hidden = true;
});

confirmYes.addEventListener('click', () => {
  confirmModal.hidden = true;
  passModal.hidden = true;
  successModalText.textContent = `${passSelectedName.textContent} · ${passSelectedPrice.textContent} · Нік: ${nicknameInput.value}`;
  successModal.hidden = false;
  successClose.focus();
});

successClose.addEventListener('click', () => {
  successModal.hidden = true;
  closePassModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !confirmModal.hidden) confirmModal.hidden = true;
  else if (event.key === 'Escape' && !successModal.hidden) {
    successModal.hidden = true;
    closePassModal();
  } else if (event.key === 'Escape' && !passModal.hidden) closePassModal();
});

const minecraftParticles = document.querySelector('.minecraft-particles');

if (minecraftParticles && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const colors = ['#6f963f', '#83ad49', '#9bbd55', '#567d32', '#b1c65b', '#718f4a'];

  for (let i = 0; i < 38; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'minecraft-particle leaf-particle';
    particle.style.setProperty('--x', `${25 + Math.random() * 58}%`);
    particle.style.setProperty('--y', `${7 + Math.random() * 18}%`);
    particle.style.setProperty('--size', `${5 + Math.floor(Math.random() * 6)}px`);
    particle.style.setProperty('--color', colors[i % colors.length]);
    particle.style.setProperty('--speed', `${9 + Math.random() * 10}s`);
    particle.style.setProperty('--delay', `${Math.random() * -18}s`);
    particle.style.setProperty('--drift-a', `${-45 + Math.random() * 90}px`);
    particle.style.setProperty('--drift-b', `${-70 + Math.random() * 140}px`);
    particle.style.setProperty('--drift-c', `${-95 + Math.random() * 190}px`);
    particle.style.setProperty('--rotation', `${Math.floor(Math.random() * 360)}deg`);
    particle.style.setProperty('--alpha', `${0.55 + Math.random() * 0.35}`);
    minecraftParticles.appendChild(particle);
  }
}