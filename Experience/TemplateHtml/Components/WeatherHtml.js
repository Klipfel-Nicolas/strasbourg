import PageHtml from "../PageHtml";

import weatherCode from "../../../datas/weatherCode";

export default class WeatherHtml {
    constructor() {
        this.page = new PageHtml();

        this.setCurrentWeather();
    }

    async getCurrentWeather() {
        await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.58&longitude=7.75&hourly=temperature_2m&current_weather=true")
                                .then(resp => resp.json())
                                .then(res => this.currentWeather = res.current_weather)
        
        this.currentWeather.currentWeather = weatherCode[this.currentWeather.weathercode]

        return this.currentWeather;
    }

    async setCurrentWeather() {
        await this.getCurrentWeather();

        this.page.innerContent("#weather-js", "#weather-html", {
            currentWeather: this.currentWeather.currentWeather,
            temperature: Math.round(this.currentWeather.temperature),
            windspeed: this.currentWeather.windspeed
        });
    }

    /**
   * Update Function
   */
  update() {

  }
}