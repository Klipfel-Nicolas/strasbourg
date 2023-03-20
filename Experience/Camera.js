import * as THREE from 'three';
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.debug = this.experience.debug;

        this.createPerspectiveCamera(0, 45, 0)
        this.createOrthographicCamera(-10, 10, 0)
        this.setControls()

    }

    /**
     * Set Perspective Camera
     * @param {Number} positionX 
     * @param {Number} positionY 
     * @param {Number} positionZ 
     */
    createPerspectiveCamera(positionX, positionY, positionZ) {
        this.perspectiveCamera = new THREE.PerspectiveCamera(75, this.sizes.aspect, 0.1, 100000)
        this.perspectiveCamera.position.set(positionX, positionY, positionZ)
        this.scene.add(this.perspectiveCamera)

        //Debug
        if(this.debug.active) {
            this.debugPerspectiveCamera = this.debug.debugFolderCamera.addFolder('perspective')
            this.debugPositionPerspectiveCamera = this.debug.debugFolderCamera.addFolder('position')

            this.debugPositionPerspectiveCamera.add(this.perspectiveCamera.position, 'x').min(- 25).max(50).step(1).name('camera-X')
            this.debugPositionPerspectiveCamera.add(this.perspectiveCamera.position, 'y').min(- 25).max(50).step(1).name('camera-Y')
            this.debugPositionPerspectiveCamera.add(this.perspectiveCamera.position, 'z').min(- 25).max(50).step(1).name('camera-Z')
        }
        
    }

    /**
     * Create Orthograpique Camera Function
     * @param {Number} positionX 
     * @param {Number} positionY 
     * @param {Number} positionZ 
     */
    createOrthographicCamera(positionX, positionY, positionZ) {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        );

        this.orthographicCamera.position.y = positionY;
        this.orthographicCamera.position.z = positionZ;
        this.orthographicCamera.position.x = positionX;


        this.scene.add(this.orthographicCamera);

        //Debug
        if(this.debug.active) {
            this.debugOrtographicCamera = this.debug.debugFolderCamera.addFolder('ortographic')

            this.debugOrtographicCamera.add(this.orthographicCamera.position, 'x').min(- 25).max(50).step(1).name('camera-X')
            this.debugOrtographicCamera.add(this.orthographicCamera.position, 'y').min(- 25).max(50).step(1).name('camera-Y')
            this.debugOrtographicCamera.add(this.orthographicCamera.position, 'z').min(- 25).max(50).step(1).name('camera-Z')
        }

        // Helper
        /* this.helper = new THREE.CameraHelper( this.orthographicCamera );
        this.scene.add(this.helper) */

        // Helper
        /*  const size = 50;
        const divisions = 50;

        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper ); 

        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );*/
    }

    /**
     * Set Controls
     */
    setControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = true
    }

    // RESIZE 
    resize() {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height
        this.perspectiveCamera.updateProjectionMatrix()
    }

    //UPDATE
    update() {
        this.controls.update(); 

        /* this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update()
        this.helper.position.copy(this.orthographicCamera.position)
        this.helper.rotation.copy(this.orthographicCamera.rotation) */
    }
}