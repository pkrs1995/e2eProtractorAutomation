var actionLib = require('../../../../library/action.js');
var efsLib    = require('../../../../library/appspecificactions.js');


var pageCompany = function() {

    //pageCompany Locators
    this.btnAddCompany = by.className("btn btn-property accent-btn");
    this.btnEditIcon = by.xpath("//div[contains(@class,'panel panel-default detail-transition')]//li[2]//a[1]");
    this.btnDeleteIcon = by.xpath("//i[@class='icon-delete']");
    this.btnNo = by.className("btn btn-default btn-property cancel-btn");
    this.btnYes = by.xpath("//button[text()='Yes']");
    

    }   
    module.exports = new pageCompany();