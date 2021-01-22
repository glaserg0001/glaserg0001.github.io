// common js
// components
function componentInputField() {
    const activeClass = 'm-active';

    let inputArr = document.getElementsByClassName('js-input-field');

    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].addEventListener('blur', (event) => {
            if (event.target.value) {
                event.target.parentElement.classList.add(activeClass)
            } else {
                event.target.parentElement.classList.remove(activeClass)
            }
        });

        console.log(inputArr[i].value)

        if (inputArr[i].value) {
            !!inputArr[i].parentElement.classList.add(activeClass)
        }
    }
}

componentInputField()
