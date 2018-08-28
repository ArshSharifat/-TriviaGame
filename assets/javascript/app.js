// TIMER================================================
var timeLeft = 90;
var time = document.getElementById('timer');
var timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        goToResults();
    } else {
        time.innerHTML = timeLeft;
        timeLeft--;
    }
}

function goToResults() {
    window.location.href = 'results.html';
}



  