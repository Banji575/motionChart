export default class Point {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    getPoint() {
        return {
            x: this.x,
            y: this.y,
            radius: this.radius
        }
    }

    move(x, y) {
        this.x = this.x - x
        this.y = this.y - y
        return this.getPoint()
    }
}