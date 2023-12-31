export default function createKeyboardListener() {
    const state = {
        observers: [],
        playerId:null
    }
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }
    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(event) {
        const keyPressed = event.key
        const command = {
            playerId: 'player1',
            keyPressed
        }
        notifyAll(command)
    }
    return {
        subscribe
    }
}