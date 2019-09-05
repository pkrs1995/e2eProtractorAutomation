var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddState = function (){

    this.textBoxName = by.id("stateName");
    this.textBoxCode = by.id("stateCode");
    this.countryDropdown = by.id("countryMaster");
    this.btnSave = by.xpath("//button[.='Save']");
    this.btnCancel = by.xpath("//button[.='Cancel']");
    this.btnUpdate = by.xpath("//button[.='Update']");
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    this.errorMessage = by.xpath("//a[@title='Close']/following-sibling::span[1]");
    this.saveOrUpdateMessage = by.xpath("(//span[@class='ng-binding'])[3]");



     this.enterStateDetails = function (state) {

        actionLib.setText(this.textBoxName, state.name);
        actionLib.setText(this.textBoxCode, state.code);
        actionLib.setText(this.countryDropdown, state.country);
       
    }

    this.editStateDetails = function (state) {

        actionLib.setText(this.textBoxName, state.name);
        actionLib.setText(this.countryDropdown, state.country);
    }

    this.verifyErrorMessages = function (state){
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
module.exports = new pageAddState();