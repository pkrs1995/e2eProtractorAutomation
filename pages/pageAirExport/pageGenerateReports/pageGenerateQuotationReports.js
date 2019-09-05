var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageGenearteQuotationReports = function () {
    var reqElement;

    this.btnReports = by.xpath("//button[@ng-click='onClickReportTab()']");
    this.btnGenerateReportSubmit = by.xpath("//button[@ng-click='updateQuotation(quotation.id,quotationDetail)']");
    this.btnGeneratePopUpDownload = by.xpath("//button[@data-state='Download']");
    this.btnGeneratePopUpPreview = by.xpath("//button[@data-state='Preview']");
    this.btnGeneratePopUpCancel = by.className("btn btn-primary btn-xs btn-property cancel-btn");
    this.msgDownLoadProgress = by.className("message ng-binding");
    this.frameQutationPreview = by.id("plugin");

    this.clickQuotationCheckBox = function (seqNo) {
        reqElement = by.xpath("//div[@ng-show='reportLoadingImage.status']/../table//td[contains(text(),'" + seqNo + "')]/../td[@class='text-center']");
        actionLib.verifyElementPresent(reqElement);
        actionLib.click(reqElement);
    }

    this.clickQuotationGenerateBtn = function (seqNo) {
        reqElement = by.xpath("//div[@ng-show='reportLoadingImage.status']/../table//td[contains(text(),'" + seqNo + "')]/../td/button[@type='button']");
        actionLib.verifyElementPresent(reqElement);
        actionLib.click(reqElement);
    }

    // This function is to download quotation report
    this.generateQuotationReport = function (reportVariables) {

        actionLib.verifyElementPresent(this.btnReports);
        actionLib.click(this.btnReports);
        this.clickQuotationCheckBox(reportVariables.reportSequenceNo);
        actionLib.explicitWait(2000);
        this.clickQuotationGenerateBtn(reportVariables.reportSequenceNo);
        actionLib.verifyElementPresent(this.btnGenerateReportSubmit);
        actionLib.click(this.btnGenerateReportSubmit);
        actionLib.verifyElementPresent(this.btnGeneratePopUpDownload);
        actionLib.click(this.btnGeneratePopUpDownload);
    }

    // This function is to preview quotation report
    this.previewQuotationReport = function (reportVariables) {

        actionLib.verifyElementPresent(this.btnReports);
        actionLib.click(this.btnReports);
        this.clickQuotationCheckBox(reportVariables.reportSequenceNo);
        actionLib.explicitWait(2000);
        this.clickQuotationGenerateBtn(reportVariables.reportSequenceNo);
        actionLib.verifyElementPresent(this.btnGenerateReportSubmit);
        actionLib.click(this.btnGenerateReportSubmit);

        actionLib.verifyElementPresent(this.btnGeneratePopUpPreview);
        actionLib.click(this.btnGeneratePopUpPreview);
    }


};
module.exports = new pageGenearteQuotationReports();
