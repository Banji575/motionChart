export default class Canvas {
    constructor(root, width, height) {
        this.root = document.querySelector(root);
        this.width = width;
        this.height = height;
        this.ctx = null
    }


    render() {
        const canvas = document.createElement('canvas');
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';
        canvas.setAttribute('id', 'canvas')

        this.ctx = canvas.getContext('2d')
        this.root.append(canvas)
    }
}