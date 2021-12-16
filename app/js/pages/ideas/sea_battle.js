class SeaBattle {
    constructor(id, size) {
        this.container = document.getElementById(id);
        this.fieldCols = size[0] || size
        this.fieldRows = size[1] || this.fieldCols

        this.resource = {
            title: 'Sea Battle',
            notification: {
                placeShips: 'Place your ships'
            },
            btn: {
                reload: 'Reload',
                auto: 'Place ships automatically',
                start: 'Start the game',
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
        const
            shipContainer = document.createElement('div'), 
            ship = document.createElement('div')
        ship.className = `sb-ship sb-ship--${size}`
        shipContainer.className = `sb-ship__container sb-ship__container--${size}`
        ship._vertical = false
        shipContainer.append(ship)

        return {
            container: shipContainer,
            el: ship
        }
    }

    createPort() {
        const port = document.createElement('div')
        port.className = 'sb-port'

        const portItem1 = document.createElement('div')
        const portItem2 = document.createElement('div')
        const portItem3 = document.createElement('div')
        const portItem4 = document.createElement('div')

        portItem1.className = 'sb-port__line'
        portItem2.className = 'sb-port__line'
        portItem3.className = 'sb-port__line'
        portItem4.className = 'sb-port__line'

        this.element.ships = new Object()

        const shipArr = {}

        shipArr.ship4   = this.createShip(4)
        shipArr.ship3_1 = this.createShip(3)
        shipArr.ship3_2 = this.createShip(3)
        shipArr.ship2_1 = this.createShip(2)
        shipArr.ship2_2 = this.createShip(2)
        shipArr.ship2_3 = this.createShip(2)
        shipArr.ship1_1 = this.createShip(1)
        shipArr.ship1_2 = this.createShip(1)
        shipArr.ship1_3 = this.createShip(1)
        shipArr.ship1_4 = this.createShip(1)

        this.element.ships.ship4   = shipArr.ship4.el
        this.element.ships.ship3_1 = shipArr.ship3_1.el
        this.element.ships.ship3_2 = shipArr.ship3_2.el
        this.element.ships.ship2_1 = shipArr.ship2_1.el
        this.element.ships.ship2_2 = shipArr.ship2_2.el
        this.element.ships.ship2_3 = shipArr.ship2_3.el
        this.element.ships.ship1_1 = shipArr.ship1_1.el
        this.element.ships.ship1_2 = shipArr.ship1_2.el
        this.element.ships.ship1_3 = shipArr.ship1_3.el
        this.element.ships.ship1_4 = shipArr.ship1_4.el

        portItem1.append(
            shipArr.ship4.container
        )
        portItem2.append(
            shipArr.ship3_1.container,
            shipArr.ship3_2.container
        )
        portItem3.append(
            shipArr.ship2_1.container,
            shipArr.ship2_2.container,
            shipArr.ship2_3.container
        )
        portItem4.append(
           shipArr.ship1_1.container,
           shipArr.ship1_2.container,
           shipArr.ship1_3.container,
           shipArr.ship1_4.container
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
        const
            row = document.createElement('div'),
            colLeft = document.createElement('div'),
            colRight = document.createElement('div'),
            info = document.createElement('div')

        // base
        row.className = 'row justify-content-center'
        colLeft.className = 'col-auto'
        colRight.className = 'col-auto'

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

        this.mouseEventsInit()
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

        arr.forEach((y, yi) => {
            const
                arrRow = [],
                row = document.createElement('div')

            row.className = 'sb-field__row'

            y.forEach((x,xi) => {
                const el = document.createElement('div')
                el.className = 'sb-field__cell'
                el._column = xi
                el._row = yi
                arrRow.push(el)
                row.append(el)
                // temporary
                // el.innerText = xi
                
            })

            arrElements.push(arrRow)
            field.append(row)
        })

        return {
            coords: arrElements,
            html: field
        }
    }

    mouseEvents($ship) {
        const
            field = this.field.html,
            cellsArr = this.field.coords,
            shipWidth = $ship.offsetWidth,
            shipHeight = $ship.offsetHeight,
            cellSize = shipHeight,
            shipDeck = shipWidth / shipHeight;

        $ship.ondragstart = function() {return false};

        // $ship.onclick = function (event) {
        //     console.log('click')
        // }

        // document.addEventListener('click', function (e) {
        //     // console.log(this._vertical)
        //     e.stopPropagation()
        //     // e.stopImmediatePropagation()
        //     console.log(e.target)
        //     // this._vertical = !this._vertical

        //     // this.classList.toggle('m-vertical', this._vertical)
        // })

        
        $ship.onmousedown = function (event) {
            const eventOffsetX = event.offsetX;
            const eventOffsetY = event.offsetY;
            const shipDeckCurrent = Math.floor(eventOffsetX / cellSize);
            
            function getTargetCell(below) {
                const targetCell = Number(below._column) - shipDeckCurrent
                const targetRow = Number(below._row)
                const afterLastCell = targetCell + shipDeck
                if (!isNaN(targetCell) && !isNaN(targetRow) && afterLastCell < 11) {
                    return cellsArr[targetRow][targetCell]
                }
            }

            function moveAt(pageX, pageY) {
                if (pageX) {
                    // ship.style.left = pageX - shiftX + 'px';
                    // ship.style.top = pageY - shiftY + 'px';
                    $ship.style.left = Math.floor(pageX) - basePageX + 'px';
                    $ship.style.top = pageY - basePageY + 'px';
                } else {
                    $ship.style.left = 0;
                    $ship.style.top = 0;
                }
            }

            // const {
            //     top: shipTop,
            //     left: shipLeft,
            //     right: shipRight,
            //     bottom: shipBottom
            // } = $ship.getBoundingClientRect();
        
            let basePageX = event.pageX;
            let basePageY = event.pageY;

        
            // const shiftX = event.clientX - shipLeft;
            // const shiftY = event.clientY - shipTop;
        
            const {
                top: fieldTop,
                left: fieldLeft,
                right: fieldRight,
                bottom: fieldBottom
            } = field.getBoundingClientRect();
        
            
        
            function onMouseMove(event) {
                console.log('mouseMove')
                $ship._dragStarted = true
                
                // dragStarted
                // moveAt(event.pageX, event.pageY);
        
                const {
                        top: targetTop,
                        left: targetLeft,
                        right: targetRight,
                        bottom: targetBottom
                    } = $ship.getBoundingClientRect();
                
                    
                // on cell
                $ship.hidden = true
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                // let elemBelow = document.elementsFromPoint(event.clientX, event.clientY)[1];
                event.target.elBelow = elemBelow
                $ship.hidden = false

                // ==== check if inside the field
                if (
                    targetTop >= fieldTop - 10 &&
                    targetLeft >= fieldLeft - 10 &&
                    targetRight <= fieldRight + 10 &&
                    targetBottom <= fieldBottom + 10
                ) {
                    $ship.style.color = 'blue'
                    $ship._insideField = true

                    
                    const firstDeck = getTargetCell(elemBelow)

                    if (firstDeck) {
                        const {top, left} = firstDeck.getBoundingClientRect()
                        moveAt(left + eventOffsetX, top + eventOffsetY + window.pageYOffset)
                    } else {
                        moveAt(event.pageX, event.pageY);
                    }
                    

                    
                } else {
                    event.target.style.color = ''
                    event.target._insideField = false
                    moveAt(event.pageX, event.pageY);
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            window.onmouseup = function () {
                console.log('mouseUp')
                $ship._dragStarted = false
                document.removeEventListener('mousemove', onMouseMove);
                window.onmouseup = null;

                const _elBelow = event.target.elBelow;
            
                moveAt(null)

                if (event.target._insideField) {
                    getTargetCell(_elBelow).append($ship);
                    // const targetCell = Number(_elBelow.dataset.x) - shipDeckCurrent
                    // const targetRow = Number(_elBelow.dataset.y)
                    // cellsArr[targetRow][targetCell].append($ship);
                }
            }
        }
    }

    mouseEventsInit() {
        for (let key in this.element.ships) {
            this.mouseEvents(this.element.ships[key])
        }
    }

    init() {
        this.fieldData = this.createFieldData(this.fieldRows, this.fieldCols)
        this.fieldAIData = this.createFieldData(this.fieldRows, this.fieldCols)
        this.field = this.createField(this.fieldData)
        this.fieldAI = this.createField(this.fieldAIData)
        this.element.btn = this.createBtns()
        this.createBaseLayout()
        this.createManuallyStep()
    }
}

const seaBattle = new SeaBattle('sea-battle', 10);
seaBattle.init()
console.log(seaBattle)
console.log(seaBattle.element.ships)
// console.log(seaBattle.field.coords[0][0].offsetWidth)
// console.log(seaBattle.element.ships)

// https://learn.javascript.ru/mouse-drag-and-drop
