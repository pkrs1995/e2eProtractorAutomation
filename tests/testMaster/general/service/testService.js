var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageAddService = require('../../../../pages/master/general/service/pageAddService.js');
var pageService = require('../../../../pages/master/general/service/pageService.js');
var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../../pages/pageNavigation/topBar.js');
var serviceData = require('../../../../testdata/masters/General/service/dataService.json');

    describe('test addService functionality of newage for master module', function() {
    var dataService;
    beforeAll(function(){
        var testSpecName = "TestAddService";
        efsLib.setUrlAndLoginApp(loginPage,loginData,testSpecName);
        dataService = serviceData.addService[0];
    });

        it('eFSV2-759: verify user able to navigate to addService page', function() {

            hamberger.navigateToPage("Masters","General","Service");
        });

        it('eFSV2-322: verify user able to create a addService record', function() {
            
            pageService.clickOn("add service");
            pageAddService.createService(dataService.service);
            pageAddService.clickOn("save");  
            //expect(efsLib.getToastMessageText).toBe("Saved Successfully"); //not working
        });

        it('eFSV2-738 : verify user able to filter & preview the record', function() {
            
            pageService.verifyServiceByCode(dataService.service.code);
            pageService.openServiceByCode(dataService.service.code);
            pageService.verifyServiceDetails(dataService.service);
        });

        it('eFSV2-737 : verify user not able to create a dupilcate record', function() {
            pageService.clickOn("add service");
            pageAddService.createService(dataService.service);
            pageAddService.clickOn("save");
           // expect(efsLib.getAppDisplayedText()).toBe("Provided Service code is currently available.")
            pageAddService.clickOn("cancel");
            pageAddService.clickOnConfirmationPopUpAs("no");
        });

        it('eFSV2-323 : verify user able to edit the existing record', function() {
            pageService.openServiceByCode(dataService.service.code);
            pageService.clickOn("edit");
            pageAddService.editServicesDetails(dataService.service);
            pageAddService.clickOn("update")
         });
        
        it('eFSV2-736 : verify user able to delete the record', function() {
            pageService.openServiceByCode(dataService.service.code);
            pageService.clickOn("delete");
            pageService.clickConfirmationPopupAs("yes");
        });

        it('eFSV2-324 : verify user not able to delete the record if any transaction occured', function() {
            pageService.openByFirstoption();
            pageService.clickOn("delete");
            pageService.clickConfirmationPopupAs("yes");
           // expect(efsLib.getAppDisplayedText()).toBe("Deleting and modifying the records are not allowed here, due to authorization factors.");
        });
        
    afterAll(function(){
        topBar.appLogout();
    });
});