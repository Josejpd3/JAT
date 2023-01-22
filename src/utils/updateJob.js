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
const coverLetterPath = path.join(mainDataPath + "coverLetters/")

// Selecting the every form input
let compNameElement = document.getElementById("compName");
let placeElement = document.getElementById("place");
let positionElement = document.getElementById("position");
let estSalaryElement = document.getElementById("estSalary");
let statElement = document.getElementById("options");
let dateAppliedElement = document.getElementById("dateApplied");
let contactElement = document.getElementById("contact");
let emailLinkElement = document.getElementById("emailLink");
let imgInputElement = document.getElementById("imgInput");
let resumeInputElement = document.getElementById("resumeInput");
let coverLetterInputElement = document.getElementById("coverLetterInput");
let updateJob = document.getElementById("updateJob");

// Update Button Event Listner
updateJob.addEventListener("click", () => {

  // Read jobs.json imgFile
  fs.readFile(jobsPath, "utf8", (err, data) => {
    if (err) throw err;
    
    // Parse the JSON data
    let applications = JSON.parse(data);
    let applicationToEdit = applications[selectedJobId]

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

    // Save coverLetterFile in coverLetterDestination
    if (coverLetterInputElement.value) {
      const coverLetterFile = coverLetterInputElement.files[0];
      const coverLetterDestination = coverLetterPath + coverLetterFile.name;
      const coverLetterSource = fs.createReadStream(coverLetterFile.path);
      const coverLetterDestinationStream = fs.createWriteStream(coverLetterDestination);
      coverLetterSource.pipe(coverLetterDestinationStream);
      applicationToEdit.coverLetter = coverLetterFile.name;
    }

    // Update the job application data
    applicationToEdit.compName = compNameElement.value;
    applicationToEdit.place = placeElement.value;
    applicationToEdit.position = positionElement.value;
    applicationToEdit.estSalary = estSalaryElement.value;
    applicationToEdit.stat = statElement.value;
    applicationToEdit.dateApplied = dateAppliedElement.value;
    applicationToEdit.contact = contactElement.value;
    if (emailLinkElement.value) {
      applicationToEdit.emailLinks.push(emailLinkElement.value)
    }

    // Convert the object back into a JSON string
    data = JSON.stringify(applications, null, 2);

    // Write the modified JSON string to the imgFile
    fs.writeFile(jobsPath, data, "utf8", (err) => {
      if (err) throw err;

      console.log("Application updated successfully!");
    });
  });
  // Refresh all windows after data is updated
  ipcRenderer.send("refresh-windows");
});
