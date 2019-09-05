var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageUnit = function (){

    this.addUnitButton = by.xpath("//a[@ng-click='addUnit()']");
    this.saveOrUpdateToastMessage = by.xpath('//div[@class="message ng-binding"][@ng-bind-html="message"]');
    this.filteredFirstOption = by.xpath("//*[@id='table-body']/tr[1]");

    // locator for carrier preview page
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.editIcon = by.xpath("//a[@ng-click='edit()']");
    this.deleteIcon = by.xpath("//a[@ng-click='deleteUnit()']");
    this.namePreview = by.xpath("//span[.='Name']/../h5[@class='ng-binding']"); 
    this.codePreview = by.xpath("//span[.='Code']/../h5[@class='ng-binding']");
    this.typePreview = by.xpath("//span[.='Type']/../h5[@class='ng-binding']");
    this.decimalPreview = by.xpath("//span[.='Decimal']/../h5[@class='ng-binding']");

    // popup locators
    this.popupYesButton = by.xpath("//button[.='Yes']");
    this.popupNoButton = by.xpath("//button[.='No']");



    this.openUnitByCode = function (unit) {
   
        efsLib.fillTextInTableColumn("unitArr",2,2, unit.name);
        efsLib.fillTextInTableColumn("unitArr",2,3, unit.code);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add unit":
                actionLib.click(this.addUnitButton);
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

    this.verifyUnitDetails = function (unit) {

        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.namePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.codePreview)
        var typeElement = actionLib.getChainedElement(this.previewFullPage,this.typePreview)
        var decimalElement = actionLib.getChainedElement(this.previewFullPage,this.decimalPreview)
        nameElement.getText().then(function (text) {
            expect(text).toBe(unit.name);
        });
        codeElement.getText().then(function (text) {
            expect(text).toBe(unit.code);
        });
        typeElement.getText().then(function (text) {
            expect(text).toContain(unit.type);
        });
        decimalElement.getText().then(function (text) {
            expect(text).toContain(unit.decimals);
        });
    }

    

}
module.exports = new pageUnit();