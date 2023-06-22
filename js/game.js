const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')
 
const characters = [
    'bulbasaur',
    'chansey',
    'charmander',
    'chespin',
    'eevee',
    'fennekin',
    'froakie',
    'pikachu',
    'squirtle',
    'wobbuffet',
];

let firstCard = '';
let secondCard = '';

const createCard = (character) => {
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    front.style.backgroundImage = `url('../images/${character}.png')`

    card.className = 'card';
    front.className = 'face front';
    back.className = 'face back';

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card;
}

const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    
    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = '';
        secondCard = '';

        checkEndGame();
    }else{
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        },500);
    }
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')
    console.log(disabledCards.length);

    if(disabledCards.length === 20){
        clearInterval(this.loop)
        alert(`Parabéns ${spanPlayer}, seu tempo foi: ${timer.innerHTML}`) ;
    }
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledArray .forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

}

const startTime = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    
    startTime();
    loadGame();
}