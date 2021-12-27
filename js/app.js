const game = document.getElementById("canvas")
const ctx = game.getContext("2d")
const gameName = document.getElementById("gameName")
const startGame = document.getElementById("startGame")
const gameOver = document.getElementById("gameOver")
const gameWon = document.getElementById("gameWon")
const startButton = document.getElementById("startButton")
const resetButton = document.getElementById("resetButton")
const playAgainButton = document.getElementById("playAgainButton")
const moveDisplay = document.getElementById("movement")
const playerStatus = document.getElementById("top-right")

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// Game Menus

startButton.addEventListener("click", () => {
    startGame.style.display = "none"
    game.style.display = "flex"
    gameOver.style.display = "none"
    gameWon.style.display = "none"
})

function gameHasEnded() {
    stopGameLoop()
    startGame.style.display = "none"
    game.style.display = "none"
    gameOver.style.display = "block"
    gameWon.style.display = "none"
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
    playAgainButton.addEventListener("click", () => {
        reset()
    })
}

function reset() {
    location.reload()
}


// create cats 
const crazyImg = new Image()
crazyImg.src = ('js/imgs/crazycat.png')
const flyingImg = new Image()
flyingImg.src = ('js/imgs/flyingcat.png')
const sittingImg = new Image()
sittingImg.src = ('js/imgs/sittingcat.png')

function Crawler(url, x, y, width, height) {
    this.url = url
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.reached = false
    this.render = function () {
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}

let catsbrown = new Crawler(crazyImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 90, 100)
let catsorange = new Crawler(flyingImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 80, 80)
let catsblack = new Crawler(sittingImg, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 80, 80)

// create players
const ellieImg = new Image()
ellieImg.src = ('js/imgs/ellieImg.png')
const houseImg = new Image()
houseImg.src = ('js/imgs/houseImg.png')

function Players(url, x, y, width, height) {
    this.url = url
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.reached = false
    this.render = function () {
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
}

let player = new Players(ellieImg, 0, 520, 80, 80)
let friendsHouse = new Players(houseImg, 840, 10, 90, 85)




let catDirection = true

function catsbrownDirectionX() {
}
function catbrownMoveX() {
    if (catsbrown.x > 870) {
        catDirection = false
    } else if (catsbrown.x < 90) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsbrown.x += 3
        // console.log('+')
    } else {
        catsbrown.x -= 3
        // console.log('-')
    }
}

function catsorangeDirectionX() {
}
function catorangeMoveX() {
    if (catsorange.x > 870) {
        catDirection = false
    } else if (catsorange.x < 90) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsorange.x += 2
        // console.log('+')
    } else {
        catsorange.x -= 2
        // console.log('-')
    }
}

function catsblackDirectionY() {
}
function catblackMoveY() {
    if (catsblack.y > 430) {
        catDirection = false
    } else if (catsblack.y < 0) {
        catDirection = true
    }
    // console.log('Cat Direction' + catDirection)
    if (catDirection === true) {
        catsblack.y += 2
        // console.log('+')
    } else {
        catsblack.y -= 2
        // console.log('-')
    }
}


let movementHandler = (e) => {
    switch (e.key.toLowerCase()) {
        case ('w'):
            // move up
            player.y -= 5
            if (player.y <= 0) {
                player.y = 0
            }
            break
        case ('a'):
            // moves left
            player.x -= 5
            if (player.x <= 0) {
                player.x = 0
            }
            break
        case ('s'):
            // move down
            player.y += 5
            if (player.y + player.height >= game.height) {
                player.y = game.height - player.height
            }
            break
        case ('d'):
            // move right
            player.x += 5
            if (player.x + player.width >= game.width) {
                player.x = game.width - player.width
            }
            break
    }
}


const detectHit = () => {
    // if the player's x + width or y + height hits the ending point's x+width or y+height, win game
    if (
        player.x < friendsHouse.x + friendsHouse.width &&
        player.x + player.width > friendsHouse.x &&
        player.y < friendsHouse.y + friendsHouse.height &&
        player.y + player.height > friendsHouse.y
    ) {
        friendsHouse.reached = true
        // document.querySelector('#bottom-right > h2').innerText = 'You Win!'
    } else if (
        player.x < catsbrown.x + catsbrown.width &&
        player.x + player.width > catsbrown.x &&
        player.y < catsbrown.y + catsbrown.height &&
        player.y + player.height > catsbrown.y
    ) {
        catsbrown.reached = true
        catCollision()
    } else if (
        player.x < catsorange.x + catsorange.width &&
        player.x + player.width > catsorange.x &&
        player.y < catsorange.y + catsorange.height &&
        player.y + player.height > catsorange.y
    ) {
        catsorange.reached = true
        catCollision()
    } else if (
        player.x < catsblack.x + catsblack.width &&
        player.x + player.width > catsblack.x &&
        player.y < catsblack.y + catsblack.height &&
        player.y + player.height > catsblack.y
    ) {
        catsblack.reached = true
        catCollision()
    }
}



let livesLost = 0
const catCollision = () => {
    return livesLost += 1
}

function gameEnds() {
    if (livesLost > 3) {
        gameHasEnded()
    }
}

function wonGame() {
    if (livesLost <= 3 && friendsHouse.reached == true) {
        gameIsWon()
    }
}

const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // display relevant game state(player movement) in our movement display
    moveDisplay.innerText = `X: ${player.x}\nY: ${player.y}`
    playerStatus.innerText = `Lives Lost: ${livesLost}`
    // check if the endingPoint has been reached, if not, render the endingPoint
    friendsHouse.render()
    player.render()
    catsbrown.render()
    catsorange.render()
    catsblack.render()
    catbrownMoveX()
    catorangeMoveX()
    catblackMoveY()
    detectHit()
    wonGame()
    gameEnds()
}

// add event listener for player movement
document.addEventListener('keydown', movementHandler)
// the timing function will determine how and when our game animates
let gameInterval = setInterval(gameLoop, 30)
let stopGameLoop = () => { clearInterval(gameInterval) }