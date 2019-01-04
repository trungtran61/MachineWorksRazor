searchable = false;

var toolid = url_query('id');
var url = webAPIurl + "/GetToolDetails/" + toolid;

// if adding new tool
if (toolid === 0)
    $('#btnClone').css({ 'display': 'none' });
else {
    $('#btnClone').click(function () {
        url = webAPIurl + "/CopyTool/" + toolid;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            success: function (data) {
                console.log(data);
                openWindow('/ToolInventory/ToolDetail?id=' + data.id, false);
            },
            error: function (result) {
                $("#lblMessage").html('Cannot get tool details. ' + result.statusText);
            }
        });
    });
}

$.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: url,
    success: function (data) {
        console.log(data);
        loadResults(data);
        $("#lblMessage").html('Tool details retrieval successful.');
    },
    error: function (result) {
        $("#lblMessage").html('Cannot get tool details. ' + result.statusText);
    }
});

 
function loadResults(data) {
   
    $('#toolcode').val(data.Code);
    $('#angle').val(data.Angle);
    $('#category').val(data.CategoryName);
    $('#categoryid').val(data.CategoryID);
}
