function Snake(id, size, snakeSizeBase) {
    this.blockName = 's-field'; // CSS class `${this.blockName}`
    this.jsPrefix = id; // `${this.jsPrefix}`
    
    // js classes for elements
    // bloks & elements
    this.blockMiddle = `${this.jsPrefix}-middle`;
    this.blockAlertGameOver = `${this.jsPrefix}-alert-gameover`;
    this.elAlertGameOverClose = `${this.jsPrefix}-alert-gameover-close`;
    // header
    this.headerScoreValue = `${this.jsPrefix}-score-value`;
    this.headerHiScore = `${this.jsPrefix}-hiscore`;
    this.headerHiScoreValue = `${this.jsPrefix}-hiscore-value`;
    this.headerHiScoreList = `${this.jsPrefix}-hiscore-list`;
    // buttons
    this.buttonStart = `${this.jsPrefix}-btn-start`;
    this.buttonPause = `${this.jsPrefix}-btn-pause`;
    this.buttonReset = `${this.jsPrefix}-btn-reset`;

    this.container = document.getElementById(id);
    this.x = size[0];
    this.y = size[1];
    this.snakeSizeBase = snakeSizeBase;
    this.regexpNumber = /[^0-9]/g;
    this.snakeBody = [];
    this.coords = []; // y - 1st level; x - 2nd level; e.g. this.coords[y][x]
    this.direction = 'right';
    this.gameOver = false;
    this.enableKeydown = true; // allow to change direction
    this.readyToStart = true;
    this.isPause = false;
    this.snakeSpeed = 200;
    this.interval;
    this.scoreValue = 0;
    this.hiScoreArray = [];
    this.hiScoreValue = 0;
    // data store
    this.data = {
        settings: {
            htmlSizeXInput: null,
            htmlSizeYInput: null,
            htmlSnakeSizeInput: null,
            htmlCTASubmit: null,
            htmlSettings: null,
            settingsHeading: 'Settings',
            sizeLabel: 'Playing Field Size',
            sizeXLabel: 'Width:',
            sizeYLabel: 'Height:',
            SnakeHeading: 'Snake',
            snakeSizeLabel: 'Snake Size:',
            CTASubmit: 'Submit',
            GotoSettingsButton: 'Go to Settings'
        },
        header: {
            scoreLabel: 'Score: ',
            hiScoreLabel: 'Hi-Score: '
        },
        alert: {
            gameOverText: `Game Over`,
            loadText: 'Loader...'
        },
        error: {
            lengthSnake: `Please enter less length than ${this.x} value for the snake size`
        }
    }
    // generate the random integer
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    // block Settings
    this.settings = function () {
        const $data = this.data.settings;
        const _htmlSettings = document.createElement('div');
        const _htmlSettingsHeading = document.createElement('div');
        _htmlSettings.classList.add(`${this.blockName}-settings`);
        _htmlSettingsHeading.classList.add(`${this.blockName}-settings__title`);
        $data.htmlSettings = _htmlSettings;
        _htmlSettingsHeading.innerText = $data.settingsHeading;
        // == Field Size
        const
            _htmlSizeWrap = document.createElement('div'),
            _htmlSizeHeading = document.createElement('div'),
            _sizeX = componentInputFieldCreate($data.sizeXLabel, this.x),
            _sizeY = componentInputFieldCreate($data.sizeYLabel, this.y),
            _htmlSizeRow = document.createElement('div'),
            _htmlSizeColX = document.createElement('div'),
            _htmlSizeColY = document.createElement('div')

        _htmlSizeRow.classList.add('row');
        _htmlSizeColX.classList.add('col-6');
        _htmlSizeColY.classList.add('col-6');
        _htmlSizeWrap.classList.add(`${this.blockName}-settings__group`);
        _htmlSizeHeading.classList.add(`${this.blockName}-settings__group__heading`);
        _htmlSizeHeading.innerText = $data.sizeLabel;
        $data.htmlSizeXInput = _sizeX.input;
        $data.htmlSizeYInput = _sizeY.input;

        _htmlSizeColX.append(_sizeX.wrap)
        _htmlSizeColY.append(_sizeY.wrap)
        _htmlSizeRow.append(
            _htmlSizeColX,
            _htmlSizeColY
        )

        _htmlSizeWrap.append(
            _htmlSizeHeading,
            _htmlSizeRow
        );

        // == Snake size
        const
            _htmlSnakeWrap = document.createElement('div'),
            _htmlSnakeHeading = document.createElement('div'),
            _htmlSnakeRow = document.createElement('div'),
            _htmlSnakeColSize = document.createElement('div'),
            _htmlSnakeColSpeed = document.createElement('div'),
            _snakeSize = componentInputFieldCreate($data.snakeSizeLabel, this.snakeSizeBase)

        $data.htmlSnakeSizeInput = _snakeSize.input;
        
        _htmlSnakeWrap.classList.add(`${this.blockName}-settings__group`);
        _htmlSnakeHeading.classList.add(`${this.blockName}-settings__group__heading`);
        _htmlSnakeRow.classList.add('row');
        _htmlSnakeColSize.classList.add('col-6');
        _htmlSnakeColSpeed.classList.add('col-6');
        _htmlSnakeHeading.innerText = $data.SnakeHeading;
        // == Snake Speed
        _htmlSnakeColSize.append(_snakeSize.wrap)
        _htmlSnakeRow.append(_htmlSnakeColSize, _htmlSnakeColSpeed)

        _htmlSnakeWrap.append(
            _htmlSnakeHeading,
            _htmlSnakeRow
        )
        // == CTA
        const
            _htmlCTA = document.createElement('div');
            _htmlCTASubmit = document.createElement('button');
        
        _htmlCTA.classList.add(`${this.blockName}-settings__cta`);
        $data.htmlCTASubmit = _htmlCTASubmit
        _htmlCTASubmit.innerText = $data.CTASubmit;
        _htmlCTA.append(_htmlCTASubmit);
        // == Common
        _htmlSettings.append(
            _htmlSettingsHeading,
            _htmlSizeWrap,
            _htmlSnakeWrap,
            _htmlCTA
        );

        this.container.append(_htmlSettings);
        // initialize input component
        componentInputField();
        // click om the "Sumbit" button
        _htmlCTASubmit.addEventListener('click', this.settingsSubmit.bind(this, $data))
    }
    // method for the 'Submit' button within the settings
    this.settingsSubmit = function ($data) {
        this.x = +$data.htmlSizeXInput.value;
        this.y = +$data.htmlSizeYInput.value;
        this.snakeSizeBase = +$data.htmlSnakeSizeInput.value;
        $data.htmlSettings.remove()

        this.header();
        this.middle();
        this.footer();
        this.events();
    }
    if (this.snakeSizeBase >= this.x) {
        this.container.innerHTML = `<div style="color: red;">${this.data.error.lengthSnake}</div>`
        return false
    };
    // return to Settings
    this.settingsGoTo = function (parent) {
        const
            $data = this.data.settings;
            _htmlGotoSettings = document.createElement('div'),
            _htmlGotoSettingsButton = document.createElement('button');
        // $data.htmlGotoSettingsButton = _htmlGotoSettingsButton;
        _htmlGotoSettings.classList.add(`${this.blockName}-settings__goto`);
        _htmlGotoSettingsButton.classList.add(`${this.blockName}-settings__goto__button`);
        _htmlGotoSettingsButton.innerText = $data.GotoSettingsButton;
        _htmlGotoSettings.append(_htmlGotoSettingsButton);
        parent.prepend(_htmlGotoSettings);

        _htmlGotoSettingsButton.addEventListener('click', () => {
            this.container.innerText = '';
            this.coords = [];
            this.snakeBody = [];
            clearInterval(this.interval);
            this.direction = 'right';
            this.enableKeydown = false;
            this.readyToStart = true;
            this.scoreValue = 0;
            this.hiScoreValue = 0;
            this.hiScoreArray = [];
            this.settings();
        })
    }
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

        if (this.readyToStart && (event.code == 'Enter' || event.code == 'ArrowRight')) {
            document.getElementsByClassName(this.buttonStart)[0].click();
            this.direction = 'right'
        } else if (this.isPause && event.code == 'Enter') {
            document.getElementsByClassName(this.buttonStart)[0].click();
        }

        const buttonPause = document.getElementsByClassName(this.buttonPause)[0];
        if (event.code == 'Space' && !buttonPause.disabled) {
            buttonPause.click();
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
    // the interval for the snakeMove
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

        snakeHeadNew.classList.add('snake-body', 'm-head');
        
        if (this.gameOver) {
            const buttonPause = document.getElementsByClassName(this.buttonPause)[0];
            clearInterval(this.interval);
            this.alertGameOver();
            this.scoreHigh();
            buttonPause.disabled = true;
        } else if (snakeHasFood) {
            snakeHeadNew.classList.remove('snake-food');
            this.foodCreate();
            this.score();
        } else {
            const snakeBodyLast = this.snakeBody[this.snakeBody.length - 1];
            const snakeBodyLastX = snakeBodyLast[0];
            const snakeBodyLastY = snakeBodyLast[1];
            this.coords[snakeBodyLastY][snakeBodyLastX].classList.remove('snake-body');
            this.snakeBody.pop()
        }

        this.enableKeydown = true;
    };
    // Snake move. Activated by the Start button
    this.snakeMove = function (buttonStart, buttonPause) {
        this.enableKeydown = true
        this.readyToStart = false
        this.isPause = false
        buttonStart.disabled = true
        buttonPause.disabled = false
        
        this.interval = setInterval(this.snakeInterval.bind(this), this.snakeSpeed);
    };
    // reset Game
    this.gameReset = function (buttonStart, buttonPause, buttonReset) {
        const _middle = document.getElementsByClassName(this.blockMiddle)[0];
        _middle.innerHTML = '';
        this.coords = [];
        this.snakeBody = [];
        clearInterval(this.interval);
        this.direction = 'right';
        this.enableKeydown = false;
        this.readyToStart = true;
        this.isPause = false;
        buttonStart.disabled = false;
        buttonPause.disabled = true;
        buttonReset.blur();
        if (!this.gameOver && this.scoreValue) this.scoreHigh(); // should be launched before this.scoreValue = 0
        this.scoreValue = 0;
        this.score(true);
        this.middle();
    };
    // the button Pause
    this.gamePause = function (buttonStart, buttonPause) {
        clearInterval(this.interval);
        this.enableKeydown = false;
        this.isPause = true;
        buttonStart.disabled = false;
        buttonPause.blur();
    }
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
    // Score
    this.score = function (reset) {
        const _headerScoreValue = document.getElementsByClassName(this.headerScoreValue)[0];
        _headerScoreValue.innerText = reset ? 0 : ++this.scoreValue;
    };
    // High Score
    this.scoreHigh = function () {
        const _headerHiScoreValue = document.getElementsByClassName(this.headerHiScoreValue)[0];
        const _headerHiScore = document.getElementsByClassName(this.headerHiScore)[0];
        let _headerHiScoreList = document.getElementsByClassName(this.headerHiScoreList)[0];
        let _lookForScoreValueCurrent = true;

        if (_headerHiScoreList) {
            _headerHiScoreList.innerText = ''
        } else {
            _headerHiScoreList = document.createElement('ul');
            _headerHiScoreList.classList.add(`${this.blockName}-header__hiscore__list`, this.headerHiScoreList);
        }

        this.hiScoreArray.push(this.scoreValue);
        this.hiScoreValue = Math.max(...this.hiScoreArray);
        this.hiScoreArray.sort((a, b) => b - a);
        _headerHiScoreValue.innerText = this.hiScoreValue;

        for (let i = 0; i < this.hiScoreArray.length; i++) {
            const _headerHiScoreItem = document.createElement('li');
            _headerHiScoreItem.classList.add(`${this.blockName}-header__hiscore__item`);
            _headerHiScoreItem.innerText = this.hiScoreArray[i];
            _headerHiScoreList.append(_headerHiScoreItem);

            if (this.hiScoreArray[i] == this.scoreValue && _lookForScoreValueCurrent) {
                _headerHiScoreItem.classList.add('m-highlight');
                _lookForScoreValueCurrent = false;
            }
        }

        if (this.hiScoreArray.length > 1) _headerHiScore.append(_headerHiScoreList);
    };
    // ==== Header Methods END
    // ==== Header
    this.header = function () {
        const
            _header = document.createElement('div'),
            _headerInfo = document.createElement('div'),
            _headerScore = document.createElement('div'),
            _headerScoreValue = document.createElement('span'),
            _headerHiScore = document.createElement('div'),
            _headerHiScoreValue = document.createElement('span');

        _header.classList.add(`${this.blockName}-header`);
        _headerInfo.classList.add(`${this.blockName}-header__info`);
        _headerScore.classList.add(`${this.blockName}-header__score`);
        _headerScoreValue.classList.add(this.headerScoreValue);
        _headerHiScore.classList.add(`${this.blockName}-header__hiscore`, this.headerHiScore);
        _headerHiScoreValue.classList.add(this.headerHiScoreValue);
        
        _headerScore.innerText = this.data.header.scoreLabel;
        _headerScoreValue.innerText = this.scoreValue;
        _headerHiScore.innerText = this.data.header.hiScoreLabel;
        _headerHiScoreValue.innerText = this.hiScoreValue;

        _headerScore.append(_headerScoreValue);
        _headerHiScore.append(_headerHiScoreValue);
        _headerInfo.append(_headerScore, _headerHiScore);
        _header.append(_headerInfo);
        this.settingsGoTo(_header);
        this.container.append(_header); // append header block
    };
    // ==== Middle
    this.middle = function () {
        let _middle = document.getElementsByClassName(this.blockMiddle)[0];
        if (!_middle) {
            _middle = document.createElement('div');
            _middle.classList.add(`${this.blockName}-middle`, `${this.jsPrefix}-middle`);
            _middle.setAttribute('data-load-text', this.data.alert.loadText)
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

        btnPause.disabled = true;

        _footer.append(btnStart, btnPause, btnReset);

        // append footer block
        this.container.append(_footer);
    };
    this.events = function () {
        const buttonStart = document.getElementsByClassName(this.buttonStart)[0];
        const buttonPause = document.getElementsByClassName(this.buttonPause)[0];
        const buttonReset = document.getElementsByClassName(this.buttonReset)[0];
        // click button Start
        buttonStart.addEventListener('click', this.snakeMove.bind(this, buttonStart, buttonPause));
        // click button Pause
        buttonPause.addEventListener('click', this.gamePause.bind(this, buttonStart, buttonPause));
        // click button Reset
        buttonReset.addEventListener('click', this.gameReset.bind(this, buttonStart, buttonPause, buttonReset));
        // listener of keyboard
        window.addEventListener('keydown', this.snakeMoveArrows.bind(this));
    };
    this.main = function () {
        this.settings();
    };
    this.main();
};

let snake = new Snake(
    id = 'js-snake',
    size = [10, 12],
    snakeSizeBase = 3
)

// TODO:
// - html class => id
// - elements into array: this.element; this.element = docement.createElement
// - new click - new interval
