const fs = require('fs')
const path = require('path')

const currentFilePath = __dirname;
const mainDataPath = path.join(path.dirname(path.dirname(path.dirname(currentFilePath))) + '/src/data/');

const jobPostingsPath = mainDataPath + "jobPostings/";
const resumePath = mainDataPath + "resumes/";
const coverLetterPath = mainDataPath + "coverLetters/";

// Determine CounterId of the selected Job
const selectedJobPath = path.join(mainDataPath + 'selectedJob.json');
const selectedJobData = fs.readFileSync(selectedJobPath);
let selectedJobId = JSON.parse(selectedJobData);


// Get the job data that contains the recieved counterId

const jobsPath = path.join(mainDataPath + 'jobs.json');
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
let emailLinkElement = document.getElementById('emailLink')
let imgInputElement = document.getElementById('imgInput')
let resumeInputElement = document.getElementById('resumeInput')
let updateJob = document.getElementById('updateJob')

const emailLinkContainer = document.getElementById('emailLinkContainer')
const jobPostingContainer = document.getElementById('jobPostingContainer');
const resumeContainer = document.getElementById('resumeContainer');
const coverLetterContainer = document.getElementById('coverLetterContainer');


// Giving form input values with job data
compNameElement.value = selectedJob.compName;
placeElement.value = selectedJob.place;
positionElement.value = selectedJob.position;
estSalaryElement.value = selectedJob.estSalary;
statElement.value = selectedJob.stat;
dateAppliedElement.value = selectedJob.dateApplied;
contactElement.value = selectedJob.contact;

statElement.classList = statElement.value;



for (let i = 0; i < selectedJob.emailLinks.length; i++) {
    console.log(selectedJob.emailLinks[i]);
    // openEmailLink.href = selectedJob.emailLinks[i];
    let openEmailLink = document.createElement('button');
    openEmailLink.type = 'button'
    openEmailLink.innerHTML = i + 1;
    openEmailLink.onclick = function() {
        window.open(selectedJob.emailLinks[i])
    }
    emailLinkContainer.appendChild(openEmailLink)
}



var openImg = document.createElement('button');
openImg.type = 'button';
openImg.innerHTML = "Open Job Posting";
openImg.onclick = function() {
    window.open(jobPostingsPath + selectedJob.img)
}
jobPostingContainer.appendChild(openImg)


let openResume = document.createElement('button');
openResume.type = 'button';
openResume.innerHTML = "Open Resume";
openResume.onclick = function() {
    window.open(resumePath + selectedJob.resume)
}
resumeContainer.appendChild(openResume)

let openCoverLetter = document.createElement('button');
openCoverLetter.type = 'button';
openCoverLetter.innerHTML = "Open Cover Letter";
openCoverLetter.onclick = function() {
    window.open(coverLetterPath + selectedJob.coverLetter)
}
// Export
export default selectedJobId;