const fs = require('fs').promises;
const path = require('path');
const toIco = require('to-ico');

async function convertPngToIco(inputPngPath, outputPath = null) {
    try {
        // If no output path specified, create in same directory as input
        if (!outputPath) {
            outputPath = path.join(
                path.dirname(inputPngPath),
                'favicon.ico'
            );
        }

        // Ensure output directory exists
        await fs.mkdir(path.dirname(outputPath), { recursive: true });

        // Read the PNG file
        const pngBuffer = await fs.readFile(inputPngPath);

        // Convert to ICO
        const icoBuffer = await toIco([pngBuffer]);

        // Write the ICO file
        await fs.writeFile(outputPath, icoBuffer);
        
        console.log(`✅ Successfully created: ${outputPath}`);
    } catch (error) {
        console.error('Error converting PNG to ICO:', error);
    }
}

// Handle command line usage
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node png-to-ico.js <input-png-path> [output-ico-path]');
        process.exit(1);
    }

    const inputPath = args[0];
    const outputPath = args[1] || null;

    convertPngToIco(inputPath, outputPath);
}

module.exports = convertPngToIco;