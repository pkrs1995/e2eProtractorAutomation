var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');

var pageGlobal = function () {
    var reqElement;
    var attachmentUpload = "../testdata/dataFiles/agentTemplate.xlsx";

    //Add Dimension Direct quotation
    this.expandDimensionsSection = by.className("fa fa-cube");
    this.textBoxNoOfPiecesQuotation = by.id("noOfPiece0");
    this.textBoxLengthQuotation = by.model("dataObj.length");
    this.textBoxWidthQuotation = by.id("width0");
    this.textBoxHeightQuotation = by.id("height0");
    this.textBoxDimensionsGrossWtQuotation = by.id("grossWeight0");
    this.dropDownServiceName = by.id("service");
    this.dropDownServiceImportName = by.xpath("//*[contains(text(),'Air Import')]");
    this.dropDownServiceExportName = by.xpath("//*[contains(text(),'Air Export')]");
    this.dropDownCustomer = by.id("partyMaster");
    this.textAreaGeneralNotes = by.id("gNote0");

    // ADD Direct quotation pick up section
    this.expandPickUpDeliverySectionQuotation = by.className("fa fa-truck");
    this.textBoxPickUpAddress1Quotation = by.model("quotationDetail.pickupAddress.addressLine1");
    this.textBoxPickUpAddress2Quotation = by.model("quotationDetail.pickupAddress.addressLine2");
    this.textBoxPickUpAddress3Quotation = by.model("quotationDetail.pickupAddress.addressLine3");
    this.textBoxPickUpPoBoxQuotation = by.model("quotationDetail.pickupAddress.poBox");
    this.dropDownPickUpCityQuotation = by.id("quotationDetail.pickupAddress.city.");
    this.dropDownPickUpStateQuotation = by.id("quotationDetail.pickupAddress.state.");
    this.dropDownPickUpCountryQuotation = by.id("quotationDetail.pickupAddress.country.");
    this.textBoxDeliveryAddress1Quotation = by.id("deliveryAddress");
    this.textBoxDeliveryAddress2Quotation = by.model("quotationDetail.deliveryAddress.addressLine2");
    this.textBoxDeliveryAddress3Quotation = by.model("quotationDetail.deliveryAddress.addressLine3");
    this.textBoxDeliveryPoBoxQuotation = by.model("quotationDetail.deliveryAddress.poBox");
    this.dropDownDeliveryCityQuotation = by.id("quotationDetail.deliveryAddress.city.");
    this.dropDownDeliveryStateQuotation = by.id("quotationDetail.deliveryAddress.state.");
    this.dropDownDeliveryCountryQuotation = by.id("quotationDetail.deliveryAddress.country.");

    //Direct Quotation
    this.directQuotationLink = by.xpath("//button[@ng-click='viewSalesQuotationAdd()']");
    this.btnAttachment = by.xpath("//button[@ng-click='attachModel()']");
    this.textBoxAttachmentRefNo = by.id("0attachRefNo0");
    this.btnFileUpload = by.css("input[type='file']");
    this.btnAttachmentSave = by.xpath("//button[@ng-click='saveAttachment()']");
    this.dropDownOrigin = by.id("origin");
    this.dropDownDestination = by.id("destination");
    this.dropDownTermsOfShipment = by.id("tos");
    this.textBoxReferenceNo = by.id("refNo");
    this.textBoxGrossWeight = by.model("quotationDetail.grossWeight");
    this.textBoxVolumeWeight = by.id("volumeWeight");
    this.textBoxAttention = by.id("attention");

    //carrier charge section
    this.expandCarrierCharge = by.className("fa fa-money");
    this.dropDownCarrier = by.id("0mccarrier");
    this.textBoxTransitDays = by.id("0mmtransit");
    this.uiSwitchAllInclusive = by.id("allInclusive");
    this.textBoxAmtPerUnit = by.id("0msellRateAmountPerUnit0");
    this.textBoxMinAmount = by.model("charge.sellRateMinAmount");
    this.textBoxChargeCode = by.id("0mchargeCodeField0");
    this.textBoxUnit = by.id("0munitMaster0");
    this.testBoxNoUnit = by.id("0mnumberOfUnit0");
    this.textBoxCostPerUnit = by.model("charge.buyRateCostPerUnit");
    this.textBoxMinCost = by.model("charge.buyRateMinCost");
    this.btnGeneralNotes = by.xpath("//button[@ng-click='generalModel()']")
    this.textBoxROE = by.id("0mcurrencyRoe0");

    //Direct add Quotation
    this.addDirectQuotationDimensions = function (dimensionData) {
        actionLib.setText(this.textBoxNoOfPiecesQuotation, dimensionData.noOfPieces);
        actionLib.setText(this.textBoxLengthQuotation, dimensionData.length);
        actionLib.setText(this.textBoxWidthQuotation, dimensionData.width);
        actionLib.setText(this.textBoxHeightQuotation, dimensionData.height);
        actionLib.setText(this.textBoxDimensionsGrossWtQuotation, dimensionData.dimensionGrossWeight);
    }

    this.addDirectImportQuotationPickUpDelivery = function (exportData) {
        actionLib.setText(this.textBoxPickUpAddress1Quotation, exportData.pickUpAddress1);
        actionLib.setText(this.textBoxPickUpAddress2Quotation, exportData.pickUpAddress2);
        actionLib.setText(this.textBoxPickUpAddress3Quotation, exportData.pickUpAddress3);
        actionLib.setText(this.textBoxPickUpPoBoxQuotation, exportData.pickUpPoBox);
        actionLib.setText(this.dropDownPickUpCityQuotation, exportData.pickUpCity);
        actionLib.setText(this.dropDownPickUpStateQuotation, exportData.pickUpState);
        actionLib.setText(this.dropDownPickUpCountryQuotation, exportData.pickUpCountry);
        actionLib.setText(this.textBoxDeliveryAddress1Quotation, exportData.deliveryAddress1);
        actionLib.setText(this.textBoxDeliveryAddress2Quotation, exportData.deliveryAddress2);
        actionLib.setText(this.textBoxDeliveryAddress3Quotation, exportData.deliveryAddress3);
        actionLib.setText(this.textBoxDeliveryPoBoxQuotation, exportData.deliveryPoBox);
        actionLib.setText(this.dropDownDeliveryCityQuotation, exportData.deliveryCity);
        actionLib.setText(this.dropDownDeliveryStateQuotation, exportData.deliveryState);
        actionLib.setText(this.dropDownDeliveryCountryQuotation, exportData.deliveryCountry);

    }

    this.addDirectQuotation = function (directQuotation) {
        var serviceName = "Export";
       
        this.fillShipper(globalData.globalData.importCustomerName);
        this.fillSalesman();
        this.fillstrSalesCoordinator();
        actionLib.setText(this.textBoxAttention, directQuotation.attention);
        if (serviceName !== "Export") {
            this.fillServiceName(this.dropDownService, this.dropDownServiceImportName);
        } else {
            this.fillServiceName(this.dropDownService, this.dropDownServiceExportName);
        }
        actionLib.setText(this.dropDownOrigin, directQuotation.origin);
        actionLib.setText(this.dropDownDestination, directQuotation.destination);
        actionLib.setText(this.dropDownTermsOfShipment, directQuotation.termsOfShipment);
        actionLib.setText(this.textBoxReferenceNo, directQuotation.referenceNo);
        actionLib.setText(this.textBoxGrossWeight, directQuotation.grossWeight);
        actionLib.setText(this.textBoxVolumeWeight, directQuotation.volumeWeight);
        actionLib.click(this.btnAttachment);
        actionLib.setText(this.textBoxAttachmentRefNo, directQuotation.referenceNo);
        actionLib.uploadFile(this.btnFileUpload, attachmentUpload);
        actionLib.click(this.btnAttachmentSave);
        this.addGeneralNotes(directQuotation.notes);
    }


    this.addDirectQuotationCarrierCharge = function (quotationDrctData) {
        actionLib.setText(this.dropDownCarrier, quotationDrctData.carrier);
        actionLib.setText(this.textBoxTransitDays, quotationDrctData.transitDays);
        this.fillFrequency(quotationDrctData.frequency)
        actionLib.setText(this.textBoxAmtPerUnit, quotationDrctData.amtPerUnit);
        actionLib.setText(this.textBoxMinAmount, quotationDrctData.minAmount);
        actionLib.setText(this.textBoxChargeCode, quotationDrctData.chargeCode);
        actionLib.setText(this.textBoxROE,quotationDrctData.ROE);
        actionLib.setText(this.textBoxUnit, quotationDrctData.unit);
        efsLib.selectDropdown(this.testBoxNoUnit, quotationDrctData.noOfUnit)
        actionLib.setText(this.textBoxCostPerUnit, quotationDrctData.costPerUnit);
        actionLib.setText(this.textBoxMinCost, quotationDrctData.minCost);
    }

    this.fillServiceName = function (strService, strServiceName) {
        reqElement = by.xpath("//input[@id='service']/../..//span");
        actionLib.click(reqElement);
        actionLib.click(strServiceName);
    }

    this.fillSalesman = function () {
        reqElement = by.xpath("//input[@id='salesman']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillShipper = function (strShipper) {
        reqElement = by.id("shipper");
        actionLib.setText(reqElement, strShipper);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }
    this.fillstrSalesCoordinator = function () {
        reqElement = by.xpath("//input[@id='salesCoordinator']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.addGeneralNotes = function (strNotes) {
        actionLib.click(this.btnGeneralNotes);
        actionLib.verifyElementPresent(this.textAreaGeneralNotes);
        actionLib.setText(this.textAreaGeneralNotes, strNotes)
    }

    this.fillFrequency = function (strFrequency) {
        reqElement = by.id("0mmfrequency");
        actionLib.setText(reqElement, strFrequency);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

};
module.exports = new pageGlobal();
