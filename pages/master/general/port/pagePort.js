var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pagePort = function (){
    
    this.addPortButton = by.css('[ng-click="addPortMaster()"]');
    this.saveOrUpdateToastMessage = by.xpath('');
    // locator for port list page
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for port preview page 
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.portEditIcon = by.css('[ng-click="editPortMaster()"]');
    this.portDeleteIcon = by.css('[ng-click="deletePortMaster()"]');
    this.portNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.portCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.portTransportModePreview = by.xpath('//span[.="Transport Mode"]/../h5[@class="ng-binding"]');
    this.portGroupPreview = by.xpath('//span[.="Port Group"]/../h5[@class="ng-binding"]');
    this.portCountryPreview = by.xpath('//span[.="Country"]/../h5[@class="ng-binding"]');
    this.portStatusPreview = by.xpath('//span[.="Status"]/..//div[@aria-hidden="false"]');

    // popup locators 
    this.fullPopup = by.css('.ngdialog-content');
    this.popupText = by.css('.ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');

    this.verifyPortDetails = function (portDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.portNamePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.portCodePreview)
        var groupElement = actionLib.getChainedElement(this.previewFullPage,this.portGroupPreview)
        var countryElement = actionLib.getChainedElement(this.previewFullPage,this.portCountryPreview)
        var transportModeElement = actionLib.getChainedElement(this.previewFullPage,this.portTransportModePreview)
        var statusElement = actionLib.getChainedElement(this.previewFullPage,this.portStatusPreview)
        nameElement.getText().then(function (nameText) {
            expect(nameText).toBe(portDetail.name);
        });
        codeElement.getText().then(function (codeText) {
            expect(codeText).toBe(portDetail.code);
        });
        groupElement.getText().then(function (groupText) {
            expect(groupText).toContain(portDetail.group);
        });
        countryElement.getText().then(function (countryText) {
            expect(countryText).toContain(portDetail.country);
        });
        transportModeElement.getText().then(function (transportModeText) {
            expect(transportModeText).toContain(portDetail.transportMode);
        });
        statusElement.getText().then(function (statusText) {
            expect(statusText).toContain(portDetail.status);
        });
    }

    this.verifyEdiMappingDetails = function (editMappingArray) {

        for (let index = 0; index < editMappingArray.length; index++) {
            // chained element is not working
            element(by.xpath("//*[@class = 'panel panel-default detail-transition']//tbody/tr["+(index+1)+"]/td[2]")).getText().then(function (ediTypeText) {
                expect(ediTypeText).toBe(editMappingArray[index].ediType);
            });
            element(by.xpath("//*[@class = 'panel panel-default detail-transition']//table/tbody/tr["+(index+1)+"]/td[3]")).getText().then(function (ediSubTypeText) {
                expect(ediSubTypeText).toBe(editMappingArray[index].ediSubtype);
            });
            element(by.xpath("//*[@class = 'panel panel-default detail-transition']//table/tbody/tr["+(index+1)+"]/td[4]")).getText().then(function (ediValueText) {
                expect(ediValueText).toBe(editMappingArray[index].ediValue);
            }); 
        }
    }

    this.isPortPresentByCode = function (portCode) {
        efsLib.fillTextInTableColumn("portArr",2,3,portCode);
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

    this.openPortByCode = function (portCode) {
        efsLib.fillTextInTableColumn("portArr",2,3,portCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add port":
                actionLib.click(this.addPortButton);
                break;
            case "edit":
                actionLib.click(this.portEditIcon);
                break;
            case "delete":
                actionLib.click(this.portDeleteIcon);
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

module.exports = new pagePort();