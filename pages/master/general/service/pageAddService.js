var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageService = require('../../../../pages/master/general/service/pageService.js');

var pageAddService = function() {
    var reqElement;
    //locators for addservice screen
    this.serviceName = by.id("serviceName");
    this.serviceCode = by.id("serviceCode");
    this.serviceCostCenter = by.xpath("(//input[@typeahead-wait-ms='500']/following-sibling::input[1])[1]");
    this.serviceType =by.id("serviceTypeMaster");
    this.btnSaveOrupdate = by.id("saveOrUpdate");
    this.btnCancel = by.id("cancel");

    //popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.createService = function(service) {
        actionLib.setText(this.serviceName,service.name);
        actionLib.setText(this.serviceCode,service.code);
        this.selectMasterService("Transport Mode",service.transportmode);
        this.selectMasterService("Full / Groupage",service.fullgroupage);
        this.selectMasterService("Import / Export",service.importexport); 
        actionLib.setText(this.serviceCostCenter,service.costcentercode);
        actionLib.setText(this.serviceType,service.servicetype);
        var reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.editServicesDetails = function(service) { 
        actionLib.setText(this.serviceName,service.upatedservicename); 
    }

    this.selectMasterService =  function(strMode,strservice) {
            var strParentLocator = by.xpath("//label[contains(text(),'" + strMode + "')]");
            var strChildLocator = by.xpath("//button[contains(text(),'" + strservice + "')]")
            browser.wait(protractor.ExpectedConditions.presenceOf(element(strParentLocator).element(strChildLocator)), 3000);
            reqElement = element(strParentLocator).element(strChildLocator);
            reqElement.click();
    }
     
    this.clickOn = function(buttonName){
        switch(buttonName.toLowerCase()){

            case "save":
                actionLib.click(this.btnSaveOrupdate);
            break;
            case "cancel":
                actionLib.click(this.btnCancel);
            break;
            case "update":
                actionLib.click(this.btnSaveOrupdate);
            default:
                console.log(buttonName +"Button is not available");
        }
    }

    this.clickOnConfirmationPopUpAs = function(buttonName){
        switch(buttonName.toLowerCase()) {
            case "yes":
                actionLib.getChainedElement(this.fullPopup, this.popupText).click();
                break;
            case 'no':
                actionLib.getChainedElement(this.fullPopup, this.popupNoButton).click();
                break;
            case 'cancel':
                actionLib.getChainedElement(this.fullPopup, this.popupCancelButton).click();
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }
}
module.exports = new pageAddService();