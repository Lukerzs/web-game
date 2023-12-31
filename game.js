export default function createGame() {

    const state = {
        players: {player1:{x:0,y:0}},
        fruits: {}

    }
    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }

    }
    function removePlayer(command) {
        playerId = command.playerId

        delete state.players[playerId]
    }
    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }
    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }
    
    function movePlayer(command) {
        console.log(`game.movePlayer() Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptdMoves = {
            ArrowUp(player) {
                console.log('Moving Up')
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                }

            },
            ArrowDown(player) {
                console.log('Moving Down')
                if (player.y + 1 < screen.height) {
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player) {
                console.log('Moving Left')
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                }
            },
            ArrowRight(player) {
                console.log('Moving Right')
                if (player.x + 1 < screen.width) {
                    player.x = player.x + 1
                }
            }
        }

        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]
        const moveFunction = acceptdMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
        function checkForFruitCollision(playerId) {
            const player = state.players[playerId]

            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]
                if (player.x === fruit.x && player.y === fruit.y) {
                    removeFruit({fruitId: fruitId})
                }
            }


        }
    }
    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}