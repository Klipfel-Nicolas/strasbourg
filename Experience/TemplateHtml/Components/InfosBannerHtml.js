import PageHtml from "../PageHtml";
import { EventEmitter } from "events";


export default class InfosBannerHtml extends EventEmitter{
    constructor() {
        super();

        this.page = new PageHtml();

        this.htmlElement = document.getElementById('infosBanner-html');

        //Handle list element Focus
        this.page.list.on("elementFocused", (elementDatas) => {
            this.htmlElement.classList.add('active')
            this.setElementFocusedInfos(elementDatas)
        })

        this.page.list.on("no-elementFocused", () => {
            this.htmlElement.classList.remove('active')
        })
        
        this.page.compileTemplate("#infosBanner-js")
        
    }

    /**
     * Compile handlebar template
     * @param {object} datas 
     */
    async setElementFocusedInfos(datas) {
        this.page.innerContent("#infosBanner-js", "#infosBanner-html", {
            description: datas.description,
        })

        await this.setSvgElement(datas.svg)
    }

    /**
     * Get svg path
     * @param {string} svg 
     * @returns 
     */
    async setSvgElement(svg) {
        this.svgElement = document.getElementById('svg-infos')
        
        return await fetch(svg)
                .then((res) => {
                return res.text()  
                })
                .then(text => {
                    this.svgElement.innerHTML = text
                })
                .catch(console.error.bind(console));
    }

    /**
   * Update Function
   */
  update() {

  }
}