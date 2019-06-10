var Budget = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO budget VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: budget insert transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE budget SET budgetName=?, budgetLimit=?, budgetRate=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: budget update transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    delete : function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM budget WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: budget delete transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM budget WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successSelectAll() {
            console.info("Success: budget select transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successSelectAll);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM budget;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successSelectAll() {
            console.info("Success: budget select all transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successSelectAll);
    }
};
var Entry = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO entry VALUES(?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry insert transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE entry SET entryName=?, entryDescription=?, entryAmount=?, entryDate=?, budgetId=?, budgetStatement=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry update transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    delete : function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM entry WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: budget delete transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM entry WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry select transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    selectCurrent: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM entry WHERE budgetId=? AND entryDate > date('now', budgetStatement) ORDER BY entryDate DESC, id DESC;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry select current transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM entry WHERE budgetId=? ORDER BY entryDate DESC, id DESC;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry select all transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    ruleUpdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE entry SET budgetStatement=? WHERE budgetId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: entry update transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    },
    ruleDelete : function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM entry WHERE budgetId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successInsert() {
            console.info("Success: budget delete transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successInsert);
    }
};