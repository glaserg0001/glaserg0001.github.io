class SeaBattle {
    constructor(id) {
        this.container = document.getElementById(id);

        this.data = {
            // header: {
            //     el: document.createElement('div'),
            //     css: 'sb-header'
            // },
            // headerTitle: {
            //     css: 'sb-header__title',
            //     text: 'Sea Battle'
            // },
            // main: {
            //     el: document.createElement('div'),
            //     css: 'sb-main'
            // },
            // footer: {
            //     el: document.createElement('div'),
            //     css: 'sb-footer'
            // },
            // notification: {
            //     el: document.createElement('div'),
            //     css: 'sb-header__notification',
            //     placeShips: 'Place your ships'
            // },
            // btn: {
            //     css: 'btn',
            //     reload: {
            //         el: document.createElement('button'),
            //         text: 'Reload',
            //     },
            //     auto: {
            //         el: document.createElement('button'),
            //         text: 'Place ships automatically'
            //     },
            //     start: {
            //         el: document.createElement('button'),
            //         text: 'start the game',
            //     },
            //     again: {
            //         el: document.createElement('button'),
            //         text: 'Play again',
            //     },
            // },
            // manually: {
            //     el: document.createElement('div'),
            //     css: 'sb-manually'
            // },
            // manuallyShips: {
            //     el: document.createElement('div'),
            //     css: 'sb-manually__ships'
            // },
            // info: {
            //     el: document.createElement('div'),
            //     css: 'sb-info',
            //     text: 'Place your ships on the battlefield. Click on a ship to turn it.'
            // },
            // field: {
            //     el: document.createElement('div'),
            //     css: 'sb-field',
            //     cssRow: 'sb-field__row',
            //     cssCell: 'sb-field__cell'
            // },
            // fieldAI: {
            //     el: document.createElement('div'),
            //     css: 'sb-field',
            //     cssRow: 'sb-field__row',
            //     cssCell: 'sb-field__cell'
            // }
        }

        this.resource = {
            title: 'Sea Battle',
            notification: {
                placeShips: 'Place your ships'
            },
            btn: {
                reload: 'Reload',
                auto: 'Place ships automatically',
                start: 'start the game',
                again: 'Play again'
            },
            info: 'Place your ships on the battlefield. Click on a ship to turn it.',
        }

        this.element = new Object()

        this.field
        this.fieldData
        this.fieldAI
        this.fieldAIData
    }

    createBaseLayout() {
        // ==== header ====
        const header = document.createElement('div')
        header.className = 'sb-header'
        this.element.header = header

        const title = document.createElement('h1')
        title.className = 'sb-title'
        title.innerText = this.resource.title

        const notification = document.createElement('div')
        notification.className = 'sb-notification'
        this.element.notification = notification

        header.append(
            title,
            notification
        );
        
        // ==== main ====
        const main = document.createElement('div')
        main.className = 'sb-main'
        this.element.main = main

        // ==== footer ====
        const footer = document.createElement('div')
        footer.className = 'sb-footer'
        this.element.footer = footer

        this.container.append(
            header,
            main,
            footer
        )
    }

    createBtns() {
        const
            commonCss = 'sb-btn',
            reload = document.createElement('button'),
            auto = document.createElement('button'),
            start = document.createElement('button'),
            again = document.createElement('button')

        reload.className = commonCss
        reload.innerText = this.resource.btn.reload

        auto.className = commonCss
        auto.innerText = this.resource.btn.auto

        start.className = commonCss
        start.innerText = this.resource.btn.start

        again.className = commonCss
        again.innerText = this.resource.btn.again

        return {
            reload: reload,
            auto: auto,
            start: start,
            again: again
        }
    }

    createShip(size) {
        const ship = document.createElement('div')
        ship.className = `sb-ship sb-ship--${size}`

        return ship
    }

    createPort() {
        const port = document.createElement('div')
        port.className = 'sb-port'

        const portItem1 = document.createElement('div')
        const portItem2 = document.createElement('div')
        const portItem3 = document.createElement('div')
        const portItem4 = document.createElement('div')

        portItem1.className = 'sb-port__item'
        portItem2.className = 'sb-port__item'
        portItem3.className = 'sb-port__item'
        portItem4.className = 'sb-port__item'

        this.element.ships = new Object()
        this.element.ships.ship4   = this.createShip(4)
        this.element.ships.ship3_1 = this.createShip(3)
        this.element.ships.ship3_2 = this.createShip(3)
        this.element.ships.ship2_1 = this.createShip(2)
        this.element.ships.ship2_2 = this.createShip(2)
        this.element.ships.ship2_3 = this.createShip(2)
        this.element.ships.ship1_1 = this.createShip(1)
        this.element.ships.ship1_2 = this.createShip(1)
        this.element.ships.ship1_3 = this.createShip(1)
        this.element.ships.ship1_4 = this.createShip(1)

        portItem1.append(
            this.element.ships.ship4
        )
        portItem2.append(
            this.element.ships.ship3_1,
            this.element.ships.ship3_2
        )
        portItem3.append(
            this.element.ships.ship2_1,
            this.element.ships.ship2_2,
            this.element.ships.ship2_3
        )
        portItem4.append(
            this.element.ships.ship1_1,
            this.element.ships.ship1_2,
            this.element.ships.ship1_3,
            this.element.ships.ship1_4
        )

        port.append(
            portItem1,
            portItem2,
            portItem3,
            portItem4
        )

        return port
    }

    createManuallyStep() {
        this.createPort()
        const
            row = document.createElement('div'),
            colLeft = document.createElement('div'),
            colRight = document.createElement('div'),
            info = document.createElement('div')

        // base
        row.className = 'row'
        colLeft.className = 'col-6'
        colRight.className = 'col-6'

        // header
        this.element.notification.innerText = this.resource.notification.placeShips
        // main
        info.className = 'sb-info'
        info.innerText = this.resource.info
        //footer
        this.element.footer.append(
            this.element.btn.reload,
            this.element.btn.auto,
            this.element.btn.start
        )

        console.log(this.createPort())

        colLeft.append(
            info,
            this.createPort()
        )
        colRight.append(
            this.field.html
        )
        row.append(
            colLeft,
            colRight
        )
        this.element.main.append(
            row
        )
    }

    createFieldData(row, column) {
        const arr = []
        for (let i = 0; i < row; i++) {
            const arrRow = []
            for (let j = 0; j < column; j++) {
                arrRow.push(null)
            }
            arr.push(arrRow)
        }
        return arr
    }

    createField(arr) {
        const
            arrElements = [],
            field = document.createElement('div')

        field.className = 'sb-field'

        arr.forEach(y => {
            const
                arrRow = [],
                row = document.createElement('div')

            row.className = 'sb-field__row'

            y.forEach(x => {
                const el = document.createElement('div')
                el.className = 'sb-field__cell'
                arrRow.push(el)
                row.append(el)
                
            })

            arrElements.push(arrRow)
            field.append(row)
        })

        return {
            coords: arrElements,
            html: field
        }
    }

    init() {
        this.fieldData = this.createFieldData(10, 10)
        this.fieldAIData = this.createFieldData(10, 10)
        this.field = this.createField(this.fieldData)
        this.fieldAI = this.createField(this.fieldAIData)
        this.element.btn = this.createBtns()
        this.createBaseLayout()
        this.createManuallyStep()
    }
}

const seaBattle = new SeaBattle('sea-battle');
seaBattle.init()
console.log(seaBattle)
console.log(seaBattle.element.ships)
