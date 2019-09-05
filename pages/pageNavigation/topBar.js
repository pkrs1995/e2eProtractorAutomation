var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');

var topBar = function () {

    this.expandLogout = by.xpath('//b[@class="caret"]');
    this.linkLogout = by.xpath('//a[contains(text(),"Logout")]');
    
    this.linkChnageProfile = by.className('list-panel-edit-btn cursorPt');
    this.changeProfileCompanyDropdown =by.model('userProfile.selectedCompany');
    this.changeProfileLocationDropdown = by.model('userProfile.selectedUserLocation');
    this.changeProfilePopupCloseButton = by.className('btn btn-property accent-btn pull-right mr20');

    this.profileName = by.xpath("//*[@class='user-profile-cls']/span[2]");
    this.recentButton = by.className('TasksMenu ng-scope');
    this.recentPage= by.className('recent-docs logs-transition');

    this.changeProfileTO = function ( company, location) {
        actionLib.click(this.expandLogout);
        actionLib.click(this.linkChnageProfile);
        efsLib.selectDropdown(this.changeProfileCompanyDropdown, company);
        efsLib.selectDropdown(this.changeProfileLocationDropdown, location);
        actionLib.click(this.changeProfilePopupCloseButton);
        expect(browser.getCurrentUrl()).toContain("#/mytask"); // page should navigate to my task (landing) page
    }

    this.appLogout = function () {
        actionLib.click(this.expandLogout);
        actionLib.click(this.linkLogout);
        var EC = protractor.ExpectedConditions;
        // Wait for new page url to contain login
        browser.wait(EC.urlContains('login'), 30000);
        expect(browser.getCurrentUrl()).toContain('#/login');
    }

    this.isLogedInAsUser= function(userName){
        actionLib.getTextByLocator(this.profileName).then(function (name) {
            // because getTextByLocator returns a promise
            expect(name.toLowerCase()).toEqual(userName.toLowerCase());
        })
        
    }

    this.openRecent = function () {
        actionLib.click(this.recentButton);
        actionLib.verifyElementPresent(this.recentPage);
    }

    
}

module.exports = new topBar();