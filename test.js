const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const startButton = document.getElementById('start');
let timeout;
let currentTarget;
let totalRounds = 5; // Số lần xuất hiện
let roundsCompleted = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    message.textContent = 'Hãy đợi...';
    clearTarget();
    roundsCompleted = 0;
    startNextRound();
}

function startNextRound() {
    if (roundsCompleted < totalRounds) {
        timeout = setTimeout(showTarget, Math.random() * 2000 + 1000); // Từ 1 đến 3 giây
    } else {
        message.textContent = 'Kết thúc trò chơi!';
    }
}

function showTarget() {
    const randomIndex = Math.floor(Math.random() * cells.length);
    const targetCell = cells[randomIndex];

    clearTarget();
    currentTarget = document.createElement('div');
    currentTarget.classList.add('target');
    targetCell.appendChild(currentTarget);
    currentTarget.style.display = 'block';

    message.textContent = 'Click nhanh vào hình tròn!';
    roundsCompleted++;
}

function clearTarget() {
    if (currentTarget) {
        currentTarget.remove();
        currentTarget = null;
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (cell.contains(currentTarget)) {
            clearTimeout(timeout);
            clearTarget();
            message.textContent = 'Thành công!';
            startNextRound();
        }
    });
});
