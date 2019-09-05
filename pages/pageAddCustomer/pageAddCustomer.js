var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');


var pageAddCustomer = function () {
    var commonCustomer;
    this.menuMaster = by.xpath("//*[@data-title='Masters']");
    this.menueCRM = by.xpath("//*[@class='col-xs-9 ptb14 pl10 ng-binding'][text()='eCRM']");
    this.menuCustomer = by.xpath("//*[@class='col-xs-9 ptb14 pl10 ng-binding'][text()='Customer']");
    this.btnAddCustomer = by.className("btn btn-primary btn-xs btn-property accent-btn ng-binding");
    
    this.dropDownName = by.id("partyName");
    this.dropDownGrade = by.id("gradeName");
    this.dropDownCountry = by.id("partyCountry");
    this.btnSave = by.xpath("//input[@class='btn accent-btn']");
    this.btnCancel = by.xpath("//button[@class='btn cancel-btn']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");

// tabAddCustomerAddress - locators
    this.tabAdrress = by.xpath("//button[contains(text(),'address')]");
    this.dropDownType = by.id("addressType0");
    this.uiSwitchCorporate = by.xpath("//span[@ng-model='partyAddressMaster.corporate']");
    this.textBoxAddress1 = by.id("addressLine1PartyMaster0");
    this.textBoxAddress2 = by.model("partyAddressMaster.addressLine2");
    this.textBoxAddress3 = by.model("partyAddressMaster.addressLine3");
    this.textBoxContactName = by.id("conName0");
    this.textBoxEmailInAddress = by.id("addressemail0");
    this.textBoxPhoneNo = by.model("partyAddressMaster.phone");
    this.textBoxMobileNo = by.model("partyAddressMaster.mobileNo");
    this.textBoxFaxNo = by.model("partyAddressMaster.fax");
    this.dropDownCity = by.id("city0");
    this.textBoxZipCode = by.id("poZip0");
    this.dropDownStateProvince = by.id("stateProvince0");
    this.textBoxBranchSlNo = by.model("partyAddressMaster.partyCountryField.branchSlNo");
    this.textBoxBankDlrCodeNo = by.model("partyAddressMaster.partyCountryField.bankDLRCode");

// tabAddCustomerMoreInfo - locators
    this.tabMoreInfo = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'More Info')]");
    this.textCustomerType = by.xpath("//*[contains(text(),'Customer Type ')]");
    this.dropDownVerticals = by.model("form-control ng-touched ng-dirty ng-empty ng-valid-editable ng-valid ng-valid-parse");
    this.textBoxIataCode = by.id("iataCode");
    this.textBoxVatNo = by.id("vatCompliance");
    this.textBoxPanNo = by.id("panNo");
    this.textBoxSvtRegnNo = by.id("svtNo");
    this.textBoxTinNo = by.id("tinNo");
    this.textBoxRacNum = by.id("racNo");
    this.textBoxAccountNum = by.id("accNumber");
    this.uiSwitchQuoteOutput = by.xpath("//span[@ng-model='partyMaster.partyDetail.matchInvoiceQuoteOutput']");
    this.uiSwitchBlanketNomination = by.xpath("//span[@ng-model='partyMaster.partyDetail.isBlanketNomination']");
    this.uiSwitchDirectStatusUpdateToConsignee = by.xpath("//span[@ng-model='partyMaster.partyDetail.directStatusUpdate']");
    this.uiSwitchDefaulter = by.model("partyMaster.isDefaulter");
    this.textBoxPersonalIdNum = by.id("pin");
    this.textBoxTsaRegistrationNum = by.id("tsaNo");
    this.textBoxSpotNum = by.id("spotNo");

// tabAddCustomerContact - locators
    //Official Info tab under Contact
    this.tabContact = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'Contact')]");
    this.textBoxFirstName = by.id("firstNameContact0");
    this.textBoxLastName = by.model("contact.lastName");
    this.uiSwitchCall = by.xpath("//span[@ng-model='contact.isCall']");
    this.uiSwitchSendEmail = by.xpath("//span[@ng-model='contact.isSendMail']");
    this.uiSwitchPrimary = by.xpath("//span[@ng-model='contact.isPrimary']");
    this.textBoxDesignation = by.id("designation0");
    this.textBoxDepartment = by.model("contact.department");
    this.textAreaAddress = by.model("contact.officalAddress");
    this.textBoxOfficePhone = by.model("contact.officalPhone");
    this.textBoxMobileNum = by.model("contact.officalMobile");
    this.textBoxFax = by.model("contact.officalFax");
    this.textBoxEmailInContact = by.id("officalEmail0");
    this.textBoxAssistantName = by.model("contact.assistantName");
    this.textBoxAssistantPhoneNo = by.model("contact.assistantPhone");
    this.textBoxPreferredCallTime = by.model("contact.preferredCallTime");
    this.textBoxReportingTo = by.model("contact.reportingTo");
    this.uiSwitchEngagedUsPrevious = by.xpath("//span[@id='engagedPrevious']");
    this.textBoxFormerCompany = by.model("contact.formerCompany");

    //Personal Info tab under Contact
    this.tabPersonalInfo = by.xpath("//*[contains(text(),'Personal Info')]");
    this.textAreaPersonalAddress = by.id("personalAddress0");
    this.textBoxHomePhone = by.model("contact.personalPhone");
    this.textBoxPersonalMobileNo = by.model("contact.personalMobile");
    this.textBoxPersonalFax = by.model("contact.personalFax");
    this.textBoxPersonalEmail = by.id("contactpersonemail0");
    this.textBoxQualification = by.model("contact.qualification");
    this.uiSwitchMarried = by.xpath("//span[@ng-model='contact.isMarried']");
    this.textBoxChildren = by.model("contact.noOfChildren");
    this.btnAddRelation = by.xpath("//button[@class='btn btn-primary btn-xs accent-btn']");
    this.textBoxRelationFirstName = by.id("rFirstName0");
    this.textBoxRelationLastName = by.model("relation.lastName");
    this.calenderEventDate = by.id("eventDate0");
    this.textBoxRemarks = by.id("rNote0");

    //Remarks tab under Contact
    this.tabRemarks = by.xpath("//button[@class='btn default'][contains(text(),'Remarks')]");
    this.textAreaRemarks = by.id("contactRemarks0");

// tabAddCustomerServiceDevision - locators
    this.tabServiceDivision = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'service & division')]");
    this.dropDownLocationInService = by.id("locationService0");
    this.dropDownServiceInService = by.id("servicename0");
    this.dropDownTos = by.id("tosService0");
    this.dropDownDivisionInDevision = by.id("divisionServiceName0");

// tabAddCustomerAccounts - locators
    this.tabAccounts = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'accounts')]");
    this.dropDownPaymentSchedule = by.id("paymentSchedule");
    this.textBoxCafPercentage = by.id("caf");
    this.textBoxCcPercentage = by.id("cc");
    this.uiSwitchBillingActual = by.xpath("//span[@id='fscor']");
    this.textBoxTdsPercentage = by.id("tds");
    this.textBoxCstNo = by.model("partyMaster.partyDetail.cstNo");
    this.dropDownAccount = by.id("accountsName0");
    this.dropDownCurrencyCode = by.id("currencyCode0");
    this.dropDownBillingAccountName = by.id("billingAccountName0");

// tabAddCustomerCredit - locators
    this.tabCredit = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'credit')]");
    this.dropDownLocationInCredit = by.id("locationName0");
    this.dropDownServiceInCredit = by.id("serviceCredit0");
    this.dropDownDivisionInCredit = by.id("division0");
    this.textBoxCreditDays = by.id("creditDays0");
    this.textBoxPublishCreditDays = by.model("partyCredit.publishCreditDays");
    this.textBoxCreditAmount = by.model("partyCredit.creditAmount");

// tabAddCustomerEmail - locators
    this.tabEmail = by.className("btn paddmenu5 text-inherit btn-normal");
    this.textBoxEmailInEmail = by.id("partyEmailMapping0");
    this.dropDownLocationInEmail = by.xpath("//input[@ng-model='partyEmailMapping.locationMaster'][@aria-invalid='false']");
    this.dropDownOriginCountry = by.id("origin0");
    this.dropDownDestinCountry = by.id("destination0");
    this.uiSwitchHaz = by.xpath("//span[@id='imco0']");

// tabAddCustomerProfiles - locators
    this.tabProfiles = by.xpath("//button[@class='btn paddmenu5 btn-normal'][contains(text(),'Profiles')]");
    this.dropDownServiceInProfile = by.id("serviceBusinessDetail0");
    this.dropDownTermsOfShipment = by.id("bussinessTos0");
    this.dropDownOrigin = by.id("bussinessOrigin0");
    this.dropDownDestination = by.id("bussinessDestination0");
    this.dropDownFrequency = by.id("bussinessFrequency0");
    this.dropDownCommodityGrp = by.id("bussinesscommodity0");
    this.dropDownUnit = by.id("businessUnit0");
    this.textBoxVolume = by.id("bussinessnoOfUnit0");
    this.textBoxNoOfShipment = by.id("noOfShipments0");
    this.textBoxEstRevenue = by.id("estimatedRevenue0");
   
    this.addExportCustomer = function (customer) {

        globalData.globalData.customerName= customer.name + actionLib.getTodayTime();
        console.log("Added Customer Name: " +  globalData.globalData.customerName);
        actionLib.setText(this.dropDownName, globalData.globalData.customerName);
        actionLib.setText(this.dropDownGrade, customer.grade);
        actionLib.setText(this.dropDownCountry, customer.country); 
    }

    this.addImportCustomer = function(customer) {
        
         globalData.globalData.importCustomerName= customer.name + actionLib.getTodayTime();
         console.log("Added Customer Name: " +  globalData.globalData.importCustomerName);
         actionLib.setText(this.dropDownName, globalData.globalData.importCustomerName);
         actionLib.setText(this.dropDownGrade, customer.grade);
         actionLib.setText(this.dropDownCountry, customer.country); 
    }

    // tabAddCustomerAddress - functionality
    this.fillType = function (strType) {
        var reqElement;
        reqElement = by.xpath("//select[@id='addressType0']/option[@label='" + strType + "']");
        actionLib.click(reqElement);
    }

    this.addCustomerAddress = function (address) {
        this.fillType(address.type);
        actionLib.setText(this.textBoxAddress1, address.address1);
        actionLib.setText(this.textBoxAddress2, address.address2);
        actionLib.setText(this.textBoxAddress3, address.address3);
        actionLib.click(this.uiSwitchCorporate);
        actionLib.setText(this.textBoxContactName, address.contactName);
        actionLib.setText(this.textBoxEmailInAddress, address.email);
        actionLib.setText(this.textBoxPhoneNo, address.phoneNumber);
        actionLib.setText(this.textBoxMobileNo, address.mobileNumber);
        actionLib.setText(this.textBoxFaxNo, address.faxNumber);
        actionLib.setText(this.dropDownCity, address.city);
        actionLib.setText(this.textBoxZipCode, address.zipCode);

        // actionLib.scrollToElement(this.dropDownStateProvince);
        actionLib.setText(this.dropDownStateProvince, address.stateProvince);

        // actionLib.scrollToElement(this.textBoxBranchSlNo);
        actionLib.setText(this.textBoxBranchSlNo, address.branchSlNum);

        // actionLib.scrollToElement(this.textBoxBankDlrCodeNo);
        actionLib.setText(this.textBoxBankDlrCodeNo, address.bankDlrCodeNum);
    }

// tabAddCustomerMoreInfo - functionality
    //strCustomerType attribute is id of customer type field's option
    this.fillCustomerType = function (strCustomerType) {
        var reqElement;
        reqElement = by.xpath("//label[@for='" + strCustomerType + "']");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerMoreInfo = function (moreInfo) {
        // this.fillCustomerType(moreInfo.customerType); // defaultly customer is checked
        // actionLib.setText(this.dropDownVerticals, moreInfo.vertical); // locator is not working
        
        // var iataCode = actionLib.getTodayTime();
        // var vatNumber = actionLib.getTodayTime();
        // var PanNumber = actionLib.getTodayTime();
        // var svtRegnNumber = actionLib.getTodayTime();
        // var tinNumber = actionLib.getTodayTime();
        var racNum = actionLib.getTodayTime();
        // var accountNum = actionLib.getTodayTime();
        // var personalIdNum = actionLib.getTodayTime();
        // var tsaRegistrationNum = actionLib.getTodayTime();
        // var spotNum = actionLib.getTodayTime();
        if(moreInfo.customerType== "Agent"){
            // actionLib.scrollToElement(this.textBoxIataCode);
            actionLib.setText(this.textBoxIataCode, moreInfo.iataCode);
        }
        actionLib.setText(this.textBoxVatNo, moreInfo.vatNumber);
        actionLib.setText(this.textBoxPanNo, moreInfo.PanNumber);
        actionLib.setText(this.textBoxSvtRegnNo, moreInfo.svtRegnNumber);
        actionLib.setText(this.textBoxTinNo, moreInfo.tinNumber);
        // actionLib.scrollToElement(this.textBoxRacNum);
        actionLib.setText(this.textBoxRacNum, racNum);
        actionLib.setText(this.textBoxAccountNum, moreInfo.accountNum);
        // actionLib.scrollToElement(this.uiSwitchQuoteOutput);
        actionLib.click(this.uiSwitchQuoteOutput);
        actionLib.click(this.uiSwitchBlanketNomination);
        actionLib.click(this.uiSwitchDirectStatusUpdateToConsignee);
       // actionLib.click(this.uiSwitchDefaulter);
        // actionLib.scrollToElement(this.textBoxPersonalIdNum);
        actionLib.setText(this.textBoxPersonalIdNum, moreInfo.personalIdNum);
        actionLib.setText(this.textBoxTsaRegistrationNum, moreInfo.tsaRegistrationNum);
        actionLib.setText(this.textBoxSpotNum, moreInfo.spotNum);
    }

    this.fillSalutation = function (strSalutation) {
        reqElement = by.xpath("//select[@id='contactSalutation0']/option[@label='" + strSalutation + "']");
        actionLib.click(reqElement);
    }

    this.fillRelationSalutation = function (strSalutation) {
        reqElement = by.xpath("//select[@id='PartyRelatSaluation0']/option[@label='" + strSalutation + "']");
        actionLib.click(reqElement);
    }

    this.fillRelationShip = function (strRelationShip) {
        reqElement = by.xpath("//select[@ng-model='relation.relationShip']/option[@label='" + strRelationShip + "']");
        actionLib.click(reqElement);
    }

    this.fillRelationEvent = function (strEvent) {
        reqElement = by.xpath("//select[@id='rPersonalEvent0']/option[@label='" + strEvent + "']");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerContactOfficial = function (contactOfficial) {
        this.fillSalutation(contactOfficial.salutation);
        actionLib.setText(this.textBoxFirstName, contactOfficial.firstName);
        actionLib.setText(this.textBoxLastName, contactOfficial.lastName);
        actionLib.click(this.uiSwitchCall);
        actionLib.click(this.uiSwitchSendEmail);
        actionLib.click(this.uiSwitchPrimary);
        actionLib.setText(this.textBoxDesignation, contactOfficial.designation);
        actionLib.setText(this.textBoxDepartment, contactOfficial.department);
        actionLib.setText(this.textAreaAddress, contactOfficial.address);
        actionLib.setText(this.textBoxOfficePhone, contactOfficial.officePhoneNum);
        actionLib.setText(this.textBoxMobileNum, contactOfficial.mobileNum);
        actionLib.setText(this.textBoxFax, contactOfficial.faxNum);
        actionLib.setText(this.textBoxEmailInContact, contactOfficial.email);
        actionLib.setText(this.textBoxAssistantName, contactOfficial.assistantName);
        actionLib.setText(this.textBoxAssistantPhoneNo, contactOfficial.assistantPhoneNum);
        actionLib.setText(this.textBoxPreferredCallTime, contactOfficial.preferredCallTime);
        actionLib.setText(this.textBoxReportingTo, contactOfficial.reportingTo);
        actionLib.click(this.uiSwitchEngagedUsPrevious);
        actionLib.setText(this.textBoxFormerCompany, contactOfficial.formerCompany);

    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerContactPersonal = function (contactPersonal) {
        actionLib.setText(this.textAreaPersonalAddress, contactPersonal.personalAddress);
        actionLib.setText(this.textBoxHomePhone, contactPersonal.homePhone);
        actionLib.setText(this.textBoxPersonalMobileNo, contactPersonal.personalMobileNum);
        actionLib.setText(this.textBoxPersonalFax, contactPersonal.personalFaxNum);
        actionLib.setText(this.textBoxPersonalEmail, contactPersonal.personalEmail);
        actionLib.setText(this.textBoxQualification, contactPersonal.qualification);
        actionLib.click(this.uiSwitchMarried);
        actionLib.setText(this.textBoxChildren, contactPersonal.children);
        actionLib.click(this.btnAddRelation);
        this.fillRelationSalutation(contactPersonal.relationSalutation);
        actionLib.setText(this.textBoxRelationFirstName, contactPersonal.relationFirstName);
        actionLib.setText(this.textBoxRelationLastName, contactPersonal.relationLastName);
        this.fillRelationShip(contactPersonal.relationShip);
        this.fillRelationEvent(contactPersonal.event);
        actionLib.setText(this.calenderEventDate, actionLib.getTodayDate());
        actionLib.setText(this.textBoxRemarks, contactPersonal.remarks);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerContactRemarks = function (strRemarks) {
            actionLib.setText(this.textAreaRemarks, strRemarks);
    }

    this.fillLocationInServiceDevision = function () {
        reqElement = by.xpath("//input[@id='locationService0']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillServiceInServiceDevision = function (strService) {
        actionLib.setText(this.dropDownServiceInService, strService);
        reqElement = by.xpath("//strong[contains(text(),'" + strService + "')]");
        actionLib.click(reqElement);
    }

    this.fillSalesman = function () {
        reqElement = by.xpath("//input[@id='salesmanService0']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillCustomerService = function () {
        reqElement = by.xpath("//input[@id='customerService0']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillCompany = function () {
        reqElement = by.xpath("//input[@input-focus=''][@ng-model='partyCompany.companyMaster']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerServiceDivision = function ( serviceDevision) {
        this.fillLocationInServiceDevision(serviceDevision.serviceLocation);
        this.fillServiceInServiceDevision(serviceDevision.serviceService);
        this.fillSalesman(serviceDevision.serviceSalesman);
        this.fillCustomerService(serviceDevision.serviceCustomerService);
        actionLib.setText(this.dropDownTos, serviceDevision.serviceTos);
        this.fillCompany(serviceDevision.divisionCompany);
        actionLib.setText(this.dropDownDivisionInDevision, serviceDevision.divisionDivision);
    }

    this.fillPaymentSchedule = function (strPaymentSchedule) {
        actionLib.setText(this.dropDownPaymentSchedule, strPaymentSchedule);
        reqElement = by.xpath("//strong[contains(text(),'" + strPaymentSchedule + "')]");
        actionLib.click(reqElement);
    }

    this.fillLocationInMapping = function () {
        reqElement = by.xpath("//input[@input-focus=''][@ng-model='partyAccount.locationMaster']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillTermCode = function (strTermCode) {
        reqElement = by.xpath("//select[@id='termCode0']/option[@label='" + strTermCode + "']");
        actionLib.click(reqElement);
    }

    this.fillTaxExempted = function (strTaxExempted) {
        reqElement = by.xpath("//select[@id='taxExempted0']/option[@label='" + strTaxExempted + "']");
        actionLib.click(reqElement);
    }

    this.fillStatus = function (strStatus) {
        reqElement = by.xpath("//select[@id='status0']/option[@label='" + strStatus + "']");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerAccounts = function (customerAccount) {

        this.fillPaymentSchedule(customerAccount.paymentSchedule);
        actionLib.setText(this.textBoxCafPercentage, customerAccount.cafPercentage);
        actionLib.setText(this.textBoxCcPercentage, customerAccount.ccPercentage);
        actionLib.click(this.uiSwitchBillingActual);
        actionLib.setText(this.textBoxTdsPercentage, customerAccount.tdsPercentage);
        actionLib.setText(this.textBoxCstNo, actionLib.getTodayTime());
        this.fillLocationInMapping(customerAccount.location);
        actionLib.setText(this.dropDownAccount, customerAccount.account);
        this.fillTermCode(customerAccount.termCode);
        actionLib.setText(this.dropDownCurrencyCode, customerAccount.currencyCode);
        actionLib.setText(this.dropDownBillingAccountName, customerAccount.billingAccountName);
        this.fillTaxExempted(customerAccount.taxExempted);
        this.fillStatus(customerAccount.status);
    }

// tabAddCustomerCredit - functionality
    this.fillLocationInCredit = function () {
        reqElement = by.xpath("//input[@id='locationName0']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillServiceInCredit = function (strService) {
        actionLib.setText(this.dropDownServiceInCredit, strService);
        reqElement = by.xpath("//strong[contains(text(),'" + strService + "')]");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerCredit = function (customerCredit) {
        this.fillLocationInCredit(customerCredit.location);
        this.fillServiceInCredit(customerCredit.service);
        actionLib.setText(this.dropDownDivisionInCredit, customerCredit.division);
        actionLib.setText(this.textBoxCreditDays, customerCredit.creditDays);
        actionLib.setText(this.textBoxPublishCreditDays, customerCredit.publishedCreditDays);
        actionLib.setText(this.textBoxCreditAmount, customerCredit.creditAmount);
    }

// tabAddCustomerEmail - functionality 
    this.fillLocationInEmail = function () {
        var reqElement;
        reqElement = by.xpath("//input[@ng-model='partyEmailMapping.locationMaster'][@aria-invalid='false']/../..//span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    //specify "none" for parameters which you don't want to fill
    this.addCustomerEmail = function (customerEmail) {
        actionLib.setText(this.textBoxEmailInEmail, customerEmail.email);
        this.fillLocationInEmail(customerEmail.location);
        actionLib.setText(this.dropDownOriginCountry, customerEmail.originCountry);
        actionLib.setText(this.dropDownDestinCountry, customerEmail.destinCountry);
        actionLib.click(this.uiSwitchHaz);
    }

// tabAddCustomerProfile - functionality
    this.fillServiceInProfile = function (strService) {
        actionLib.setText(this.dropDownServiceInProfile, strService);
        reqElement = by.xpath("//strong[contains(text(),'" + strService + "')]");
        actionLib.click(reqElement);
    }

    this.fillFrequency = function (strFrequency) {
        actionLib.setText(this.dropDownFrequency, strFrequency);
        reqElement = by.xpath("//strong[contains(text(),'" + strFrequency + "')]");
        actionLib.click(reqElement);
    }

    this.fillCurrentPotential = function (strCurrentPotential) {
        reqElement = by.xpath("//select[@id='currentPotential0']/option[@label='" + strCurrentPotential + "']");
        actionLib.click(reqElement);
    }


    this.addCustomerProfiles = function (customerProfile) {
        this.fillServiceInProfile(customerProfile.service);
        actionLib.setText(this.dropDownTermsOfShipment, customerProfile.termsOfShipment);
        actionLib.setText(this.dropDownOrigin, customerProfile.origin);
        actionLib.setText(this.dropDownDestination, customerProfile.destination);
        this.fillFrequency(customerProfile.frequency);
        actionLib.setText(this.dropDownCommodityGrp, customerProfile.commodityGrp);
        actionLib.setText(this.dropDownUnit, customerProfile.unit);
        actionLib.setText(this.textBoxVolume, customerProfile.volume);
        actionLib.setText(this.textBoxNoOfShipment, customerProfile.noOfShipment);
        actionLib.setText(this.textBoxEstRevenue, customerProfile.estRevenue);
        this.fillCurrentPotential(customerProfile.currentPotential);
    }

    this.verifyAddedCustomer = function (strCustomerName) {
        var reqElement;
        reqElement = by.xpath("//td[@title='" + strCustomerName + "']");
        return reqElement;
    }

};
module.exports = new pageAddCustomer();