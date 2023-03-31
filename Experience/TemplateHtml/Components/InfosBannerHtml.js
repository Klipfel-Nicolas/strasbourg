import PageHtml from "../PageHtml";
import { EventEmitter } from "events";


export default class InfosBannerHtml extends EventEmitter{
    constructor(coord) {
        super();

        this.page = new PageHtml();

        //Set city Coord
        this.cityCoord = coord;
        this.setCoordInnerHtml(this.cityCoord)

        this.htmlElement = document.getElementById('infosBanner-html');

        //Handle list element Focus
        this.page.list.on("elementFocused", (elementDatas) => {
            this.htmlElement.classList.add('active')
            this.setElementFocusedInfos(elementDatas)
        })

        //Handle element focus out
        this.page.list.on("no-elementFocused", () => {
            this.htmlElement.classList.remove('active')
            this.setCoordInnerHtml(this.cityCoord)
        })
        
    }

    /**
     * Compile handlebar template
     * @param {object} datas 
     */
    async setElementFocusedInfos(datas) {
        console.log(Object.keys(datas.infos)[0])
        this.page.innerContent("#infosBanner-js", "#infosBanner-html", {
            desc1: datas.desc1,
            desc2: datas.desc2,
            info_key1: Object.keys(datas.infos)[0],
            info_value1: Object.values(datas.infos)[0],
            info_key2: Object.keys(datas.infos)[1],
            info_value2: Object.values(datas.infos)[1],
            info_key3: Object.keys(datas.infos)[2],
            info_value3: Object.values(datas.infos)[2],
            image1: datas.img[0],
            image2: datas.img[1],
            image3: datas.img[2],
        }) 

        this.setCoordInnerHtml(datas.coord)
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

    setCoordInnerHtml(coord) {

        let html = `
                <div>${coord.north}</div>
                <div>${coord.east}</div>
        `

        document.getElementById('coord').innerHTML = html
    }

    /**
   * Update Function
   */
  update() {

  }
}