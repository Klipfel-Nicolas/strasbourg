
const setCurrentTime = () => {
    let date = new Date().toLocaleString("en-US", {timeZone: "Europe/Paris"});
    date = new Date(date);
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
        
    let time = hh + " : " + mm + " : " + ss;
    

    document.querySelector("#clock .time").innerText = time; 
    document.querySelector("#clock .session").innerText = session; 
    let t = setTimeout(function(){ setCurrentTime() }, 1000);
}

setCurrentTime();