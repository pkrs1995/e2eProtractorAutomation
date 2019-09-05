var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');


var pageCountry = function (){
    
    this.addCountryButton = by.css('[ng-click="vm.addNew()"]');
    this.saveOrUpdateToastMessage = by.xpath('');
    // locator for country list page
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for country preview page 
    this.countryEditIcon = by.css('[ng-click="vm.edit(vm.countryMaster.id)"]');
    this.countryDeleteIcon = by.css('[ng-click="vm.delete(vm.countryMaster.id)"]');
    this.countryNamePreview = by.xpath('//span[.="Name"]/../h5[@class="heading ng-binding"]'); 
    this.countryCodePreview = by.xpath('//span[.="Code"]/../h5[@class="heading ng-binding"]');
    this.countryCurrencyCodePreview = by.xpath('//span[.="Currency Code"]/../h5[@class="heading ng-binding"]');
    this.countryNationalityPreview = by.xpath('//span[.="Nationality"]/../h6[@class="ng-binding"]');
    this.countryInlandHaulagePreview = by.xpath('//span[.="Inland Haulage Weight/CBM"]/../h6[@class="ng-binding"]');
    this.countryStatusPreview = by.xpath('//span[.="Status"]/..//div[@aria-hidden="false"]');

    // popup locators 
    this.fullPopup = by.css('.ngdialog-content');
    this.popupText = by.css('.ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');

    this.verifyCountryDetails = function (countryDetails) {
        actionLib.getTextByLocator(this.countryNamePreview).then(function (nameText) {
            expect(nameText).toBe(countryDetails.name);
        });
        actionLib.getTextByLocator(this.countryCodePreview).then(function (codeText) {
            expect(codeText).toBe(countryDetails.code);            
        });
        actionLib.getTextByLocator(this.countryCurrencyCodePreview).then(function (currencyCodeText) {
            expect(currencyCodeText).toBe(countryDetails.currencyCode); 
        });
        actionLib.getTextByLocator(this.countryNationalityPreview).then(function (nationalityText) {
            expect(nationalityText).toBe(countryDetails.nationality); 
        });
        actionLib.getTextByLocator(this.countryInlandHaulagePreview).then(function (inlandHaulageText) {
            expect(inlandHaulageText).toBe(countryDetails.inlandHaulage); 
        });
        actionLib.getTextByLocator(this.countryStatusPreview).then(function (statusText) {
            expect(statusText).toBe(countryDetails.status); 
        });
    }

    this.isCountryPresentByCode = function (countryCode) {
        efsLib.fillTextInTableColumn("vm.dataArr",2,3,countryCode);
        browser.sleep(2000);
        return element(this.filteredFirstOption).isPresent().then(function (bool) {
            return bool;
        });
    }

    this.getToastMessageText = function () {
        return actionLib.getTextByLocator(this.saveOrUpdateMessage).then(function (text) {
            return text;
        })
    }

    this.getPopupText = function () {
        // actionlib.getChainedElement is not working
        return element(this.fullPopup).element(this.popupText).getText().then(function (popupText) {
            return popupText;
        })
    }

    this.openCountryByCode = function (countryCode) {
        efsLib.fillTextInTableColumn("vm.dataArr",2,3,countryCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add country":
                actionLib.click(this.addCountryButton);
                break;
            case "edit":
                actionLib.click(this.countryEditIcon);
                break;
            case "delete":
                actionLib.click(this.countryDeleteIcon);
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

module.exports = new pageCountry();