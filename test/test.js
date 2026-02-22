import DeviceDedector from "../dist/DeviceDedector.js"

document.body.innerText = `Device Type : ${new DeviceDedector().Type()}`