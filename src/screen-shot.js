'use strict';

const { TechnicalPage, ChartPage } = require('./utils/htmlUtils.js')
const ImageUtils = require('./utils/imageUtils.js')

class ScreenShot{

    constructor(data){
        this.data = data;
    }

    async saveTechnichal(){

        let data = await this.saveAction('tech');

        return await ImageUtils.technichal(data);

    }

    async saveChart(){

        let data = await this.saveAction('chart');

        return await ImageUtils.chart(data);

    }

    async saveAction(type){

        let data = this.data , page;
        switch(type){
            case 'tech' :
                page = await new TechnicalPage(data).modifySource();
                break;
            case 'chart' : 
                page = await new ChartPage(data).modifySource();
                break;
        }
        

        let buffer = await page.screenshot({
            type : 'png',
            encoding : 'binary',
            fullPage : false
        });

        return [buffer , data.path];
    }

}

module.exports = { ScreenShot };