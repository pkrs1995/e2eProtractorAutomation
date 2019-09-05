var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');
var directShipmentData = require("../../../testdata/dataAirImport/dataShipment/dataDirectShipment.json");


var pageAddShipment = function () {
        var reqElement,dataDirectShipment;
        // Etd,Eta,connectionEta,connectionEtd fields
        var strTodayTime = actionLib.getTodayDate();
        dataDirectShipment = directShipmentData.addDirectShipment[0];
 
        //pageShipmentCargoDetails
        this.subMenuCargoDetails = by.xpath("//span[@title='Cargo Details']");
        this.dropDownCoLoader = by.id("shipment.serviceDetail.coLoader.0");
        this.dropDownDivision = by.id("shipment.serviceDetail.division.0");
        this.dropDownProject = by.id("shipment.serviceDetail.projectSp.0");
        this.uiSwitchHaz = by.xpath("//span[@id='shipment.serviceDetail.hazardous.0']");
        this.uiSwitchOverDimension = by.xpath("//span[@id='shipment.serviceDetail.overDimension.0']");
        this.uiSwitchMinShipment = by.xpath("//span[@id='shipment.serviceDetail.minShipment.0']");
        this.uiSwitchHold = by.xpath("//span[@id='shipment.serviceDetail.hold.0']");
        this.uiSwitchDimensionUnit = by.model("shipmentServiceDetail.documentList[0].dimensionUnit");
        this.textBoxSellRate = by.id("shipment.serviceDetail.0.document.0.ratePerCharge");
        this.textAreaHoldReleaseNote = by.id("shipment.serviceDetail.holdReleaseNote.0");
        this.textAreaPieces =by.id("shipment.serviceDetail.0.document.noOfPieces.0");
        
        //specify "none" for parameters which you don't want to fill
        this.addShipmentCargoDetails = function (strInput) {
        
                //harcoded the customer name from global
                actionLib.setText(this.dropDownCoLoader,globalData.globalData.importCustomerName);
                actionLib.click(this.uiSwitchHaz);
                actionLib.click(this.uiSwitchOverDimension);
                actionLib.click(this.uiSwitchMinShipment);
                //actionLib.click(this.uiSwitchHold); //hold falg is not selected
                actionLib.click(this.uiSwitchDimensionUnit);
                //actionLib.setText(this.textBoxSellRate, strInput.sellRate); //flag is not selected
                actionLib.scrollToElement(this.textAreaHoldReleaseNote);
                actionLib.setText(this.textAreaHoldReleaseNote, strInput.holdReleaseNote);
        }
        
        //Shipment Hawb page
        this.subMenuHawb = by.xpath("//span[@title='HAWB']");
        this.dropDownShipper = by.id("shipment.serviceDetail.0.document.shipper.0");
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

        //different drop down
        this.selectDropDownActiveElement = function (strLocator, strText) {
                actionLib.setText(strLocator, strText);
                reqElement = by.xpath("//span[@class='ng-binding']/strong");
                actionLib.verifyElementPresent(reqElement);
                actionLib.click(reqElement);
        }

        //direct shipment- locators
        this.btnDirectShipment = by.css("[ng-click='viewAddNewShipment()']");
        this.customerdropdown =by.id("shipment.serviceDetail.party.0");
        this.tosDropdown = by.id("shipment.serviceDetail.tos.0");
        this.commoditydropdown = by.id("shipment.serviceDetail.commodity.0");
        this.origindropdown = by.id("shipment.serviceDetail.origin.0");
        this.dischargeDropdown = by.id("shipment.serviceDetail.pod.0");
        this.selfRoutedBydropdown = by.id("shipment.serviceDetail.routedby.0");
        this.grossWeightKG = by.id("shipment.serviceDetail.0.document.grossWeightKg.0");
        this.btnCancel = by.css("[ng-click='cancelToList()']");
        this.consigneeDropdown = by.id("shipment.serviceDetail.0.document.consignee.0");
        this.cargoLink =  by.xpath("//span[@title='Cargo Details']");
        this.MAWBlink =   by.xpath("//span[@title='HAWB']");
        this.btnedit = by.xpath("//i[@class='icon-edit']");
        this.eventsButton = by.css('[ng-click="eventmodel(shipmentServiceDetail, $index)"]');
        this.eventsName = by.id("0eventMaster0");
        this.eventsDate = by.id("0eventDateTab0");
        this.saveButton = by.xpath('//button[.="Save"]');
        this.cancelbutton = by.xpath('//button[.="Cancel"]');
        this.QuotationId = by.xpath("//div[@class='ngdialog-content']//p[1]");
        this.attachToMaster = by.css('[ng-click="serviceToConsol(shipment,shipmentServiceDetail)"]');
        this.masterLabel = by.xpath("//*[@class = 'panel-heading bg-trans']//h4");
        this.agentParty = by.id("consolPartyAgent");
        this.documentConsole = by.xpath("(//span[@class='tickmrk'])[3]");
        this.shipperdropdown = by.id("shipper");
        this.consigneedropdown = by.id("consigneeConsolDoc");
        this.volumeWeightKG = by.xpath('[ng-model="consol.consolDocument.volumeWeight"]');



        
        
        
        //create shipment
        this.createDirectShipment = function(shipment) {
                actionLib.setText(this.customerdropdown, globalData.globalData.importCustomerName)  
                actionLib.setText(this.tosDropdown, shipment.termsofshipment);
                actionLib.setText(this.commoditydropdown, shipment.commoditygroup);
                efsLib.selectTableDropdown(this.origindropdown,1, shipment.origin);
                efsLib.selectTableDropdown(this.dischargeDropdown, 1 , shipment.airportOfDischarge);
                actionLib.setText(this.selfRoutedBydropdown, shipment.selfRoutedBy);
                actionLib.setText(this.shipmentDate, actionLib.getTodayDate());   
                actionLib.click(this.cargoLink);
                actionLib.setText(this.textAreaPieces, shipment.pieces);
                actionLib.setText(this.grossWeightKG, shipment.grossWeightKG);
                actionLib.click(this.MAWBlink);
                this.selectDropDownActiveElement(this.dropDownShipper, globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.consigneeDropdown, globalData.globalData.customerName);
                actionLib.click(this.btnSave);
                this.getShipmentId(this.QuotationId,"1");  
                actionLib.click(this.btnPopUpOk);
                actionLib.click(this.btnCancel);
               
        }

        //label text verification  
        this.verifyLabelText = function(strLabel){

           var reqElement = element(by.xpath("//*[contains(text(),'" + strLabel + "')]"));
           expect(reqElement.getText()).toContain(strLabel)
        }

        //servicedropdown
        this.fillService =  function(strText) {
                reqElement = by.id("shipment.serviceDetail.serviceMaster.0");
                actionLib.setText(reqElement,strText);
                reqElement = by.className("uib-typeahead-match ng-scope active");
                actionLib.click(reqElement);
        }

        //specify "none" for parameters which you don't want to fill
        this.addShipmentHawb = function (strInput) {
                // global customer names
                this.selectDropDownActiveElement(this.dropDownShipper, globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.dropDownNotifyCustomer1, globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.dropDownNotifyCustomer2, globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.dropDownForwarder,globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.dropDownIssuingAgent, globalData.globalData.importCustomerName);
                this.selectDropDownActiveElement(this.dropDownCustomHouseAgent, globalData.globalData.importCustomerName);
                actionLib.scrollToElement(this.textAreaHandlingInfo);
                actionLib.setText(this.textAreaHandlingInfo, strInput.handlingInfo);
                actionLib.scrollToElement(this.textAreaAccountingInfo);
                actionLib.setText(this.textAreaAccountingInfo, strInput.accountingInfo);
                actionLib.scrollToElement(this.textAreaCommodityDescription);
                actionLib.setText(this.textAreaCommodityDescription, strInput.commodityDescription);
                actionLib.scrollToElement(this.textAreaMarksNo);
                actionLib.setText(this.textAreaMarksNo, strInput.marksNo);
        }
        
        //new shipment - shipment locators 
        this.linkShipment = by.xpath("//a[@href='#/myAirImportTask?activeTab=Shipment']");
        this.btnCreateShipment = by.xpath("//button[@class='btn btn-primary btn-xs btn-property accent-btn']");
        this.uiSwitchDirect = by.id("shipment.serviceDetail.directShipment.0");
        this.uiSwitchFreight = by.id("shipment.serviceDetail.ppcc.0");
        this.uiSwitchRouted = by.id("shipment.serviceDetail.whoRouted.0");
        this.uiSwitchClearance = by.id("shipment.serviceDetail.isClearance.0");
        this.btnSave = by.xpath("//input[@ng-click='saveShipment()']");
        this.btnPopUpOk = by.xpath("//button[@ng-click='confirm(1)']");
        this.textAirportOfDischarge =by.id("shipment.serviceDetail.pod.0");
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

        this.attachToMaster = by.xpath("(//button[@type='button'])[4]");
        //error Message
        this.mawberrorMessage = by.xpath("//span[text()='MAWB number is mandatory']");
        
        //specify "none" for parameters which you don't want to fill
        this.addShipmentServiceRouting = function () { // no need to pass parameter because all are click statements
        
                actionLib.click(this.uiSwitchDirect);
                actionLib.click(this.uiSwitchFreight);
                //actionLib.click(this.uiSwitchRouted); Routed By field is empty because of the select the Agent falg
                actionLib.click(this.uiSwitchClearance);   
                actionLib.setText(this.textAirportOfDischarge,"Bangalore");
                actionLib.setText(this.shipmentDate, actionLib.getTodayDate());     
        }
        
        //specify "none" for parameters which you don't want to fill
        this.addShipmentRoutingCarrierInfo = function (strInput) {
                
                actionLib.setText(this.dropDownCarrier, strInput.carrier);
                actionLib.setText(this.textBoxFlightNo, strInput.flightNo);
                actionLib.setText(this.textBoxMawbNo, strInput.mawbNo);
                actionLib.setText(this.calenderEtd, strTodayTime);   //Etd   
                actionLib.setText(this.calenderEta, strTodayTime);   //Eta 
        }
        
        //specify "none" for parameters which you don't want to fill
        this.addShipmentConnections = function (strInput) {
                actionLib.scrollToElement(this.dropDownMove);  
                efsLib.selectDropdown(this.dropDownMove, strInput.connectionsMove);
                actionLib.setText(this.dropDownFrom, strInput.connectionsFrom);
                actionLib.setText(this.dropDownTo, strInput.connectionsTo);
                actionLib.setText(this.calenderConnectionEtd, strTodayTime);  //connectionEtd
                actionLib.setText(this.calenderConnectionEta, strTodayTime);  //connectionEta
                actionLib.setText(this.dropDownCarrierVessel, strInput.connectionsCarrierVessel);
                actionLib.setText(this.textBoxVoyFltNo, strInput.connectionsVoyFltNo);
                efsLib.selectDropdown(this.dropDownStatus, strInput.connectionsStatus);
        }

        //getShipmentId then store here
        this.getShipmentId = function (strLocator, strIndex) {
                var reqElement =element(strLocator);
                reqElement.getText().then(function (text) {
                   var splitText = text.split(" ");
                   var strName = splitText[strIndex];
                   globalData.globalData.shipmentId = strName;
                    return text;
                });
        }

        this.  clickOnButton = function(buttonName) {
                switch (buttonName.toLowerCase()) 
                {
                case "save":
                        actionLib.click(this.saveButton);
                        break;
                case "cancel":
                        actionLib.click(this.cancelbutton); 
                        break;
                case "update" : 
                        actionLib.click(this.btnSave);
                        break;
                case "edit":
                        actionLib.click(this.btnedit)
                        break;
                case "popup":
                        actionLib.click(this.btnPopUpOk);
                default:
                        console.log(buttonName + "button is not available");
                        break;
                }

        }
        
 
 };
module.exports = new pageAddShipment();
