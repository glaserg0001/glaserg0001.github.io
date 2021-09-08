class SeaBattle {
    constructor(id) {
        this.container = document.getElementById(id);
        this.css = {
            header: 'sb-header',
            header: 'sb-main',
            header: 'sb-footer',
        }

        this.data = {
            title: 'Sea Battle'
        }
    }

    createBaseLayout() {
        const header = document.createElement('div');
        header.classList.add(this.css.header);
        
        const main = document.createElement('div');
        const footer = document.createElement('div');
    }

    createField() {}

    init() {
        this.createBaseLayout()
    }
}

const seaBattle = new SeaBattle('sea-battle');
seaBattle.init()
console.log(seaBattle)
