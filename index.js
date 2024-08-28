const ticTacToe = (function () {
    let playerOne = {
        marker: 'X',
        name: ''
    };

    let playerTwo = {
        marker: 'O',
        name: ''
    };

    let game = {
        currentGame: false,
        currentPlayer: null,
        gameWon: false,
        options: ['', '', '', '', '', '', '', '', ''],
        possibleWins: [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8]
        ]
    };

    function generateGameboard() {
        const spaceBoiler = document.createElement('div');
        spaceBoiler.className = 'player-space';
        let gameboard = document.createElement('div');
        gameboard.id = 'gameboard';
        //Creates div with h1 (front-end) for each option (back-end):
        for (let i = 0; i < game.options.length; i++) {
            let currentSpace = spaceBoiler.cloneNode();
            currentSpace.id = i;
            currentSpace.textContent = game.options[i];
            currentSpace.addEventListener('click', () => markSpace(currentSpace.id));
            gameboard.appendChild(currentSpace);
        }

        return gameboard;
    }
    
    function generateMenu() {
        let menu = document.createElement('div');
        menu.className = 'menu';
        const startButton = document.createElement('button');
        startButton.addEventListener('click', startGame);
        startButton.id = 'start-button';
        startButton.textContent = 'Start Game';
        menu.appendChild(startButton);

        return menu;
    }

    function markSpace(id) {
        if (game.currentGame) {
            if (game.options[id] !== '' || !game.currentGame) {
                return;
            }
            game.options[id] = game.currentPlayer.marker;
            document.getElementById(id).textContent = game.currentPlayer.marker;
            winCheck();
            if (!game.gameWon) {
                togglePlayer();
            }
        }
    }

    function initializePlayers() {
        if (Math.floor(Math.random() * 2) === 0) {
            game.currentPlayer = playerOne;
        } else {
            game.currentPlayer = playerTwo;
        }
    }
    
    function startGame() {
        game.currentGame = true;
        initializePlayers();
        playerOne.name = prompt('What is your name, player one?');
        playerTwo.name = prompt('What is your name, player two?');
        console.table(game);
        [playerOne, playerTwo].forEach(player => {
            if (player.name === null) {
                player.name = player.marker;
            }
        });
        updateMenu();
    }
    
    function togglePlayer() {
        game.currentPlayer === playerOne ? game.currentPlayer = playerTwo : game.currentPlayer = playerOne;
        document.querySelector('#now-playing').textContent = `${game.currentPlayer.name}'s turn (${game.currentPlayer.marker})`;
        console.table(game);
    }

    function updateMenu() {
        const nowPlaying = document.createElement('h1');
        nowPlaying.id = 'now-playing';
        nowPlaying.textContent = `${game.currentPlayer}'s turn`;
        document.querySelector('#start-button').replaceWith(nowPlaying);
        nowPlaying.textContent = `${game.currentPlayer.name}'s turn (${game.currentPlayer.marker})`;
    }

    function winCheck() {
        for (let i = 0; i < game.possibleWins.length; i++) {
            const currWinPoss = game.possibleWins[i];
            const firstChoice = game.options[currWinPoss[0]];
            const secondChoice = game.options[currWinPoss[1]];
            const thirdChoice = game.options[currWinPoss[2]];

            if (firstChoice == '' || secondChoice == '' || thirdChoice == '') {
                continue;
            }
            if (firstChoice == secondChoice && secondChoice == thirdChoice) {
                game.gameWon = true;
                console.table(game);
                break;
            }
        }

        if (game.gameWon) {
            game.currentGame = false;
            game.gameWon = true;
            alert(`${game.currentPlayer.name} wins!`);
            location.reload();
        }
        else if (!game.options.includes('')) {
            game.currentGame = false;
            alert(`It's a draw!`);
            location.reload();
        }
    }

    return {
        generateGameboard: generateGameboard,
        generateMenu: generateMenu
    };
})();

const container = document.querySelector('#container');
container.append(ticTacToe.generateMenu(), ticTacToe.generateGameboard());