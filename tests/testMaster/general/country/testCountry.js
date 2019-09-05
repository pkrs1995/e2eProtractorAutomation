var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddCountry = require('../../../../pages/master/general/country/pageAddCountry.js');
var pageCountry = require('../../../../pages/master/general/country/pageCountry.js');
var countryData = require('../../../../testdata/masters/general/country/dataCountry.json');


describe('Testing Country Master screen with all functionality', function () {
    beforeAll(function () {
        var testSpecName = "TestAddCountry";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        countryDetails = countryData.addCountry[0];
        previewCountryDetails = countryData.previewCountry[0];
        nameDuplicateCountry = countryData.addCountry[1];
        codeDuplicateCountry = countryData.addCountry[2];
        editCountryDetails = countryData.editCountry[0];
    });

    it('eFSV2-282 : Verify a create new country and do validation', function () {
        hamberger.navigateToPage('Masters','General','Country');
        pageCountry.clickOn('add country');
        pageAddCountry.enterCountryDetails(countryDetails);
        pageAddCountry.clickOn('save');
        expect(efsLib.getToastMessageText()).toBe("Saved Successfully");
        expect(pageCountry.isCountryPresentByCode(countryDetails.code)).toBe(true);
    });
    
    it('eFSV2-347 : verify add country and cancel option', function () {
        pageCountry.clickOn('add country');
        pageAddCountry.enterCountryDetails(countryDetails);
        pageAddCountry.clickOn('cancel');
        expect(efsLib.getAppDisplayedText()).toBe("Do you want to Save your changes ?");
        pageAddCountry.clickConfirmationPopupAs('no');
    });

    it('eFSV2-348 : verify country edit and delete',function () {
        pageCountry.openCountryByCode(countryDetails.code);
        pageCountry.clickOn('edit');
        pageAddCountry.enterCountryDetails(editCountryDetails);
        pageAddCountry.clickOn('update');
        expect(efsLib.getToastMessageText()).toBe("Updated Successfully");
        pageCountry.openCountryByCode(countryDetails.code);
        pageCountry.clickOn('delete');
        expect(efsLib.getAppDisplayedText()).toBe("Are you sure you want to delete selected country?");
        pageAddCountry.clickConfirmationPopupAs('yes');

    });

});