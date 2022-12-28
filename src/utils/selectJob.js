const fs = require('fs')

const mainDataPath = "C:/Users/14072/Desktop/Projects/REPOS/Job-Application-Tracker-v2/src/data/";

const jobPostingsPath = mainDataPath + "jobPostings/";
const resumePath = mainDataPath + "resumes/";

// Determine CounterId of the selected Job
const selectedJobPath = mainDataPath + 'selectedJob.json';
const selectedJobData = fs.readFileSync(selectedJobPath);
let selectedJobId = JSON.parse(selectedJobData);



