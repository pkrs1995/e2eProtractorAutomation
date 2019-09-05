var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');


var pageAddCountry = function (){

    this.textBoxName = by.id('countryName');
    this.currencyCodeDropdown =by.id('currencyCode');
    this.textBoxCode =by.id('countryCode');
    this.textBoxNationality =by.id('nationality');
    this.textBoxInlandHaulage =by.id('weightOrCbm');
    this.uploadImageAt = by.css('input[type="file"]');
    this.dropDownStatus = by.id('status');
    this.btnSave = by.xpath('//button[.=" Save"]');
    this.btnCancel = by.xpath('//button[.="Cancel"]');
    this.btnUpdate = by.xpath('//button[.=" Update"]');
    this.btnAddEdiMapping = by.xpath('//button[@class="btn accent-btn mb10"]');

    // popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');


    this.enterCountryDetails = function (countryDetails) {
        actionLib.setText(this.textBoxName,countryDetails.name);
        actionLib.setText(this.textBoxCode,countryDetails.code);
        actionLib.setText(this.currencyCodeDropdown,countryDetails.currencyCode);
        actionLib.setText(this.textBoxNationality,countryDetails.nationality);
        actionLib.setText(this.textBoxInlandHaulage,countryDetails.inlandHaulage);
        if (countryDetails.imagePath != undefined) {
            actionLib.uploadFile(this.uploadImageAt, countryDetails.imagePath);   
        }
        efsLib.selectDefaultDropdown(this.dropDownStatus,countryDetails.status);
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

module.exports = new pageAddCountry();