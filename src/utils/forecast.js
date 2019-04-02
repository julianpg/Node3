const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/505b937fabaa2fb208be62e3fb24ed7a/'+latitude+','+longitude+'?units=si'
   
    request({ url, json: true}, (error, { body })=> {
   
        if(error) {

            callback('unable to connect',undefined)

        } else if(body.error){
            
            callback('unable to find location',undefined)

        } else {
            
            callback(undefined,body.daily.data[0].summary +' Todays high is '+ body.daily.data[0].temperatureHigh + ' and the low will be '+body.daily.data[0].temperatureLow )

        }
       
       })
}

module.exports = forecast