/* 
Description : This file testcases for Demo Feedback Point BRD document
*/

var loginPage = require('../../pages/pageLogin/pageLogin.js');
var demoFeedbackPointsPage = require('../../pages/pageDemoFeedbackPoints/pageDemoFeedbackPoints.js');
var loginData = require('../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var demoFeedbackPointsData = require('../../testdata/dataDemoFeedbackPoints/dataDemoFeedbackPoints.json');
var hamberger = require('../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../pages/pageNavigation/topBar.js');
var customerCommonElementPage = require('../../pages/pageAddCustomer/pageAddCustomer.js');
var addCustomerData = require('../../testdata/masters/eCRM/customer/customer.json');

describe('test provided demo feedback points BRD document of newage', function () {
    var reqElement;
    var labelsArray;
    var exportAgentName;
    var importAgentName;
    var dataAddCutomer;
    var dataDemoFeedback;
   
    var customerDetails = {
        "agentName":"agentName",
        "country":"India",
        "type":"Primary",
        "address1":"Address 1",
        "address2":"Address 2",
        "city":"Delhi",
        "state":"Delhi",
        "zipCode":"111222",
        "disableCustomerType":"CS",
        "customerType":"AG",
        "iataCode":"1234"
    }

    beforeAll(function () {
        var testSpecName = "TestDemoFeedbackPoints";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataAddCutomer = addCustomerData.addCustomer[0];
        dataDemoFeedback = demoFeedbackPointsData.demoFeedbackPoints[0];
        globalData.globalData.agentName=customerCommonElementPage.commonCustomer;
       
    });

    // it('test_demofeedbackpointsbrd_point1_&_point2 : should be able to verify labels on add pricing air page', function() {
      
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.menuCrm);
    //     actionLib.click(demoFeedbackPointsPage.menuCrm);
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.subMenuPricingAir);
    //     actionLib.click(demoFeedbackPointsPage.subMenuPricingAir);
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.btnAddPricingAir);
    //     actionLib.click(demoFeedbackPointsPage.btnAddPricingAir);

    //     labelsArray = ["Validity", "MSR", "SSR", "Cost"];
    //     demoFeedbackPointsPage.verifyAirPricingLabels("addGeneralOriginCharge()", labelsArray);

    //     labelsArray = ["Validity", "MSR", "SSR", "Cost"];
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.tabDestinationCharges);
    //     actionLib.click(demoFeedbackPointsPage.tabDestinationCharges);
    //     demoFeedbackPointsPage.verifyAirPricingLabels("addGeneralDestinationCharge()", labelsArray);

    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.tabFreightCharges);
    //     actionLib.click(demoFeedbackPointsPage.tabFreightCharges);
    //     labelsArray = ["Validity", "SSR"];
    //     demoFeedbackPointsPage.verifyAirPricingLabels("addGeneralFreightCharge()", labelsArray);
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.btnFrightChargeMoreInfo);
    //     actionLib.click(demoFeedbackPointsPage.btnFrightChargeMoreInfo);
    //     labelsArray = ["SSR", "MSR", "Cost"];
    //     demoFeedbackPointsPage.verifyFreightChargeMoreInfoLabels(labelsArray);
    //     actionLib.verifyElementPresent(demoFeedbackPointsPage.btnMoreInfoCancel);
    //     actionLib.click(demoFeedbackPointsPage.btnMoreInfoCancel);
    // });

    it('test_demofeedbackpointsbrd_point3_1 : should be able to verify that ssr is greater or equal to msr and cost on origin charge tab', function() {

        hamberger.navigateToPage("CRM", "Pricing Air");
        demoFeedbackPointsPage.addPricingAirOriginCharges(dataDemoFeedback.originCharges);
    });

    it('test_demofeedbackpointsbrd_point3_2 : should be able to verify that ssr is greater or equal to msr and cost on destination charge tab', function() {
        demoFeedbackPointsPage.addPricingAirDestinationCharges(dataDemoFeedback.destinationCharges);
       
    });

    it('test_demofeedbackpointsbrd_point4a : currency against charge should display as per origin on Origin charges tab', function() {

        demoFeedbackPointsPage.currencyAgainstChargeShouldDisplayasPerOrigin(dataDemoFeedback.originCharges);
    });

    it('test_demofeedbackpointsbrd_point4b : currency against charge should display as per destination on destination charges tab', function() {

        demoFeedbackPointsPage.currencyAgainstChargeShouldDisplayasPerDestination(dataDemoFeedback.destinationCharges);
    });

    it('test_demofeedbackpointsbrd_point4c : currency against charge should display as per origin/destination on freight charges tab', function() {

        demoFeedbackPointsPage.currencyAgainstChargeShouldDisplayasPerOriginOrDestination(dataDemoFeedback.destinationCharges);
    });

    it('test_demofeedbackpointsbrd_point19_1 : verify that count of records display in all the tabs on enquiry page', function() {

        hamberger.navigateToPage("Sales", "Enquiry");
        demoFeedbackPointsPage.verifyCountinEnquiryPage();
    });

    it('test_demofeedbackpointsbrd_point19_2 : verify that count of records display in all the tabs on quotation page', function() {
        
        hamberger.navigateToPage("CRM", "Shipment");
        hamberger.navigateToPage("Sales", "Quotation");
        demoFeedbackPointsPage.verifyCountinQuotationPage();   
    });

    it('test_demofeedbackpointsbrd_point19_3 : verify that count of records display in all the tabs on shipment page', function () {

        hamberger.navigateToPage("CRM", "Shipment");
        demoFeedbackPointsPage.verifyCountinShipmentPage();
    });

    it('test_demofeedbackpointsbrd_point19_4 : verify that count of records display in all the tabs on console page', function () {

        hamberger.navigateToPage("Air", "Master Shipment");
        demoFeedbackPointsPage.verifyCountinConsolePage();
    });
  
    it('test_demofeedbackpointsbrd_point8 : verify that vendor in rate request display as per export destination', function () {
        
        hamberger.navigateToPage("Masters", "eCRM", "Customer");
        actionLib.click(customerCommonElementPage.btnAddCustomer);
        customerCommonElementPage.addExportCustomer(dataAddCutomer.customer);
        customerCommonElementPage.addCustomerAddress(dataAddCutomer.address);
        actionLib.scrollToElement(customerCommonElementPage.dropDownName);
        actionLib.verifyElementPresent(customerCommonElementPage.tabMoreInfo);
        actionLib.click(customerCommonElementPage.tabMoreInfo);
        actionLib.verifyElementPresent(customerCommonElementPage.textCustomerType);
        customerCommonElementPage.fillCustomerType(dataAddCutomer.moreInfo.disableCustomerType);
        customerCommonElementPage.fillCustomerType(dataAddCutomer.moreInfo.agentCustomerType);
        customerCommonElementPage.addCustomerMoreInfo(dataAddCutomer.moreInfo);
        actionLib.verifyElementPresent(customerCommonElementPage.btnSave);
        actionLib.click(customerCommonElementPage.btnSave);
        actionLib.verifyElementPresent(customerCommonElementPage.btnPopUpOk);
        actionLib.click(customerCommonElementPage.btnPopUpOk);
        hamberger.navigateToPage("Setup", "App Configuration");
        actionLib.verifyElementPresent(demoFeedbackPointsPage.linkAgentPort);
        actionLib.click(demoFeedbackPointsPage.linkAgentPort);
        demoFeedbackPointsPage.addAgentPort(dataDemoFeedback.agentPortDetails);

    });

    
    afterAll(function () {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});