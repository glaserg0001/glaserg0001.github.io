// common js
// ================================ COMPONENTS START

// const x = document.querySelector('.main-container');

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
            min = input.getAttribute('min'),
            max = input.getAttribute('max'),
            valBase = input.value

        if (valBase >= max) plusBtn.disabled = true
        if (valBase <= min) minusBtn.disabled = true
        if (valBase == max && valBase == min) input.disabled = true

        minusBtn.addEventListener('click', () => {
            if (input.disabled || input.value <= min) return false
            const val = --input.value
            if (val == min) minusBtn.disabled = true
            else if (val < max ) plusBtn.disabled = false
        })

        plusBtn.addEventListener('click', () => {
            if (input.disabled || input.value >= max) return false
            const val = ++input.value
            if (val == max) plusBtn.disabled = true
            else if (val > min ) minusBtn.disabled = false
        })
    }
}
// ================================ COMPONENTS END
