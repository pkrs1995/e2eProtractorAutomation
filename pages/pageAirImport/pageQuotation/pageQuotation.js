var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var quotationData = require('../../../testdata/dataAirImport/dataQuotation/dataQuotation.json');
var demoFeedbackPointsPage = require('../../../pages/pageDemoFeedbackPoints/pageDemoFeedbackPoints.js');

var pageQuotation = function (){
    var dataQuotation;
    var linkCountBeforeAdd;
    var linkCountAfterAdd;

     //Navigate from left side menu tabs to Sales -> Quotation
     this.linkWaitingForManagerApproval = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Waiting for Manager Approval')]");
     this.linkWaitingForCustomerApproval = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Waiting for Customer Approval')]");
     this.linkReadyForShipment = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Ready for Shipment')]");
     this.linkRejectedQuotation = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Rejected')]");
     this.linkAllQuotation = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'All')]");
     this.linkQuotation = by.xpath("//a[@href='#/myAirImportTask?activeTab=Quotation']");
     this.textRecordsCount = by.className("meta-data ng-binding");


    dataQuotation = quotationData.addQuotation[0];

    this.clickQuotationId = function(){

        efsLib.fillTextInTableColumn(dataQuotation.quotationScreenTableDataXpathtag, 2, 4, globalData.globalData.quotationId);
        efsLib.verifySearchTextInTableRowCol(dataQuotation.quotationScreenTableDataXpathtag, 1, 4, globalData.globalData.quotationId);
        efsLib.clickRowInAirExportTable(globalData.globalData.quotationId, globalData.globalData.quotationId);
    }

    this.verifyTabNameWithQuotationId = function(strTabLocator){

        actionLib.verifyElementPresent(strTabLocator);
        actionLib.click(strTabLocator);
        efsLib.fillTextInTableColumn(dataQuotation.quotationScreenTableDataXpathtag, 2, 4, globalData.globalData.quotationId);
        efsLib.verifySearchTextInTableRowCol(dataQuotation.quotationScreenTableDataXpathtag, 1, 4, globalData.globalData.quotationId);
      
    }

    this.verifyCountinQuotationPage=function(){
       
      actionLib.verifyElementPresent(this.linkWaitingForManagerApproval);
      demoFeedbackPointsPage.verifyLinksCount(this.textRecordsCount,this.linkWaitingForManagerApproval);
      actionLib.verifyElementPresent(this.linkWaitingForCustomerApproval);
      actionLib.click(this.linkWaitingForCustomerApproval);
      demoFeedbackPointsPage.verifyLinksCount(this.textRecordsCount,this.linkWaitingForCustomerApproval);
      actionLib.verifyElementPresent(this.linkReadyForShipment);
      actionLib.click(this.linkReadyForShipment);
      demoFeedbackPointsPage.verifyLinksCount(this.textRecordsCount,this.linkReadyForShipment);
      actionLib.verifyElementPresent(this.linkRejectedQuotation);
      actionLib.click(this.linkRejectedQuotation);
      demoFeedbackPointsPage.verifyLinksCount(this.textRecordsCount,this.linkRejectedQuotation);
      actionLib.verifyElementPresent(this.linkAllQuotation);
      actionLib.click(this.linkAllQuotation);                                                
      demoFeedbackPointsPage.verifyLinksCount(this.textRecordsCount,this.linkAllQuotation);
  }
  
};
module.exports = new pageQuotation();