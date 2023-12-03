import chalk from 'chalk';

export default function getProcessing(currentPercent) {
    const progressBarLength = 100; // Chiều dài thanh xử lý
    const progressChars = Math.round((currentPercent / 100) * progressBarLength);

    const greenArrow = chalk.green('>');
    const progressBar = greenArrow.repeat(progressChars) + '-'.repeat(progressBarLength - progressChars);

    return `[${progressBar}]`;
}

