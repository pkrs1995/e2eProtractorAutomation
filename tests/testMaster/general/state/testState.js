var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddState = require('../../../../pages/master/general/state/pageAddState.js');
var pageState = require('../../../../pages/master/general/state/pageState.js');
var stateData = require('../../../../testdata/masters/general/state/dataState.json');


describe('Testing State Master screen with all functionality', function (){

    var stateDetails,nameDuplicateState,codeDuplicateState,updateStateDetails,deleteState;

    beforeAll(function () {
        var testSpecName = "TestAddState";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        stateDetails = stateData.addState[0];
        nameDuplicateState = stateData.addState[1];
        codeDuplicateState = stateData.addState[2];
        updateStateDetails = stateData.addState[3];
        deleteState = stateData.addState[4];
    });

    it('eFSV2-300 From Test Link : Verify user should able to create a record for State/Province', function() {
        
        hamberger.navigateToPage("Masters","General","State");
        pageState.clickOn("add state");
        pageAddState.enterStateDetails(stateDetails.state);
        pageAddState.clickOn("save");
        //expect(efsLib.getAppDisplayedText()).toBe("Saved Successfully");
        expect(efsLib.getToastMessageText()).toBe("Saved Successfully");
    });

    it('eFSV2-301 From Test Link : Verify user should not able create Same Code can not be added with same country', function() {
        
        pageState.clickOn("add state");
        pageAddState.enterStateDetails(codeDuplicateState.state);
        pageAddState.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided State code is currently available.");
        // expect(efsLib.getToastMessageText()).toBe("Provided State code is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-302 From Test Link : Verify user should not able create Same name can not be added with same country', function() {
        
        pageState.clickOn("add state");
        pageAddState.enterStateDetails(nameDuplicateState.state);
        pageAddState.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided State name is currently available.");
        // expect(efsLib.getToastMessageText()).toBe("Provided State name is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-305 From Test Link : Verify Created State Details', function() {
        
        pageState.openStateByCode(stateDetails.state);
        pageState.verifyStateDetails(stateDetails.state);
           
    });
    
    it('eFSV2-303 From Test Link :Verify user Should able to Update record', function() {
        
        pageState.openStateByCode(stateDetails.state);
        pageState.clickOn("edit");
        pageAddState.editStateDetails(updateStateDetails.state);
        pageAddState.clickOn("update");
        //expect(pageAddCarrier.getToastMessageText()).toBe("Updated Sucessfully");
        //expect(efsLib.getAppDisplayedText()).toBe("Updated Sucessfully");
        expect(efsLib.getToastMessageText()).toBe("Updated Successfully");
           
    });

    it('eFSV2-304 From Test Link : Verify user should able to Delete record', function() {
        
        pageState.openStateByCode(updateStateDetails.state);
        pageState.clickOn("delete");
        pageState.clickConfirmationPopupAs("yes");
        // expect(efsLib.getToastMessageText()).toBe("Deleted Sucessfully");
           
    });

    it('eFSV2-306 From Test Link : Verify user should not allow to delete used state', function() {
        
        pageState.openStateByCode(deleteState.state);
        pageState.clickOn("delete");
        pageState.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Could not delete Master as child record(s) found.");
           
    });

});