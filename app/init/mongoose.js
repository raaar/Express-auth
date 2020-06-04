const mongoose = require('mongoose');

const OPTIONS = { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
};

const initDb =  () => {
    mongoose.connect(process.env.DB_URL, OPTIONS).then(
        () => { 
            console.log('OK: Connected to mongodb');
        },
        err => { 
            console.log('Error: Unable to connect to mongodb', err);
        }
    );

    return mongoose;
}

module.exports = initDb;