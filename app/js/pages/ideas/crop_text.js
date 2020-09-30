function Func(button) {
    this.button = document.querySelector(button),
    this.textElement = this.button.closest('.js-crop-wrapper').querySelector('.js-crop-text'),
    this.text = this.textElement.innerHTML,
    this.count = 5,
    this.textArray = this.text.trim().split(' '),
    this.eclipsis = '...',
    this.textSliced = this.textArray.slice(0, this.count).join(' ') + this.eclipsis,
    this.textEclipsed = false,
    
    this._updateText = () => {
        if (this.textEclipsed) {
            this.textElement.innerHTML = this.text;
            this.textEclipsed = false;
        } else {
            this.textElement.innerHTML = this.textSliced;
            this.textEclipsed = true;
        }
    }
    
    this.main = () => {
        this._updateText();
        this.button.addEventListener('mouseup', this._updateText);
    }
}

var bt1 = new Func('.js-crop-btn--1');
var bt2 = new Func('.js-crop-btn--2');

bt1.main();
bt2.main();
