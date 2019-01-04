searchable = true;
var firstTime = true;

$('#btnSearch').click(function () {    
    DoSearch(1);    
});    

$('#btnAdd').click(function () {
    openWindow('/ToolInventory/ToolDetail?id=0', true);      
});  

function loadResults(data) {
   
    $('#searchResults').empty();
    
    for (i = 0; i < data.SearchResults.length; i++) {      
        $('#searchResults').append(
            '<div class="col-md-3 bg-light mr-1 mb-1 text-nowrap pop">' +
            '<a target="_blank" href="ToolDetail?id=' + data.SearchResults[i].ID + '">' +
            '<h6 class="text-primary"><small>' + data.SearchResults[i].Name  + '</small></h6>' +
            '<small>' +
            '<div>On Hand: ' + data.SearchResults[i].OnHand + '</div>' +
            '<div>Location: ' + data.SearchResults[i].Location + '</div>' +
            '</small>' +
            '<div><img src="/ToolImages/' + data.SearchResults[i].ID  + '.jpg" style="width:50px" /></div>' +
            '</a>' +
            '</div>');
    }   
}

function DoSearch(PageNumber) {
    $('#searchResults').empty();
    var url = webAPIurl + "/ToolInventorySearch";
    var toolInventorySearch = {};
    toolInventorySearch.PageSize = PageSize;
    toolInventorySearch.PageNumber = PageNumber;

    toolInventorySearch.Code = [];
    toolInventorySearch.Code.push($('#toolcode').val());
    if ($('#mwItemNumber')) toolInventorySearch.ItemNumber = $('#mwItemNumber').val();
    if ($('#mwName')) toolInventorySearch.Name = $('#mwName').val();
    if ($('#mwCategoryID')) toolInventorySearch.CategoryID = $('#mwCategoryID').val();
    if ($('#mwMWID')) toolInventorySearch.MWID = $('#mwMWID').val();
    if ($('#mwRadius')) toolInventorySearch.Radius = $('#mwRadius').val();
    if ($('#mwNumofCutter')) toolInventorySearch.NumOfCutters = $('#mwNumofCutter').val();
    if ($('#mwChipBreaker')) toolInventorySearch.ChipBreaker = $('#mwChipBreaker').val();
    if ($('#mwMaterial')) toolInventorySearch.Material = $('#mwMaterial').val();
    if ($('#mwGrade')) toolInventorySearch.Grade = $('#mwGrade').val();
    if ($('#mwLocation')) toolInventorySearch.Location = $('#mwLocation').val();
    if ($('#mwExtLocation')) toolInventorySearch.ExternalLocation = $('#mwExtLocation').val();
    if ($('#mwManufacturer')) toolInventorySearch.Manufacturer = $('#mwManufacturer').val();
    if ($('#mwComment')) toolInventorySearch.Comment = $('#mwComment').val();
    if ($('#mwStatusID')) toolInventorySearch.StatusID = $('#mwStatusID').val();
    if ($('#PackSize')) toolInventorySearch.PackSize = $('#PackSize').val();
    if ($('#ToolGroupNum')) toolInventorySearch.ToolGroupNumber = $('#ToolGroupNum').val();
    if ($('#Description')) toolInventorySearch.Description = $('#Description').val();
    if ($('#CuttingMethod')) toolInventorySearch.CuttingMethods = $('#CuttingMethod').val();

    //if (selectedToolIDs.length > 0)
    //    toolInventorySearch.SelectedToolIDs = selectedToolIDs;

    var jsonData = JSON.stringify(toolInventorySearch);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: jsonData,
        success: function (data) {
            console.log(data);
            
            if (data.SearchResults.length > 0) {
                if (firstTime) {
                    $('#divResults').show();
                    $('#pager').bootpag({
                        total: 1,
                        maxVisible: 10
                    }).on("page", function (event, pageNumber) {
                        currentPage = pageNumber;
                        DoSearch(pageNumber);
                    });                   
                    firstTime = false;
                }
                loadResults(data);
            }
            
            var pageCount = Math.ceil((data.recordCount - 1) / PageSize);
            
            if (pageCount > 1) {
                $('#pager').show();
                $('#pager').bootpag({
                    total: pageCount
                });
                $('#pager li').addClass('page-item');
                $('#pager a').addClass('page-link');
            }
            else {
                $('#pager').hide();
            }
        },
        error: function (result) {
            $("#lblMessage").html('Cannot perform search. ' + result.statusText);
        }
    });
}