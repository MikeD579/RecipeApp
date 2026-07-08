import { spawn } from 'child_process';
import path from 'path';

export const scrapeRecipe = (url: string) => {
  return new Promise((resolve, reject) => {
    // Path to the python executable in your venv
    var pythonExe = path.join(__dirname, '../../../python-scraper/venv/bin/python3');
    var scriptPath = path.join(__dirname, '../../../python-scraper/scraper.py');

    if (__dirname.includes('backend/dist')) {
      // If running from the compiled JS in dist, adjust the path accordingly
      pythonExe = path.join(__dirname, '../../../../python-scraper/venv/bin/python3');
      scriptPath = path.join(__dirname, '../../../../python-scraper/scraper.py');
    }

    const process = spawn(pythonExe, [scriptPath, url]);

    let data = '';
    process.stdout.on('data', (chunk) => { data += chunk; });

    process.on('close', (code) => {
      if (code === 0) {
        const rawData = JSON.parse(data);

        // Simple cleaning logic
        const cleanedData = {
          ...rawData,
          // Ensure ingredients is always an array
          ingredients: Array.isArray(rawData.ingredients) ? rawData.ingredients : [],
          // Convert newline-heavy instructions into an array if they aren't already
          instructions: typeof rawData.instructions === 'string'
            ? rawData.instructions.split('\n').filter((line: string) => line.trim() !== '')
            : rawData.instructions
        };

        if (!cleanedData.ingredients || cleanedData.ingredients.length === 0) {
          reject("We couldn't find a recipe on that page. Try a different URL!");
        }

        resolve(cleanedData);
      } else {
        reject('Scraper failed to extract data.');
      }
    });
  });
};