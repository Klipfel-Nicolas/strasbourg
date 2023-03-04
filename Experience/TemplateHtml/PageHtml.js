import ListHtml from "./Components/ListHtml";
import TitleHtml from "./Components/TitleHtml";

export default class PageHtml {
  static instance
  constructor() {

    if(PageHtml.instance) {
      return PageHtml.instance
    }
    PageHtml.instance = this

    this.list = new ListHtml()
    this.title = new TitleHtml("Strasbourg")
  }

  /**
   * 
   * @param {String} scriptId 
   */
  compileTemplate(scriptId) {
    this.template = Handlebars.compile(document.querySelector(scriptId).innerHTML) 
  }

  /**
   * 
   * @param {String} htmlId 
   * @param {Object} datas
   */
  fillHtml(htmlId, datas) {
    document.querySelector(htmlId).innerHTML = this.template(datas);
  }


  // Loop

  update() {
    
  }

  // Listeners

  addEventListeners() {}

  removeEventListeners() {}

  // Destroy

  destroy() {
  }
}
