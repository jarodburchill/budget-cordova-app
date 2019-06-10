function errorHandler (tx,error){
    console.log("SQL error: " + tx + " " + error);
}

var db;

var DB = {

    createDatabase: function () {
        var shortName = "BudgetAppDB";
        var version = "1.0";
        var displayName = "DB for Budget App";
        var dbSize = 2 * 1024 * 1024;

        //create database
        function successCreateDB() {
            console.info("Success: database created.")
        }
        db = openDatabase(shortName, version, displayName, dbSize, successCreateDB);
    },
    createTables: function() {
        function txFunction(tx) {
            var options = [];
            var budgetSQL = "CREATE TABLE IF NOT EXISTS budget(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "budgetName VARCHAR(24) NOT NULL," +
                "budgetLimit INTEGER NOT NULL," +
                "budgetRate VARCHAR(12) NOT NULL);";
            function successCreateBudget() {
                console.info("Success: budget table created.");
            }
            tx.executeSql(budgetSQL, options, successCreateBudget, errorHandler);
            var entrySQL = "CREATE TABLE IF NOT EXISTS entry(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "entryName VARCHAR(24) NOT NULL," +
                "entryDescription VARCHAR(128) NOT NULL," +
                "entryAmount DOUBLE NOT NULL," +
                "entryDate DATE NOT NULL," +
                "budgetId INTEGER NOT NULL," +
                "budgetStatement VARCHAR(24) NOT NULL," +
                "FOREIGN KEY(budgetId) REFERENCES budget(id));";
            function successCreateEntry() {
                console.info("Success: entry table created.");
            }
            tx.executeSql(entrySQL, options, successCreateEntry, errorHandler);
        }
        function successCreateTables() {
            console.info("Success: all tables created.");
        }
        db.transaction(txFunction, errorHandler, successCreateTables);
    },
    dropTables: function(){
        function txFunction(tx) {
            var options = [];

            //Drop budget
            var dropTypeSQL = "DROP TABLE IF EXISTS budget;";
            function successDropType() {
                console.info("Success: budget table dropped.");
            }
            tx.executeSql(dropTypeSQL, options, successDropType, errorHandler);

            //Drop entry
            var dropReviewSQL = "DROP TABLE IF EXISTS entry;";
            function successDropReview() {
                console.info("Success: entry table dropped.");
            }
            tx.executeSql(dropReviewSQL, options, successDropReview, errorHandler);
        }
        function successDropTables() {
            console.info("Success: all tables and rows dropped successfully.");
        }
        db.transaction(txFunction, errorHandler, successDropTables);
    }
};

