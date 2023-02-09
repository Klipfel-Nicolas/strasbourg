import * as THREE from 'three';
import Experience from '../Experience';
import { EventEmitter } from "events";

import Controls from './Controls';
import Environment from './Environement';
import City from './City';

export default class World extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.resources = this.experience.resources;
        
        //Ressources.js emit event
        this.resources.on("ready", ()=> {
            this.environment = new Environment();
            this.city = new City();
            this.controls = new Controls();  
     
            //this.controls = new Controls();
            this.emit("worldready");
        }); 
    }

    //RESIZE
    resize() {
    }

    //UPDATE
    update() {
        if(this.controls) {
            this.controls.update();
        }
    }
}