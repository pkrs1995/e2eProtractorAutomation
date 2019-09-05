var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddTermsofShipment = require('../../../../pages/master/general/termsofShipment/pageAddTermsofShipment.js');
var pageTermsofShipment = require('../../../../pages/master/general/termsofShipment/pageTermsofShipment.js');
var termsofShipmentData = require('../../../../testdata/masters/general/termsofShipment/dataTermsofShipment.json');


describe('Testing Terms of Shipment Master screen with all functionality', function (){

    var stateDetails,nameDuplicateState,codeDuplicateState,updateStateDetails,deleteState;

    beforeAll(function () {
        var testSpecName = "TestAddTermsofShipment";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        tosDetails = termsofShipmentData.addTermsofShipment[0];
        nameDuplicateTOS = termsofShipmentData.addTermsofShipment[1];
        codeDuplicateTOS = termsofShipmentData.addTermsofShipment[2];
        updateTOSDetails = termsofShipmentData.addTermsofShipment[3];
        deleteTOS = termsofShipmentData.addTermsofShipment[4];
    });

    it('eFSV2-414 From Test Link : verify create new terms of shipment', function() {
        
        hamberger.navigateToPage("Masters","General","Terms of Shipment");
        pageTermsofShipment.clickOn("add tos");
        pageAddTermsofShipment.enterTermsofShipmentDetails(tosDetails.tos);
        pageAddTermsofShipment.clickOn("save");
        // expect(efsLib.getToastMessageText()).toBe("Saved Successfully");

    });

    it('eFSV2-415 From Test Link : verify add terms of shipment and cancel option', function() {
        
        pageTermsofShipment.clickOn("add tos");
        pageAddTermsofShipment.enterTermsofShipmentDetails(nameDuplicateTOS.tos);
        pageAddTermsofShipment.clickOn("cancel");
        pageAddTermsofShipment.clickConfirmationPopupAs("no");
           
    });

    it('eFSV2-765 From Test Link : verify the user not able to create a duplicate records', function() {
        
        pageTermsofShipment.clickOn("add tos");
        pageAddTermsofShipment.enterTermsofShipmentDetails(nameDuplicateTOS.tos);
        pageAddTermsofShipment.clickOn("save");
        // expect(efsLib.getAppDisplayedText()).toBe("Provided Terms of Shipment name is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-765 From Test Link : verify the user not able to create a duplicate records with same code', function() {
        
        pageTermsofShipment.clickOn("add tos");
        pageAddTermsofShipment.enterTermsofShipmentDetails(codeDuplicateTOS.tos);
        pageAddTermsofShipment.clickOn("save");
        // expect(efsLib.getAppDisplayedText()).toBe("Provided Terms of Shipment code is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-762 From Test Link : verify a search field in shipment', function() {
        
        pageTermsofShipment.openTermsofShipmentByCode(tosDetails.tos);
        pageTermsofShipment.verifyTermsofShipmentDetails(tosDetails.tos);
           
    });
    
    it('eFSV2-416 From Test Link :verify the edit option in TOS', function() {
        
        pageTermsofShipment.openTermsofShipmentByCode(tosDetails.tos);
        pageTermsofShipment.clickOn("edit");
        pageAddTermsofShipment.editTermsofShipmentDetails(updateTOSDetails.tos);
        pageAddTermsofShipment.clickOn("update");
        // expect(efsLib.getToastMessageText()).toBe("Updated Successfully");
           
    });

    it('eFSV2-763 From Test Link : Verify the delete option in TOS', function() {
        
        pageTermsofShipment.openTermsofShipmentByCode(updateTOSDetails.tos);
        pageTermsofShipment.clickOn("delete");
        pageTermsofShipment.clickConfirmationPopupAs("yes");
        // expect(efsLib.getToastMessageText()).toBe("Deleted Sucessfully");
           
    });

    it('eFSV2-766 From Test Link : Verify user should not allow to delete used TOS', function() {
        
        pageTermsofShipment.openTermsofShipmentByCode(deleteTOS.tos);
        pageTermsofShipment.clickOn("delete");
        pageTermsofShipment.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
           
    });


});