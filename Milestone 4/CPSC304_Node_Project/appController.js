const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// ----------------------------------------------------------

// Login
router.post("/login-account", async (req, res) => {
    const { username, passwordHash } = req.body;
    const loginResult = await appService.loginAccount(username, passwordHash);
    if (loginResult) {
        res.json({
            success: true,
            result: loginResult
         });
    } else {
        res.status(500).json({ success: false });
    }
});

// Register
router.post("/register-account", async (req, res) => {
    const { username, email, password, country } = req.body;
    const loginResult = await appService.registerAccount(username, email, password, country);
    if (loginResult) {
        res.json({
            success: true
         });
    } else {
        res.status(500).json({ success: false });
    }
});

// Match History
router.post("/retrieve-match-history", async (req, res) => {
    const { playerName } = req.body;
    const matchHistoryContent = await appService.retrieveMatchHistory(playerName);
    if (matchHistoryContent) {
        res.json({
            success: true,
            data: matchHistoryContent
         });
    } else {
        res.status(500).json({ success: false });
    }
});

// ----------------------------------------------------------
// Examples

// router.get('/demotable', async (req, res) => {
//     const tableContent = await appService.fetchDemotableFromDb();
//     res.json({data: tableContent});
// });

// router.post("/initiate-demotable", async (req, res) => {
//     const initiateResult = await appService.initiateDemotable();
//     if (initiateResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// router.post("/insert-demotable", async (req, res) => {
//     const { id, name } = req.body;
//     const insertResult = await appService.insertDemotable(id, name);
//     if (insertResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// router.post("/update-name-demotable", async (req, res) => {
//     const { oldName, newName } = req.body;
//     const updateResult = await appService.updateNameDemotable(oldName, newName);
//     if (updateResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// router.get('/count-demotable', async (req, res) => {
//     const tableCount = await appService.countDemotable();
//     if (tableCount >= 0) {
//         res.json({ 
//             success: true,  
//             count: tableCount
//         });
//     } else {
//         res.status(500).json({ 
//             success: false, 
//             count: tableCount
//         });
//     }
// });


module.exports = router;