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

const closePassModal = () => {
  passModal.hidden = true;
  document.body.classList.remove('modal-open');
  passFormStatus.textContent = '';
  passForm.reset();
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

passForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!nicknameInput.checkValidity()) {
    nicknameInput.reportValidity();
    return;
  }

  const payment = new FormData(passForm).get('payment');
  passFormStatus.textContent = `Замовлення готове до оплати: ${passSelectedName.textContent}, ${passSelectedPrice.textContent}, нік ${nicknameInput.value}, оплата: ${payment}.`;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !passModal.hidden) closePassModal();
});
