function Snake(id, size, snakeSizeBase) {
    this.blockName = 'field'; // CSS class `${this.blockName}`
    this.jsPrefix = id; // `${this.jsPrefix}`
    
    // js classes for elements
    // bloks & elements
    this.blockMiddle = `${this.jsPrefix}-middle`;
    this.blockAlertGameOver = `${this.jsPrefix}-alert-gameover`;
    this.elAlertGameOverClose = `${this.jsPrefix}-alert-gameover-close`;
    // header
    this.headerScoreValue = `${this.jsPrefix}-score-value`;
    this.headerHiScoreValue = `${this.jsPrefix}-hiscore-value`;
    // buttons
    this.buttonStart = `${this.jsPrefix}-btn-start`;
    this.buttonReset = `${this.jsPrefix}-btn-reset`;
    this.buttonPause = `${this.jsPrefix}-btn-pause`;

    this.container = document.getElementById(id);
    this.x = size[0];
    this.y = size[1];
    this.snakeSizeBase = snakeSizeBase;
    this.snakeBody = [];
    this.coords = []; // y - 1st level; x - 2nd level; e.g. this.coords[y][x]
    this.direction = 'right';
    this.gameOver = false;
    this.enableKeydown = true; // allow to change direction
    this.snakeSpeed = 300;
    this.interval;
    this.scoreValue = 0;
    this.hiScore = [0];
    // data store
    this.data = {
        header: {
            scoreLabel: 'Score: ',
            hiScoreLabel: 'He-Score: '
        },
        alert: {
            gameOverText: `Game Over`
        },
        error: {
            lengthSnake: `Please enter less length than ${this.x} value for the snake size`
        }
    }

    if (this.snakeSizeBase >= this.x) {
        this.container.innerHTML = `<div style="color: red;">${this.data.error.lengthSnake}</div>`
        return false
    };
    // generate the random integer
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    // generate random food position
    this.foodGenerate = function () {
        const x = this.getRandomInt(0, this.x);
        const y = this.getRandomInt(0, this.y);
        return [x, y]
    };
    // arrows to control the snake
    this.snakeMoveArrows = function (event) {
        // TODO: switch or direction = event.code
        if (event.code == 'ArrowRight' && this.direction != 'left' && this.enableKeydown) {
            this.direction = 'right';
            this.enableKeydown = false;
        } else if (event.code == 'ArrowLeft' && this.direction != 'right' && this.enableKeydown) {
            this.direction = 'left';
            this.enableKeydown = false;
        } else if (event.code == 'ArrowUp' && this.direction != 'down' && this.enableKeydown) {
            this.direction = 'up';
            this.enableKeydown = false;
        } else if (event.code == 'ArrowDown' && this.direction != 'up' && this.enableKeydown) {
            this.direction = 'down';
            this.enableKeydown = false;
        }
    };
    // create a food
    this.foodCreate = function () {
        let foodCoords = this.foodGenerate();
        while (this.coords[foodCoords[1]][foodCoords[0]].classList.contains('snake-body')) {
            console.log('food & snake')
            foodCoords = this.foodGenerate();
        }
        this.coords[foodCoords[1]][foodCoords[0]].classList.add('snake-food');
    };
    // create a snake
    this.snakeCreate = function () {
        let _snakeX = this.getRandomInt(this.snakeSizeBase - 1, this.x);
        const _snakeY = this.getRandomInt(0, this.y);
        for (let i = 1; i <= this.snakeSizeBase; i++) {
            this.snakeBody.push([_snakeX, _snakeY]);
            _snakeX--
        }

        for (let i = 0; i < this.snakeBody.length; i++) {
            const _snakeBodyCell = this.coords[this.snakeBody[i][1]][this.snakeBody[i][0]];
            _snakeBodyCell.classList.add('snake-body');
            if (i == 0) _snakeBodyCell.classList.add('m-head');
        }
    };
    // interval for snakeMove
    this.snakeInterval = function () {
        const snakeHeadX = this.snakeBody[0][0];
        const snakeHeadY = this.snakeBody[0][1];
        // remove class m-head from head of Snake
        this.coords[snakeHeadY][snakeHeadX].classList.remove('m-head');
        
        // add new cell
        let snakeHeadXNext;
        switch (this.direction) {
            case 'right':
                snakeHeadXNext = (snakeHeadX == this.x - 1) ? 0 : snakeHeadX + 1;
                this.snakeBody.unshift([snakeHeadXNext, snakeHeadY]);
                break;
            case 'left':
                snakeHeadXNext = (snakeHeadX == 0) ? this.x - 1 : snakeHeadX - 1;
                this.snakeBody.unshift([snakeHeadXNext, snakeHeadY]);
                break;
            case 'up':
                snakeHeadYNext = (snakeHeadY == 0) ? this.y - 1 : snakeHeadY - 1;
                this.snakeBody.unshift([snakeHeadX, snakeHeadYNext]);
                break;
            case 'down':
                snakeHeadYNext = (snakeHeadY == this.y - 1) ? 0 : snakeHeadY + 1;
                this.snakeBody.unshift([snakeHeadX, snakeHeadYNext]);
                break;
        }

        const snakeHeadNew = this.coords[this.snakeBody[0][1]][this.snakeBody[0][0]];
        const snakeHasFood = snakeHeadNew.classList.contains('snake-food');
        this.gameOver = snakeHeadNew.classList.contains('snake-body');
        
        if (this.gameOver) {
            clearInterval(this.interval);
            this.alertGameOver();
        } else if (snakeHasFood) {
            snakeHeadNew.classList.remove('snake-food');
            this.foodCreate();
            this.score();
        } else {
            // remove class for old cell (last)
            const snakeBodyLast = this.snakeBody[this.snakeBody.length - 1];
            const snakeBodyLastX = snakeBodyLast[0];
            const snakeBodyLastY = snakeBodyLast[1];
            this.coords[snakeBodyLastY][snakeBodyLastX].classList.remove('snake-body');
            // remove old cell (last)
            this.snakeBody.pop()
        }
        snakeHeadNew.classList.add('snake-body', 'm-head');
        this.enableKeydown = true;
    };
    // Snake move
    this.snakeMove = function (buttonStart) {
        this.enableKeydown = true
        buttonStart.disabled = true
        
        window.addEventListener('keydown', this.snakeMoveArrows.bind(this));
        this.interval = setInterval(this.snakeInterval.bind(this), this.snakeSpeed);
    };
    // reset Snake
    this.snakeReset = function (buttonStart) {
        const _middle = document.getElementsByClassName(this.blockMiddle)[0];
        _middle.innerHTML = '';
        this.coords = [];
        this.snakeBody = [];
        clearInterval(this.interval);
        this.direction = 'right';
        this.enableKeydown = false;
        buttonStart.disabled = false;
        this.scoreValue = 0;
        this.score(true);
        this.middle();
    };
    // Alert for game over event
    this.alertGameOver = function () {
        const _alert = document.createElement('div');
        const _alertBody = document.createElement('div');
        const _alertClose = document.createElement('button');

        _alert.classList.add(`${this.blockName}-alert-gameover`, this.blockAlertGameOver);
        _alertBody.classList.add(`${this.blockName}-alert-gameover__body`);
        _alertClose.classList.add(`${this.blockName}-alert-gameover__close`, this.elAlertGameOverClose);

        _alertBody.innerText = this.data.alert.gameOverText;
        _alertBody.append(_alertClose);
        _alert.append(_alertBody);
        document.getElementsByClassName(this.blockMiddle)[0].append(_alert);

        _alertClose.addEventListener('click', () => {
            _alert.remove()
        })
    }
    // ==== Header Methods START
    this.score = function (reset) {
        const _headerScoreValue = document.getElementsByClassName(this.headerScoreValue)[0];
        _headerScoreValue.innerText = reset ? 0 : ++this.scoreValue;
    };
    this.scoreHigh = function () {
        const _headerHiScoreValue = document.getElementsByClassName(headerHiScoreValue)[0];
    };
    // ==== Header Methods END
    // ==== Header
    this.header = function () {
        const _header = document.createElement('div');
        const _headerInfo = document.createElement('div');
        const _headerScore = document.createElement('div');
        const _headerScoreValue = document.createElement('span');
        const _headerHiScore = document.createElement('div');
        const _headerHiScoreValue = document.createElement('span');

        _header.classList.add(`${this.blockName}-header`);
        _headerInfo.classList.add(`${this.blockName}-header__info`);
        _headerScore.classList.add(`${this.blockName}-header__score`);
        _headerScoreValue.classList.add(this.headerScoreValue);
        _headerHiScore.classList.add(`${this.blockName}-header__hiscore`);
        _headerHiScoreValue.classList.add(this.headerHiScoreValue);
        
        _headerScore.innerText = this.data.header.scoreLabel;
        _headerScoreValue.innerText = this.scoreValue;
        _headerHiScore.innerText = this.data.header.hiScoreLabel;
        _headerHiScoreValue.innerText = this.hiScore;

        _headerScore.append(_headerScoreValue);
        _headerHiScore.append(_headerHiScoreValue);
        _headerInfo.append(_headerScore, _headerHiScore);
        _header.append(_headerInfo);
        this.container.append(_header); // append header block
    };
    // ==== Middle
    this.middle = function () {
        let _middle = document.getElementsByClassName(this.blockMiddle)[0];
        if (!_middle) {
            _middle = document.createElement('div');
            _middle.classList.add(`${this.blockName}-middle`, `${this.jsPrefix}-middle`);
            this.container.append(_middle);
        }

        // create grid
        for (let i = 0; i < this.y; i++) {
            let _coordsRow = [];
            const _row = document.createElement('div');
            _row.classList.add(`${this.blockName}-middle__row`);
            for (let j = 0; j < this.x; j++) {
                const _cell = document.createElement('i');
                _cell.classList.add(`${this.blockName}-middle__cell`);
                _row.append(_cell);

                _coordsRow.push(_cell);
            }
            this.coords.push(_coordsRow);
            _middle.append(_row);
        }

        this.snakeCreate();
        this.foodCreate();
    };
    // ==== Footer
    this.footer = function () {
        const _footer = document.createElement('div');
        _footer.classList.add(`${this.blockName}-footer`);

        const btnStart = document.createElement('button');
        const btnPause = document.createElement('button');
        const btnReset = document.createElement('button');

        btnStart.classList.add(this.buttonStart);
        btnPause.classList.add(this.buttonPause);
        btnReset.classList.add(this.buttonReset);
        btnPause.style.marginLeft = '100px'; // temporary, should be deleted
        btnReset.style.float = 'right'; // temporary, should be deleted
        btnStart.innerText = 'Start';
        btnPause.innerText = 'Pause';
        btnReset.innerText = 'Reset';


        _footer.append(btnStart, btnPause, btnReset);

        // append footer block
        this.container.append(_footer);
    };
    this.events = function () {
        const buttonReset = document.querySelector(`.${this.buttonReset}`);
        const buttonStart = document.querySelector(`.${this.buttonStart}`);
        // click button Start
        buttonStart.addEventListener('click', this.snakeMove.bind(this, buttonStart));
        // click button Reset
        buttonReset.addEventListener('click', this.snakeReset.bind(this, buttonStart));

    }
    this.main = function () {
        this.header();
        this.middle();
        this.footer();

        this.events();
    }
    this.main()
};

let snake = new Snake(
    id = 'js-snake',
    size = [10, 12],
    snakeSizeBase = 9
)

// notes
// https://www.educative.io/blog/javascript-snake-game-tutorial
