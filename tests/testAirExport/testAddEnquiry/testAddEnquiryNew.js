var loginPage = require('../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../testdata/dataLogin/dataLogin.json');
var actionLib = require('../../../library/action.js');
var application    = require('../../../library/appspecificactions.js');
var hamburger = require('../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../pages/pageNavigation/topBar.js');
var addEnquiryPage = require('../../../pages/sales/enquiry/pageAddEnquiry.js');
var enquiryPage = require('../../../pages/sales/enquiry/pageEnquiry.js');
var addEnquiryDataFull = require('../../../testdata/sales/enquiry/enquiry.json');



describe('test export add enquiry functionality of newage', function () {
    

    beforeAll(function(){
        var testSpecName = "TestAddEnquiry";
        application.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        addEnquiryData = addEnquiryDataFull.airExport;
    })

    it('test_addexportenquiry_1 : ', function () {
        hamburger.navigateToPage('Sales', 'Enquiry');
        enquiryPage.clickOn('Add Enquiry');

        addEnquiryPage.setPrimary(addEnquiryData.primary);
    });

    it('test_addexportenquiry_2 : ', function () {
        addEnquiryData.services.forEach(function (service, serviceIndex) {
            addEnquiryPage.service.addService(service, serviceIndex);
            addEnquiryPage.accordion('open','Dimensions');
            addEnquiryPage.dimensions.addDimensions(service.dimensions);
            addEnquiryPage.accordion('close','Dimensions');
            addEnquiryPage.accordion('open','Pick Up / Delivery');
            addEnquiryPage.pickUpDelivery.enterAdressDetails(service.pickUpDelivery);
            addEnquiryPage.accordion('close','pick up / delivery');
            addEnquiryPage.accordion('open','Value Added Services');
            addEnquiryPage.valueAddedServices.addService(service.valueAddedService);
            addEnquiryPage.accordion('close','Value Added Services');
            addEnquiryPage.accordion('open','Rate Request');
            addEnquiryPage.rateRequest.addVendor(service.rateRequest);
            addEnquiryPage.accordion('close','Rate Request');
        });
    });
    it('test_addexportenquiry_3 : ', function () {
        addEnquiryPage.clickOn('save');
        addEnquiryPage.getEnquiryId().then(function (reqId) {
            console.log(reqId);
        })
        addEnquiryPage.clickConfirmationPopupAs('Ok');
        browser.sleep(30000); // to handle the popup manually
    });

    afterAll(function () {
        topBar.appLogout();
    });

    
});