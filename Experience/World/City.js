import * as THREE from 'three';
import Experience from '../Experience';

export default class City {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.city = this.resources.items.strasbourg.scene;

        this.setModel(.02, .02, .02)
    }

    /**
     * 
     * @param {Number} scaleX 
     * @param {Number} scaleY 
     * @param {Number} scaleZ 
     */
    setModel(scaleX, scaleY, scaleZ) {
        this.city.children.forEach(child => {
            if(child.name == 'Cathedral') {
                console.log(child)
            }
            
        })

        this.city.scale.set(scaleX, scaleY, scaleZ)
        this.scene.add(this.city)

        this.experience.updateAllMaterials(true, true)
    }
}