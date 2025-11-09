const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const { Random } = require('random-js'); // Import Random from random-js
const random = new Random();
const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) return simpleGit().push();
    
    let DATE;
    const today = moment(); // Get today's date

    // Generate a date in the past (before today)
    do {
        const x = random.integer(0, 54);
        const y = random.integer(0, 6);
        DATE = moment().subtract(1, 'y').add(x, 'w').add(y, 'd'); // Generate a date
    } while (DATE.isAfter(today)); // Keep generating until it's before today

    const formattedDate = DATE.format();

    const data = {
        date: formattedDate
    };
    console.log(formattedDate);

    jsonfile.writeFile(FILE_PATH, data, () => {
        // Git commit with the date
        simpleGit().add([FILE_PATH]).commit(formattedDate, { '--date': formattedDate }, 
            makeCommit.bind(this, --n));
    });
};

makeCommit(500);
