var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageService = function() {
    this.btnAddService = by.xpath("//a[@ng-click='add()']");
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');
    
    // popup locators
    this.fullPopup = by.css('.ngdialog-content');
    this.popupText = by.css('.ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');

    //locators for servicepreview page
    this.editIcon = by.xpath("//a[@ng-click='edit()']");
    this.deleteIcon = by.xpath("//a[@ng-click='deleteMaster()']");
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.serviceNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.serviceCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.serviceTransportMode = by.xpath('//span[.="Transport Mode"]/../h5[@class="ng-binding"]')
    this.serviceFullGroupage = by.xpath('//span[.="Full / Groupage"]/../h5[@class="ng-binding"]');
    this.serviceImportExport =by.xpath('//span[.="Import / Export"]/../h5[@class="ng-binding"]');
    this.serviceCostCenter = by.xpath('//span[.="Cost Center"]/../h5[@class="ng-binding"]');
    this.serviceServiceType = by.xpath('//span[.="Service Type"]/../h5[@class="ng-binding"]');

    this.verifyServiceDetails = function (serviceDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.serviceNamePreview);
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.serviceCodePreview);
        var transportModeElement =actionLib.getChainedElement(this.previewFullPage,this.serviceTransportMode);
        var fullGroupageElement =actionLib.getChainedElement(this.previewFullPage,this.serviceFullGroupage);
        var importExportElement =actionLib.getChainedElement(this.previewFullPage,this.serviceImportExport);
        var costCenterElement =actionLib.getChainedElement(this.previewFullPage,this.serviceCostCenter);
        var serviceTypeElement =actionLib.getChainedElement(this.previewFullPage,this.serviceServiceType);
        
        nameElement.getText().then(function(nameText){
            expect(nameText).toContain(serviceDetail.name);
        });
        codeElement.getText().then(function(codeText){
            expect(codeText).toContain(serviceDetail.code);
        });
        transportModeElement.getText().then(function(transportModeText){
            expect(transportModeText).toContain(serviceDetail.transportmode);
        });
        fullGroupageElement.getText().then(function(fullGroupageText){
            expect(fullGroupageText).toContain(serviceDetail.fullgroupage);
        });
        importExportElement.getText().then(function(importExportText){
            expect(importExportText).toContain(serviceDetail.importexport);
        });
        costCenterElement.getText().then(function(costcenterText){
            expect(costcenterText).toContain(serviceDetail.costcentercode);
        });
        serviceTypeElement.getText().then(function(serviceTypeText){
            expect(serviceTypeText).toContain(serviceDetail.servicetype);
        });
    }

    this.verifyServiceByCode = function (serviceCode) {
        efsLib.fillTextInTableColumn("serviceArr",2,3,serviceCode);
        efsLib.verifySearchTextInTableRowCol("serviceArr",1,3,serviceCode);
    }

    this.openServiceByCode = function (serviceCode) {
        efsLib.fillTextInTableColumn("serviceArr",2,3,serviceCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.openByFirstoption = function() { 
        actionLib.click(this.filteredFirstOption);
    }
    
    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add service":
                actionLib.click(this.btnAddService);
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
module.exports = new pageService();