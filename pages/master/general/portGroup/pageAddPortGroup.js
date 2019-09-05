var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddPortGroup = function (){
    this.textBoxName = by.id('portGroupName');
    this.textBoxCode =by.id('portGroupCode');
    this.dropDownCountry = by.xpath('(//input[@ng-model="portGroupMaster.countryMaster"])[2]');
    this.dropDownStatus = by.id('status');
    this.btnSave = by.xpath('//button[.=" Save"]');
    this.btnCancel = by.xpath('//button[.="Cancel"]');
    this.btnUpdate = by.xpath('//button[.=" Update"]');

    // popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.enterPortGroupDetails = function (portGroup) {
        actionLib.setText(this.textBoxName,portGroup.name);
        actionLib.setText(this.textBoxCode,portGroup.code);
        actionLib.setText(this.dropDownCountry,portGroup.country);
    }

    this.getPopupText = function () {
        // const poupText = efsLib.getAppDisplayedText();
        return efsLib.getAppDisplayedText();
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "save":
                actionLib.click(this.btnSave);
                break;
            case "cancel":
                actionLib.click(this.btnCancel);
                break;
            case "update":
                actionLib.click(this.btnUpdate);
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

module.exports = new pageAddPortGroup();