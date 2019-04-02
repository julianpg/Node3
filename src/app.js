const path    = require('path')
const express = require('express')
const hbs     = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')//use hadle bars for templating
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:  'JPG'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'JPG'
        
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'JPG'
        
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
            
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
     
         forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                 return console.log('Error',error)
             }
             
             res.send({

                location,
                forecast: forecastData
                
            })
             
         })
     })


})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        error: 'help article found not error 404'
})
}) 

app.get('*', (req, res)=>{
    res.render('404', {
            error: 'Page Not found error 404'
    })
})

app.listen(3000,()=>{
    console.log('server running')
})


