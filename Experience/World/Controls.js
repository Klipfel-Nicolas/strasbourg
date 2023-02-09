import * as THREE from "three";
import Experience from "../Experience";


export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.city = this.experience.world.city;

    this.lerp = {
        current: 0,
        target: 0,
        ease: 0.1
    }

    this.position = new THREE.Vector3( 0, 0, 0 );
    this.lookAtPosition = new THREE.Vector3( 0, 0, 0 );

    this.directionalVector = new THREE.Vector3(0, 0, 0)
    this.staticVector = new THREE.Vector3(0, 1, 0)
    this.crossVector = new THREE.Vector3(0, 0, 0)

    this.setPath();
    this.onWheel();
  }

  setPath() {
    this.curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -10, 10, 0 ),
        new THREE.Vector3( -8, 8, 4 ),
        new THREE.Vector3( -6, 6, 5 ),
        /* new THREE.Vector3( -4, 0, 6 ), */
    ]);

    //Create a visible line
    const points = this.curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    // Create the final object to add to the scene
    const curveObject = new THREE.Line( geometry, material );
    this.scene.add(curveObject)
  }

  handleOrtographicCamera(e) {
    if(e.deltaY > 0) {
      this.lerp.target += 0.05;
      this.back = false;

      if (this.lerp.target > 1 ) {

          this.lerp.target = 1
          this.lerp.current = 1

          
      }
    } else {
      if(!(this.camera.orthographicCamera.zoom > 1)) this.lerp.target -= 0.05;
        
        this.back = true;

        if (this.lerp.target < 0 ) {
          this.lerp.target = 0
          this.lerp.current = 0
        }
    }

    this.handleZoom()
  }

  handleZoom() {
    if(this.lerp.target >= 1){
      if(!this.back && this.camera.orthographicCamera.zoom < 2) this.camera.orthographicCamera.zoom += .05
      if(this.back && this.camera.orthographicCamera.zoom > 1) this.camera.orthographicCamera.zoom -= .05
      
      
    } /* else if(this.back && this.camera.orthographicCamera.zoom > 1) {
      this.camera.orthographicCamera.zoom -= .05
    } */

    this.camera.orthographicCamera.updateProjectionMatrix()
  }

  onWheel() {
    window.addEventListener('wheel', (e) => this.handleOrtographicCamera(e))
  }

  lerpInterpolation(start, end, amt) {
    return (1-amt) * start + amt * end
  }


  /**
   * Resize Function
   */
  resize() {}

  /**
   * Update Function
   */
  update() {
    
    
    this.lerp.current = this.lerpInterpolation(this.lerp.current, this.lerp.target, this.lerp.ease)
    

    this.curve.getPointAt(this.lerp.current, this.position)

    this.camera.orthographicCamera.position.copy(this.position)

    this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current % 1 )+ 0.000001), this.position);
    this.directionalVector.normalize();
    this.crossVector.crossVectors(
        this.directionalVector,
        this.staticVector,
    )
    
    this.camera.orthographicCamera.lookAt(2, 2.5, 3)
  }
}
