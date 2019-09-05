var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddCarrierRate = require('../../../../pages/master/eAir/carrierRate/pageAddCarrierRate.js');
var pageCarrierRate = require('../../../../pages/master/eAir/carrierRate/pageCarrierRate.js');
var carrierRateData = require('../../../../testdata/masters/eAir/carrierRate/dataCarrierRate.json');


describe('Testing Carrier Rate screen with all functionality', function (){

    var carrierRateDetails,editCarrierRate;

    beforeAll(function () {
        var testSpecName = "TestAddCarrierRate";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        carrierRateDetails = carrierRateData.addCarrierRate[0];
        editCarrierRate = carrierRateData.addCarrierRate[1];
    });

    it('eFSV2-698 From Test Link : verify user should create new Carrier Rate', function() {
        
        hamberger.navigateToPage("Masters","eAir","Carrier Rate");
        pageCarrierRate.clickOn("Add Carrier Rate");
        pageAddCarrierRate.enterCarrierRateDetails(carrierRateDetails.carrierRate);
        pageAddCarrierRate.clickOn("save");
        //expect(efsLib.getAppDisplayedText()).toBe("Saved Sucessfully");
        // expect(pageAddCarrier.getToastMessageText).toBe("Saved Sucessfully");
    });

    it('eFSV2-705 From Test Link : verify user should create new Carrier Rate and search', function() {
        
        pageCarrierRate.openCarrierRate(carrierRateDetails.carrierRate);
        pageCarrierRate.verifyCarrierRateDetails(carrierRateDetails.carrierRate);
        browser.navigate().back(); 
    });

    it('eFSV2-702 From Test Link : Verify user should not able to create a Dupilcate record', function() {
        
        pageCarrierRate.clickOn("Add Carrier Rate");
        pageAddCarrierRate.enterCarrierRateDetails(carrierRateDetails.carrierRate);
        pageAddCarrierRate.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided Carrier code is currently available.");
        // expect(efsLib.getToastMessageText()).toBe("Provided Carrier code is currently available.");
        browser.navigate().back(); 

    });
    
    it('eFSV2-703 From Test Link :Verify user should able to update the record in Carrier rate Page', function() {
        
        pageCarrierRate.openCarrierRate(carrierRateDetails.carrierRate);
        pageCarrierRate.clickOn("edit");
        pageAddCarrierRate.editCarrierRateDetails(editCarrierRate.carrierRate);
        pageAddCarrierRate.clickOn("update");
        // expect(pageAddCarrier.getToastMessageText()).toBe("Updated Sucessfully");
        // expect(efsLib.getAppDisplayedText()).toBe("Updated Sucessfully");
        // expect(efsLib.getToastMessageText()).toBe("Updated Sucessfully");
           
    });

    it('eFSV2-701 From Test Link : verify user should cancel new Carrier Rate', function() {
        
        pageCarrierRate.clickOn("Add Carrier Rate");
        pageAddCarrierRate.enterCarrierRateDetails(carrierRateDetails.carrierRate);
        pageAddCarrierRate.clickOn("cancel");
        pageAddCarrierRate.clickConfirmationPopupAs("no");
           
    });


});