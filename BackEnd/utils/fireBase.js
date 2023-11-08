// // Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// const { getAuth } = require("firebase/auth");
//
// const firebaseConfig = {
// 	apiKey: process.env.FIREBASE_APIKEY,
// 	authDomain: process.env.FIREBASE_AUTHDOMAIN,
// 	projectId: process.env.FIREBASE_PROJECTID,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.FIREBASE_APP_ID,
// };
//
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
//
// module.exports = {
// 	auth,
// };

// require("dotenv").config({ path: "./config.env" });

const admin = require("firebase-admin");

const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_ADMIN;

const service = require("../comicstash-99a6f-firebase-adminsdk-kntw9-0b465731fc.json");

// admin.initializeApp({
// 	credential: admin.credential.applicationDefault({
// 		projectId,
// 		privateKey,
// 	}),
// });

admin.initializeApp({
	credential: admin.credential.cert(service),
});

// Get the Firebase Storage bucket.

module.exports = admin;
