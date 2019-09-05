var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddPort = require('../../../../pages/master/general/port/pageAddPort.js');
var pagePort = require('../../../../pages/master/general/port/pagePort.js');
var portData = require('../../../../testdata/masters/general/port/dataPort.json');


describe('Testing Port Master screen with all functionality', function () {
    beforeAll(function () {
        var testSpecName = "TestAddPort";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        portDetails = portData.addPort[0];
        ediMappingDetails = portData.addEdiMapping;
        editEdiMappingDetails = portData.editEdiMapping;
        previewPortDetails = portData.previewport[0];
        nameDuplicatePort = portData.addPort[1];
        codeDuplicatePort = portData.addPort[2];
        editPortDetails = portData.editPort[0];
    });

    it('eFSV2-704 : Create New Port for Air ', function () {
        hamberger.navigateToPage('Masters','General','Port');
        pagePort.clickOn('add port');
        pageAddPort.enterPortDetails(portDetails);
        pageAddPort.enterEdiMappingDetails(ediMappingDetails);
        pageAddPort.clickOn('save');
        // expect(efsLib.getToastMessageText()).toBe("Saved Successfully");
        expect(pagePort.isPortPresentByCode(portDetails.code)).toBe(true);
    });
    
    it('eFSV2-716 : Verify created port detail for Air ', function () {
        pagePort.openPortByCode(portDetails.code);
        pagePort.verifyPortDetails(previewPortDetails);
        pagePort.verifyEdiMappingDetails(ediMappingDetails);
    });

    it('eFSV2-713 : Port edit and update functionality for Air',function () {
        pagePort.clickOn('edit');
        pageAddPort.editPortDetails(editPortDetails);
        pageAddPort.enterEdiMappingDetails(editEdiMappingDetails, 4);
        pageAddPort.clickOn('update');
        expect(efsLib.getToastMessageText()).toBe("Updated Successfully");
    });

    it('eFSV2-711 : Port name should not be duplicated for Air',function () {
        pagePort.clickOn('add port');
        pageAddPort.enterPortDetails(nameDuplicatePort);
        pageAddPort.clickOn('save');
        expect(efsLib.getAppDisplayedText()).toBe("Provided Port name is currently available.");
    });

    it('eFSV2-712 : Port code should not be duplicated for Air ',function () {
        pageAddPort.enterPortDetails(codeDuplicatePort);
        pageAddPort.clickOn('save');
        expect(efsLib.getAppDisplayedText()).toBe("Provided Port code is currently available.");
        pageAddPort.clickOn('cancel');
        pageAddPort.clickConfirmationPopupAs('No');
    });

    it('eFSV2-714 : Port delete functionality for Air',function () {
        pagePort.openPortByCode(portDetails.code);
        pagePort.clickOn('delete');
        expect(pagePort.getPopupText()).toBe("Are you sure you want to delete selected port ?");
        pagePort.clickConfirmationPopupAs('yes');
        expect(pagePort.isPortPresentByCode(portDetails.code)).toBe(false);
    });

    it('eFSV2-718 : User not allowed to delete the used port',function () {
        pagePort.openPortByCode('DEL');
        pagePort.clickOn('delete');
        expect(pagePort.getPopupText()).toBe("Are you sure you want to delete selected port ?");
        pagePort.clickConfirmationPopupAs('yes'); 
        expect(efsLib.getAppDisplayedText()).toBe("Could not delete Master as child record(s) found.");
        expect(pagePort.isPortPresentByCode('DEL')).toBe(true);
    });

    it('eFSV2-717 : Verify add port cancel process ',function () {
        pagePort.clickOn('add port');
        pageAddPort.enterPortDetails(portDetails);
        pageAddPort.clickOn('cancel');
        expect(pageAddPort.getPopupText()).toBe("Do you want to Save your changes ?");
        pageAddPort.clickConfirmationPopupAs('No');
        expect(pagePort.isPortPresentByCode(portDetails.code)).toBe(false);
    });

});