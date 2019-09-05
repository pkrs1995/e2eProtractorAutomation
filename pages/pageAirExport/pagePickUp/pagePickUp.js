var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAddPickUp = function () {
    var reqElement;

    this.linkPickUp = by.xpath("//a[@href='#/myAirExportTask?activeTab=Pickup']");
    this.btnEdit = by.className("btn-icon ng-scope");
    this.subMenuPickUpDelivery = by.xpath("//span[@title='PickUp/Delivery']");
    this.textBoxProTrackingNo = by.id("shipment.serviceDetail.pickUpDeliveryPoint.proTracking.0");
    this.expandPickUp = by.xpath("//div[@ng-click='picksInfo=!picksInfo']");
    this.checkBoxOurPickUp = by.id("ourPickUp0");
    this.textBoxAddress1 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.addressLine1.0");
    this.textBoxAddress2 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.addressLine2.0");
    this.textBoxAddress3 = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.addressLine3.0");
    this.dropDownState = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.state.0");
    this.dropDownCity = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.city.0");
    this.textBoxZipCode = by.id("shipment.serviceDetail.pickUpDeliveryPoint.pickUpPlace.zipCode.0");
    this.textBoxContactDetails = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpContactPerson.0");
    this.textBoxPickUpEmail = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpEmail.0");
    this.textBoxMobileNo = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpMobileNo.0");
    this.textBoxPhoneNo = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpPhoneNo.0");
    this.calenderPickUpFollowUpDate = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpFollowUp.0");
    this.calenderPlannedPickUpDate = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpPlanned.0");
    this.calenderActualPickUpDate = by.id("shipmentServiceDetail.pickUpDeliveryPoint.pickUpActual.0");
    this.btnUpdate = by.xpath("//input[@ng-click='saveShipment()']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");

   
        this.addPickUp = function (pickUpData) {
                actionLib.setText(this.textBoxAddress1, pickUpData.pickUpAddress1);
                actionLib.setText(this.textBoxAddress2, pickUpData.pickUpAddress2);
                actionLib.setText(this.textBoxAddress3, pickUpData.pickUpAddress3);
                actionLib.setText(this.dropDownState, pickUpData.pickUpState);
                actionLib.setText(this.dropDownCity, pickUpData.pickUpCity);
                actionLib.setText(this.textBoxZipCode, pickUpData.pickUpZipCode);
                actionLib.setText(this.textBoxContactDetails, pickUpData.pickUpContactDetails);
                actionLib.setText(this.textBoxPickUpEmail, pickUpData.pickUpEmail);
                actionLib.setText(this.textBoxMobileNo, pickUpData.pickUpMobileNo);
                actionLib.setText(this.textBoxPhoneNo, pickUpData.pickUpPhoneNo); 
        }

        this.pickupDate = function(pickupdate)
        {
            actionLib.setText(this.calenderPickUpFollowUpDate, pickupdate.strPickUpFollowUpDate);
            actionLib.setText(this.calenderPlannedPickUpDate, pickupdate.strPlannedPickUpDate);
            actionLib.setText(this.calenderActualPickUpDate, pickupdate.strActualPickUpDate);
        }
};

module.exports = new pageAddPickUp();
