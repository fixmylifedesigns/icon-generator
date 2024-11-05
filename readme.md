# Icon Generator Tools

A collection of Node.js scripts for generating web application icons and favicons. This tool helps create all the necessary icon sizes for web, Android, and iOS applications, as well as favicon.ico files.

## Features

- Generate multiple icon sizes from a single source image
- Create favicons from PNG files
- Support for SVG and PNG input files
- Optimized output for web and mobile devices
- Configurable icon sizes
- Transparent background support

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd icon-generator
```

2. Install dependencies:
```bash
npm install sharp to-ico
```

## Usage

The tool provides two main commands:

### 1. Batch Icon Generation

Generates all icon sizes needed for web, Android, and iOS applications:

```bash
node index.js batch <input-image> <output-directory>
```

Generated sizes include:
- Android: 36x36, 48x48, 72x72, 96x96, 144x144, 192x192
- Apple: 57x57, 60x60, 72x72, 76x76, 114x114, 120x120, 144x144, 152x152, 180x180
- Microsoft: 70x70, 144x144, 150x150, 310x310
- Favicon: 16x16, 32x32, 96x96

### 2. Favicon Generation

Creates a favicon.ico file from a PNG image:

```bash
node index.js ico <input-png> <output-directory>
```

## Examples

1. Generate all icons from an SVG file:
```bash
node index.js batch logo.svg ./icons
```

2. Generate all icons from a PNG file:
```bash
node index.js batch logo.png ./icons
```

3. Create just a favicon.ico:
```bash
node index.js ico logo.png ./icons
```

## Input Requirements

### For Batch Generation (generate-icons.js)
- Accepts SVG or PNG files
- For best results, use SVG input
- If using PNG, recommended minimum size is 310x310 pixels
- Input image should be square
- Transparent background recommended

### For Favicon Generation (png-to-ico.js)
- Accepts only PNG files
- Recommended size: 96x96 pixels or larger
- Must be a valid PNG file with transparency support

## Output

### Batch Generation
Creates a directory containing:
- All specified icon sizes in PNG format
- Properly named files for each platform
- Maintains original image quality
- Preserves transparency

### Favicon Generation
Creates a single favicon.ico file suitable for web use.

## Configuration

You can customize icon sizes by creating a JSON configuration file:

```json
{
    "android-icon": [36, 48, 72, 96, 144, 192],
    "apple-icon": [57, 60, 72, 76, 114, 120, 144, 152, 180],
    "ms-icon": [70, 144, 150, 310],
    "favicon": [16, 32, 96]
}
```

Use the custom configuration:
```bash
node generate-icons.js logo.svg output-directory config.json
```

## Tips

1. SVG Input
   - Use SVG files whenever possible for batch generation
   - SVGs provide the best quality across all sizes
   - Ensure your SVG has a proper viewBox attribute

2. PNG Input
   - Use PNG files with dimensions larger than your largest required icon
   - Ensure PNGs have transparent backgrounds if needed
   - High-resolution source images will produce better results

3. Favicon Generation
   - Use a PNG with clear details that are visible at small sizes
   - Test the favicon at 16x16 size to ensure visibility
   - Avoid complex designs for favicons

## Error Handling

The scripts include error handling for common issues:
- Invalid input files
- Missing directories
- Incorrect file formats
- Permission issues
- Image processing errors

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Your chosen license]

## Acknowledgments

This tool uses the following open-source packages:
- [sharp](https://sharp.pixelplumbing.com/) for image processing
- [to-ico](https://github.com/kevva/to-ico) for ICO file generation

