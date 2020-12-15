const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
const firebase = require("firebase");

var firebaseConfig = {
apiKey: "AIzaSyCzhwVlws76aZk-TwhgP_TtTxuqJGFpI0M",
authDomain: "digital-events-56f2b.firebaseapp.com",
projectId: "digital-events-56f2b",
storageBucket: "digital-events-56f2b.appspot.com",
messagingSenderId: "947238163505",
appId: "1:947238163505:web:85fc6008228aaf8c1d3110"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const router = express.Router();
let isAuthorized = false;


module.exports = router;
