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

//Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//Connecting to db
const db = admin.firestore();

const router = express.Router();
let isAuthorized = false;

router.post("/signup", async(req, res) => {
    try {
        if(req.body.password === "" || req.body.email === ""){
            return res.status(400).json({message:"you have to insert an email and password"});
        }
        if(!req.body.firstName || req.body.firstName === ""){
            return res.status(400).json({message:"you have to insert first name"});
        }
        if(!req.body.lastName || req.body.lastName === ""){
            return res.status(400).json({message:"you have to insert first name"});
        }
        if(req.body.password != req.body.password2){
            return res.status(400).json({message:"your passwords don't match!"});
        }
        const user = await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password);
        const userId = await user.user.uid;
        const email = await user.user.email;
        const firstName = await req.body.firstName;
        const lastName = await req.body.lastName;
        let phone = await req.body.phone;
        if(!phone || phone === ""){
            phone = null;
        }else if(isNaN(phone)){
            return res.status(400).json({message:"you have to enter numbers in phone field"});
        }
        let newUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            position: null,
            role: "user"
        }
        db.collection('users').doc(userId.toString()).set(newUser);
        return res.status(201).json({message: "You registered succesfully!"});
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

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

router.get("/locations", async (req, res) => {
    try {
        const locations = new Array();
        const rawList = await db.collection("locations").get();
        rawList.forEach(doc => {
            locations.push(doc.data());
        });
        return res.status(200).json(locations);
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

router.get("/locations/:id", async (req, res) => {
    try {
        const location = await db.collection('locations').doc(req.params.id).get();
        if (!location.data()) {
            return res.status(404).json({message: "Location not found"});
        }
        return res.status(200).json(location.data());
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

module.exports = router;
