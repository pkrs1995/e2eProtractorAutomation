var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var fileUploadLogoPath = '../testdata/dataFiles/companyLogo.jpg';
var fileUploadChargeSetupPath = '../testdata/dataFiles/charge_template.xlsx';
var fileUploadCustomerPath = '../testdata/dataFiles/customerTemplate.xlsx';
var fileUploadAgentPath = '../testdata/dataFiles/agentTemplate.xlsx';
var dataAddcompany = require('../../testdata/dataRegistration/dataCompanyRegistration.json');
datacompany =  dataAddcompany.companyRegistration[0];

var pageCompanyRegistration = function () {

    this.linkSignUp = by.xpath("//ul[@class='list-inline pull-left']//a[contains(text(),'SIGN UP')]");
    this.iconCompany = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Company')]");
    this.textBoxFirstName = by.id('locationSetup.firstName');
    this.textBoxLastName = by.id('locationSetup.lastName');
    this.textBoxEmail = by.id('email');
    this.dropDownCountryName = by.id('locationSetup.countryMaster');
    this.dropDownTimeZone = by.id('timeZone');
    this.dropDownStateProvince = by.id('stateProvince');
    this.dropDownCityName = by.id('locCity');
    this.textBoxCompanyName = by.id('locationSetup.companyRegisteredName');
    this.textBoxPhoneNumber = by.id('locationSetup.phone');
    this.textBoxMobileNumber = by.id('locationSetup.mobile');
    this.textBoxAddress1 = by.id('locationSetup.addressLine1');
    this.textBoxAddress2 = by.id('locationSetup.addressLine2');
    this.textBoxAddress3 = by.id('locationSetup.addressLine3');
    this.textBoxArea = by.id('locationSetup.area');
    this.textBoxZipCode = by.id('zipCode');
    this.buttonNext = by.id('nextCompanyTab');
    this.iconLoginCreation = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Login Creation')]");
    this.fileToUploadPath = by.css('input[type="file"]');
    this.msgSuccessfulFileUpload = by.className("ui-notification ng-scope success clickable");
    this.strChildLocator = by.xpath("//span[@class='error-message']");
    this.buttonBack = by.className('btn btn-xs btn-property accent-btn');

// pageloginCreationRegistration - locators
    this.textBoxPosition = by.id('locationSetup.position');
    this.textBoxUserName = by.id('locationSetup.userName');
    this.textBoxPassword = by.id('password-field');
    this.textBoxconfirmPassword = by.id('locationSetup.confirmPassword');
    this.dropDownButtonSelectService = by.id("locationSetup.serviceList");
    this.linkSelectAllSelectService = by.xpath("//button[@class='btn btn-link btn-xs' and @ng-click='checkAll()']");
    this.buttonNextInLoginCreation = by.className('btn btn-primary btn-xs btn-property accent-btn');
    this.iconConfiguration = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Configuration')]");
    this.buttonBackInLoginCreation  = by.xpath("//button[@ng-click=\"saveLoginTab('app.company')\"]");
    this.passwordMandate = by.xpath("//span[@data-id='login_tab_passwordError']");
    this.confirmPasswordMandate = by.xpath("//span[@data-id='login_tab_confirmPasswordError']");

// pageConfigurationRegistration - locators
    this.dropDownCurrency = by.id('currencyMaster');
    this.dropDownLanguage = by.id('language');
    this.textBoxDecimal = by.model('locationSetup.currencyMaster.decimalPoint');
    this.textMeasurementOption = by.className('opc-5');
    this.uiSwitchMeasurement = by.xpath("//span[@id='measurement']");
    this.calenderFinancialStartMonthYear = by.model('locationSetup.financialStartDate');
    this.calenderFinancialEndMonthYear = by.model('locationSetup.financialEndDate');
    this.buttonNextInConfiguration = by.className('btn btn-primary btn-xs btn-property accent-btn');
    this.buttonBackInConfiguration = by.xpath("//button[@ng-click=\"saveLocationConfiguration('app.login')\"]");
    this.iconCustomerAgent = by.xpath("//div[contains(text(),'Customer/Agent Upload')]");

// pagecustomerAgentUploadRegistaration - locator
     this.fileUploadCustomer = by.xpath("//input[@type='file'][@ng-model='customer.file']");
     this.fileUploadAgent = by.xpath("//input[@type='file'][@ng-model='agent.file']");
    this.buttonNextInCustAgentUpload = by.xpath("//*[@ng-click=\"saveMetaConfigTab('app.finance')\"]");
    this.buttonBackInCustAgentUpload = by.xpath("//button[@ng-click=\"saveMetaConfigTab('app.configuration')\"]");
    this.custDataValidationMessage = by.xpath("//*[@class='ui-notification ng-scope success clickable']/div");
    this.agentDataValidationMessage = by.xpath("//*[@class='ui-notification ng-scope success clickable']/div");
    this.msgSuccessfulFileUpload = by.className("ui-notification ng-scope success clickable");
    this.strChildLocator = by.className("message ng-binding");
    this.iconFinanceSetup = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Finance Setup')]");


    // pageFinaceSetupRegistration - locator
    this.buttonNextFinaceSetUp = by.xpath("//*[@ng-click=\"saveFinanceTab('app.charge')\"]");
    this.buttonBackFinaceSetUp = by.xpath("//button[@ng-click=\"saveFinanceTab('app.metaconfig')\"]");
    this.uiSwitchQuoteNeedApproval = by.xpath("//span[@id='quote']"); 
    this.uiSwitchProvisionalCost = by.xpath("//span[@id='provisional']");
    this.textBoxInvoiceHeaderNote = by.model("locationSetup.invoiceHeaderNote");
    this.textBoxInvoiceFooterNote = by.model("locationSetup.invoiceFooterNote");
    this.iconChargeSetup = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Charge Setup')]");


// pageChargeSetupRegistration - locator
    this.textBoxChargeName = by.id("0chargeName");
    this.textBoxChargeCode = by.id("0chargeCode");
    this.buttonUploads = by.xpath("//a[@ng-click=\"chargeMasterUpload('chargeMaster','chargeBtn')\"]");
    this.fileUploadMultipleRecordsPath = by.xpath("//input[@type='file'][@ng-model='chargeMaster.file']");
    this.buttonNextInChargeSetUp = by.xpath("//button[@ng-click=\"saveChargeSetup('app.others')\"]");
    this.buttonBackInChargeSetUp = by.xpath("//button[@ng-click=\"saveChargeSetup('app.finance')\"]");
    this.iconChargeSetup = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Charge Setup')]");
    this.iconOthers = by.xpath("//a[@class='bs-wizard-dot bs-wizard-dotchange']/../div[contains(text(),'Others')]");
    this.msgSuccessfulFileUploadInChargeSetup = by.className("ui-notification ng-scope success clickable");
    this.strChildLocatorInChargeSetup = by.className("message ng-binding");

// pageOthersRegistration - functionality
    this.tabCodeSetup = by.xpath("//li[@ng-click = \"setTab('job_no_tab')\"]");
    this.tabJobDateSetup = by.xpath("//li[@ng-click = \"setTab('job_date_tab')\"]");
    this.tabAccountDocNumberSetup = by.xpath("//li[@ng-click = \"setTab('accounts_tab')\"]");
    this.buttonExportETD = by.xpath("//button[@data-state='ETD']");
    this.buttonExportCurrentDate = by.xpath("//button[@id='exportTransportMode'][@data-state='Current Date']");
    this.buttonImportETA = by.xpath("//button[@data-state='ETA']");
    this.buttonImportCurrentDate = by.xpath("//button[@id='importTransportMode'][@data-state='Current Date']");
    this.textBoxDaybookCode = by.id("daybookObj.daybookCode0");
    this.textBoxDaybookName = by.id("daybookObj.daybookName0");
    this.dropDownDocumentType = by.id("documentTypeMaster");
    this.textBoxPrefix = by.id("daybookObj.prefix0");
    this.textBoxStartingNo = by.id("daybookObj.currentSequenceValue0");
    this.textBoxSuffix = by.id("daybookObj.suffix0");
    this.textBoxSeparator = by.id("daybookObj.separator0");
    this.textSignUpSuccessfulSubmission = by.className("modal-title text-center pt10");
    this.textSignUpEmailActivation = by.xpath("//*[@class='modal-title text-center']");
    this.buttonFinish = by.className('btn btn-primary btn-xs btn-property accent-btn');
    this.buttonBackInOthers = by.className('btn btn-xs btn-property accent-btn');

   

    
// pageCompanyRegistration - functionality
    this.fillSalutation = function (strSalutation) {
        var reqElement;
        if (strSalutation != "none") {
            reqElement = by.xpath("//select[@id='locationSetup.salutation']/option[@label='" + strSalutation + "']");
            actionLib.click(reqElement);
        }
    }

     this.fillDateFormat = function (strDateFormat) {
        var reqElement;
        if (strDateFormat != "none") {
            reqElement = by.xpath("//select[@id='dateFormat']/option[@label='" + strDateFormat + "']");
            actionLib.click(reqElement);
        }
    }
  

       //pageCompany creation -  - functionality
       this.signUpCompanyTab = function (company) {
      //  strCompanyNameData = datacompany.company.companyName + actionLib.getTodayTime();
            this.fillSalutation(company.salutation);
            actionLib.setText(this.textBoxFirstName, company.firstName);
            actionLib.setText(this.textBoxLastName, company.lastName);
            actionLib.setText(this.textBoxEmail, company.email);
            actionLib.setText(this.dropDownCountryName, company.countryName);
            actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
            actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
            actionLib.setText(this.textBoxCompanyName, company.companyName);
            actionLib.setText(this.textBoxAddress1, company.address1);
            actionLib.setText(this.textBoxAddress2, company.address2);
            actionLib.setText(this.textBoxAddress3, company.address3);
            actionLib.setText(this.textBoxArea, company.area);
            actionLib.setText(this.dropDownCityName, company.cityName);
            actionLib.setText(this.textBoxZipCode, company.zipCode);
            actionLib.setText(this.dropDownStateProvince, company.stateProvince);
            actionLib.setText(this.dropDownTimeZone, company.timeZone);
            this.fillDateFormat(company.dateFormat);
            actionLib.uploadFile(this.fileToUploadPath, fileUploadLogoPath);
           actionLib.click(this.buttonNext);
    };

    // pageLoginCreationRegistration - functionality
    this.signUpLoginCreationTab = function (loginCreation) {
            strUserName = datacompany.company.firstName + datacompany.company.lastName ;
            actionLib.setText(this.textBoxPosition, loginCreation.position);
            actionLib.setText(this.textBoxUserName, strUserName);
            actionLib.setText(this.textBoxPassword, loginCreation.password);
            actionLib.setText(this.textBoxconfirmPassword, loginCreation.confirmPassword);
            actionLib.click(this.dropDownButtonSelectService);
            //when want to click on "check all" link under "Select service" dropdown then pass any string 
        //other than "none" in fifth attribute below
            actionLib.click(this.linkSelectAllSelectService);
            actionLib.click(this.buttonNextInLoginCreation);
    };


 //To select current month and year as financial start date on configuration registration screen.
 this.getCurrentMonthYear = function () {

    var objCurrentDate = new Date();
    var strCurrentYear = objCurrentDate.getFullYear();
    var strCurrentMonth = objCurrentDate.getMonth() + 1; //january is 0 so adding 1
    if (strCurrentMonth == 12) {
        strCurrentMonth = 1;
        strCurrentYear = strCurrentYear + 1;
    }
    return (strCurrentYear.toString() + "-" + strCurrentMonth.toString());
};


      //specify "none" for parameters which you don't want to fill
      this.signUpConfigurationTab = function (configuration) {
     
        actionLib.setText(this.dropDownCurrency, configuration.currency);
        actionLib.setText(this.dropDownLanguage, configuration.language);
        actionLib.click(this.uiSwitchMeasurement);
        actionLib.setText(this.calenderFinancialStartMonthYear, this.getCurrentMonthYear());
        actionLib.click(this.buttonNextInConfiguration);
        
};

 
  // pagecustomerAgentUploadRegistaration - functionality
 this.signUpCustomerUploadTab = function () {
        actionLib.uploadFile(this.fileUploadCustomer, fileUploadCustomerPath);
};

this.signUpAgentUploadTab = function () {
    actionLib.uploadFile(this.fileUploadAgent, fileUploadAgentPath);
};


this.signUpFinanceSetupTab = function (financeSetUp) {

        actionLib.click(this.uiSwitchQuoteNeedApproval);
        actionLib.click(this.uiSwitchProvisionalCost);
        actionLib.setText(this.textBoxInvoiceHeaderNote, financeSetUp.invoiceHeaderNote);
        actionLib.setText(this.textBoxInvoiceFooterNote, financeSetUp.invoiceFooterNote);
 
};
 

// pageChargeSetupRegistration - functionality
    this.fillChargeType = function (strChargeType) {
        var reqElement;
        if (strChargeType != "none") {
            reqElement = by.xpath("//select[@id='0chargeType']/option[@label='" + strChargeType + "']");
            actionLib.click(reqElement);
        }
    }

    this.fillCalculationType = function (strCalculationType) {
        var reqElement;
        if (strCalculationType != "none") {
            reqElement = by.xpath("//select[@id='0calculationType']/option[@label='" + strCalculationType + "']");
            actionLib.click(reqElement);
        }
    }

      //specify "none" for parameters which you don't want to fill
      this.signUpChargeSetupTab = function (chargeSetup) {
            actionLib.setText(this.textBoxChargeName, chargeSetup.chargeName);
            actionLib.setText(this.textBoxChargeCode, chargeSetup.chargeCode);
            this.fillChargeType(chargeSetup.chargeType);
            this.fillCalculationType(chargeSetup.calculationType);
            actionLib.uploadFile(this.fileUploadMultipleRecordsPath, fileUploadChargeSetupPath);
            actionLib.explicitWait(5000);
            actionLib.click(this.buttonUploads);
    };

// pageOthersRegistration - functionality

    this.fillNoOfDigits = function(strNoOfDigits){
        var reqElement;
        if (strNoOfDigits != "none") {
            reqElement = by.xpath("//select[@id='daybookObj.noOfDigits0']/option[@label='" + strNoOfDigits + "']");
            actionLib.click(reqElement);
        }
    }

    this.fillYearOption = function (strYearOption) {
        var reqElement;
        if (strYearOption != "none") {
            reqElement = by.xpath("//select[@id='daybookObj.isYear0']/option[@label='" + strYearOption + "']");
            actionLib.click(reqElement);
        }
    }

    this.fillMonthOption = function (strMonthOption) {
        var reqElement;
        if (strMonthOption != "none") {
            reqElement = by.xpath("//select[@id='daybookObj.isMonth0']/option[@label='" + strMonthOption + "']");
            actionLib.click(reqElement);
        }
    }

    //specify "none" for parameters which you don't want to fill
    this.signUpCodeSetupTab = function (strDaybookCode) {
        if (strDaybookCode != "none") {
            actionLib.setText(this.textBoxDaybookCode, strDaybookCode);
        }
    };

     //specify "none" for parameters which you don't want to fill
     this.signUpJobDateSetupTab1 = function (others) {
        if (others.jobDateSetupExport != "none") {
            if (others.jobDateSetupExport == "ETD") {
                actionLib.click(this.buttonExportETD);
            }
            else {
                actionLib.click(this.buttonExportCurrentDate);
            }
        }
        if (others.jobDateSetupImport != "none") {
            if (others.jobDateSetupImport == "ETA") {
                actionLib.click(this.buttonImportETA);
            }
            else {
                actionLib.click(this.buttonImportCurrentDate);
            }
        }
    };
    
    //specify "none" for parameters which you don't want to fill
    this.signUpJobDateSetupTab = function (strExportOption, strImportOption) {
        if (strExportOption != "none") {
            if (strExportOption == "ETD") {
                actionLib.click(this.buttonExportETD);
            }
            else {
                actionLib.click(this.buttonExportCurrentDate);
            }
        }
        if (strImportOption != "none") {
            if (strImportOption == "ETA") {
                actionLib.click(this.buttonImportETA);
            }
            else {
                actionLib.click(this.buttonImportCurrentDate);
            }
        }
    };


     //specify "none" for parameters which you don't want to fill
     this.signUpAccountingDocNumTab = function (others) {
            actionLib.setText(this.textBoxDaybookCode, others.daybookCode);
            actionLib.setText(this.textBoxDaybookName, others.daybookName);
            actionLib.setText(this.dropDownDocumentType, others.documentType);
            this.fillNoOfDigits(others.noOfDigits);
            actionLib.setText(this.textBoxPrefix, others.prefix);
            this.fillYearOption(others.yearOption);
            this.fillMonthOption(others.monthOption);
            actionLib.setText(this.textBoxStartingNo, others.startingNumber);
            actionLib.setText(this.textBoxSuffix, others.suffix);
            actionLib.setText(this.textBoxSeparator, others.separator);
    };

   //first name field verfication -  - functionality
  this.firstNamefieldVerfication = function (company) {

    this.fillSalutation(company.salutation);
    actionLib.click(this.buttonNext);
   
};
//last name field verfication -  - functionality
this.lastNamefieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.click(this.buttonNext);

};
//email field verfication -  - functionality
this.emailfieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.click(this.buttonNext);

};
//country field verfication -  - functionality
this.countryfieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.click(this.buttonNext);

};
//phone field verfication -  - functionality
this.phoneNumberfieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.click(this.buttonNext);

};
//company name field verfication -  - functionality
this.companyNamefieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.click(this.buttonNext);

};
//address1 field verfication -  - functionality
this.address1fieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.setText(this.textBoxCompanyName, company.companyName);
actionLib.click(this.buttonNext);

};

//area field verfication -  - functionality
this.areafieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.setText(this.textBoxCompanyName, company.companyName);
actionLib.setText(this.textBoxAddress1, company.address1);
actionLib.setText(this.textBoxAddress2, company.address2);
actionLib.setText(this.textBoxAddress3, company.address3);
actionLib.click(this.buttonNext);

};

//city field verfication -  - functionality
this.cityfieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.setText(this.textBoxCompanyName, company.companyName);
actionLib.setText(this.textBoxAddress1, company.address1);
actionLib.setText(this.textBoxAddress2, company.address2);
actionLib.setText(this.textBoxAddress3, company.address3);
actionLib.setText(this.textBoxArea, company.area);
actionLib.click(this.buttonNext);

};

//time Zone field verfication -  - functionality
this.timeZonefieldVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.setText(this.textBoxCompanyName, company.companyName);
actionLib.setText(this.textBoxAddress1, company.address1);
actionLib.setText(this.textBoxAddress2, company.address2);
actionLib.setText(this.textBoxAddress3, company.address3);
actionLib.setText(this.textBoxArea, company.area);
actionLib.setText(this.dropDownCityName, company.cityName);
actionLib.setText(this.textBoxZipCode, company.zipCode);
actionLib.setText(this.dropDownStateProvince, company.stateProvince);
actionLib.click(this.buttonNext);

};

//existing CompanyName verfication -  - functionality
this.existingCompanyNameVerfication = function (company) {

this.fillSalutation(company.salutation);
actionLib.setText(this.textBoxFirstName, company.firstName);
actionLib.setText(this.textBoxLastName, company.lastName);
actionLib.setText(this.textBoxEmail, company.email);
actionLib.setText(this.dropDownCountryName, company.countryName);
actionLib.setText(this.textBoxPhoneNumber, company.phoneNumber);
actionLib.setText(this.textBoxMobileNumber, company.mobileNumber);
actionLib.setText(this.textBoxCompanyName, company.existingCompanyName);
actionLib.setText(this.textBoxAddress1, company.address1);
actionLib.setText(this.textBoxAddress2, company.address2);
actionLib.setText(this.textBoxAddress3, company.address3);
actionLib.setText(this.textBoxArea, company.area);
actionLib.setText(this.dropDownCityName, company.cityName);
actionLib.setText(this.textBoxZipCode, company.zipCode);
actionLib.setText(this.dropDownStateProvince, company.stateProvince);
actionLib.setText(this.dropDownTimeZone, company.timeZone);
this.fillDateFormat(company.dateFormat);
actionLib.click(this.buttonNext);

};

this.fieldGetErrorTextMessage=function (strInput)
{ 
var reqElement
reqElement=element(by.xpath("//span[@class='error-message']")).getText().then(function(message)
{
    expect(message).toEqual(strInput);
})

} 


};
module.exports = new pageCompanyRegistration();
