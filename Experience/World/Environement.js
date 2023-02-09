import * as THREE from 'three'

import Experience from "../Experience";

export default class Environment {
    constructor() {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Light
        this.setSunlight("#fff", 1, -12 , 7, 3)
        /**/ this.setAmbiantLight("#fff", .2) 

    }

    /**
     * Set SunLight Function
     * @param {String} color 
     * @param {Number} intensity 
     * @param {Number} positionX 
     * @param {Number} positionY 
     * @param {Number} positionZ 
     */
    setSunlight(color, intensity, positionX, positionY, positionZ) {
        //Directional Light
        this.sunLight = new THREE.DirectionalLight(color, intensity);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        
        //Helper
        /* const helper = new THREE.CameraHelper( this.sunLight.shadow.camera );
        this.scene.add(helper) */

        this.sunLight.position.set(positionX, positionY, positionZ);
        //this.sunLight.position.set(-1, -1, 1);
        
        this.scene.add(this.sunLight);

        //Debug
        if(this.debug.active) {
            this.debugSunFolder = this.debug.debugFolderLight.addFolder('sun')

            let sunColor = {color: color}
            this.debugSunFolder.addColor(sunColor, 'color').onChange(()=>this.sunLight.color.set(sunColor.color))
            this.debugSunFolder.add(this.sunLight.position, 'x').min(- 25).max(50).step(1).name('sunLight-X')
            this.debugSunFolder.add(this.sunLight.position, 'y').min(- 25).max(50).step(1).name('sunLight-Y')
            this.debugSunFolder.add(this.sunLight.position, 'z').min(- 25).max(50).step(1).name('sunLight-Z')
        }
    }

    /**
     * Set Ambiant Light
     * @param {String} color 
     * @param {Number} intensity 
     */
    setAmbiantLight(color, intensity) {
        this.ambiantLight = new THREE.AmbientLight( color, intensity )
        this.scene.add(this.ambiantLight)
    }

    /**
     * Set background color scene
     * @param {String} color 
     */
    setBackgroundScene(color) {
        this.scene.background = new THREE.Color(color);
    }

}