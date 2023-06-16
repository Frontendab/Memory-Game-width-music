let btnStart = document.querySelector('.control-buttons span');
let placeName = document.querySelector('.info-container .name span');
btnStart.onclick = () => {
    let nameUser = prompt('Write your name, Please');
    if(nameUser === '' || nameUser === null){
        placeName.textContent = 'Unknow';
    }else{
        placeName.textContent = `${nameUser}`;
    }
    document.querySelector('.control-buttons').remove();
    document.querySelector('#startMusic').play();
};
let seconde = 1000;
let memoryGameBlocks = document.querySelector('.memory-game-blocks');
let childrenMemoryGameBlocks = Array.from(memoryGameBlocks.children);
let randomRange = [...Array(childrenMemoryGameBlocks.length).keys()];
stuff(randomRange);
childrenMemoryGameBlocks.forEach((block, index) => {
    block.style.order = randomRange[index];
    block.addEventListener('click', () => {
        cliking(block);
    });
});
function cliking(block) {
    block.classList.add('is-flipped');
    let allBlockHasFlipped = childrenMemoryGameBlocks.filter(blockFlipped => blockFlipped.classList.contains('is-flipped'));
    if(allBlockHasFlipped.length === 2){
    stopClicking();
    thecheck(allBlockHasFlipped[0],allBlockHasFlipped[1]);
    }
};
function stopClicking() {
    memoryGameBlocks.classList.add('no-clicking');
    setTimeout(() => {
        memoryGameBlocks.classList.remove('no-clicking');
    },seconde);
};
function thecheck(firstBlock,secondeBlock) {
    let tries = document.querySelector('.tries span');
    if(firstBlock.dataset.technology === secondeBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondeBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondeBlock.classList.add('has-match');
        document.getElementById('success').play();
    }else{   
       tries.textContent = parseInt(tries.innerHTML) + 1;
       setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondeBlock.classList.remove('is-flipped');
        document.getElementById('fail').play();
       },seconde);
    }
};

//* last function 
function stuff(array) {
    let current = array.length,
    temp,
    random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        temp = array[random];
    }
    return array;
};


