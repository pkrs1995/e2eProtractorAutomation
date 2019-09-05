var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddUnit = function (){

    this.textBoxName = by.id("unitName");
    this.textBoxCode = by.id("unitCode");
    this.unitDropdown1 = by.id("mappingUnit1");
    this.textBoxcalcValue1 = by.id("calcValue1");
    this.checkAddmapping = by.xpath("//label[@for='mapping2']");
    this.unitDropdown2 = by.id("mappingUnit2");
    this.textBoxcalcValue2 = by.id("calcValue2");
    this.btnSave = by.id("saveOrUpdate");
    this.btnCancel = by.id("cancel");
    this.btnUpdate = by.xpath("//input[@value='Update']");

     // popup locators
    this.popupYesButton = by.xpath("//button[.='Yes']");
    this.popupNoButton = by.xpath("//button[.='No']");
    this.popupCancelButton = by.xpath("//button[.='Cancel']");

     this.enterUnitDetails = function (unit) {

        actionLib.setText(this.textBoxName, unit.name);
        actionLib.setText(this.textBoxCode, unit.code);
        this.selectUnitTypeWithDecimals(unit.type, unit.decimals);
       
    }

    this.editUnitDetails = function (unit) {

        actionLib.setText(this.textBoxName, unit.name);
        this.selectUnitTypeWithDecimals(unit.type, unit.decimals);
    }

    this.selectUnitTypeWithDecimals = function(type, decimals){

     var reqElement=by.xpath("//button[text()='"+type+"']");
     actionLib.click(reqElement);
     var reqElement=by.xpath("//button[@id='decimals'][text()='"+decimals+"']");
     actionLib.click(reqElement);

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
module.exports = new pageAddUnit();