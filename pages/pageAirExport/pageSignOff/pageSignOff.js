var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAddShipmentSignOff = function () {
    var reqElement;

    this.linkSignOff = by.xpath("//a[@href='#/myAirExportTask?activeTab=SignOff']");
    this.menuTasks = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks = by.className("col-xs-9 ptb14 pl10 ng-binding");
    this.btnSave = by.xpath("//input[@value='Save']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");
    this.btnMore = by.className("btn btn-primary btn-xs btn-property accent-btn mt-4 width126px ng-scope");
    this.linkMoreSignOff = by.xpath("//a[@ng-click='serviceSignOffModal(shipmentServiceDetail, $index)']");
    this.linkMoreUnSignOff = by.xpath("//a[@ng-click='serviceUnSignOffModal(shipmentServiceDetail, $index)']");

    // this.btnMasterShipmentSignOff = by.xpath("//button[@ng-click='consolSignOffModel(consol);']");
    this.textAreaSignOffDescription = by.id("notes");
    this.btnPopUpSignOff = by.xpath("//button[@ng-click='saveServiceSignOff(serviceObject.shipmentServiceSignOff)']");

    //--Attach to Master locators
    this.btnAttachToMaster = by.xpath("//button[@ng-click='serviceToConsol(shipment,shipmentServiceDetail)']");
    // Master Shipment page Service & Routing sub menu
    this.uiSwitchFreight = by.xpath("//span[@id='freightTerm']");
    this.uiSwitchDirect = by.xpath("//span[@ng-model='consol.directShipment']");
    this.dropDownAgent = by.id("consolPartyAgent");
    this.textBoxIataRate = by.model("consol.iataRate");
    this.calenderRoutingAtd = by.id("atdDateMoreInfoConsol");
    this.calenderRoutingAta = by.id("ataMoreInfoConsol");

    // Master Shipment page pick up / delivery sub menu
    this.subMenuPickUpDelivery = by.xpath("//a[@ng-click=\"menuTabClick('consol.pickUpDeliveryPoint.transporter','pickup')\"]/span");
    this.expandPickUp = by.xpath("//div[@ng-click='picksInfo=!picksInfo']");
    this.textBoxProTrackingNo = by.id("consol.pickUpDeliveryPoint.proTracking");
    this.checkBoxOurPickUp = by.model("consol.pickUpDeliveryPoint.isOurPickUp");
    this.calenderPickUpFollowUpDate = by.id("consol.pickUpDeliveryPoint.pickUpFollowUp");
    this.calenderPlannedPickUpDate = by.id("consol.pickUpDeliveryPoint.pickUpPlanned");
    this.calenderActualPickUpDate = by.id("consol.pickUpDeliveryPoint.pickUpActual");
    this.expandDeliveryToCfs = by.xpath("//div[@ng-click='deliveryInfo=!deliveryInfo']");
    this.textBoxDeliveryPlaceAddress1 = by.id("consol.pickUpDeliveryPoint.deliveryPlace.addressLine1");
    this.textBoxDeliveryPlaceAddress2 = by.id("consol.pickUpDeliveryPoint.deliveryPlace.addressLine2");
    this.textBoxDeliveryPlaceAddress3 = by.id("consol.pickUpDeliveryPoint.deliveryPlace.addressLine3");
    this.dropDownDeliveryPlaceState = by.id("consol.pickUpDeliveryPoint.deliveryPlace.state");
    this.dropDownDeliveryPlaceCity = by.id("consol.pickUpDeliveryPoint.deliveryPlace.city");
    this.textBoxDeliveryPlaceZip = by.id("consol.pickUpDeliveryPoint.deliveryPlace.zipCode");
    this.textBoxDeliveryToCfsContactPerson = by.id("consol.pickUpDeliveryPoint.deliveryContactPerson");
    this.textBoxDeliveryToCfsEmail = by.id("consol.pickUpDeliveryPoint.deliveryEmail");
    this.textBoxDeliveryToCfsMobileNo = by.id("consol.pickUpDeliveryPoint.deliveryMobileNo");
    this.textBoxDeliveryToCfsPhoneNo = by.id("consol.pickUpDeliveryPoint.deliveryPhoneNo");
    this.calenderExpectedDeliveryDate = by.id("consol.pickUpDeliveryPoint.deliveryExpected");
    this.calenderDeliveryDate = by.id("consol.pickUpDeliveryPoint.deliveryDate");
    // Master Shipment page Charges sub menu
    this.subMenuCharges = by.xpath("//a[@ng-click=\"menuTabClick('chargeMaster0','rates')\"]");
    this.dropDownChargeCode = by.id("chargeMaster0");
    this.dropDownPpCc = by.id("ppcArr0");
    this.textBoxAmtPerUnit = by.model("dataObj.amountPerUnit");
    this.dropDownDue = by.model("dataObj.due");

    //point 31: Demo feedback points BRD document
    this.dropDownAirportOfDischarge = by.id("aodConsol");
    this.btnDeleteAddConnection = by.xpath("//a[@ng-click=\"fnRole({param:deleteRole})?removeObj(serviceConnection,$index):''\"]/i[@class=\"icon-delete ng-scope\"]");
    this.btnAddConnection = by.xpath("//div[@class='col-xs-12 mt-15  pl0 pr0']//button");
    this.textBoxVolumeWeight = by.xpath("//div[@class='col-xs-4 col-sm-3 mt-5']//input[@ng-model='consol.consolDocument.volumeWeight']");
    this.subMenuDocument = by.xpath("//a[@ng-click=\"menuTabClick('shipper','documents')\"]/span");
    this.subMenuServiceRouting = by.xpath("//a[@ng-init=\"currentTab='detailTab'\"]/span");
    this.subMenuMawb = by.xpath("//a[@ng-click=\"menuTabClick('serviceUid','consol')\"]/span");
    this.btnUpdate = by.xpath("//input[@value='Update']");
    this.msgConnectionRequired = by.css(".message.ng-binding");
    

    this.fillDeliveryPoint = function () {

        reqElement = by.xpath("//input[@id='consol.pickUpDeliveryPoint.deliveryPoint']/../../span");
        actionLib.click(reqElement);
        reqElement = by.className("uib-typeahead-match ng-scope active");
        actionLib.click(reqElement);
    }

    this.addMasterShipmentServiceRouting = function (serviceRoutingVars) {

        if (serviceRoutingVars.directUiSwitch != "none") {
            actionLib.click(this.uiSwitchDirect);
        }
        if (serviceRoutingVars.agent != "none") {
            actionLib.setText(this.dropDownAgent, serviceRoutingVars.agent);
        }
        if (serviceRoutingVars.iataRate != "none") {
            actionLib.setText(this.textBoxIataRate, serviceRoutingVars.iataRate);
        }
        if (serviceRoutingVars.atdDate != "none") {
            actionLib.setText(this.calenderRoutingAtd, serviceRoutingVars.atdDate);
        }
        if (serviceRoutingVars.ataDate != "none") {
            actionLib.setText(this.calenderRoutingAta, serviceRoutingVars.ataDate);
        }
    }

    this.addMasterShipmentPickUp = function (pickUpVars) {

        if (pickUpVars.proTrackingNo != "none") {
            actionLib.setText(this.textBoxProTrackingNo, pickUpVars.proTrackingNo);
        }
        if (pickUpVars.pickUpFollowUpDate != "none") {
            actionLib.setText(this.calenderPickUpFollowUpDate, pickUpVars.pickUpFollowUpDate);
        }
        if (pickUpVars.plannedPickUpDate != "none") {
            actionLib.setText(this.calenderPlannedPickUpDate, pickUpVars.plannedPickUpDate);
        }
        if (pickUpVars.actualPickUpDate != "none") {
            actionLib.setText(this.calenderActualPickUpDate, pickUpVars.actualPickUpDate);
        }
    }

    this.addMasterShipmentDelivery = function (deliveryToCfsVars, deliveryToCfsData) {

        if (deliveryToCfsVars.deliveryPoint != "none") {
            this.fillDeliveryPoint();
        }
        if (deliveryToCfsData.deliveryToCfsAddress1 != "none") {
            actionLib.setText(this.textBoxDeliveryPlaceAddress1, deliveryToCfsData.deliveryToCfsAddress1);
        }
        if (deliveryToCfsData.deliveryToCfsAddress2 != "none") {
            actionLib.setText(this.textBoxDeliveryPlaceAddress2, deliveryToCfsData.deliveryToCfsAddress2);
        }
        if (deliveryToCfsData.deliveryToCfsAddress3 != "none") {
            actionLib.setText(this.textBoxDeliveryPlaceAddress3, deliveryToCfsData.deliveryToCfsAddress3);
        }
        if (deliveryToCfsData.deliveryToCfsState != "none") {
            actionLib.setText(this.dropDownDeliveryPlaceState, deliveryToCfsData.deliveryToCfsState);
        }
        if (deliveryToCfsData.deliveryToCfsCity != "none") {
            actionLib.setText(this.dropDownDeliveryPlaceCity, deliveryToCfsData.deliveryToCfsCity);
        }
        if (deliveryToCfsData.deliveryToCfsZip != "none") {
            actionLib.setText(this.textBoxDeliveryPlaceZip, deliveryToCfsData.deliveryToCfsZip);
        }
        if (deliveryToCfsData.deliveryToCfsContactPerson != "none") {
            actionLib.setText(this.textBoxDeliveryToCfsContactPerson, deliveryToCfsData.deliveryToCfsContactPerson);
        }
        if (deliveryToCfsData.deliveryToCfsEmail != "none") {
            actionLib.setText(this.textBoxDeliveryToCfsEmail, deliveryToCfsData.deliveryToCfsEmail);
        }
        if (deliveryToCfsData.deliveryToCfsMobileNo != "none") {
            actionLib.setText(this.textBoxDeliveryToCfsMobileNo, deliveryToCfsData.deliveryToCfsMobileNo);
        }
        if (deliveryToCfsData.deliveryToCfsPhoneNo != "none") {
            actionLib.setText(this.textBoxDeliveryToCfsPhoneNo, deliveryToCfsData.deliveryToCfsPhoneNo);
        }
        if (deliveryToCfsVars.expectedDeliveryDate != "none") {
            actionLib.setText(this.calenderExpectedDeliveryDate, deliveryToCfsVars.expectedDeliveryDate);
        }
        if (deliveryToCfsVars.expectedDeliveryDate != "none") {
            actionLib.setText(this.calenderDeliveryDate, deliveryToCfsVars.expectedDeliveryDate);
        }
    }

    this.addMasterShipmentCharges = function (chargesData) {
        if (chargesData.eventsName != "none") {
            actionLib.setText(this.dropDownChargeCode, chargesData.chargesChargeCode);
        }
        if (chargesData != "none") {
            efsLib.selectDropdown(this.dropDownPpCc, chargesData.chargesPpCc);
        }
        if (chargesData.eventsFollowUpRequired != "none") {
            actionLib.setText(this.textBoxAmtPerUnit, chargesData.chargesAmtPerUnit);
        }
        if (chargesData.eventsCompleted != "none") {
            efsLib.selectDropdown(this.dropDownDue, chargesData.chargesDue);
        }
    }
};
module.exports = new pageAddShipmentSignOff();
