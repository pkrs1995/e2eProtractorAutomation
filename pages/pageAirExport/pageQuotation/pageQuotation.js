var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');

var pageAddQuotation = function () {
    var reqElement;

    this.linkQuotation = by.xpath("//a[@href='#/myAirExportTask?activeTab=Quotation']");
    this.btnCreateQuotation = by.className("btn btn-primary btn-xs btn-property accent-btn  enqft");
    this.dropDownCustomer = by.id("partyMaster");
    this.btnGeneralNotes = by.xpath("//button[@ng-click='generalModel()']");
    this.textAreaGeneralNotes = by.id("gNote0");
    this.btnSubmit = by.xpath("//button[@class='btn accent-btn']");
    this.calenderLoggedOn = by.id("loggedOn");
    this.dropDownLoggedBy = by.id("loggedBy");
    this.calenderValidFrom = by.id("validFrom");
    this.calenderExpiresOn = by.id("expiresOn");
    this.dropDownQuoteType = by.id("quoteType");
    this.uiSwitchRouted = by.id("whoRouted");
    this.dropDownRoutedBy = by.xpath("//input[@ng-model='quotation.agent'][@input-focus='false']");
    this.textBoxAttention = by.id("attention");
    this.dropDownSalesman = by.id("salesman");
    this.dropDownSalesCoordinator = by.id("salesCoordinator");
    this.textBoxAttention = by.id("attention");
    this.dropDownServiceName = by.id("service");
    this.dropDownOrigin = by.id("origin");
    this.dropDownDestination = by.id("destination");
    this.dropDownTermsOfShipment = by.id("tos");
    this.textBoxReferenceNo = by.id("refNo");
    this.textBoxGrossWeight = by.model("quotationDetail.grossWeight");
    this.textBoxVolumeWeight = by.id("volumeWeight");
    this.btnSave = by.xpath("//input[@class='btn btn-primary btn-xs btn-property accent-btn']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");
    this.menuTasks = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks = by.className("col-xs-9 ptb14 pl10 ng-binding");
    this.btnApprove = by.xpath("//button[@ng-click='approve()']");
    this.btnApproveYes = by.xpath("//button[@ng-click='confirm(1)']");
    this.imageApprovedQuotation = by.xpath("//div[@class='col-xs-6'][@ng-show=\"quotation.approved!='Pending'\"]");
    this.btnEdit = by.className("icon-edit cursorPt");
    this.btnUpdate = by.xpath("//input[@value='Update']");
    this.imageApprovedDetails = by.xpath("//div[@ng-show=\"quotation.approved!='Pending'\"]");
    this.textLoggedUserName = by.xpath("//div[@class='user-profile-cls']/span[@class='ng-binding']");

    //Dimensions section
    this.expandDimensionsSection = by.className("fa fa-cube");
    this.uiSwitchEnabled = by.id("enabled");

    //carrier charge section
    this.expandCarrierCharge = by.className("fa fa-money");
    this.dropDownCarrier = by.id("0mccarrier");
    this.textBoxTransitDays = by.id("0mmtransit");
    this.uiSwitchAllInclusive = by.id("allInclusive");
    this.textBoxAmtPerUnit = by.id("0msellRateAmountPerUnit0");
    this.textBoxMinAmount = by.model("charge.sellRateMinAmount");

    //Air Notes
    this.expandAirNotes = by.className("fa fa-sticky-note");
    this.textAreaNotes = by.id("airNote0");
	
	this.verifyTotalValues = function (enquiryData) {
        reqElement = by.xpath("//tfoot[@class='bg-danger padded_footer']/tr");
        var row = element.all(reqElement);
        var cells = row.all(by.tagName('td'));
        var count = 0;
        cells.map(function (elm) {
            elm.getText().then(function (val) {
                if (val && val != "") {
                    count = count + 1;
                    switch (count) {
                        case 2:
                            expect(parseInt(val)).toBe(parseInt(enquiryData.noOfPieces) * 2);
                            break;
                        case 3:
                            var totalVolumeWeight = (parseInt(enquiryData.noOfPieces) * parseInt(enquiryData.length) * parseInt(enquiryData.width) * parseInt(enquiryData.height) * 2) / parseInt(enquiryData.lbsUnitValue);
                            totalVolumeWeight = typeof((Math.round(totalVolumeWeight * 100) / 100));
                            val = val.split(",").join('');
                            var val1=typeof(Math.round(val));
                            expect(val1).toBe(totalVolumeWeight);
                            break;
                        case 4:
                            expect(parseInt(val)).toBe(parseInt(enquiryData.dimensionGrossWeight) * 2);
                            break;
                        case 5:
                            var grossWeightInKg = typeof(Math.round(((enquiryData.dimensionGrossWeight * 2 * 0.453592) * 100) / 100));//change
                            var  grossWeightInKg = grossWeightInKg.toString();//changes
                            var val1=typeof(Math.round(val));//changes
                            expect(val1).toBe(grossWeightInKg);//change
                            break;
                    }
                }
            });
        })
    }

    this.verifyImageApprovedDetails = function(imageTags){
        var row = element.all(this.imageApprovedDetails);
        var cells = row.all(by.xpath("//h4[@ng-show=\"quotation.approved=='Approved'\"]"));
        var count = 0;
        cells.map(function (elm) {
            elm.getText().then(function (val) {
                expect(val).toEqual(imageTags[count]);
                count += 1;
            });
        });
    }

    this.fillShipper = function (strShipper) {
        reqElement = by.id("shipper");
        actionLib.setText(reqElement, strShipper);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillFrequency = function (strFrequency) {
        reqElement = by.id("0mmfrequency");
        actionLib.setText(reqElement, strFrequency);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.addGeneralNotes = function (strNotes) {
        actionLib.click(this.btnGeneralNotes);
        actionLib.verifyElementPresent(this.textAreaGeneralNotes);
        actionLib.setText(this.textAreaGeneralNotes, strNotes)
    }

    this.fillRoutedBy = function (strRoutedBy) {
        actionLib.setText(this.dropDownRoutedBy, strRoutedBy)
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addQuotation = function (strInput) {

            this.fillShipper(globalData.globalData.customerName);
            actionLib.setText(this.textBoxReferenceNo, strInput.referenceNo);
            actionLib.click(this.uiSwitchRouted)
            this.fillRoutedBy(globalData.globalData.customerName);  
            actionLib.setText(this.textBoxAttention, strInput.attention)
            this.addGeneralNotes(strInput.generalNotes);
    }

    //specify "none" for parameters which you don't want to fill
    this.addQuotationCarrierCharge = function (strInput) {

            actionLib.setText(this.dropDownCarrier, strInput.carrier);
            actionLib.setText(this.textBoxTransitDays, strInput.transitDays);
            this.fillFrequency(strInput.frequency)
            actionLib.setText(this.textBoxAmtPerUnit, strInput.amtPerUnit);
            actionLib.setText(this.textBoxMinAmount, strInput.minAmount);
    }

    //specify "none" for parameters which you don't want to fill
    this.addQuotationAirNotes = function (strInput) {

            actionLib.setText(this.textAreaNotes, strInput.notes);
    }

};

module.exports = new pageAddQuotation();
