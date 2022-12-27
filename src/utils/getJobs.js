const fs = require('fs');
let data = fs.readFileSync(__dirname + '/data/jobs.json');
let jobs = JSON.parse(data);


// Get all jobs data
fetch(__dirname + "/data/jobs.json")
.then(function(response) {
    return response.json();
})
.then(function(jobs){
    // Select HTML elements
    const placeholder = document.querySelector("#data-output");
    const container = document.getElementById('jobBtnContainer');

    let out = "";

    // Loop through jobs and build out each job row data depending on status
    for(let job of jobs) {
    if(job.stat == "Applied") {
                out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status applied"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${job.dateApplied}</div>
            </div>
        `;
    } else if (job.stat == "Interview") {
        out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status interview"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${job.dateApplied}</div>
            </div>
        `;



    });