const fs = require('fs');

function getFileContent(srcPath, callback) {
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
    }
    );
}

function copyFileContent(savPath, srcPath) {
    getFileContent(srcPath, function (data) {
        fs.writeFile(savPath, data, function (err) {
            if (err) throw err;
            console.log('complete');
        });
    });
}

function buildJson(index) {
    let path = `3000-common-characters/${index}.txt`;
    let readable = fs.createReadStream(path, {
        flags: 'r',
        encoding: 'utf-8',
        fd: null
    });

    let line = '';
    let jdata = {
        total: 3000,
        count: 20,
        hits: []
    };
    let obj = {
        _id: (20 * index + 1) + '',
        sc: '',
        tc: '',
        pinyin: null,
        definition: ''
    };
    readable.on('readable', () => {
        let chunk;
        while (null !== (chunk = readable.read(1))) {
            if (chunk == '\n' || chunk == '\r') {
                if (/^\d+$/.test(line)) {
                    if(typeof obj.sc !== 'string') {
                        console.error('====Invalid "character"\n', obj);
                        throw Error(`Invalid "character" in file ${index}.txt`);
                    }
                    obj.definition = obj.definition.trim();
                    jdata.hits.push(obj);
                    obj = {};
                    obj._id = line;
                    obj.definition = '';
                } else {
                    obj.definition += line + '\n';
                    let term = line.replace(/[\sFA,\(\)]/g, '');
                    if (isChineseCharacter(term)) {
                        obj.sc = term.charAt(0);
                        if (term.length > 1) {
                            if (/F/.test(line)) {
                                obj.tc = term.charAt(1);
                            }
                        }
                    }
                    if (!obj.pinyin) {
                        let matches = /^\[([^\[\]]+)\]/.exec(line);
                        if (matches && matches.length > 1) {
                            obj.pinyin = matches[1];
                        }
                    }
                }
                //clear line
                line = '';
            } else {
                line += chunk;
            }
        }

        //console.log(jdata);
        fs.writeFile('../assets/json/common-characters/' + index + '.json', JSON.stringify(jdata), (err) => {
            if (err) throw err;
            console.log('Success');

            //Map Index
            jdata.hits.forEach(item => {
                MAP_IDX += `"${item.sc}": ${index},\n`;
                if (item.tc && item.tc.length > 0) {
                    MAP_IDX += `"${item.tc}": ${index},\n`;
                }
            });
            if (index === FILE_COUNT - 1) {
                fs.writeFile('../assets/json/common-characters/index.json', `{\n${MAP_IDX.replace(/,\n$/, '')}\n}`, (err) => {
                    if (err) throw err;
                    console.log('Saved');
                });
            }
        });
    });
}

function isChineseCharacter(str) {
    if (!str) {
        return false;
    }
    let regexChineseChar = new RegExp("^[\u4E00-\uFA29]*$");
    let regexNonChineseChar = new RegExp("^[\uE7C7-\uE7F3]*$");
    str = str.replace(/\s/g, '');

    if (!regexChineseChar.test(str) || regexNonChineseChar.test(str)) {
        return false;
    }
    return true;
}

let MAP_IDX = '';
//0, 1, 2,...,150
const FILE_COUNT = 56;
for (let i = 0; i < FILE_COUNT; i++) {
    buildJson(i);
}

