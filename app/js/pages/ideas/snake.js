function Snake(id, size, snakeSizeBase) {
    this.blockName = 'field'; // CSS class
    this.jsPrefix = id; // `${this.jsPrefix}`
    
    // classes of elements
    this.buttonStart = `${this.jsPrefix}-btn-start`;
    this.buttonReset = `${this.jsPrefix}-btn-reset`;

    this.container = document.getElementById(id);
    this.x = size[0];
    this.y = size[1];
    this.snakeSizeBase = snakeSizeBase;
    this.snakeBody = [];
    this.coords = []; // y - 1st level; x - 2nd level; e.g. this.coords[y][x]
    this.error = 'Please enter less value for the snake size';
    this.direction = 'right';
    this.gameOver = false;
    this.enableKeydown = true; // allow to change direction
    this.snakeSpeed = 1000;
    this.interval;


    if (this.snakeSizeBase >= this.x) {
        this.container.innerHTML = `<div style="color: red;">${this.error}</div>`
        return false
    }
    // generate the random integer
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    // generate random food position
    this.foodGenerate = function () {
        const x = this.getRandomInt(0, this.x);
        const y = this.getRandomInt(0, this.y);
        return [x, y]
    }
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
    }
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
    }
    // Snake move
    this.snakeMove = function (buttonStart) {
        this.enableKeydown = true
        buttonStart.disabled = true

        window.addEventListener('keydown', this.snakeMoveArrows.bind(this));

        this.interval = setInterval(() => {
            const snakeHeadX = this.snakeBody[0][0];
            const snakeHeadY = this.snakeBody[0][1];
            // remove class m-head from head of Snake
            this.coords[snakeHeadY][snakeHeadX].classList.remove('m-head');
            
            // TODO: switch
            if (this.direction == 'right') {
                // add new cell
                const snakeHeadXNext = (snakeHeadX == this.x - 1) ? 0 : snakeHeadX + 1;
                this.snakeBody.unshift([snakeHeadXNext, snakeHeadY]);
                // check if snake collided with itself
                this.gameOver = this.coords[snakeHeadY][snakeHeadXNext].classList.contains('snake-body');
                // add class for a new cell
                this.coords[snakeHeadY][snakeHeadXNext].classList.add('snake-body', 'm-head');
            } else if (this.direction == 'left') {
                // add new cell
                const snakeHeadXNext = (snakeHeadX == 0) ? this.x - 1 : snakeHeadX - 1;
                this.snakeBody.unshift([snakeHeadXNext, snakeHeadY]);
                // check if snake collided with itself
                this.gameOver = this.coords[snakeHeadY][snakeHeadXNext].classList.contains('snake-body');
                // add class for a new cell
                this.coords[snakeHeadY][snakeHeadXNext].classList.add('snake-body', 'm-head');
            } else if (this.direction == 'up') {
                // add new cell
                const snakeHeadYNext = (snakeHeadY == 0) ? this.y - 1 : snakeHeadY - 1;
                this.snakeBody.unshift([snakeHeadX, snakeHeadYNext]);
                // check if snake collided with itself
                this.gameOver = this.coords[snakeHeadYNext][snakeHeadX].classList.contains('snake-body');
                // add class for a new cell
                this.coords[snakeHeadYNext][snakeHeadX].classList.add('snake-body', 'm-head');
            } else if (this.direction == 'down') {
                // add new cell
                const snakeHeadYNext = (snakeHeadY == this.y - 1) ? 0 : snakeHeadY + 1;
                this.snakeBody.unshift([snakeHeadX, snakeHeadYNext]);
                // check if snake collided with itself
                this.gameOver = this.coords[snakeHeadYNext][snakeHeadX].classList.contains('snake-body');
                // add class for a new cell
                this.coords[snakeHeadYNext][snakeHeadX].classList.add('snake-body', 'm-head');
            }

            const snakeHeadNew = this.coords[this.snakeBody[0][1]][this.snakeBody[0][0]];
            const snakeHasFood = snakeHeadNew.classList.contains('snake-food');
            // to check if the Snake has eaten food
            if (snakeHasFood) {
                snakeHeadNew.classList.remove('snake-food');
                this.foodCreate()
            } else {
                // remove class for old cell (last)
                const snakeBodyLast = this.snakeBody[this.snakeBody.length - 1];
                const snakeBodyLastX = snakeBodyLast[0];
                const snakeBodyLastY = snakeBodyLast[1];
                this.coords[snakeBodyLastY][snakeBodyLastX].classList.remove('snake-body');
                // remove old cell (last)
                this.snakeBody.pop()
            }

            if (this.gameOver) {
                clearInterval(this.interval);
                setTimeout(() => {
                    alert('Game Over')
                }, 100);
            }
            
            this.enableKeydown = true;
        }, this.snakeSpeed);
    }
    // start Snake
    this.snakeStartMove = function () {
        const buttonStart = document.querySelector(`.${this.buttonStart}`);
        buttonStart.addEventListener('click', this.snakeMove.bind(this, buttonStart));
    }
    // reset Snake
    this.snakeReset = function () {
        const buttonReset = document.querySelector(`.${this.buttonReset}`);
        const buttonStart = document.querySelector(`.${this.buttonStart}`);
        buttonReset.addEventListener('click', this.middle.bind(this, buttonStart));
    }
    // ==== Header
    this.header = function () {
        const _header = document.createElement('div');
        _header.classList.add(`${this.blockName}-header`);
        _header.innerHTML = 'Points: 0 <span style="float: right">Best Result: 0</span>'
        // append header block
        this.container.append(_header);
    };
    // ==== Middle
    this.middle = function (buttonStart) {
        if (buttonStart) {
            // buttonStart.removeAttribute('disabled')
            buttonStart.disabled = false
        }
        let _middle = document.querySelector(`.${this.jsPrefix}-middle`)
        if (_middle) {
            // clear all configuration when the reset button is clicked
            _middle.innerHTML = '';
            this.coords = [];
            this.snakeBody = [];
            clearInterval(this.interval);
            this.direction = 'right';
            this.enableKeydown = false;
        } else {
            _middle = document.createElement('div');
            _middle.classList.add(`${this.blockName}-middle`, `${this.jsPrefix}-middle`);
            this.container.append(_middle);
        }

        // create grid
        for (let i = 0; i < this.y; i++) {
            let _coordsRow = [];
            const _row = document.createElement('div');
            for (let j = 0; j < this.x; j++) {
                const _cell = document.createElement('i');
                _cell.classList.add(`${this.blockName}-middle__cell`);
                _middle.append(_cell);

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
        const btnReset = document.createElement('button');

        btnStart.classList.add(this.buttonStart);
        btnReset.classList.add(this.buttonReset);
        btnReset.style.float = 'right'; // temporary, should be deleted
        btnStart.innerText = 'Start';
        btnReset.innerText = 'Reset';


        _footer.append(btnStart, btnReset);

        // append footer block
        this.container.append(_footer);
    };
    this.main = function () {
        this.header();
        this.middle();
        this.footer();

        this.snakeStartMove();
        this.snakeReset();
        
    }
    this.main()
}

let snake = new Snake(
        id = 'js-snake',
        size = [10, 12],
        snakeSizeBase = 3
    )



// notes
// https://www.educative.io/blog/javascript-snake-game-tutorial
