var actionLib = require('../../../../library/action.js')
var efsLib    = require('../../../../library/appspecificactions.js');
var pageCurrency = require('../../../master/general/currency/pageCurrency.js')


var pageAddCurrency = function() {
    //locators for addCurrency page
    this.addCurrencyLabel = by.xpath("//*[@class='panel-heading flexTitle']/div/h4");  
    this.textBoxName = by.id("currencyname");
    this.textBoxSymbol = by.model("currencyMaster.symbol");
    this.textBoxCode = by.id("currencycode");
    this.countryDropDown = by.xpath("//div[@class='select-auto']/div/input[1]");
    this.textBoxPrefix = by.id("prefix");
    this.textBoxSuffix = by.id("currencysuffix");
    this.decimalDropDown = by.model("currencyMaster.decimalPoint");
    this.btnSave = by.xpath("//input[@value='Save']");
    this.btnCancel = by.xpath("//button[@class='btn cancel-btn']");
    this.btnUpdate = by.xpath("//input[@value='Update']");

    //validations Msg for invalid input
    this.ValidationMsg =by.xpath("//small[@class='ng-binding']");

    //popup locators
    this.fullPopup = by.className('ngdialog-content');
    this.popupText = by.className('ng-binding');
    this.popupYesButton = by.xpath('//button[.="Yes"]');
    this.popupNoButton = by.xpath('//button[.="No"]');
    this.popupCancelButton = by.xpath('//button[.="Cancel"]');

    //enter currency details
    this.createCurrency = function(currency) {
        actionLib.click(pageCurrency.btnaddCurrency);
        actionLib.setText(this.textBoxName,currency.name);
        actionLib.setText(this.textBoxCode,currency.code);
        element(this.textBoxCode).sendKeys(protractor.Key.TAB, currency.country); //having xpath probelm
        actionLib.setText(this.textBoxPrefix,currency.prefix);
        actionLib.setText(this.textBoxSuffix,currency.suffix);
        this.selectDropdown(this.decimalDropDown,currency.decimal);
        actionLib.click(this.btnSave); 
    }  

    //update currency details
    this.editCurrencyDetails = function(currency){
        actionLib.setText(this.textBoxName,currency.updatedCurrencyName);
        actionLib.setText(this.textBoxPrefix,currency.prefix);
        actionLib.setText(this.textBoxSuffix,currency.suffix);
        this.selectDropdown(this.decimalDropDown,currency.decimal);
    }

    this.selectDropdown = function (strLocator, strText) {
        browser.wait(protractor.ExpectedConditions.presenceOf(element(strLocator)), 3000);
        reqElement = element(strLocator).element(by.xpath("option[@value='" + strText + "']")); 
        reqElement.click();
    };
    

    this.getPopupText = function () {
        return actionLib.getChainedElement(this.fullPopup, this.popupText).getText().then(function (poupText) {
            return poupText;
        });
    }
      
    this.clickOn = function (buttonName) {
        switch (buttonName.toLowerCase())
        {
            case "save":
                actionLib.click(this.btnSave);
                break;
            case "cancel":
                actionLib.click(this.btnCancel);
                break;
            case "update":
                actionLib.click(this.btnUpdate);
                break;
            default:
                console.log(buttonName +"Button is not available");
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
            case 'cancel':
                actionLib.getChainedElement(this.fullPopup, this.popupCancelButton).click();
                break;
            default:
                console.log(buttonName +"Button is not available");
                break;
        }
    }
}
module.exports = new pageAddCurrency();


