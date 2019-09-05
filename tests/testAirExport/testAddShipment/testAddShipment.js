var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var quotationPage = require('../../../pages/pageAirExport/pageQuotation/pageQuotation.js');
var pageShipment = require('../../../pages/pageAirExport/pageShipment/pageShipment.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirExport/dataQuotation/dataQuotation.json');
var shipmentData = require('../../../testdata/dataAirExport/dataShipment/dataShipment.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');


describe('test export add shipment functionality of newage', function() {
    var strConnectionsEta,strConnectionsEtd;
    var dataEnquiry,dataQuotation,dataShipment;

    beforeAll(function() {
        var testSpecName = "TestAddShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
        dataQuotation =quotationData.addQuotation[0];
        dataShipment = shipmentData.addShipment[0];
    });

        it('test_addexportshipment_1 : should be able to navigate to add shipment page', function() {

            actionLib.verifyElementPresent(pageShipment.linkShipment);
            //----second attribute value none - get the quotation count on the my task page        
            actionLib.verifySplitCountOfLocator(pageShipment.linkShipment, "none");
            actionLib.verifyElementPresent(quotationPage.linkQuotation);
            actionLib.click(quotationPage.linkQuotation);
            efsLib.fillTextInTableColumn(dataQuotation.quotationTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(pageShipment.btnCreateShipment);
        });

        it('test_addexportshipment_2 : should be able to add data on shipment service routing tab', function() {

            actionLib.click(pageShipment.btnCreateShipment);
            actionLib.verifyElementPresent(pageShipment.uiSwitchDirect);
            pageShipment.addShipmentServiceRouting();
        });

        it('test_addexportshipment_3 : should be able to add data on shipment routing carrier info section', function() {

            if (element(pageShipment.textBoxFlightNo).isDisplayed() == false) {
                actionLib.click(pageShipment.expandRoutingCarrierInfo);
            }
            pageShipment.addShipmentRoutingCarrierInfo(dataShipment.shipmentServiceRouting);
        });

        it('test_addexportshipment_4 : should be able to add data on shipment connections section', function() {

            if (element(pageShipment.dropDownMove).isDisplayed() == false) {
                actionLib.click(pageShipment.expandConnections);
            }
            pageShipment.addShipmentConnections(dataShipment.shipmentConnection);
        });

        it('test_addexportshipment_5 : should be able to add data on shipment cargo details tab', function() {
            actionLib.click(pageShipment.subMenuCargoDetails);
            actionLib.verifyElementPresent(pageShipment.uiSwitchHaz);
            pageShipment.addShipmentCargoDetails(dataShipment.shipmentCargoDetails);
        });

        it('test_addexportshipment_6 : should be able to add data on shipment hawb tab', function() {
            actionLib.click(pageShipment.subMenuHawb);
            actionLib.verifyElementPresent(pageShipment.dropDownConsignee);
            pageShipment.addShipmentHawb(dataShipment.shipmentHawb);
        });

        it('test_addexportshipment_7 : should be able to save shipment successfully', function() {

            actionLib.verifyElementPresent(pageShipment.btnSave);
            actionLib.click(pageShipment.btnSave);
            actionLib.verifyElementPresent(pageShipment.btnPopUpOk);
            actionLib.click(pageShipment.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.verifyElementPresent(pageShipment.linkShipment);
            //--second attribute value other than none - get the shipment count on the my task page
            // and verify it is 1 more than the previous shipment count.
            actionLib.verifySplitCountOfLocator(pageShipment.linkShipment, "Yes");
            actionLib.click(pageShipment.linkShipment);
            efsLib.fillTextInTableColumn(dataShipment.shipmentTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentTableDataXpathTag, 1, 2, globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentTableDataXpathTag, 1, 6, dataEnquiry.enquiry.origin);
            efsLib.verifySearchTextInTableRowCol(dataShipment.shipmentTableDataXpathTag, 1, 7, dataEnquiry.enquiry.destination);
        });

        it('test_addexportshipment_8 : should be able to update and save shipment successfully', function() {

            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(pageShipment.btnEdit);
            actionLib.click(pageShipment.btnEdit);
            actionLib.setText(pageShipment.dropDownCommodityGrp,dataShipment.shipmentConnection.updatedCommodityGrp);
            actionLib.click(pageShipment.subMenuCargoDetails);
            actionLib.click(pageShipment.subMenuHawb);
            actionLib.scrollToElement(pageShipment.textAreaHandlingInfo);
            actionLib.setText(pageShipment.textAreaHandlingInfo, dataShipment.shipmentHawb.updatedHandlingInfo);
            actionLib.verifyElementPresent(pageShipment.btnUpdate);
            actionLib.click(pageShipment.btnUpdate);
            actionLib.verifyElementPresent(pageShipment.btnPopUpOk);
            actionLib.click(pageShipment.btnPopUpOk);
            reqElement = actionLib.getAttributeValue(pageShipment.dropDownCommodityGrp,'value');
            expect(reqElement).toEqual(dataShipment.shipmentConnection.updatedCommodityGrp);
            actionLib.click(pageShipment.subMenuHawb);
            actionLib.scrollToElement(pageShipment.textAreaHandlingInfo);
            reqElement = actionLib.getAttributeValue(pageShipment.textAreaHandlingInfo,'value');
            expect(reqElement).toEqual(dataShipment.shipmentHawb.updatedHandlingInfo);
        });

    afterAll(function() {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});