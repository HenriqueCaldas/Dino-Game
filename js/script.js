const dino = document.querySelector('.dino');
let isJumping = false;
const background = document.querySelector('.background');
let position = 0;

startGame();

function startGame() {
    
    createCactus();
}

function refreshPage(){
    window.location.reload();
}

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}
function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //Caindo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else
                position = position - 20;
                dino.style.bottom = position + 'px';
            }, 20);
        } else {
            //subindo
            position = position + 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 5000;
    cactus.style.left = 1000 + 'px';
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
        if (cactusPosition === -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1> <br> <div class="botao"><button id="restart">RESTART</button></div>';
            let restart = document.querySelector('#restart');
            restart.onclick = function() {
                refreshPage();
            }
        } else {
            cactusPosition = cactusPosition - 10;
            cactus.style.left = cactusPosition + 'px';
            
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

document.addEventListener('keydown', handleKeyUp);

