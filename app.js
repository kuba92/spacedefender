
const bullets = []
// pobranie elementów

const playerElement = document.querySelector('#player')
const boardElement = document.querySelector('#game-board')

const movePlayer = (direction) => {
    // pobierz nową pozycję player
    const newPosition = playerElement.offsetLeft + direction * 10

    // pobierz pozycję planszy
    const { left, right } = boardElement.getBoundingClientRect()
    const minLeft = playerElement.offsetWidth / 2
    const maxRight = right - left - minLeft

    // przesuń playera, jeśli mieści się w planszy
    if(newPosition >= minLeft && newPosition < maxRight){
        playerElement.style.left = `${newPosition}px`
    }

}

const createBullet = () => {
    // zdefiniuj pocisk
    const bullet = document.createElement('div')
    bullet.className = 'bullet'
    bullet.style.left = `${playerElement.offsetLeft}px`
    bullet.style.bottom = `${playerElement.offsetHeight}px`

    // dodaj pocisk
    boardElement.appendChild(bullet)
    bullets.push(bullet)

}

const handleKeyboard = (e) => {
    switch (e.code){
        case 'ArrowLeft': movePlayer(-1); break
        case 'ArrowRight' : movePlayer(1); break
        case 'Space' : createBullet()
    }
}

// obsłużenie klawiatury
window.addEventListener('keydown', handleKeyboard)

const moveBullets = () => {
    for (let i = 0; i<bullets.length; i++){
        const bullet = bullets[i]

        // przesuń pocisk
        bullet.style.top = `${bullet.offsetTop - 10}px`

        if (bullet.offsetTop <=0){
            // usuń pocisk jeśli jest poza mapą
            bullets.splice(i, 1)
            i--
            bullet.remove()
        }
    }
}

// interwały
setInterval(moveBullets, 250)