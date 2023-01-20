const fs = require('fs');
const path = require('path')
var data = fs.readFileSync(path.join(path.dirname(path.dirname(__dirname))) + '/data/jobs.json');
var jobs = JSON.parse(data);

let counter = jobs.length;

compName = document.getElementById("compName");
place = document.getElementById("place");
position = document.getElementById("position");
estSalary = document.getElementById("estSalary");
stat = document.getElementById("options");
dateApplied = document.getElementById("dateApplied");
contact = document.getElementById("contact");
emailLinks = document.getElementById("emailLink")
imgInput = document.getElementById("imgInput");
resumeInput = document.getElementById("resumeInput");
coverLetterInput = document.getElementById("coverLetterInput")

saveJob = document.getElementById("saveJob");
jsonText = document.getElementById("jsontext");

saveJob.addEventListener("click", function() {
  const savePath = path.join(path.dirname(path.dirname(__dirname))) + '/data/jobs.json';
  const imgFile = imgInput.files[0];
  const resumeFile = resumeInput.files[0];
  const coverLetterFile = coverLetterInput.files[0];

  jobs.push({
    counterId: counter,
    compName: compName.value,
    place: place.value,
    position: position.value,
    estSalary: estSalary.value,
    stat: stat.value,
    dateApplied: dateApplied.value,
    contact: contact.value,
    emailLinks: [
      emailLink.value,
    ],
    img: '',
    resume: '',
  });
  
  if (imgInput.value) {
    jobs[counter].img = imgFile.name;
    const imgDestination = path.join(path.dirname(path.dirname(__dirname))) + '/data/jobPostings/' + imgFile.name;
    const imgSource = fs.createReadStream(imgFile.path);
    const imgDestinationStream = fs.createWriteStream(imgDestination);
    imgSource.pipe(imgDestinationStream);
  }
  if (resumeInput.value) {
    jobs[counter].resume = resumeFile.name;
    const resumeDestination = path.join(path.dirname(path.dirname(__dirname))) + '/data/resumes/' + resumeFile.name;
    const resumeSource = fs.createReadStream(resumeFile.path);
    const resumeDestinationStream = fs.createWriteStream(resumeDestination);
    resumeSource.pipe(resumeDestinationStream);
  }



  var json = JSON.stringify(jobs, null, 2);

  fs.writeFile(savePath, json, "utf8", finished);
  function finished(err) {
    console.log("finished");
  }

});