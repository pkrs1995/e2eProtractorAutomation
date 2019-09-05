var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');


var pageAddShipmentCargoDetails = function () {
    var reqElement;
    // Etd,Eta,connectionEta,connectionEtd fields
    var strTodayTime = actionLib.getTodayDate();

    this.subMenuCargoDetails = by.xpath("//span[@title='Cargo Details']");
    this.dropDownCoLoader = by.id("shipment.serviceDetail.coLoader.0");
    this.dropDownDivision = by.id("shipment.serviceDetail.division.0");
    this.dropDownProject = by.id("shipment.serviceDetail.projectSp.0");
    this.textAreaPieces =by.id("shipment.serviceDetail.0.document.noOfPieces.0");//change
    this.textAreaVolume = by.id("shipment.serviceDetail.0.document.volumeCBM.0");//change
    this.uiSwitchHaz = by.xpath("//span[@id='shipment.serviceDetail.hazardous.0']");
    this.uiSwitchOverDimension = by.xpath("//span[@id='shipment.serviceDetail.overDimension.0']");
    this.uiSwitchMinShipment = by.xpath("//span[@id='shipment.serviceDetail.minShipment.0']");
    this.uiSwitchHold = by.xpath("//span[@id='shipment.serviceDetail.hold.0']");
    this.uiSwitchDimensionUnit = by.model("shipmentServiceDetail.documentList[0].dimensionUnit");
    this.textBoxSellRate = by.id("shipment.serviceDetail.0.document.0.ratePerCharge");
    this.textAreaHoldReleaseNote = by.id("shipment.serviceDetail.holdReleaseNote.0");

    //ShipmentHawb page
    this.subMenuHawb = by.xpath("//span[@title='HAWB']");
    this.dropDownConsignee = by.id("shipment.serviceDetail.0.document.consignee.0");
    this.dropDownNotifyCustomer1 = by.id("shipment.serviceDetail.0.document.firstNotify.0");
    this.dropDownNotifyCustomer2 = by.id("shipment.serviceDetail.0.document.secondNotify.0");
    this.dropDownForwarder = by.id("shipment.serviceDetail.0.document.forwarder.0");
    this.dropDownIssuingAgent = by.id("shipment.serviceDetail.0.document.issuingAgent.0");
    this.dropDownCustomHouseAgent = by.id("shipment.serviceDetail.0.document.chaAgent.0");
    this.textAreaHandlingInfo = by.id("shipment.serviceDetail.0.document.handlingInfo.0");
    this.textAreaAccountingInfo = by.id("shipment.serviceDetail.0.document.AccountingInfo.0");
    this.textAreaCommodityDescription = by.id("shipment.serviceDetail.0.document.commodityDescription.0");
    this.textAreaMarksNo = by.id("shipment.serviceDetail.0.document.marksAndNo.0");
    this.dropDownRateClass = by.model("documentDetail.rateClass");

    //Shipment Page 
    this.linkShipment = by.xpath("//a[@href='#/myAirExportTask?activeTab=Shipment']");
    this.btnCreateShipment = by.xpath("//button[@class='btn btn-primary btn-xs btn-property accent-btn']");
    this.uiSwitchDirect = by.id("shipment.serviceDetail.directShipment.0");
    this.uiSwitchFreight = by.id("shipment.serviceDetail.ppcc.0");
    this.uiSwitchRouted = by.id("shipment.serviceDetail.whoRouted.0");
    this.uiSwitchClearance = by.id("shipment.serviceDetail.isClearance.0");
    this.dropDownCommodityGrp = by.id("shipment.serviceDetail.commodity.0");
    this.btnSave = by.xpath("//input[@ng-click='saveShipment()']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");
    this.btnEdit = by.xpath("//a[@ng-click='edit()']");
    this.btnUpdate = by.xpath("//input[@ng-click='saveShipment()']");
    this.shipmentDate =by.id("shipment.serviceDetail.shipmentDate.0");

    //routing and carrier Info section
    this.expandRoutingCarrierInfo = by.xpath("//div[@ng-click='routInfo=!routInfo']");
    this.dropDownCarrier = by.id("shipment.serviceDetail.carrier.0");
    this.textBoxFlightNo = by.id("shipment.serviceDetail.flightNo.0");
    this.textBoxMawbNo = by.id("shipment.serviceDetail.mawb.0");
    this.calenderEtd = by.id("shipment.serviceDetail.etd.0");
    this.calenderEta = by.id("shipment.serviceDetail.eta.0");

    //connections section
    this.expandConnections = by.xpath("//div[@ng-click='conInfo=!conInfo;']");
    this.dropDownMove = by.id("0connectionMove0");
    this.dropDownFrom = by.id("0polConnection0");
    this.dropDownTo = by.id("0podConnection0");
    this.calenderConnectionEtd = by.id("0etdConnectionDate0");
    this.calenderConnectionEta = by.id("0etaConnectionDate0");
    this.dropDownCarrierVessel = by.id("0carrierVessel0");
    this.textBoxVoyFltNo = by.id("0voyConnection0");
    this.dropDownStatus = by.id("0status0");

    
    this.selectDropDownActiveElement = function (strLocator, strText) {

        actionLib.setText(strLocator, strText);
        reqElement = by.xpath("//span[@class='ng-binding']/strong");
        actionLib.verifyElementPresent(reqElement);
        actionLib.click(reqElement);
    }
      //shipmentCargoDetails
      this.addShipmentCargoDetails = function (strInput) {

        actionLib.setText(this.dropDownCoLoader, globalData.globalData.customerName);
        actionLib.click(this.uiSwitchHaz);
        actionLib.click(this.uiSwitchOverDimension);
        actionLib.click(this.uiSwitchMinShipment);
       // actionLib.click(this.uiSwitchHold);
        actionLib.click(this.uiSwitchDimensionUnit);
        //actionLib.setText(this.textBoxSellRate, strInput.sellRate);
        actionLib.scrollToElement(this.textAreaHoldReleaseNote);
        actionLib.setText(this.textAreaHoldReleaseNote, strInput.holdReleaseNote);

    }

    this.addShipmentHawb = function (strInput) {

        this.selectDropDownActiveElement(this.dropDownConsignee, globalData.globalData.customerName);
        this.selectDropDownActiveElement(this.dropDownNotifyCustomer1, globalData.globalData.customerName);
        this.selectDropDownActiveElement(this.dropDownNotifyCustomer2, globalData.globalData.customerName);
        this.selectDropDownActiveElement(this.dropDownForwarder, globalData.globalData.customerName);
        this.selectDropDownActiveElement(this.dropDownIssuingAgent, globalData.globalData.customerName);
        this.selectDropDownActiveElement(this.dropDownCustomHouseAgent, globalData.globalData.customerName);
        actionLib.scrollToElement(this.textAreaHandlingInfo);
        actionLib.setText(this.textAreaHandlingInfo, strInput.handlingInfo);
        actionLib.scrollToElement(this.textAreaAccountingInfo);
        actionLib.setText(this.textAreaAccountingInfo, strInput.accountingInfo);
        actionLib.scrollToElement(this.textAreaCommodityDescription);
        actionLib.setText(this.textAreaCommodityDescription, strInput.commodityDescription);
        actionLib.scrollToElement(this.textAreaMarksNo);
        actionLib.setText(this.textAreaMarksNo, strInput.marksNo);
    }

    this.addShipmentServiceRouting = function () {

            actionLib.click(this.uiSwitchDirect);
            actionLib.click(this.uiSwitchFreight);
            //actionLib.click(this.uiSwitchRouted);
            actionLib.click(this.uiSwitchClearance);
            actionLib.setText(this.shipmentDate, actionLib.getTodayDate());
    }

    this.addShipmentRoutingCarrierInfo = function (strInput) {

        actionLib.setText(this.dropDownCarrier, strInput.carrier);
        actionLib.setText(this.textBoxFlightNo, strInput.flightNo);
        actionLib.setText(this.textBoxMawbNo, strInput.mawbNo);
        actionLib.setText(this.calenderEtd, strTodayTime);
        actionLib.setText(this.calenderEta, strTodayTime);
    }

    this.addShipmentConnections = function (strInput) {

        actionLib.scrollToElement(this.dropDownMove);
        efsLib.selectDropdown(this.dropDownMove, strInput.connectionsMove);
        actionLib.setText(this.dropDownFrom, strInput.connectionsFrom);
        actionLib.setText(this.dropDownTo, strInput.connectionsTo);
        actionLib.setText(this.calenderConnectionEtd, strTodayTime);
        actionLib.setText(this.calenderConnectionEta, strTodayTime);
        actionLib.setText(this.dropDownCarrierVessel, strInput.connectionsCarrierVessel);
        actionLib.setText(this.textBoxVoyFltNo, strInput.connectionsVoyFltNo);
        efsLib.selectDropdown(this.dropDownStatus, strInput.connectionsStatus);
    }
};
module.exports = new pageAddShipmentCargoDetails();
