var actionLib = require('../../../../library/action.js')
var efsLib    = require('../../../../library/appspecificactions.js');

var pageCurrency = function()  {
    this.btnaddCurrency = by.xpath("//*[@ng-click = 'add()']");

    // locator for currency list page
    this.filteredFirstOption = by.xpath('//*[@id="table-body"]/tr[1]');
    this.statusDropDown = by.xpath("//select[@ng-change='changeFunction()']");

    //locators for currencypreview page
    this.editIcon = by.css("a[ng-click='editCurrency()']");
    this.deleteIcon = by.css("a[ng-click='deleteCurrency()']");
    this.previewFullPage = by.className('panel panel-default detail-transition');
    this.currencyNamePreview = by.xpath('//span[.="Name"]/../h5[@class="ng-binding"]'); 
    this.currencyCodePreview = by.xpath('//span[.="Code"]/../h5[@class="ng-binding"]');
    this.currencyCountryPreview = by.xpath('//span[.="Country"]/../h5[@class="ng-binding"]');
    this.currencyPrefixPreview = by.xpath('//span[.="Prefix"]/../h5[@class="ng-binding"]');
    this.currencySuffixPreview = by.xpath('//span[.="Suffix"]/../h5[@class="ng-binding"]');
    this.currencyDecimalPreview = by.xpath('//span[.="Decimal"]/../h5[@class="ng-binding"]');
    this.currencyDenomiationPreview = by.xpath('//span[.="Denomination"]/../h5[@class="ng-binding"]');

     // popup locators
     this.fullPopup = by.css('.ngdialog-content');
     this.popupText = by.css('.ng-binding');
     this.popupYesButton = by.xpath('//button[.="Yes"]');
     this.popupNoButton = by.xpath('//button[.="No"]');

     this.verifyCurrencyDetails = function (currencyDetail) {
        var nameElement = actionLib.getChainedElement(this.previewFullPage,this.currencyNamePreview)
        var codeElement = actionLib.getChainedElement(this.previewFullPage,this.currencyCodePreview)
        var countryElement = actionLib.getChainedElement(this.previewFullPage,this.currencyCountryPreview)
        var prefixElement = actionLib.getChainedElement(this.previewFullPage,this.currencyPrefixPreview)
        var suffixElement = actionLib.getChainedElement(this.previewFullPage,this.currencySuffixPreview)
        var decimalElement = actionLib.getChainedElement(this.previewFullPage,this.currencyDecimalPreview)
        nameElement.getText().then(function (nameText) {
            expect(nameText).toBe(currencyDetail.name);
        });
        codeElement.getText().then(function (codeText) {
            expect(codeText).toBe(currencyDetail.code);
        });
        countryElement.getText().then(function (countryText) {
            expect(countryText).toContain(currencyDetail.country);
        });
        prefixElement.getText().then(function (prefixText) {
            expect(prefixText).toContain(currencyDetail.prefix);
        });
        suffixElement.getText().then(function(suffixText) {
            expect(suffixText).toContain(currencyDetail.suffix)
        });
        decimalElement.getText().then(function(decimalText){
            expect(decimalText).toContain(currencyDetail.decimal)
        })
    }

    this.verifyCurrencyByCode = function (currencyCode) {
        efsLib.fillTextInTableColumn("currencyArr",2,3,currencyCode);
        efsLib.verifySearchTextInTableRowCol("currencyArr",1,3,currencyCode);
    }

    this.openCurrencyByCode = function (currencyCode) {
        efsLib.fillTextInTableColumn("currencyArr",2,3,currencyCode);
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOnFirstcurrencyRecord = function(){
        actionLib.click(this.filteredFirstOption);
    }

    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "add currency":
                actionLib.click(this.btnaddCurrency);
                break;
            case "edit":
                actionLib.click(this.editIcon);
                break;
            case "delete":
                actionLib.click(this.deleteIcon);
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }

    this.clickConfirmationPopupAs = function (buttonName) {
        switch (buttonName.toLowerCase()) {
            case 'yes':
                actionLib.getChainedElement(this.fullPopup, this.popupYesButton).click();
                break;
            case 'no':
                actionLib.getChainedElement(this.fullPopup, this.popupNoButton).click();
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }



}
module.exports = new pageCurrency();