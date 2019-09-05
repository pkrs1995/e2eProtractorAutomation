var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddPort = function (){
    this.transportMode = by.id('transportMode');
    this.textBoxName = by.id('portName');
    this.textBoxCode =by.id('portCode');
    this.groupDropdown = by.xpath('(//input[@ng-model="portMaster.portGroupMaster"])[2]');
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


    this.chooseTransportModeAs = function (modeType) {
        if (modeType != undefined) {
            var elementArray = element.all(this.transportMode);
            elementArray.getText().then(function (textArray) {
                toLower = function(text){
                    return text.toLowerCase();
                };
                textArray = textArray.map(toLower);
                console.log(textArray)
                elementArray.get(textArray.indexOf(modeType.toLowerCase())).click();
            });
             
        }  
    }
    this.enterPortDetails = function (port) {
        this.chooseTransportModeAs(port.transportMode);
        actionLib.setText(this.textBoxName,port.name);
        actionLib.setText(this.textBoxCode,port.code);
        actionLib.setText(this.groupDropdown,port.group);
    }

    this.editPortDetails = function (port) {
        this.chooseTransportModeAs(port.transportMode);
        actionLib.setText(this.textBoxName,port.name);
        actionLib.setText(this.groupDropdown,port.group);
        efsLib.selectDefaultDropdown(this.dropDownStatus,port.status);
    }

    this.enterEdiMappingDetails = function (ediMappingDetails, tableIndex) {
        var arrayIndex = 0, webTableIndex = 0;
        if (tableIndex !=undefined && tableIndex >0) {
            webTableIndex = tableIndex-1;
            actionLib.click(this.btnAddEdiMapping);
        }
        
        for ( ; arrayIndex < ediMappingDetails.length; arrayIndex++) {
            actionLib.setText(by.id('ediType'+webTableIndex), ediMappingDetails[arrayIndex].ediType);
            actionLib.setText(by.id('ediSubtype'+webTableIndex), ediMappingDetails[arrayIndex].ediSubtype);
            actionLib.setText(by.id('ediValue'+webTableIndex), ediMappingDetails[arrayIndex].ediValue);
            if (arrayIndex+1 < ediMappingDetails.length ) {
                actionLib.click(this.btnAddEdiMapping);
            }
            webTableIndex++;
        }
        
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
            case "add edi mapping":
                actionLib.click(this.btnAddEdiMapping);
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

module.exports = new pageAddPort();