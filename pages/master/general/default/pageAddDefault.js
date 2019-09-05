var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');


var pageAddDefault =  function() {
    //locators for pageDefault screen
    this.defaultName = by.id("defaultName");
    this.defaultCode = by.id("code");
    this.defaultSoftware = by.id("softwareName");
    this.defaultGroup = by.id("objectGroupName");
    this.defaultSubGroup = by.id("objectSubGroupName");
    this.defaultScopeFlag = by.id("scopeFlag");
    this.defaultValue = by.id("value");
    this.defaultDescription = by.xpath("//textarea[@ng-model='vm.defaultMasterData.description']");
    this.btnSaveorUpdate = by.xpath("//input[@ng-click='vm.saveOrUpdate()']");
    this.btnCancel = by.xpath("//button[@ng-click='vm.cancel()']");
     
    //popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');


     
   

    


    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "save":
                actionLib.click(this.btnSaveorUpdate);
                break;
            case "cancel":
                actionLib.click(this.btnCancel);
                break;
            case "update":
                actionLib.click(this.btnSaveorUpdate);
                break;
            default:
                console.log(buttonName +"Button is not available");
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
            case 'cancel':
                actionLib.getChainedElement(this.fullPopup, this.popupCancelButton).click();
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }
}
module.exports =  new pageAddDefault();