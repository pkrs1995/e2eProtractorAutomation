var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var deliveryToCfsPage = require('../../../pages/pageAirExport/pageDeliveryToCfs/pageDeliveryToCfs.js');
var linkingToMasterPage = require('../../../pages/pageAirExport/pageLinkingToMaster/pageLinkingToMaster.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var deliveryToCfsData = require('../../../testdata/dataAirExport/dataDeliveryToCfs/dataDeliveryToCfs.json');
var linkingToMasterData = require('../../../testdata/dataAirExport/dataLinkingToMaster/dataLinkingToMaster.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');


describe('test export add linking to master functionality of newage', function() {
    var strOthersTabDate;
    var strEventsDate;
    var strAtaDate;
    var strAtdDate;
    var strPickUpFollowUpDate;
    var strPlannedPickUpDate;
    var strActualPickUpDate;
    var strExpectedDeliveryDate;
    var strDeliveryDate;

    beforeAll(function(){
        var testSpecName = "TestAddLinkingToMasterShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataDeliveryCFS = deliveryToCfsData.addDeliveryToCFS[0];
        dataEnquiry = enquiryData.addEnquiry[0];
        datLinkingToMaster =linkingToMasterData.addLinkingToMaster[0];
    });
	
        it('test_addexportlinkingtomaster_1 : should be able to navigate to shipment page others tab', function() {
            
            actionLib.verifyElementPresent(linkingToMasterPage.linkLinkingToMaster);
            //----second attribute value none - get the linking to master count on the my task page      
            actionLib.verifySplitCountOfLocator(linkingToMasterPage.linkLinkingToMaster, "none");        
            actionLib.verifyElementPresent(deliveryToCfsPage.linkDeliveryToCfs);
            actionLib.click(deliveryToCfsPage.linkDeliveryToCfs);
            efsLib.fillTextInTableColumn(dataDeliveryCFS.deliveryToCfsTableDataXpathTag, 2, 2, 
                                            globalData.globalData.customerName);
            efsLib.clickRowInAirExportTable(globalData.globalData.customerName, dataEnquiry.enquiry.origin);
        });
        
        it('test_addexportlinkingtomaster_2 : should be able to add data to shipment page others tab', function() {

            strOthersTabDate = actionLib.getTodayDate();
            
            actionLib.verifyElementPresent(linkingToMasterPage.btnEdit);
            actionLib.click(linkingToMasterPage.btnEdit);
            actionLib.verifyElementPresent(linkingToMasterPage.subMenuOthers);
            actionLib.click(linkingToMasterPage.subMenuOthers);
            actionLib.verifyElementPresent(linkingToMasterPage.btnAddDocument);
            actionLib.click(linkingToMasterPage.btnAddDocument);
            linkingToMasterPage.addShipmentOthersTab(datLinkingToMaster.linkingToMaster, strOthersTabDate);
        });

        it('test_addexportlinkingtomaster_3 : should be able to send shipment to cargo received', function() {

            strEventsDate = actionLib.getTodayDate();

            actionLib.verifyElementPresent(linkingToMasterPage.btnEvents);
            actionLib.click(linkingToMasterPage.btnEvents);
            actionLib.verifyElementPresent(linkingToMasterPage.dropDownEventsName);
            linkingToMasterPage.addShipmentEvents(datLinkingToMaster.eventsTab, strEventsDate);
            actionLib.verifyElementPresent(linkingToMasterPage.btnEventsSave);
            actionLib.click(linkingToMasterPage.btnEventsSave);
            actionLib.verifyElementPresent(linkingToMasterPage.btnUpdate);
            actionLib.click(linkingToMasterPage.btnUpdate);
            actionLib.click(linkingToMasterPage.btnPopUpOk);
        });

        it('test_addexportlinkingtomaster_4 : verify that the linking to master count updated successfully', function() {

            actionLib.verifyElementPresent(linkingToMasterPage.menuTasks);
            actionLib.click(linkingToMasterPage.menuTasks);
            actionLib.verifyElementPresent(linkingToMasterPage.subMenuMyTasks);
            actionLib.click(linkingToMasterPage.subMenuMyTasks);
            actionLib.verifyElementPresent(linkingToMasterPage.linkLinkingToMaster);
            //--second attribute value other than none - get the linking to master count on the my task page
            // and verify it is 1 more than the previous linking to master count.
            actionLib.verifySplitCountOfLocator(linkingToMasterPage.linkLinkingToMaster, "Yes");
            actionLib.click(linkingToMasterPage.linkLinkingToMaster);
            efsLib.fillTextInTableColumn(datLinkingToMaster.linkingToMasterTableDataXpathTag, 2, 2, 
                                            globalData.globalData.customerName)
            efsLib.verifySearchTextInTableRowCol(datLinkingToMaster.linkingToMasterTableDataXpathTag, 1, 2, 
                                                    globalData.globalData.customerName);
        });
	
    afterAll(function(){
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });
});

