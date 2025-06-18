let currentImageIndex = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.gesture === "👊") {
    const thumbnails = Array.from(document.querySelectorAll('img[src^="data:image/jpeg"]'))
      .filter(img => img.width > 100 && img.height > 100);

    if (thumbnails.length > 0) {
      // Asegurar que no se salga del rango
      if (currentImageIndex >= thumbnails.length) {
        currentImageIndex = 0; // Reinicia si llega al final
      }

      // Limpiar selección anterior
      document.querySelectorAll("img.imagen-seleccionada").forEach(img => {
        img.classList.remove("imagen-seleccionada");
        img.style.border = "";
      });

      const selected = thumbnails[currentImageIndex];

      selected.classList.add("imagen-seleccionada");
      selected.style.border = "5px solid red";
      selected.scrollIntoView({ behavior: "smooth", block: "center" });

      // Avanza al siguiente índice para la próxima vez
      currentImageIndex++;

      console.log("✅ Imagen seleccionada:", selected.src);
    } else {
      console.log("❌ No se encontraron imágenes compatibles.");
    }
  }
});
