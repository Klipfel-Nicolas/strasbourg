import PageHtml from "../PageHtml"

export default class TitleHtml {
    constructor(title, currentWeather) {
        
        this.page = new PageHtml();

        this.mainTitle = title
        this.currentWeather = currentWeather;

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
            title: newTitle,
            currentWeather: this.currentWeather.currentWeather,
            temperature: this.currentWeather.temperature,
            windspeed: this.currentWeather.windspeed
        })
        
    }


    eventsListener() {
 
    }

    /**
   * Update Function
   */
  update() {
    console.log(this.page.currentWeather)
  }
}