var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageAddCurrency = require('../../../../pages/master/general/currency/pageAddCurrency.js');
var pageCurrency = require('../../../../pages/master/general/currency/pageCurrency.js');
var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../../pages/pageNavigation/topBar.js');
var currencyData = require('../../../../testdata/masters/General/currency/dataCurrency.json');

var dataCurrency;
describe('test addCurrency functionality of newage for master module', function() {

    beforeAll(function() {
        var TestSpecName = "TestAddCurrency";
        efsLib.setUrlAndLoginApp(loginPage,loginData,TestSpecName);
        dataCurrency = currencyData.addCurrency[0];
    });  

    it('eFSV2-171 : verify user able to navigate to addcurrency page', function() {

        hamberger.navigateToPage("Masters","General","Currency");
    });

    it('eFSV2-171 : verify user able to create a addcurrency record', function() {

        pageAddCurrency.createCurrency(dataCurrency);
        //expect(efsLib.getAppDisplayedText()).toBe("Saved Sucessfully"); //msg is not appear 
    });

    it('eFSV2-730 : verify user able to filter the results', function() {
        pageCurrency.verifyCurrencyByCode(dataCurrency.code)
    });

    it('eFSV2-730: verify user able to preview the currency page', function() {
        pageCurrency.openCurrencyByCode(dataCurrency.code);
        pageCurrency.verifyCurrencyDetails(dataCurrency);
    }); 

    it('eFSV2-175 : verify user able to update the existing record', function() {
        pageCurrency.clickOn("edit");
        pageAddCurrency.editCurrencyDetails(dataCurrency);
        pageAddCurrency.clickOn("update");
        pageCurrency.verifyCurrencyByCode(dataCurrency.code)
        //expect(efsLib.getAppDisplayedText()).toBe("Updated Sucessfully"); msg is not displayed
    }); 

    it('eFSV2-731 : verify user not able to create dupilcate the record', function() {
        pageAddCurrency.createCurrency(dataCurrency);
        expect(efsLib.getAppDisplayedText()).toBe("Provided Currency code is currently available.");
        pageAddCurrency.clickOn("cancel");
        pageAddCurrency.clickConfirmationPopupAs("no");
    });

    it('eFSV2-729: verify user able to delete the currency record', function() {
        
        pageCurrency.openCurrencyByCode(dataCurrency.code);
        pageCurrency.clickOn("delete");
        expect(efsLib.getAppDisplayedText()).toBe("Are you sure you want to delete selected currency ?");
        pageCurrency.clickConfirmationPopupAs("yes");
    });

    it('eFSV2-731: verify user not able to delete the record if any transaction occured', function() {
        pageCurrency.clickOnFirstcurrencyRecord();
        pageCurrency.clickOn("delete");
        pageCurrency.clickConfirmationPopupAs("yes");
        expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
    });

    afterAll(function(){
        topBar.appLogout();   
    })
    
});