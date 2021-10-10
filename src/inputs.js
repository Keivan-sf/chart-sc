const { ScreenShot } = require('./screen-shot.js')


class TokenObject{


        constructor(token){
            this.token = token;
            this.timeFrame = "daily";
            this.style = "light";
        }
        
        /**
        * @param {String} style "light" || "dark"
        */
        
        setStyle(style = "light"){
            this.style = style;
            return this;
        }

        getJsonObject(path){

            let obj = {
                timeFrame : this.timeFrame,
                style : this.style,
                token : this.token,
                path
            }

            return obj;
        }


}


class tech extends TokenObject{

        /**
        * @param {String} token token Code , E.g.: BTC
        */

         constructor(token){
            super(token)
        }

        /**
        * @param {String} timeFrame "daily" || "weekly" || "monthly" || "1h" || "2h" || "4h"
        */
        
        setTimeFrame(timeFrame = "daily"){
            this.timeFrame = timeFrame;
            return this;
        }


        async save(path){

            let obj = this.getJsonObject(path);

            let screen = new ScreenShot(obj);
            return await screen.saveTechnichal();
            
        }


}

class chart extends TokenObject{

        /**
        * @param {String} token token pair , E.g.: BTCUSD
        */

         constructor(token){
            super(token)
        }

        /**
        * @param {String} timeFrame "daily" || "weekly" || "monthly" || "1h" || "2h" || "3h" || "4h"
        */
        
        setTimeFrame(timeFrame = "daily"){
            this.timeFrame = timeFrame;
            return this;
        }

        /**
        * @returns {String} File Path
        */

        async save(path){

            let obj = this.getJsonObject(path);

            let screen = new ScreenShot(obj);
            return await screen.saveChart();
            
        }

}



module.exports =  { tech , chart };
