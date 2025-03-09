const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historyList = document.getElementById('historyList');

let history = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleButtonClick(value);
  });
});

historyBtn.addEventListener('click', () => {
  historyPanel.classList.add('active');
});

closeHistoryBtn.addEventListener('click', () => {
  historyPanel.classList.remove('active');
});

function handleButtonClick(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === 'DEL') {
    display.value = display.value.slice(0, -1);
  } else if (value === '=') {
    try {
      const result = eval(display.value);
      history.push(`${display.value} = ${result}`);
      updateHistory();
      display.value = result;
    } catch {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
}

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => {
      display.value = item.split(' = ')[0];
    });
    historyList.appendChild(li);
  });
}