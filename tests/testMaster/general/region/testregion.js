var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageAddRegion = require('../../../../pages/master/general/region/pageAddRegion.js');
var pageRegion = require('../../../../pages/master/general/region/pageRegion.js');
var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../../pages/pageNavigation/topBar.js');
var regionData = require('../../../../testdata/masters/General/region/dataRegion.json');


    beforeAll(function() {
        var testSpecName = "AddRegion/Section"
        efsLib.setUrlAndLoginApp(loginPage,loginData,testSpecName);
        dataRegion = regionData.addRegion[0];
    });

describe('test addRegion functionality of newage for master module', function() {

    it('test_addmasterregion_1 : verify user able to navigate to addregion page', function() {

        hamberger.navigateToPage("Masters","General","Region");
    });

    it('test_addmasterregion_2 : verify user able to create a addregion record', function() {

        pageRegion.clickOn("add region");
        pageAddRegion.createRegion(dataRegion);
        pageAddRegion.clickOn("save");
        expect(efsLib.getAppDisplayedText()).toBe("Saved Successfully");
    });

    it('test_addmasterregion_3 : verify user able to filter & display in region list page', function() {

        pageRegion.verifyRegionByCode(dataRegion.code);
        pageRegion.openRegionByCode(dataRegion.code);
        pageRegion.verifyRegionDetails(dataRegion);
    });

    it('test_addmasterregion_4 : verify user able to update the existing record details', function() {

        pageRegion.clickOn("edit")
        pageAddRegion.editRegionDetails(dataRegion);
        pageAddRegion.clickOn("update");
        expect(efsLib.getAppDisplayedText()).toBe("Updated Successfully");
    });

    it('test_addmasterregion_5 : verify user not able to create a duplicate record', function() {

        pageRegion.clickOn("add region");
        pageAddRegion.createRegion(dataRegion);
        pageAddRegion.clickOn("save");
        //expect(efsLib.getAppDisplayedText()).toBe("Region code already exists");
        pageAddRegion.clickOn("cancel");
        pageAddRegion.clickOnConfirmationPopUpAs("no");
    });

    it('test_addmasterregion_6 : verify user able to create a duplicate record', function() {

        pageRegion.openRegionByCode(dataRegion.code);
        pageRegion.clickOn("delete");
        pageRegion.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleted successfully");
        browser.refresh();
    });

    it('test_addmasterregion_7 : verify user not able to delete any record if there is any transaction done', function() {

        pageRegion.openByFirstoption(); //first value will select from list page 
        pageRegion.clickOn("delete")
        pageRegion.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
    
    });

    afterAll(function(){
        topBar.appLogout();
    });
});
    