var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var pageShipment = require('../../../pages/pageAirExport/pageShipment/pageShipment.js');
var pickUpPage = require('../../../pages/pageAirExport/pagePickUp/pagePickUp.js');
var deliveryToCfsPage = require('../../../pages/pageAirExport/pageDeliveryToCfs/pageDeliveryToCfs.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var shipmentData = require('../../../testdata/dataAirExport/dataShipment/dataShipment.json');
var pickUpData = require('../../../testdata/dataAirExport/dataPickUp/dataPickUp.json');
var deliveryToCfsData = require('../../../testdata/dataAirExport/dataDeliveryToCfs/dataDeliveryToCfs.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');

describe('test export add delivery to cfs functionality of newage', function() {
    var strExpectedDeliveryDate;
    var strDeliveryDate;
    var strExpectedDoorDeliveryDate;
    var strDoorDeliveryDate;
    var deliveryToCfsVariables;
    var dataDeliveryCFS,dataEnquiry;
    


    beforeAll(function(){
	    var testSpecName = "TestAddDeliveryToCfs";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataDeliveryCFS = deliveryToCfsData.addDeliveryToCFS[0];
        dataEnquiry = enquiryData.addEnquiry[0];
    });
    
        it('test_addexportdeliverytocfs_1 : should be able to navigate to add delivery to cfs page', function() {

            deliveryToCfsPage.addDeliveryToCfsPoint(dataDeliveryCFS.CFSDetails);
            actionLib.verifyElementPresent(deliveryToCfsPage.menuTasks);
            actionLib.click(deliveryToCfsPage.menuTasks);
            actionLib.verifyElementPresent(deliveryToCfsPage.subMenuMyTasks);
            actionLib.click(deliveryToCfsPage.subMenuMyTasks);
        });

        it('test_addexportdeliverytocfs_2 : should be able to navigate to add delivery to cfs page', function() {
            
            actionLib.verifyElementPresent(deliveryToCfsPage.linkDeliveryToCfs);
            actionLib.click(deliveryToCfsPage.linkDeliveryToCfs);
            efsLib.fillTextInTableColumn(dataDeliveryCFS.deliveryToCfsTableDataXpathTag, 2, 2, 
                                            globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
        });
        
        it('test_addexportdeliverytocfs_3 : should be able to add delivery to cfs data', function() {

            strExpectedDeliveryDate = actionLib.getTodayDate();
            strDeliveryDate = actionLib.getTodayDate();
            deliveryToCfsVariables = {
                "deliveryPoint":"addDeliveryPoint",
                "expectedDeliveryDate":strExpectedDeliveryDate,
                "deliveryDate":strDeliveryDate
            }
            actionLib.verifyElementPresent(deliveryToCfsPage.btnEdit);
            actionLib.click(deliveryToCfsPage.btnEdit);
            actionLib.verifyElementPresent(pickUpPage.subMenuPickUpDelivery);
            actionLib.click(pickUpPage.subMenuPickUpDelivery);
            
            actionLib.click(deliveryToCfsPage.expandDeliveryToCfs);
            deliveryToCfsPage.addDeliveryToCfs(dataDeliveryCFS.deliveryToCFS, deliveryToCfsVariables);
            actionLib.click(deliveryToCfsPage.expandDeliveryToCfs);
        });

        it('test_addexportdeliverytocfs_4 : should be able to save delivery to cfs successfully', function() {

            actionLib.verifyElementPresent(deliveryToCfsPage.btnUpdate);
            actionLib.click(deliveryToCfsPage.btnUpdate);
            actionLib.verifyElementPresent(deliveryToCfsPage.btnPopUpOk);
            actionLib.click(deliveryToCfsPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.click(deliveryToCfsPage.linkDeliveryToCfs);
            efsLib.fillTextInTableColumn(dataDeliveryCFS.deliveryToCfsTableDataXpathTag, 2, 2, 
                                            globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataDeliveryCFS.deliveryToCfsTableDataXpathTag, 1, 2, 
                                                    globalData.globalData.customerName);
        });
	
    afterAll(function(){
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});

