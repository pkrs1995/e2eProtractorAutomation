var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddUnit = require('../../../../pages/master/general/unit/pageAddUnit.js');
var pageUnit = require('../../../../pages/master/general/unit/pageUnit.js');
var unitData = require('../../../../testdata/masters/general/unit/dataUnit.json');


describe('Testing Unit Master screen with all functionality', function (){

    var unitDetails,nameDuplicateUnit,codeDuplicateUnit,updateUnitDetails,deleteUnit;

    beforeAll(function () {
        var testSpecName = "TestAddUnit";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        unitDetails = unitData.addUnit[0];
        nameDuplicateUnit = unitData.addUnit[1];
        codeDuplicateUnit = unitData.addUnit[2];
        updateUnitDetails = unitData.addUnit[3];
        deleteUnit = unitData.addUnit[4];
    });

    it('eFSV2-316 From Test Link : verify for creating new unit and do validation created or not', function() {
        
        hamberger.navigateToPage("Masters","General","Unit");
        pageUnit.clickOn("add unit");
        pageAddUnit.enterUnitDetails(unitDetails.unit);
        pageAddUnit.clickOn("save");
        // expect(efsLib.getToastMessageText()).toBe("Saved Successfully");

    });


    it('eFSV2-735 From Test Link : verify for duplication of unit record', function() {
        
        pageUnit.clickOn("add unit");
        pageAddUnit.enterUnitDetails(nameDuplicateUnit.unit);
        pageAddUnit.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided Unit name is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-735 From Test Link : verify for duplication of unit record with same code', function() {
        
        pageUnit.clickOn("add unit");
        pageAddUnit.enterUnitDetails(codeDuplicateUnit.unit);
        pageAddUnit.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Provided Unit code is currently available.");
        browser.navigate().back(); 

    });

    it('eFSV2-734 From Test Link : verify for filter of newly created unit record and validation', function() {
        
        pageUnit.openUnitByCode(unitDetails.unit);
        pageUnit.verifyUnitDetails(unitDetails.unit);
           
    });
    
    it('eFSV2-732 From Test Link :verify for edit of newly created unit record', function() {
        
        pageUnit.openUnitByCode(unitDetails.unit);
        pageUnit.clickOn("edit");
        pageAddUnit.editUnitDetails(updateUnitDetails.unit);
        pageAddUnit.clickOn("update");
        // expect(efsLib.getToastMessageText()).toBe("Updated Successfully");
           
    });

    it('eFSV2-733 From Test Link : verify for delete of newly created unit record', function() {
        
        pageUnit.openUnitByCode(updateUnitDetails.unit);
        pageUnit.clickOn("delete");
        pageUnit.clickConfirmationPopupAs("yes");
        // expect(efsLib.getToastMessageText()).toBe("Deleted Sucessfully");
           
    });

    it('eFSV2-767 From Test Link : verify unit should not delete if record already been used', function() {
        
        pageUnit.openUnitByCode(deleteUnit.unit);
        pageUnit.clickOn("delete");
        pageUnit.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
           
    });


});