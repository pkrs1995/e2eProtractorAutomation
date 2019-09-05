var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var pageAddCity = require('../../../../pages/master/general/city/pageAddCity.js');
var pageCity = require('../../../../pages/master/general/city/pageCity.js');
var cityData = require('../../../../testdata/masters/general/city/dataCity.json');


describe('Testing City Master screen with all functionality', function () {
    beforeAll(function () {
        var testSpecName = "TestAddCity";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        cityDetails = cityData.addCity[0];
    });

    it('eFSV2-177 From Test Link : Verify a create new city and do validation ', function () {
        hamberger.navigateToPage('Masters','General','City');
        pageCity.clickOn('add city');
        pageAddCity.enterCityDetails(cityDetails);
        pageAddCity.clickOn('save');
        expect(efsLib.getAppDisplayedText()).toBe("Saved Successfully");// expect(efsLib.getToastMessageText()).toBe("Saved Sucessfully");
        pageCity.verifyCityByCode(cityDetails.code);
    });
    
    it('eFSV2-695 From Test Link : Verify city preview page with data ', function () {
        pageCity.openCityByCode(cityDetails.code);
        pageCity.verifyCityDetails(cityDetails);
    });

    it('eFSV2-268 From Test Link : verify city edit and delete',function () {
        pageCity.clickOn('edit');
        pageAddCity.editCityDetails(cityDetails);
        pageAddCity.clickOn('update');
        expect(efsLib.getAppDisplayedText()).toBe("Updated Successfully");// expect(efsLib.getToastMessageText()).toBe("Updated Sucessfully");
        pageCity.openCityByCode(cityDetails.code);
        pageCity.clickOn('delete');
        expect(efsLib.getAppDisplayedText()).toBe("Are you sure you want to delete selected city ?");// expect(pageCity.getPopupText()).toBe("Are kkk you sure you want to delete selected city ?");
        pageCity.clickConfirmationPopupAs('yes');
    });

    it('eFSV2-267 From Test Link : verify add city cancel option',function () {
        pageCity.clickOn('add city');
        pageAddCity.enterCityDetails(cityDetails);
        pageAddCity.clickOn('cancel');
        expect(efsLib.getAppDisplayedText()).toBe("Do you want to Save your changes ?");// expect(pageAddCity.getPopupText()).toBe("Do you want to Save your changes ?");
        pageAddCity.clickConfirmationPopupAs('No');
    });

});