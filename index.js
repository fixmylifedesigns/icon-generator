const generateIcons = require('./scripts/generate-icons');
const convertPngToIco = require('./scripts/png-to-ico');
const path = require('path');

// Helper function to check file extension
function getFileExtension(filePath) {
    return path.extname(filePath).toLowerCase();
}

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
Icon Generation Tools

Usage:
1. Generate all icons:
    node index.js batch <input-image> <output-directory>

2. Create favicon.ico:
    node index.js ico <input-png> <output-directory>

Options:
    batch   - Generate all icon sizes (accepts SVG or PNG input)
    ico     - Create favicon.ico (PNG input only)

Examples:
    node index.js batch logo.svg ./icons
    node index.js ico logo.png ./icons
        `);
        process.exit(1);
    }

    const command = args[0].toLowerCase();
    const inputPath = args[1];
    const outputPath = args[2];

    if (!inputPath) {
        console.error('❌ Error: Input file path is required');
        process.exit(1);
    }

    const fileExtension = getFileExtension(inputPath);

    switch (command) {
        case 'batch':
            // For batch generation, allow SVG or PNG
            if (!['.svg', '.png'].includes(fileExtension)) {
                console.error('❌ Error: Batch icon generation requires an SVG or PNG file');
                process.exit(1);
            }
            
            if (!outputPath) {
                console.error('❌ Error: Output directory is required for batch generation');
                process.exit(1);
            }

            console.log('🚀 Starting batch icon generation...');
            await generateIcons(inputPath, outputPath);
            break;

        case 'ico':
            // For ICO conversion, only allow PNG
            if (fileExtension !== '.png') {
                console.error('❌ Error: ICO conversion requires a PNG file');
                console.error('Tip: If you have an SVG, first use the batch command to generate PNGs, then use one of those PNGs to create your ICO');
                process.exit(1);
            }

            console.log('🎯 Converting PNG to ICO...');
            const icoOutputPath = outputPath ? 
                path.join(outputPath, 'favicon.ico') : 
                null;
            
            await convertPngToIco(inputPath, icoOutputPath);
            break;

        default:
            console.error('❌ Error: Invalid command. Use "batch" or "ico"');
            process.exit(1);
    }
}

main().catch(error => {
    console.error('❌ An error occurred:', error);
    process.exit(1);
});