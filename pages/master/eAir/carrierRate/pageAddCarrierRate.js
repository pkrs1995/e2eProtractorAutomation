var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddCarrierRate = function (){

    this.btnAddRate = by.xpath("//button[@ng-click='addNewRate()']");
    this.carrierDropdown = by.id("carrierCode0");
    this.chargeDropdown = by.id("chargeCode0");
    this.unitDropdown = by.id("unitCode0");
    this.chargeableWeightDropdown = by.id("actualCharge0");
    this.originDropdown = by.id("origin0");
    this.destinationDropdown = by.id("destination0");
    this.firstFrmDate = by.id("firstFrmDate0");
    this.textBoxFirstAmount = by.id("firstAmount0");
    this.textBoxFirstMinAmount = by.id("firstMinAmount0");
    this.secondFrmDate = by.model("data.secondFromDate");
    this.secondAmount = by.model("data.secondAmount");
    this.secondMinAmount = by.model("data.secondMinAmount");
    this.btnSave = by.xpath("//button[.='Save']");
    this.btnCancel = by.xpath("//button[@ng-click='cancel()']");
    this.btnUpdate = by.xpath("//button[.='Update']");

    //edit Carrier Rate Details
    this.editChargeDropdown = by.id("chargeCode");
    this.editUnitDropdown = by.id("unitCode");
    this.chargeableWeightDropdown = by.id("actualCharge0");
    this.editOriginDropdown = by.model("carrierRateMaster.origin");
    this.editDestinationDropdown = by.id("destination");
    this.editFirstFrmDate = by.id("firstFrmDate");
    this.editTextBoxFirstAmount = by.id("firstAmount");
    this.editTextBoxFirstMinAmount = by.model("carrierRateMaster.firstMinAmount");
    this.editSecondFrmDate = by.model("carrierRateMaster.secondFromDate");
    this.editSecondAmount = by.model("secondAmount");
    this.editSecondMinAmount = by.model("carrierRateMaster.secondMinAmount");

    //bulk upload
    this.btnBulkUpload = by.xpath("//button[@ng-click='bulkuploadmodel();navigateToNextField('downloadtemplate')']");
    this.btnDownloadTemplate = by.id("downloadtemplate");
    this.btnBrowse = by.xpath("//button[.='BROWSE']");
    this.btnUpload = by.xpath("//button[@ng-click='uploadFile()']");
    this.btnDiscard = by.xpath("//button[@ng-click='$hide()']");
    
     // popup locators
    this.popupYesButton = by.xpath("//button[.='Yes']");
    this.popupNoButton = by.xpath("//button[.='No']");
    this.popupCancelButton = by.xpath("//button[@ng-click='confirm(3)']");

     this.enterCarrierRateDetails = function (carrierRate) {

        actionLib.setText(this.carrierDropdown, carrierRate.carrier);
        actionLib.setText(this.chargeDropdown, carrierRate.charge);
        actionLib.setText(this.unitDropdown, carrierRate.unit);
        efsLib.selectDefaultDropdown(this.chargeableWeightDropdown, carrierRate.chargeableWeight);
        actionLib.setText(this.originDropdown, carrierRate.origin);
        actionLib.setText(this.destinationDropdown, carrierRate.destination);
        actionLib.setText(this.firstFrmDate, actionLib.getTodayDate());
        actionLib.setText(this.textBoxFirstAmount, carrierRate.firstAmount);
        actionLib.setText(this.textBoxFirstMinAmount, carrierRate.firstMinAmount);
        actionLib.setText(this.secondFrmDate, actionLib.getFutureDate(1));
        actionLib.setText(this.secondAmount, carrierRate.secondAmount);
        actionLib.setText(this.secondMinAmount, carrierRate.secondMinAmount);
       
    }

    this.editCarrierRateDetails = function (carrierRate) {

        actionLib.setText(this.editChargeDropdown, carrierRate.charge);
        actionLib.setText(this.editUnitDropdown, carrierRate.unit);
        efsLib.selectDefaultDropdown(this.chargeableWeightDropdown, carrierRate.chargeableWeight);
        actionLib.setText(this.editOriginDropdown, carrierRate.origin);
        actionLib.setText(this.editDestinationDropdown, carrierRate.destination);
        actionLib.setText(this.firstFrmDate, actionLib.getTodayDate());
        actionLib.setText(this.editTextBoxFirstAmount, carrierRate.firstAmount);
        actionLib.setText(this.editTextBoxFirstMinAmount, carrierRate.firstMinAmount);
        actionLib.setText(this.editSecondFrmDate, actionLib.getFutureDate(2));
        actionLib.setText(this.editSecondAmount, carrierRate.secondAmount);
        actionLib.setText(this.editSecondMinAmount, carrierRate.secondMinAmount);
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
module.exports = new pageAddCarrierRate();