import PageHtml from "../PageHtml"

export default class TitleHtml {
    constructor(title) {
        
        this.page = new PageHtml();

        this.mainTitle = title

        this.setMainTitle(this.mainTitle)

        //Handle list elements Focus
        this.page.list.on("elementFocused", (element) => {
            this.setMainTitle(element.name)
        })

        this.page.list.on("no-elementFocused", () => {
            this.setMainTitle(this.mainTitle)
        })
    }

    setMainTitle(newTitle) {
        this.page.innerContent( "#mainTitle-js", "#mainTitle-html", {
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