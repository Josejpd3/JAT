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
});
