$.ajaxSetup({
    headers: { "Authorization": "Bearer " + localStorage.getItem('bearerToken') }
});  

function GetValues(pageNumber) {
    $('#rowCurrentValues').empty();
    var url = webAPIurl + "/GetLookUpCategory";
    var lookupCategorySearch = {};
    lookupCategorySearch.PageSize = PageSize;
    lookupCategorySearch.PageNumber = pageNumber;
    lookupCategorySearch.Category = 'toolcode';

    var jsonData = JSON.stringify(lookupCategorySearch);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            if (data.lookupCategoryValues.length > 0) {
                if (firstTime) {
                    $('#searchResultPager').bootpag({
                        total: 1,
                        maxVisible: 10
                    }).on("page", function (event, pageNumber) {
                        currentPage = pageNumber;
                        GetValues(currentPage);
                    });
                    firstTime = false;
                }
                loadResults(data);
            }
            var pageCount = Math.ceil((data.RecordCount - 1) / PageSize);
            if (pageCount > 1) {
                $('#searchResultPager').show();
                $('#searchResultPager').bootpag({
                    total: pageCount
                })
            }
            else {
                $('#searchResultPager').hide();
            }
            $('#rowValues').fadeIn();
            $('#rowAction').fadeIn();
        },
        error: function (result) {
            $("#lblMessage").html('Cannot retrieve tool codes. ' + result.statusText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
}

function loadResults(data) {
    var i = 0, j = 1; currentRow = 1; currentRowID = '';
    var currentRowValues = $('#rowCurrentValues');
    var strValues = '';

    currentRowValues.empty();
    for (i = 0; i < data.lookupCategoryValues.length; i++) {
        console.log(data.lookupCategoryValues[i]);
        strValues += ('<tr><td><input style="width:200px;" type="text" id="' + data.lookupCategoryValues[i].ID + '" value="'
            + data.lookupCategoryValues[i].Value
            + '" class="form-control input-xs currentvalue" /></td>' +
            '<td><input style="width:200px;" type="text" id="text' + data.lookupCategoryValues[i].ID + '" value="'
            + data.lookupCategoryValues[i].Text
            + '" class="form-control input-xs" /></td>'
            + '<td><input title="active if checked" style="margin-left:2px;" type="checkbox" id="active' + data.lookupCategoryValues[i].ID + '" value="' + data.lookupCategoryValues[i].Text + '" '
            + (data.lookupCategoryValues[i].active ? "checked" : "")
            + '/></td><td><button data-toggle="modal" type="button" class="btn btn-default SelectParameters" toolcodeValue="' + data.lookupCategoryValues[i].Value + '">Select Parameters</button></td>' +
            + '</tr>');
    }

    currentRowValues.append(strValues);
}

function SaveCategory(isNewValues) {
    var saveLookupCategoryRequest = {};
    var lookupCategoryValues = [];

    var url = webAPIurl + "/SaveLookupCategory";
    saveLookupCategoryRequest.Category = 'toolcode';
    saveLookupCategoryRequest.ModifiedBy = loggedInUser;
    var currentID = '';

    if (isNewValues) {
        $('.newvalue').each(function () {
            var lookupCategoryValue = {};
            lookupCategoryValue.ID = 0;
            lookupCategoryValue.Value = $(this).val();
            lookupCategoryValue.Text = $(this).closest('td').next().find('.newtext').val();

            if (lookupCategoryValue.Text == '')
                lookupCategoryValue.Text = lookupCategoryValue.Value;

            lookupCategoryValue.Active = true;
            lookupCategoryValues.push(lookupCategoryValue);
        });
    }
    else {
        $('.currentvalue').each(function () {
            var lookupCategoryValue = {};
            currentID = $(this).attr('id');
            lookupCategoryValue.ID = currentID;
            lookupCategoryValue.Value = $(this).val();
            lookupCategoryValue.Text = $('#text' + currentID).val();
            lookupCategoryValue.Active = $('#active' + currentID).prop('checked');

            if (lookupCategoryValue.Text == '')
                lookupCategoryValue.Text = lookupCategoryValue.Value;

            lookupCategoryValues.push(lookupCategoryValue);
        });
    }

    saveLookupCategoryRequest.lookupCategoryValues = lookupCategoryValues;

    var jsonData = JSON.stringify(saveLookupCategoryRequest);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            $("#lblMessage").html('Tool Codes updated.').removeClass('alert-danger').addClass('alert-success').show();
            GetValues(1);
        },
        error: function (result) {
            $("#lblMessage").html('Cannot update Tool Codes.' + result.statusText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
}

//$(document).ready(function () {
GetValues(1);


$("#btnAddValues").click(function (e) {
    $('.newvalue').val('');
    $("#addModal").modal();
});

$("#btnSaveAdd").click(function (e) {
    SaveCategory(true);
});

$("#btnSave").click(function (e) {
    SaveCategory(false);
});
//});

// Select Columns Section    

var currentToolCode = '';

$("#rowCurrentValues").on("click", ".SelectParameters", function (event) {
    currentToolCode = $(this).attr('toolcodevalue');
    getColumns();
    loadToolCodes();

    $("#parmsModal").modal()
});


$("#btnSaveParms").click(function (e) {
    var url = webAPIurl + "/SaveToolInventoryCodeColumns";
    var selectedColumns = '';

    $('.chkParm:checked').each(function () {
        selectedColumns += $(this).attr('id') + ';';
    });

    var oSaveCodeColumnsRequest = {};
    oSaveCodeColumnsRequest.Code = currentToolCode;
    oSaveCodeColumnsRequest.Columns = selectedColumns;

    var jsonData = JSON.stringify(oSaveCodeColumnsRequest);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            $("#lblParmsMessage").html('Column selections saved.').removeClass('alert-danger').addClass('alert-success').show();
        },
        error: function (result) {
            $("#lblParmsMessage").html('Cannot save columns Selections. ' + result.statusText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
});

$("#btnCopy").click(function (e) {
    var url = webAPIurl + "/CopyToolInventoryCodeColumns";
    var selectedColumns = '';

    $('input:checked').each(function () {
        selectedColumns += $(this).attr('id') + ';';
    });

    var oCopyCodeColumnsRequest = {};
    oCopyCodeColumnsRequest.Code = currentToolCode;
    oCopyCodeColumnsRequest.CopyToCode = $('#toolCodeCopy').val();

    var jsonData = JSON.stringify(oCopyCodeColumnsRequest);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            $("#lblParmsMessage").html('Column selections copied.').removeClass('alert-danger').addClass('alert-success').show();
        },
        error: function (result) {
            $("#lblParmsMessage").html('Cannot copy columns Selections. ' + result.statusText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
});

function getColumns() {
    var sUrl = webAPIurl + "/GetToolInventoryColumns/" + currentToolCode;
    $("#divColumns1").empty();
    $("#divColumns2").empty();

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: sUrl,
        success: function (data) {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                var li = '<li><div class="checkbox"><label><input class="chkParm" type="checkbox" id="' + data[i].name + '" ' + (data[i].show ? "checked" : "") + ' >' + data[i].header + '</input></label></div></li>'

                if (i < 25)
                    $('#divColumns1').append(li);
                else
                    $('#divColumns2').append(li);
            }

            $("#lblMessage").html('Columns loaded.');
        },
        error: function (result) {
            console.log(result);
            if (result.statusCode != 'OK')
                $("#lblParmsMessage").text('Cannot get Tool Inventory Columns' + result.responseText).removeClass('alert-success').addClass('alert-danger').show();
            else
                $("#lblParmsMessage").text('Tool Inventory Columns loaded.').removeClass('alert-danger').addClass('alert-success').show();
        }
    });
}

var allToolCodes = [];

function loadToolCodes() {

    $('#toolCodeCopy').empty().append('<option value="">Select Code</option>');

    if (allToolCodes.length == 0) {
        var sUrl = webAPIurl + "/lookup/?Category=ToolCode&SearchTerm=";
        var lookUpRequest = {};
        lookUpRequest.Category = 'ToolCode';
        lookUpRequest.SearchTerm = '';
        var jsonData = JSON.stringify(lookUpRequest);


        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: sUrl,
            data: jsonData,
            dataType: "json",

            success: function (data) {

                for (i = 0; i < data.length; i++) {
                    allToolCodes.push(data[i].Text);
                    if (data[i].Text != currentToolCode)
                        $('#toolCodeCopy').append('<option>' + data[i].Text + '</option>');
                }

                $("#lblMessage").html('Tool Codes loaded.');
            },
            error: function (result) {
                if (result.statusCode != 'OK')
                    $("#lblParmsMessage").text('Cannot get Tool Codes' + result.responseText).removeClass('alert-success').addClass('alert-danger').show();
            }
        });
    }
    else {
        for (i = 0; i < allToolCodes.length; i++) {
            if (allToolCodes[i] != currentToolCode)
                $('#toolCodeCopy').append('<option>' + allToolCodes[i] + '</option>');
        }

    }
}
