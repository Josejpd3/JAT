const fs = require("fs");
const path = require('path');
const { ipcRenderer } = require("electron");
import selectedJobId from "./selectJob.js";

const currentFilePath = __filename;
const mainDataPath = path.join(path.dirname(path.dirname(path.dirname(currentFilePath))) + '/data/');

// Paths
const jobsPath = path.join(mainDataPath + "jobs.json");
const imgPath = path.join(mainDataPath + "jobPostings/")
const resumePath = path.join(mainDataPath + "resumes/")

// Selecting the every form input
let compNameElement = document.getElementById("compName");
let placeElement = document.getElementById("place");
let positionElement = document.getElementById("position");
let estSalaryElement = document.getElementById("estSalary");
let statElement = document.getElementById("options");
let dateAppliedElement = document.getElementById("dateApplied");
let contactElement = document.getElementById("contact");
let imgInputElement = document.getElementById("imgInput");
let resumeInputElement = document.getElementById("resumeInput");
let updateJob = document.getElementById("updateJob");

// Update Button Event Listner
updateJob.addEventListener("click", () => {

  // Read jobs.json imgFile
  fs.readFile(jobsPath, "utf8", (err, data) => {
    if (err) throw err;
    
    // Parse the JSON data
    let applications = JSON.parse(data);

    // Save imgFile in imgDestination
    if (imgInputElement.value) {
      const imgFile = imgInputElement.files[0];
      const imgDestination = imgPath + imgFile.name;
      const imgSource = fs.createReadStream(imgFile.path);
      const imgDestinationStream = fs.createWriteStream(imgDestination);
      imgSource.pipe(imgDestinationStream);
      applicationToEdit.img = imgFile.name;
    }
    // Save resumeFile in resumeDestination
    if (resumeInputElement.value) {
      const resumeFile = resumeInputElement.files[0];
      const resumeDestination = resumePath + resumeFile.name;
      const resumeSource = fs.createReadStream(resumeFile.path);
      const resumeDestinationStream = fs.createWriteStream(resumeDestination);
      resumeSource.pipe(resumeDestinationStream);
      applicationToEdit.resume = resumeFile.name;
    }

    // Update the job application data
    applicationToEdit.compName = compNameElement.value;
    applicationToEdit.place = placeElement.value;
    applicationToEdit.position = positionElement.value;
    applicationToEdit.estSalary = estSalaryElement.value;
    applicationToEdit.stat = statElement.value;
    applicationToEdit.dateApplied = dateAppliedElement.value;
    applicationToEdit.contact = contactElement.value;

  });
  // Refresh all windows after data is updated
  ipcRenderer.send("refresh-windows");
});
