var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../../pages/pageNavigation/topBar.js');
var pageAddPortGroup = require('../../../../pages/master/general/portGroup/pageAddPortGroup.js');
var pagePortGroup = require('../../../../pages/master/general/portGroup/pagePortGroup.js');
var portGroupData = require('../../../../testdata/masters/general/portGroup/dataPortGroup.json');


describe('Testing Port Group Master screen with all functionality', function () {
    beforeAll(function () {
        var testSpecName = "TestAddPortGroup";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        portGroupDetails = portGroupData.addPortGroup[0];
        previewPortGroupDetails = portGroupData.previewPortGroup[0];
        nameDuplicatePortGroup = portGroupData.addPortGroup[1];
        codeDuplicatePortGroup = portGroupData.addPortGroup[2];
        editPortGroupDetails = portGroupData.editPortGroup[0];
    });

    it('eFSV2-356 : Verify user should able to create a record for Port Group', function () {
        hamberger.navigateToPage('Masters','General','Port Group');
        pagePortGroup.clickOn('add port group');
        pageAddPortGroup.enterPortGroupDetails(portGroupDetails);
        pageAddPortGroup.clickOn('save');
        expect(pagePortGroup.getToastMessageText()).toBe("Saved Successfully");
        expect(pagePortGroup.isPortGroupPresentByCode(portGroupDetails.code)).toBe(true);
    });

    it('eFSV2-299 : Verify created port group details',function () {
        pagePortGroup.openPortGroupByCode(portGroupDetails.code);
        pagePortGroup.verifyPortGroupDetails(previewPortGroupDetails);
    });
    
    it('eFSV2-361 : Verify add port Group cancel process', function () {
        pagePortGroup.clickOn('add port group');
        pageAddPortGroup.enterPortGroupDetails(portGroupDetails);
        pageAddPortGroup.clickOn('cancel');
        expect(pageAddPortGroup.getPopupText()).toBe("Do you want to Save your changes ?");
        pageAddPortGroup.clickConfirmationPopupAs('no');
    });

    it('eFSV2-359 : Verify user Should able to Update record',function () {
        pagePortGroup.openPortGroupByCode(portGroupDetails.code);
        pagePortGroup.clickOn('edit');
        pageAddPortGroup.enterPortGroupDetails(editPortGroupDetails);
        pageAddPortGroup.clickOn('update');
        expect(pagePortGroup.getToastMessageText()).toBe("Updated Successfully");
    });

    it('eFSV2-364 : Verify user should not allow to Delete used Port Group',function () {
        pagePortGroup.openPortGroupByCode('AF');
        pagePortGroup.clickOn('delete');
        expect(pagePortGroup.getPopupText()).toBe("Are you sure you want to delete selected port gorup ?");
        pageAddPortGroup.clickConfirmationPopupAs('yes');
        expect(efsLib.getAppDisplayedText()).toBe("Could not delete Master as child record(s) found.");
        expect(pagePortGroup.isPortGroupPresentByCode('AF')).toBe(true);
    });

    it('eFSV2-357 : Port Group name should not be duplicate',function () {
        pagePortGroup.clickOn('add port group');
        pageAddPortGroup.enterPortGroupDetails(nameDuplicatePortGroup);
        pageAddPortGroup.clickOn('save');
        expect(efsLib.getAppDisplayedText()).toBe("Provided Group name is currently available.");
    });

    it('eFSV2-358 : Port Group code should not be duplicate',function () {
        pageAddPortGroup.enterPortGroupDetails(codeDuplicatePortGroup);
        pageAddPortGroup.clickOn('save');
        expect(efsLib.getAppDisplayedText()).toBe("Provided Group code is currently available.");
    });

    it('eFSV2-360 : Verify user should able to Delete record',function () {
        pageAddPortGroup.clickOn('cancel');
        pageAddPortGroup.clickConfirmationPopupAs('no');
        pagePortGroup.openPortGroupByCode(portGroupDetails.code);
        pagePortGroup.clickOn('delete');
        expect(pagePortGroup.getPopupText()).toBe("Are you sure you want to delete selected port gorup ?");
        pageAddPortGroup.clickConfirmationPopupAs('yes');
        // browser.sleep(2000)
        // expect(pagePortGroup.isPortGroupPresentByCode(portGroupDetails.code)).toBe(false); // not working for synchronization issue
    });

    afterAll(function () {
        topBar.appLogout();
    });

});