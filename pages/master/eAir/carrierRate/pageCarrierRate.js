var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageCarrierRate = function (){

    this.addCarrierRateButton = by.xpath("//div[@class='panelTitle']//a[1]");
    this.saveOrUpdateToastMessage = by.xpath('//div[@class="message ng-binding"][@ng-bind-html="message"]');
    this.filteredFirstOption = by.xpath("//*[@id='table-body']/tr[1]");

    // locator for carrier preview page
    this.previewFullPage = by.className('container-fluid resPortListPage ng-scope');
    this.editIcon = by.xpath("//a[@ng-click='editCarrierRate()']");
    this.carrierPreview = by.xpath("//span[.='Carrier']/../h5[@class='ng-binding']"); 
    this.chargePreview = by.xpath("//span[.='Charge']/../p[@class='ng-binding']");
    this.unitPreview = by.xpath("//span[.='Unit']/../p[@class='ng-binding']");
    this.originPreview = by.xpath("//span[.='Origin']/../p[@class='ng-binding']");
    this.destinationPreview = by.xpath("//span[.='Destination']/../p[@class='ng-binding']");

    // popup locators
    this.popupYesButton = by.xpath("//button[.='Yes']");
    this.popupNoButton = by.xpath("//button[.='No']");



    this.openCarrierRate = function (carrierRate) {
   
        efsLib.fillTextInTableColumn("carrierRateArr",2,2, carrierRate.carrier);
        efsLib.fillTextInTableColumn("carrierRateArr",2,3, carrierRate.charge);
        efsLib.fillTextInTableColumn("carrierRateArr",2,4, carrierRate.unit);
        efsLib.fillTextInTableColumn("carrierRateArr",2,6, carrierRate.origin);
        efsLib.fillTextInTableColumn("carrierRateArr",2,7, carrierRate.destination);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "Add Carrier Rate":
                actionLib.click(this.addCarrierRateButton);
                break;
            case "edit":
                actionLib.click(this.editIcon);
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }

    this.verifyCarrierRateDetails = function (carrierRate) {

        var carrierElement = actionLib.getChainedElement(this.previewFullPage,this.carrierPreview)
        var chargeElement = actionLib.getChainedElement(this.previewFullPage,this.chargePreview)
        var unitElement = actionLib.getChainedElement(this.previewFullPage,this.unitPreview)
        var originElement = actionLib.getChainedElement(this.previewFullPage,this.originPreview)
        var destinationElement = actionLib.getChainedElement(this.previewFullPage,this.destinationPreview)
        carrierElement.getText().then(function (text) {
            expect(text).toBe(carrierRate.carrier);
        });
        chargeElement.getText().then(function (text) {
            expect(text).toBe(carrierRate.charge);
        });
        unitElement.getText().then(function (text) {
            expect(text).toContain(carrierRate.unit);
        });
        originElement.getText().then(function (text) {
            expect(text).toContain(carrierRate.origin);
        });
        destinationElement.getText().then(function (text) {
            expect(text).toContain(carrierRate.destination);
        });
    }

    

}
module.exports = new pageCarrierRate();