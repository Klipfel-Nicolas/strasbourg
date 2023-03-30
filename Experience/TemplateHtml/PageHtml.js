import ListHtml from "./Components/ListHtml";
import TitleHtml from "./Components/TitleHtml";
import WeatherHtml from "./Components/WeatherHtml";
import InfosBannerHtml from "./Components/InfosBannerHtml";

export default class PageHtml {
  static instance
  constructor() {

    if(PageHtml.instance) {
      return PageHtml.instance
    }
    PageHtml.instance = this;

    this.compilePage()
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
    document.querySelector(htmlId).innerHTML = template(datas);
  }

  innerContent(scriptId, htmlId, datas) {
    this.template = Handlebars.compile(document.querySelector(scriptId).innerHTML);
    document.querySelector(htmlId).innerHTML = this.template(datas);
  }

  /**
   * Compile the page with all html class
   */
  async compilePage() {

    this.list = new ListHtml();
    this.infosBanner = new InfosBannerHtml()
    this.title = new TitleHtml("Strasbourg")

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
