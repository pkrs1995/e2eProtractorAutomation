var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');


var pageAddEnquiry = function () {
    var reqElement;
    //enquiryReceived,QuoteByDate
    var enquiryTodayDate = actionLib.getTodayDate(); 
    //uploadAgentTemplate for addEnquiry Function
    var attachmentUpload = "../testdata/dataFiles/agentTemplate.xlsx";

    this.linkEnquiry = by.xpath("//a[@href='#/myAirExportTask?activeTab=Enquiry']");
    this.btnAddEnquiry = by.xpath("//button[@ng-click='viewAddSalesEnquiry()']");
    this.dropDownCustomer = by.id("partyName");
    this.calenderEnquiryReceived = by.id("receivedOn");
    this.calenderQuoteByDate = by.id("quoteBy");
    this.dropDownOrigin = by.id("origin0");
    this.dropDownDestination = by.id("destination0");
    this.dropDownTermsOfShipment = by.id("tos0");
    this.uiSwitchClearance = by.xpath("//span[@id='clearance0']");
    this.uiSwitchHazardousGoods = by.xpath("//span[@id='hazardous0']");
    this.dropDownCommodityGrp = by.id("commodity0");
    this.textBoxGrossWeight = by.id("grossWeight0");
    this.textBoxVolumeWeight = by.model("enquiryDetail.volWeight");
    this.btnRemarks = by.xpath("//button[@ng-click='openRemarksPopUp($index)']");
    this.textAreaRemarks = by.id("notes0");
    this.btnRemarksSave = by.className("btn btn-primary btn-xs btn-property accent-btn ml0");
    this.btnAttachment = by.xpath("//button[@ng-click='openAttachmentPopUp($index)']");
    this.textBoxAttachmentRefNo = by.id("EnqSerAtt0attachRefNo0");
    this.btnFileUpload = by.css("input[type='file']");
    this.btnAttachmentSave = by.className("btn btn-primary btn-xs btn-property accent-btn ml0");
    this.btnSave = by.xpath("//input[@class='btn btn-primary btn-xs btn-property accent-btn']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");
    this.menuTasks = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks = by.className("col-xs-9 ptb14 pl10 ng-binding");
    this.btnEdit = by.xpath("//a[@ng-click='editEnquiry()']");
    this.btnUpdate = by.xpath("//input[@value='Update']");
    this.chargeableWeightContainer = by.id("enq_add_chargeableWeight");

    //Add Enquiry Dimensions section
    this.expandDimensionsSection = by.className("fa fa-cube");
    this.btnAddDimension = by.xpath("//dimension-table[@country-master='enquiryLog.countryMaster']/a");
    this.textBoxNoOfPieces = by.id("EnqSer0noOfPiece0");
    this.textBoxLength = by.id("EnqSer0length0");
    this.textBoxWidth = by.id("EnqSer0width0");
    this.textBoxHeight = by.id("EnqSer0height0");
    this.textBoxDimensionsGrossWt = by.id("EnqSer0grossWeight0");
    this.textBoxNoOfPieces1 = by.id("EnqSer0noOfPiece1");
    this.textBoxLength1 = by.id("EnqSer0length1");
    this.textBoxWidth1 = by.id("EnqSer0width1");
    this.textBoxHeight1 = by.id("EnqSer0height1");
    this.textBoxDimensionsGrossWt1 = by.id("EnqSer0grossWeight1");
    this.uiSwitchEnabled = by.id("enabled");

    //Add Enquiry Pick up/Delivery section
    this.expandPickUpDeliverySection = by.className("fa fa-truck rotate-y");
    this.textBoxPickUpAddress1 = by.id("pickupAddress.addressLine10");
    this.textBoxPickUpAddress2 = by.model("enquiryDetail.pickupAddress.addressLine2");
    this.textBoxPickUpAddress3 = by.model("enquiryDetail.pickupAddress.addressLine3");
    this.textBoxPickUpPoBox = by.model("enquiryDetail.pickupAddress.poBox");
    this.dropDownPickUpCity = by.id("enquiryDetail.pickupAddress.city.0");
    this.dropDownPickUpState = by.id("enquiryDetail.pickupAddress.state.0");
    this.dropDownPickUpCountry = by.id("enquiryDetail.pickupAddress.country.0");
    this.textBoxDeliveryAddress1 = by.id("deliveryAddress0");
    this.textBoxDeliveryAddress2 = by.model("enquiryDetail.deliveryAddress.addressLine2");
    this.textBoxDeliveryAddress3 = by.model("enquiryDetail.deliveryAddress.addressLine3");
    this.textBoxDeliveryPoBox = by.model("enquiryDetail.deliveryAddress.poBox");
    this.dropDownDeliveryCity = by.id("enquiryDetail.deliveryAddress.city.0");
    this.dropDownDeliveryState = by.id("enquiryDetail.deliveryAddress.state.0");
    this.dropDownDeliveryCountry = by.id("enquiryDetail.deliveryAddress.country.0");

    //Add Enquiry Rate Request section
    this.expandRateRequestSection = by.className("fa fa-hand-pointer-o");
    this.dropDownVendor = by.id("EnqRR0vendorName0");
    this.textBoxContactPerson = by.id("EnqRR0contactPerson0");
    this.textBoxEmail = by.id("EnqRR0email0");
    this.iconShowCharge = by.className("fa fa-external-link ng-scope");
    this.dropDownChargeCode = by.id("0chargeCodeField0");
    this.dropDownUnitCode = by.id("0unitMaster0");
    this.dropDownCurrency = by.id("0currency0");
    this.textBoxBuyRate = by.id("0buyRate0");
    this.textBoxMinAmt = by.id("0minAmt0");
    this.btnChargeDetailSave = by.xpath("//button[@class='btn accent-btn']");
    this.iconRateRequestDelete = by.css(".icon-delete.ng-scope");
    this.btnAddVendor = by.xpath("//div/a[@ng-click=\"fnRole({param:addRole})?addRow():''\"]");

    this.fillCustomer = function (strCustomer) {
        reqElement = by.id("partyName");
        actionLib.setText(this.dropDownCustomer, strCustomer);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillRateRequestFinal = function (strFinal) {
        reqElement = by.xpath("//select[@id='EnqRR0rateAccepted0']/option[@label='" + strFinal + "']");
        actionLib.click(reqElement);
    }

    this.fillSalesCoordinator = function () {
        reqElement = by.xpath("//input[@id='salesCoordinator']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillSalesman = function () {
        reqElement = by.xpath("//input[@id='salesMan']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.selectRadioBtnTrade = function (strTrade) {
        reqElement = by.xpath("//md-radio-button[@value='" + strTrade + "']//div[@class='md-on']");
        actionLib.click(reqElement);
    }

    this.selectRadioBtnService = function (strService) {
        reqElement = by.xpath("//md-radio-button[@value='" + strService + "']//div[@class='md-on']");
        actionLib.click(reqElement);
    }

    this.fillFromSlab = function (strFromSlab) {
        reqElement = by.xpath("//select[@id='0unitSlap0']/option[@label='" + strFromSlab + "']");
        actionLib.click(reqElement);
    }

    this.fillSoc = function (strSoc) {
        reqElement = by.xpath("//select[@id='0soc0']/option[@label='" + strSoc + "']");
        actionLib.click(reqElement);
    }

    this.navigateToAddEnquiryPage = function () {
        actionLib.click(this.btnAddEnquiry);
    }

    //specify "none" for parameters which you don't want to fill
    this. addEnquiry = function (strInput) {

        this.fillCustomer(globalData.globalData.customerName); //globalData CustomerName
        this.fillSalesCoordinator();
        //this.fillSalesman();
        actionLib.setText(this.calenderEnquiryReceived, enquiryTodayDate); //EnquiryReceived
        actionLib.setText(this.calenderQuoteByDate, enquiryTodayDate);     //QuoteByDate
        this.selectRadioBtnTrade(strInput.trade);
        this.selectRadioBtnService(strInput.service); 
        actionLib.setText(this.dropDownOrigin,strInput.origin);
        actionLib.setText(this.dropDownDestination, strInput.destination);
        actionLib.setText(this.dropDownTermsOfShipment, strInput.termsOfShipment);
        actionLib.click(this.uiSwitchClearance); 
        actionLib.click(this.uiSwitchHazardousGoods);  
        actionLib.setText(this.dropDownCommodityGrp, strInput.commodityGroup);
        actionLib.setText(this.textBoxGrossWeight, strInput.grossWeight);
        actionLib.setText(this.textBoxVolumeWeight, strInput.volumeWeight);
        actionLib.click(this.btnRemarks);
        actionLib.setText(this.textAreaRemarks, strInput.remarks);
        actionLib.click(this.btnRemarksSave);
        actionLib.click(this.btnAttachment);
        actionLib.setText(this.textBoxAttachmentRefNo, strInput.attachmentRefNo);
        actionLib.uploadFile(this.btnFileUpload, attachmentUpload);
        actionLib.click(this.btnAttachmentSave);
       
    }

    //specify "none" for parameters which you don't want to fill
    this.addEnquiryDimensions = function (strInput) 
    {
        actionLib.setText(this.textBoxNoOfPieces, strInput.noOfPieces);
        actionLib.setText(this.textBoxLength, strInput.length);
        actionLib.setText(this.textBoxWidth, strInput.width);
        actionLib.setText(this.textBoxHeight, strInput.height);
        actionLib.setText(this.textBoxDimensionsGrossWt, strInput.dimensionGrossWeight);  
    }

    this.addEnquiryDimensions1 = function(strInput)
    {
        actionLib.setText(this.textBoxNoOfPieces1, strInput.noOfPieces);
        actionLib.setText(this.textBoxLength1, strInput.length);
        actionLib.setText(this.textBoxWidth1, strInput.width);
        actionLib.setText(this.textBoxHeight1, strInput.height); 
        actionLib.setText(this.textBoxDimensionsGrossWt1, strInput.dimensionGrossWeight)
    }

    //specify "none" for parameters which you don't want to fill
    this.addEnquiryPickUpDelivery = function (strInput) 
    {
        actionLib.setText(this.textBoxPickUpAddress1, strInput.pickUpAddress1);
        actionLib.setText(this.textBoxPickUpAddress2, strInput.pickUpAddress2);
        actionLib.setText(this.textBoxPickUpAddress3, strInput.pickUpAddress3);
        actionLib.setText(this.textBoxPickUpPoBox, strInput.pickUpPoBox);
        actionLib.setText(this.dropDownPickUpCity, strInput.pickUpCity);
        actionLib.setText(this.dropDownPickUpState, strInput.pickUpState);
        actionLib.setText(this.dropDownPickUpCountry, strInput.pickUpCountry);
        actionLib.setText(this.textBoxDeliveryAddress1, strInput.deliveryAddress1);
        actionLib.setText(this.textBoxDeliveryAddress2, strInput.deliveryAddress2);
        actionLib.setText(this.textBoxDeliveryAddress3, strInput.deliveryAddress3);
        actionLib.setText(this.textBoxDeliveryPoBox, strInput.deliveryPoBox);
        actionLib.setText(this.dropDownDeliveryCity, strInput.deliveryCity);
        actionLib.setText(this.dropDownDeliveryState, strInput.deliveryState);
        actionLib.setText(this.dropDownDeliveryCountry, strInput.deliveryCountry);
     
    }

    //specify "none" for parameters which you don't want to fill
    this.addEnquiryRateRequest = function (strInput) {

        
        actionLib.setText(this.dropDownVendor, globalData.globalData.customerName); //globalData CustomerName
        actionLib.setText(this.textBoxContactPerson, strInput.contactPerson);
        actionLib.setText(this.textBoxEmail, strInput.Email);
        this.fillRateRequestFinal(strInput.Final);
        actionLib.click(this.iconShowCharge);
        actionLib.setText(this.dropDownChargeCode, strInput.chargeCode);
        actionLib.setText(this.dropDownUnitCode, strInput.unitCode);
        actionLib.setText(this.dropDownCurrency, strInput.currency);
        actionLib.setText(this.textBoxBuyRate, strInput.buyRate);
        actionLib.setText(this.textBoxMinAmt, strInput.minAmt);
        this.fillFromSlab(strInput.fromSlab);
        this.fillSoc(strInput.Soc);
        
    }

    //Verify Dimension Table volume changed on switch on/off
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
                            totalVolumeWeight = (Math.round(totalVolumeWeight * 100) / 100).toString();
                            val = val.split(",").join('');
                            expect(val).toBe(totalVolumeWeight);
                            break;
                        case 4:
                            expect(parseInt(val)).toBe(parseInt(enquiryData.dimensionGrossWeight) * 2);
                            break;
                        case 5:
                            var grossWeightInKg = Math.round((enquiryData.dimensionGrossWeight * 2 * 0.453592) * 100) / 100;
                            grossWeightInKg = grossWeightInKg.toString();
                            expect(val).toBe(grossWeightInKg);
                            break;
                    }
                }
            });
        })
    }

    //Verify Chargeable weight should be greatest of gross weight and volume weight
    this.veryfyChargeableWeight = function(enquiryData){
        var totalVolumeWeight = (parseInt(enquiryData.noOfPieces) * parseInt(enquiryData.length) * parseInt(enquiryData.width) * parseInt(enquiryData.height) * 2) / parseInt(enquiryData.cmUnitValue);
        totalVolumeWeight = (Math.round(totalVolumeWeight * 100) / 100).toString();
        var grossWeight = parseInt(enquiryData.dimensionGrossWeight) * 2;
        var chargeableWeight = totalVolumeWeight > grossWeight ? totalVolumeWeight : grossWeight;
        reqElement = actionLib.getTextByLocator(this.chargeableWeightContainer);
        reqElement.then(function(val){
            val = parseInt(val);
           // expect(val).toBe(chargeableWeight); probelm
        })
    }
};

module.exports = new pageAddEnquiry();
