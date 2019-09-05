var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var linkingToMasterPage = require('../../../pages/pageAirExport/pageLinkingToMaster/pageLinkingToMaster.js');
var signOffPage = require('../../../pages/pageAirExport/pageSignOff/pageSignOff.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var linkingToMasterData = require('../../../testdata/dataAirExport/dataLinkingToMaster/dataLinkingToMaster.json');
var signOffData = require('../../../testdata/dataAirExport/dataSignOff/dataSignOff.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');


describe('test export add sign off functionality of newage', function() {
    var strAtaDate;
    var strAtdDate;
    var strPickUpFollowUpDate;
    var strPlannedPickUpDate;
    var strActualPickUpDate;
    var strExpectedDeliveryDate;
    var strDeliveryDate;
    var reqElement;

    beforeAll(function(){
        var testSpecName = "TestShipmentSignOff";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
    });
	
    it('test_addexportsignoff_1 : should be able to navigate to shipment page to attach shipment to master', function() {
        
        actionLib.verifyElementPresent(signOffPage.linkSignOff);
        //----second attribute value none - get the sign off count on the my task page      
        actionLib.verifySplitCountOfLocator(signOffPage.linkSignOff, "none");        

        actionLib.verifyElementPresent(linkingToMasterPage.linkLinkingToMaster);
        actionLib.click(linkingToMasterPage.linkLinkingToMaster);
        efsLib.fillTextInTableColumn(linkingToMasterData.linkingToMasterTableDataXpathTag, 2, 2, 
                                        globalData.customerName);
        efsLib.clickRowInAirExportTable(globalData.customerName, enquiryData.origin);
    });
    
    it('test_addexportsignoff_2 : should be able to add data in Service & Routing under master shipment', function() {

        strAtaDate = actionLib.getTodayDate();
        strAtdDate = actionLib.getTodayDate();
        var serviceRoutingVars = {
            "directUiSwitch":"Yes",
            "iataRate":"100",
            "atdDate":strAtdDate,
            "ataDate":strAtaDate,
            "agent":globalData.customerName
        }

        actionLib.verifyElementPresent(signOffPage.btnAttachToMaster);
        actionLib.click(signOffPage.btnAttachToMaster);
        actionLib.verifyElementPresent(signOffPage.textBoxIataRate);
        signOffPage.addMasterShipmentServiceRouting(serviceRoutingVars);
    });

    // it('test_demofeedbackpointsbrd_point31_1 : verify that validation message displays when port of discharge and destination differs', function () {
        
    //     actionLib.verifyElementPresent(signOffPage.subMenuDocument);
    //     actionLib.click(signOffPage.subMenuDocument);
    //     actionLib.verifyElementPresent(signOffPage.textBoxVolumeWeight);
    //     actionLib.setText(signOffPage.textBoxVolumeWeight, signOffData.volumeWt);
    //     actionLib.click(signOffPage.subMenuServiceRouting);
    //     actionLib.verifyElementPresent(signOffPage.dropDownAirportOfDischarge);
    //     actionLib.setText(signOffPage.dropDownAirportOfDischarge, signOffData.airportOfDischarge);
    //     actionLib.scrollToElement(signOffPage.btnDeleteAddConnection);
    //     actionLib.verifyElementPresent(signOffPage.btnDeleteAddConnection);
    //     actionLib.click(signOffPage.btnDeleteAddConnection);
    //     actionLib.verifyElementPresent(signOffPage.btnSave);
    //     actionLib.click(signOffPage.btnSave);
    //     actionLib.verifyElementText(signOffPage.msgConnectionRequired, "none", "Connection is required");
    //     actionLib.verifyElementPresent(signOffPage.subMenuMawb);
    //     actionLib.click(signOffPage.subMenuMawb);
    //     actionLib.click(signOffPage.subMenuServiceRouting);
    //     actionLib.verifyElementText(signOffPage.msgConnectionRequired, "none", "Please add a connection , as the Airport Of Discharge is differ from Destination");
    //     // actionLib.scrollToElement(signOffPage.btnAddConnection);
    //     // actionLib.verifyElementPresent(signOffPage.btnAddConnection);
    //     // actionLib.click(signOffPage.btnAddConnection);

    //     // actionLib.verifyElementPresent(signOffPage.dropDownAirportOfDischarge);
    //     // actionLib.setText(signOffPage.dropDownAirportOfDischarge, enquiryData.destination);

    //     actionLib.explicitWait(2000);

    // });

    it('test_addexportsignoff_3 : should be able to add data in pick up/delivery under master shipment', function() {

        strPickUpFollowUpDate = actionLib.getTodayDate();
        strPlannedPickUpDate = actionLib.getTodayDate();
        strActualPickUpDate = actionLib.getTodayDate();
        strExpectedDeliveryDate = actionLib.getTodayDate();
        strDeliveryDate = actionLib.getTodayDate();
        var pickUpVars = {
            "proTrackingNo":"12345",
            "pickUpFollowUpDate":strPickUpFollowUpDate,
            "plannedPickUpDate":strActualPickUpDate,
            "actualPickUpDate":strActualPickUpDate
        }
        var deliveryVars = {
            "deliveryPoint":"Yes",
            "expectedDeliveryDate":strExpectedDeliveryDate,
            "deliveryDate":strDeliveryDate
        }

        actionLib.click(signOffPage.subMenuPickUpDelivery);
        actionLib.verifyElementPresent(signOffPage.textBoxProTrackingNo);
        actionLib.click(signOffPage.checkBoxOurPickUp);
        signOffPage.addMasterShipmentPickUp(pickUpVars);
        actionLib.click(signOffPage.expandPickUp);
        signOffPage.addMasterShipmentDelivery(deliveryVars, signOffData);
    });

    it('test_addexportsignoff_4 : should be able to add data in charges and save master shipment', function() {

        actionLib.click(signOffPage.subMenuCharges);
        signOffPage.addMasterShipmentCharges(signOffData);
        actionLib.verifyElementPresent(signOffPage.btnSave);
        actionLib.click(signOffPage.btnSave);
        actionLib.verifyElementPresent(signOffPage.btnPopUpOk);
        actionLib.click(signOffPage.btnPopUpOk);
    });

    it('test_addexportsignoff_5 : verify that the sign off count is increased by 1', function() {

        actionLib.verifyElementPresent(signOffPage.menuTasks);
        actionLib.click(signOffPage.menuTasks);
        actionLib.verifyElementPresent(signOffPage.subMenuMyTasks);
        actionLib.click(signOffPage.subMenuMyTasks);
        actionLib.verifyElementPresent(signOffPage.linkSignOff);
        //--second attribute value other than none - get the signoff count on the my task page
        // and verify it is 1 more than the previous signoff count.
        actionLib.verifySplitCountOfLocator(signOffPage.linkSignOff, "Yes");
    });

    it('test_addexportsignoff_6 : should be able to sign off shipment', function() {

        actionLib.click(signOffPage.linkSignOff);
        efsLib.fillTextInTableColumn(signOffData.signOffTableDataXpathTag, 2, 2, 
                                        globalData.customerName)
        efsLib.verifySearchTextInTableRowCol(signOffData.signOffTableDataXpathTag, 1, 2, 
                                                globalData.customerName);
        efsLib.clickRowInAirExportTable(globalData.customerName, enquiryData.origin);
        
        actionLib.verifyElementPresent(signOffPage.btnMore);
        actionLib.click(signOffPage.btnMore);
        actionLib.verifyElementPresent(signOffPage.linkMoreSignOff);
        actionLib.click(signOffPage.linkMoreSignOff);
        actionLib.setText(signOffPage.textAreaSignOffDescription, signOffData.signOffDescription);
        actionLib.verifyElementPresent(signOffPage.btnPopUpSignOff);
        actionLib.click(signOffPage.btnPopUpSignOff);
        actionLib.verifyElementPresent(signOffPage.btnMore);
        actionLib.click(signOffPage.btnMore);
        actionLib.verifyElementPresent(signOffPage.linkMoreUnSignOff);
    });

    afterAll(function(){
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});
