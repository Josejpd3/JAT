const fs = require('fs')

const mainDataPath = "C:/Users/14072/Desktop/Projects/REPOS/Job-Application-Tracker-v2/src/data/";

const jobPostingsPath = mainDataPath + "jobPostings/";
const resumePath = mainDataPath + "resumes/";

// Determine CounterId of the selected Job
const selectedJobPath = mainDataPath + 'selectedJob.json';
const selectedJobData = fs.readFileSync(selectedJobPath);
let selectedJobId = JSON.parse(selectedJobData);


// Get the job data that contains the recieved counterId
const jobsPath = mainDataPath + 'jobs.json';
const jobData = fs.readFileSync(jobsPath)
const jobs = JSON.parse(jobData);
let selectedJob = jobs[selectedJobId];


// Selecting the every form input
let compNameElement = document.getElementById('compName')
let placeElement = document.getElementById('place')
let positionElement = document.getElementById('position')
let estSalaryElement = document.getElementById('estSalary')
let statElement = document.getElementById('options')
let dateAppliedElement = document.getElementById('dateApplied')
let contactElement = document.getElementById('contact')
let imgInputElement = document.getElementById('imgInput')
let resumeInputElement = document.getElementById('resumeInput')
let updateJob = document.getElementById('updateJob')

const jobPostingContainer = document.getElementById('jobPostingContainer');
const resumeContainer = document.getElementById('resumeContainer');


// Giving form input values with job data
compNameElement.value = selectedJob.compName;
placeElement.value = selectedJob.place;
positionElement.value = selectedJob.position;
estSalaryElement.value = selectedJob.estSalary;
statElement.value = selectedJob.stat;
dateAppliedElement.value = selectedJob.dateApplied;
contactElement.value = selectedJob.contact;

var openImg = document.createElement('button');
openImg.type = 'button';
openImg.innerHTML = "Open Job Posting";
openImg.onclick = function() {
    window.open(jobPostingsPath + selectedJob.img)
}
