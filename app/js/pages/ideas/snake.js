function Snake(id, size, snakeSizeBase) {
    const blockName = 'field';

    this.container = document.getElementById(id);
    this.x = size[0];
    this.y = size[1];
    this.snakeSizeBase = snakeSizeBase;
    this.snakeBody = [];
    this.coords = []; // y - 1st level; x - 2nd level; e.g. this.coords[y][x]

    if (this.snakeSizeBase >= this.x) {
        this.container.innerHTML = '<div style="color: red;">Please enter less value for the size of the snake</div>'
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
    // create a food
    this.foodCreate = function () {
        let foodCoords = this.foodGenerate();
        while (this.coords[foodCoords[1]][foodCoords[0]].classList.contains('snake-body')) {
            console.log('while')
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

    // ==== Header
    this.header = function () {
        const _header = document.createElement('div');
        _header.classList.add(`${blockName}-header`);

        _header.innerText = 'Header'

        // append header block
        this.container.append(_header);
    };
    // ==== Middle
    this.middle = function () {
        const _middle = document.createElement('div');
        _middle.classList.add(`${blockName}-middle`);

        // create grid
        for (let i = 0; i < this.y; i++) {
            let _coordsRow = [];
            for (let j = 0; j < this.x; j++) {
                const _cell = document.createElement('i');
                _cell.classList.add(`${blockName}-middle__cell`, `js-${blockName}-cell`);
                _cell.setAttribute('data-x', j);
                _cell.setAttribute('data-y', i);
                _middle.append(_cell);

                _coordsRow.push(_cell);
            }
            this.coords.push(_coordsRow)
            const br = document.createElement('br');
            _middle.append(br)
        }

        // append middle block
        this.container.append(_middle);
        
        this.snakeCreate();
        this.foodCreate();

    };
    
    // ==== Footer
    this.footer = function () {
        const _footer = document.createElement('div');
        _footer.classList.add(`${blockName}-footer`);

        _footer.innerText = 'Footer'

        // append footer block
        this.container.append(_footer);
    };
    this.main = function () {
        this.header();
        this.middle();
        this.footer();
    }
    this.main()
}

let snake = new Snake(
        id = 'js-snake',
        size = [10, 12],
        snakeSizeBase = 3
    )
