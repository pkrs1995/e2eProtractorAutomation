var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddTermsofShipment = function (){

    this.textBoxName = by.id("tosName");
    this.textBoxCode = by.id("tosCode");
    this.textareadescription = by.id("description");
    this.btnPrepaid = by.xpath("//button[.='Prepaid']");
    this.btnCollect = by.xpath("//button[.='Collect']");
    this.btnSave = by.xpath("//input[@value='Save']");
    this.btnCancel = by.xpath("(//button[text()='Cancel'])[1]");
    this.btnUpdate = by.xpath("//input[@value='Update']");
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath("(//button[text()='Cancel'])[2]");




     this.enterTermsofShipmentDetails = function (tos) {

        actionLib.setText(this.textBoxName, tos.name);
        actionLib.setText(this.textBoxCode, tos.code);
        this.selectFreight(tos.freight);
        actionLib.setText(this.textareadescription, tos.textarea);
       
    }

    this.editTermsofShipmentDetails = function (tos) {

        actionLib.setText(this.textBoxName, tos.name);
        this.selectFreight(tos.freight)
        actionLib.setText(this.textareadescription, tos.textarea);
    }

    this.selectFreight = function(freight){

     var reqElement=by.xpath("//button[text()='"+freight+"']");
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
module.exports = new pageAddTermsofShipment();