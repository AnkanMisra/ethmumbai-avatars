import { readdir, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const DATASET_ROOT = join(import.meta.dir, "dataset");
const PROFILES_DIR = join(DATASET_ROOT, "human-profile");
const ETHMUMBAI_DIR = join(DATASET_ROOT, "human-ethmumbai");
const OUTPUT_SIZE = 1024;

async function processDirectory(inputDir: string) {
  console.log(`Processing directory: ${inputDir}`);
  
  try {
    const files = await readdir(inputDir);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    if (imageFiles.length === 0) {
      console.warn(`No images found in ${inputDir}`);
      return;
    }

    for (const file of imageFiles) {
      const inputPath = join(inputDir, file);
      const filename = basename(file, extname(file));
      // Overwrite or save as .png? 
      // For training, we usually want consistent formats. Let's convert to PNG in place or ensure they are compliant.
      // To be safe, we'll just ensure they are resized and valid.
      
      // We will overwrite the file with the processed version to ensure the dataset is "ready-to-train"
      // Or we could create a 'processed' folder. The plan implies "Preprocess images... ready-to-train dataset".
      // Let's process in place for simplicity, or maybe a temp folder is safer?
      // Let's overwrite but keep backup if needed? No, let's just process.
      
      const tempPath = join(inputDir, `temp_${filename}.png`);

      try {
        await sharp(inputPath)
          .resize(OUTPUT_SIZE, OUTPUT_SIZE, {
            fit: 'cover',
            position: 'center' // Simple center crop
          })
          .toFormat('png')
          .toFile(tempPath);
        
        // Move temp back to original (renaming to .png)
        const finalPath = join(inputDir, `${filename}.png`);
        await Bun.write(finalPath, await Bun.file(tempPath).arrayBuffer());
        
        // If original was not png, delete it
        if (extname(file).toLowerCase() !== '.png') {
            // await unlink(inputPath); // Optional: keep original?
            // For now, let's keep original if it wasn't png, but the dataset should ideally be clean.
        }
        
        // Remove temp
        // await unlink(tempPath); // Bun.write handles the move effectively if we just wrote to finalPath? 
        // Actually sharp .toFile writes to disk.
        
        // Let's simplify: Read -> Resize -> Buffer -> Write
        const buffer = await sharp(inputPath)
            .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: 'cover', position: 'center' })
            .png()
            .toBuffer();
            
        await Bun.write(finalPath, buffer);
        console.log(`Processed: ${file} -> ${filename}.png`);

      } catch (err) {
        console.error(`Failed to process ${file}:`, err);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${inputDir}:`, error);
  }
}

async function main() {
  console.log("Starting preprocessing...");
  await processDirectory(PROFILES_DIR);
  await processDirectory(ETHMUMBAI_DIR);
  console.log("Preprocessing complete.");
}

main();
