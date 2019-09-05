var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var hamberger = require('../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../pages/pageNavigation/topBar.js');
var addMasterShipment = require("../../../testdata/air/mastershipment/dataMasterShipment.json");
var pageMasterShipment = require("../../../pages/air/masterShipment/pageAddMasterShipment.js");


describe('test import add Master Shipment functionality of newage', function()  {

    beforeAll(function()
    {
        var testSpecName = " Test addMasterShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
    });

    it('testaddmastershipment 1: user able to navigate to Master Shipment Screen', function() {

        hamberger.navigateToPage("Air","Master Shipment");
        actionLib.click(pageMasterShipment.btnAddShipment);
    });    
});
