const fs = require('fs')

const { createCanvas , loadImage } = require('canvas');

exports.technichal = (path) => saveImage(path[0] , path[1] , [907 , 758] , [1440 , 1700] , [-266 , -685]);

exports.chart = (path) =>  saveImage(path[0] , path[1] , [826 , 679] , [1200 , 800] , [ -56 , -39]);

const saveImage = (buffer , path , canvasSize = [0 , 0] , imageSize = [0 , 0] , margin = [0 , 0]) => new Promise(async(resolve , reject)=>{

    try{

        const canvas = createCanvas(canvasSize[0] , canvasSize[1]);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(buffer);
        ctx.drawImage(img , margin[0] , margin[1] , imageSize[0] , imageSize[1]);
        fs.writeFileSync(path , canvas.toBuffer('image/png'))
        resolve(path)

    }catch(err){

        reject('Canvas cropping image err >> \n' + err)
        
    }


})
 
