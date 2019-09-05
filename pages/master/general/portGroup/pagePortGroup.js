var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pagePortGroup = function (){
    
    this.addPortGroupButton = by.css('[ng-click="addPortGroupMaster()"]');

    // locator for port list page
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for port preview page 
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.portGroupEditIcon = by.css('[ng-click="editPortGroupMaster()"]');
    this.portGroupDeleteIcon = by.css('[ng-click="deletePortGroupMaster()"]');
    this.portGroupNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.portGroupCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.portGroupCountryPreview = by.xpath('//span[.="Country"]/../h5[@class="ng-binding"]');
    this.portGroupStatusPreview = by.xpath('//span[.="Status"]/..//div[@aria-hidden="false"]');

    // popup locators 
    this.fullPopup = by.css('.ngdialog-content');
    this.popupText = by.css('.ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');

    this.verifyPortGroupDetails = function (portGroupDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.portGroupNamePreview);
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.portGroupCodePreview);
        var countryElement = actionLib.getChainedElement(this.previewFullPage,this.portGroupCountryPreview);
        var statusElement = actionLib.getChainedElement(this.previewFullPage,this.portGroupStatusPreview);
        nameElement.getText().then(function (nameText) {
            expect(nameText).toBe(portGroupDetail.name);
        });
        codeElement.getText().then(function (codeText) {
            expect(codeText).toBe(portGroupDetail.code);
        });
        countryElement.getText().then(function (countryText) {
            expect(countryText).toContain(portGroupDetail.country);
        });
        statusElement.getText().then(function (statusText) {
            expect(statusText).toContain(portGroupDetail.status);
        });
    }

    this.isPortGroupPresentByCode = function (portGroupCode) {
        efsLib.fillTextInTableColumn("portGroupArr",2,3,portGroupCode);
        browser.sleep(2000);
        return element(this.filteredFirstOption).isPresent().then(function (bool) {
            return bool;
        });
    }

    this.getToastMessageText = function () {
        return efsLib.getToastMessageText().then(function (text) {
            return text;
        })
    }

    this.getPopupText = function () {
        // actionlib.getChainedElement is not working
        return efsLib.getAppDisplayedText().then(function (popupText) {
            return popupText;
        })
    }

    this.openPortGroupByCode = function (portGroupCode) {
        efsLib.fillTextInTableColumn("portGroupArr",2,3,portGroupCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add port group":
                actionLib.click(this.addPortGroupButton);
                break;
            case "edit":
                actionLib.click(this.portGroupEditIcon);
                break;
            case "delete":
                actionLib.click(this.portGroupDeleteIcon);
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

module.exports = new pagePortGroup();