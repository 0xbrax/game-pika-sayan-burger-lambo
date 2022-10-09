const gameContainer = document.getElementById('game');
let isGamePlaying = false;
const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const pikaAudioBtn = document.getElementById('pika-audio-btn');
const bgMusicBtn = document.getElementById('bg-music-btn');

let pikachuContainer = document.getElementById('pikachu-container');
let pikachu = document.getElementById('pikachu');
let cloudText = document.getElementById('cloud-text');
let isPikachuSuperSayan = false;
let superCar = document.getElementById('car');
let wheelLeft = document.getElementById('wheel-car-left');
let wheelRight = document.getElementById('wheel-car-right');
let carNos = document.getElementById('fire');
let isSuperCarActive = false;
const backMusic = new Audio('assets/audio/Vanze - Survive (feat. Neon Dreams) [NCS Release].mp3');
let isBGMusicPlaying = false;
const pikaSound = new Audio('assets/audio/pikachu-pika-sfx.mp3');
const killSound = new Audio('assets/audio/mixkit-retro-game-over-1947-edit.mp3');
const bonusSound = new Audio('assets/audio/mixkit-fairy-arcade-sparkle-866-edit.mp3');
const carStart = new Audio('assets/audio/ferrari-laferrari-v12-sound-edit.mp3');
const carStop = new Audio('assets/audio/car-horn-edit.mp3');



const mcdonalds = document.getElementById('mcdonalds');
const burger = document.getElementById('burger');
let grillTime = 1.8;
let star = document.getElementById('star');
let liveBonus = undefined;
let randomBonus = 5000;

let score = document.getElementById('score');
let scoreCounter = 0;
let liveScore = undefined;
let record = document.getElementById('record');
let recordCounter = 0;
let liveRecord = [];

playBtn.addEventListener('click', playGame);
resetBtn.addEventListener('click', resetGame);
pikaAudioBtn.addEventListener('click', setSfxVolume);
bgMusicBtn.addEventListener('click', setBackMusic);

backMusic.addEventListener('ended', function() {
    backMusic.play();
});

mcdonalds.addEventListener('animationend', function() {
    mcdonalds.classList.remove('takeaway');
});
burger.addEventListener('animationend', function() {
    burger.classList.remove('diet');
    
    void burger.offsetWidth;

    mcdonalds.classList.add('takeaway');
    burger.classList.add('diet');
    grillTime = randomNumberDec(1.1, 1.9);
    burger.style.animationDuration = grillTime + 's';
});
star.addEventListener('animationend', function() {
    star.style.display = 'none';
    star.classList.remove('to-the-moon');

    clearInterval(liveBonus);
    liveBonus = undefined;
    randomBonus = randomNumber(4, 9) * 1000;
});
pikachuContainer.addEventListener('animationend', function() {
    pikachuContainer.classList.remove('jump');
    cloudText.style.display = 'none';
    pikaSound.pause();
    pikaSound.currentTime = 0;
});
killSound.addEventListener('ended', function() {
    killSound.pause();
    killSound.currentTime = 0;
});
bonusSound.addEventListener('ended', function() {
    bonusSound.pause();
    bonusSound.currentTime = 0;
});

score.innerHTML = scoreCounter;
record.innerHTML = recordCounter;

let keyState = {};
window.addEventListener('keydown', function(event) {
    keyState[event.key] = true;
}, true);
window.addEventListener('keyup', function(event) {
    keyState[event.key] = false;
}, true);

let isPikachuAlive = setInterval(function() {
    carNos.style.display = 'none';

    if (isGamePlaying == false) {
        wheelLeft.style.animationPlayState = 'paused';
        wheelRight.style.animationPlayState = 'paused';
    } else {
        wheelLeft.style.animationPlayState = 'running';
        wheelRight.style.animationPlayState = 'running';
    }

    if (keyState['ArrowLeft']){
        goLeft(); //key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37
        wheelLeft.style.animationPlayState = 'running';
        wheelRight.style.animationPlayState = 'running';
        wheelLeft.style.animationDirection = 'reverse';
        wheelRight.style.animationDirection = 'reverse';
        carNos.style.display = 'block';
    } else {
        wheelLeft.style.animationDirection = 'normal';
        wheelRight.style.animationDirection = 'normal';
    }
    if (keyState['ArrowRight']){
        goRight(); //key: 'ArrowRight', code: 'ArrowRight', keyCode: 39
        wheelLeft.style.animationPlayState = 'running';
        wheelRight.style.animationPlayState = 'running';
        wheelLeft.style.animationDirection = 'normal';
        wheelRight.style.animationDirection = 'normal';
        carNos.style.display = 'block';
    }

    let pikachuBottom = parseInt(window.getComputedStyle(pikachuContainer).getPropertyValue('bottom'));
    let pikachuLeft = parseInt(window.getComputedStyle(pikachuContainer).getPropertyValue('left'));
    let pikachuRight = parseInt(window.getComputedStyle(pikachuContainer).getPropertyValue('right'));
    let burgerLeft = parseInt(window.getComputedStyle(burger).getPropertyValue('left'));
    let burgerRight = parseInt(window.getComputedStyle(burger).getPropertyValue('right'));

    if (pikachuLeft <= (burgerLeft + 5) && pikachuRight <= (burgerRight + 30) && pikachuBottom <= 25) {
        isGamePlaying = false;
        isPikachuSuperSayan = false;
        isSuperCarActive = false;

        pikachu.src = 'assets/img/pikachu-run-static-3.png';
        pikachuContainer.classList.remove('jump');
        pikachu.classList.add('kill');
        pikachu.classList.remove('car-active');
        superCar.style.display = 'none';
        mcdonalds.classList.remove('takeaway');
        burger.classList.remove('diet');
        star.style.display = 'none';
        star.classList.remove('to-the-moon');
        cloudText.style.display = 'none';
        gameContainer.style.animationPlayState = 'paused';

        killSound.play();

        pikaSound.pause();
        pikaSound.currentTime = 0;
        carStart.pause();
        carStart.currentTime = 0;
        carStop.pause();
        carStop.currentTime = 0;
        bonusSound.pause();
        bonusSound.currentTime = 0;

        clearInterval(liveScore);
        liveScore = undefined;
        clearInterval(liveBonus);
        liveBonus = undefined;

        recordStorage();
    }

    if (liveBonus == undefined && isGamePlaying == true) {
        liveBonus = setInterval(function() {
            star.style.display = 'block';
            star.classList.add('to-the-moon');
        }, randomBonus);
    }

    let starLeft = parseInt(window.getComputedStyle(star).getPropertyValue('left'));
    let starRight = parseInt(window.getComputedStyle(star).getPropertyValue('right'));

    if (pikachuLeft <= (starLeft + 5) && pikachuRight <= (starRight + 30) && pikachuBottom >= 75) {
        star.style.display = 'none';
        star.classList.remove('to-the-moon');

        bonusSound.play();

        scoreCounter = scoreCounter + 1000;
        score.innerHTML = scoreCounter;
    }
}, 10);

window.document.querySelector('body').addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'Enter': //key: 'Enter', code: 'Enter', keyCode: 13
                event.preventDefault();
                if (isGamePlaying == false) {
                    if(isPikachuSuperSayan == false && isSuperCarActive == false) {
                        resetGame();
                    } else {
                        pikachuContainer.style.left = 40 + 'px';
                    }
                    playGame();
                }
            break;
        case ' ': //key: ' ', code: 'Space', keyCode: 32
        case 'ArrowUp': //key: 'ArrowUp', code: 'ArrowUp', keyCode: 38
                event.preventDefault();
                jump();
            break;
        case 'ArrowDown': //key: 'ArrowDown', code: 'ArrowDown', keyCode: 40
                event.preventDefault();
                superSayan()
            break;
        case 'b': //key: 'b', code: 'KeyB', keyCode: 66
                event.preventDefault();
                getSuperCar();
        break;
    }
});

function playGame() {
    if (pikachu.classList.contains('kill')) {
        return;
    }

    isGamePlaying = true;

    if (isPikachuSuperSayan == true) {
        if (isSuperCarActive == true) {
            pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
        } else {
            pikachu.src = 'assets/img/pikachu-supersayan-run-new.gif';
        }
    } else {
        if (isSuperCarActive == true) {
            pikachu.src = 'assets/img/pikachu-run-static-2.png';
        } else {
            pikachu.src = 'assets/img/pikachu-run-new.gif';
        }
    }

    gameContainer.style.animationPlayState = 'running';

    mcdonalds.classList.add('takeaway');
    burger.classList.add('diet');
    burger.style.animationDuration = grillTime + 's';

    if (liveScore == undefined) {
        liveScore = setInterval(function() {
            scoreCounter = scoreCounter + 10;
            score.innerHTML = scoreCounter;
        }, 100);
    }

    if (liveBonus == undefined) {
        liveBonus = setInterval(function() {
            star.style.display = 'block';
            star.classList.add('to-the-moon');
        }, randomBonus);
    }
}

function resetGame() {
    isGamePlaying = false;
    isPikachuSuperSayan = false;
    isSuperCarActive = false;

    pikachu.src = 'assets/img/pikachu-run-static-2.png';
    pikachuContainer.classList.remove('jump');
    pikachu.classList.remove('kill');
    pikachu.classList.remove('car-active');
    superCar.style.display = 'none';
    burger.classList.remove('diet');
    star.style.display = 'none';
    star.classList.remove('to-the-moon');
    cloudText.style.display = 'none';
    mcdonalds.classList.remove('takeaway');
    gameContainer.style.animationPlayState = 'paused';
    pikachuContainer.style.left = 40 + 'px';

    scoreCounter = 0;
    score.innerHTML = scoreCounter;

    pikaSound.pause();
    pikaSound.currentTime = 0;
    carStart.pause();
    carStart.currentTime = 0;
    carStop.pause();
    carStop.currentTime = 0;
    bonusSound.pause();
    bonusSound.currentTime = 0;
    killSound.pause();
    killSound.currentTime = 0;

    clearInterval(liveScore);
    liveScore = undefined;
    clearInterval(liveBonus);
    liveBonus = undefined;
}

function jump() {
    if (!pikachu.classList.contains('kill')) {
        pikachuContainer.classList.add('jump');
        cloudText.style.display = 'block';
        pikaSound.play()
    }
}

function goRight() {
    let pikachuLeft = parseInt(window.getComputedStyle(pikachuContainer).getPropertyValue('left'));

    if (!pikachu.classList.contains('kill') && pikachuLeft < 240) {
        if (isSuperCarActive == true) {
            pikachuContainer.style.left = (pikachuLeft + 8) + 'px';
        } else {
            pikachuContainer.style.left = (pikachuLeft + 4) + 'px';
        }
    }
}

function goLeft() {
    let pikachuLeft = parseInt(window.getComputedStyle(pikachuContainer).getPropertyValue('left'));

    if (!pikachu.classList.contains('kill') && pikachuLeft > 40) {
        if (isSuperCarActive == true) {
            pikachuContainer.style.left = (pikachuLeft - 8) + 'px';
        } else {
            pikachuContainer.style.left = (pikachuLeft - 4) + 'px';
        }
    }
}

function superSayan() {
    if (pikachu.classList.contains('kill')) {
        return;
    }

    if (isGamePlaying == true) {
        if (isPikachuSuperSayan == true) {
            if (isSuperCarActive == true) {
                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            } else {
                pikachu.src = 'assets/img/pikachu-run-new.gif';
            }
            isPikachuSuperSayan = false;
        } else {
            if (isSuperCarActive == true) {
                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            } else {
                pikachu.src = 'assets/img/pikachu-supersayan-run-new.gif';
            }
            isPikachuSuperSayan = true;
        }
    } else {
        if (isPikachuSuperSayan == true) {
            if (isSuperCarActive == true) {
                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            } else {
                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            }
            isPikachuSuperSayan = false;
        } else {
            if (isSuperCarActive == true) {
                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            } else {
                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            }
            isPikachuSuperSayan = true;
        }
    }
}

function getSuperCar() {
    if (pikachu.classList.contains('kill')) {
        return;
    }

    if (isSuperCarActive == true) {
        carStart.pause();
        carStart.currentTime = 0;

        carStop.play();
    } else {
        carStop.pause();
        carStop.currentTime = 0;

        carStart.play();
    }

    if (isGamePlaying == true) {
        if (isPikachuSuperSayan == true) {
            if (isSuperCarActive == true) {
                pikachu.classList.remove('car-active');
                superCar.style.display = 'none';
                isSuperCarActive = false;

                pikachu.src = 'assets/img/pikachu-supersayan-run-new.gif';
            } else {
                pikachu.classList.add('car-active');
                superCar.style.display = 'block';
                isSuperCarActive = true;

                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            }
        } else {
            if (isSuperCarActive == true) {
                pikachu.classList.remove('car-active');
                superCar.style.display = 'none';
                isSuperCarActive = false;

                pikachu.src = 'assets/img/pikachu-run-new.gif';
            } else {
                pikachu.classList.add('car-active');
                superCar.style.display = 'block';
                isSuperCarActive = true;

                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            }
        }
    } else {
        if (isPikachuSuperSayan == true) {
            if (isSuperCarActive == true) {
                pikachu.classList.remove('car-active');
                superCar.style.display = 'none';
                isSuperCarActive = false;

                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            } else {
                pikachu.classList.add('car-active');
                superCar.style.display = 'block';
                isSuperCarActive = true;

                pikachu.src = 'assets/img/pikachu-supersayan-no-run.gif';
            }
        } else {
            if (isSuperCarActive == true) {
                pikachu.classList.remove('car-active');
                superCar.style.display = 'none';
                isSuperCarActive = false;

                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            } else {
                pikachu.classList.add('car-active');
                superCar.style.display = 'block';
                isSuperCarActive = true;

                pikachu.src = 'assets/img/pikachu-run-static-2.png';
            }
        }
    }
}

function setSfxVolume() {
    if (pikaSound.volume == 1) {
        pikaSound.volume = 0;
    } else {
        pikaSound.volume = 1;
    }

    if (killSound.volume == 1) {
        killSound.volume = 0;
    } else {
        killSound.volume = 1;
    }

    if (bonusSound.volume == 1) {
        bonusSound.volume = 0;
    } else {
        bonusSound.volume = 1;
    }

    if (carStart.volume == 1) {
        carStart.volume = 0;
    } else {
        carStart.volume = 1;
    }

    if (carStop.volume == 1) {
        carStop.volume = 0;
    } else {
        carStop.volume = 1;
    }
}

function setBackMusic() {
    if (isBGMusicPlaying == false) {
        backMusic.play();
        isBGMusicPlaying = true;
    } else {
        backMusic.pause();
        isBGMusicPlaying = false;
    }
}

function recordStorage() {
    liveRecord.push(scoreCounter);

    if (liveRecord.length > 0) {
        for (let i = 0; i < liveRecord.length; i++) {
            if (liveRecord[i] > recordCounter) {
                recordCounter = liveRecord[i];
                record.innerHTML = recordCounter;
            }
        }
    }
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomNumberDec(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}