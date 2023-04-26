import Experience from '../Experience';

export default class City {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.city = this.resources.items.strasbourg.scene;
        this.debug = this.experience.debug;

        this.setModel(1, 1, 1);
        this.city.position.y = 3;
    }

    /**
     * 
     * @param {Number} scaleX 
     * @param {Number} scaleY 
     * @param {Number} scaleZ 
     */
    setModel(scaleX, scaleY, scaleZ, positionX, positionY, positionZ) {
        this.city.children.forEach(child => {
            if(child.name == 'Cathedral') {
                console.log(child)
            }  
        })

        this.city.scale.set(scaleX, scaleY, scaleZ)
        this.scene.add(this.city)
        this.experience.updateAllMaterials(true, true)

        //DEBUG
        this.debugPositionModel = this.debug.debugFolderModel.addFolder('position')

        this.debugPositionModel.add(this.city.position, 'x').min(- 25).max(50).step(1).name('city-X')
        this.debugPositionModel.add(this.city.position, 'y').min(- 25).max(50).step(1).name('city-Y')
        this.debugPositionModel.add(this.city.position, 'z').min(- 25).max(50).step(1).name('city-Z')
    }
}