var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddCity = function (){
    this.textBoxName = by.id('cityName');
    this.textBoxCode =by.id('cityCode');
    this.stateDropdown = by.xpath('(//input[@ng-model="cityMaster.stateMaster"])[2]');
    this.countryDropdown = by.id('countryMaster');
    this.dropDownStatus = by.id('status');
    this.btnSave = by.xpath('//button[.="Save"]');
    this.btnCancel = by.xpath('//button[.="Cancel"]');
    this.btnUpdate = by.xpath('//button[.="Update"]');

    // popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.enterCityDetails = function (city) {
        actionLib.setText(this.textBoxName,city.name);
        actionLib.setText(this.textBoxCode,city.code);
        actionLib.setText(this.stateDropdown,city.state);
        actionLib.setText(this.countryDropdown,city.country);
    }

    this.editCityDetails = function (city) {
        actionLib.setText(this.textBoxName,city.name);
        actionLib.setText(this.stateDropdown,city.state);
        actionLib.setText(this.countryDropdown,city.country);
        efsLib.selectDefaultDropdown(this.dropDownStatus,city.status);
    }

    this.getPopupText = function () {
        return actionLib.getChainedElement(this.fullPopup, this.popupText).getText().then(function (poupText) {
            return poupText;
        });
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

module.exports = new pageAddCity();