'use strict';
const puppeteer = require('puppeteer')

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];

class HtmlUtils{

    constructor(URL){
        this.URL = URL;
    }


    async lunchBrowser(options = {viewPort : [1440 , 1700]}){
        

        this.browser = await puppeteer.launch({
            headless: true,
            args: minimal_args,
            userDataDir: './browser-cache'
        });

        this.page = await this.browser.newPage();

        await this.page.setViewport({
            width: options.viewPort[0],
            height: options.viewPort[1],
        });

        await this.gotoPage();

    }

    async reloadPage(){
        await this.page.reload();
    }

    async gotoPage(){
        await this.page.goto(this.URL , {waitUntil: 'networkidle0'});
    }
    
}

class TechnicalPage extends HtmlUtils{

    /**
     * @param {String} token token Code , E.g.: BTC
     * @param {String} style "dark" || "light"
     */

    constructor(input){
        
        super(tokenToURL(input.token , 'tech'))
        this.style = input.style;
        this.timeFrame = input.timeFrame;
    }

    

    async modifySource(){

        await this.lunchBrowser();

        await this.page.evaluate(async()=>{

            let acceptCookie = document.querySelector('.button-qM2OSl9-');
            if(acceptCookie) acceptCookie.click();
            document.querySelector('.tv-symbol-header__first-line').innerHTML = "";

        })

        let source = await this.page.content();

        if(source.toLowerCase().includes(`<h1 class="tv-http-error-page__title">this isn't the page you're looking for</h1>`)){
            throw new Error('The token is not valid');
        }
            
        switch(this.timeFrame){

            case 'daily':

                await this.page.evaluate(() =>{

                    document.querySelectorAll('.button-1cy7XKgV')[7].click();

                })

                await sleep(4000);

            break;

            case 'weekly':
                        
                await this.page.evaluate(() =>{
    
                    document.querySelectorAll('.button-1cy7XKgV')[8].click();
    
                })

                await sleep(4000);

            break;
                    
            case 'monthly':
                        
                await this.page.evaluate(() =>{

                    document.querySelectorAll('.button-1cy7XKgV')[9].click();
    
                })

                await sleep(4000);

            break;

            case '1h':
                        
                await this.page.evaluate(() =>{

                    document.querySelectorAll('.button-1cy7XKgV')[4].click();
    
                })

                await sleep(4000);

                break;

            case '2h':
                        
                await this.page.evaluate(() =>{
    
                    document.querySelectorAll('.button-1cy7XKgV')[5].click();
    
                })

                await sleep(4000);

            break;
                    
            case '4h':
                        
                await this.page.evaluate(() =>{
    
                    document.querySelectorAll('.button-1cy7XKgV')[6].click();
    
                })

                await sleep(4000);

            break;  
        }

        

        if(this.style != "dark") return this.page;

        await this.page.evaluate(() => {
            

            let dom = document.querySelector('.technicalsTab-DPgs-R4s');
            dom.setAttribute('style' , `background-color : #081424`);
    
            // tablesWrapper-DPgs-R4s
    
            let border = document.querySelector('.tablesWrapper-DPgs-R4s');
            border.setAttribute('style' , 'border-top: none')
    
            // arrowMain-2qn7A4BC
    
            document.querySelectorAll('.arrowMain-2qn7A4BC').forEach(element =>{
                element.setAttribute('style' , 'background-color : #fff');
            });
            
            // dot-2qn7A4BC
            
             document.querySelectorAll('.dot-2qn7A4BC').forEach(element =>{
                element.setAttribute('style' , 'border-color : #fff');
            });
            
            // speedometerText-2qn7A4BC
    
            document.querySelectorAll('.speedometerText-2qn7A4BC').forEach(element => {
                element.setAttribute('style' , 'color : #fff');
            });
    
            // speedometerTitle-DPgs-R4s
    
            document.querySelectorAll('.speedometerTitle-DPgs-R4s').forEach(element => {
                element.setAttribute('style' , 'color : #fff');
            });
    
            // counterTitle-DPgs-R4s
    
            document.querySelectorAll('.counterTitle-DPgs-R4s').forEach(element => {
                element.setAttribute('style' , 'color : #fff');
            });
    
        });

        return this.page;

    }

    
}

class ChartPage extends HtmlUtils{

    /**
     * @param {String} token token Code , E.g.: BTC
     * @param {String} style "dark" || "light"
     */

    constructor(input){
        super(tokenToURL(input.token , 'chart'))
        this.style = input.style;
        this.token = input.token;
        this.timeFrame = input.timeFrame;
    }

    async modifySource(){

        await this.lunchBrowser({viewPort : [1200 , 800]});

        let source = await this.page.content();
        if(source.toLowerCase().includes('<span class="invalid-2ycajyht">invalid symbol</span>')) {
            throw new Error('Invalid token')
        }

        await this.page.evaluate(async()=>{

            let acceptCookie = document.querySelector('.button-qM2OSl9-');
            if(acceptCookie) acceptCookie.click();

        })


        if(this.timeFrame == "daily" || this.timeFrame == "weekly" || this.timeFrame == "monthly"  || this.timeFrame == "1h"  || this.timeFrame == "2h"  || this.timeFrame == "3h"  || this.timeFrame == "4h"){

            await this.page.evaluate(async()=>{

                const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                let changeTimeFrame = document.querySelector('.value-2y-wa9jT');
                    
                if(!changeTimeFrame){
                    await sleep(1000);
                    changeTimeFrame = document.querySelector('.value-2y-wa9jT');
                }

                changeTimeFrame.click();

                await sleep(100);

            })


            switch (this.timeFrame){
                case "daily":

                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));
                        
                        let monthly = document.querySelector('.item-2IihgTnv[data-value="1D"]')
    
                        if(!monthly){
                            await sleep(1000);
                            monthly = document.querySelector('.item-2IihgTnv[data-value="1D"]')
                        }
                        monthly.click();
        
                        await sleep(1000);
    
                    })

                break;

                case 'weekly' :
    
                    await this.page.evaluate(async()=>{
    
                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                        let weekly = document.querySelector('.item-2IihgTnv[data-value="1W"]')
    
                        if(!weekly){
                            await sleep(1000);
                            weekly = document.querySelector('.item-2IihgTnv[data-value="1W"]')
                        }
                        weekly.click();
        
                        await sleep(1000);
    
                    })
    
                    break;
                
                case 'monthly' :
    
                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));
                        
                        let monthly = document.querySelector('.item-2IihgTnv[data-value="1M"]')
    
                        if(!monthly){
                            await sleep(1000);
                            monthly = document.querySelector('.item-2IihgTnv[data-value="1M"]')
                        }
                        monthly.click();
        
                        await sleep(1000);
    
                    })
    
                break;

                case '1h':

                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                        let time = document.querySelector('.item-2IihgTnv[data-value="60"]')
    
                        if(!time){
                            await sleep(1000);
                            time = document.querySelector('.item-2IihgTnv[data-value="60"]')
                        }
                        time.click();
        
                        await sleep(1000);
    
                    })

                break;

                case '2h':

                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                        let time = document.querySelector('.item-2IihgTnv[data-value="120"]')
    
                        if(!time){
                            await sleep(1000);
                            time = document.querySelector('.item-2IihgTnv[data-value="120"]')
                        }
                        time.click();
        
                        await sleep(1000);
    
                    })

                break;

                case '3h':

                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                        let time = document.querySelector('.item-2IihgTnv[data-value="180"]')
    
                        if(!time){
                            await sleep(1000);
                            time = document.querySelector('.item-2IihgTnv[data-value="180"]')
                        }
                        time.click();
        
                        await sleep(1000);
    
                    })

                break;

                case '4h':

                    await this.page.evaluate(async()=>{

                        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

                        let time = document.querySelector('.item-2IihgTnv[data-value="240"]')
    
                        if(!time){
                            await sleep(1000);
                            time = document.querySelector('.item-2IihgTnv[data-value="240"]')
                        }
                        time.click();
        
                        await sleep(1000);
    
                    })

                break;
    
            }

        }

        if(this.style == "light") return this.page;

        try{

            await this.page.evaluate(async()=>{
            
                let settingTag = document.querySelector('.iconButton-pzOKvpP8');
    
                if(!settingTag){
                    await sleep(1000);
                    settingTag = document.querySelector('.iconButton-pzOKvpP8');
                } 
    
                settingTag.click();
    
                await sleep(100)
    
                let apearanceTag = document.querySelectorAll(".tab-DggvOZTm")[3];
    
                if(!apearanceTag){
                    await sleep(1000);
                    apearanceTag = document.querySelectorAll(".tab-DggvOZTm")[3];
                } 
    
                apearanceTag.click();
    
                await sleep(100)
                
    
                let apearanceSelection = document.querySelector(".swatch-3gSLMlhu");
    
                if(!apearanceSelection){
                    await sleep(1000);
                    apearanceSelection = document.querySelector(".swatch-3gSLMlhu");
                } 
    
                apearanceSelection.click();
                
                await sleep(100)
    
    
                let apearanceColor = document.querySelector(".swatch-vBKBthtD[style='color: rgb(19, 23, 34);']")
    
                if(!apearanceColor){
                    await sleep(1000);
                    apearanceColor = document.querySelector(".swatch-vBKBthtD[style='color: rgb(19, 23, 34);']")
                } 
    
                apearanceColor.click();
    
                await sleep(100)
    
    
                let textColor = document.querySelectorAll(".swatch-3gSLMlhu")[4]
    
                if(!textColor){
                    await sleep(1000);
                    textColor = document.querySelectorAll(".swatch-3gSLMlhu")[4]
                } 
    
                textColor.click();
    
                await sleep(100)
                
    
                let textColorSelect = document.querySelectorAll(".white-vBKBthtD")[1]
    
                if(!textColorSelect){
                    await sleep(1000);
                    textColorSelect = document.querySelectorAll(".white-vBKBthtD")[1]
                } 
    
                textColorSelect.click();
    
                await sleep(100)
    
                let closePage = document.querySelector(".close-2sL5JydP")
                closePage.click();
    
                function sleep(ms){
                    return new Promise((resolve)=> setTimeout(resolve , ms));
                }
                
            })
        }catch{
            return this.page;
        }   


        return this.page;

    }

}



function tokenToURL(name , type){

    switch(type){

        case 'tech' : return `https://www.tradingview.com/symbols/${name.toUpperCase()}USD/technicals/`;
        case 'chart' : return `https://www.tradingview.com/chart?symbol=${name.toUpperCase()}`;

    }
    
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms));

module.exports = { TechnicalPage , ChartPage};
