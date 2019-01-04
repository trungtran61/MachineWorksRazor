        //setUpAutoComplete('toolCode', 'ToolCode');
        loadToolCodes();

$("#toolCode").change(function () {
    getColumns($(this).val());
    $('#tblButtons').show();
});
       

function loadToolCodes() {
    var sUrl = webAPIurl + "/lookup/";
    var lookUpRequest = {};
    lookUpRequest.Category = 'ToolCode';
    lookUpRequest.SearchTerm = '';
    var jsonData = JSON.stringify(lookUpRequest);   

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: sUrl,
        data: jsonData,
        dataType: "json",

        success: function (data) {
            $('#toolCode').append('<option value="">Select Code</option>');
            for (i = 0; i < data.length; i++) {             
                $('#toolCode').append('<option>' + data[i].Text + '</option>');
                $('#toolCodeCopy').append('<option>' + data[i].Text + '</option>');
            }

            $("#lblMessage").html('Tool Codes loaded.');
        },
        error: function (result) {
            //alert(result);
            if (result.statusCode != 'OK')
                alert('Cannot get Tool Codes');
            else
                $("#lblMessage").text('Tool Codes loaded.');
        }
    });
}

function setUpAutoComplete(objectId, category) {
    var objId = '#' + objectId;
    //var sLookUpUrl = webAPIurl + "/GetSearchResults/" + category;
    var sLookUpUrl = webAPIurl + "/lookup/"; // + category;

    $(objId).autocomplete({
        response: function (event, ui) {
            // if (ui.content.length == 1) {
            //     ui.item = ui.content[0];
            //     $(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
            //     $(this).autocomplete('close');
            // }
        },
        minLength: 0,
        select: function (event, ui) {
            $(objId).val(ui.item.value);
            getColumns(ui.item.value);
            $('#btnSave').show();
            return false;
        },
        source: function (request, response) {
            var lookUpRequest = {};
            lookUpRequest.Category = category;
            lookUpRequest.SearchTerm = request.term;
            var jsonData = JSON.stringify(lookUpRequest);

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: sLookUpUrl,
                data: jsonData,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Text,
                            val: item.Value
                        }
                    }))
                },
                error: function (result) {
                    $("#lblMessage").html('Cannot retrieve values for ' + objectId);
                }
            });
        }
    }).focus(function () {
        $(this).autocomplete("search", $(this).val());
    });
}

$("#searchclear").click(function () {
    $('#toolCode').val('');
    $("#toolCode").data("autocomplete").search('');
});

$("#btnSave").click(function (e) {
    var url = webAPIurl + "/SaveToolInventoryCodeColumns";
    var selectedColumns = '';

    $('input:checked').each(function () {
        selectedColumns += $(this).attr('id') + ';';
    });

    var oSaveCodeColumnsRequest = {};
    oSaveCodeColumnsRequest.Code = $('#toolCode').val();
    oSaveCodeColumnsRequest.Columns = selectedColumns;

    var jsonData = JSON.stringify(oSaveCodeColumnsRequest);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            $("#lblMessage").html('Column selections saved.');
        },
        error: function (result) {
            $("#lblMessage").html('Cannot save columns Selections. ' + result.statusText);
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
    oCopyCodeColumnsRequest.Code = $('#toolCode').val();
    oCopyCodeColumnsRequest.CopyToCode = $('#toolCodeCopy').val();
    
    var jsonData = JSON.stringify(oCopyCodeColumnsRequest);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            $("#lblMessage").html('Column selections copied.');
        },
        error: function (result) {
            $("#lblMessage").html('Cannot copy columns Selections. ' + result.statusText);
        }
    });
});
function getColumns(code) {
    var sUrl = webAPIurl + "/GetToolInventoryColumns/" + code;
    $("#divColumns1").empty();
    $("#divColumns2").empty();

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: sUrl,
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var show = '';
                if (data[i].Show)
                    show = 'checked';

                var li = '<li><div class="checkbox"><label><input type="checkbox" id="' + data[i].Name + '" ' + show + ' >' + data[i].Header + '</input></label></div></li>'

                if (i < 25)
                    $('#divColumns1').append(li);
                else
                    $('#divColumns2').append(li);
            }

            $("#lblMessage").html('Columns loaded.');
        },
        error: function (result) {
            //alert(result);
            if (result.statusCode != 'OK')
                alert('Cannot get Tool Inventory Columns');
            else
                $("#lblMessage").text('Tool Inventory Columns loaded.');
        }
    });
}
