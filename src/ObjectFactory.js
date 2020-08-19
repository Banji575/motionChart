import Point from "./Point";
import DomListener from "./DomListener";

export default class Objectfactory{
    constructor(){

    }

    static createObject(type, options){
        switch (type) {
            case 'point':
                return new Point(options.x, options.y, options.radius)
            case 'DomListener':
                return new DomListener(options)
            default:
                break;
        }
    }
}