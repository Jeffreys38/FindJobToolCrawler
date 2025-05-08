import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import cliProgress from "cli-progress";
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import fs from 'fs'
import { sleepRandom } from "./byPassing.js";

// Use plugins
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
puppeteer.use(StealthPlugin());

// Mảng lưu job hiện có trong tệp đầu vào (input)
let listJobs

// Mảng chứa các job đã được trích xuất (generated)
let generatedJob

// Nếu job đó đã duyệt qua lần thứ 2 nhưng vẫn không lấy được thì bỏ qua
let countPassedJob = 0

let browser 
let page

/**=
* Trích xuất chi tiết nghề nghiệp dựa vào mảng (chứa url nghề nghiệp)
* @param {string} input Đường dẫn tới tệp .json (mảng url)
* @param {string} output Đường dẫn tới thư mục chứa thông tin chi tiết job
* @return {Promise<void>}
*/
export default async function extractJobDetailsFromURLs(input, output) {
    listJobs = JSON.parse(fs.readFileSync(input))
    
    browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    });
    page = await browser.newPage();

    // If work didn't  finish
    listJobs = unfinishedJob(listJobs, output)

    await extractJobs(listJobs, input, output)
}

/**
* Trích xuất chi tiết nghề nghiệp dựa url nghề nghiệp
* @param {Array} url Url của nghề nghiệp (chi tiết)
* @return {Promise<object>} Mô tả chi tiết về nghề nghiệp
*/
const extractJobs = async (listJob, input, output) => {  
    // Init progress bar
    const bar = new cliProgress.SingleBar(
        {
          format:
            "Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
          clearOnComplete: true,
        },
        cliProgress.Presets.shades_classic
      );
    bar.start(listJob.length, 0);

    let data = []

    for(const [index, url] of listJob.entries()) {
        await page.goto(url)
        
        // Nếu CloudFlare chặn lại thì lưu lại, kèm theo vị trí hiện tại
        try {
            const options = {
                'timeout': 6 * 1000
            }
            await page.waitForSelector('.job-detail__body-left', options)
            bar.increment()
        } catch(e) {
            if (!fs.existsSync(output))
                fs.writeFileSync(output, "[]")

            // Get existing job from file
            generatedJob = JSON.parse(fs.readFileSync(output))

            // Add new extracting job into existing job and update it
            generatedJob = generatedJob.concat(data)

            // Update file again
            fs.writeFileSync(output, JSON.stringify(generatedJob))

            // After random seconds, call again with new tab and continue working
            await sleepRandom(2 * 60 * 60, 3 * 60 * 60)

            // Get list url
            let urls = JSON.parse(fs.readFileSync(input))
            let unJob = unfinishedJob(urls, output)
            
            // Show log
            const done = urls.length - unJob.length
            console.log(`\n[${done} / ${urls.length}]`)

            // If you still can't get it 2 times = CloudFlare + Working is removed, give it up
            countPassedJob++
            if (countPassedJob == 2) {
                // Remote work is not working in file
                removeUrlJob(input, url)

                countPassedJob = 0
            }

            await extractJobs(unJob, input, output)
        }

        let job = await page.evaluate(() => {
            // Tên việc làm
            const name = document.querySelector(".job-detail__info--title").textContent.trim();

            // Kinh nghiệm cần có
            const experience = Array.from(document.querySelectorAll(".job-detail__info--section-content-title"))
                .find(element => element.textContent.trim() === "Kinh nghiệm")
                .nextElementSibling.textContent.trim();

            // Mô tả công việc
            const description = Array.from(document.querySelectorAll(".job-description__item > h3"))
                .find(element => element.textContent.trim() === "Mô tả công việc")
                .nextElementSibling.textContent.trim();

            // Yêu cầu ứng viên
            const required = Array.from(document.querySelectorAll(".job-description__item > h3"))
                .find(element => element.textContent.trim() === "Yêu cầu ứng viên")
                .nextElementSibling.textContent.trim();
            
            // Quyền lợi
            const benefit = Array.from(document.querySelectorAll(".job-description__item > h3"))
                .find(element => element.textContent.trim() === "Quyền lợi")
                .nextElementSibling.textContent.trim();
            
            // Địa điểm làm việc
            const address = Array.from(document.querySelectorAll(".job-description__item > h3"))
                .find(element => element.textContent.trim() === "Địa điểm làm việc")
                .nextElementSibling.textContent.trim();
            
            // Cách thức ứng tuyển
            const applyMethod = Array.from(document.querySelectorAll(".job-description__item > h3"))
                .find(element => element.textContent.trim() === "Cách thức ứng tuyển")
                .nextElementSibling.textContent.trim();

            const companyName = document.querySelector(".company-name-label > a").innerText;
            const companyLogo = document.querySelector(".company-logo > img").src

            return { name, experience, description, required, benefit, address, applyMethod, companyName, companyLogo }
        });
        
        data.push(job)
    }

    bar.stop()

    await browser.close()

    return data
}

const unfinishedJob = (listJobs, output) => {
    let result = listJobs

    if (!fs.existsSync(output))
        fs.writeFileSync(output, "[]")

    const passedJob = JSON.parse(fs.readFileSync(output))
    // If work didn't  finish
    if (passedJob.length < result.length) {
        // Remove job is passed
        result = result.slice(passedJob.length)
    }

    return result
}

function removeUrlJob(inputFile, urlRemove) {
    let listJob = JSON.parse(fs.readFileSync(inputFile))
    let newList = []
    let temp = []

    for (const [index, job] of listJob.entries()) {
        if (job == urlRemove) {
            newList = listJob.slice(0, index )
            temp = listJob.slice(index + 1, listJob.length)
            newList = newList.concat(temp)

            break
        }
    }

    fs.writeFileSync(inputFile, JSON.stringify(newList))
}