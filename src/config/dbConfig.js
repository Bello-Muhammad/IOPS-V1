const mongoose = require('mongoose')

const connectDB = (DB_URI) => {
	if (DB_URI === undefined) {
	  console.error('DB URI error: DB URI is undefined');
	} else {
	  mongoose.set('strictQuery', false);
	  return mongoose.connect(DB_URI).then((res) => {
            console.log("mongodb connected");
        });
	}
  };

module.exports = connectDB;

// // mongoose setup
// mongoose.connect(process.env.MONGO_URL, 
// ).then((res) => {
//     console.log("mongodb connected");
// });