const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const file = "./csv/visitors.csv"

fs.createReadStream(path.resolve(file))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));





const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const User = require('./models/user');

fs.createReadStream(path.resolve(file, 'assets', 'snake_case_users.csv'))
    .pipe(csv.parse({ headers: true }))
    // pipe the parsed input into a csv formatter
    .pipe(csv.format({ headers: true }))
    // Using the transform function from the formatting stream
    .transform((row, next) => {
        User.findById(row.id, (err, user) => {
            if (err) {
                return next(err);
            }
            return next(null, {
                id: row.id,
                "Name": row.first_name,
                "Sex": row.last_name,
                "Age": row.address,
                // properties from user
                "Height (in)": user.isVerified,
                "Weight (lb)": user.hasLoggedIn,
            });
        });
    })
    .pipe(process.stdout)
    .on('end', () => process.exit());