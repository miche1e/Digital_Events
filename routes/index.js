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

router.post("/login", async(req, res) => {
    try {//gestione errori
        if(req.body.password === "" || req.body.email === ""){
            return res.status(400).json({message:"you have to insert an email and password"});
        }
        const user = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
        const token = await user.user.getIdToken();
        isAuthorized=true;
        return res.status(201).json({message:"you are logged in now"});
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/logout", async(req, res) => {
    try {
        if(!isAuthorized){
            return res.status(401).json({message:"you are not logged in"});
        }
        await firebase.auth().signOut();
        isAuthorized = false;
        return res.status(200).json({message:"you successfully logged out"});
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;
