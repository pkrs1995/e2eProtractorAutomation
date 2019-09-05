var actionLib = require('../../../library/action.js');
var efsLib    = require('../../../library/appspecificactions.js');

var pageEnquiry = function () {

    var pe = this;

    pe.addEnquiryBtn = by.xpath("//*[@class= 'btn btn-primary btn-xs btn-property accent-btn']");

    pe.clickOn = function (btnName) {
        switch (btnName.toLowerCase()) {
            case 'add enquiry':
                actionLib.click(pe.addEnquiryBtn);
                break;
            default:
                console.log(btnName +' Button is not available')
                break;
        }
    }

    pe.searchEnquiryBy = function (allFieldAndData) { // not fully done
        switch ('') {
            case '':
                efs.fillTextInTableColumn();
                break;
            case '':
                efs.fillTextInTableColumn();
                break;
            case '':
                efs.fillTextInTableColumn();
                break;
            case '':
                efs.fillTextInTableColumn();
                break;
            default:
                console.log(tabName +' Button is not available')
                break;
        }
    }

    pe.openTab = function (tabName) {
        switch (tabName.toLowerCase()) {
            case 'active':
                actionLib.click();
                break;
            case 'quote created':
                actionLib.click();
                break;
            case 'cancelled':
                actionLib.click();
                break;
            case 'all':
                actionLib.click();
                break;
            default:
                console.log(tabName +' Button is not available')
                break;
        }
    }

    
} 

module.exports = new pageEnquiry();