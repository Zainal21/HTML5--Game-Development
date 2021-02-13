function domUpdate() {
  const cells = document.querySelectorAll('.o-cell')
  const canMoveDom = canMove.map(i => indexSwitch(i)())
  ;[...cells].forEach((cell, i) => {
    const index = indexSwitch(i)()
    console.log(index)
    if (model[index] === 1) {
      cell.className = 'o-cell o-cell_black'
    } else if (model[index] === 2) {
      cell.className = 'o-cell o-cell_white'
    } else if (canMoveDom.includes(i)) {
      cell.className = 'o-cell o-cell_active'
    } else {
      cell.className = 'o-cell'
    }
  })
}
const container = document.getElementById('o-container')
container.innerHTML = ''
const block = document.createDocumentFragment()
const canMoveDom = canMove.map(i => indexSwitch(i)())
for (let i = 0; i < 64; i++) {
  const cell = document.createElement('div')
  cell.className = 'o-cell'
  block.appendChild(cell)
}
container.appendChild(block)
domUpdate()
container.addEventListener('click', function(e) {
  const { children } = this
  let domIndex = [...children].indexOf(e.target)
  let modelIndex = indexSwitch(domIndex)()
  if (canMove.includes(modelIndex)) {
    result
      .filter(direction => direction[0] === modelIndex)
      .forEach(item => item.forEach(i => (model[i] = nextStatus)))
    nextStatus = 3 - nextStatus
    update()
    domUpdate()
  }
})