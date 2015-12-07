function createMoveTask(toX, toY) {
    return task = {
        type: "move",
        x: toX,
        y: toY
    }

}
function createKillTask(targetID) {
    return task = {
        type: "kill",
        target: targetID
    }
}
function createAttackTask(targetID) {
    return task = {
        type: "attack",
        target: targetID
    }
}