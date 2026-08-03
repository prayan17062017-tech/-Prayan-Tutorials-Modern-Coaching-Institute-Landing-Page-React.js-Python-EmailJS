// Automatically import all available images from src/assets/results/
const imagesGlob = import.meta.glob('../../assets/results/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Convert glob imports to an array of objects
const rawImages = Object.entries(imagesGlob).map(([path, module]) => {
  const filename = path.split('/').pop();
  const name = filename.substring(0, filename.lastIndexOf('.'));
  
  // Assign categories to result images for gallery page filters
  let category = '';
  if (name.startsWith('admission_open')) {
    category = 'General';
  } else if (name.startsWith('banner')) {
    // Distribute banner and banner_1
    category = name === 'banner' ? 'HSC Results' : 'MHT-CET Results';
  } else if (name.startsWith('result_showcase')) {
    // Extract number to categorize or distribute evenly
    const parts = name.split('_');
    const num = parts.length === 2 ? 0 : parseInt(parts[2]) || 0;
    
    // Categorize based on index/modulo to ensure balanced filters:
    // 0, 4, 8, 12, 16 -> HSC Results
    // 1, 5, 9, 13, 17 -> MHT-CET Results
    // 2, 6, 10, 14, 18 -> JEE Results
    // 3, 7, 11, 15, 19 -> NEET Results
    const mod = num % 4;
    if (mod === 0) category = 'HSC Results';
    else if (mod === 1) category = 'MHT-CET Results';
    else if (mod === 2) category = 'JEE Results';
    else if (mod === 3) category = 'NEET Results';
  }

  return {
    filename,
    name,
    url: module.default || module,
    category
  };
});

// Sort the images strictly in the order: admission_open -> result_showcase -> banner
const getSortScore = (item) => {
  const name = item.name.toLowerCase();
  if (name.startsWith('admission_open')) {
    const parts = name.split('_');
    const num = parts.length === 2 ? 0 : parseInt(parts[2]) || 0;
    return 100 + num;
  }
  if (name.startsWith('result_showcase')) {
    const parts = name.split('_');
    const num = parts.length === 2 ? 0 : parseInt(parts[2]) || 0;
    return 200 + num;
  }
  if (name.startsWith('banner')) {
    const parts = name.split('_');
    const num = parts.length === 2 ? 0 : parseInt(parts[1]) || 0;
    return 300 + num;
  }
  return 400;
};

export const resultImages = rawImages.sort((a, b) => getSortScore(a) - getSortScore(b));
