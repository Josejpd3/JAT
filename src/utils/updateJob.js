const fs = require("fs");
const path = require('path');
const { ipcRenderer } = require("electron");
import selectedJobId from "./selectJob.js";

const currentFilePath = __filename;
const mainDataPath = path.join(path.dirname(path.dirname(path.dirname(currentFilePath))) + '/data/');

