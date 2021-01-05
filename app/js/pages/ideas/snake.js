function Snake(id) {
    this.container = document.getElementById(id);

    // ==== Header
    this.header = function () {
        const _header = document.createElement('div');
        _header.classList.add('snake-header');

        _header.innerText = 'Header'

        // append header block
        this.container.append(_header);
    };

    // ==== Body
    this.body = function () {
        const _body = document.createElement('div');
        _body.classList.add('snake-body');

        _body.innerText = 'body'

        // append body block
        this.container.append(_body);
    };

    // ==== Footer
    this.footer = function () {
        const _footer = document.createElement('div');
        _footer.classList.add('snake-footer');

        _footer.innerText = 'Footer'

        // append footer block
        this.container.append(_footer);
    };
    
    console.log(this.container);

    this.main = function () {
        this.header();
        this.body();
        this.footer();
    }

    this.main()
}

let snake = new Snake('js-snake')
