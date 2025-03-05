document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const colorPicker = document.getElementById('color-picker');
    const colorInput = document.getElementById('color-input');
    const colorPreview = document.getElementById('color-preview');
    const colorPreviewSmall = document.getElementById('color-preview-small');
    const colorPreviewInput = document.getElementById('color-preview-input');
    const colorValue = document.getElementById('color-value');
    const vibrancySlider = document.getElementById('vibrancy-slider');
    const vibrancyValue = document.getElementById('vibrancy-value');
    const hueShiftSlider = document.getElementById('hue-shift-slider');
    const hueShiftValue = document.getElementById('hue-shift-value');
    const colorStrip = document.getElementById('color-strip');
    const colorShades = document.getElementById('color-shades');
    const randomizeBtn = document.getElementById('randomize-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const downloadJsonBtn = document.getElementById('download-json');
    const downloadCssBtn = document.getElementById('download-css');
    const downloadTailwindBtn = document.getElementById('download-tailwind');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
  
    // State
    let baseColor = '#15437F';
    let vibrancy = 50;
    let hueShift = 0;
    let colorShadesData = [];
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
    // Initialize
    updateColorPreviews(baseColor);
    generateColorShades();
  
    // Event Listeners
    colorPicker.addEventListener('input', (e) => {
      baseColor = e.target.value.toUpperCase();
      updateColorPreviews(baseColor);
      colorInput.value = baseColor;
      colorValue.textContent = baseColor;
      generateColorShades();
    });
  
    colorInput.addEventListener('input', (e) => {
      let value = e.target.value;
      if (value.startsWith('#')) {
        value = value.substring(1);
      }
      value = value.replace(/[^0-9A-Fa-f]/g, '');
      
      if (value.length > 0) {
        if (value.length <= 6) {
          colorInput.value = '#' + value.toUpperCase();
        } else {
          colorInput.value = '#' + value.substring(0, 6).toUpperCase();
        }
      } else {
        colorInput.value = '#';
      }
    });
  
    colorInput.addEventListener('blur', () => {
      let value = colorInput.value;
      if (!value.startsWith('#')) {
        value = '#' + value;
      }
      
      // Handle incomplete hex values
      if (value.length === 2) { // Just #
        value = baseColor;
      } else if (value.length === 3) { // #R
        value = value + value.charAt(2).repeat(5);
      } else if (value.length === 4) { // #RG
        value = value + value.charAt(3).repeat(4);
      } else if (value.length === 5) { // #RGB
        value = '#' + value.charAt(1) + value.charAt(1) + value.charAt(2) + value.charAt(2) + value.charAt(3) + value.charAt(3);
      } else if (value.length === 6) { // #RGBX
        value = value + value.charAt(5) + value.charAt(5);
      } else if (value.length === 7) { // #RGBXX
        value = value + value.charAt(6);
      }
      
      baseColor = value.toUpperCase();
      colorInput.value = baseColor;
      colorPicker.value = baseColor;
      colorValue.textContent = baseColor;
      updateColorPreviews(baseColor);
      generateColorShades();
    });
  
    colorInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    });
  
    vibrancySlider.addEventListener('input', (e) => {
      vibrancy = parseInt(e.target.value);
      vibrancyValue.textContent = `${vibrancy}%`;
      generateColorShades();
    });
  
    hueShiftSlider.addEventListener('input', (e) => {
      hueShift = parseInt(e.target.value);
      hueShiftValue.textContent = `${hueShift}°`;
      generateColorShades();
    });
  
    randomizeBtn.addEventListener('click', randomizeColor);
  
    darkModeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });
  
    downloadJsonBtn.addEventListener('click', downloadJson);
    downloadCssBtn.addEventListener('click', downloadCss);
    downloadTailwindBtn.addEventListener('click', downloadTailwind);
  
    // Functions
    function updateColorPreviews(color) {
      colorPreview.style.backgroundColor = color;
      colorPreviewSmall.style.backgroundColor = color;
      colorPreviewInput.style.backgroundColor = color;
    }
  
    function hexToHSL(hex) {
      // Remove the # if present
      hex = hex.replace(/^#/, '');
  
      // Parse the hex values
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
  
      // Find min and max values
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
  
      // Calculate lightness
      let l = (max + min) / 2;
  
      let h = 0;
      let s = 0;
  
      if (max !== min) {
        // Calculate saturation
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  
        // Calculate hue
        if (max === r) {
          h = (g - b) / (max - min) + (g < b ? 6 : 0);
        } else if (max === g) {
          h = (b - r) / (max - min) + 2;
        } else {
          h = (r - g) / (max - min) + 4;
        }
        h /= 6;
      }
  
      // Convert to degrees, percentage, percentage
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
  
      return [h, s, l];
    }
  
    function hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
  
      let r, g, b;
  
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
  
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
  
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
  
      const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
  
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }
  
    function generateColorShades() {
      const [baseHue, baseSat, baseLight] = hexToHSL(baseColor);
  
      // Apply hue shift
      const adjustedHue = (baseHue + hueShift + 360) % 360;
  
      // Apply vibrancy (affects saturation)
      // Cap vibrancy to prevent issues with extreme values
      const cappedVibrancy = Math.min(vibrancy, 85); // Cap at 85% to prevent oversaturation
      const saturationMultiplier = cappedVibrancy / 50; // 0-85 range to 0-1.7 multiplier
  
      colorShadesData = shades.map((shade) => {
        // Fixed lightness values to ensure proper gradient
        const lightnessMap = {
          50: 96, // Lightest
          100: 90,
          200: 80,
          300: 70,
          400: 60,
          500: 50,
          600: 40,
          700: 30,
          800: 20,
          900: 10, // Darkest
        };
  
        const targetLightness = lightnessMap[shade];
  
        // Calculate saturation with a more controlled approach
        let adjustedSaturation;
  
        if (shade <= 100) {
          // Very light shades (50, 100) get significantly reduced saturation
          adjustedSaturation = baseSat * saturationMultiplier * (0.3 + shade / 500);
        } else if (shade < 500) {
          // Medium-light shades get moderately reduced saturation
          adjustedSaturation = baseSat * saturationMultiplier * (0.6 + shade / 1000);
        } else if (shade < 800) {
          // Medium-dark shades get slightly increased saturation
          adjustedSaturation = baseSat * saturationMultiplier * (0.9 + (shade - 500) / 2000);
        } else {
          // Very dark shades (800, 900) get reduced saturation to prevent muddiness
          adjustedSaturation = baseSat * saturationMultiplier * 0.95;
        }
  
        // Cap saturation to prevent oversaturation
        adjustedSaturation = Math.min(adjustedSaturation, 100);
  
        // Generate the hex color
        const hex = hslToHex(adjustedHue, adjustedSaturation, targetLightness);
  
        return {
          shade,
          hex,
          hue: adjustedHue,
          saturation: Math.round(adjustedSaturation),
          lightness: targetLightness,
        };
      });
  
      updateColorStrip();
      updateColorShades();
    }
  
    function updateColorStrip() {
      colorStrip.innerHTML = '';
      
      colorShadesData.forEach(({ hex }) => {
        const stripItem = document.createElement('div');
        stripItem.className = 'color-strip-item';
        stripItem.style.backgroundColor = hex;
        colorStrip.appendChild(stripItem);
      });
    }
  
    function updateColorShades() {
      colorShades.innerHTML = '';
      
      colorShadesData.forEach(({ shade, hex, hue, saturation, lightness }) => {
        const shadeItem = document.createElement('div');
        shadeItem.className = 'shade-item';
        
        const shadeColor = document.createElement('div');
        shadeColor.className = 'shade-color';
        shadeColor.style.backgroundColor = hex;
        
        const shadeNumber = document.createElement('div');
        shadeNumber.className = 'shade-number';
        shadeNumber.textContent = shade;
        
        const shadeHex = document.createElement('div');
        shadeHex.className = 'shade-hex';
        shadeHex.textContent = hex;
        shadeHex.addEventListener('click', () => copyToClipboard(hex));
        
        // Copy icon
        const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        copyIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        copyIcon.setAttribute('width', '12');
        copyIcon.setAttribute('height', '12');
        copyIcon.setAttribute('viewBox', '0 0 24 24');
        copyIcon.setAttribute('fill', 'none');
        copyIcon.setAttribute('stroke', 'currentColor');
        copyIcon.setAttribute('stroke-width', '2');
        copyIcon.setAttribute('stroke-linecap', 'round');
        copyIcon.setAttribute('stroke-linejoin', 'round');
        copyIcon.classList.add('copy-icon');
        
        const copyPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        copyPath1.setAttribute('x', '9');
        copyPath1.setAttribute('y', '9');
        copyPath1.setAttribute('width', '13');
        copyPath1.setAttribute('height', '13');
        copyPath1.setAttribute('rx', '2');
        copyPath1.setAttribute('ry', '  '13');
        copyPath1.setAttribute('rx', '2');
        copyPath1.setAttribute('ry', '2');
        
        const copyPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        copyPath2.setAttribute('x', '5');
        copyPath2.setAttribute('y', '5');
        copyPath2.setAttribute('width', '13');
        copyPath2.setAttribute('height', '13');
        copyPath2.setAttribute('rx', '2');
        copyPath2.setAttribute('ry', '2');
        
        copyIcon.appendChild(copyPath1);
        copyIcon.appendChild(copyPath2);
        shadeHex.appendChild(copyIcon);
        
        const shadeDetails = document.createElement('div');
        shadeDetails.className = 'shade-details';
        
        // Hue detail
        const hueDetail = document.createElement('div');
        hueDetail.className = 'shade-detail';
        
        const hueLabel = document.createElement('div');
        hueLabel.className = 'detail-label';
        hueLabel.textContent = `H ${hue}`;
        
        const hueBar = document.createElement('div');
        hueBar.className = 'detail-bar';
        
        const hueFill = document.createElement('div');
        hueFill.className = 'detail-fill';
        hueFill.style.width = `${(hue / 360) * 100}%`;
        
        hueBar.appendChild(hueFill);
        hueDetail.appendChild(hueLabel);
        hueDetail.appendChild(hueBar);
        
        // Saturation detail
        const satDetail = document.createElement('div');
        satDetail.className = 'shade-detail';
        
        const satLabel = document.createElement('div');
        satLabel.className = 'detail-label';
        satLabel.textContent = `S ${saturation}`;
        
        const satBar = document.createElement('div');
        satBar.className = 'detail-bar';
        
        const satFill = document.createElement('div');
        satFill.className = 'detail-fill';
        satFill.style.width = `${saturation}%`;
        
        satBar.appendChild(satFill);
        satDetail.appendChild(satLabel);
        satDetail.appendChild(satBar);
        
        // Lightness detail
        const lightDetail = document.createElement('div');
        lightDetail.className = 'shade-detail';
        
        const lightLabel = document.createElement('div');
        lightLabel.className = 'detail-label';
        lightLabel.textContent = `L ${lightness}`;
        
        const lightBar = document.createElement('div');
        lightBar.className = 'detail-bar';
        
        const lightFill = document.createElement('div');
        lightFill.className = 'detail-fill';
        lightFill.style.width = `${lightness}%`;
        
        lightBar.appendChild(lightFill);
        lightDetail.appendChild(lightLabel);
        lightDetail.appendChild(lightBar);
        
        shadeDetails.appendChild(hueDetail);
        shadeDetails.appendChild(satDetail);
        shadeDetails.appendChild(lightDetail);
        
        shadeItem.appendChild(shadeColor);
        shadeItem.appendChild(shadeNumber);
        shadeItem.appendChild(shadeHex);
        shadeItem.appendChild(shadeDetails);
        
        colorShades.appendChild(shadeItem);
      });
    }
  
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${text} copied to clipboard!`);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  
    function showToast(message) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
  
    function randomizeColor() {
      // Reset vibrancy and hue shift to default values
      vibrancy = 50;
      hueShift = 0;
      vibrancySlider.value = vibrancy;
      hueShiftSlider.value = hueShift;
      vibrancyValue.textContent = `${vibrancy}%`;
      hueShiftValue.textContent = `${hueShift}°`;
      
      // Generate a random color
      const newHue = Math.floor(Math.random() * 360);
      const newSaturation = 20 + Math.random() * 80; // 20-100%
      const newLightness = 20 + Math.random() * 60; // 20-80%
      
      baseColor = hslToHex(newHue, newSaturation, newLightness);
      colorPicker.value = baseColor;
      colorInput.value = baseColor;
      colorValue.textContent = baseColor;
      updateColorPreviews(baseColor);
      generateColorShades();
      
      showToast(`New base color: ${baseColor}`);
    }
  
    function downloadJson() {
      const palette = colorShadesData.reduce((acc, { shade, hex }) => {
        acc[shade] = hex;
        return acc;
      }, {});
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(palette, null, 2));
      downloadFile(dataStr, `palette-${baseColor.replace('#', '')}.json`);
    }
  
    function downloadCss() {
      let css = `:root {\n`;
      colorShadesData.forEach(({ shade, hex }) => {
        css += `  --color-primary-${shade}: ${hex};\n`;
      });
      css += `}\n`;
      
      const dataStr = "data:text/css;charset=utf-8," + encodeURIComponent(css);
      downloadFile(dataStr, `palette-${baseColor.replace('#', '')}.css`);
    }
  
    function downloadTailwind() {
      const colors = colorShadesData.reduce((acc, { shade, hex }) => {
        acc[shade] = hex;
        return acc;
      }, {});
      
      const config = `/** @type {import('tailwindcss').Config} */
  module.exports = {
    theme: {
      extend: {
        colors: {
          primary: ${JSON.stringify(colors, null, 6).replace(/"([^"]+)":/g, "$1:")}
        }
      }
    }
  }`;
      
      const dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(config);
      downloadFile(dataStr, `tailwind-config-${baseColor.replace('#', '')}.js`);
    }
  
    function downloadFile(dataStr, filename) {
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', filename);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  });