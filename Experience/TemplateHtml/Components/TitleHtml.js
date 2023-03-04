import PageHtml from "../PageHtml"

export default class ListHtml {
    constructor(title) {
        
        this.page = new PageHtml();

        this.mainTitle = title

        this.page.compileTemplate("#mainTitle-js")
        this.page.fillHtml("#mainTitle-html", {title: this.mainTitle})
    }


    eventsListener() {
 
    }

    /**
   * Update Function
   */
  update() {

  }
}