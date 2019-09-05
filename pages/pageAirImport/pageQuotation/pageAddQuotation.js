var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');

var pageAddQuotation = function () {
    var reqElement;
    
   
    this.btnAddQuotation = by.xpath("//button[text()[normalize-space()='Add Quotation']]");
    this.linkQuotation = by.xpath("//a[@href='#/myAirImportTask?activeTab=Quotation']");
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
    this.btnLost = by.xpath("//button[@ng-click='lost()']");
    this.btnBack = by.xpath("//button[@ng-click='cancel()']");
    this.QuotationId = by.xpath("//div[@class='ngdialog-content']//p[1]");
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

    //Air Notes
    this.expandAirNotes = by.className("fa fa-sticky-note");
    this.textAreaNotes = by.id("airNote0");

    //Copy Quotation
    this.selectFirstRow = by.xpath("//tr[1]//td[1]//span[1]");
    this.btnCopyQuote = by.xpath("//button[text()[normalize-space()='Copy Quote']]");
    this.copyCustomerName = by.xpath("//span[text()='Customer']/following-sibling::h5[1]");
    this.copyLoggedOnDate = by.xpath("(//h6[@class='ng-binding'])[1]");
    this.copyValidFromDate = by.xpath("(//h6[@class='ng-binding'])[2]");
    this.copyExpiresOnDate = by.xpath("(//h6[@class='ng-binding'])[3]");
    this.copyServiceName = by.xpath("//h3[@class='ng-binding']");
    this.copyOrigin = by.xpath("//span[text()='Origin']/following-sibling::h6[1]");
    this.copyDestination = by.xpath("//span[text()='Destination']/following-sibling::h6[1]");
    this.copytos = by.xpath("//span[text()='Terms of Shipment']/following-sibling::h6[1]");
    this.calenderValidFromQuote = by.id("validFromQuote");
    this.calenderExpiresOnFromQuote = by.id("expiresonCopyQuote");
    this.btnCopy = by.xpath("//button[text()='Copy']");
    this.btnCancel = by.xpath("//button[text()='Cancel']");
    this.copyQuoteDuplicationErrorMessage = by.xpath("(//span[@class='ng-binding'])[4]");
    this.copyDuplicationErrorMessage = by.xpath("(//span[@class='ng-binding'])[3]");

    //Add Dimension Direct quotation
    this.uiSwitchCentimetersorkilos = by.id("enabled")
    this.expandDimensionsSection = by.className("fa fa-cube");
    this.textBoxNoOfPiecesQuotation = by.id("noOfPiece0");
    this.textBoxLengthQuotation = by.model("dataObj.length");
    this.textBoxWidthQuotation = by.id("width0");
    this.textBoxHeightQuotation = by.id("height0");
    this.textBoxDimensionsGrossWtQuotation = by.id("grossWeight0");
    this.textBoxOverDimension = by.xpath("//label[text()='Over Dimension']/..//*[@class='nomargin ng-binding']");

    this.fillCustomer = function (strCustomer) {
      
        actionLib.setText(this.dropDownCustomer, strCustomer);
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

    this.fillSalesman = function () {

        reqElement = by.xpath("//input[@id='salesman']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.selectServiceName = function(){
        var copyServiceName = actionLib.getTextByLocator(this.copyServiceName);
        actionLib.setText(this.dropDownServiceName, copyServiceName)
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

    this.fillUnitCode = function(strUnit)
    {
        reqElement = by.id("0munitMaster1");
        actionLib.setText(reqElement, strUnit);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.addQuotationWithserviceDetails = function(strInput){

        reqElement = by.className("uib-typeahead-match ng-scope active");
        this.fillCustomer(globalData.globalData.importCustomerName);
        this.fillShipper(globalData.globalData.importCustomerName);
        actionLib.setText( this.calenderValidFrom, actionLib.getFutureDate(1));
        actionLib.setText(this.calenderExpiresOn,  actionLib.getFutureDate(9));
        this.fillSalesman();
        this.fillstrSalesCoordinator();
        actionLib.setText(this.textBoxAttention, strInput.attention);
        actionLib.setText(this.dropDownServiceName, strInput.serviceName);
        actionLib.click(reqElement);
        actionLib.setText(this.dropDownOrigin, strInput.origin);
        actionLib.setText(this.dropDownDestination, strInput.destination);
        actionLib.setText(this.dropDownTermsOfShipment, strInput.termsOfShipment);
        actionLib.setText(this.textBoxReferenceNo, strInput.referenceNo);
        actionLib.setText(this.textBoxGrossWeight,strInput.grossWeight);
        
    }
    //specify "none" for parameters which you don't want to fill
    this.addQuotation = function (strInput) {

        this.fillShipper(globalData.globalData.importCustomerName);
        actionLib.setText(this.textBoxReferenceNo, strInput.referenceNo);
        actionLib.click(this.uiSwitchRouted)
        this.fillRoutedBy(globalData.globalData.importCustomerName);
        actionLib.setText(this.textBoxAttention, strInput.attention);
        actionLib.setText(this.textBoxGrossWeight,strInput.grossWeight);
        this.addGeneralNotes(strInput.generalNotes);
       
    }

    //specify "none" for parameters which you don't want to fill
    this.addQuotationCarrierCharge = function (strInput) {

        actionLib.setText(this.dropDownCarrier, strInput.carrier);
        actionLib.setText(this.textBoxTransitDays, strInput.transitDays);
        this.fillFrequency(strInput.frequency)
        actionLib.setText(this.textBoxChargeCode,strInput.chargeCode);
        // reqElement = by.className("uib-typeahead-match ng-scope active");
        // actionLib.click(reqElement);
        actionLib.setText(this.textBoxAmtPerUnit, strInput.amtPerUnit);
        actionLib.setText(this.textBoxMinAmount, strInput.minAmount);
    }

    //specify "none" for parameters which you don't want to fill
    this.addQuotationAirNotes = function (strNotes) {

            actionLib.setText(this.textAreaNotes, strNotes.notes);
    }

    this.fillCopyQuoteFollowingCustomer = function() {

        reqElement = by.xpath("(//input[@ng-model='copyQuote.party'])[2]");
        var customerName = actionLib.getTextByLocator(this.copyCustomerName);
        actionLib.setText(reqElement, customerName);
    }

    this.copyQuotation = function() {

        actionLib.click(this.selectFirstRow);
        actionLib.click(this.btnCopyQuote);
        this.fillCopyQuoteFollowingCustomer();
        actionLib.setText(this.calenderValidFromQuote, actionLib.getTodayDate());
        actionLib.click(this.btnCopy);
        
        if(element(this.btnCancel).isDisplayed()){
        var duplicateQuotationErrorMessage = actionLib.getTextByLocator(this.copyQuoteDuplicationErrorMessage);
        expect(duplicateQuotationErrorMessage).toContain("Duplication of Quotation with similar party, valid from date, expires on date and port pair has happened.");
        actionLib.click(this.btnCancel); 
        }

    }

    this.copyQuotationWithDuplicate = function() {

        actionLib.click(this.selectFirstRow);
        actionLib.click(this.btnCopyQuote);
        this.fillCopyQuoteFollowingCustomer();
        var copyValidfrom = actionLib.getTextByLocator(this.copyValidFromDate);
        var copyExpiresOn = actionLib.getTextByLocator(this.copyExpiresOnDate);
        actionLib.setText(this.calenderValidFromQuote, copyValidfrom);
       // actionLib.setText(this.calenderExpiresOnFromQuote, copyExpiresOn);
        actionLib.click(this.btnCopy);
        var duplicateQuotationErrorMessage = actionLib.getTextByLocator(this.copyQuoteDuplicationErrorMessage);
        expect(duplicateQuotationErrorMessage).toContain("Duplication of Quotation with similar party, valid from date, expires on date and port pair has happened.");
        actionLib.click(this.btnCancel);
    }

    this.duplicateQuotation = function(strInput){

        actionLib.click(this.selectFirstRow);
        var copyCustomerName = actionLib.getTextByLocator(this.copyCustomerName);
        var copyLoggedOnDate = actionLib.getTextByLocator(this.copyLoggedOnDate);
        var copyValidFromDate = actionLib.getTextByLocator(this.copyValidFromDate);
        var copyExpiresOnDate = actionLib.getTextByLocator(this.copyExpiresOnDate);
        var copyServiceName = actionLib.getTextByLocator(this.copyServiceName);
        var copyOrigin = actionLib.getTextByLocator(this.copyOrigin);
        var copyDestination = actionLib.getTextByLocator(this.copyDestination);
        var copytos = actionLib.getTextByLocator(this.copytos);
        actionLib.click(this.btnAddQuotation);
        actionLib.setText(this.dropDownCustomer, copyCustomerName);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
        actionLib.setText(this.calenderLoggedOn, copyLoggedOnDate);
        actionLib.setText(this.calenderValidFrom, copyValidFromDate);
        actionLib.setText(this.calenderExpiresOn, copyExpiresOnDate);
        this.fillSalesman();
        this.fillstrSalesCoordinator();
        actionLib.setText(this.dropDownServiceName, copyServiceName);
        actionLib.click(reqElement);
        actionLib.setText(this.dropDownOrigin, copyOrigin);
        actionLib.setText(this.dropDownDestination, copyDestination);
        actionLib.setText(this.dropDownTermsOfShipment, copytos);
        actionLib.setText(this.textBoxAttention, strInput.attention);
        actionLib.setText(this.textBoxGrossWeight,strInput.grossWeight);
       
    }
    
    this.overDimensions = function(dimensionData, index){

        actionLib.click(this.expandDimensionsSection);
        efsLib.chooseFromSwitch(this.uiSwitchCentimetersorkilos, dimensionData.dimensionUnit);
        actionLib.setText(this.textBoxNoOfPiecesQuotation, dimensionData.noOfPieces);
        actionLib.setText(this.textBoxLengthQuotation, dimensionData.length);
        actionLib.setText(this.textBoxWidthQuotation, dimensionData.width);
        actionLib.setText(this.textBoxHeightQuotation, dimensionData.height);
        actionLib.setText(this.textBoxDimensionsGrossWtQuotation, dimensionData.grossWeight);
        var overDimensionText = actionLib.getTextByLocator(this.textBoxOverDimension).then(function (text){
            expect("Iteration"+ index + "  "+text).toBe("Iteration"+ index + "  "+dimensionData.isOverDimension);
        });
        reqElement = element(this.textBoxLengthQuotation);
        reqElement.clear();
        reqElement = element(this.textBoxWidthQuotation);
        reqElement.clear();
        reqElement = element(this.textBoxHeightQuotation);
        reqElement.clear();
        actionLib.click(this.expandDimensionsSection);
    }

    this.getQuotationNumber = function (strLocator, strIndex) {
       
        var reqElement =element(strLocator);
        reqElement.getText().then(function (text) {
           var splitText = text.split(" ");
           var strName = splitText[strIndex];
           globalData.globalData.quotationId = strName;
           console.log("strName "+ strName);
            return text;
        });
         
        
    };

    this.lostQuotation = function(){

        actionLib.click(this.btnLost);
        actionLib.click(this.btnApproveYes);
        actionLib.click(this.imageApprovedQuotation);
        actionLib.click(this.btnBack);
    }

    this.approveQuotation = function(){

        actionLib.click(this.btnApprove);
        actionLib.click(this.btnApproveYes);
        actionLib.click(this.imageApprovedQuotation);
        actionLib.click(this.btnBack);
    }

};

module.exports = new pageAddQuotation();
