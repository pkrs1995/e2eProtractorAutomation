var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var directShipmentData = require("../../../testdata/dataAirImport/dataShipment/dataDirectShipment.json");


var pageShipment = function()  {
        var reqElement,dataDirectShipment;
        dataDirectShipment = directShipmentData.addDirectShipment[0];
        //Navigate from left side menu tabs to CRM -> Shipment
        this.linkBookedShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Booked')]");
        this.linkReceivedShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Received')]");
        this.linkGeneratedShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Generated')]");
        this.linkClosedShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Closed')]");
        this.linkCancelledShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Cancelled')]");
        this.linkAllShipment = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'All')]");
        this.btnExportShipments = by.xpath("//button[@data-state='Export']");
        this.btnImportShipments = by.xpath("//button[@data-state='Import']");
        this.btnBothShipments = by.xpath("//button[@data-state='Both']");

         //search and click on shipment Id
         this.openShipmentById = function(){
            efsLib.fillTextInTableColumn(dataDirectShipment.shipmentScreenXpathTag, 2, 4, globalData.globalData.shipmentId);
            efsLib.verifySearchTextInTableRowCol(dataDirectShipment.shipmentScreenXpathTag, 1, 4, globalData.globalData.shipmentId)
            efsLib.clickRowInAirExportTable(globalData.globalData.shipmentId,globalData.globalData.shipmentId);
          }




        
  
        









}

module.exports = new pageShipment();