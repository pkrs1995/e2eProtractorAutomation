var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageCity = function (){
    
    this.addCityButton = by.css('[ng-click="addCityMaster()"]');
    this.saveOrUpdateToastMessage = by.xpath('//div[@class="message ng-binding"][@ng-bind-html="message"]');
    // locator for city list page
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for city preview page
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.cityEditIcon = by.css('[ng-click="editCityMaster()"]');
    this.cityDeleteIcon = by.css('[ng-click="deleteCityMaster()"]');
    this.cityNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.cityCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.cityStatePreview = by.xpath('//span[.="State"]/../h5[@class="ng-binding"]');
    this.cityCountryPreview = by.xpath('//span[.="Country"]/../h5[@class="ng-binding"]');
    this.cityStatusPreview = by.xpath('');

    // popup locators
    this.fullPopup = by.css('.ngdialog-content');
    this.popupText = by.css('.ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');

    this.verifyCityDetails = function (cityDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.cityNamePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.cityCodePreview)
        var stateElement = actionLib.getChainedElement(this.previewFullPage,this.cityStatePreview)
        var countryElement = actionLib.getChainedElement(this.previewFullPage,this.cityCountryPreview)
        nameElement.getText().then(function (nameText) {
            expect(nameText).toBe(cityDetail.name);
        });
        codeElement.getText().then(function (codeText) {
            expect(codeText).toBe(cityDetail.code);
        });
        stateElement.getText().then(function (stateText) {
            expect(stateText).toContain(cityDetail.state);
        });
        countryElement.getText().then(function (countryText) {
            expect(countryText).toContain(cityDetail.country);
        });
    }

    this.verifyCityByCode = function (cityCode) {
        browser.ignoreSynchronization       = false;
        efsLib.fillTextInTableColumn("cityDataArr",2,3,cityCode);
        efsLib.verifySearchTextInTableRowCol("cityDataArr",1,3,cityCode);
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

    this.openCityByCode = function (cityCode) {
        efsLib.fillTextInTableColumn("cityDataArr",2,3,cityCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add city":
                actionLib.click(this.addCityButton);
                break;
            case "edit":
                actionLib.click(this.cityEditIcon);
                break;
            case "delete":
                actionLib.click(this.cityDeleteIcon);
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

module.exports = new pageCity();