const ticTacToe = (function () {
    let markers = ['X', '', '', 'X', '', '', 'X', '', ''];

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

    return {
        generateGameboard: generateGameboard,
    };
})();

const container = document.querySelector('#container');
container.appendChild(ticTacToe.generateGameboard());