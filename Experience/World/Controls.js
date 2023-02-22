import * as THREE from "three";
import Experience from "../Experience";
import { EventEmitter } from "events";


export default class Controls extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.city = this.experience.world.city;

    this.lerp = {
        current: 0,
        target: 0,
        alpha: 0.05
    }

    this.cameraMove = {
      isMoving: false,
      isZoomed: false,
      forward: false,
      back: false
    }

    this.targetQuaternion = new THREE.Quaternion();
    this.rotationMatrix = new THREE.Matrix4();

    //Give in parametre
    this.elementTargetPosition = new THREE.Vector3( -1.04, 4.99, 6.90 )
    this.lookAtPosition = new THREE.Vector3( 3, 2, 3 )

    
    this.targetPosititon = this.elementTargetPosition.clone();
    this.lastPosition = new THREE.Vector3(0, 25, 0)
 
    this.eventsListener();
  }

  /**
   * Set the camera quaternion (rotation from camera to target)
   * @param {Vector3} eyes 
   * @param {Vector3} target 
   * @param {Vector3} up 
   */
  setTargetQuaternion(eyes, target, up) {
    this.rotationMatrix.lookAt(eyes, target, up)
    this.targetQuaternion.setFromRotationMatrix(this.rotationMatrix)
  }

  /**
   * Move camera to
   * @param {Vector 3} cameraTarget 
   * @param {Number} cameraLerpAlpha 
   */
  lerpCamera(cameraTarget, cameraLerpAlpha) {

    this.camera.controls.enabled = false;

    if(this.cameraMove.forward) {
      this.camera.perspectiveCamera.quaternion.rotateTowards(this.targetQuaternion, .05)
      this.camera.controls.target.lerp(this.lookAtPosition, .05)
    } else {
      this.camera.controls.target.lerp(new THREE.Vector3(0, 0, 0), .05)
    }
    

    //Move the camera on target (lerp from three.js)
    this.camera.perspectiveCamera.position.lerp(cameraTarget, cameraLerpAlpha)
    this.camera.controls.update(); 

    //Handle Zoom 
    this.fovZoomCamera();
    
    //Increment to handle lerpComplete
    this.lerp.current += 0.009;
    if (this.lerp.current > 1){     
      this.onLerpComplete(cameraTarget);
    } 
  }

  /**
   * Zoom In smoothly
   */
  fovZoomCamera() {
    if(this.camera.perspectiveCamera.fov >= 35 && this.cameraMove.forward ) {
      this.camera.perspectiveCamera.fov -= .5;
    } else if (this.camera.perspectiveCamera.fov <= 75 && this.cameraMove.back) {
      this.camera.perspectiveCamera.fov += .9;
    }
    
    this.camera.perspectiveCamera.updateProjectionMatrix();    
  }

  /**
   * Lerp camera animation complete
   * @param {Vector3} cameraTarget 
   */
  onLerpComplete(cameraTarget) {
    // Finish the movement and reset all value
    /* this.camera.perspectiveCamera.position.lerp(cameraTarget, 1); */
    this.cameraMove.isMoving = false
    this.lerp.alpha = 0.05
    this.lerp.current = 0

    this.cameraMove.forward = false;
    this.cameraMove.back = false

    this.camera.controls.enabled = true;

  }

  /**
   * onClick (zoom in on target)
   */
  onClickAnimation() {
    
    this.setTargetQuaternion(this.camera.perspectiveCamera.position, this.lookAtPosition, this.camera.perspectiveCamera.up)
    
    if(!this.cameraMove.isZoomed) {
      this.lastPosition = this.camera.perspectiveCamera.position.clone();
      this.targetPosititon = this.elementTargetPosition.clone();
      
      this.cameraMove.isMoving = true;
      this.cameraMove.forward = true;
      this.cameraMove.isZoomed = true;
    } 
  }

  /**
   * Wheel event (zoom Back)
   * @param {Event} e 
   */
  onWheel(e) {
    if(!this.cameraMove.isMoving && this.cameraMove.isZoomed){

      if (e.deltaY < 0) {

        this.targetPosititon = this.lastPosition;
        this.cameraMove.back = true;
        this.cameraMove.isMoving = true;
        this.cameraMove.isZoomed = false;
      } 
    }
  }

  // EVENT LISTENER
  eventsListener() {
    document.querySelector('#cameraBtn').addEventListener('click', this.onClickAnimation.bind(this))
    window.addEventListener('wheel', this.onWheel.bind(this))
  }


  /**
   * Resize Function
   */
  resize() {}

  /**
   * Update Function
   */
  update() {

    if(this.cameraMove.isMoving) {
      this.lerpCamera(this.targetPosititon, this.lerp.alpha)
    }
  }
}
