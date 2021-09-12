class SeaBattle {
    constructor(id) {
        this.container = document.getElementById(id);
        this.css = {
            btn: 'btn',
            header: 'sb-header',
            headerTitle: 'sb-header__title',
            headerNotification: 'sb-header__notification',
            main: 'sb-main',
            footer: 'sb-footer',
        }

        this.data = {
            title: 'Sea Battle',
            notification: {
                placeShips: 'Place your ships'
            },
            btn: {
                reload: {
                    el: null,
                    text: 'Reload',
                },
                auto: 'Place ships automatically'
            }
        }
    }

    createBaseLayout() {
        // ==== header ====
        const header = document.createElement('div');
        header.classList.add(this.css.header);

        const headerTitle = document.createElement('h1');
        headerTitle.classList.add(this.css.headerTitle);
        headerTitle.innerText = this.data.title;

        const headerNotification = document.createElement('div');
        headerNotification.classList.add(this.css.headerNotification);
        headerNotification.innerText = this.data.notification.placeShips;

        header.append(
            headerTitle,
            headerNotification
        );
        
        // ==== main ====
        const main = document.createElement('div');
        main.classList.add(this.css.main);

        // ==== footer ====
        const footer = document.createElement('div');
        footer.classList.add(this.css.footer);

        this.container.append(
            header,
            main,
            footer
        )
    }

    createBtns() {
        const btnReload = document.createElement('button');
        btnReload.classList.add(this.css.btn);
        btnReload.innerText = this.data.btn.reload.text;
        this.data.btn.reload.el = btnReload;
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
