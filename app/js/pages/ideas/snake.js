function Snake(id, size) {
    const blockName = 'snake';

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
        _middle.classList.add(`${blockName}-body`);

        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                console.log(this.y)
                const _cell = document.createElement('i');
                _cell.classList.add(`${blockName}-body__cell`, `js-${blockName}-cell`);
                _cell.setAttribute('data-x', j + 1);
                _cell.setAttribute('data-y', i + 1);
                _middle.append(_cell);
            }
            const br = document.createElement('br');
            _middle.append(br)
        }

        // append middle block
        this.container.append(_middle);
        
        // create snake
        function snakeBody() {
            
        }
    };

    // ==== Footer
    this.footer = function () {
        const _footer = document.createElement('div');
        _footer.classList.add(`${blockName}-footer`);

        _footer.innerText = 'Footer'

        // append footer block
        this.container.append(_footer);
    };
    
    console.log(this.container);

    this.main = function () {
        this.header();
        this.middle();
        this.footer();
    }

    this.main()
}

let snake = new Snake('js-snake', [10, 12])
