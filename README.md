# Thingspeak Logger
A simple application to allow users to display their "thingspeak" channel feeds

## Application setup:
In `/src/App.vue`
Paste your API Key for thinkgsspeak.com into apiKey
Paste your channelID into channelID

optional: resultCount can be configured to limit each API-call

To use Google map, set useGoogleMaps to true
Configure GOOGLE_API_KEY in `main.js` to be able to use Googlemaps 

-------------------------------------------------------------------------------
How to deploy the app to Heroku:
1. Create your own repository from this repository
2. Log into https://dashboard.heroku.com/
3. Choose Deploy Tab
4. Under Deployment method choose your github repository
5. Press deploy to start deployment
-------------------------------------------------------------------------------

How to start the app localy
## Project setup
```
npm install
```
install XCODE CLT if needed: https://www.embarcadero.com/starthere/xe5/mobdevsetup/ios/en/installing_the_commandline_tools.html

### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
