import PageHtml from "../PageHtml"

export default class TitleHtml {
    constructor(title) {
        
        this.page = new PageHtml();

        this.mainTitle = title

        this.page.compileTemplate("#mainTitle-js")
        this.setMainTitle(this.mainTitle)

        //Handle list elements Focus
        this.page.list.on("elementFocused", (name) => {
            this.setMainTitle(name)
        })

        this.page.list.on("no-elementFocused", () => {
            this.setMainTitle(this.mainTitle)
        })
    }

    setMainTitle(newTitle) {
        this.page.fillHtml("#mainTitle-html", {
            title: newTitle
        })
        
    }


    eventsListener() {
 
    }

    /**
   * Update Function
   */
  update() {
  }
}