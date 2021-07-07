export const draggable = () => {
    let draggableNodes = document.getElementsByClassName("draggable")
    draggableNodes.forEach(draggableNode => {
        draggableNode.addEventListener("touchmove", (e) => drag(e, draggableNode))
    })
}
function drag(e, draggableNode) {
    if (e.touches[0].clientX > 50) {
        draggableNode.style.transition = "right 500ms ease-out"
        draggableNode.style.right = '-100%'
        draggableNode.removeEventListener("touchmove", (e) => drag(e, draggableNode))

    } else {
        draggableNode.style.transition = "none"
        draggableNode.style.right = `${ - e.touches[0].clientX + `px`}`
        console.log(`${e.touches[0].clientX + `px`}`)
    }
}
