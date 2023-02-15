const mongoose = require('mongoose');


const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected.');
  } catch (err) {
    console.error(`Error on connecting database: ${err}`);
  }
};

module.exports = connectDb;
