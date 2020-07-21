const highScoresList = document.getElementById("highScoresList");
const highScores = localStorage.setItem('highScores', JSON.stringify(highScores));


highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} : ${score.score}</li>`;
    })
    .join("");