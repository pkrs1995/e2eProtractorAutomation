var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');
var globalData = require('../../../testdata/dataGlobal/dataGlobal.json');


var pageEnquiry = function() {

     //Navigate from left side menu tabs to Sales -> Enquiry
     this.textRecordsCount = by.className("meta-data ng-binding");
     this.linkActiveEnquiry = by.xpath("//li[@ng-click=\"setSearch('active'); detailTab='active'\"]");
     this.linkQuoteCreatedEnquiry = by.xpath("//li[@ng-click=\"setSearch('quote'); detailTab='quoteCreated'\"]");
     this.linkCancelledEnquiry = by.xpath("//li[@ng-click=\"setSearch('cancel'); detailTab='cancel'\"]");
     this.linkAllEnquiry = by.xpath("//li[@ng-click=\"setSearch('all'); detailTab='all'\"]");
     this.QuoteByDate = by.xpath();

     this.filterQuoteByDate = function(strInput) {
            var QuoteByDate = by.xpath("//div[2]/div[1]/ul[1]/li[text()='" +strInput+"']")
            actionLib.click(QuoteByDate);
     }

     this.verifyCountinEnquiryPage=function() {
        //tab - create enquiry
        actionLib.verifyElementPresent(this.linkActiveEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkActiveEnquiry);
        //tab-quote created
        actionLib.verifyElementPresent(this.linkQuoteCreatedEnquiry);
        actionLib.click(this.linkQuoteCreatedEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkQuoteCreatedEnquiry);
        //tab- cancelled enquiry
        actionLib.verifyElementPresent(this.linkCancelledEnquiry);    
        actionLib.click(this.linkCancelledEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkCancelledEnquiry);
        //tab -all enquiry
        actionLib.verifyElementPresent(this.linkAllEnquiry);
        actionLib.click(this.linkAllEnquiry);
        this.verifyLinksCount(this.textRecordsCount,this.linkAllEnquiry);
    }

    //links count in Enquiry Page 
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



     














}

module.exports = new pageEnquiry();