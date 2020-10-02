let btn = document.querySelector('.js-btn');
let result = document.querySelector('.js-result');

btn.addEventListener('click', submit);

function submit() {
    let inputList = document.querySelectorAll('.js-input');

    let arr = [];

    let resultHtmlWrap = document.createElement('div');
    resultHtmlWrap.classList.add('result-wrap');

    inputList.forEach((el) => {
        let val = el.value;
        let valArr = el.value.split('');

        arr.push(valArr);

        // console.log(val)
    });
    
    for (let i = 0; i < arr.length; i++) {
        const subArr = arr[i];

        let resultHtmlHeadItem = document.createElement('ul');
        resultHtmlHeadItem.classList.add('result-head-item');

        // console.log( subArr.split('') );
        
        if ( subArr.length ) {
            for (let j = 0; j < subArr.length; j++) {
                let resultHtmlHeadItemNum = document.createElement('li');
                resultHtmlHeadItemNum.innerText = subArr[j];
                resultHtmlHeadItem.appendChild(resultHtmlHeadItemNum);
            }

            resultHtmlWrap.appendChild(resultHtmlHeadItem);
        }
    }

    result.appendChild(resultHtmlWrap);

    console.log(arr)
}
