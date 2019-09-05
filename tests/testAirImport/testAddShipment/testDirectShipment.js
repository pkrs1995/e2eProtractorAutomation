var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var addQuotationPage = require('../../../pages/pageAirImport/pageQuotation/pageAddQuotation.js');
var addShipment = require('../../../pages/pageAirImport/pageShipment/pageAddShipment.js');
var shipmentPage = require('../../../pages/pageAirImport/pageShipment/pageShipment.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirImport/dataEnquiry/dataEnquiry.json');
var quotationData = require('../../../testdata/dataAirImport/dataQuotation/dataQuotation.json');
var addShipmentDetails = require('../../../testdata/dataAirImport/dataShipment/dataShipment.json');
var directShipmentData = require("../../../testdata/dataAirImport/dataShipment/dataDirectShipment.json");

describe('test Import add shipment functionality of newage', function() {
    var dataEnquiry,dataQuotation,dataShipment, dataDirectShipment;
    var strTodayTime = actionLib.getTodayDate();
    
    beforeAll(function() {
        var testSpecName = "Import TestAddShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry   = enquiryData.addEnquiry[0];
        dataQuotation = quotationData.addQuotation[0];
        dataShipment  = addShipmentDetails.addShipment[0];
        dataDirectShipment = directShipmentData.addDirectShipment[0];

    });
    
    it('testaddDirectShipment 1 : user able to naviagte to shipment screen then verify the service fields', function()  {

            actionLib.click(addShipment.btnDirectShipment);
            addShipment.fillService(dataDirectShipment.service);
            // addShipment.verifyLabelText("Airport of Loading");
    });

    it('testaddDirectShipment 2 : able to get  shipment under booked tab once create a shipment', function() {
        
           addShipment.createDirectShipment(dataDirectShipment.serviceandRouting);
         
    });

    it('testaddDirectShipment 3 : shipment able to convert the booked to received status once fill the events tab ', function() {
           efsLib.fillTextInTableColumn(dataDirectShipment.shipmentScreenXpathTag, 2, 4, globalData.globalData.shipmentId);
           efsLib.clickRowInAirExportTable(globalData.globalData.shipmentId, globalData.globalData.shipmentId);   
           addShipment.clickOnButton("edit");
           actionLib.click(addShipment.eventsButton);
           efsLib.selectNormalDropdown(addShipment.eventsName,"Cargo Received");
           actionLib.setText(addShipment.eventsDate,strTodayTime);
           addShipment.clickOnButton("save");
           addShipment.addShipmentRoutingCarrierInfo(dataShipment.shipmentServiceRouting);
           addShipment.clickOnButton("update");
           actionLib.setText(addShipment.textAreaCommodityDescription,"Herbal Products");
           addShipment.clickOnButton("update");
           addShipment.clickOnButton("popup");
           addShipment.clickOnButton("cancel");
           actionLib.click(shipmentPage.linkReceivedShipment);
           shipmentPage.openShipmentById();
    });

    
    it('testaddDirectShipment 4 : user able to navigate to Master shipment screen ', function() {
        actionLib.click(addShipment.attachToMaster);
        addShipment.verifyLabelText("Add Master Shipment");
        efsLib.selectNormalDropdown(addShipment.agentParty,"AddCustomer114549");
        actionLib.click(addShipment.documentConsole);
        actionLib.selectAddNewDropdownByKeyboard(addShipment.shipperdropdown,"AddCustomer114549");
        actionLib.selectAddNewDropdownByKeyboard(addShipment.consigneedropdown,"AddCustomer114549");
        actionLib.setText(addShipment.volumeWeightKG,"321");
        addShipment.clickOnButton("save");
        addShipment.getShipmentId(addShipment.QuotationId,"2");
        addShipment.clickOnButton("popup");
        addShipment.clickOnButton("cancel");
        efsLib.fillTextInTableColumn();  
    });


    afterAll(function() {   
        console.log('Logout action called.....');
        loginPage.appLogout();
        console.log('Logout action finished.....');
    });
});