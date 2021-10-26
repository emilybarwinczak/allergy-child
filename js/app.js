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

// let player = new Crawler(50, 630, 'blue', 16, 16)
let player = new Crawler(50, 130, 'blue', 16, 16)
let friendshouse = new Crawler(750, 150, 'black', 48, 32)
console.log('this is the player', player)
console.log('this is the friends house', friendshouse)

// Here we're going to set up our movement handler
// the movementhandler will be an event listener
// we'll use the WASD keys to move the player around the canvas
// we're going to use switch case here, but you can also use if...else, the two in this case are interchangeable
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
        // reach friend's house
        // return friendshouse.reached = true
        friendshouse.reached = true
        // this is not quite where we want to stop our loop
        // stopGameLoop()
        document.querySelector('#bottom-right > h2').innerText = 'You Win!'
    }
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
    detectHit()
    if (friendshouse.reached) {
        stopGameLoop()
        // add in our detection to see if the hit has been made
        console.log('You win!')
    }
    // render our player
    player.render()
}

// we also need to declare a function that will stop our animation loop

// add event listener for player movement
document.addEventListener('keydown', movementHandler)
// the timing function will determine how and when our game animates
let gameInterval = setInterval(gameLoop, 70)