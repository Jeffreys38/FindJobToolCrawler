import fs from 'fs'

/**
* Xuất file định dạng json
* @param {String} filePath
* @param {Json.stringfy} content
* @return {void}
*/
function saveAs(filePath, content) {
    fs.writeFileSync(filePath, JSON.stringify(content));
}

export default saveAs