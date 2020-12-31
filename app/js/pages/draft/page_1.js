let target = document.getElementById('some-id') || false;
let testing = document.getElementById('aaaaa') || false;

// console.log(target)
// console.log(testing)

// console.log( parseInt(target.style.left) )

// Конфигурация observer (за какими изменениями наблюдать)
const config = {
    attributes: true,
    childList: true,
    subtree: true
}; 

// Функция обратного вызова при срабатывании мутации
const callback = function(mutationsList, observer) {
    // console.log(mutationsList)
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Создаем экземпляр наблюдателя с указанной функцией обратного вызова
const observer = new MutationObserver(callback);

// Начинаем наблюдение за настроенными изменениями целевого элемента
observer.observe(target, config);

let btn = document.querySelector('.js-btn');
let btnAttr = document.querySelector('.js-btn-1');

let count = 1;
let countAttr = 1;

btn.addEventListener('click', () => {
    const div = document.createElement('div');
    div.classList.add('test');
    div.innerHTML = `Content ${count}`;
    target.appendChild(div);
    count++;
});

btnAttr.addEventListener('click', () => {
    const div = document.querySelector('.test');
    div.classList.add(`test-${countAttr}`);
    countAttr++;

    btn.click()
});

// ======================================== Замыкания START ====
// https://youtu.be/pahO5XjnfLA

function urlGenerator(domain) {
    return function (url) {
        return `https://${url}.${domain}`
    }
}

const comUrl = urlGenerator('com');

// console.log(comUrl('google'))

// ----

function bind(context, fn) {
    return function (...args) {
        fn.apply(context, ...args)
    }
}

function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const person1 = {name: 'Михаил', age: 22, job: 'Frontend'}
const person2 = {name: 'Елена', age: 19, job: 'SMM'}

// bind(person1, logPerson)()
// bind(person2, logPerson)()

// ======================================== Замыкания END ====

// ======================================== Event Loop START ====
window.setTimeout(function () {
    console.log('Time')
}, 2000)
// ======================================== Event Loop END ====

