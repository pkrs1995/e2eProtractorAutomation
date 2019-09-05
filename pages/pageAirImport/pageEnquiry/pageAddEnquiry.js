var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var enquiryData = require('../../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var hamberger = require('../../../pages/pageNavigation/hamburgerMenu.js');
var addCustomerData = require('../../../testdata/masters/eCRM/customer/customer.json');



var pageAddEnquiry = function () {
     var reqElement;
     var strEnquiryReceived;
     var strQuoteByDate;    
     var dataEnquiry;
     var dataAddCustomer;
     var directCustomerName;
     directCustomerName = "AddCustomer" + actionLib.getTodayTime();
     var randomcustomerName = globalData.globalData.customerName + actionLib.getTodayTime();
     strEnquiryReceived= actionLib.getTodayDate();
     strQuoteByDate=actionLib.getTodayDate();
     dataEnquiry=enquiryData.addEnquiry[0];
     dataAddCustomer = addCustomerData.addCustomer[0];
     

    //add Enquiry
    this.btnCreateQuotation = by.className("btn btn-primary btn-xs btn-property accent-btn  enqft");
    var attachmentUpload = "../testdata/dataFiles/agentTemplate.xlsx";
    this.linkEnquiry = by.xpath("//a[@href='#/myAirImportTask?activeTab=Enquiry']");
    this.btnAddEnquiry = by.xpath("//button[@ng-click='viewAddSalesEnquiry()']");
    this.btnEnquiry =  by.xpath("//a[contains(text(),'Add Enquiry')]"); //enquiry page btnaddEnquiry
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
    this.btnCancel = by.xpath("//button[@class='btn btn-default btn-xs btn-property cancel-btn']");


    //Add Enquiry Dimensions section
    this.expandDimensionsSection = by.className("fa fa-cube");
    // this.textBoxNoOfPieces = by.id("EnqSer0noOfPiece0");
    this.textBoxNoOfPieces = "EnqSer0noOfPiece";
    this.textBoxLength = by.id("EnqSer0length0");
    this.textBoxWidth = by.id("EnqSer0width0");
    this.textBoxHeight = by.id("EnqSer0height0");
    this.textBoxDimensionsGrossWt = by.id("EnqSer0grossWeight0");


    //Add Dimension Direct quotation
    this.textBoxNoOfPiecesQuotation = by.id("noOfPiece0");
    this.textBoxLengthQuotation = by.model("dataObj.length");
    this.textBoxWidthQuotation = by.id("width0");
    this.textBoxHeightQuotation = by.id("height0");
    this.textBoxDimensionsGrossWtQuotation = by.id("grossWeight0");

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

    //Test Cases Locators
    this.cancelCheckbox = by.xpath("//label[text()[normalize-space()='Cancel']]");
    this.customerTooltip = by.xpath("//i[@bs-tooltip='addEnquiryCustomer']");
    this.salesman =by.xpath("//input[@id='salesCoordinator']/../..//span");     // Name change required Prabha
    this.salesCoordinator =by.id("salesCoordinator");                           // Added Prabha
    // this.salesMan =by.id("salesMan");                                           // Added Prabha
    this.tabCancelled = by.xpath("//li[@ng-click=\"setSearch('cancel'); detailTab='cancel'\"]");
    this.dropDownCountry = by.id("enquiryCustomerCountry");
    this.textBoxAddress1 = by.id("enquiryCustomerAddrLine1");
    this.dropDownCity = by.id("enquiryCustomerCity");
    this.dropdownState = by.id("enquiryCustomerState");
    this.btnsavepopup = by.xpath("(//li[@class='plr0']//button[1])[2]");
    this.createCustomer= by.xpath("//button[contains(@class,'btn btn-success')]");
    this.btnEdit = by.className("icon-edit");
    this.expandValueAddedService = by.className("fa fa-cog");
    this.VASCheckbox = by.xpath("//label[@for='0valueAddedServices0']");
    this.expandCarrierCharge = by.className("fa fa-money");
    this.btnCreateQuotation = by.className("btn btn-primary btn-xs btn-property accent-btn  enqft");
    this.errorMessageCustomerIcon = by.xpath("//div[text()='This enquiry is not created with the customer, create a customer before creating quotation']");
    this.backtoEnquiryList = by.className("btn btn-xs btn-property btn-gray");
    this.cancelQuotation = by.xpath("//button[text()='Cancel']");
    this.linknavigation = by.xpath("//a[contains(@class,'hyperLink mb0')]");
    this.copyQuotationCustomer = by.id("partyMaster");
    this.customerErrorMessage= by.xpath("//div[contains(@class,'ui-notification ng-scope')]//div[1]");
    this.enquiryRateRequestFinal= by.id("EnqRR0rateAccepted0");
    this.popupYesButton = by.xpath("//button[.='Yes']");
    this.popupNoButton = by.xpath("//button[.='No']");
        this.fillEnquiryCity = function(strCity)
        {
            // reqElement= by.id("enquiryCustomerCity");                               // commented Prabha
            // actionLib.setText(this.dropDownCity, strCity);                          // commented Prabha
            // reqElement = by.className("uib-typeahead-match ng-scope active");
            // actionLib.click(reqElement);
            actionLib.setText(this.dropDownCity, strCity);       // Added Prabha
        }

        this.fillEnquiryState = function(strState)
        {
            // reqElement= by.id("enquiryCustomerState");                               // commented Prabha
            // actionLib.setText(this.dropdownState, strState);                         // commented Prabha
            // reqElement = by.className("uib-typeahead-match ng-scope active");
            // actionLib.click(reqElement);
            efsLib.selectNormalDropdown(this.dropdownState, strState);      // Added Prabha
        }
        this.fillCustomer = function (strCustomer) {
            reqElement = by.id("partyName");                                           // commented Prabha
            actionLib.setText(this.dropDownCustomer, strCustomer);                     // commented Prabha
            reqElement = by.className("uib-typeahead-match ng-scope active");          // commented Prabha
            actionLib.click(reqElement);                                               // commented Prabha
            //efsLib.selectNormalDropdown(this.dropDownCustomer, strCustomer); // Added Prabha
        }

        this.fillRateRequestFinal = function (strFinal) {
            reqElement = by.xpath("//select[@id='EnqRR0rateAccepted0']/option[@label='" + strFinal + "']");
            actionLib.click(reqElement);
            // efsLib.selectTableDropdown(this.enquiryRateRequestFinal,strFinal);
        }

        this.fillSalesCoordinator = function () {
            reqElement = by.xpath("//input[@id='salesCoordinator']/../..//span");        // req commented Prabha
            actionLib.click(reqElement);                                                 // req commented Prabha
            reqElement = by.className("uib-typeahead-match ng-scope active");            // req commented Prabha
            actionLib.click(reqElement);                                                 // req commented Prabha
            // efsLib.selectNormalDropdown(this.salesCoordinator, strSalesCoordinator);   // Added Prabha
        }

        this.fillSalesman = function () {
            reqElement = by.xpath("//input[@id='salesMan']/../..//span");
            actionLib.click(reqElement);
            // reqElement = by.className("uib-typeahead-match ng-scope active");
            // actionLib.click(reqElement);
            // efsLib.selectNormalDropdown(this.salesman,strsalesman);         // required Parameter also bug in dev for enter key
        }

        this.selectRadioBtnTrade = function (strTrade) {

            // reqElement = by.xpath("//md-radio-button[@value='" + strTrade + "']");       // Commented Prabha
            // actionLib.click(reqElement);
            efsLib.clickOnRadioButton("Trade",strTrade);                                 // Added Prabha
        }

        this.selectRadioBtnService = function (strService) {
            
            // reqElement = by.xpath("//md-radio-button[@value='" + strService + "']//div[@class='md-on']");
            // actionLib.click(reqElement);
            efsLib.clickOnRadioButton("Service",strService);                                 // Added Prabha 
        }

        this.fillFromSlab = function (strFromSlab) {
            reqElement = by.xpath("//select[@id='0unitSlap0']/option[@label='" + strFromSlab + "']");
            actionLib.click(reqElement);
            // efsLib.selectDropdown(this.enquiryRateRequestFinal,strFromSlab);            // Added Prabha
        }

        this.fillSoc = function (strSoc) {
            reqElement = by.xpath("//select[@id='0soc0']/option[@label='" + strSoc + "']");
            actionLib.click(reqElement);
            // efsLib.selectDropdown(this.enquiryRateRequestFinal,strSoc);               // Added Prabha
        }

        this.navigateToAddEnquiryPage = function () {

            actionLib.click(this.btnAddEnquiry);
        }

        //addNewCustomer in customer drop down
        this.clickAddCustomer = function (strCustomerName) {
            // var customerName = by.xpath("//input[@id='partyName']/../..//span");
            // actionLib.click(customerName);
            // var addCustomer = by.xpath("//*[contains(text(),'Add New')]");
            // actionLib.click(addCustomer);
            efsLib.selectNormalDropdown(this.dropDownCustomer, "Add New");   // Added Prabha
        }
       
        //cancel Enquiry
        this. cancelEnquiry = function()
        {   
                efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
                efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
                actionLib.click(this.cancelCheckbox);  
                actionLib.click(this.btnPopUpOk);
                actionLib.click(this.backtoEnquiryList);
                actionLib.click(this.tabCancelled);
                efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
                efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
        }

        //customer icon function
        this.customericon = function() {
            actionLib.click(this.btnEnquiry);  
            reqElement = by.id("partyName");
            actionLib.setText(reqElement, randomcustomerName); 
            browser.actions().sendKeys(protractor.Key.TAB).perform(); 
        }

        //customerIcon enquiry related function
        this.addEnquiryCustomerIcon = function(strInput) {
            actionLib.click(this.customerTooltip);
            actionLib.setText(this.dropDownCountry,strInput.country);
            actionLib.setText(this.textBoxAddress1,strInput.AddressLine1)
            this.fillEnquiryCity(strInput.City);
            //this.fillEnquiryState(strInput.State);
            actionLib.click(this.btnsavepopup);
            this.fillSalesCoordinator();
            this.fillSalesman();
            actionLib.setText(this.calenderEnquiryReceived, strEnquiryReceived);
            actionLib.setText(this.calenderQuoteByDate, strQuoteByDate);
            this.selectRadioBtnTrade(strInput.trade);
            this.selectRadioBtnService(strInput.service);
            actionLib.setText(this.dropDownOrigin, strInput.origin);
            actionLib.setText(this.dropDownDestination, strInput.destination);
            actionLib.setText(this.dropDownTermsOfShipment, strInput.termsOfShipment);
            actionLib.click(this.btnSave);
            actionLib.click(this.btnPopUpOk);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
            // efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
            hamberger.navigateToPage("Masters","eCRM","Customer");
            efsLib.fillTextInTableColumn(dataAddCustomer.customer.customerTableDataXpathTag, 2, 2,randomcustomerName);
            hamberger.navigateToPage("Sales","Enquiry");
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
            efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
        }
        
        //convert into customer screen
        this.convertToCustomer = function()
        {
            actionLib.click(this.createCustomer);
            browser.sleep(2000);
            element(by.xpath("//div/div/div[@class='modal-content']/div[1]/div[1]/div[2]/ul/li[2]/button")).click();
            hamberger.navigateToPage("Masters","eCRM","Customer");
            efsLib.fillTextInTableColumn(dataAddCustomer.customer.customerTableDataXpathTag, 2, 2,randomcustomerName);
            hamberger.navigateToPage("Sales","Enquiry");
        }

        this.vasCheckbox = function()
        {
            
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
            efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
            actionLib.click(this.btnEdit);
            actionLib.click(this.expandValueAddedService);
            actionLib.click(this.VASCheckbox);
            actionLib.click(this.btnSave);
            actionLib.click(this.btnPopUpOk);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,randomcustomerName);
            efsLib.clickRowInAirExportTable(randomcustomerName,randomcustomerName);
            actionLib.click(this.btnCreateQuotation);
            actionLib.click(this.expandCarrierCharge);
            actionLib.click(this.cancelQuotation);
            actionLib.click(this.popupNoButton);
        }
        //addNewCustomer in Enquiry
        this.addNewCustomer = function()
        {   
            actionLib.click(this.btnEnquiry);
            this.clickAddCustomer(directCustomerName);
        }

        //Enquiry Customer
        this.addEnquiryCustomer = function()
        {
            this.fillCustomer(globalData.globalData.importCustomerName);
        }
        //addNewEnquiry 
        this.addEnquiry = function (enquiry)
        {
            this.fillSalesCoordinator();
            this.fillSalesman();
            browser.sleep(4000);
            actionLib.setText(this.calenderEnquiryReceived, strEnquiryReceived);
            actionLib.setText(this.calenderQuoteByDate, strQuoteByDate);
            this.selectRadioBtnTrade(enquiry.trade);
            this.selectRadioBtnService(enquiry.service);
            actionLib.setText(this.dropDownOrigin, enquiry.origin);
            actionLib.setText(this.dropDownDestination, enquiry.destination);
            actionLib.setText(this.dropDownTermsOfShipment, enquiry.termsOfShipment);
            actionLib.click(this.uiSwitchClearance);
            actionLib.click(this.uiSwitchHazardousGoods);
            actionLib.setText(this.dropDownCommodityGrp, enquiry.commodityGroup);
            actionLib.setText(this.textBoxGrossWeight, enquiry.grossWeight);
            actionLib.setText(this.textBoxVolumeWeight, enquiry.volumeWeight);
            actionLib.click(this.btnRemarks);
            actionLib.setText(this.textAreaRemarks, enquiry.remarks);
            actionLib.click(this.btnRemarksSave);
            actionLib.click(this.btnAttachment);
            actionLib.setText(this.textBoxAttachmentRefNo, enquiry.attachmentRefNo);
            actionLib.uploadFile(this.btnFileUpload, attachmentUpload);
            actionLib.click(this.btnAttachmentSave);
        } 
        //Dimensions Section
        this.addEnquiryDimensions = function (dimensions) {
            // actionLib.setText(this.textBoxNoOfPieces, dimensions.noOfPieces);
            actionLib.setText(actionLib.getIdLocator("",this.textBoxNoOfPieces,"0") , dimensions.noOfPieces);
            actionLib.setText(this.textBoxLength, dimensions.length);
            actionLib.setText(this.textBoxWidth, dimensions.width);
            actionLib.setText(this.textBoxHeight, dimensions.height);
            actionLib.setText(this.textBoxDimensionsGrossWt, dimensions.dimensionGrossWeight);
        }
            
        //Direct add Quotation
        this.addDirectQuotationDimensions = function (enquiryData) {
            actionLib.setText(this.textBoxNoOfPiecesQuotation, enquiryData.noOfPieces);
            actionLib.setText(this.textBoxLengthQuotation, enquiryData.length);
            actionLib.setText(this.textBoxWidthQuotation, enquiryData.width);
            actionLib.setText(this.textBoxHeightQuotation, enquiryData.height);
            actionLib.setText(this.textBoxDimensionsGrossWtQuotation, enquiryData.dimensionGrossWeight);

        }

        //Pickup/delivery Section
        this.addEnquiryPickUpDelivery = function (pickUpDelivery) {
            actionLib.setText(this.textBoxPickUpAddress1, pickUpDelivery.pickUpAddress1);
            actionLib.setText(this.textBoxPickUpAddress2, pickUpDelivery.pickUpAddress2);
            actionLib.setText(this.textBoxPickUpAddress3, pickUpDelivery.pickUpAddress3);
            actionLib.setText(this.textBoxPickUpPoBox, pickUpDelivery.pickUpPoBox);
            actionLib.setText(this.dropDownPickUpCity, pickUpDelivery.pickUpCity);
            actionLib.setText(this.dropDownPickUpState, pickUpDelivery.pickUpState);
            actionLib.setText(this.dropDownPickUpCountry, pickUpDelivery.pickUpCountry);
            actionLib.setText(this.textBoxDeliveryAddress1, pickUpDelivery.deliveryAddress1);
            actionLib.setText(this.textBoxDeliveryAddress2, pickUpDelivery.deliveryAddress2);
            actionLib.setText(this.textBoxDeliveryAddress3, pickUpDelivery.deliveryAddress3);
            actionLib.setText(this.textBoxDeliveryPoBox, pickUpDelivery.deliveryPoBox);
            actionLib.setText(this.dropDownDeliveryCity, pickUpDelivery.deliveryCity);
            actionLib.setText(this.dropDownDeliveryState, pickUpDelivery.deliveryState);
            actionLib.setText(this.dropDownDeliveryCountry, pickUpDelivery.deliveryCountry);
        }
            
    
        //Add Direct PickUp and Delivery Quotation Section
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
        //rate Request Section
        this.addEnquiryRateRequest = function (rateRequest) {
            actionLib.setText(this.dropDownVendor, globalData.globalData.importCustomerName);
            actionLib.setText(this.textBoxContactPerson, rateRequest.contactPerson);
            actionLib.setText(this.textBoxEmail, rateRequest.Email);
            this.fillRateRequestFinal(rateRequest.Final);
            actionLib.click(this.iconShowCharge);
            actionLib.setText(this.dropDownChargeCode, rateRequest.chargeCode);
            actionLib.setText(this.dropDownUnitCode, rateRequest.unitCode);
            actionLib.setText(this.dropDownCurrency, rateRequest.currency);
            actionLib.setText(this.textBoxBuyRate, rateRequest.buyRate);
            actionLib.setText(this.textBoxMinAmt, rateRequest.minAmt);
            this.fillFromSlab(rateRequest.fromSlab);
            this.fillSoc(rateRequest.Soc);
        }
   
};

module.exports = new pageAddEnquiry();