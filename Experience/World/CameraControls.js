import * as THREE from "three";
import Experience from "../Experience";
import { EventEmitter } from "events";


export default class CameraControls extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.city = this.experience.world.city;

    this.lerp = {
        current: 0,
        alpha: 0.05
    }

    this.cameraState = {
      isMoving: false,
      isFocus: false,
      moveForward: false,
      moveBack: false
    }

    this.targetQuaternion = new THREE.Quaternion();
    this.rotationMatrix = new THREE.Matrix4();

    //Give in parametre
    this.elementTargetPosition = new THREE.Vector3( -1.04, 4.99, 6.90 )
    this.lookAtPosition = new THREE.Vector3( 3, 2, 3 )

    this.setTargetPosition(this.elementTargetPosition.clone())
 
    this.eventsListener();
  }

  /**
   * Move camera to
   * @param {Vector 3} cameraTarget 
   * @param {Number} cameraLerpAlpha 
   */
  lerpFocusCamera(cameraTarget, cameraLerpAlpha) {

    this.camera.controls.enabled = false;

    this.handleCameraPosition(cameraTarget, cameraLerpAlpha)
    this.handleCameraFovZoom(35, 75, 0.5);
    this.handleLerpComplete(0.009)
    
  }

  /**
   * Handle forward camera movement
   * @param {Vector 3} cameraTarget 
   * @param {Number} cameraLerpAlpha 
   */
  handleCameraPosition(cameraTarget, cameraLerpAlpha) {
    if(this.cameraState.moveForward) {
      this.camera.perspectiveCamera.quaternion.rotateTowards(this.targetQuaternion, .05)
      this.camera.controls.target.lerp(this.lookAtPosition, .05)
    } else {
      this.camera.controls.target.lerp(new THREE.Vector3(0, 0, 0), .05)
    }

    //Move the camera on target (lerp from three.js)
    this.camera.perspectiveCamera.position.lerp(cameraTarget, cameraLerpAlpha)
  }

  /**
   * Zoom In smoothly (With FOV)
   * @param {Number} min 
   * @param {Number} max 
   * @param {Float} ease 
   */
  handleCameraFovZoom(min, max, ease) {
    if(this.camera.perspectiveCamera.fov >= min && this.cameraState.moveForward ) {
      this.camera.perspectiveCamera.fov -= ease;
    } else if (this.camera.perspectiveCamera.fov <= max && this.cameraState.moveBack) {
      this.camera.perspectiveCamera.fov += ease;
    }
    
    this.camera.perspectiveCamera.updateProjectionMatrix();    
  }

  /**
   * Increment and handle the end of lerp animation
   * @param {Float} increment 
   */
  handleLerpComplete(increment) {
    //Increment to handle lerpComplete
    this.lerp.current += increment;
    
    if (this.lerp.current > 1){     
      this.onLerpComplete();
    } 
  }

   /**
   * Lerp camera animation complete
   * reset all value
   */
   onLerpComplete() {
    this.cameraState.isMoving = false
    this.cameraState.moveForward = false;
    this.cameraState.moveBack = false
    
    this.lerp.current = 0

    this.camera.controls.enabled = true;
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
   * Set the target position
   * @param {Vector3} targetPosition 
   */
  setTargetPosition(targetPosition) {
    this.targetPosititon = targetPosition;
  }

  /**
   * Save the last postion before the focus
   * @param {Vector3} lastPosition 
   */
  setLastPosition(lastPosition) {
    this.lastPosition = lastPosition;
  }

  /**
   * onClick (zoom in on target)
   */
  eventFocusIn(target, lookAt) {
    console.log(target)
    console.log(lookAt)
    
    this.setTargetQuaternion(this.camera.perspectiveCamera.position, this.lookAtPosition, this.camera.perspectiveCamera.up)
    
    if(!this.cameraState.isFocus) {
      this.setLastPosition(this.camera.perspectiveCamera.position.clone())
      this.setTargetPosition(this.elementTargetPosition.clone())
      
      this.cameraState.isMoving = true;
      this.cameraState.moveForward = true;
      this.cameraState.isFocus = true;
    } 
  }

  /**
   * Wheel event (zoom Back)
   * @param {Event} e 
   */
  eventFocusOut(e) {
    if(!this.cameraState.isMoving && this.cameraState.isFocus){

      if (e.deltaY < 0) {

        this.targetPosititon = this.lastPosition;
        this.cameraState.moveBack = true;
        this.cameraState.isMoving = true;
        this.cameraState.isFocus = false;
      } 
    }
  }

  // EVENT LISTENER
  eventsListener() {
    /* document.querySelector('#cameraBtn').addEventListener('click', this.eventFocusIn.bind(this))
    window.addEventListener('wheel', this.eventFocusOut.bind(this)) */
  }


  /**
   * Resize Function
   */
  resize() {}

  /**
   * Update Function
   */
  update() {
    if(this.cameraState.isMoving) {
      this.lerpFocusCamera(this.targetPosititon, this.lerp.alpha)
    }
  }
}
