const ticTacToe = (function () {
    let computer = 0;
    let markers = ['X', '', '', 'X', '', '', 'X', '', ''];
    let player = 0;

    let choiceBoiler = document.createElement('h1');
    let spaceBoiler = document.createElement('div');
    choiceBoiler.className = 'choice';
    spaceBoiler.className = 'player-space';

    function generateGameboard () {
        let gameboard = document.createElement('div');
        gameboard.id = 'gameboard';
        markers.forEach(marker => {
            let currentSpace = spaceBoiler.cloneNode();
            let currentChoice = choiceBoiler.cloneNode();
            currentChoice.textContent = marker;
            currentSpace.appendChild(currentChoice);
            gameboard.appendChild(currentSpace);
        });

        return gameboard;
    }

    function generateScoreboard() {
        let scoreboard = document.createElement('div');
        scoreboard.id = 'scoreboard';
        let computerScore = document.createElement('div');
        computerScore.className = 'score';
        computerScore.id = 'computer-score';
        computerScore.textContent = `Computer: ${computer}`;
        let playerScore = document.createElement('div');
        playerScore.className = 'score';
        playerScore.id = 'player-score';
        playerScore.textContent = `Player: ${player}`;
        scoreboard.append(computerScore, playerScore);

        return scoreboard;
    }

    return {
        generateGameboard: generateGameboard,
        generateScoreboard: generateScoreboard
    };
})();

const container = document.querySelector('#container');
container.append(ticTacToe.generateScoreboard(), ticTacToe.generateGameboard());