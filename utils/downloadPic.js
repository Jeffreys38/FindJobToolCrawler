import axios from 'axios';
import fs from 'fs/promises'; // Using fs.promises for async file operations

async function downloadPic(input, output) {
    const listJob = JSON.parse(await fs.readFile(input));
    let STT = 0;
    let indexDelete = [];

    async function toDo() {
        for (let i = STT; i < listJob.length; i++) {
            try {
                let url = listJob[i].companyLogo;
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                let folder = output + '/' + STT + '.jpeg';

                await fs.writeFile(folder, response.data);
                console.log(STT + ' downloaded successfully!');
                STT++;
            } catch (error) {
                // Neu anh loi thi :)) delete item
                indexDelete.push(STT + 1);
            }
        }
    }

    await toDo();

    // Update file
    for (let i = 0; i < indexDelete.length; i++) {
        listJob.splice(indexDelete[i], 1);
    }
    await fs.writeFile(input, JSON.stringify(listJob));
}

export default downloadPic;
