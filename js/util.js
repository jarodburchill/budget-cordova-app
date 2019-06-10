function resetBudgetForm() {
    $("#txtBudgetName").val("");
    $("#rngBudgetLimit").val("").slider("refresh");
    $("#rdoBudgetRate-weekly").prop("checked", true).checkboxradio("refresh");
    $("#rdoBudgetRate-bi-weekly").checkboxradio("refresh");
    $("#rdoBudgetRate-monthly").checkboxradio("refresh");
    $("#rdoBudgetRate-bi-monthly").checkboxradio("refresh");
}

function resetEntryForm() {
    $("#txtEntryName").val("");
    $("#txtEntryDescription").val("");
    $("#txtEntryAmount").val("");
    $("#txtEntryDate").val("");
}

function validateBudgetInsert() {
    var form = $("#frmAddBudget");
    form.validate({
        rules: {
            txtBudgetName: {
                required: true,
                maxlength: 20
            },
            rngBudgetLimit: {
                required: true,
                min: 0,
                max: 1000
            }
        }
    });
    return form.valid();
}

function validateBudgetUpdate() {
    var form = $("#frmEditBudget");
    form.validate({
        rules: {
            txtEditBudgetName: {
                required: true,
                maxlength: 20
            },
            rngEditBudgetLimit: {
                required: true,
                min: 0,
                max: 1000
            }
        }
    });
    return form.valid();
}

function validateEntryInsert() {
    var form = $("#frmAddEntry");
    form.validate({
        rules: {
            txtEntryName: {
                required: true,
                maxlength: 20
            },
            txtEntryDescription: {
                maxlength: 120
            },
            txtEntryAmount: {
                required: true,
                min: 0,
                max: 1000
            },
            txtEntryDate: {
                required: true
            }
        }
    });
    return form.valid();
}

function validateEntryUpdate() {
    var form = $("#frmEditEntry");
    form.validate({
        rules: {
            txtEditEntryName: {
                required: true,
                maxlength: 20
            },
            txtEditEntryDescription: {
                maxlength: 120
            },
            txtEditEntryAmount: {
                required: true,
                min: 0,
                max: 1000
            },
            txtEditEntryDate: {
                required: true
            }
        }
    });
    return form.valid();
}