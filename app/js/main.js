// common js
// components
function componentInputField() {
    const activeClass = 'm-active';

    let inputArr = document.getElementsByClassName('js-form-input');

    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].addEventListener('focus', (event) => {
            event.target.parentElement.classList.add(activeClass)
        })
        inputArr[i].addEventListener('blur', (event) => {
            if (event.target.value) {
                event.target.parentElement.classList.add(activeClass)
            } else {
                event.target.parentElement.classList.remove(activeClass)
            }
        })

        if (inputArr[i].value) {
            !!inputArr[i].parentElement.classList.add(activeClass)
        }
    }
}

// create new form input
function createFormInput(label, value, type, classes) {
    let
        _inputField = document.createElement('div'),
        _input = document.createElement('input'),
        _label;

    _inputField.classList.add('form-input');
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

const x = document.querySelector('.main-container');
const aa = createFormInput(null, 'ss')
const bb = createFormInput('lab', 'val')

x.append(aa.wrap)
x.append(bb.wrap)


componentInputField()
