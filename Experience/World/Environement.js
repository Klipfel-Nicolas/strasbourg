import * as THREE from 'three'

import Experience from "../Experience";

export default class Environment {
    constructor() {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        /* Add to camera
        this.setSunlight("#fff", 10, 27, -1, -11, "-1", true) */
        /*this.setSunlight("#fff", 10, 17, 6, 50, "-1", true)*/
        this.setSunlight("#fff", 10, 8, 6, 40, "-1", true) 
        this.setHemisphereLight(0xffffff, 1)

    }

    /**
     * Set SunLight Function
     * @param {String} color 
     * @param {Number} intensity 
     * @param {Number} positionX 
     * @param {Number} positionY 
     * @param {Number} positionZ
     * @param {String} debugIndex
     */
    setSunlight(color, intensity, positionX, positionY, positionZ, debugIndex, castShadow) {
        //Directional Light
        this.sunLight = new THREE.DirectionalLight(color, intensity);
        this.sunLight.castShadow = castShadow; 

        this.sunLight.shadow.mapSize = new THREE.Vector2(2048 * 2, 2048 * 2);
        this.sunLight.shadow.camera.bottom = -4;
        this.sunLight.shadow.camera.left = - 10;
        this.sunLight.shadow.camera.right = 10;
        this.sunLight.shadow.camera.near = 0.1;
        this.sunLight.shadow.camera.far = 60;
        this.sunLight.shadow.bias= -0.001;
        
        //Helper
        /*  const helper = new THREE.CameraHelper( this.sunLight.shadow.camera );
        this.scene.add(helper)

        const helperL = new THREE.DirectionalLightHelper( this.sunLight, 5 );
        this.scene.add( helperL);*/

        this.sunLight.position.set(positionX, positionY, positionZ);
        
       this.scene.add(this.sunLight);
        
       //Add light to the camera
       //this.experience.camera.perspectiveCamera.add(this.sunLight);

        //Debug
        if(this.debug.active) {
            this.debugSunFolder = this.debug.debugFolderLight.addFolder(`directional${debugIndex}`)
            this.debugShadowFolder = this.debugSunFolder.addFolder('shadow')

            let sunColor = {color: color}
            this.debugSunFolder.addColor(sunColor, 'color').onChange(()=>this.sunLight.color.set(sunColor.color))
            this.debugSunFolder.add(this.sunLight.position, 'x').min(- 25).max(150).step(1).name('sunLight-X')
            this.debugSunFolder.add(this.sunLight.position, 'y').min(- 25).max(150).step(1).name('sunLight-Y')
            this.debugSunFolder.add(this.sunLight.position, 'z').min(- 25).max(150).step(1).name('sunLight-Z')
            this.debugSunFolder.add(this.sunLight, 'intensity').min(0).max(10).step(.1).name('intensity')
            
            this.debugShadowFolder.add(this.sunLight.shadow, 'bias').min(-0.009).max(0).step(.001).name('bias')
            this.debugShadowFolder.add(this.sunLight.shadow, 'radius').min(0.5).max(5).step(.1).name('radius')
        }
    }

    /**
     * Set Ambiant Light
     * @param {String} color 
     * @param {Number} intensity 
     */
    setAmbiantLight(color, intensity) {
        this.ambiantLight = new THREE.AmbientLight( color, intensity )
        this.experience.camera.perspectiveCamera.add(this.ambiantLight)

        this.debugAmbientFolder = this.debug.debugFolderLight.addFolder('ambiant')

        let ambiantColor = {color: color}
        this.debugAmbientFolder.addColor(ambiantColor, 'color').onChange(()=>this.ambiantLight.color.set(ambiantColor.color));
        this.debugAmbientFolder.add(this.ambiantLight, 'intensity').min(0).max(10).step(.1).name('intensity')
    }

    /**
     * Set Hemisphere Light
     * @param {String} color 
     * @param {Number} intensity 
     */
    setHemisphereLight(color, intensity) {
        const light = new THREE.HemisphereLight(color, intensity);
        this.scene.add( light );
    }

    /**
     * Set background color scene
     * @param {String} color 
     */
    setBackgroundScene(color) {
        this.scene.background = new THREE.Color(color);
    }

}