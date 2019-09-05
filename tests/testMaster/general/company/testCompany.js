var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');
var pageAddCompany =  require('../../../../pages/master/general/company/pageAddCompany.js');
var pageCompany =  require('../../../../pages/master/general/company/pageCompany.js');
var companyData = require('../../../../testdata/masters/General/Company/dataCompany.json');
var loginPage = require('../../../../pages/pageLogin/pageLogin.js');
var loginData = require('../../../../testdata/dataLogin/dataLogin.json');
var hamberger = require('../../../../pages/pageNavigation/hamburgerMenu.js');
var topBar = require('../../../../pages/pageNavigation/topBar.js');


describe('test add company functionality of newage for master module', function() {
    var dataCompany;
    var randomString;
    //creating random String 
    randomString = actionLib.getRandomString(3);  
    console.log("Added Company Name: " + randomString); 

    beforeAll(function(){

        var testSpecName = "TestAddCompany";
        efsLib.setUrlAndLoginApp(loginPage, loginData, testSpecName);
        dataCompany =  companyData.addCompany[0];

    });
    

    it('test_addmastercompany_1 : verify should be able to navigate to add company page', function(){

        hamberger.navigateToPage("Masters","General","Company");

    });

    it('eFSV2-181:: verify should be able to company page save sucessfully', function(){

        actionLib.click(pageCompany.btnAddCompany);
        actionLib.verifyElementPresent(pageAddCompany.textBoxName);
        actionLib.setText(pageAddCompany.textBoxName,randomString);
        actionLib.setText(pageAddCompany.textBoxCode,randomString); 
        efsLib.saveandCancelButton(pageAddCompany.btnSave,"Save");

    });

    it('eFSV2-183 : verify should not able to allow the dupilcate the record', function() {

        actionLib.click(pageCompany.btnAddCompany);
        actionLib.setText(pageAddCompany.textBoxName,randomString); 
        actionLib.setText(pageAddCompany.textBoxCode,randomString);
        efsLib.saveandCancelButton(pageAddCompany.btnSave,"Save");
        actionLib.verifyElementText(pageAddCompany.toastMessage,"none",'Provided Company code is currently available.')
        actionLib.click(pageAddCompany.btnCancel);
        efsLib.saveandCancelButton(pageCompany.btnNo,"No");
        
    });

     it('eFSV2-187: verify should  be able to filter & update sucessfully', function(){
        efsLib.fillTextInTableColumn(dataCompany.company.companyXpathTag,2,2,randomString);
        efsLib.clickRowInAirExportTable(randomString,randomString);
        actionLib.click(pageCompany.btnEditIcon);
        actionLib.setText(pageAddCompany.textBoxName,dataCompany.company.updatedcompanyName);
        actionLib.click(pageAddCompany.btnSave);
        efsLib.fillTextInTableColumn(dataCompany.company.companyXpathTag,2,2,dataCompany.company.updatedcompanyName);
    });

    it('eFSV2-182: verify should  be able to change Hide/Block status sucessfully', function() {

        efsLib.clickRowInAirExportTable(dataCompany.company.updatedcompanyName,dataCompany.company.updatedcompanyName);
        actionLib.click(pageCompany.btnEditIcon);
        efsLib.selectDefaultDropdown(pageAddCompany.dropDownStatus,"Hide"); //hide or block based on the given status 
        actionLib.click(pageAddCompany.btnSave);

    });

    it('eFSV2-185: verify should  be able to  company page delete sucessfully', function(){
        efsLib.fillTextInTableColumn(dataCompany.company.companyXpathTag,2,2,dataCompany.company.updatedcompanyName);  
        efsLib.clickRowInAirExportTable(dataCompany.company.updatedcompanyName,dataCompany.company.updatedcompanyName);
        actionLib.click(pageCompany.btnDeleteIcon);
        actionLib.click(pageCompany.btnYes);
        efsLib.fillTextInTableColumn(dataCompany.company.companyXpathTag,2,2,dataCompany.company.updatedcompanyName); 
    });

    it('eFSV2-186 : verify should not be delete the record if there is any transaction done', function() {

        efsLib.fillTextInTableColumn(dataCompany.company.companyXpathTag,2,2,dataCompany.company.existingCompanyName);
        efsLib.clickRowInAirExportTable(dataCompany.company.existingCompanyName,dataCompany.company.existingCompanyName);
        actionLib.click(pageCompany.btnDeleteIcon);
        actionLib.click(pageCompany.btnYes);
    });  

});