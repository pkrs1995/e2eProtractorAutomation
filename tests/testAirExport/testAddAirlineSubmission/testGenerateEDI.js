var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var linkingToMasterPage = require('../../../pages/pageAirExport/pageLinkingToMaster/pageLinkingToMaster.js');
var signOffPage = require('../../../pages/pageAirExport/pageSignOff/pageSignOff.js');
var airlineSubmissionPage = require('../../../pages/pageAirExport/pageAirlineSubmission/pageAirlineSubmission.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var enquiryData = require('../../../testdata/dataAirExport/dataEnquiry/dataEnquiry.json');
var linkingToMasterData = require('../../../testdata/dataAirExport/dataLinkingToMaster/dataLinkingToMaster.json');
var signOffData = require('../../../testdata/dataAirExport/dataSignOff/dataSignOff.json');
var airlineSubmissionData = require('../../../testdata/dataAirExport/dataAirlineSubmission/dataAirlineSubmission.json');
var shipmentServiceRoutingData = require('../../../testdata/dataAirExport/dataShipment/dataShipment.json');
var topBar = require('../../../pages/pageNavigation/topBar.js');

describe('test export generate EDI functionality of newage', function () {

    beforeAll(function () {
        var testSpecName = "TestGenerateEDI";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        actionLib.checkPlatform();
    });

    it('test_generateairlineedi_1 : should be able to navigate to generate edi page', function () {

        //----second attribute value none - get the job completion count on my task page        
        actionLib.verifySplitCountOfLocator(airlineSubmissionPage.linkJobCompletion, "none");
        actionLib.verifyElementPresent(airlineSubmissionPage.linkAirlineSubmission);
        actionLib.click(airlineSubmissionPage.linkAirlineSubmission);
        efsLib.fillTextInTableColumn(airlineSubmissionData.airlineSubmissionTableDataXpathTag,
            2, 2, globalData.customerName);
        efsLib.clickRowInAirExportTable(globalData.customerName, enquiryData.origin);
    });

    it('test_generateairlineedi_2 : should be able to generate airline edi successfully', function () {

        airlineSubmissionPage.addGenerateEdi();
    });

    it('test_generateairlineedi_3 : verify that the job completion count is increased by 1', function () {

        actionLib.verifyElementPresent(actionLib.menuTasks);
        actionLib.click(actionLib.menuTasks);
        actionLib.verifyElementPresent(actionLib.subMenuMyTasks);
        actionLib.click(actionLib.subMenuMyTasks);
        actionLib.verifyElementPresent(airlineSubmissionPage.linkJobCompletion);
        //--second attribute value other than none - get the Job completion count on the my 
        // task page and verify it is 1 more than the previous Job completion count.
        actionLib.verifySplitCountOfLocator(airlineSubmissionPage.linkJobCompletion, "Yes");
        actionLib.click(airlineSubmissionPage.linkJobCompletion);
        efsLib.fillTextInTableColumn(airlineSubmissionData.jobCompletionTableDataXpathTag, 2, 2,
            globalData.customerName)
        efsLib.verifySearchTextInTableRowCol(airlineSubmissionData.jobCompletionTableDataXpathTag,
            1, 2, globalData.customerName);
    });

    it('test_generateairlineedi_4 : verify files are available on ftp host', function () {

        var ftpLoginparam = {
            "hostName": "ftp.efreightsuite.com",
            "userName": "fsl",
            "passwd": "Fsl#2015"
        }

        var generatedEdiFileName = {
            "fhlFileName": "FHL" + shipmentServiceRoutingData.mawbNo + "1.txt",
            "fwbFileName": "FWB" + shipmentServiceRoutingData.mawbNo + ".txt",
        }
        retryAndFail(actionLib.ftpLogin, ftpLoginparam, generatedEdiFileName.fhlFileName);
        retryAndFail(actionLib.ftpLogin, ftpLoginparam, generatedEdiFileName.fwbFileName);
    });

    afterAll(function () {
        console.log('Logout action called.....');
        topBar.appLogout();
        console.log('Logout action finished.....');
    });

    function retryAndFail(functionToExecute, ftpLoginparam, filename) {
        var retries = 5;
        var success = functionToExecute(ftpLoginparam, filename);
        var isFailed = function (code) {
            return code === 0 || code === -1;
        };
        while (retries-- > 0 && isFailed(success)) {
            console.log("Retrying to check if file " + filename + " exists on FTP server");
            success = functionToExecute(ftpLoginparam, filename);
        }
        if (isFailed(success)) {
            throw (filename + " File not found")
        }
    }
});