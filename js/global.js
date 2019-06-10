//Clicks
function btnAddBudget_Click() {
    window.location.href = "#pgAddBudget";
}

function btnSaveBudget_Click() {
    if (validateBudgetInsert()){
        insertBudget();
        resetBudgetForm();
        window.location.href = "#pgViewBudgets";
    }
}

function btnEditBudget_Click() {
    window.location.href = "#pgEditBudget";
}

function btnUpdateBudget_Click() {
    if (validateBudgetUpdate()) {
        updateBudget();
        window.location.href = "#pgViewBudgets";
    }
}

function btnDeleteBudget_Click() {
    deleteBudget();
    window.location.href = "#pgViewBudgets";
}

function btnCancelUpdateBudget_Click() {
    window.location.href = "#pgViewEntries";
}

function btnAddEntry_Click() {
    window.location.href = "#pgAddEntry";
}

function btnSaveEntry_Click() {
    if (validateEntryInsert()) {
        insertEntry();
        resetEntryForm();
        window.location.href = "#pgViewEntries";
    }
}

function btnViewAllEntries_Click() {
    window.location.href = "#pgViewAllEntries";
}

function btnGoBack_Click() {
    window.location.href = "#pgViewEntries";
}

function btnUpdateEntry_Click() {
    if (validateEntryUpdate()) {
        updateEntry();
        window.location.href = "#pgViewEntries";
        //go back to prev would be nice
    }
}

function btnDeleteEntry_Click() {
    deleteEntry();
    window.location.href = "#pgViewEntries";
}

//Shows
function pgViewBudgets_Show() {
    selectAllBudgets();
}

function pgViewEntries_Show() {
    displaySelectedBudget();
    selectCurrentEntries();
    displayRemainingBudget();
}

function pgEditBudget_Show() {
    editSelectedBudget();
}

function pgViewAllEntries_Show() {
    selectAllEntries();
}

function pgEditEntry_Show() {
    editSelectedEntry();
}

function init() {
    $("#btnAddBudget").on("click", btnAddBudget_Click);
    $("#btnSaveBudget").on("click", btnSaveBudget_Click);
    $("#btnEditBudget").on("click", btnEditBudget_Click);
    $("#btnUpdateBudget").on("click", btnUpdateBudget_Click);
    $("#btnDeleteBudget").on("click", btnDeleteBudget_Click);
    $("#btnCancelUpdateBudget").on("click", btnCancelUpdateBudget_Click);

    $("#btnAddEntry").on("click", btnAddEntry_Click);
    $("#btnSaveEntry").on("click", btnSaveEntry_Click);
    $("#btnViewAllEntries").on("click", btnViewAllEntries_Click);
    $("#btnGoBack").on("click", btnGoBack_Click);
    $("#btnUpdateEntry").on("click", btnUpdateEntry_Click);
    $("#btnDeleteEntry").on("click", btnDeleteEntry_Click);

    $("#btnClearDatabase").on("click", btnClearDatabase);

    $("#pgViewBudgets").on("pageshow", pgViewBudgets_Show);
    $("#pgViewEntries").on("pageshow", pgViewEntries_Show);
    $("#pgEditBudget").on("pageshow", pgEditBudget_Show);
    $("#pgViewAllEntries").on("pageshow", pgViewAllEntries_Show);
    $("#pgEditEntry").on("pageshow", pgEditEntry_Show);

}

function btnClearDatabase() {
    try {
        DB.dropTables();
        initDB();
    }
    catch (ex) {
        console.error("Error: " + ex.toString() +" (Fatal) Error in initDB(). can not proceed.");
    }
}

function initDB() {
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables....");
            DB.createTables();
        }
        else {
            console.error("Error: cannot create DB. Can not proceed.");
        }
    }
    catch (ex) {
        console.error("Error: " + ex.toString() +" (Fatal) Error in initDB(). can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
    console.info("DOM is ready.");
});