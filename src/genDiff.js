import { readFileSync } from 'fs';
import _ from 'lodash'
import path from 'path'


export default (filepath1, filepath2) => {
    const file1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1)));
    const file2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2)));

    const keys1 = _.keys(file1)
    const keys2 = _.keys(file2)
    const allKeys = _.union(keys1, keys2)
    const sortedAllKeys = _.sortBy(allKeys);


    const resultObj = sortedAllKeys.reduce((acc, key) => {
        if (file1[key] === file2[key]) {
            acc[key] = file1[key]
        } else if (file1[key] !== file2[key]) {
            acc['- ' + key] = file1[key]
            acc['+ ' + key] = file2[key]
        }
        return acc
    }, {});
    
    //  console.log(resultObj)
    const correctStringObj = JSON.stringify(resultObj, null, ' ').replaceAll("\"", "")
    
    console.log(correctStringObj)
    return correctStringObj

}
