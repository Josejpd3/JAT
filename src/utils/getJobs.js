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





    });