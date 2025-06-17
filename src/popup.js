import * as tf from '@tensorflow/tfjs';

let model;
const labelContainer = document.getElementById("label-container");
const videoContainer = document.getElementById("video-container");
const classNames = ["✋", "👊"]; // Ajusta según tu modelo

document.getElementById("start-button").addEventListener("click", init);

async function init() {
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  video.width = 224;
  video.height = 224;
  videoContainer.appendChild(video);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await loadModel();

    video.onloadedmetadata = () => {
      video.play();
      predictLoop(video);
    };
  } catch (err) {
    console.error("No se pudo acceder a la cámara:", err);
    labelContainer.innerText = "Permiso denegado o sin acceso.";
  }
}

async function loadModel() {
  try {
    model = await tf.loadLayersModel(chrome.runtime.getURL("model/model.json"));
    console.log("Modelo cargado correctamente");
  } catch (err) {
    console.error("Error cargando el modelo:", err);
    labelContainer.innerText = "Error al cargar el modelo.";
  }
}

async function predictLoop(video) {
  const loop = async () => {
    const tensor = tf.browser.fromPixels(video)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255)
      .expandDims(0);

    const prediction = await model.predict(tensor);
    const data = await prediction.data();
    const maxIndex = data.indexOf(Math.max(...data));

    labelContainer.innerText = `${classNames[maxIndex]} (${(data[maxIndex] * 100).toFixed(1)}%)`;

    tensor.dispose();
    prediction.dispose();

    requestAnimationFrame(loop);
  };
  loop();
}