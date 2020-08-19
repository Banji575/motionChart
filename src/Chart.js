import Canvas from './Canvas';
import Objectfactory from './ObjectFactory';
import {
    isArrFullTrue
} from './utils'

const pointCoord = [{
        type: 'point',
        x: 20,
        y: 50,
        radius: 1
    },
    {
        type: 'point',
        x: 40,
        y: 60,
        radius: 1
    },
    {
        type: 'point',
        x: 55,
        y: 20,
        radius: 1
    },
    {
        type: 'point',
        x: 80,
        y: 48,
        radius: 1
    },
    {
        type: 'point',
        x: 130,
        y: 100,
        radius: 1
    },
    {
        type: 'point',
        x: 170,
        y: 30,
        radius: 1
    },
    {
        type: 'point',
        x: 220,
        y: 78,
        radius: 1
    },
]
const pointCoord2 = [{
        type: 'point',
        x: 15,
        y: 10,
        radius: 1
    },
    {
        type: 'point',
        x: 30,
        y: 25,
        radius: 1
    },
    {
        type: 'point',
        x: 49,
        y: 98,
        radius: 1
    },
    {
        type: 'point',
        x: 106,
        y: 11,
        radius: 1
    },
    {
        type: 'point',
        x: 130,
        y: 144,
        radius: 1
    },
    {
        type: 'point',
        x: 210,
        y: 50,
        radius: 1
    },
    {
        type: 'point',
        x: 231,
        y: 11,
        radius: 1
    },
]

export default class Chart extends Canvas {
    constructor(root, width, height) {
        super(root, width, height)
        this.DomListener = Objectfactory.createObject('DomListener', this.root)
        this.a = 1
        this.b = 2
        this.state = {
            currentChart: null,
            newChart: null,
            isEdgeChart: true
        }
        this.baseCoord = {
            x0: 0,
            x1: height,
            y0: 0,
            y1: width
        }
    }

    createChartAxis() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = '#000'
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(0, 150)
        this.ctx.moveTo(0, 150)
        this.ctx.lineTo(300, 150)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    createPoint() {
        if (this.state.isEdgeChart) {
            this.state.currentChart = pointCoord.map(point => {
                return Objectfactory.createObject(point.type, point)
            })
            this.state.newChart = pointCoord2.map(point => {
                return Objectfactory.createObject(point.type, point)
            })
        } else {
            this.state.currentChart = pointCoord2.map(point => {
                return Objectfactory.createObject(point.type, point)
            })
            this.state.newChart = pointCoord.map(point => {
                return Objectfactory.createObject(point.type, point)
            })
        }
    }


    renderPoint() {
        this.state.currentChart.forEach((el, i, arr) => {
            if (i < arr.length - 1) {
                const nextEl = arr[i + 1]
                this.ctx.beginPath()
                this.ctx.strokeStyle = 'black'
                this.ctx.lineWidth = 1
                this.ctx.moveTo(el.x, el.y)
                this.ctx.lineTo(nextEl.x, nextEl.y)
                this.ctx.stroke()
                this.ctx.closePath()
            }
            this.ctx.beginPath()
            this.ctx.fillStyle = 'yellow'
            this.ctx.arc(el.x, el.y, el.radius, 0, 360)
            this.ctx.fill()
            this.ctx.closePath()
        })
    }

    animate() {
        const readyArr = []
        const animation = () => {
            this.state.currentChart.map((el, i) => {
                const newEl = this.state.newChart[i]
                if (newEl.x > el.x) {
                    el.x += 1
                    readyArr[i] = false
                } else if (newEl.x < el.x) {
                    el.x -= 1
                    readyArr[i] = false
                }
                if (newEl.y > el.y) {
                    el.y += 1
                    readyArr[i] = false
                } else if (newEl.y < el.y) {
                    el.y -= 1
                    readyArr[i] = false
                } else if (newEl.x === el.x && newEl.y === newEl.y) {
                    readyArr[i] = true

                }
            })

            this.ctx.clearRect(0, 0, 300, 300)
            this.createChartAxis()
            this.renderPoint(pointCoord)
            const requestFrame = window.requestAnimationFrame(animation)

            if (!isArrFullTrue(readyArr) && readyArr.length === this.state.currentChart.length) {
                this.state.isEdgeChart = !this.state.isEdgeChart
                this.createPoint()
                cancelAnimationFrame(requestFrame)
            }
        }
        animation()
    }


    init() {
        this.createPoint()
        console.log(this.state)
        this.render()
        this.createChartAxis()
        this.renderPoint(pointCoord)
        this.DomListener.on('click', () => this.animate())
    }
}