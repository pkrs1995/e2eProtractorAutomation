var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageTermsofShipment = function (){

    this.addtosButton = by.xpath("//a[@ng-click='add()']");
    this.saveOrUpdateToastMessage = by.xpath('//div[@class="message ng-binding"][@ng-bind-html="message"]');
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for carrier preview page
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.editIcon = by.xpath("//a[@ng-click='edit()']");
    this.deleteIcon = by.xpath("//a[@ng-click='deleteTos()']");
    this.namePreview = by.xpath("//span[.='Name']/../h5[@class='ng-binding']"); 
    this.codePreview = by.xpath("//span[.='Code']/../h5[@class='ng-binding']");
    this.freightPreview = by.xpath("//span[.='Freight']/../h5[@class='ng-binding']");
    this.descriptionPreview = by.xpath("//span[contains(text(),'Descripti')]/../h5[@class='ng-binding']");

    // popup locators
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');



    this.openTermsofShipmentByCode = function (tos) {
   
        efsLib.fillTextInTableColumn("tosArr",2,2, tos.name);
        efsLib.fillTextInTableColumn("tosArr",2,3, tos.code);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add tos":
                actionLib.click(this.addtosButton);
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

    this.verifyTermsofShipmentDetails = function (tos) {

        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.namePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.codePreview)
        var descriptionElement = actionLib.getChainedElement(this.previewFullPage,this.descriptionPreview)
        nameElement.getText().then(function (text) {
            expect(text).toBe(tos.name);
        });
        codeElement.getText().then(function (text) {
            expect(text).toBe(tos.code);
        });
        descriptionElement.getText().then(function (text) {
            expect(text).toContain(tos.textarea);
        });
    }

    

}
module.exports = new pageTermsofShipment();