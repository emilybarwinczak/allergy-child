//making an allergy child game
//the point of the game is to get AC to her friend's house unharmed
//we will have a player (AC) and obstacles
//the player (AC) can move around the canvas
//the obstacles will move around the canvas randomly
//AC needs to try and avoid the obstacles
//if AC runs into an obstacle, they lose a life(inhaler) 
//  //--> do I want them to have to move back to the start? 
//AC gains a life back if they retrieve an inhaler or nebulizer
//once AC gets to the friends house, you win the game

//one class for allergy girl, the good items, the bad items, and the win condition
//life bar represented by attributes on the 
//this.healthPoints = 100
//detectHit(thing) if it happens, deduct or add points etc.



// we need to get our canvas, save it to a variable, so we can access it(and utilize it)
const game = document.getElementById('canvas')
// another thing we'll do here, is get the movement tracker
const moveDisplay = document.getElementById('movement')

// we're setting up height and width variables BASED ON computed style
// that means we're using setAttribute in conjunction with getComputedStyle
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// now we need to get the game's context so we can add to it, draw on it, create animations etc
// we do this with the built in canvas method, getContext
const ctx = game.getContext('2d')


///commenting out below FOR NOW only

window.alert("Welcome to Allergy Child! To play, you can use the following keys: W = Up S = Down A = Left D = Right")





// function start () {
//     ctx.font = '50px serif';
//     ctx.fillText('Hit the space bar to begin!', 150, 150);
//     // ctx.textAlign = center;
//     const startGame ('keydown', (event) => {
//         ctx.game.addEventListener
//         if (event.keyCode == '32 ') {
//             console.log("Spacebar Pressed")}
//         })
//         startGame();
// // }
// document.querySelector(startGame).onclick = startGame;


// we're going to follow some sorta basic Object Oriented Programming 'rules' to build an interactive game
// we'll create objects for our player and our obstacles
// we'll give them their own 'draw' methods to place them on the canvas

//create a class to build an object
function Crawler(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.reached = false
    // then we declare the same type of render method
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
let catX = 0
function setX () {
    catX = Math.floor(Math.random() * game.width)
    console.log(catX)
    return catX
}

function catsbrownMoveX () {
    // catsbrown.x += 4
    if (catsbrown.x < 1087){
        catsbrown.x += 4
        console.log('brown cat')
    } else {
        catsbrown.x -= 4
        console.log('other cat')
    }
} 


let player = new Crawler(50, 630, 'white', 18, 18)
let friendshouse = new Crawler(1005, 55, 'white', 48, 48)

let catsbrown = new Crawler (setX(), Math.floor(Math.random() * game.height), 'brown', 15, 15)
let catsorange = new Crawler(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 'orange', 15, 15)
let catsblack = new Crawler(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 'black', 15, 15)
//can i simplify this into an array? and make them all move randomly as well?




// Here we're going to set up our movement handler
// the movementhandler will be an event listener
// we'll use the WASD keys to move the player around the canvas
let movementHandler = (e) => {
    switch(e.key.toLowerCase()) {
        case ('w'):
            // move up
            player.y -= 10
            if (player.y <= 0) {
                player.y = 0
            }
            break
        case ('a'):
            // moves left
            player.x -= 10
            if (player.x <= 0) {
                player.x = 0
            }
            break
        case ('s'):
            // move down
            player.y += 10
            if (player.y + player.height >= game.height) {
                player.y = game.height - player.height
            }
            break
        case ('d'):
            // move right
            player.x += 10
            if (player.x + player.width >= game.width) {
                player.x = game.width - player.width
            }
            break
    }
}


// make collision detection
// write logic that determines if any part of our player touches any part of the ending point
const detectHit = () => {
    // if the player's x + width or y + height hits the ending point's x+width or y+height, win game
    if (
        player.x < friendshouse.x + friendshouse.width &&
        player.x + player.width > friendshouse.x &&
        player.y < friendshouse.y + friendshouse.height &&
        player.y + player.height > friendshouse.y
    ) {
        friendshouse.reached = true
        document.querySelector('#bottom-right > h2').innerText = 'You Win!'
    } else if (
        player.x < catsbrown.x + catsbrown.width &&
        player.x + player.width > catsbrown.x &&
        player.y < catsbrown.y + catsbrown.height &&
        player.y + player.height > catsbrown.y
    ) {
        catsbrown.reached = true
        document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    } else if (
        player.x < catsorange.x + catsorange.width &&
        player.x + player.width > catsorange.x &&
        player.y < catsorange.y + catsorange.height &&
        player.y + player.height > catsorange.y
    ) {
        catsorange.reached = true
        document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    } else if (
        player.x < catsblack.x + catsblack.width &&
        player.x + player.width > catsblack.x &&
        player.y < catsblack.y + catsblack.height &&
        player.y + player.height > catsblack.y
    ) {
        catsblack.reached = true
        document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    // } else if (
    //     game.x < catsbrown.x + catsbrown.width &&
    //     game.x + game.width > catsbrown.x &&
    //     game.y < catsbrown.y + catsbrown.height &&
    //     game.y + game.height > catsbrown.y
    // ) {
    //     game.reached = true
    }
}

//make the cats turn around when they hit the edge of the board
//no idea what i'm doing here 
// const turnAround = () => {
//     if (
//         catsbrown.x = game
//     ) catsbrown.x -= 4
// }

// if (true) {
//     catsbrown.x = game.width
// }
// let catsbrown.x -= 4



let stopGameLoop = () => {clearInterval(gameInterval)}
// we're going to set up our game loop, to be used in our timing function
// set up gameLoop function, declaring what happens when our game is running

const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // display relevant game state(player movement) in our movement display
    moveDisplay.innerText = `X: ${player.x}\nY: ${player.y}`
    // check if the endingPoint has been reached, if not, render the endingPoint
    friendshouse.render()
    player.render()
    // setX()
    catsbrown.render()
    catsorange.render()
    catsblack.render()
    catsbrownMoveX()
    // catsbrown.x += 4
    // catsbrown.x -= 10
    // catsbrown.x = game.width - catsbrown.height
    catsorange.x -= 4
    catsblack.y += 4
    detectHit()
    if (friendshouse.reached) {
        stopGameLoop()
        // add in our detection to see if the hit has been made
        console.log('You win!')
    }
}


// we also need to declare a function that will stop our animation loop

// add event listener for player movement
document.addEventListener('keydown', movementHandler)
// the timing function will determine how and when our game animates
let gameInterval = setInterval(gameLoop, 70)





























// let cats = new spawnObjects('brown', 15, 15)
// console.log(cats)
// function spawnObjects(color, width, height) {
//     x = Math.floor(Math.random() * game.width)
//     y = Math.floor(Math.random() * game.height)
//     this.color = color
//     this.width = width
//     this.height = height
    
//     this.render = function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(x, y, this.width, this.height)
//     }
// }



// function move() {
//     const querySelector(cats);

// }
// setInterval() => {
//     //want the object to move around here?
// }















/////////////////////////////////////////////////////////////////////////////////////////////

// const gw = game.width;
// const gh = game.height;

// const cats = [];
// for (i = 0; i < 3; i++) {
//     newCat();
// }
// drawAll();

// const continueAnimating = true;
// const lastTime = performance.now();
// requestAnimationFrame(animate);
// function newCat() {
//     let r = 10 + Math.random() * 15;
//     let x = Math.random() * (gw-2*r) + r;
//     let y = Math.random() * (gh-2*r) + r;
//     while (true) {
//         let hit = 0;
//         for (i = 0; i < cats.length; i++){
//             const cat = cats[i];
//             let dx = x - cat.x;
//             let dy = y - cat.y;
//             let rr = r + cat.radius;
//             if (dx * dx + dy * dy <rr * rr) {
//                 hit++;
//             }
//         }
//         if (hit == 0) {
//             break;
//         }
//     let x = Math.random() * (gw-2*r) + r;
//     let y = Math.random() *(gh-2*r) + r;
//     }
//     cats.push({
//         x: x,
//         y: y,
//         radius: r,
//         color: randomColor(),
//         countdown: 500 + Math.random() * 1000
//     });
// }
// function animate(time) {
//     if (continueAnimating) {
//         requestAnimationFrame(animate);
//     }
//     var elapsed = time - lastTime;
//     lastTime = time;
//     var i = cats.length;
//     while (--i >= 0) {
//         var cat = cats[i];
//         cat.countdown -= elapsed;
//         if (cat.countdown < 0) {
//             cats.splice(i, 1);
//             newCat();
//         }
//     }
//     // draw circles
//     drawAll();
// }

// function drawAll() {
//     ctx.clearRect(0, 0, cw, ch);
//     for (var i = 0; i < cats.length; i++) {
//         var cat = cats[i];
//         ctx.beginPath();
//         ctx.arc(cat.x, cat.y, cat.radius, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fillStyle = cat.color;
//         ctx.fill();
//     }
// }
// function randomColor() {
//     return ('#' + Math.floor(Math.random() * 16777215).toString(16));
// }
// $("#stop").click(function () {
//     continueAnimating = false;
// });


//////////////////////////////////////////////////////////////////////////////////////////













































/////////////////////////////////////////////////////////////////////////////////////////////////////////

// function cats() {
//     this.x = Math.random() * (game.width - (game.width - game.width)) + (game.width - game.width);
//     this.y = 0;
//     this.vx = 5.5;
//     this.vy = 1;
//     this.radius = 5;
//     this.color = 'brown';
//     this.gravity = 1;
//     this.gravitySpeed = 0;
//     this.bounce = 1;
//     this.ctx = game.getContext('2d');
//     this.draw = function() {
//       this.ctx.beginPath();
//       this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//       this.ctx.closePath();
//       this.ctx.fillStyle = this.color;
//       this.ctx.fill();
//     }
//     this.newPos = function() {
//       this.gravitySpeed += this.gravity;
//       this.x += this.vx;
//       this.y += this.vy + this.gravitySpeed;
//       this.hitBottom();
//     }
//     this.hitBottom = function() {
//       var rockbottom = game.height - this.radius;
//       if (this.y > rockbottom) {
//         this.y = rockbottom;
//         this.gravitySpeed = -(this.gravitySpeed / 1.5 * this.bounce);
//       }
//     }
//   }
  
//   var ball = new cats();


//   function drawf() {
//     // ball.ctx.clearRect(0, 0, game.width, game.height);
//     ball.draw();
//     // console.log(ball);
//     ball.newPos();
//     raf = window.requestAnimationFrame(drawf);
// }

// // setInterval(drawf, 35000)
//   game.addEventListener('keypress', function(e) {
//     raf = window.requestAnimationFrame(drawf);
//   });
  
//   ball.draw();
