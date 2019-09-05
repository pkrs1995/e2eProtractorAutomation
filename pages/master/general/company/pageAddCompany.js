var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');

var pageAddCompany = function ()  {  

    //companyPageLocators
    this.textBoxName = by.id('companyName');
    this.textBoxCode =by.id('companyCode');
    this.dropDownStatus = by.id("status");
    this.btnSave = by.className("btn accent-btn");
    this.btnCancel = by.className("btn cancel-btn");

    //error Messages
    this.errorMessage = by.xpath('//span[@class="error-message"]');
    this.toastMessage = by.xpath("//form[@id='companyMasterForm']//span[@class='ng-binding']");
    this.authorizationMsg = by.xpath("//span[@class='ng-binding'][text()='Deleting and modifying the records are not allowed here, due to authorization factors.']");

    };

    module.exports = new pageAddCompany();

