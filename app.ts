// Kyran Stagg 28/11/2021
// program to validate flybuys card number via cli

const db = require("./src/resources/db");
const expressinit = require("./src/resources/express");

const app = expressinit();
const port = 4941;

// Test connection to MySQL on start-up
async function testDbConnection() {
    try {
        await db.createPool();
        await db.getPool().then(function(p:any) {
            return p.getConnection()
        })
    } catch (err: any) {
        console.error(`Unable to connect to MySQL: ${err.message}`);
        throw err;
    }
}

testDbConnection().then(function () {
    app.listen(port, function () {
        console.log(`Listening on port: ${port}`);
    });
});
