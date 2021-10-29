
const game = document.getElementById('canvas')
const moveDisplay = document.getElementById('movement')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

const ctx = game.getContext('2d')


// const playerImg = new Image()
// playerImg.src = ('../allergy-child/js/flyingcat.png')
// catsbrownImg.src = (img src = "https://png.pngitem.com/pimgs/s/236-2362990_-hd-png-download.png")
// const catsblackImg = document.getElementById('catsblackImg');
// const catblackImg = new Image()
// catblackImg.src = ('imgs/crazycat.png')


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


let player = new Crawler(50, 630, 'white', 18, 18)
let friendshouse = new Crawler(1005, 55, 'white', 48, 48)


let crazy = new Crawler(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 'orange', 15, 15)
let catsblack = new Crawler(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), 'black', 15, 15)
//can i simplify this into an array? and make them all move randomly as well?


let crazyArr = []
let flyingArr = []
let sittingArr = []

let catsX = Math.floor((Math.random() * 100 + 25))
const newCatsX = () => {
    return catsX += Math.floor(Math.random() * 50 + 50)
}
function addCats () {
    for (let i = 0; i <= 5; i++) {
        let crazy = new gameElem(crazy, newCatsX(), -10, 16, 18)
        crazyArr.push(crazy)
    }
}

function movingCats () {
    if (!this.reached) {
        console.log('afternoon')
        for (let i = 0; i < crazyArr.length; i++) {
            let cat = crazyArr[i]
            // crazyArr[i].x += (Math.random() * 100)
            // if (crazyArr[i].x > 1087) {
            //     crazyArr[i].x = -10
            //     movingCats()
            cat.x += 10
            }
        }
    }





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
    }
    // } else if (
    //     player.x < catsbrown.x + catsbrown.width &&
    //     player.x + player.width > catsbrown.x &&
    //     player.y < catsbrown.y + catsbrown.height &&
    //     player.y + player.height > catsbrown.y
    // ) {
    //     catsbrown.reached = true
    //     document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    // } else if (
    //     player.x < catsorange.x + catsorange.width &&
    //     player.x + player.width > catsorange.x &&
    //     player.y < catsorange.y + catsorange.height &&
    //     player.y + player.height > catsorange.y
    // ) {
    //     catsorange.reached = true
    //     document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    // } else if (
    //     player.x < catsblack.x + catsblack.width &&
    //     player.x + player.width > catsblack.x &&
    //     player.y < catsblack.y + catsblack.height &&
    //     player.y + player.height > catsblack.y
    // ) {
    //     catsblack.reached = true
    //     document.querySelector('#bottom-right > h2').innerText = 'You lose a life!'
    // }
}



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
    crazy.render()
    movingCats()
    // setX()
    // catsorange.render()
    // catsblack.render()
    // catsbrown.x += 4
    // catsbrown.x -= 10
    // catsbrown.x = game.width - catsbrown.height
    // catsorange.x -= 4
    // catsblack.y += 4
    // detectHit()
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