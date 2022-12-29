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
    
    function compareNumbers(a, b) {
        return b.counterId - a.counterId;
    }

    // Sort json by it's id (descending(descending) or ascending(jobs))
    const descending = jobs.sort(compareNumbers);


    let jobAmount = document.createElement("div");
    jobAmount.innerHTML = jobs.length;
    jobAmount.id = "jobAmount";
    container.appendChild(jobAmount)



// Loop through jobs and build out each job row data depending on status
    for(let job of descending) {

    // Set the target date in the past
    var targetDate = new Date(job.dateApplied);

    // Get the current date and time
    var currentDate = new Date();
    
    // Calculate the time difference in milliseconds
    var timeDifference = currentDate - targetDate;
    
    // Convert the time difference to days
    var daysSinceTargetDate = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let timeSince;

    if (daysSinceTargetDate > 30) {
        if (Math.round(daysSinceTargetDate / 30.44) > 1) {
            timeSince = Math.round(daysSinceTargetDate / 30.44) + " Months";
        } else {
            timeSince = Math.round(daysSinceTargetDate / 30.44) + " Month";
        }
    } else if (daysSinceTargetDate <= 30) {
        if (daysSinceTargetDate < 1) {
            timeSince = "Today";
        } else if (daysSinceTargetDate > 1) {
            timeSince = daysSinceTargetDate + " Days";
        } else {
            timeSince = daysSinceTargetDate + " Day";
        }
    }


    if(job.stat == "Applied") {
                out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status applied"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${timeSince}</div>
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
                <div class="date">${timeSince}</div>
            </div>
        `;
    } else if (job.stat == "Rejected") {
    out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status rejected"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${timeSince}</div>
            </div>
        `;        
    } else if (job.stat == "Offer") {
        out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status offer"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${timeSince}</div>
            </div>
        `;
    } else {
        out += `
            <div class="job-data" id="${job.counterId}">
                <div class="status unknown"></div>
                <div class="compName">${job.compName}</div>
                <div class="location">${job.place}</div>
                <div class="position">${job.position}</div>
                <div class="salary">${job.estSalary}</div>
                <div class="date">${timeSince}</div>
            </div>
        `;
    }


    // Place built content in the placeholder
    placeholder.innerHTML = out;


    // Create edit/open button
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = "Open";
    button.className = "jobBtns";
    button.id = job.counterId;


    // When click get the button's ID and save it -> src/data/selectedJob.json
    button.onclick = function() {
        
        // stringify the button's id
        const jobId = JSON.stringify(this.id);

        // Write the jobId to the json file -> src/data/selectedJob.json
        fs.writeFileSync(__dirname + '/data/selectedJob.json', jobId)

        // Opem modal on click
        ipc.send('open-modal-window');
    };
    
    // Append the button to container
    container.appendChild(button);
    }



    });