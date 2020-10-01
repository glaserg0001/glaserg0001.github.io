var btn = document.querySelector('.js-btn');

btn.addEventListener('click', submit);

function submit() {
    var inputList = document.querySelectorAll('.js-input');

    inputList.forEach((el) => {
        console.log(parseInt(el.value))
    })

    console.log(inputList)
}
