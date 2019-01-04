var searchable = false;

$('#toolcode').typeahead({
    source: function (query, process) {
        var url = webAPIurl + '/lookup?Category=toolcode&SearchTerm=' + query
        return $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: url,
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
        GetSelectedToolInventoryColumns(data.name, searchable);
    }
});

hookupTypeAhead('category', 'categoryid', 'category');
hookupTypeAhead('category', 'categoryid', 'category');

function hookupTypeAhead(targetId, selectedId, lookupName) {

    $('#'+targetId).typeahead({
        source: function (query, process) {
            var url = webAPIurl + '/lookup?Category=' + lookupName + '&SearchTerm=' + query;

            return $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: url,
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
            $('#' + selectedId).val(data.id);
        }
    });
}

function GetSelectedToolInventoryColumns(toolcode, searchable)
{
    var url = webAPIurl + '/GetSelectedToolInventoryColumns/' + toolcode + '/' + searchable; 

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "json",
        success: function (data) {
            HideShowColumns(data);
        },
        error: function (result) {
            $("#lblMessage").html(result.responseText).removeClass('alert-success').addClass('alert-danger').show();
        }
    });
}

function HideShowColumns(columns) {
   // console.log(searchableColumns);

    var arrColumns = $.map(columns, function (el) { return el.Name });
    
    $(".columns").each(function (index) {
        if ($.inArray($(this).prop('id'), arrColumns) > -1) {
            $(this).css({ 'display': 'block' });
        }
        else {
            $(this).css({ 'display': 'none' }); 
        }
    });    
}