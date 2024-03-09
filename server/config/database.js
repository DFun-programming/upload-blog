const mongoose = require("mongoose");
require("dotenv").config();

const URL  = process.env.DATABASE_URL;

exports.dbConnect = () => {
	mongoose
		.connect(URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
