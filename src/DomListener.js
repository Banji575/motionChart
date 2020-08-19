export default class DomListener{
    constructor(root){
        this.root = root
    }

    on(event, callback){
        this.root.addEventListener(event, callback)
    }
}