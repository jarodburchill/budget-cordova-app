function insertBudget() {
    var budgetName = $("#txtBudgetName").val();
    var budgetLimit =$("#rngBudgetLimit").val();
    var budgetRate;

    var weekly = $("#rdoBudgetRate-weekly");
    if (weekly.prop("checked"))
    {
        budgetRate = weekly.val();
    }
    var bi_weekly = $("#rdoBudgetRate-bi-weekly");
    if (bi_weekly.prop("checked"))
    {
        budgetRate = bi_weekly.val();
    }
    var monthly = $("#rdoBudgetRate-monthly");
    if (monthly.prop("checked"))
    {
        budgetRate = monthly.val();
    }
    var bi_monthly = $("#rdoBudgetRate-bi-monthly");
    if (bi_monthly.prop("checked"))
    {
        budgetRate = bi_monthly.val();
    }

    var options = [null, budgetName, budgetLimit, budgetRate];

    function callback() {
        console.info("Success: record inserted into budget table.");
    }

    Budget.insert(options, callback);
}

function selectAllBudgets() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";
        var list = $("#lvBudgets");

        if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
                var budget = results.rows[i];

                htmlCode += "<li>" +
                    "<a data-role='button' data-row-id=" + budget['id'] + " href='#pgViewEntries'>" +
                    "<h1>" + budget['budgetName'] + "</h1>" +
                    "<p>Limit: $" + budget['budgetLimit'] + "</p>" +
                    "<p>Filter Rate: " + budget['budgetRate'] + "</p>" +
                    "</a>" +
                    "</li>";

                list = list.html(htmlCode);
                list.listview("refresh");

                function clickHandler() {
                    localStorage.setItem("selectedBudgetId", $(this).attr("data-row-id"));
                    setBudgetStatement();
                }

                $("#lvBudgets a").on("click", clickHandler);
            }
        }
        else {
            list = list.html("");
            list.listview("refresh");
        }
    }
    Budget.selectAll(options, callback);
}

function displaySelectedBudget() {
    var htmlCode = "";
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback(tx, results) {
        var budget = results.rows[0];
        htmlCode += "<h3 style='text-align: center'>" + budget['budgetName'] + " Budget</h3>" +
            "<p>Limit: $" + budget['budgetLimit'] + "</p>" +
            "<p>Filter Rate: " + budget['budgetRate'] + "</p>";

        $("#divViewEntries").html(htmlCode);
    }
    Budget.select(options, callback);
}

function editSelectedBudget() {
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback(tx, results) {
        var budget = results.rows[0];

        function refreshRadio() {
            $("#rdoEditBudgetRate-weekly").checkboxradio("refresh");
            $("#rdoEditBudgetRate-bi-weekly").checkboxradio("refresh");
            $("#rdoEditBudgetRate-monthly").checkboxradio("refresh");
            $("#rdoEditBudgetRate-bi-monthly").checkboxradio("refresh");
        }

        $("#txtEditBudgetName").val(budget["budgetName"]);
        $("#rngEditBudgetLimit").val(budget["budgetLimit"]).slider("refresh");
        if (budget["budgetRate"] === "Weekly")
        {
            $("#rdoEditBudgetRate-weekly").prop("checked", true);
            refreshRadio();
        }
        if (budget["budgetRate"] === "Bi-Weekly")
        {
            $("#rdoEditBudgetRate-bi-weekly").prop("checked", true);
            refreshRadio();
        }
        if (budget["budgetRate"] === "Monthly")
        {
            $("#rdoEditBudgetRate-monthly").prop("checked", true);
            refreshRadio();
        }
        if (budget["budgetRate"] === "Bi-Monthly")
        {
            $("#rdoEditBudgetRate-bi-monthly").prop("checked", true);
            refreshRadio();
        }
    }
    Budget.select(options, callback);
}

function updateBudget() {
    var budgetName = $("#txtEditBudgetName").val();
    var budgetLimit = $("#rngEditBudgetLimit").val();
    var budgetRate;

    var weekly = $("#rdoEditBudgetRate-weekly");
    if (weekly.prop("checked"))
    {
        budgetRate = weekly.val();
    }
    var bi_weekly = $("#rdoEditBudgetRate-bi-weekly");
    if (bi_weekly.prop("checked"))
    {
        budgetRate = bi_weekly.val();
    }
    var monthly = $("#rdoEditBudgetRate-monthly");
    if (monthly.prop("checked"))
    {
        budgetRate = monthly.val();
    }
    var bi_monthly = $("#rdoEditBudgetRate-bi-monthly");
    if (bi_monthly.prop("checked"))
    {
        budgetRate = bi_monthly.val();
    }
    var options = [budgetName, budgetLimit, budgetRate, localStorage.getItem("selectedBudgetId")];

    function callback() {
        console.info("Success: record from budget table updated.");
    }

    Budget.update(options, callback);
    setBudgetStatement();
    setTimeout(function(){
        Entry.ruleUpdate([localStorage.getItem("budgetStatement"), localStorage.getItem("selectedBudgetId")]);
    }, 1000);
}

function deleteBudget() {
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback() {
        console.info("Success: record deleted from budget table.");
    }

    Budget.delete(options, callback);
    Entry.ruleDelete([localStorage.getItem("selectedBudgetId")]);
}

function setBudgetStatement() {
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback(tx, results) {
        var budget = results.rows[0];

        if (budget["budgetRate"] === "Weekly")
        {
            localStorage.setItem("budgetStatement", "-7 days");
        }
        if (budget["budgetRate"] === "Bi-Weekly")
        {
            localStorage.setItem("budgetStatement", "-14 days");
        }
        if (budget["budgetRate"] === "Monthly")
        {
            localStorage.setItem("budgetStatement", "-1 month");
        }
        if (budget["budgetRate"] === "Bi-Monthly")
        {
            localStorage.setItem("budgetStatement", "-2 months");
        }
    }
    Budget.select(options, callback);
}

function insertEntry() {
    var entryName = $("#txtEntryName").val();
    var entryDescription = $("#txtEntryDescription").val();
    var budgetId = localStorage.getItem("selectedBudgetId");
    var entryAmount = $("#txtEntryAmount").val();
    var entryDate = $("#txtEntryDate").val();

    var options = [null, entryName, entryDescription, entryAmount, entryDate, budgetId, localStorage.getItem("budgetStatement")];

    function callback() {
        console.info("Success: record inserted into entry table.");
    }

    Entry.insert(options, callback);
}

function selectCurrentEntries() {
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback(tx, results) {
        var htmlCode = "";
        var list = $("#lvCurrentEntries");

        if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
                var entry = results.rows[i];

                htmlCode += "<li>" +
                    "<a data-role='button' data-row-id="+ entry['id'] +" href='#pgEditEntry'>" +
                    "<h1>" + entry['entryName'] + "</h1>" +
                    "<p>Description: " + entry['entryDescription'] + "</p>" +
                    "<p>Amount: $" + entry['entryAmount'] + "</p>" +
                    "<p>Date: " + entry['entryDate'] + "</p>" +
                    "</a>" +
                    "</li>";

                list = list.html(htmlCode);
                list.listview("refresh");

                function clickHandler() {
                    localStorage.setItem("selectedEntryId", $(this).attr("data-row-id"));
                }

                $("#lvCurrentEntries a").on("click", clickHandler);
            }
        }
        else {
            list = list.html("");
            list.listview("refresh");
        }

    }
    Entry.selectCurrent(options, callback);
}

function selectAllEntries() {
    var options = [localStorage.getItem("selectedBudgetId")];

    function callback(tx, results) {
        var htmlCode = "";
        var list = $("#lvAllEntries");

        if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
                var entry = results.rows[i];

                htmlCode += "<li>" +
                    "<a data-role='button' data-row-id="+ entry['id'] +" href='#pgEditEntry'>" +
                    "<h1>" + entry['entryName'] + "</h1>" +
                    "<p>Description: " + entry['entryDescription'] + "</p>" +
                    "<p>Amount: $" + entry['entryAmount'] + "</p>" +
                    "<p>Date: " + entry['entryDate'] + "</p>" +
                    "</a>" +
                    "</li>";

                list = list.html(htmlCode);
                list.listview("refresh");

                function clickHandler() {
                    localStorage.setItem("selectedEntryId", $(this).attr("data-row-id"));
                }

                $("#lvAllEntries a").on("click", clickHandler);
            }
        }
        else {
            list = list.html("");
            list.listview("refresh");
        }

    }
    Entry.selectAll(options, callback);
}

function editSelectedEntry() {
    var options = [localStorage.getItem("selectedEntryId")];

    function callback(tx, results) {
        var entry = results.rows[0];

        $("#txtEditEntryName").val(entry["entryName"]);
        $("#txtEditEntryDescription").val(entry["entryDescription"]);
        $("#txtEditEntryAmount").val(entry["entryAmount"]);
        $("#txtEditEntryDate").val(entry["entryDate"]);
    }
    Entry.select(options, callback);
}

function updateEntry() {
    var entryName = $("#txtEditEntryName").val();
    var entryDescription = $("#txtEditEntryDescription").val();
    var entryAmount = $("#txtEditEntryAmount").val();
    var entryDate = $("#txtEditEntryDate").val();
    var budgetId = localStorage.getItem("selectedBudgetId");
    var budgetStatement = localStorage.getItem("budgetStatement");
    var id = localStorage.getItem("selectedEntryId");

    var options = [entryName, entryDescription, entryAmount, entryDate, budgetId, budgetStatement, id];

    function callback() {
        console.info("Success: record from entry table updated.");
    }

    Entry.update(options, callback);
}

function deleteEntry() {
    var options = [localStorage.getItem("selectedEntryId")];

    function callback() {
        console.info("Success: record deleted from entry table.");
    }

    Entry.delete(options, callback);
}

function displayRemainingBudget() {
    var htmlCode = "";
    var total = 0;
    var limit = 0;
    var remaining = 0;

    function eCallback(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var entry = results.rows[i];
            total += Number(entry["entryAmount"]);
            //console.info(total);
        }
    }

    Entry.selectCurrent([localStorage.getItem("selectedBudgetId")], eCallback);

    function bCallback(tx, results) {
        var budget = results.rows[0];
        limit = budget["budgetLimit"];
        remaining = Math.round((limit - total) * 100) / 100;
        if (remaining > 0) {
            htmlCode += "<p>Budget Remaining: </p>" +
                "<h3 style='color: green;'>$" + remaining + "</h3>";
        }
        else {
            htmlCode += "<p>Budget Remaining: </p>" +
                "<h3 style='color: red'>$" + remaining + "</h3>";
        }

        $("#divRemainingBudget").html(htmlCode);
    }
    Budget.select([localStorage.getItem("selectedBudgetId")], bCallback);

}