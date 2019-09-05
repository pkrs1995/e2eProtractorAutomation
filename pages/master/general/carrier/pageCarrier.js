var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageCarrier = function (){

    this.addCarrierButton = by.xpath("//a[@ng-click='add()']");
    this.saveOrUpdateMessage = by.xpath("(//span[@class='ng-binding'])[3]");
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');

    // locator for carrier preview page
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.editIcon = by.xpath("//a[@ng-click='edit()']");
    this.deleteIcon = by.xpath("//a[@ng-click='deleteCarrier()']");
    this.namePreview = by.xpath("//span[.='Name']/../h5[@class='ng-binding']"); 
    this.codePreview = by.xpath("//span[.='Code']/../h5[@class='ng-binding']");
    this.transportModePreview = by.xpath("//span[.='Transport Mode']/../h5[@class='ng-binding']");
    this.carrierNoPreview = by.xpath("//span[.='Carrier No']/../h5[@class='ng-binding']");
    this.icaoCodePreview = by.xpath("//span[.='ICAO Code']/../h5[@class='ng-binding']");

    // popup locators
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');


    this.getToastMessageText = function () {
         actionLib.getTextByLocator(this.saveOrUpdateMessage).then(function (text) {
            return text;
        })
    }
    this.openCarrierByCode = function (carrier) {
        efsLib.fillTextInTableColumn("carrierArr",2,3, carrier.code);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add carrier":
                actionLib.click(this.addCarrierButton);
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

    this.verifyCarrierDetails = function (carrier) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.namePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.codePreview)
        var transportModElement = actionLib.getChainedElement(this.previewFullPage,this.transportModePreview)
        var carrierNoElement = actionLib.getChainedElement(this.previewFullPage,this.carrierNoPreview)
        var icaoCodeElement = actionLib.getChainedElement(this.previewFullPage,this.icaoCodePreview)
        nameElement.getText().then(function (text) {
            expect(text).toBe(carrier.name);
        });
        codeElement.getText().then(function (text) {
            expect(text).toBe(carrier.code);
        });
        transportModElement.getText().then(function (text) {
            expect(text).toContain(carrier.transportMode);
        });
        carrierNoElement.getText().then(function (text) {
            expect(text).toContain(carrier.carrierNumber);
        });
        icaoCodeElement.getText().then(function (text) {
            expect(text).toContain(carrier.ICAOCode);
        });
    }

    

}
module.exports = new pageCarrier();