var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageDefault = function() {
    this.btnAddDefault = by.xpath("//a[@ng-click='vm.addNew()']");
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');
    // locator for currency list page
    this.editIcon = by.className("icon-edit");
    this.deleteIcon = by.xpath("//a[@class='list-panel-edit-btn cursorPt']");


}
module.exports =  new pageDefault();
