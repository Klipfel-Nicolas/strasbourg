import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import assets from "./Utils/assets.js";
import Camera from './Camera.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Renderer from './Renderer.js';
import Debug from './Utils/Debug.js';
import World from './World/World.js';
import CameraControls from './World/CameraControls';
import Ressources from './Utils/Ressources.js';
import PageHtml from './TemplateHtml/PageHtml.js';

export default class Experience {
    static instance
    constructor () {

        if(Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this

        this.gltfLoader = new GLTFLoader()
        this.canvas = document.querySelector('canvas.experience-canvas')
        this.debug = new Debug()
        
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resources = new Ressources(assets)
        this.world = new World()
        this.cameraControls = new CameraControls()
        this.renderer = new Renderer()
        
        
        this.pageHtml = new PageHtml()

        this.time = new Time();

        // EMIT LISTENER
        //On emit event from Size.js call the update function from here to update all the stuff
        this.sizes.on("resize", ()=> {
            this.resize();
        })

        //On emit event from Time.js call the update function from here to update all the stuff
        this.time.on("update", ()=> {
            this.update();
        })

    }

    /**
     * Update Material
     * @param {Boolean} castShadow 
     * @param {Boolean} receiveShadow 
     */
    updateAllMaterials(castShadow, receiveShadow) {
        this.scene.traverse((child) =>{
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                child.material.needsUpdate = true
                
                child.castShadow = castShadow
                child.receiveShadow = receiveShadow
            }
        })
    }

    // RESIZE 
    resize() {
        /* this.camera.resize(); */
        this.renderer.resize();
    }

    //UPDATE
    update() {
        this.camera.update();
        this.renderer.update();

        if(this.cameraControls) {
            this.cameraControls.update();
        }

        if(this.listHtml) {
            this.listHtml.update()
        }
    }
    
}