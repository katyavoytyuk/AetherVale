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