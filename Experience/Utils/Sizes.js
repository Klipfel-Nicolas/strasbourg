import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        this.width = document.querySelector('.landing-layout__experience').offsetWidth;
        this.height = document.querySelector('.landing-layout__experience').offsetHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.frustrum = 5

        window.addEventListener("resize", ()=>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit("resize");

        })
    }
}