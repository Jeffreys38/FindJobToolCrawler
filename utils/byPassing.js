const randomDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 200));

const simulateMouseClick = async (page) => {
  const randomX = Math.floor(Math.random() * 500) + 800; // Adjust as needed
  const randomY = Math.floor(Math.random() * 500) + 500; // Adjust as needed

  await page.mouse.move(randomX, randomY);
  await randomDelay()
  await page.mouse.down();
  await page.mouse.up();

  await randomDelay();
};

function sleep(milliseconds) {
  return new Promise(r => setTimeout(r, milliseconds));
}

/**
* Chờ đợi 1 khoảng thời gian ngẫu nhiên trong khoảng [min, max]
* @param {Number} min (miliseconds)
* @param {Number} max (miliseconds)
* @return {Promise<object>}
*/
function sleepRandom(min, max) {
  const randomTime = Math.floor(Math.random() * (max - min + 1) + min);
  
  return new Promise(r => setTimeout(r, randomTime));
}

export {randomDelay, simulateMouseClick, sleep, sleepRandom}