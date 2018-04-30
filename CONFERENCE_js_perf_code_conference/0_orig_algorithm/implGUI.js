const EX_PRES = 5
const DEBUG = false
const CLEAN = true

let scope = {
    width: 0,
    height: 0,
    ctx: null
}

function initGUI () {
    let canvas = document.getElementById('view')
    if (canvas && canvas.getContext) {
        scope.width = window.innerWidth - 4
        scope.height = window.innerHeight - 4
        scope.center = {
            x: Math.round(scope.width / 2),
            y: Math.round(scope.height / 2)
        }

        canvas.width = scope.width
        canvas.height = scope.height

        scope.ctx = canvas.getContext('2d')

        scope.ctx.fillStyle = 'black'
        scope.ctx.fillRect(0,0,scope.width,scope.height)

        return true
    } else {
        return false
    }
}

function clean (ctx) {
    if (CLEAN) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0,scope.width,scope.height)
    }
}

function draw (points, view) {
    let ctx = scope.ctx
    clean(ctx)

    // let rect = getDrawRect(points)
    const POINT_SIZE = 1

    for (let i = 0; i < points.length; i++) {
        // ctx.fillStyle = randomColor()
        ctx.fillStyle = 'white'
        let x = points[i].x - view.x
        let y = points[i].y - view.y

        let kx = scope.width / view.width
        let ky = scope.height / view.height

        let screenX = Math.round(scope.center.x + x * kx)
        let screenY = Math.round(scope.center.y - y * ky)
        ctx.fillRect(
            screenX,
            screenY,
            POINT_SIZE,
            POINT_SIZE
        )
        printPointInfo(ctx, screenX, screenY, points[i])
    }

    printDataInfo(ctx, points, view)
}

function printPointInfo (ctx, screenX, screenY, point) {
    if (DEBUG) {
        ctx.fillText(
            `${point.m.toExponential(EX_PRES)}`,
            screenX + 10, screenY + 10
        )
        ctx.fillText(
            `(${point.x.toExponential(EX_PRES)}, ${point.y.toExponential(EX_PRES)}, ${point.z.toExponential(EX_PRES)})`,
            screenX + 10, screenY + 20
        )
        ctx.fillText(
            `(${point.vx.toExponential(EX_PRES)}, ${point.vy.toExponential(EX_PRES)}, ${point.vz.toExponential(EX_PRES)})`,
            screenX + 10, screenY + 30
        )
    }
}

function printDataInfo (ctx, points, view) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 120, 100)
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`points: ${points.length.toExponential(EX_PRES)}`, 10,10)
    ctx.fillText(`width: ${view.width.toExponential(EX_PRES)}`, 10,20)
    ctx.fillText(`height: ${view.height.toExponential(EX_PRES)}`, 10,30)
    ctx.fillText(`x: ${view.x.toExponential(EX_PRES)}`, 10,40)
    ctx.fillText(`y: ${view.y.toExponential(EX_PRES)}`, 10,50)
}

function randomColor () {
    const MIN = 100
    const MAX = 255

    let r = Math.round(MIN + Math.random() * (MAX - MIN))
    let g = Math.round(MIN + Math.random() * (MAX - MIN))
    let b = Math.round(MIN + Math.random() * (MAX - MIN))

    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    r = r.length === 1 ? `0${r}` : r
    g = g.length === 1 ? `0${g}` : g
    b = b.length === 1 ? `0${b}` : b

    return `#${r}${g}${b}`
}
