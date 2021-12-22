const game = document.getElementById("canvas")
const ctx = game.getContext("2d")
const gameName = document.getElementById("gameName")

// const start = document.querySelector(".start")
const startGame = document.getElementById("startGame")
const gameOver = document.getElementById("gameOver")
const gameWon = document.getElementById("gameWon")

const startButton = document.getElementById("startButton")
const resetButton = document.getElementById("resetButton")
const moveDisplay = document.getElementById("movement")

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

const inhalers = document.querySelectorAll(".inhaler")
// console.log('this should be an inhaler', inhalers)


// Game Menus

startButton.addEventListener("click", () => {
    startGame.style.display = "none"
    game.style.display = "block"
    gameOver.style.display = "none"
    gameWon.style.display = "none"
    gameName.style.display = "none"
})

function gameHasEnded() {
    stopGameLoop()
    startGame.style.display = "none"
    game.style.display = "none"
    gameOver.style.display = "block"
    gameWon.style.display = "none"
    gameName.style.display = "none"
    resetButton.addEventListener("click", () => {
        reset()
    })
}

function gameIsWon() {
    stopGameLoop()
    startGame.style.display = "none"
    game.style.display = "none"
    gameOver.style.display = "none"
    gameWon.style.display = "block"
    gameName.style.display = "none"
    resetButton.addEventListener("click", () => {
        reset()
    })
}

function reset() {
    location.reload()
}





// const button = document.getElementById("button");
// button.addEventListener("click", Start);
// function Start() {
//     console.log("Started");
//     button.removeEventListener("click", Start);
//     button.addEventListener("click", Stop);
//     button.value = "Stop";
// }
// function Stop(){
//     console.log("Stopped");
//     button.removeEventListener("click", Stop);
//     button.addEventListener("click", Start);
//     button.value = "Start";
// }





let catDirection = true

function catsbrownDirectionX() {
}
function catbrownMoveX() {
    if (catsbrown.x > 1050) {
        catDirection = false
    } else if (catsbrown.x < 0) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsbrown.x += 8
        // console.log('+')
    } else {
        catsbrown.x -= 8
        // console.log('-')
    }
}

function catsorangeDirectionX() {
}
function catorangeMoveX() {
    if (catsorange.x > 1050) {
        catDirection = false
    } else if (catsorange.x < 0) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsorange.x += 7
        // console.log('+')
    } else {
        catsorange.x -= 7
        // console.log('-')
    }
}

function catsblackDirectionY() {
}
function catblackMoveY() {
    if (catsblack.y > 650) {
        catDirection = false
    } else if (catsblack.y < 0) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsblack.y += 7
        // console.log('+')
    } else {
        catsblack.y -= 7
        // console.log('-')
    }
}



const crazyImg = new Image()
crazyImg.src = ('../js/imgs/crazycat.png')

const flyingImg = new Image()
flyingImg.src = ('../js/imgs/flyingcat.png')

const sittingImg = new Image()
sittingImg.src = ('../js/imgs/sittingcat.png')

const ellieImg = new Image()
ellieImg.src = ('https://i.imgur.com/ZhVva00.png')

const houseImg = new Image()
houseImg.src = ('https://i.imgur.com/NROwISk.jpg')


function Crawler(url, x, y, width, height) {
    this.url = url
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.reached = false
    this.render = function () {
        // ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}

let catsbrown = new Crawler(crazyImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 90, 100)
let catsorange = new Crawler(flyingImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 80, 80)
let catsblack = new Crawler(sittingImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 80, 80)



function Players(url, x, y, width, height) {
    this.url = url
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.reached = false
    this.render = function () {
        // ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}
let player = new Players(ellieImg, 0, 470, 80, 80)
let friendshouse = new Players(houseImg, 850, 0, 110, 75)


let movementHandler = (e) => {
    switch (e.key.toLowerCase()) {
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

// let counter = 2
function removeInhaler() {
    for (let i = 0; i < 3; i++) {

        if (inhalers[i].style.display = "none") {
            break;
        }
        else {
            inhalers[i].style.display = "none"
        }
    }


    //     function removeInhaler () {
    //     // console.log(inhalers)
    // for (let i = 0; i < inhalers.length; i++) {
    //     inhalers[i].style.display = "none"
    // if (counter !== counter+1) {
    //     inhalers[counter].style.display = "none"
    // // }
    // console.log(counter)

    //loop over inhalers
    //check style.display of each inhaler
    //print display style
    //write some logic around that display style
    //if the display style is "none", do nothing
    //if the display style is "", change one of them to none
    //if all the display styles are "none", allergy child is dead

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
        // removeInhaler()
        // document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    } else if (
        player.x < catsorange.x + catsorange.width &&
        player.x + player.width > catsorange.x &&
        player.y < catsorange.y + catsorange.height &&
        player.y + player.height > catsorange.y
    ) {
        catsorange.reached = true
        // removeInhaler()
        // document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    } else if (
        player.x < catsblack.x + catsblack.width &&
        player.x + player.width > catsblack.x &&
        player.y < catsblack.y + catsblack.height &&
        player.y + player.height > catsblack.y
    ) {
        catsblack.reached = true
        // removeInhaler()
        // counter--
        // document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    // } else if (
    //     player.x < Crawler.x + Crawler.width &&
    //     player.x + player.width > Crawler.x &&
    //     player.y < Crawler.y + Crawler.height &&
    //     player.y + player.height > Crawler.y
    // ) {
    //     Crawler.reached = true
    //     removeInhaler()
    //     // counter--
    //     document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    }
}


// tracks detected hits
let collision = 0
const catCollision = () => {
    return collision += 1
}


// end of game logic
function gameEnds() {
    if (collision >= 3) {
        gameHasEnded()
    }
}

function wonGame() {
    if (collision <= 3 && friendshouse.reached == true) {
        gameIsWon()
    }
}




let stopGameLoop = () => { clearInterval(gameInterval) }

const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // display relevant game state(player movement) in our movement display
    moveDisplay.innerText = `X: ${player.x}\nY: ${player.y}`
    // check if the endingPoint has been reached, if not, render the endingPoint
    friendshouse.render()
    player.render()
    // setX()
    // catsbrownDirectionX()
    catsbrown.render()
    catsorange.render()
    catsblack.render()
    catbrownMoveX()
    catorangeMoveX()
    catblackMoveY()
    detectHit()
    if (friendshouse.reached) {
        stopGameLoop()
        // add in our detection to see if the hit has been made
        console.log('You win!')
    }
}

// add event listener for player movement
document.addEventListener('keydown', movementHandler)
// the timing function will determine how and when our game animates
let gameInterval = setInterval(gameLoop, 70)