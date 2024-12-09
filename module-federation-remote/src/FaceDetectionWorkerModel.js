import * as Comlink from "comlink";

// import Worker from "!worker-loader./worker.js";

class FaceDetectionWorkerModel {
  constructor() {
    this.place = "Hyd";
    this.initWorker();
  }

  initWorker = async () => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module"
    });

    const FaceDetectionWorkerClass = Comlink.wrap(worker);

    //@ts-ignore
    this.faceDetectionWorker = await new FaceDetectionWorkerClass();

    console.log("NAME", this.faceDetectionWorker.name);
  };
}

export default FaceDetectionWorkerModel;
