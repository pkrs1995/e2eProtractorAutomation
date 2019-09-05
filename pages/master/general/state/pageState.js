var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageState = function (){

    this.addStateButton = by.xpath("//a[@ng-click='addStateMaster()']");
    this.saveOrUpdateToastMessage = by.xpath('//div[@class="message ng-binding"][@ng-bind-html="message"]');
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for carrier preview page
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.editIcon = by.xpath("//a[@ng-click='editStateMaster()']");
    this.deleteIcon = by.xpath("//a[@ng-click='deleteStateMaster()']");
    this.namePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.codePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.countryPreview = by.xpath('//span[.="Country"]/../h5[@class="ng-binding"]');

    // popup locators
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');


    this.getToastMessageText = function () {
         actionLib.getTextByLocator(this.saveOrUpdateMessage).then(function (text) {
            return text;
        })
    }
    this.openStateByCode = function (state) {
   
        efsLib.fillTextInTableColumn("stateDataArr",2,2, state.name);
        efsLib.fillTextInTableColumn("stateDataArr",2,3, state.code);
        efsLib.fillTextInTableColumn("stateDataArr",2,4, state.country);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add state":
                actionLib.click(this.addStateButton);
                break;
            case "edit":
                actionLib.click(this.editIcon);
                break;
            case "delete":
                actionLib.click(this.deleteIcon);
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
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

    this.verifyStateDetails = function (state) {

        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.namePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.codePreview)
        var countryElement = actionLib.getChainedElement(this.previewFullPage,this.countryPreview)
        nameElement.getText().then(function (text) {
            expect(text).toBe(state.name);
        });
        codeElement.getText().then(function (text) {
            expect(text).toBe(state.code);
        });
        countryElement.getText().then(function (text) {
            expect(text).toContain(state.country);
        });
    }

    

}
module.exports = new pageState();