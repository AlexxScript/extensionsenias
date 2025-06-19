let currentImageIndex = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const gesture = request.gesture;

  const thumbnails = Array.from(document.querySelectorAll('img[src^="data:image/jpeg"]'))
    .filter(img => img.width > 100 && img.height > 100);

  if (thumbnails.length === 0) {
    console.log("❌ No se encontraron imágenes compatibles.");
    return;
  }

  // Quita resaltado anterior
  document.querySelectorAll("img.imagen-seleccionada").forEach(img => {
    img.classList.remove("imagen-seleccionada");
    img.style.border = "";
  });

  // GESTO: AVANZAR 👉
  if (gesture === "👉") {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  }

  // GESTO: RETROCEDER 👈
  if (gesture === "👈") {
    currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  }

  // GESTO: REINICIAR 🤚
  // if (gesture === "🤚") {
  //   currentImageIndex = 0;
  // }

  const selected = thumbnails[currentImageIndex];

  // Aplica estilo de selección
  selected.classList.add("imagen-seleccionada");
  selected.style.border = "5px solid red";
  selected.scrollIntoView({ behavior: "smooth", block: "center" });

  // GESTO: SELECCIONAR 👊
  if (gesture === "👊") {
    // const container = selected.closest('a, div');
    // if (container) container.click();
    // else selected.click();
    console.log("✅ Imagen clickeada:", selected.src);
  } else {
    console.log("✅ Imagen resaltada:", selected.src);
  }
});
