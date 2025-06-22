let currentImageIndex = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const gesture = request.gesture;

  const thumbnails = Array.from(document.querySelectorAll('img[src^="data:image/jpeg"]'))
    .filter(img => img.width > 100 && img.height > 100);

  if (thumbnails.length === 0) {
    console.log("❌ No se encontraron imágenes compatibles.");
    return;
  }

  document.querySelectorAll("img.imagen-seleccionada").forEach(img => {
    img.classList.remove("imagen-seleccionada");
    img.style.border = "";
  });

  if (gesture === "✋") {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  }

  if (gesture === "👈") {
    currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  }

  const selected = thumbnails[currentImageIndex];

  selected.classList.add("imagen-seleccionada");
  selected.style.border = "5px solid red";
  selected.scrollIntoView({ behavior: "smooth", block: "center" });

  if (gesture === "🤚") {
    const container = selected.closest('a, div');
    if (container) container.click();
    else selected.click();
  }

  if (gesture === "👍") {
    // const imageURL = selected.src;

    // // Crear un enlace temporal
    // const link = document.createElement("a");
    // link.href = imageURL;
    // link.download = "imagen_seleccionada.jpg"; 
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    console.log("✅ Imagen descargada:", imageURL);
  } else {
    console.log("✅ Imagen resaltada:", selected.src);
  }
});
