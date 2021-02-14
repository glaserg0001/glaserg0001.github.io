const x = document.querySelector('.main-container');
// Helpers START
function ResourceMsg() {
    // Example:
    // ResourceMsg('Text of {0}', 'Message'); Text of Message  
    if (arguments.length == 1) {
        return arguments[0]
    }

    let args = Array.prototype.slice.call(arguments);
    let value = arguments[0];
    return value.replace(/{(\d)}/g, function (match, p) {
        let position = Number(p);
        if (args[position + 1]) {
            return args[position + 1];
        // if no arguments found, return the original placeholder
        }
        return match;
    })
}
// Create Svg Icon
function iconSvgCreate(container, name, file = 'img/icons.svg') {
    // Example: iconSvgCreate('.wrap', 'icon-test')
    // container: null, string, element (createElelment)
    const svg = `<svg class="icon"><use xlink:href="${file}#${name}"></use></svg>`

    if (typeof container == 'string')
        container = document.querySelector(container)

    if (container)
        container.innerHTML = svg
    else
        return svg
}
// Helpers END
// ================================ COMPONENTS START
// form
// ======== Input START
function componentInput() {
    const activeClass = 'm-active';

    let inputArr = document.getElementsByClassName('js-form-input');

    for (let i = 0; i < inputArr.length; i++) {
        const input = inputArr[i]
        input.addEventListener('focus', (event) => {
            event.target.parentElement.classList.add(activeClass)
        })
        input.addEventListener('blur', (event) => {
            if (event.target.value)
                event.target.parentElement.classList.add(activeClass)
            else
                event.target.parentElement.classList.remove(activeClass)
        })
        if (input.value) {
            !!input.parentElement.classList.add(activeClass)
        }
    }
}

// create new form input
function componentInputCreate(label, value, type, htmlClass) {
    // Example:
    // componentInputCreate(null, 'Value', 'text', [null, 'class1', 'class2']);
    // componentInputCreate('Label Text', 'Input Value');

    let
        _inputField = document.createElement('div'),
        _input = document.createElement('input'),
        _label;

    _inputField.classList.add('form-input');

    if (typeof htmlClass == 'string') {
        _inputField.classList.add(htmlClass)
    } else if (Array.isArray(htmlClass)) {
        for (let i = 0; i < htmlClass.length; i++) {
            if (htmlClass[i] == null)
                _inputField.className = ''
            else
                _inputField.classList.add(htmlClass[i])
        }
    }
    _input.setAttribute('type', type ? type : 'text');
    _inputField.append(_input);

    if (label) {
        _inputField.classList.add('m-label')
        _input.classList.add('js-form-input');
        _label = document.createElement('label');
        _label.innerText = label;
        _inputField.append(_label);
    }

    if (value) _input.setAttribute('value', value)

    return {
        input: _input,
        label: _label,
        wrap: _inputField
    }
}

// ======== Input END
function componentQuantity() {
    const inputArr = document.getElementsByClassName('js-form-qty-input')
    
    for (let i = 0; i < inputArr.length; i++) {
        const
            input = inputArr[i],
            minusBtn = input.previousElementSibling,
            plusBtn = input.nextElementSibling,
            min = parseInt(input.getAttribute('min')),
            max = parseInt(input.getAttribute('max')),
            valBase = parseInt(input.value),
            step = input.getAttribute('step') ? parseInt(input.getAttribute('step')) : 1

        if (valBase >= max && !isNaN(max)) plusBtn.disabled = true
        if (valBase <= min && !isNaN(min)) minusBtn.disabled = true
        if (valBase == max && valBase == min) input.disabled = true

        minusBtn.addEventListener('click', () => {
            if (input.disabled || input.value <= min) return false
            let val = parseInt(input.value) - step
            input.value = val < min ? min : val
            if (val <= min) minusBtn.disabled = true
            if (val < max ) plusBtn.disabled = false
        })

        plusBtn.addEventListener('click', () => {
            if (input.disabled || input.value >= max) return false
            let val = parseInt(input.value) + step
            input.value = val > max ? max : val
            if (val >= max) plusBtn.disabled = true
            if (val > min ) minusBtn.disabled = false
        })
    }
}

function componentQuantityCreate(value = 1, range = [], label, htmlClass) {
    // range = [min, max, step]
    // htmlClass = [null, 'class1', 'class2']; null - remove previous classes
    // example:
    // componentQuantityCreate(5, [1, 9, 2], 'Qty', [null, 'class1', 'class2'])
    console.log(range)
    const
        wrapper = document.createElement('div'),
        input = document.createElement('input'),
        btnMinus = document.createElement('button'),
        btnPlus = document.createElement('button'),
        blockName = 'form-qty', // `${blockName}`
        min = range[0],
        max = range[1],
        step = range[2]

        console.log(step)

    let _label;

    wrapper.classList.add(blockName)
    if (typeof htmlClass == 'string') {
        wrapper.classList.add(htmlClass)
    } else if (Array.isArray(htmlClass)) {
        for (let i = 0; i < htmlClass.length; i++) {
            if (htmlClass[i] == null)
                wrapper.className = ''
            else
                wrapper.classList.add(htmlClass[i])
        }
    }
    // input
    input.setAttribute('type', 'number')
    if (min) input.setAttribute('min', min)
    if (max) input.setAttribute('max', max)
    if (step) input.setAttribute('step', step)
    input.setAttribute('tabindex', -1)
    input.value = value
    input.classList.add(`${blockName}__input` ,'js-form-qty-input')
    // button Minus
    btnMinus.setAttribute('type', 'button')
    btnMinus.classList.add(`${blockName}__btn` ,'m-minus')
    // button Plus
    btnPlus.setAttribute('type', 'button')
    btnPlus.classList.add(`${blockName}__btn` ,'m-plus')

    if (label) {
        _label = document.createElement('label')
        _label.innerText = label
        _label.classList.add(`${blockName}__label`)
        wrapper.prepend(_label)
    }

    wrapper.append(
        btnMinus,
        input,
        btnPlus
    )

    return {
        wrap: wrapper,
        input: input,
        btnMinus: btnMinus,
        btnPlus: btnPlus,
        label: _label
    }
}
// ================================ COMPONENTS END
