// styleguide
componentInput()
componentQuantity()

let xhr = new XMLHttpRequest()
xhr.open('GET', 'img/icons.svg')
xhr.onload = function() {
    let a = xhr.response

    console.log(a)

    let b = document.getElementsByTagName('body')[0]

    b.innerHTML = a

};
xhr.onerror = function() {
    // console.log(`Ошибка соединения`);
};
xhr.send()
xhr.onprogress = function(event) {
    // console.log(`Загружено ${event.loaded} из ${event.total}`);
};
