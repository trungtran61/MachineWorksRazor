$.ajaxSetup({
    headers: { "Authorization": "Bearer " + localStorage.getItem('bearerToken') }
});  

var PageSize = 20;
var currentPage = 1;
var currentSelectedPage = 1;
var firstTime = true;

function GetCategories() {
    var sUrl = webAPIurl + "/GetLookUpCategories/";
    var categories = '';

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: sUrl,
        dataType: "json",

        success: function (data) {
            for (i = 0; i < data.length; i++) {
                categories += '<option value="' + data[i] + '">' + data[i] + '</option>';
            }
            $("#Category").append(categories);
        },
        error: function (result) {
            if (result.statusCode !== 'OK')
                $("#lblMessage").text('Cannot get categories.');
        }
    });
}

function GetValues(pageNumber) {
    $('#rowCurrentValues').empty();
    var url = webAPIurl + "/GetLookUpCategory";
    var lookupCategorySearch = {};
    lookupCategorySearch.PageSize = PageSize;
    lookupCategorySearch.PageNumber = pageNumber;
    lookupCategorySearch.Category = $('#Category').val();

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
            $("#lblMessage").html('Cannot perform search. ' + result.statusText);
        }
    });
}

function loadResults(data) {
    var i = 0, j = 1; currentRow = 1; currentRowID = '';
    var currentRowValues = $('#rowCurrentValues');
    var strValues = '';

    currentRowValues.empty();
    for (i = 0; i < data.lookupCategoryValues.length; i++) {
        strValues += ('<tr><td><input style="width:200px;" type="text" id="' + data.lookupCategoryValues[i].ID + '" value="'
            + data.lookupCategoryValues[i].Value
            + '" class="form-control input-xs currentvalue" /></td>' +
            '<td><input style="width:200px;" type="text" id="text' + data.lookupCategoryValues[i].ID + '" value="'
            + data.lookupCategoryValues[i].Text
            + '" class="form-control input-xs" /></td>'
            + '<td><input title="active if checked" style="margin-left:2px;" type="checkbox" id="active' + data.lookupCategoryValues[i].ID + '" value="' + data.lookupCategoryValues[i].Text + '" '
            + (data.lookupCategoryValues[i].Active ? "checked" : "")
            + '/></td></tr>');
    }

    currentRowValues.append(strValues);
}

function SaveCategory(isNewValues) {
    var saveLookupCategoryRequest = {};
    var lookupCategoryValues = [];

    var url = webAPIurl + "/SaveLookupCategory";
    saveLookupCategoryRequest.Category = $("#txtCategory").val();
    saveLookupCategoryRequest.ModifiedBy = loggedInUser;
    var currentID = '';

    if (isNewValues) {
        $('.newvalue').each(function () {
            var lookupCategoryValue = {};
            lookupCategoryValue.ID = 0;
            lookupCategoryValue.Value = $(this).val();
            lookupCategoryValue.Text = $(this).closest('td').next().find('.newtext').val();
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
            $("#lblMessage").html('Lookup updated.');
            GetValues(1);
        },
        error: function (result) {
            $("#lblMessage").html('Cannot update Lookup.' + result.statusText);
        }
    });
}

$(document).ready(function () {
    GetCategories();
    var selectedCategory = '';

    $("#Category").change(function () {
        firstTime = true;
        $("#txtCategory").prop("disabled", true);
        selectedCategory = $(this).val();
        if (selectedCategory != '') {
            GetValues(1);
            $("#txtCategory").val(selectedCategory);
        }
        else {
            $('#rowValues').fadeOut();
            $('#rowAction').fadeOut();
        }
    });

    $("#dialogAdd").dialog({
        autoOpen: false,
        width: 1000,
        modal: true,
        buttons: {
            "Save": function () {
                SaveCategory(true);
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#btnAddValues").click(function (e) {
        $('.newvalue').val('');
        $("#txtCategory").val($("#Category").val()).prop("disabled", true);
        $('#dialogAdd').dialog('option', 'title', 'Add Lookup Values');
        $("#dialogAdd").dialog("open");
    });

    $("#btnAddCategory").click(function (e) {
        $('.newvalue').val('');
        $("#txtCategory").val('').prop("disabled", false);
        $('#dialogAdd').dialog('option', 'title', 'Add New Lookup');
        $("#dialogAdd").dialog("open");
    });

    $("#btnSave").click(function (e) {
        SaveCategory(false);
    });
});
