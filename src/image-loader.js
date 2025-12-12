"use client";

export default function myImageLoader({ src, width, quality }) {
  // If the image is remote (starts with http), return it as is
  if (src.startsWith("http")) return src;

  // Otherwise, point to the optimized folder generated during build
  return `/${
    process.env.nextImageExportOptimizer_exportFolderName
  }${src}?width=${width}&quality=${quality || 75}`;
}
