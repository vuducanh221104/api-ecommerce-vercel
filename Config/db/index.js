const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/database_ecommerce', {
            useNewUrlParser: true,
        });
        console.log('CONNTECTED');
    } catch (err) {}
}

module.exports = { connect };
