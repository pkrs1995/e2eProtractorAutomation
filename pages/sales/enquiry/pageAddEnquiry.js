var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageAddEnquiry = function () {

    var pae=this;
    pae.btnSave = by.xpath("//input[@class='btn btn-primary btn-xs btn-property accent-btn']");
    pae.btnCancel = by.xpath("//button[@class='btn btn-default btn-xs btn-property cancel-btn']");
    // this.btnEdit = by.xpath("//a[@ng-click='editEnquiry()']");
    // this.btnUpdate = by.xpath("//input[@value='Update']");

    pae.popupMessage = by.xpath("//p[@class = 'ng-binding']");

    pae.dropDownCustomer = by.id("partyName");
    pae.dropDownSalesMan = by.id("salesMan");
    pae.dropDownSalesCordinator = by.id("salesCoordinator");
    pae.calenderEnquiryReceived = by.id("receivedOn");
    pae.calenderQuoteByDate = by.id("quoteBy");
    pae.serviceIndex=0;
    pae.enquiryId;

    pae.setPrimary = function (primaryData) {
        efsLib.selectNormalDropdown(pae.dropDownCustomer,primaryData.customerName);
        efsLib.selectNormalDropdown(pae.dropDownSalesCordinator,primaryData.salesCordinator);
        efsLib.selectNormalDropdown(pae.dropDownSalesMan,primaryData.salesMan);
        efsLib.selectNormalDropdown(pae.calenderEnquiryReceived,primaryData.enquiryReceived);
        efsLib.selectNormalDropdown(pae.calenderQuoteByDate,primaryData.quoteByDate);
    }

    pae.service = {
        addNewService : by.css('[ng-click="addNewService()"]'),
        btnRemarks : by.xpath("//button[@ng-click='openRemarksPopUp($index)']"),
        btnRemarksSave : by.className("btn btn-primary btn-xs btn-property accent-btn ml0"),
        btnAttachment : by.xpath("//button[@ng-click='openAttachmentPopUp($index)']"),
        attachmentBrowseBtn : by.css("input[type='file']"),
        btnAddAttachment : by.className('btn btn-primary btn-xs btn-property accent-btn pull-left mb-5'),
        btnAttachmentSave : by.className("btn btn-primary btn-xs btn-property accent-btn ml0"),
        addService : function (serviceData, serviceindex) {
            pae.serviceIndex = serviceindex;
            //below is for multiple service and edit condition
            if (pae.serviceIndex>0) {
                actionLib.click(this.addNewService);
                browser.sleep(3000)
            }
            //bellow is not working in multi service
            // efsLib.clickOnRadioButton('Trade',serviceData.trade);
            // efsLib.clickOnRadioButton('Service',serviceData.service);
            efsLib.selectTableDropdown(by.id("origin" +pae.serviceIndex ),1,serviceData.origin);
            efsLib.selectTableDropdown(by.id("destination" +pae.serviceIndex),1,serviceData.destination);
            efsLib.selectNormalDropdown(by.id("tos"+pae.serviceIndex),serviceData.tos );
            efsLib.chooseFromSwitch(by.id("clearance"+pae.serviceIndex), serviceData.clearance);
            efsLib.chooseFromSwitch(by.id("hazardous"+pae.serviceIndex), serviceData.hazardousGoods);
            efsLib.selectNormalDropdown(by.id("commodity"+pae.serviceIndex),serviceData.commodityGroup);
            if (serviceData.remarks != undefined) {
                actionLib.getRequiredElement(this.btnRemarks,0).click();
                actionLib.setText(by.id("notes"+pae.serviceIndex), serviceData.remarks);
                actionLib.click(this.btnRemarksSave); 
            }
            if (serviceData.attachments != undefined) {
                actionLib.getRequiredElement(this.btnAttachment,0).click();
                var count = Object.keys(serviceData.attachments).length;
                tabindex=0;
                for (const key in serviceData.attachments) {
                    actionLib.setText(by.id("EnqSerAtt"+pae.serviceIndex+"attachRefNo" + tabindex), key); 
                    actionLib.uploadFileTOElement(element.all(this.attachmentBrowseBtn).last(), serviceData.attachments[key] );
                    if (count > 1) {
                        actionLib.click(this.btnAddAttachment);
                        count--;
                        tabindex++;
                    }
                } 
                actionLib.click(this.btnAttachmentSave);
            }
            
        }
    }

    pae.dimensions = {
        btnAddDimension : by.xpath("//dimension-table[@country-master='enquiryLog.countryMaster']/a"),
        dimensionValueField : by.model("enquiryDetail.dimensionUnitValue"),
        addDimensions : function (dimensionsData, tableIndex) {
            btnDimensionUnit = by.xpath("(//*[@id='enabled'][@role='button'])["+(pae.serviceIndex+1)+"]");
            var arrayIndex = 0, webTableIndex = 0, dimensionArray = dimensionsData.dimension;
            var  volumeIndex = 0;
            efsLib.chooseFromSwitch(btnDimensionUnit,dimensionsData.dimensionUnit);
            if (tableIndex !=undefined && tableIndex >0) {
                webTableIndex = tableIndex-1;
                actionLib.getRequiredElement(this.btnAddDimension,0).click();
            }
            if (dimensionArray != undefined) {
                for ( ; arrayIndex < dimensionArray.length; arrayIndex++) {
                    volumeIndex++;
                    actionLib.setText(by.id('EnqSer'+pae.serviceIndex+'noOfPiece'+webTableIndex), dimensionArray[arrayIndex].noOfPieces);
                    actionLib.setText(by.id('EnqSer'+pae.serviceIndex+'length'+webTableIndex), dimensionArray[arrayIndex].length);
                    actionLib.setText(by.id('EnqSer'+pae.serviceIndex+'width'+webTableIndex), dimensionArray[arrayIndex].width);
                    actionLib.setText(by.id('EnqSer'+pae.serviceIndex+'height'+webTableIndex), dimensionArray[arrayIndex].height);
                    // bellow is not working in multi service
                    // expect(actionLib.getTextByLocator(by.xpath("//tr["+volumeIndex+"]/td[@data-headtitle='Height (cm)']/following-sibling::td[1]"))).toBe(dimensionArray[arrayIndex].volumeWeight);
                    actionLib.setText(by.id('EnqSer'+pae.serviceIndex+'grossWeight'+webTableIndex), dimensionArray[arrayIndex].grossWeight);
                    if (arrayIndex+1 < dimensionArray.length ) {
                        actionLib.getRequiredElement(this.btnAddDimension,0).click();
                    }
                    webTableIndex++;
                }   
            }
            if (dimensionsData.dimensionValue != undefined) {
                expect(actionLib.getAttributeValue(this.dimensionValueField,'value')).toBe(dimensionsData.dimensionValue);   
            }
        },
    }

    pae.pickUpDelivery = {

        enterAdressDetails : function (adress) {
            textBoxPickUpAddress1 = by.id("pickupAddress.addressLine1"+pae.serviceIndex),
            textBoxPickUpAddress2 = by.model("enquiryDetail.pickupAddress.addressLine2"),
            textBoxPickUpAddress3 = by.model("enquiryDetail.pickupAddress.addressLine3"),
            textBoxPickUpPoBox = by.model("enquiryDetail.pickupAddress.poBox"),
            dropDownPickUpCity = by.id("enquiryDetail.pickupAddress.city."+pae.serviceIndex),
            dropDownPickUpState = by.id("enquiryDetail.pickupAddress.state."+pae.serviceIndex),
            dropDownPickUpCountry = by.id("enquiryDetail.pickupAddress.country."+pae.serviceIndex),
            textBoxDeliveryAddress1 = by.id("deliveryAddress"+pae.serviceIndex),
            textBoxDeliveryAddress2 = by.model("enquiryDetail.deliveryAddress.addressLine2"),
            textBoxDeliveryAddress3 = by.model("enquiryDetail.deliveryAddress.addressLine3"),
            textBoxDeliveryPoBox = by.model("enquiryDetail.deliveryAddress.poBox"),
            dropDownDeliveryCity = by.id("enquiryDetail.deliveryAddress.city."+pae.serviceIndex),
            dropDownDeliveryState = by.id("enquiryDetail.deliveryAddress.state."+pae.serviceIndex),
            dropDownDeliveryCountry = by.id("enquiryDetail.deliveryAddress.country."+pae.serviceIndex),
            actionLib.setText(textBoxPickUpAddress1,adress.fromAdress1);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxPickUpAddress2,0),adress.fromAdress2);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxPickUpAddress3,0),adress.fromAdress3);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxPickUpPoBox,0), adress.fromPoBox);
            efsLib.selectNormalDropdown(dropDownPickUpCity, adress.fromCity);
            efsLib.selectNormalDropdown(dropDownPickUpState, adress.fromState);
            efsLib.selectNormalDropdown(dropDownPickUpCountry, adress.fromCountry);

            actionLib.setText(textBoxDeliveryAddress1, adress.toAdress1);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxDeliveryAddress2,0), adress.toAdress2);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxDeliveryAddress3,0), adress.toAdress3);
            actionLib.setTextToElement(actionLib.getRequiredElement(textBoxDeliveryPoBox,0), adress.toPoBox);
            efsLib.selectNormalDropdown(dropDownDeliveryCity, adress.toCity);
            efsLib.selectNormalDropdown(dropDownDeliveryState, adress.toState);
            efsLib.selectNormalDropdown(dropDownDeliveryCountry, adress.toCountry);
        },
    }

    pae.valueAddedServices = {
        addService : function () {
        },
    }

    pae.rateRequest = {
        btnAddVendor: by.xpath("//div/a[@ng-click=\"fnRole({param:addRole})?addRow():''\"]"), 
        addVendor : function (vendorDetails, tableIndex) {
            var arrayIndex = 0, webTableIndex = 0, vendorArray = vendorDetails.vendor;
            if (tableIndex !=undefined && tableIndex >0) {
                webTableIndex = tableIndex-1;
                actionLib.getRequiredElement(this.btnAddVendor,0).click();
            }
            for ( ; arrayIndex < vendorArray.length; arrayIndex++) {
                efsLib.selectNormalDropdown(by.id('EnqRR'+pae.serviceIndex+'vendorName'+webTableIndex), vendorArray[arrayIndex].vendor);
                actionLib.setText(by.id('EnqRR'+pae.serviceIndex+'contactPerson'+webTableIndex), vendorArray[arrayIndex].contactPerson);
                actionLib.setText(by.id('EnqRR'+pae.serviceIndex+'email'+webTableIndex), vendorArray[arrayIndex].eMail);
                efsLib.selectDefaultDropdown(by.id('EnqRR'+pae.serviceIndex+'rateAccepted'+webTableIndex), vendorArray[arrayIndex].Final);
                if (arrayIndex+1 < vendorArray.length ) {
                    actionLib.getRequiredElement(this.btnAddVendor,0).click();
                }
                webTableIndex++;
            }
            ///Add Enquiry Rate Request section --> charge details entering is pending
                // this.iconShowCharge = by.className("fa fa-external-link ng-scope");
                // this.dropDownChargeCode = by.id("0chargeCodeField0");
                // this.dropDownUnitCode = by.id("0unitMaster0");
                // this.dropDownCurrency = by.id("0currency0");
                // this.textBoxBuyRate = by.id("0buyRate0");
                // this.textBoxMinAmt = by.id("0minAmt0");
                // this.btnChargeDetailSave = by.xpath("//button[@class='btn accent-btn']");
                // this.iconRateRequestDelete = by.css(".icon-delete.ng-scope");
        },
    }

    pae.accordion = function (reqAction,sectionName) {
        var accordinIndex= pae.serviceIndex+1;

        var dimensions = by.xpath("((//div[@ng-class=\"isDimensionFound(enquiryDetail)?'done-approve':''\"][@role='button'])["+accordinIndex+"]//i)[2]");
        var pickUpDelivery =by.xpath("((//div[@ng-class=\"isPickupDeliveryFound(enquiryDetail)?'done-approve':''\"][@role='button'])["+accordinIndex+"]//i)[2]");
        var valuAddedService = by.xpath("((//div[@ng-class=\"isValueAddedFound(enquiryDetail)?'done-approve':''\"][@role='button'])["+accordinIndex+"]//i)[2]");
        var rateRequest = by.xpath("((//div[@ng-class=\"isRateRequestFound(enquiryDetail)?'done-approve':''\"][@role='button'])["+accordinIndex+"]//i)[2]");
        switch (sectionName.toLowerCase()) {
            case 'dimensions':
                efsLib.accordionAction(dimensions,reqAction);
                break;
            case 'pick up / delivery':
                efsLib.accordionAction(pickUpDelivery,reqAction);
                break;
            case 'value added services':
                efsLib.accordionAction(valuAddedService,reqAction);
                break;
            case 'rate request':
                efsLib.accordionAction(rateRequest,reqAction);
                break;
            default:
                console.log('Given Section Name '+sectionName+' is not available');
                break;
        }
    }

    pae.clickOn = function (btnName) {
        switch (btnName.toLowerCase()) {
            case 'save':
                actionLib.click(pae.btnSave);
                break;
            case 'cancel':
                actionLib.click(pae.btnCancel);
                break;
            default:
                console.log(btnName +' Button is not available')
                break;
        }
    }

    pae.clickConfirmationPopupAs = function (buttonName) {
        var confirmationOkButton = by.buttonText(buttonName);
        actionLib.click(confirmationOkButton)
    }

    pae.getEnquiryId = function () {
        return efsLib.getIdOf('Enquiry',pae.popupMessage).then(function (reqId) {
            return reqId;
        })
    }

};

module.exports = new pageAddEnquiry();
