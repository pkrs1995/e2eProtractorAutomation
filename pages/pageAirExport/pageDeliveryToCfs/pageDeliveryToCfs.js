var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAddDeliveryToCfs = function () {
    var reqElement;

    //--Add delivery to cfs point
    this.menuMaster = by.xpath("//*[@data-title='Masters']");
    this.menueOcean = by.xpath("//*[@class='col-xs-9 ptb14 pl10 ng-binding'][text()='eOcean']");
    this.menuCFS = by.xpath("//*[@class='col-xs-9 ptb14 pl10 ng-binding'][text()='CFS']");
    this.menuTasks = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks = by.className("col-xs-9 ptb14 pl10 ng-binding");
    this.btnAddCFS = by.className("btn btn-property accent-btn");
    this.textBoxName = by.id("cfsName");
    this.textBoxCode = by.id("cfsCode");
    this.dropDownPort = by.id("portName");
    this.btnSave = by.className("btn accent-btn ng-binding");

    //--Delivery To CFS/Depot section 
    this.linkDeliveryToCfs = by.xpath("//a[@href='#/myAirExportTask?activeTab=DeliveryToCfs']");
    this.btnEdit = by.className("btn-icon ng-scope");
    this.expandDeliveryToCfs = by.xpath("//div[@ng-click='deliveryInfo=!deliveryInfo']");
    this.textBoxDeliveryPlaceAddress1 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.addressLine1.0");
    this.textBoxDeliveryPlaceAddress2 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.addressLine2.0");
    this.textBoxDeliveryPlaceAddress3 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.addressLine3.0");
    this.dropDownDeliveryState = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.state.0");
    this.dropDownDeliveryCity = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.city.0");
    this.textBoxDeliveryZip = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPlace.zipCode.0");
    this.textBoxDeliveryToCfsContactPerson = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryContactPerson.0");
    this.textBoxDeliveryToCfsEmail = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryEmail.0");
    this.textBoxDeliveryToCfsMobileNo = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryMobileNo.0");
    this.textBoxDeliveryToCfsPhoneNo = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryPhoneNo.0");
    this.calenderExpectedDeliveryDate = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryExpected.0");
    this.calenderDeliveryDate = by.id("shipment.serviceDetail.pickUpDeliveryPoint.deliveryDate.0");
    this.btnUpdate = by.xpath("//input[@ng-click='saveShipment()']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");

    //--Door Delivery section 
    this.expandDoorDelivery = by.xpath("//div[@ng-click='doorInfo=!doorInfo']");
    this.textBoxDoorDeliveryPlaceAddress1 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.addressLine1.0");
    this.textBoxDoorDeliveryPlaceAddress2 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.addressLine2.0");
    this.textBoxDoorDeliveryPlaceAddress3 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.addressLine3.0");
    this.dropDownDoorDeliveryState = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.state.0");
    this.dropDownDoorDeliveryCity = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.city.0");
    this.textBoxDoorDeliveryZip = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPlace.zipCode.0");
    this.textBoxDoorDeliveryContactPerson = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryContactPerson.0");
    this.textBoxDoorDeliveryEmail = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryEmail.0");
    this.textBoxDoorDeliveryMobileNo = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryMobileNo.0");
    this.textBoxDoorDeliveryPhoneNo = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPhoneNo.0");
    this.calenderExpectedDoorDeliveryDate = by.model("shipmentServiceDetail.pickUpDeliveryPoint.doorDeliveryExpected");
    this.calenderDoorDeliveryDate = by.id("shipment.serviceDetail.pickUpDeliveryPoint.doorDelivery.0");

    this.fillDeliveryPoint = function () {
        reqElement = by.xpath("//input[@id='shipment.serviceDetail.pickUpDeliveryPoint.deliverypoint.0']/../../span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.fillDoorDeliveryPoint = function () {
        reqElement = by.xpath("//input[@id='shipment.serviceDetail.pickUpDeliveryPoint.doorDeliveryPoint.0']/../../span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.addDeliveryToCfsPoint = function (addCfsPointVariables) {

        actionLib.verifyElementPresent(this.menuMaster);
        actionLib.click(this.menuMaster);
        actionLib.verifyElementPresent(this.menueOcean);
        actionLib.click(this.menueOcean);
        actionLib.verifyElementPresent(this.menuCFS);
        actionLib.click(this.menuCFS);
        actionLib.verifyElementPresent(this.btnAddCFS);
        actionLib.click(this.btnAddCFS);
        actionLib.setText(this.textBoxName, addCfsPointVariables.cfsName);
        actionLib.setText(this.textBoxCode, addCfsPointVariables.cfsCode);
        actionLib.setText(this.dropDownPort, addCfsPointVariables.cfsPort);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
        actionLib.click(this.btnSave);
    }

    this.addDeliveryToCfs = function (deliveryToCfsData, deliverToCfsVariables) {

            this.fillDeliveryPoint();
            actionLib.setText(this.textBoxDeliveryPlaceAddress1, deliveryToCfsData.depotDeliveryPlaceAddress1);
            actionLib.setText(this.textBoxDeliveryPlaceAddress2, deliveryToCfsData.depotDeliveryPlaceAddress2);
            actionLib.setText(this.textBoxDeliveryPlaceAddress3, deliveryToCfsData.depotDeliveryPlaceAddress3);
            actionLib.setText(this.dropDownDeliveryState, deliveryToCfsData.depotDeliveryPlaceState);
            actionLib.setText(this.dropDownDeliveryCity, deliveryToCfsData.depotDeliveryPlaceCity);
            actionLib.setText(this.textBoxDeliveryZip, deliveryToCfsData.depotDeliveryPlaceZip);
            actionLib.setText(this.textBoxDeliveryToCfsContactPerson, deliveryToCfsData.depotContactPerson);
            actionLib.setText(this.textBoxDeliveryToCfsEmail, deliveryToCfsData.depotContactPersonEmail);
            actionLib.setText(this.textBoxDeliveryToCfsMobileNo, deliveryToCfsData.depotContactPersonMobileNo);
            actionLib.setText(this.textBoxDeliveryToCfsPhoneNo, deliveryToCfsData.depotContactPersonPhoneNo);
            actionLib.setText(this.calenderExpectedDeliveryDate, deliverToCfsVariables.expectedDeliveryDate);
            actionLib.setText(this.calenderDeliveryDate, deliverToCfsVariables.deliveryDate); 
    }
    //-this function will be used in Import workflow
    this.addDoorDelivery = function (deliveryToCfsData, doorDeliveryVariables) {

            this.fillDoorDeliveryPoint();
            actionLib.setText(this.textBoxDoorDeliveryPlaceAddress1, deliveryToCfsData.doorDeliveryPlaceAddress1);
            actionLib.setText(this.textBoxDoorDeliveryPlaceAddress2, deliveryToCfsData.doorDeliveryPlaceAddress2);
            actionLib.setText(this.textBoxDoorDeliveryPlaceAddress3, deliveryToCfsData.doorDeliveryPlaceAddress3);
            actionLib.setText(this.dropDownDoorDeliveryState, deliveryToCfsData.doorDeliveryPlaceState);
            actionLib.setText(this.dropDownDoorDeliveryCity, deliveryToCfsData.doorDeliveryPlaceCity);
            actionLib.setText(this.textBoxDoorDeliveryZip, deliveryToCfsData.doorDeliveryPlaceZip);
            actionLib.setText(this.textBoxDoorDeliveryContactPerson, deliveryToCfsData.doorContactPerson);
            actionLib.setText(this.textBoxDoorDeliveryEmail, deliveryToCfsData.doorContactPersonEmail);
            actionLib.setText(this.textBoxDoorDeliveryMobileNo, deliveryToCfsData.doorContactPersonMobileNo);
            actionLib.setText(this.textBoxDoorDeliveryPhoneNo, deliveryToCfsData.doorContactPersonPhoneNo);
            actionLib.setText(this.calenderExpectedDoorDeliveryDate, doorDeliveryVariables.expectedDoorDeliveryDate);
            actionLib.setText(this.calenderDoorDeliveryDate, doorDeliveryVariables.doorDeliveryDate); 
    }
};
module.exports = new pageAddDeliveryToCfs();
