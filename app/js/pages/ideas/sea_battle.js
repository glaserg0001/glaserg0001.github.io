class SeaBattle {
    constructor(id) {
        this.container = document.getElementById(id);

        this.data = {
            header: {
                el: document.createElement('div'),
                css: 'sb-header'
            },
            headerTitle: {
                css: 'sb-header__title',
                text: 'Sea Battle'
            },
            main: {
                el: document.createElement('div'),
                css: 'sb-main'
            },
            footer: {
                el: document.createElement('div'),
                css: 'sb-footer'
            },
            notification: {
                el: document.createElement('div'),
                css: 'sb-header__notification',
                placeShips: 'Place your ships'
            },
            btn: {
                css: 'btn',
                reload: {
                    el: document.createElement('button'),
                    text: 'Reload',
                },
                auto: {
                    el: document.createElement('button'),
                    text: 'Place ships automatically'
                },
                start: {
                    el: document.createElement('button'),
                    text: 'start the game',
                },
                again: {
                    el: document.createElement('button'),
                    text: 'Play again',
                },
            },
            manually: {
                el: document.createElement('div'),
                css: 'sb-manually'
            },
            manuallyShips: {
                el: document.createElement('div'),
                css: 'sb-manually__ships'
            },
            info: {
                el: document.createElement('div'),
                css: 'sb-info',
                text: 'Place your ships on the battlefield. Click on a ship to turn it.'
            },
            field: {
                el: document.createElement('div'),
                css: 'sb-field',
                cssRow: 'sb-field__row',
                cssCell: 'sb-field__cell'
            },
            fieldAI: {
                el: document.createElement('div'),
                css: 'sb-field',
                cssRow: 'sb-field__row',
                cssCell: 'sb-field__cell'
            }
        }

        this.field = []
        this.fieldData = []
        this.fieldAI = []
        this.fieldAIData = []
    }

    createBaseLayout() {
        // ==== header ====
        // this.data.header.el = document.createElement('div');
        this.data.header.el.className = this.data.header.css;

        const headerTitle = document.createElement('h1');
        headerTitle.className = this.data.headerTitle.css;
        headerTitle.innerText = this.data.headerTitle.text;

        // this.data.notification.el = document.createElement('div');
        this.data.notification.el.className = this.data.notification.css;
        this.data.notification.el.innerText = this.data.notification.placeShips;

        this.data.header.el.append(
            headerTitle,
            this.data.notification.el
        );
        
        // ==== main ====
        // this.data.main.el = document.createElement('div');
        this.data.main.el.className = this.data.main.css;

        // ==== footer ====
        // this.data.footer.el = document.createElement('div');
        this.data.footer.el.className = this.data.footer.css;

        this.container.append(
            this.data.header.el,
            this.data.main.el,
            this.data.footer.el
        )
    }

    createBtns() {
        // reload
        // this.data.btn.reload.el = document.createElement('button');
        this.data.btn.reload.el.className = this.data.btn.css;
        this.data.btn.reload.el.innerText = this.data.btn.reload.text;

        // auto
        // this.data.btn.auto.el = document.createElement('button');
        this.data.btn.auto.el.className = this.data.btn.css;
        this.data.btn.auto.el.innerText = this.data.btn.auto.text;

        // start
        // this.data.btn.start.el = document.createElement('button');
        this.data.btn.start.el.className = this.data.btn.css;
        this.data.btn.start.el.innerText = this.data.btn.start.text;

        // again
        // this.data.btn.again.el = document.createElement('button');
        this.data.btn.again.el.className = this.data.btn.css;
        this.data.btn.again.el.innerText = this.data.btn.again.text;
    }

    createManuallyLayout() {
        // this.data.manually.el = document.createElement('div');
        this.data.manually.el.className = this.data.manually.css;

        const
            row = document.createElement('div'),
            colLeft = document.createElement('div'),
            colRight = document.createElement('div')

        row.className = 'row'
        colLeft.className = 'col-6'
        colRight.className = 'col-6'

        this.data.manuallyShips.el.className = this.data.manuallyShips.css;
        this.data.info.el.className = this.data.info.css;
        this.data.info.el.innerText = this.data.info.text;

        this.data.field.el.className = this.data.field.css;

        colLeft.append(
            this.data.info.el,
            this.data.manuallyShips.el
        )
        colRight.append(
            this.data.field.el
        )
        row.append(
            colLeft,
            colRight
        )
        this.data.manually.el.append(row)
        this.data.main.el.append(this.data.manually.el);
        this.createField();

    }

    createField(ai, button) {
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            const rowArr = [];
            const rowArrData = [];
            row.className = this.data.field.cssRow;

            for (let j = 0; j < 10; j++) {
                const cell = button ?
                    document.createElement('button') :
                    document.createElement('div');
                cell.className = this.data.field.cssCell;
                row.append(cell)
                rowArr.push(cell)
                rowArrData.push(null)
            }

            ai ? this.fieldAI.push(rowArr) : this.field.push(rowArr)
            ai ? this.fieldAIData.push(rowArrData) : this.fieldData.push(rowArrData)
            ai ? this.data.fieldAI.el.append(row) : this.data.field.el.append(row)
            // aa.push(row)
        }
        // return aa;
    }

    init() {
        this.createBtns()
        this.createBaseLayout()
        this.createManuallyLayout()
    }
}

const seaBattle = new SeaBattle('sea-battle');
seaBattle.init()
console.log(seaBattle)
