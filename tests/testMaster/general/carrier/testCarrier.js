var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddCarrier = require('../../../../pages/master/general/carrier/pageAddCarrier.js');
var pageCarrier = require('../../../../pages/master/general/carrier/pageCarrier.js');
var carrierData = require('../../../../testdata/masters/general/carrier/dataCarrier.json');


describe('Testing Carrier Master screen with all functionality', function (){

    var carrierDetails;

    beforeAll(function () {
        var testSpecName = "TestAddCarrier";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        carrierDetails = carrierData.addCarrier[0];
        deleteCarrier = carrierData.addCarrier[1];
    });

    it('eFSV2-124 From Test Link : verify for creating new carrier for Air module', function() {
        
        hamberger.navigateToPage("Masters","General","Carrier");
        pageCarrier.clickOn("add carrier");
        pageAddCarrier.enterCarrierDetails(carrierDetails.carrier);
        pageAddCarrier.clickOn("save");
        //expect(efsLib.getAppDisplayedText()).toBe("Saved Sucessfully");
        // expect(pageAddCarrier.getToastMessageText).toBe("Saved Sucessfully");
    });

    it('eFSV2-758 From Test Link : verify for filter of newly created carrier record and validation', function() {
        
        pageCarrier.openCarrierByCode(carrierDetails.carrier);
        pageCarrier.verifyCarrierDetails(carrierDetails.carrier);
    });

    it('eFSV2-715 From Test Link : verify user should not create duplicate carrier master', function() {
        
        pageCarrier.clickOn("add carrier");
        pageAddCarrier.enterCarrierDetails(carrierDetails.carrier);
        pageAddCarrier.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided Carrier code is currently available.");
        // expect(efsLib.getToastMessageText()).toBe("Provided Carrier code is currently available.");
        browser.navigate().back(); 

    });
    
    it('eFSV2-719 From Test Link :Verify user should able to edit the carrier master successfully', function() {
        
        pageCarrier.openCarrierByCode(carrierDetails.carrier);
        pageCarrier.clickOn("edit");
        pageAddCarrier.editCarrierDetails(carrierDetails.carrier);
        pageAddCarrier.clickOn("update");
        // expect(pageAddCarrier.getToastMessageText()).toBe("Updated Sucessfully");
        // expect(efsLib.getAppDisplayedText()).toBe("Updated Sucessfully");
        // expect(efsLib.getToastMessageText()).toBe("Updated Sucessfully");
           
    });

    it('eFSV2-720 From Test Link : Verify user should able to delete the carrier master successfully', function() {
        
        pageCarrier.openCarrierByCode(carrierDetails.carrier);
        pageCarrier.clickOn("delete");
        pageCarrier.clickConfirmationPopupAs("yes");
        // expect(efsLib.getToastMessageText()).toBe("Deleted Sucessfully");
        // expect(pageAddCarrier.getToastMessageText()).toBe("Deleted Sucessfully");
           
    });

    it('eFSV2-125 From Test Link : verify for cancelling new creating carrier', function() {
        
        pageCarrier.clickOn("add carrier");
        pageAddCarrier.enterCarrierDetails(carrierDetails.carrier);
        pageAddCarrier.clickOn("cancel");
        pageAddCarrier.clickConfirmationPopupAs("no");
           
    });

    it('eFSV2-126 From Test Link : Verify user should not allow to Delete used carrier', function() {
        
        pageCarrier.openCarrierByCode(deleteCarrier.carrier);
        pageCarrier.clickOn("delete");
        pageCarrier.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
   
    });

});