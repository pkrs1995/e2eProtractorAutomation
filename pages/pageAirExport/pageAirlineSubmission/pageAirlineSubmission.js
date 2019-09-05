var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAirlineSubmission = function () {
    var reqElement;

    this.linkAirlineSubmission = by.xpath("//a[@href='#/myAirExportTask?activeTab=AirLineSubmission']");
    this.linkJobCompletion = by.xpath("//a[@href='#/myAirExportTask?activeTab=JobCompletion']");
    this.btnAirlineSubmissionSignOff = by.xpath("//button[@ng-click='consolSignOffModel(consol);']");
    this.textAreaSignOffDescription = by.id("notes");
    this.btnPopUpSignOff = by.xpath("//button[@ng-click='saveConsolSignOff(consolObject.consolSignOff)']");
    this.btnGenerateAirlineEdi = by.xpath("//button[@ng-click='airlineEdiConfirmation()']");
    this.btnNoInUpdateMAWBPopUp = by.xpath("//button[@ng-click='confirm(false)']");
    this.btnGenerateEdiInPopUp = by.className("btn btn-primary btn-xs btn-property green-btn");
    this.msgGenerateAirlineEdiInitiated = by.className("message ng-binding");

    this.addGenerateEdi = function () {
        actionLib.verifyElementPresent(this.btnGenerateAirlineEdi);
        actionLib.click(this.btnGenerateAirlineEdi);
        actionLib.verifyElementPresent(this.btnGenerateEdiInPopUp);
        actionLib.click(this.btnGenerateEdiInPopUp);
        // actionLib.verifyElementPresent(this.msgGenerateAirlineEdiInitiated);
        // actionLib.verifyElementText(this.msgGenerateAirlineEdiInitiated, "none", 
        //                             "EDI generation process initiated.");
    }
};
module.exports = new pageAirlineSubmission();
