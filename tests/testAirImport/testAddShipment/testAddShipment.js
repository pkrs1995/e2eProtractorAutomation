var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var addQuotationPage = require('../../../pages/pageAirImport/pageQuotation/pageAddQuotation.js');
var addShipment = require('../../../pages/pageAirImport/pageShipment/pageAddShipment.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirImport/dataQuotation/dataQuotation.json');
var addShipmentDetails = require('../../../testdata/dataAirImport/dataShipment/dataShipment.json');
//var shipment = require('../../../testdata/crm/shipment/shipment.json');


describe('test Import add shipment functionality of newage', function() {
    var dataEnquiry,dataQuotation,dataShipment;
    
    beforeAll(function() {
        var testSpecName = "Import TestAddShipment";
        
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry   = enquiryData.addEnquiry[0];
        dataQuotation = quotationData.addQuotation[0];
        dataShipment  = addShipmentDetails.addShipment[0];

    });

        it('test_addimportshipment_1 : should be able to navigate to add shipment page', function() 
        {
            actionLib.verifyElementPresent(addShipment.linkShipment);
            //----second attribute value none - get the quotation count on the my task page        
            actionLib.verifySplitCountOfLocator(addShipment.linkShipment, "none");
            actionLib.verifyElementPresent(addQuotationPage.linkQuotation);
            actionLib.click(addQuotationPage.linkQuotation);
            efsLib.fillTextInTableColumn(dataQuotation.quotationTableDataXpathTag, 2, 2, globalData.globalData.importCustomerName); 
            efsLib.clickRowInAirExportTable(globalData.globalData.importCustomerName, dataEnquiry.enquiry.origin);  
            actionLib.verifyElementPresent(addShipment.btnCreateShipment);
        });
        
        it('test_addimportshipment_2 : should be able to add data on shipment service routing tab', function() {

            actionLib.click(addShipment.btnCreateShipment);
            actionLib.verifyElementPresent(addShipment.uiSwitchDirect);
            addShipment.addShipmentServiceRouting();
        });

        it('test_addimportshipment_3 : should be able to add data on shipment routing carrier info section', function() {

            if (element(addShipment.textBoxFlightNo).isDisplayed() == false) {
                actionLib.click(addShipment.expandRoutingCarrierInfo);
                }
            addShipment.addShipmentRoutingCarrierInfo(dataShipment.shipmentServiceRouting); //addShipmentDetails.shipmentServiceRouting
        });

        it('test_addimportshipment_4 : should be able to add data on shipment connections section', function() {

            if (element(addShipment.dropDownMove).isDisplayed() == false) {
                actionLib.click(addShipment.expandConnections);
            }
            addShipment.addShipmentConnections(dataShipment.shipmentConnection);

        });

        it('test_addimportshipment_5 : should be able to add data on shipment cargo details tab', function() {

            actionLib.click(addShipment.subMenuCargoDetails);
            actionLib.verifyElementPresent(addShipment.uiSwitchHaz);
            addShipment.addShipmentCargoDetails(dataShipment.shipmentCargoDetails);
        });
    
        it('test_addimportshipment_6 : should be able to add data on shipment hawb tab', function() {

            actionLib.click(addShipment.subMenuHawb);
            actionLib.verifyElementPresent(addShipment.dropDownShipper);
            addShipment.addShipmentHawb(dataShipment.shipmentHawb);
        });

        // it('test_addimportshipment_7 : should be able to save shipment successfully', function() {

        //     actionLib.verifyElementPresent(addShipment.btnSave);
        //     actionLib.click(addShipment.btnSave);
        //     actionLib.verifyElementPresent(addShipment.btnPopUpOk);
        //     actionLib.click(addShipment.btnPopUpOk);
        //     actionLib.click(actionLib.menuTasks);
        //     actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
        //     actionLib.click(actionLib.subMenuMyTasks);
        //     //actionLib.navigateToPage("Tasks","My Tasks");
        //     actionLib.verifyElementPresent(addShipment.linkShipment);
        //     //--second attribute value other than none - get the shipment count on the my task page
        //     // and verify it is 1 more than the previous shipment count.
        //     actionLib.verifySplitCountOfLocator(addShipment.linkShipment, "Yes");
        //     actionLib.click(addShipment.linkShipment);
        //     efsLib.fillTextInTableColumn(dataShipment.shipmentHawb.shipmentTableDataXpathTag, 2, 2, globalData.globalData.importCustomerName);
        //     efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentHawb.shipmentTableDataXpathTag, 1, 2, globalData.globalData.importCustomerName);
        //     efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentHawb.shipmentTableDataXpathTag, 1, 6, dataEnquiry.enquiry.origin);
        //     efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentHawb.shipmentTableDataXpathTag, 1, 7, dataEnquiry.enquiry.destination);

        // });

    afterAll(function() {   
        console.log('Logout action called.....');
        loginPage.appLogout();
        console.log('Logout action finished.....');
    });

 });

