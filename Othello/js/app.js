const model = new Array(64).fill(0)


const coordinateToIndex = ([x, y]) => x + y * 8
const indexToCoordinate = i => [i % 8, (i - (i % 8)) / 8]
const indexSwitch = i => ([x, y] = indexToCoordinate(i)) => x + 8 * (7 - y)

model[coordinateToIndex([3, 3])] = 2
model[coordinateToIndex([3, 4])] = 1
model[coordinateToIndex([4, 3])] = 1
model[coordinateToIndex([4, 4])] = 2

let nextStatus = 1
let result = []
let canMove = []

// update
function update() {
  result = []
  canMove = []
  model.forEach((disc, i) => {
    if (disc === 3 - nextStatus) {
      const discCoordinate = indexToCoordinate(i)
      const eachDirection = checkDirection(discCoordinate)
      result = result.concat(eachDirection)
      canMove = canMove.concat(eachDirection.map(item => item[0]))
    }
  })
}
// check validate coordinate
function checkCoordinateValid(coordinate) {
  const [x, y] = coordinate
  if (x < 0 || x > 7 || y < 0 || y > 7) return false 
  if (model[coordinateToIndex([x, y])] !== 0) return false
  return true
}

// check direction
function checkDirection(centerCoordinate) {
  const [cx, cy] = centerCoordinate
  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]
  const rel = []
  for (direction of directions) {
    let [x, y] = [cx, cy]
    const sx = x + direction[0]
    const sy = y + direction[1]
    const start = [sx, sy]
    let data = [coordinateToIndex(start), coordinateToIndex([cx, cy])]
    let directionCanMove = false
    if (!checkCoordinateValid(start)) continue
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      x -= direction[0]
      y -= direction[1]
      const i = coordinateToIndex([x, y])
      if (model[i] === 3 - nextStatus) {
        data.push(i)
      }
      if (model[i] === nextStatus) {
        directionCanMove = true
        break
      }
      if (model[i] === 0) {
        data = []
        break
      }
    }
    if (directionCanMove && data.length) {
      rel.push(data)
    }
    directionCanMove = false
  }
  return rel
}

update()
