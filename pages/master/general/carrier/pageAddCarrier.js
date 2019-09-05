var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddCarrier = function (){

    this.transportModeDropdown = by.id("transportMode");
    this.textBoxName = by.id("carrierName");
    this.textBoxCode = by.id("carrierCode");
    this.messageTypeDropdown = by.id("carrierCode");
    this.textBoxCarrierNo = by.xpath("//input[@ng-model='carrierMaster.carrierNo']");
    this.textBoxICAOCode = by.id("iataCode");
    this.locationDropdown = by.id("location0");
    this.carrierAgentDropdown = by.id("partyName0");
    this.accountNumber = by.id("accountNumber0");
    this.btnSave = by.xpath("//input[@value='Save']");
    this.btnCancel = by.xpath("//button[.='Cancel']");
    this.btnUpdate = by.xpath("//input[@value='Update']");
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.errorMessage = by.xpath("//a[@title='Close']/following-sibling::span[1]");
    this.saveOrUpdateMessage = by.xpath("(//span[@class='ng-binding'])[3]");



     this.enterCarrierDetails = function (carrier) {

        efsLib.selectDefaultDropdown(this.transportModeDropdown, carrier.transportMode);
        actionLib.setText(this.textBoxName, carrier.name);
        actionLib.setText(this.textBoxCode, carrier.code);
        efsLib.selectDefaultDropdown(this.messageTypeDropdown, carrier.messageType);
        actionLib.setText(this.textBoxCarrierNo, carrier.carrierNumber);
        actionLib.setText(this.textBoxICAOCode, carrier.ICAOCode);
       
    }

    this.editCarrierDetails = function (carrier) {

        actionLib.setText(this.textBoxName, carrier.name);
        efsLib.selectDefaultDropdown(this.messageTypeDropdown, carrier.messageType);
        actionLib.setText(this.textBoxCarrierNo, carrier.carrierNumber);
        actionLib.setText(this.textBoxICAOCode, carrier.ICAOCode);
        actionLib.setText(this.locationDropdown, carrier.location);
        actionLib.setText(this.carrierAgentDropdown, carrier.carrierAgent);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
        actionLib.setText(this.accountNumber, carrier.accountNumber);
    }

    this.verifyErrorMessages = function (carrier){
        var errorMessage = actionLib.getTextByLocator(this.errorMessage);
        expect(errorMessage).toBe("Provided Carrier code is currently available.");
        browser.navigate().back(); 
    }

    this.getToastMessageText = function () {
        actionLib.getTextByLocator(this.saveOrUpdateMessage).then(function (text) {
           return text;
       })
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
                actionLib.click(this.popupYesButton);
                break;
            case 'no':
                actionLib.click(this.popupNoButton);
                break;
            case 'cancel':
                actionLib.click(this.popupCancelButton);
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }

    
}
module.exports = new pageAddCarrier();