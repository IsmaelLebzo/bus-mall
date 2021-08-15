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

function Storeitem(storeItem) {
    this.itemName = storeItem.split('.')[0];
    this.sItem = `img/${storeItem}`;
    this.vote = 0;
    this.view = 0;
    product.push(this);
}

for (let i = 0; i < storeItems.length; i++) {
    new Storeitem(storeItems[i]);
}

function randomImg() {
    return Math.floor(Math.random() * product.length);
}
let leftIndex;
let centerIndex;
let rightIndex;
function renderImg() {
    leftIndex = randomImg();
    centerIndex = randomImg();
    rightIndex = randomImg();
    while (leftIndex === rightIndex || leftIndex == centerIndex) {
        leftIndex = randomImg();
    }
    while (rightIndex === centerIndex) {
        rightIndex = randomImg();
    }
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
        resultButton.remove();
    }
}