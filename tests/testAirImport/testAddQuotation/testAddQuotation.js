var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var enquiryPage = require('../../../pages/pageAirImport/pageEnquiry/pageAddEnquiry.js');
var addQuotationPage = require('../../../pages/pageAirImport/pageQuotation/pageAddQuotation.js');
var quotationPage = require('../../../pages/pageAirImport/pageQuotation/pageQuotation.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirImport/dataQuotation/dataQuotation.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');
var hamberger = require('../../../pages/pageNavigation/hamburgerMenu.js');

describe('test import add quotation functionality of newage', function() {
    var dataEnquiry;
    var dataQuotation;
    var dataQuotation1;
    var strEnquiryReceived;
    var strQuoteByDate;
    var dataAddenquiry;
    var attachmentUpload = "../../testdata/dataFiles/agentTemplate.xlsx";
    var beforeCount,afterCount;

    beforeAll(function(){
        var testSpecName = "Import TestAddQuotation";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
        dataQuotation = quotationData.addQuotation[0];
        dataQuotation1 = quotationData.addQuotation;
      
    });
	
        it('test_addimportquotation_1 : should be able to navigate to add quotation page', function() {
            
            actionLib.verifyElementPresent(addQuotationPage.linkQuotation);
            //----second attribute value none - get the quotation count on the my task page        
            actionLib.verifySplitCountOfLocator(addQuotationPage.linkQuotation, "none");        
            actionLib.verifyElementPresent(enquiryPage.linkEnquiry);
            actionLib.click(enquiryPage.linkEnquiry);
            efsLib.fillTextInTableColumn(dataEnquiry.enquiry.enquiryTableDataXpathTag, 2, 2, globalData.globalData.importCustomerName);
            expect(element(by.xpath("//input[@data-id='getEnquiryHeadArray_Import_customerName']")).getAttribute('data-id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('data-id'));
            efsLib.clickRowInAirExportTable(globalData.globalData.importCustomerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(addQuotationPage.btnCreateQuotation);
        });
        
        it('test_addimportquotation_2 : should be able to add data on quotation page', function() {

            actionLib.click(addQuotationPage.btnCreateQuotation);
            actionLib.verifyElementPresent(addQuotationPage.dropDownCustomer);
            addQuotationPage.addQuotation(dataQuotation.Quotation);
            actionLib.click(addQuotationPage.btnSubmit);
        });

        it('test_addimportquotation_3 : should be able to add data on quotation charge carrier section', function() {
        
            actionLib.click(addQuotationPage.expandCarrierCharge);
            actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
            addQuotationPage.addQuotationCarrierCharge(dataQuotation.carrierCharge);
            actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
            actionLib.click(addQuotationPage.expandCarrierCharge);
        });
        
        it('test_addimportquotation_4 : should be able to add data on quotation air notes section', function() {
        
            actionLib.verifyElementPresent(addQuotationPage.expandAirNotes);
            actionLib.click(addQuotationPage.expandAirNotes);
            actionLib.verifyElementPresent(addQuotationPage.textAreaNotes);
            addQuotationPage.addQuotationAirNotes(dataQuotation.Notes);
            actionLib.click(addQuotationPage.expandAirNotes);
        });

        
        it('test_addimportquotation_7 : should be able to save quotation successfully', function() {
            
            actionLib.verifyElementPresent(addQuotationPage.btnSave);
            actionLib.click(addQuotationPage.btnSave);
            addQuotationPage.getQuotationNumber(addQuotationPage.QuotationId, "2");
            actionLib.verifyElementPresent(addQuotationPage.btnPopUpOk);
            actionLib.click(addQuotationPage.btnPopUpOk);
            hamberger.navigateToPage("Tasks", "My Tasks");
            actionLib.verifyElementPresent(addQuotationPage.linkQuotation);
            //--second attribute value other than none - get the quotation count on the my task page
            // and verify it is 1 more than the previous shipment count.
            actionLib.verifySplitCountOfLocator(addQuotationPage.linkQuotation, "Yes");
            actionLib.click(addQuotationPage.linkQuotation);
            efsLib.fillTextInTableColumn(dataQuotation.quotationTableDataXpathTag, 2, 2, globalData.globalData.importCustomerName);
            efsLib.verifySearchTextInTableRowCol(dataQuotation.quotationTableDataXpathTag, 1, 2, globalData.globalData.importCustomerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.importCustomerName, dataEnquiry.enquiry.origin);
        });

        // it('test_addimportquotation_8 : should be able to approve quotation', function() {
            
        //     hamberger.navigateToPage("Sales", "Quotation");
        //     actionLib.explicitWait(5000);   
        //     efsLib.verifyTabCount(quotationPage.linkWaitingForManagerApproval,quotationPage.linkReadyForShipment, 'before');
        //     quotationPage.clickQuotationId();
        //     addQuotationPage.approveQuotation();
        //     efsLib.verifyTabCount(quotationPage.linkWaitingForManagerApproval,quotationPage.linkReadyForShipment, 'after');
        //     quotationPage.verifyTabNameWithQuotationId(quotationPage.linkReadyForShipment);
        // });
      
        it('eFSV2-683 From Test Link : Verify user Should able to Copy Quote from existing quotation', function() {
            
            hamberger.navigateToPage("Sales", "Quotation");
            addQuotationPage.copyQuotation();
        });

        it('eFSV2-684 From Test Link : Verify user Should not able to Copy Quote With Existing Customer, Valid from & Expires on', function() {

            hamberger.navigateToPage("Sales", "Quotation");
            addQuotationPage.copyQuotationWithDuplicate();
        });

        // it('eFSV2-685 From Test Link : Verify user Should not able to Add Quotation With existing quotation Data', function() {

        //     hamberger.navigateToPage("Sales", "Quotation");
        //     addQuotationPage.duplicateQuotation(dataQuotation.Quotation);
        //     actionLib.click(addQuotationPage.expandCarrierCharge);
        //     actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
        //     addQuotationPage.addQuotationCarrierCharge(dataQuotation.carrierCharge);
        //     actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
        //     actionLib.click(addQuotationPage.expandCarrierCharge);
        //     actionLib.verifyElementPresent(addQuotationPage.btnSave);
        //     actionLib.click(addQuotationPage.btnSave);
        //     var duplicateQuotationErrorMessage = actionLib.getTextByLocator(addQuotationPage.copyDuplicationErrorMessage);
        //     expect(duplicateQuotationErrorMessage).toContain("Duplication of Quotation with similar party, valid from date, expires on date and port pair has happened.");

        // });

        it('test_addimportquotation_12 : should not be able to Create duplicate Quotation With Existing data', function(){
            
            hamberger.navigateToPage("Sales", "Quotation");
            actionLib.click(addQuotationPage.btnAddQuotation);
            addQuotationPage.addQuotationWithserviceDetails(dataQuotation.Quotation);
            actionLib.click(addQuotationPage.expandCarrierCharge);
            actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
            addQuotationPage.addQuotationCarrierCharge(dataQuotation.carrierCharge);
            actionLib.verifyElementPresent(addQuotationPage.dropDownCarrier);
            actionLib.click(addQuotationPage.expandCarrierCharge);
            actionLib.verifyElementPresent(addQuotationPage.btnSave);
            actionLib.click(addQuotationPage.btnSave);
            addQuotationPage.getQuotationNumber(addQuotationPage.QuotationId, "2");
            actionLib.verifyElementPresent(addQuotationPage.btnPopUpOk);
            actionLib.click(addQuotationPage.btnPopUpOk);
           
        });

        //Verify tab count before & After lost Quotation
        it('test_addimportquotation_13 : should be able to lost Quotation & Verify tab count before & After lost Quotation in Waiting for manager Approval & Rejected', function(){
            
            hamberger.navigateToPage("Sales", "Quotation");
            actionLib.explicitWait(5000);
            efsLib.verifyTabCount(quotationPage.linkWaitingForManagerApproval,quotationPage.linkRejectedQuotation, 'before');
            quotationPage.clickQuotationId();
            addQuotationPage.lostQuotation();
            efsLib.verifyTabCount(quotationPage.linkWaitingForManagerApproval,quotationPage.linkRejectedQuotation, 'after');
            quotationPage.verifyTabNameWithQuotationId(quotationPage.linkRejectedQuotation);
        });

        // it('test_addimportquotation_14: verify that count of records display in all the tabs on quotation page', function() {
        
        //     hamberger.navigateToPage("Sales", "Quotation");
        //     quotationPage.verifyCountinQuotationPage();   
        // });

        it('eFSV2-681 From Test Link : Verify the over dimension', function() {
            
            hamberger.navigateToPage("Sales", "Quotation");
            actionLib.click(addQuotationPage.btnAddQuotation);
            var count =quotationData.addQuotation.length;
            console.log("count value Dimension"+count)
           for(var i=0; i<=count-1; i++){
                console.log("count value Dimension"+  i  + count)
                addQuotationPage.overDimensions(dataQuotation1[i].overDimensions, i);
           }
           
        });

    afterAll(function(){
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});

