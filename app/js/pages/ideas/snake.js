function Snake(id, size) {
    const blockName = 'field';

    this.container = document.getElementById(id);
    this.x = size[0];
    this.y = size[1];

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

        let _coords = [];

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
            _coords.push(_coordsRow)
            const br = document.createElement('br');
            _middle.append(br)
        }

        console.log(_coords[4][5].getAttribute('data-x'))
        // _coords[4][5].classList.add('snake-body')

        console.log(_coords[1][3])

        // append middle block
        this.container.append(_middle);
        
        // create snake
        function snakeCreate() {
            const bodyMinSize = 3;
            const bodyArr = [[3,5], [2,5], [1,5]];

            for (let i = 0; i < bodyArr.length; i++) {
                const a = _coords[bodyArr[i][1]][bodyArr[i][0]];
                a.classList.add('snake-body');
                if (i == 0) a.classList.add('snake-head');
            }
        }

        snakeCreate();
    };

    // ==== Footer
    this.footer = function () {
        const _footer = document.createElement('div');
        _footer.classList.add(`${blockName}-footer`);

        _footer.innerText = 'Footer'

        // append footer block
        this.container.append(_footer);
    };
    
    // console.log(this.container);

    this.main = function () {
        this.header();
        this.middle();
        this.footer();
    }

    this.main()
}

let snake = new Snake('js-snake', [10, 12])
