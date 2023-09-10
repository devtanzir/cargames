const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
// console.log(gameArea);

startScreen.addEventListener('click' , start);

let keys = { ArrowUp : false, ArrowDown : false, ArrowRight : false, ArrowLeft : false};

let player = { speed : 5, score : 0};

document.addEventListener("keydown" , keyDown);
document.addEventListener("keyup" , keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys);
    // console.log(e.key);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
    // console.log(e.key);
}
 function isCollide (a,b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top ) || (aRect.top > bRect.bottom )||(aRect.right < bRect.left ) ||(aRect.left > bRect.right ))
 } 

 function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');

    startScreen.innerHTML = `Game Over <br> Your Final Score Is ${Math.floor(player.score / 10)} <br> Press Here To Restart The Game.`
 }

function moveLines(){
    let lines = document.querySelectorAll(".lines");

    lines.forEach(function(item) {
        if(item.y >= 900){
            item.y -= 900
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}
function moveCars(car){
    let enemy = document.querySelectorAll(".enemy");

    enemy.forEach(function(item) {
        if (isCollide(car, item)) {
           
            endGame();
        }
        if(item.y >= 900){
            item.y = -2500;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
        
    });
}
function gameplay() {
    // console.log("hey i am clicked.");
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {
        moveLines();
        moveCars(car);
        if (keys.ArrowUp & player.y > (road.top + 90)) { player.y -= player.speed; };
        if (keys.ArrowDown & player.y < (road.bottom - 105)) { player.y += player.speed; };
        if (keys.ArrowRight & player.x < (road.width - 50 )) { player.x += player.speed; };
        if (keys.ArrowLeft & player.x > 0) { player.x -= player.speed; };

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gameplay);

        player.score++;

        

        const totalScore = Math.floor(player.score / 10);

        score.innerHTML = `Score = ${totalScore}`;

    }
    
}

function start(){

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0
    window.requestAnimationFrame(gameplay);

    for (let i = 0; i < 9; i++) {
        
    let roadLine = document.createElement('div');
    roadLine.y = (i*150);
    roadLine.style.top = roadLine.y + "px"

    roadLine.setAttribute("class" , "lines");
    gameArea.appendChild(roadLine);
    }


    let car = document.createElement('div');
    car.setAttribute("class" , "car");

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log(`top offset = ${player.x}`);
    // console.log(`left offset = ${player.y}`);

    for (let i = 0; i < 10; i++) {
        
        let enemyCar = document.createElement('div');
        enemyCar.y = ((i+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px"
    
        enemyCar.setAttribute("class" , "enemy");
        enemyCar.style.backgroundImage =randomCar();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
        }
}

function randomCar() {
  const carNum =  Math.floor(Math.random() * 10);
  console.log(`url(img/car${carNum}.png)`);
  return `url(img/car${carNum}.png)` ;

 
}

