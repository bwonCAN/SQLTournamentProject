const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

// Login
async function loginAccount(username, passwordHash) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM Player WHERE playerName=:username AND passwordHash=:passwordHash`,
            [username, passwordHash],
            { autoCommit: true }
        );
        return result.rows[0][0] == username && result.rows[0][2] == passwordHash;
    }).catch(() => {
        return false;
    });
}

// Register
async function registerAccount(username, email, password, country) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Player (playerName, email, passwordHash, country, wins, losses, points, elo) 
             VALUES (:username, :email, :password, :country, 0, 0, 0, 1500)`,
            [username, email, password, country],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// Retrieve match history of playerName
async function retrieveMatchHistory(playerName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT playerName1, playerName2, result, datetime, P.matchID 
             FROM PlayersPlayInMatch P, Match M 
             WHERE (P.playerName1=:playerName OR P.playerName2=:playerName) AND P.matchID = M.matchID`,
            [playerName],
            { autoCommit: true }
        );
        return result.rows;
    }).catch(() => {
        return false;
    });
}

// ----------------------------------------------------------

module.exports = {
    testOracleConnection,
    loginAccount,
    registerAccount,
    retrieveMatchHistory
};