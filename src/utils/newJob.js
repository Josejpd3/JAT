const fs = require('fs');
var data = fs.readFileSync('C:/Users/14072/Desktop/Projects/REPOS/Job-Application-Tracker-v2/src/data/jobs.json');
var jobs = JSON.parse(data);

let counter = jobs.length

compName = document.getElementById('compName')
place = document.getElementById('place')
position = document.getElementById('position')
estSalary = document.getElementById('estSalary')
stat = document.getElementById('stat')
dateApplied = document.getElementById('dateApplied')
contact = document.getElementById('contact')
fileInput = document.getElementById('fileInput')

saveJob = document.getElementById('saveJob')
jsonText = document.getElementById('jsontext')

saveJob.addEventListener("click", function(){
    const file = fileInput.files[0]
    const savePath = "C:/Users/14072/Desktop/Projects/REPOS/Job-Application-Tracker-v2/src/data/jobs.json";
})