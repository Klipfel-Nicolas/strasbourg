import * as THREE from 'three'
import Experience from '../Experience';
import { EventEmitter } from "events";

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
            this.setPlane(1000, 1000, 0x060606) 
     
            this.emit("worldready");
        }); 
        
    }

    /**
     * 
     * @param {number} geometryX 
     * @param {number} geometryZ 
     * @param {*} color 
     */
    setPlane(geometryX, geometryZ, color) {
        const geometry = new THREE.PlaneGeometry(geometryX, geometryZ);
        const material = new THREE.MeshStandardMaterial( {color: color, side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.receiveShadow = true
    
        this.plane.rotateX(Math.PI / 180 * 90)
        this.plane.position.y = 3;
        this.scene.add( this.plane );
    }

    //RESIZE
    resize() {
    }

    //UPDATE
    update() {
        
    }
}