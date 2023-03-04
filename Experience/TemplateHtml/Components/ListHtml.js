import Experience from "../../Experience";
import PageHtml from "../PageHtml";

import elements from '../../../datas/elements';


export default class ListHtml {
    constructor() {
        this.experience = new Experience();
        this.cameraControls = this.experience.cameraControls;

        this.page = new PageHtml();

        this.data = {
            list: elements.map(element => {
                return element
            })
        }

        
        
        
        this.page.compileTemplate("#elementsList-js")
        this.page.fillHtml("#elementsList-html", this.data)
        
        this.listElements = document.querySelectorAll('.listElement');

        this.eventsListener();
    }

    updateListElement() {
        this.listElements = document.querySelectorAll('.listElement');
    }

    eventsListener() {
        this.listElements.forEach(element => {
            element.addEventListener('click', () => {
                this.data.title = "Hey"
                this.page.compileTemplate('#mainTitle-js')
                this.page.fillHtml('#mainTitle-html', this.data)
                this.cameraControls.eventFocusIn(element.dataset.position, element.dataset.look) 
            })
        })

        window.addEventListener('wheel', (e) => this.cameraControls.eventFocusOut(e))
    }

    /**
   * Update Function
   */
  update() {

  }
}