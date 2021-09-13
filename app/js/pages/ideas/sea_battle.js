class SeaBattle {
    constructor(id) {
        this.container = document.getElementById(id);

        this.data = {
            header: {
                el: null,
                css: 'sb-header'
            },
            headerTitle: {
                css: 'sb-header__title',
                text: 'Sea Battle'
            },
            main: {
                el: null,
                css: 'sb-main'
            },
            footer: {
                el: null,
                css: 'sb-footer'
            },
            notification: {
                el: null,
                css: 'sb-header__notification',
                placeShips: 'Place your ships'
            },
            btn: {
                css: 'btn',
                reload: {
                    el: null,
                    text: 'Reload',
                },
                auto: {
                    el: null,
                    text: 'Place ships automatically'
                },
                start: {
                    el: null,
                    text: 'start the game',
                },
                again: {
                    el: null,
                    text: 'Play again',
                },
            },
            manually: {
                el: null,
                css: 'sb-manually'
            }
        }
    }

    createBaseLayout() {
        // ==== header ====
        this.data.header.el = document.createElement('div');
        this.data.header.el.classList.add(this.data.header.css);

        const headerTitle = document.createElement('h1');
        headerTitle.classList.add(this.data.headerTitle.css);
        headerTitle.innerText = this.data.headerTitle.text;

        this.data.notification.el = document.createElement('div');
        this.data.notification.el.classList.add(this.data.notification.css);
        this.data.notification.el.innerText = this.data.notification.placeShips;

        this.data.header.el.append(
            headerTitle,
            this.data.notification.el
        );
        
        // ==== main ====
        this.data.main.el = document.createElement('div');
        this.data.main.el.classList.add(this.data.main.css);

        // ==== footer ====
        this.data.footer.el = document.createElement('div');
        this.data.footer.el.classList.add(this.data.footer.css);

        this.container.append(
            this.data.header.el,
            this.data.main.el,
            this.data.footer.el
        )
    }

    createBtns() {
        // reload
        this.data.btn.reload.el = document.createElement('button');
        this.data.btn.reload.el.classList.add(this.data.btn.css);
        this.data.btn.reload.el.innerText = this.data.btn.reload.text;

        // auto
        this.data.btn.auto.el = document.createElement('button');
        this.data.btn.auto.el.classList.add(this.data.btn.css);
        this.data.btn.auto.el.innerText = this.data.btn.auto.text;

        // start
        this.data.btn.start.el = document.createElement('button');
        this.data.btn.start.el.classList.add(this.data.btn.css);
        this.data.btn.start.el.innerText = this.data.btn.start.text;

        // again
        this.data.btn.again.el = document.createElement('button');
        this.data.btn.again.el.classList.add(this.data.btn.css);
        this.data.btn.again.el.innerText = this.data.btn.again.text;
    }

    createManuallyLayout() {

    }

    createField() {}

    init() {
        this.createBtns()
        this.createBaseLayout()
    }
}

const seaBattle = new SeaBattle('sea-battle');
seaBattle.init()
console.log(seaBattle)
