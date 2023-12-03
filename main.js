import getJobByPage from "./utils/getJobByPage.js";
import extractJobDetailsFromURLs from "./utils/extractJobDetailsFromURLs.js";
import fs from 'fs'

const input = './data/jobs.json';
const output = './detailsJob.json';

(async function() {
    await extractJobDetailsFromURLs(input, output)

})()

// console.log(JSON.parse(fs.readFileSync(output)).length)
