var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageRegion = require('../../../../pages/master/general/region/pageRegion.js');



var pageAddRegion = function() {

    //locators for addCurrency page
    this.regionName = by.id("regionName");
    this.regionCode = by.id("regionCode");
    this.btnCancel = by.xpath("//button[.='Cancel']");
    this.btnSave = by.xpath("//input[@value = 'Save']");
    this.btnUpdate = by.xpath("//input[@value = 'Update']");
    
    //popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.createRegion = function(region) {
        actionLib.setText(this.regionName,region.name);
        actionLib.setText(this.regionCode,region.code);
    }

    this.editRegionDetails = function(region){
        actionLib.setText(this.regionName,region.updatedregionname);
    }
    
    this.clickOn = function(buttonName){
        switch(buttonName.toLowerCase()){

            case "save":
                actionLib.click(this.btnSave);
            break;
            case "cancel":
                actionLib.click(this.btnCancel);
            break;
            case "update":
                actionLib.click(this.btnUpdate);
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
module.exports = new pageAddRegion();