// Js event codes
// https://keycode.info/
const CONTROLS = {
    // Arrow keys
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    // WASD keys
    W: 87,
    A: 65,
    S: 83,
    D: 68,
}

const isPressingJump = () => keyIsDown(CONTROLS.UP) || keyIsDown(CONTROLS.W)
const isPressingLeft = () => keyIsDown(CONTROLS.LEFT) || keyIsDown(CONTROLS.A)
const isPressingRight = () => keyIsDown(CONTROLS.RIGHT) || keyIsDown(CONTROLS.D)
