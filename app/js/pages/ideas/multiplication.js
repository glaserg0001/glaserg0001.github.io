function multiplication () {
    const btn = document.querySelector('.js-mlp-btn');
    const result = document.querySelector('.js-mlp-result');
    
    btn.addEventListener('click', submit);
    
    function submit() {
        result.innerHTML = '';
        const inputList = document.querySelectorAll('.js-mlp-input');
        let arr = [];
        let arrVal = [];
        
        
        inputList.forEach((el) => {
            let val = el.value;
            let valArr = el.value.split('');
            
            arr.push(valArr);
            arrVal.push(val);
        });
        
        // ==== header
        const resultHtmlWrap = document.createElement('div');
        resultHtmlWrap.classList.add('mlp-result-header');
        
        for (let i = 0; i < arr.length; i++) {
            const subArr = arr[i];
            
            const resultHtmlHeadItem = document.createElement('ul');
            resultHtmlHeadItem.classList.add('mlp-result-header-item', 'mlp-result-list');
            
            for (let j = 0; j < subArr.length; j++) {
                
                const resultHtmlHeadItemNum = document.createElement('li');
                resultHtmlHeadItemNum.innerText = subArr[j];
                resultHtmlHeadItem.appendChild(resultHtmlHeadItemNum);
            }
            
            resultHtmlWrap.appendChild(resultHtmlHeadItem);
        }
        
        result.appendChild(resultHtmlWrap);
        
        // ==== middle

        for (let i = arr[1].length - 1; i >= 0; i--) {
            const element = arr[1][i];
            
            const res = element * arrVal[0];
            
            const arrAddition = res.toString().split('');
            
            
            const htmlWrap = document.createElement('ul');
            htmlWrap.classList.add('mlp-result-middle', 'mlp-result-list');
            
            result.appendChild(htmlWrap);
            
            for (let j = 0; j < arrAddition.length; j++) {
                const html = document.createElement('li');
                html.innerText = arrAddition[j];
                htmlWrap.appendChild(html);
            }
            
            for (let x = 0; x < arr[1].length - 1 - i; x++) {
                const html = document.createElement('li');
                htmlWrap.appendChild(html);
            }
        }

        // ==== footer

        const footerRes = arrVal[0] * arrVal[1];
        const footerResArr = footerRes.toString().split('');
        const footer = document.createElement('ul');
        footer.classList.add('mlp-result-footer', 'mlp-result-list');
        
        for (let i = 0; i < footerResArr.length; i++) {
            const element = footerResArr[i];
            const footerItem = document.createElement('li');
            footerItem.innerText = element;
            footer.appendChild(footerItem);
        }

        result.appendChild(footer);
    }
}

multiplication();
