var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var shipmentPage = require('../../../pages/pageAirExport/pageShipment/pageShipment.js');
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



describe('test export add pickup functionality of newage', function() {
    var strPickUpFollowUpDate;
    var strPlannedPickUpDate;
    var strActualPickUpDate;
    var dataEnquiry,dataShipment,dataDeliveryCFS;

    beforeAll(function(){
        var testSpecName = "TestAddPickupToShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataEnquiry=enquiryData.addEnquiry[0];
        dataShipment=shipmentData.addShipment[0];
        dataPickup = pickUpData.addpickUp[0];
        dataDeliveryCFS = deliveryToCfsData.addDeliveryToCFS[0];


    });
	
        it('test_addexportpickup_1 : should be able to navigate to add pickup page', function() {

            //--To verify that pick up count update after adding pick up in shipment except data
            // in calender elements
            actionLib.verifyElementPresent(pickUpPage.linkPickUp);
            //--second attribute value none - get the pick up count on the my task page      
            actionLib.verifySplitCountOfLocator(pickUpPage.linkPickUp, "none");       
            actionLib.verifyElementPresent(shipmentPage.linkShipment);
            actionLib.click(shipmentPage.linkShipment);
            efsLib.fillTextInTableColumn(dataShipment.shipmentTableDataXpathTag, 2, 2, globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable( globalData.globalData.customerName, dataEnquiry.enquiry.origin);

        });

        //--while provide data in calender date elements the count of delivery to cfs increases instead of pickup
        //so won't add that in this test case
        it('test_addexportpickup_2 : should be able to add pickup data except data in calender date elements', function() {

            actionLib.verifyElementPresent(pickUpPage.btnEdit);
            actionLib.click(pickUpPage.btnEdit);
            actionLib.verifyElementPresent(pickUpPage.subMenuPickUpDelivery);
            actionLib.click(pickUpPage.subMenuPickUpDelivery);
            actionLib.click(pickUpPage.expandPickUp);
            actionLib.click(pickUpPage.checkBoxOurPickUp);
            pickUpPage.addPickUp(dataPickup.pickup);
            actionLib.click(pickUpPage.expandPickUp);
        });

        it('test_addexportpickup_3 : should be able to save pick up and verify pick up count increased by 1', function() {

            actionLib.verifyElementPresent(pickUpPage.btnUpdate);
            actionLib.click(pickUpPage.btnUpdate);
            actionLib.verifyElementPresent(pickUpPage.btnPopUpOk);
            actionLib.click(pickUpPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.verifyElementPresent(pickUpPage.linkPickUp);
            //--second attribute value other than none - get the pick up count on the my task page
            // and verify it is 1 more than the previous pick up count.
            actionLib.verifySplitCountOfLocator(pickUpPage.linkPickUp, "Yes");
            //--To verify that delivery to cfs count update after adding data in calender elements on 
            // pick up in shipment page
            //--second attribute value none - get the delivery to cfs count on the my task page      
            actionLib.verifySplitCountOfLocator(deliveryToCfsPage.linkDeliveryToCfs, "none");  
            actionLib.click(pickUpPage.linkPickUp);
            efsLib.fillTextInTableColumn(dataPickup.pickup.pickUpTableDataXpathTag, 2, 2, 
                                            globalData.globalData.customerName);
            efsLib.verifySearchTextInTableRowCol(dataPickup.pickup.pickUpTableDataXpathTag, 1, 2, 
                                                    globalData.globalData.customerName);
        });
        
        it('test_addexportpickup_4 : should be able to add data in calender date elements on pick up section', function() {

            strPickUpFollowUpDate = actionLib.getTodayDate();
            strPlannedPickUpDate = actionLib.getTodayDate();
            strActualPickUpDate = actionLib.getTodayDate();
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
            actionLib.verifyElementPresent(pickUpPage.btnEdit);
            actionLib.click(pickUpPage.btnEdit);
            actionLib.verifyElementPresent(pickUpPage.subMenuPickUpDelivery);
            actionLib.click(pickUpPage.subMenuPickUpDelivery);
            actionLib.click(pickUpPage.expandPickUp);
            var pickUpCalenderVars = {
                "strPickUpFollowUpDate":strPickUpFollowUpDate, 
                "strPlannedPickUpDate":strPlannedPickUpDate,
                "strActualPickUpDate":strActualPickUpDate
            }
            pickUpPage.pickupDate(pickUpCalenderVars)
            actionLib.click(pickUpPage.expandPickUp);

        });

        it('test_addexportpickup_5 : should be able to save pick up and verify deliver to cfs count increased by 1', function() {

            actionLib.verifyElementPresent(pickUpPage.btnUpdate);
            actionLib.click(pickUpPage.btnUpdate);
            actionLib.verifyElementPresent(pickUpPage.btnPopUpOk);
            actionLib.click(pickUpPage.btnPopUpOk);
            actionLib.click(actionLib.menuTasks);
            actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
            actionLib.click(actionLib.subMenuMyTasks);
            actionLib.verifyElementPresent(deliveryToCfsPage.linkDeliveryToCfs);
            //--second attribute value other than none - get the delivery to cfs count on the my task page
            // and verify it is 1 more than the previous delivery to cfs count.
            actionLib.verifySplitCountOfLocator(deliveryToCfsPage.linkDeliveryToCfs, "Yes");
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

