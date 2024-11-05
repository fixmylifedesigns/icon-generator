const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');

// Icon configuration object
const defaultIconConfig = {
    'android-icon': [36, 48, 72, 96, 144, 192],
    'apple-icon': [57, 60, 72, 76, 114, 120, 144, 152, 180],
    'ms-icon': [70, 144, 150, 310],
    'favicon': [16, 32, 96]
};

// Special cases that don't follow the size pattern
const specialCases = {
    'apple-icon-precomposed': 192,
    'apple-icon': 192, // The base apple-icon
};

async function generateIcons(inputImagePath, outputDir, iconConfig = defaultIconConfig) {
    try {
        // Ensure output directory exists
        await fs.mkdir(outputDir, { recursive: true });
        
        // Check if input is SVG
        const isSvg = path.extname(inputImagePath).toLowerCase() === '.svg';
        
        if (isSvg) {
            console.log('📐 SVG input detected - perfect for scaling!');
        }
        
        // Create base sharp instance with optimized settings for SVG
        const image = sharp(inputImagePath, {
            density: isSvg ? 1200 : 300,
            limitInputPixels: false
        });
        
        // Generate icons from the configuration
        const resizePromises = [];
        
        // Process regular icon sizes
        for (const [iconName, sizes] of Object.entries(iconConfig)) {
            for (const size of sizes) {
                const fileName = `${iconName}-${size}x${size}.png`;
                resizePromises.push(generateIcon(image, size, fileName, outputDir, isSvg));
            }
        }
        
        // Process special cases
        for (const [name, size] of Object.entries(specialCases)) {
            const fileName = `${name}.png`;
            resizePromises.push(generateIcon(image, size, fileName, outputDir, isSvg));
        }
        
        // Wait for all icons to be generated
        await Promise.all(resizePromises);
        console.log('✨ Icon generation completed!');
        
    } catch (err) {
        console.error('Error:', err);
        if (err.message.includes('Input file is missing')) {
            console.error('Please make sure the input file exists and is readable.');
        }
    }
}

async function generateIcon(image, size, fileName, outputDir, isSvg) {
    try {
        const outputPath = path.join(outputDir, fileName);
        await image
            .clone()
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
                kernel: isSvg ? 'lanczos3' : 'lanczos2',
                fastShrinkOnLoad: size > 48
            })
            .png({
                compressionLevel: 9,
                adaptiveFiltering: true,
                quality: 100
            })
            .toFile(outputPath);
        
        console.log(`Generated: ${fileName}`);
        return outputPath;
    } catch (err) {
        console.error(`Error generating ${fileName}:`, err);
        throw err;
    }
}

// Example usage:
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node script.js <input-image-path> <output-directory> [config-file]');
        console.log('Note: SVG input is recommended for best quality!');
        process.exit(1);
    }
    
    // Allow custom config through JSON file
    let customConfig = defaultIconConfig;
    if (args[2]) {
        try {
            const configPath = path.resolve(args[2]);
            const configContent = require(configPath);
            customConfig = configContent;
            console.log('Using custom icon configuration');
        } catch (err) {
            console.error('Error loading custom config, using default:', err.message);
        }
    }
    
    generateIcons(args[0], args[1], customConfig);
}

// Export for use as a module
module.exports = generateIcons;