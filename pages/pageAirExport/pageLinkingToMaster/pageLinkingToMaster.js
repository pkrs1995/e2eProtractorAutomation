var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAddLinkingToMaster = function () {
    var reqElement;

    this.linkLinkingToMaster = by.xpath("//a[@href='#/myAirExportTask?activeTab=LinkToMaster']");
    this.menuTasks = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks = by.className("col-xs-9 ptb14 pl10 ng-binding");

    //--shipment page Others tab locators
    this.btnEdit = by.className("btn-icon ng-scope");
    this.subMenuOthers = by.xpath("//span[@title='Others']");
    this.btnAddDocument = by.xpath("//button[@ng-click='addNewAuthDocs(shipmentServiceDetail)']");
    this.textBoxDocumentNo = by.id("0documentNo0");
    this.calenderDate = by.id("0date0");
    this.dropDownOrigin = by.id("0origin0");
    this.dropDownDestination = by.id("0destination0");
    this.textBoxNoOfPieces = by.id("0noOfPiece0");
    this.textBoxGrossWeight = by.id("0grossWeight0");
    this.textBoxVolumenWeight = by.id("0volWeight0");
    this.btnUpdate = by.xpath("//input[@ng-click='saveShipment()']");
    this.btnSave = by.xpath("//input[@value='Save']");
    this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");

    //--Events cargo received locators
    this.btnEvents = by.className("fa fa-calendar");
    this.dropDownEventsName = by.id("0eventMaster0");
    this.calenderEventsDate = by.id("0eventDateTab0");
    this.dropDownEventsFollowUpRequired = by.id("0followUpReqEvent0");
    this.dropDownEventsCompleted = by.id("0completedEvent0");
    this.btnEventsSave = by.xpath("//button[@ng-click='saveEventModal()']");

    this.addShipmentOthersTab = function (othersTabVariables, othersTabDate) {

            actionLib.setText(this.textBoxDocumentNo, othersTabVariables.othersTabDocumentNo);
            actionLib.setText(this.calenderDate, othersTabDate);
            actionLib.setText(this.dropDownOrigin, othersTabVariables.othersTabOrigin);
            actionLib.setText(this.dropDownDestination, othersTabVariables.othersTabDestination);
            actionLib.setText(this.textBoxNoOfPieces, othersTabVariables.othersTabNoOfPieces);
            actionLib.setText(this.textBoxGrossWeight, othersTabVariables.othersTabGrossWt);
            actionLib.setText(this.textBoxVolumenWeight, othersTabVariables.othersTabVolumeWt);
    }

    this.addShipmentEvents = function (eventsVariables, eventsDate) {

            actionLib.setText(this.dropDownEventsName, eventsVariables.eventsName);
            actionLib.setText(this.calenderEventsDate, eventsDate);
            efsLib.selectDropdown(this.dropDownEventsFollowUpRequired, eventsVariables.eventsFollowUpRequired);
            efsLib.selectDropdown(this.dropDownEventsCompleted, eventsVariables.eventsCompleted);
        
    }
};
module.exports = new pageAddLinkingToMaster();
