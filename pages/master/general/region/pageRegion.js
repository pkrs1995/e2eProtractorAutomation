var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageRegion = function(){
     this.btnaddRegion = by.xpath("//*[@ng-click = 'addNewRegion()']");
     this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

     // popup locators
     this.fullPopup = by.css('.ngdialog-content');
     this.popupText = by.css('.ng-binding');
     this.popupYesButton = by.xpath('//button[.="Yes"]');
     this.popupNoButton = by.xpath('//button[.="No"]');

    //locators for regionpreview page
    this.editIcon = by.css("a[ng-click='editRegion(regionMaster)']");
    this.deleteIcon = by.css("a[ng-click='deleteRegion(regionMaster.id)']");
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.regionNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.regionCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');

    this.verifyRegionDetails = function (regionDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.regionNamePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.regionCodePreview)
        nameElement.getText().then(function(nameText){
            expect(nameText).toContain(regionDetail.name);
        });
        codeElement.getText().then(function(codeText){
            expect(codeText).toContain(regionDetail.code);
        });
    }

    this.verifyRegionByCode = function (regionCode) {
        efsLib.fillTextInTableColumn("regionListArr",2,3,regionCode);
        efsLib.verifySearchTextInTableRowCol("regionListArr",1,3,regionCode);
    }

    this.openRegionByCode = function (regionCode) {
        efsLib.fillTextInTableColumn("regionListArr",2,3,regionCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.openByFirstoption = function() { 
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add region":
                actionLib.click(this.btnaddRegion);
                break;
            case "edit":
                actionLib.click(this.editIcon);
                break;
            case "delete":
                actionLib.click(this.deleteIcon);
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }

    this.clickConfirmationPopupAs = function (buttonName) {
        switch (buttonName.toLowerCase()) {
            case 'yes':
                actionLib.getChainedElement(this.fullPopup, this.popupYesButton).click();
                break;
            case 'no':
                actionLib.getChainedElement(this.fullPopup, this.popupNoButton).click();
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }
}
module.exports = new pageRegion();