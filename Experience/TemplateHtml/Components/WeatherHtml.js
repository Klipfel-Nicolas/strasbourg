import PageHtml from "../PageHtml";

import weatherCode from "../../../datas/weatherCode";

export default class WeatherHtml {
    constructor() {
        
        this.page = new PageHtml();

    }

    async getCurrentWeather() {
        await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.58&longitude=7.75&hourly=temperature_2m&current_weather=true")
                                .then(resp => resp.json())
                                .then(res => this.currentWeather = res.current_weather)
        
        this.currentWeather.currentWeather = weatherCode[this.currentWeather.weathercode]

        return this.currentWeather;
    }


    /**
   * Update Function
   */
  update() {

  }
}