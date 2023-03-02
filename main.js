//main js file:
let showCoordinates = document.getElementById("showCoordinates")
let geoLocationBtn = document.getElementById("geoLocationBtn")
let inputBtn = document.getElementById("inputBtn")
let inputPlace = document.getElementById("inputPlace")
let main = document.getElementById("main")
let oneDayWeather = document.getElementById("oneDayWeather")
let fiveDaysWeather = document.getElementById("fiveDaysWeather")
//let class0 = document.querySelector(".class0")


let err1 = document.getElementById("err1")
let err2 = document.getElementById("err2")
let err3 = document.getElementById("err3")
let err4 = document.getElementById("err4")

//  1 . get geo location after press 'geo-location-btn' and show weather based on geo location:
/*=============================================================================================*/
geoLocationBtn.addEventListener("click",getGeoLocation)
geoLocationBtn.addEventListener("click",()=>{
    inputPlace.classList.add("hideInputPlace")
    inputBtn.classList.add("hideInputBtn")
})

function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,failure)
    }else{err1.innerHTML = `could not get location`}
}
function success(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    //function here to grab long, lat variables
    //syntex
    //append these lat long in html:
    showCoordinates.innerHTML = `Latitude : ${latitude} Longitude: ${longitude}`
    myCoordinates(latitude, longitude)
}
function failure(err){
   // err2.innerHTML `could not get location`
    //switch case 
    switch(err.code){
        case err.PERMISSION_DENIED: 
        err3.innerHTML = `Permission Denied`
        break
        case err.TIME_OUT: 
        err3.innerHTML = `Time Out`
        break
        case err.POSITION_UNAVAILABLE: 
        err3.innerHTML = `Position Unavialable`
        break

    }
}
function myCoordinates(latitude, longitude){
    let URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
         fetch(URL)
         .then(response=>{
            console.log(response)
            return response.json()
         })
         .then(data=>{
            console.log(data)
            console.log(data.list[0])
            oneDayWeather.innerHTML = `
                                    <p>Today's Weather </p>
                                    <p>${data.list[0].weather[0].main} </p>
                                    
                                    <img class="svgStyleClass" src="./bigSvg/${data.list[0].weather[0].main.toLowerCase()}.svg">
                                    <p>Max-Temp ${(data.list[0].main.temp_max-273).toFixed(0)} &;</p>
                                    <p>Min-Temp ${(data.list[0].main.temp_min-273).toFixed(0)} &;</p>
                                                  
                                    `
           
            //for Loop:
            for(let i = 0; i<data.list.length; i = i+8){
                console.log(data.list[i])

                window.onload = function(){
                    data.list[0].style.color = "blue";
                }

                let time = new Date(data.list[i].dt*1000)
                let day = time.toDateString().split(" ")[0]
               
                

            //************1 day weather:
         /*
            let time0 = new Date(data.list[0].dt*1000)
            let day0 = time0.toDateString().split(" ")[0]
            let _1Daydiv = document.createElement("div") 
                _1Daydiv.innerHTML = `
                <p>${day0}</p>
                <img class="svgStyleClass" src="./bigSvg/${data.list[0].weather[0].main.toLowerCase()}.svg">
                <p>Max-Temp ${(data.list[0].main.temp_max-273).toFixed(0)} &;</p>
                <p>Min-Temp ${(data.list[0].main.temp_min-273).toFixed(0)} &;</p>
                `
            oneDayWeather.appendChild(_1Daydiv)
                 */
            
            //*************5 days weather:
            let _5Daysdiv = document.createElement("div")
                _5Daysdiv.innerHTML = `
                        <p>${day}</p>
                        <img class="svgStyleClass" src="./bigSvg/${data.list[i].weather[0].main.toLowerCase()}.svg">
                        <p>Max-Temp ${(data.list[i].main.temp_max-273).toFixed(0)} &;</p>
                        <p>Min-Temp ${(data.list[i].main.temp_min-273).toFixed(0)} &;</p>
                                  
                `
                fiveDaysWeather.appendChild(_5Daysdiv)
               
            }
            
         })
         .catch(err=>{
            console.error(err)
         })
}

//==================================================================================== 

//  2. get weather after click *input-btn*  : 
/*=============================================*/

inputBtn.addEventListener("click",inputBtnFunction)
inputBtn.addEventListener("click", ()=>{
    geoLocationBtn.classList.add("hideGeoLocationBtn")
})

function inputBtnFunction(){
    let cityName = document.getElementById("inputPlace").value
    let URL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIkey}`

    fetch(URL2)
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .then(data=>{
        console.log(data)

        console.log(data.list[0])
            oneDayWeather.innerHTML = `
                                    <p>Today's Weather </p>
                                    <p>${data.list[0].weather[0].main} </p>
                                    
                                    <img class="svgStyleClass" src="./bigSvg/${data.list[0].weather[0].main.toLowerCase()}.svg">
                                    <p>Max-Temp ${(data.list[0].main.temp_max-273).toFixed(0)} &;</p>
                                    <p>Min-Temp ${(data.list[0].main.temp_min-273).toFixed(0)} &;</p>
                                                  
                                    `
           
            //for Loop:
            for(let i = 0; i<data.list.length; i = i+8){
                console.log(data.list[i])

                window.onload = function(){
                    data.list[0].style.color = "blue";
                }

                let time = new Date(data.list[i].dt*1000)
                let day = time.toDateString().split(" ")[0]
               
                

            //************1 day weather:
        
            
            //*************5 days weather:
            let _5Daysdiv = document.createElement("div")
                _5Daysdiv.innerHTML = `
                        <p>${day}</p>
                        <img class="svgStyleClass" src="./bigSvg/${data.list[i].weather[0].main.toLowerCase()}.svg">
                        <p>Max-Temp ${(data.list[i].main.temp_max-273).toFixed(0)} &;</p>
                        <p>Min-Temp ${(data.list[i].main.temp_min-273).toFixed(0)} &;</p>
                                  
                `
                fiveDaysWeather.appendChild(_5Daysdiv)
               
            }
            
         })


    
}
