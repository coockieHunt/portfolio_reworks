const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/assets/projetImg');
const TARGET_QUALITY = 80;
const TARGET_SIZE = {
    width: 1920,
}


fs.readdir(DIR, (err, files) => {
    if (err) {return console.error('❌ image directory read error:', err);}

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.webp') {
            const filePath = path.join(DIR, file);
            
            const originalStats = fs.statSync(filePath);
            const originalSize = (originalStats.size / 1024).toFixed(2);

            sharp(filePath)
                .resize({ width: TARGET_SIZE.width, withoutEnlargement: true }) 
                .webp({ quality: TARGET_QUALITY }) 
                .toBuffer() 
                .then(data => {
                    fs.writeFile(filePath, data, (err) => {
                        if (err) console.error(`❌ Erreur d'écriture pour ${file}:`, err);
                        
                        const newSize = (data.length / 1024).toFixed(2);
                        const reduction = Math.round((1 - (data.length / originalStats.size)) * 100);
                        
                        console.log(`✅ ${file} : ${originalSize} Ko -> ${newSize} Ko (Gain: ${reduction}%)`);
                    });
                })
                .catch(err => {
                    console.error(`❌ image processing error on ${file} :`, err);
                });
        }
    });
});