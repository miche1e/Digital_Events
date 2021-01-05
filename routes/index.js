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

async function newId() {
    const locations = [];
    const list = await db.collection("locations").get();
    list.forEach(doc => locations.push(doc.data()));
    return locations.length > 0 ? Math.max(...locations.map(location => location.id)) + 1 : 1
}

router.post("/location", async (req, res) => {
    if (authRole == "admin") {
        try {
            if (!req.body.location) {
                return res.status(400).json({ message: "Bad request: missing location!" });
            }
            const newLocation;
            newLocation = {
                id: newId(),
                description: req.body.description,
                position: req.body.position
            }
            db.collection('quotes').doc(newId.toString()).set(newQuote);
            return res.status(201).json({ message: "Created" });
        }catch{};
    } else {
        return res.status(403).json({ message: "you're not allowed to add this content!"});
    }
});

module.exports = router;
