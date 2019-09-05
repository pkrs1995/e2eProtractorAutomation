var loginPage = require('../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../pages/pageAirImport/pageEnquiry/pageAddEnquiry.js');
var loginData = require('../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var enquiryData = require('../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var hamberger = require('../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../pages/pageNavigation/topBar.js');
var customerCommonElementPage = require('../../pages/pageAddCustomer/pageAddCustomer.js');
var addCustomerData = require('../../testdata/masters/eCRM/customer/customer.json');
var addQuotationPage = require('../../pages/pageAirImport/pageQuotation/pageAddQuotation.js');
var quotationData = require('../../testdata/dataAirImport/dataQuotation/dataQuotation.json');
var addShipmentDetails = require('../../testdata/dataAirImport/dataShipment/dataShipment.json');
var addShipment = require('../../pages/pageAirImport/pageShipment/pageAddShipment.js');

describe('test import add enquiry functionality of newage', function() {
        var dataEnquiry;
        var dataAddCutomer;
        var  dataQuotation;
        var dataShipment;
        var strEnquiryReceived= actionLib.getTodayDate();
        var  strQuoteByDate=actionLib.getTodayDate();

    beforeAll(function() {
        
            var testSpecName = "Import TestAddEnquiry";
            efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
            dataEnquiry=enquiryData.addEnquiry[0];
            dataAddCutomer = addCustomerData.addCustomer[0];
            dataQuotation = quotationData.addQuotation[0];
            dataShipment  = addShipmentDetails.addShipment[0];

        });
  
        // it('testaddworkFlow1 : user can able create from enquiry to shipment through customer icon', function() {
            
        //     hamberger.navigateToPage("Sales","Enquiry");
        //     enquiryPage.customericon();
        //     enquiryPage.addEnquiryCustomerIcon(dataEnquiry.addNewCustomerDetails); 
        //     actionLib.click(enquiryPage.btnCreateQuotation);
        //     var errorCustomerMessage = actionLib.getTextByLocator(enquiryPage.errorMessageCustomerIcon);
        //     expect(errorCustomerMessage).toEqual("This enquiry is not created with the customer, create a customer before creating quotation");
        //     enquiryPage.convertToCustomer();
        // });
            

        it('testaddworkFlow1 : user can able create from enquiry to shipment through addNew Customer', function() {
            
            hamberger.navigateToPage("CRM" , "Shipment");
            hamberger.navigateToPage("Sales","Enquiry");
            enquiryPage.addNewCustomer();
            customerCommonElementPage.addImportCustomer(dataAddCutomer.customer);
            customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
            actionLib.click(customerCommonElementPage.btnSave);
            actionLib.click(customerCommonElementPage.btnPopUpOk);
            enquiryPage.addEnquiry(dataEnquiry.enquiry);
            actionLib.click(enquiryPage.expandDimensionsSection);
            enquiryPage.addEnquiryDimensions(dataEnquiry.dimensions)
            actionLib.verifyElementPresent(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnSave);
            actionLib.click(enquiryPage.btnPopUpOk);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryScreenTableXpathTag, 2, 2,globalData.globalData.importCustomerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.importCustomerName,globalData.globalData.importCustomerName);
            actionLib.click(enquiryPage.btnCreateQuotation);
            addQuotationPage.fillShipper(globalData.globalData.existingCustomerName);
            addQuotationPage.fillSalesman();
            actionLib.click(addQuotationPage.expandCarrierCharge);
            addQuotationPage.addQuotationCarrierCharge(dataQuotation.carrierCharge);
            actionLib.click(addQuotationPage.btnSave);
            actionLib.click(addQuotationPage.btnPopUpOk);
            actionLib.click(enquiryPage.linknavigation);
            actionLib.click(enquiryPage.linknavigation);
            actionLib.click(addQuotationPage.btnApprove);
            actionLib.click(addQuotationPage.btnApproveYes);
            actionLib.verifyElementPresent(addQuotationPage.imageApprovedQuotation);
            actionLib.click(addShipment.btnCreateShipment);
            actionLib.setText(addShipment.textAirportOfDischarge,"Bangalore"); 
            actionLib.setText(addShipment.shipmentDate, actionLib.getTodayDate());    
            addShipment.addShipmentConnections(dataShipment.shipmentConnection);
            actionLib.click(addShipment.subMenuHawb);
            addShipment.selectDropDownActiveElement(addShipment.dropDownShipper, globalData.globalData.customerName);
            actionLib.click(addShipment.btnSave);
            actionLib.click(addShipment.btnPopUpOk);
            actionLib.click(addShipment.attachToMaster);
            addShipment.addShipmentRoutingCarrierInfo(dataShipment.shipmentServiceRouting)
            actionLib.click(addShipment.btnSave);
            actionLib.click(addShipment.btnPopUpOk);
        });

        afterAll(function(){
            console.log('Logout action called.....');   
            // loginPage.appLogout();
            topBar.appLogout();
            console.log('Logout action finished.....');
        });
        
    });