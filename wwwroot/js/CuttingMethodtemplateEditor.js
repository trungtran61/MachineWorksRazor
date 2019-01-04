$('.typeahead').typeahead({
    source: function (query, process) {        
        return $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: webAPIurl + '/lookup?Category=CuttingMethod&SearchTerm=' + query,
            dataType: "json",                                 
            success: function (data) {
                return process(data); 
            },
            error: function (result) {
                $("#lblMessage").html(result.responseText).removeClass('alert-success').addClass('alert-danger').show();
            }
        });
    },
    afterSelect: function (data) {
        GetCuttingMethodSnippetTemplate(data.id, 'snippet');
    }
});

$("#btnClear").click(function (e) {
    $("#cuttingMethod").val('');
});

$("#btnSave").click(function (e) {
    var sUpdateUrl = webAPIurl + "/cuttingmethodtemplate/update/";
    var oCuttingMethodTemplate = {};
    oCuttingMethodTemplate.CuttingMethod = $("#cuttingMethod").val();
    oCuttingMethodTemplate.Template = $("#snippet").val();
    var jsonData = JSON.stringify(oCuttingMethodTemplate);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: sUpdateUrl,
        data: jsonData,
        success: function (data) {
            if (data.responseCode == 0)                
                $("#lblMessage").html('Tool Codes updated.').removeClass('alert-danger').addClass('alert-success').show();
            else
                $("#lblMessage").html(data.responseText).removeClass('alert-success').addClass('alert-danger').show();
        },
        error: function (result) {
            if (result.statusText != 'OK') {
                $("#lblMessage").html('Cannot save Set up sheet. ' + result.responseText).removeClass('alert-success').addClass('alert-danger').show();
            }
        }
    });
})

function GetCuttingMethodSnippetTemplate(CuttingMethod, targetID) {
    var sUrl = webAPIurl + "/getCuttingMethodTemplate/" + CuttingMethod.replace('.', '|');   
    console.log(localStorage.bearerToken);

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: sUrl,
        dataType: "json",        
        success: function (data) {
            $("#" + targetID).val(data);
        },
        error: function (result) {
            $("#lblMessage").html('Cannot retrieve template for cutting method. ' + result.responseText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
}

$("#searchclear").click(function () {
    $('#cuttingMethod').val('');
    $("#cuttingMethod").data("autocomplete").search('');
});
