import PageHtml from "../PageHtml";
import Experience from "../../Experience";
import { EventEmitter } from "events";

import elements from '../../../datas/elements';


export default class ListHtml extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.cameraControls = this.experience.cameraControls;

        this.page = new PageHtml();

        this.data = {
            list: elements.map(element => {
                return element
            })
        }

        this.page.innerContent("#elementsList-js", "#elementsList-html", this.data)
        
        this.listElements = document.querySelectorAll('.listElement-js');

        this.eventsListener();
    }

    eventsListener() {
        this.listElements.forEach(element => {  
            element.addEventListener('click', () => {
                //Get element focused datas
                const elementDatas = this.data.list.filter(listEl => listEl.name === element.innerText)[0]
                
                if(!this.cameraControls.cameraState.isFocus && !this.cameraControls.cameraState.isMoving) {
                    this.emit("elementFocused", elementDatas);
                    this.cameraControls.eventFocusIn(element.dataset.position, element.dataset.look) 
                }
            })       
        })

        window.addEventListener('wheel', (e) => {
            if(!this.cameraControls.cameraState.isMoving) {
                this.cameraControls.eventFocusOut(e)
            this.emit("no-elementFocused");  
            }
        })
    }

    /**
   * Update Function
   */
  update() {

  }
}