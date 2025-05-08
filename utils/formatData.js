import { log } from 'console';
import fs from 'fs';

// des, required, benefit
function formatString(data) {

}

function formatData() {
    let listJob = JSON.parse(fs.readFileSync('C:/Users/quoct/Data/Projects/find-job/detail.json'));
 
    const replaceRules = [
        { find:/([\n])([ ])([A-Z])/g, replaceWith:  '$1•$2$3' },
    ];

    for (const job of listJob) {
        for (const rule of replaceRules) {
            job.description = job.description.replaceAll(rule.find, rule.replaceWith);
            job.required = job.required.replaceAll(rule.find, rule.replaceWith);
            job.benefit = job.benefit.replaceAll(rule.find, rule.replaceWith);
        }
    }

    fs.writeFileSync('format.json', JSON.stringify(listJob))
}

export default formatData;