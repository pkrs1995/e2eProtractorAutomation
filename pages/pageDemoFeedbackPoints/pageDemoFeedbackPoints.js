/* 
Description : This file contains locators and functions required for Demo feedback points BRD document testcases 
*/

var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');
var demoFeedbackPointsData = require('../../testdata/dataDemoFeedbackPoints/dataDemoFeedbackPoints.json');
var customerCommonElementPage = require('../../pages/pageAddCustomer/pageAddCustomer.js');
var globalData = require('../../testdata/dataGlobal/dataGlobal.json');


var pageDemoFeedBackPoints = function () {

    this.menuCrm = by.xpath("//a[@data-title='CRM']");
    this.subMenuPricingAir = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding'][text()='Pricing Air']");
    this.btnAddPricingAir = by.className("btn btn-primary btn-xs btn-property accent-btn");
    this.tabOriginCharges = by.xpath("//button[@ng-click=\"clickOnTab('Origin','generalChargeName0')\"]");
    this.tabDestinationCharges = by.xpath("//button[@ng-click=\" clickOnTab('Destination','genFreightDestination0')\"]");
    this.tabFreightCharges = by.xpath("//button[@ng-click=\" clickOnTab('Freight','genFreight0')\"]");
    this.btnFrightChargeMoreInfo = by.xpath("//table[@tab-row='addGeneralFreightCharge()']//tbody//td/a[@ng-click='editmorepopup(pricingCarrier)']");
    this.btnMoreInfoCancel = by.className("btn btn-primary btn-xs btn-property cancel-btn mr0");
    this.dropDownOrigin = by.xpath("//input[@ng-model='pricingMaster.origin' and @aria-invalid='false']");
    this.dropDownDestination = by.id("destination");
    this.activeElementLocator = by.css(".uib-typeahead-match.ng-scope.active");
    this.btnSaveAddPricingAir = by.css(".btn.btn-primary.btn-xs.btn-property.accent-btn.ng-binding");
    //--Origin charges tab
    this.dropDownOriginChargesCharge = by.id("generalChargeName0");
    this.dropDownOriginChargesUnit = by.id("unit0");
    this.dropDownOriginChargesCurrency = by.id("currency0");
    this.textBoxOriginChargeMsrMinimum = by.id("minsellPrice0");
    this.textBoxOriginChargeMsrAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenOrgArray[$index].genOrgMinSelInAmount}\"]");
    this.textBoxOriginChargeSsrMinimum = by.xpath("//input[@ng-class=\"{'error-control':errorGenOrgArray[$index].genOrgStdSelInMinimum}\"]");
    this.textBoxOriginChargeSsrAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenOrgArray[$index].genOrgStdSelInAmount}\"]");
    this.textBoxOriginChargeCostMinimum = by.xpath("//input[@ng-class=\"{'error-control':errorGenOrgArray[$index].genOrgCostInMinimum}\"]");
    this.textBoxOriginChargeCostAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenOrgArray[$index].genOrgCostInAmount}\"]");
    this.calenderOriginChargesValidityFrom = by.id("validFromDate0");
    this.calenderOriginChargesValidityTo = by.id("validToDate0");
    //Destination charges tab
    this.dropDownDestChargesCharge = by.id("genFreightDestination0");
    this.dropDownDestChargesUnit = by.id("genDestunit0");
    this.dropDownDestChargesCurrency = by.id("genDestCurrency0");
    this.textBoxDestChargeMsrMinimum = by.id("genDestMinSell0");
    this.textBoxDestChargeMsrAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenDestArray[$index].genDestMinSelInAmount}\"]");
    this.textBoxDestChargeSsrMinimum = by.xpath("//input[@ng-class=\"{'error-control':errorGenDestArray[$index].genDestStdSelInMinimum}\"]");
    this.textBoxDestChargeSsrAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenDestArray[$index].genDestStdSelInAmount}\"]");
    this.textBoxDestChargeCostMinimum = by.xpath("//input[@ng-class=\"{'error-control':errorGenDestArray[$index].genDestCostInMinimum}\"]");
    this.textBoxDestChargeCostAmount = by.xpath("//input[@ng-class=\"{'error-control':errorGenDestArray[$index].genDestCostInAmount}\"]");
    this.calenderDestChargesValidityFrom = by.id("genDestValidFromDate0");
    this.calenderDestChargesValidityTo = by.id("genDestValidTo0");
    //Freight charges tab
    this.dropDownFreightChargesCharge = by.id("genFreight0");
    this.dropDownFreightChargesCurrency = by.id("genCurrency0");

    //Navigate from left side menu tabs to Sales -> Enquiry
    this.textRecordsCount = by.className("meta-data ng-binding");
    this.linkActiveEnquiry = by.xpath("//li[@ng-click=\"setSearch('active'); detailTab='active'\"]");
    this.linkQuoteCreatedEnquiry = by.xpath("//li[@ng-click=\"setSearch('quote'); detailTab='quoteCreated'\"]");
    this.linkAllEnquiry = by.xpath("//li[@ng-click=\"setSearch('all'); detailTab='all'\"]");

    //Navigate from left side menu tabs to Sales -> Quotation
    this.linkWaitingForManagerApproval = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Waiting for Manager Approval')]");
    this.linkWaitingForCustomerApproval = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Waiting for Customer Approval')]");
    this.linkReadyForShipment = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Ready for Shipment')]");
    this.linkRejectedQuotation = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'Rejected')]");
    this.linkAllQuotation = by.xpath("//li[@ng-click='tabChange(tabObj.tab)' and contains(text(),'All')]");

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

    //Navigate from left side menu tabs to Air -> Master Shipment
    this.linkActiveMasterShipments = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Active')]");
    this.linkClosedMasterShipments = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Closed')]");
    this.linkCancelledMasterShipments = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'Cancelled')]");
    this.linkAllMasterShipments = by.xpath("//li[@ng-click='tabChange(tab)' and contains(text(),'All')]");

    //-- demo feedback point BRD point 7
    this.textBoxOverDimension = by.xpath("//label[text()='Over Dimension']/..//*[@class='nomargin ng-binding']");
    this.textOverDimensionDetailScreen = by.xpath("//span[text()='Over Dimension']/..//*[@class='bold ng-binding']");
    this.uiSwitchDimensionUnit = by.xpath("//span[@id='enabled']");

    //-- demo feedback point BRD point 3
    this.msgSsrMsrCostValidation = by.className("message ng-binding");
    
    //-- demo feedback point BRD point 8
    this.linkAgentPort = by.xpath("//li[@ng-click=\"clickOnTab('agentPort')\"]");
    this.btnAddAgentPort = by.css(".btn.btn-property.accent-btn");
    this.dropDownAgentPortService = by.xpath("//input[contains(@class,'ng-valid-editable ng-empty') and @ng-model='agentPortMaster.serviceMaster']");
    this.dropDownAgentPortAgent = by.id("agentName0");
    this.dropDownAgentPort = by.id("portName0");
    this.btnAgentPortSave = by.css(".btn.btn-primary.btn-xs.btn-property.accent-btn");


    this.addPricingAirOriginCharges=function(originCharges){
      
        actionLib.verifyElementPresent(this.btnAddPricingAir);
        actionLib.click(this.btnAddPricingAir);
        
        actionLib.verifyElementPresent(this.dropDownOrigin);
        actionLib.setText(this.dropDownOrigin, originCharges.origin);
        actionLib.setText(this.dropDownDestination, originCharges.destination);
        
        actionLib.verifyElementPresent(this.dropDownOriginChargesCharge);
        actionLib.setText(this.dropDownOriginChargesCharge, originCharges.originCharge);
        actionLib.setText(this.dropDownOriginChargesUnit, originCharges.originUnit);

        actionLib.setText(this.calenderOriginChargesValidityFrom, actionLib.getFutureDate(0));
        actionLib.setText(this.calenderOriginChargesValidityTo, actionLib.getFutureDate(10));

        // SSR value is less than both MSR and Cost value
        actionLib.click(this.tabOriginCharges);
        actionLib.verifyElementPresent(this.textBoxOriginChargeMsrMinimum);
        actionLib.setText(this.textBoxOriginChargeMsrMinimum, originCharges.msrMinimum);
        actionLib.setText(this.textBoxOriginChargeMsrAmount, originCharges.msrAmount);
        actionLib.setText(this.textBoxOriginChargeSsrMinimum, originCharges.ssrMinimum);
        actionLib.setText(this.textBoxOriginChargeSsrAmount, originCharges.ssrAmountLess);
        actionLib.setText(this.textBoxOriginChargeCostMinimum, originCharges.costMinimum);
        actionLib.setText(this.textBoxOriginChargeCostAmount, originCharges.costAmount);
        actionLib.click(this.btnSaveAddPricingAir);

    
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
                                    originCharges.ssrMsrCostValidationMsg);
        
        // SSR value is less than Cost value but more than MSR value
        actionLib.setText(this.textBoxOriginChargeMsrAmount, originCharges.msrAmountLess);
        actionLib.click(this.btnSaveAddPricingAir);
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
                                    originCharges.ssrMsrCostValidationMsg);

        // SSR value is less than MSR value but more than Cost value
        actionLib.setText(this.textBoxOriginChargeMsrAmount, originCharges.msrAmount);
        actionLib.setText(this.textBoxOriginChargeCostAmount, originCharges.costAmountLess);       
        actionLib.click(this.btnSaveAddPricingAir);
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
                                    originCharges.ssrMsrCostValidationMsg);
        actionLib.setText(this.textBoxOriginChargeSsrAmount, originCharges.ssrAmount);
        actionLib.setText(this.textBoxOriginChargeCostAmount, originCharges.costAmount);
    }

    this.addPricingAirDestinationCharges=function(destinationCharges){
        // SSR value is less than both MSR and Cost value
        actionLib.verifyElementPresent(this.tabDestinationCharges);
        actionLib.click(this.tabDestinationCharges);
        
        actionLib.setText(this.dropDownDestChargesCharge, destinationCharges.destinationCharge);
        actionLib.setText(this.dropDownDestChargesUnit, destinationCharges.destinationUnit);

        actionLib.setText(this.calenderDestChargesValidityFrom, actionLib.getFutureDate(0));
        actionLib.setText(this.calenderDestChargesValidityTo, actionLib.getFutureDate(10));

        actionLib.verifyElementPresent(this.textBoxDestChargeMsrMinimum);
        actionLib.setText(this.textBoxDestChargeMsrMinimum, destinationCharges.msrMinimum);
        actionLib.setText(this.textBoxDestChargeMsrAmount, destinationCharges.msrAmount);
        actionLib.setText(this.textBoxDestChargeSsrMinimum, destinationCharges.ssrMinimum);
        actionLib.setText(this.textBoxDestChargeSsrAmount, destinationCharges.ssrAmountLess);
        actionLib.setText(this.textBoxDestChargeCostMinimum, destinationCharges.costMinimum);
        actionLib.setText(this.textBoxDestChargeCostAmount, destinationCharges.costAmount);
        actionLib.click(this.btnSaveAddPricingAir);

        actionLib.click(this.btnSaveAddPricingAir);
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
        destinationCharges.ssrMsrCostValidationMsg);

        // SSR value is less than Cost value but more than MSR value
        actionLib.setText(this.textBoxDestChargeMsrAmount, destinationCharges.msrAmountLess);
        actionLib.click(this.btnSaveAddPricingAir);
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
        destinationCharges.ssrMsrCostValidationMsg);

        // SSR value is less than MSR value but more than Cost value
        actionLib.setText(this.textBoxDestChargeMsrAmount, destinationCharges.msrAmount);
        actionLib.setText(this.textBoxDestChargeCostAmount, destinationCharges.costAmountLess);       
        actionLib.click(this.btnSaveAddPricingAir);
        actionLib.verifyElementPresent(this.msgSsrMsrCostValidation);
        actionLib.verifyElementText(this.msgSsrMsrCostValidation, "none",
        destinationCharges.ssrMsrCostValidationMsg);
    }

    this.currencyAgainstChargeShouldDisplayasPerOrigin=function(originCharges){
        actionLib.verifyElementPresent(this.dropDownOrigin);
        actionLib.setText(this.dropDownOrigin, originCharges.originNewYork);
        actionLib.click(this.activeElementLocator);
        actionLib.verifyElementPresent(this.tabOriginCharges);
        actionLib.click(this.tabOriginCharges);
        actionLib.verifyElementPresent(this.dropDownOriginChargesCharge); 
        actionLib.setText(this.dropDownOriginChargesCharge, originCharges.originCharge);
        actionLib.setText(this.dropDownOriginChargesUnit, originCharges.originUnit);
        reqElement = actionLib.getAttributeValue(this.dropDownOriginChargesCurrency, 'value');
        reqElement.then(function(val){
            expect(val).toEqual(originCharges.currencyNewYork);
        });
    }
    this.currencyAgainstChargeShouldDisplayasPerDestination=function(destinationCharges){
        actionLib.verifyElementPresent(this.dropDownDestination);
        actionLib.setText(this.dropDownDestination, destinationCharges.destinationDubai);
        actionLib.verifyElementPresent(this.tabDestinationCharges);
        actionLib.click(this.tabDestinationCharges);
        actionLib.verifyElementPresent(this.dropDownDestChargesCharge); 
        actionLib.setText(this.dropDownDestChargesCharge, destinationCharges.destinationCharge);
        actionLib.setText(this.dropDownDestChargesUnit, destinationCharges.destinationUnit);
        reqElement = actionLib.getAttributeValue(this.dropDownDestChargesCurrency, 'value');
        reqElement.then(function(val){
            expect(val).toEqual(destinationCharges.currencyDubai);
        });
    }

    this.currencyAgainstChargeShouldDisplayasPerOriginOrDestination=function(destinationCharges){
        actionLib.verifyElementPresent(this.dropDownDestination);
        actionLib.setText(this.dropDownOrigin, destinationCharges.originNewYork);
        actionLib.click(this.activeElementLocator);
        actionLib.setText(this.dropDownDestination, destinationCharges.destinationDubai);
        actionLib.verifyElementPresent(this.tabFreightCharges);
        actionLib.click(this.tabFreightCharges); 
        actionLib.verifyElementPresent(this.dropDownFreightChargesCharge); 
        actionLib.setText(this.dropDownFreightChargesCharge, destinationCharges.freightCharge);
        reqElement = actionLib.getAttributeValue(this.dropDownFreightChargesCurrency, 'value');
        reqElement.then(function(val){
            expect(val).toEqual(destinationCharges.currencyDubai);
        });
    }
    // demo feedback point BRD point 1 and 2
    this.verifyAirPricingLabels = function (tableRow, labelsArray) {
        reqElement = by.xpath("//table[@tab-row='" + tableRow + "']//tr");
        var row = element.all(reqElement);
        var cells = row.all(by.xpath("th[@class='text-center']"));
        var count = 0;
        cells.map(function (elm) {
            elm.getText().then(function (val) {
                expect(val).toEqual(labelsArray[count]);
                count += 1;
            });
        });
    }

    this.verifyCountinEnquiryPage=function(){
       
        actionLib.verifyElementPresent(this.linkActiveEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkActiveEnquiry);
        actionLib.verifyElementPresent(this.linkQuoteCreatedEnquiry);
        actionLib.click(this.linkQuoteCreatedEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkQuoteCreatedEnquiry);
        actionLib.verifyElementPresent(this.linkAllEnquiry);
        actionLib.click(this.linkAllEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkAllEnquiry);
    }

    this.verifyCountinQuotationPage=function(){
       
        actionLib.verifyElementPresent(this.linkWaitingForManagerApproval);
        this.verifyLinksCount(this.textRecordsCount,this.linkWaitingForManagerApproval);
        actionLib.verifyElementPresent(this.linkWaitingForCustomerApproval);
        actionLib.click(this.linkWaitingForCustomerApproval);
        this.verifyLinksCount(this.textRecordsCount,this.linkWaitingForCustomerApproval);
        actionLib.verifyElementPresent(this.linkReadyForShipment);
        actionLib.click(this.linkReadyForShipment);
        this.verifyLinksCount(this.textRecordsCount,this.linkReadyForShipment);
        actionLib.verifyElementPresent(this.linkRejectedQuotation);
        actionLib.click(this.linkRejectedQuotation);
        this.verifyLinksCount(this.textRecordsCount,this.linkRejectedQuotation);
        actionLib.verifyElementPresent(this.linkAllQuotation);
        actionLib.click(this.linkAllQuotation);                                                
        this.verifyLinksCount(this.textRecordsCount,this.linkAllQuotation);
    }

    this.verifyCountinShipmentPage=function(){
       

        var subTabsButtons = {
            "btnExportShipments":this.btnExportShipments,
            "btnImportShipments":this.btnImportShipments,
            "btnBothShipments":this.btnBothShipments
        }

        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkBookedShipment);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkReceivedShipment);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkGeneratedShipment);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkClosedShipment);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkCancelledShipment);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkAllShipment);
    }

    this.verifyCountinConsolePage=function(){
       
        var subTabsButtons = {
            "btnExportShipments":this.btnExportShipments,
            "btnImportShipments":this.btnImportShipments,
            "btnBothShipments":this.btnBothShipments
        }

        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkActiveMasterShipments);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkClosedMasterShipments);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkCancelledMasterShipments);
        this.matchRecordsAndLinkCount(subTabsButtons,this.textRecordsCount, this.linkAllMasterShipments);
    }
    // demo feedback point BRD point 1 and 2
    this.verifyFreightChargeMoreInfoLabels = function (labelsArray) {
        reqElement = by.xpath("//div[@class='table-responsive']//tbody");
        var row = element.all(reqElement);
        var cells = row.all(by.tagName('tr'));
        var count = 0;
        cells.map(function (elm) {
            elm.getText().then(function (val) {
                expect(val).toEqual(labelsArray[count]);
                count += 1;
            });
        });
    }

    
    // demo feedback point BRD point 19
    this.verifyLinksCount = function (strRecordsLocator, strLinkLocator) {
        var recordsCount;
        var linkCount;
        element(strRecordsLocator).isPresent().then(function (isPresent) {
            if (isPresent) {
                reqElement = actionLib.getTextByLocator(strRecordsLocator);
                reqElement.then(function (val) {
                    var splitText = val.split(" ");
                    recordsCount = splitText[splitText.length - 1];
                });
            }
            else {
                recordsCount = 0;
            }
            reqElement = actionLib.getTextByLocator(strLinkLocator);
            reqElement.then(function (val) {
                var splitText = val.split("(")[1].split(")");
                linkCount = splitText[0];
                console.log("*** "+strLinkLocator+" ****Link: "+linkCount+" ****Records: "+recordsCount);
                expect(parseInt(linkCount)).toEqual(parseInt(recordsCount));
            });
        });
    }

    // demo feedback point BRD point 19
    // --  strTextRecordsCountLocator for showing 1-10 of 30, subTabsButtons for Export/Import/Both
    // strLinkLocator for Active/Cancelled/Closed etc.
    this.matchRecordsAndLinkCount = function (subTabsButtons, strTextRecordsCountLocator, strLinkLocator) {
        
        actionLib.click(strLinkLocator);
        actionLib.click(subTabsButtons.btnExportShipments);
        this.verifyLinksCount(strTextRecordsCountLocator, strLinkLocator);
        actionLib.click(subTabsButtons.btnImportShipments);
        this.verifyLinksCount(strTextRecordsCountLocator, strLinkLocator);
        actionLib.click(subTabsButtons.btnBothShipments);
        this.verifyLinksCount(strTextRecordsCountLocator, strLinkLocator);
        
        // actionLib.verifyElementPresent(shipmentStatusLocator);
        // actionLib.click(shipmentStatusLocator);
        // actionLib.click(shipmentTypeLocator);
        // this.verifyLinksCount(recordsCountLocator, shipmentStatusLocator);
    }

    // demo feedback point BRD point 8
    this.addAgentCustomer = function(customerDetails){
      
        actionLib.click(customerMoreInfoPage.tabMoreInfo);
        customerMoreInfoPage.fillCustomerType(customerDetails.disableCustomerType);
        customerMoreInfoPage.fillCustomerType(customerDetails.customerType);
        actionLib.scrollToElement(customerMoreInfoPage.textBoxIataCode);
        actionLib.setText(customerMoreInfoPage.textBoxIataCode, customerDetails.iataCode);
        actionLib.verifyElementPresent(customerCommonElementPage.btnSave);
        actionLib.click(customerCommonElementPage.btnSave);
        actionLib.verifyElementPresent(customerCommonElementPage.btnPopUpOk);
        actionLib.click(customerCommonElementPage.btnPopUpOk);
    }

    // demo feedback point BRD point 8
    this.addAgentPort = function(agentPortDetails){
        actionLib.verifyElementPresent(this.btnAddAgentPort);
        actionLib.click(this.btnAddAgentPort);
        actionLib.verifyElementPresent(this.dropDownAgentPortService);
        actionLib.setText(this.dropDownAgentPortService, agentPortDetails.agentPortService);
        actionLib.click(this.activeElementLocator);
        actionLib.setText(this.dropDownAgentPortAgent, globalData.globalData.agentName);
        console.log("agent name "+globalData.globalData.agentName);
        actionLib.setText(this.dropDownAgentPort, agentPortDetails.agentPort);
        actionLib.click(this.btnAgentPortSave);
    }
};
module.exports = new pageDemoFeedBackPoints();
