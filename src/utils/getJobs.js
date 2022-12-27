const fs = require('fs');
let data = fs.readFileSync(__dirname + '/data/jobs.json');
let jobs = JSON.parse(data);


