'use strict';
let attemptEl = document.getElementById("attemps");
let imgCounter = document.getElementById("imageCounter");
let leftImg = document.getElementById("leftImg");
let centerImg = document.getElementById("centerImg");
let rightImg = document.getElementById("rightImg");
let result = document.getElementById("results");
let chance = document.getElementById("chance")
let buttonContainer = document.getElementById('buttonContainer')
let storeItems = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg',
    'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
    'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let resultButton;
let maxAttempt = 25;
let attempt = 1;
let product = [];
let itemNames = [];
let vote = [];
let view = [];

function Storeitem(storeItem) {
    this.itemName = storeItem.split('.')[0];
    this.sItem = `img/${storeItem}`;
    this.vote = 0;
    this.view = 0;
    product.push(this);
    itemNames.push(this.itemName);
}

for (let i = 0; i < storeItems.length; i++) {
    new Storeitem(storeItems[i]);
}

function sToLocalStorage(){
    let data = JSON.stringify(product);
    localStorage.setItem('Items' , data);
}
function rFromLocalStorage(){
    let stringObj = localStorage.getItem('Items');
    let normalObj = JSON.parse(stringObj);

    if(normalObj){
        product = normalObj;
    }
}
rFromLocalStorage();
function randomImg() {
    return Math.floor(Math.random() * product.length);
}
let leftIndex;
let centerIndex;
let rightIndex;
let lastImg = [];
function renderImg() {
    leftIndex = randomImg();
    centerIndex = randomImg();
    rightIndex = randomImg();
    while (leftIndex === rightIndex || rightIndex === centerIndex || centerIndex === leftIndex || lastImg.includes(leftIndex) || lastImg.includes(centerIndex) || lastImg.includes(rightIndex)) {
        leftIndex = randomImg();
        centerIndex = randomImg();
        rightIndex = randomImg();
    }
    lastImg[0] = leftIndex;
    lastImg[1] = centerIndex;
    lastImg[2] = rightIndex;

    leftImg.setAttribute('src', product[leftIndex].sItem);
    centerImg.setAttribute('src', product[centerIndex].sItem);
    rightImg.setAttribute('src', product[rightIndex].sItem);
    product[leftIndex].view++;
    product[centerIndex].view++;
    product[rightIndex].view++;
}
    renderImg();

    leftImg.addEventListener('click', clickHandler);
    centerImg.addEventListener('click', clickHandler);
    rightImg.addEventListener('click', clickHandler);

    function clickHandler(event) {
        if (attempt < maxAttempt) {
            let clickedImg = event.target.id;
            if (clickedImg === 'leftImg') {
                product[leftIndex].vote++;
            }
            else if (clickedImg === 'centerImg') {
                product[centerIndex].vote++;
            }
            else if (clickedImg === 'rightImg') {
                product[rightIndex].vote++
            }
            chance.textContent = `Chance ${attempt + 1}`
            renderImg();
            attempt++;
            sToLocalStorage();
        }
        else {
            resultButton = document.createElement('button');
            resultButton.textContent = 'View Result';
            resultButton.addEventListener('click', renderResualt);
            buttonContainer.appendChild(resultButton);
            leftImg.removeEventListener('click', clickHandler);
            centerImg.removeEventListener('click', clickHandler);
            rightImg.removeEventListener('click', clickHandler);
        }
    }

    function renderResualt() {
        for (let i = 0; i < product.length; i++) {
            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${product[i].itemName} has ${product[i].vote} votes, and appeared ${product[i].view} times.`;
            vote.push(product[i].vote);
            view.push(product[i].view);
            resultButton.remove();
        }
        chartRender();
    }
    function chartRender() {
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: itemNames,
                datasets: [{
                    label: '# of Votes',
                    data: vote,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of Views',
                    data: view,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

