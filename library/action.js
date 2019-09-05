/* 
Description : This file contains all the re-usable functions required 
*/

var action = function () {

    var path        = require('path');
    var fs          = require('fs');

    //** task : 1 CALL BELOW ACTION VARIABLES - IF WE USED BELOW IN MOVED FUNCTIONS - CREATE IN ALL CLASS OR MOVE TO ONE PLACE */
    var expectedCondition = protractor.ExpectedConditions;
    var longWait    = 30000;
    var shortWait   = 10000;
    var avgWait     = 20000;

    //** WHY THIS VARIABLE REQUIRED IN CLASS LEVEL? */
    //** task : 2 MOVE THIS TO FUNCTION LEVEL */
    this.linkCountBeforeAdd;
    this.linkCountAfterAdd;

    //** DEPRICATED: WILL BE MOVED TO APPSPEC OR TOP NAVIGATION */
    //** task : 3 MOVE THIS TO TOP NAVIGATON - THIS BELONGS TO HAMBURGER */
    //** DONT ALLOW TO ACCESS THIS FROM PAGES AND TESTS */
    // project reusable xpaths 
    this.menuTasks                  = by.xpath("//a[@data-title='Tasks']");
    this.subMenuMyTasks             = by.className("col-xs-9 ptb14 pl10 ng-binding");
    this.menuSales                  = by.xpath("//a[@data-title='Sales']");
    this.subMenuEnquiry             = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding' and text()='Enquiry']");
    this.subMenuQuotation           = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding' and text()='Quotation']");
    this.menuCrm                    = by.xpath("//a[@data-title='CRM']");
    this.subMenuShipment            = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding' and text()='Shipment']");
    this.menuAir                    = by.xpath("//a[@data-title='Air']");
    this.subMenuMasterShipment      = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding' and text()='Master Shipment']");
    this.menuSetup                  = by.css(".icon-setup");
    this.subMenuAppConfiguration    = by.xpath("//b[@class='col-xs-9 ptb14 pl10 ng-binding' and text()='App Configuration']");
    this.mainMenu                   = by.className("icon-menu hamburger-icon iconbar");
     
     //get a Random String 
    this.getRandomString = function(length) {
    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
            for (i = 0; i < length; i++) {
                string += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            return string;
    };
        
    //gets a random number between min and max
    this.getRandomNum = function(min, max){
    return parseInt(Math.random() * (max - min) + min);
    };

    // sending data to the text fields
    this.setText = function (strLocator, strInput) {
        if (strInput != undefined) {
            try {
                browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
                var reqElement = element(strLocator);
                browser.actions().mouseMove(reqElement).perform();
                reqElement.clear(); 
                reqElement.sendKeys(strInput);
            }catch(error) {
                console.log("The error is occured "+ error.name +error.message )  
            }
        } 
    };
    this.setTextToElement = function (reqElement, strInput) {
        if (strInput != undefined) {
            try {
                browser.wait(expectedCondition.presenceOf(reqElement), avgWait);
                browser.actions().mouseMove(reqElement).perform();
                reqElement.clear(); 
                reqElement.sendKeys(strInput);
            }catch(error) {
                console.log("The error is occured "+ error.name +error.message )  
            }
        } 
    };

    // verify the entered text in a field 
    this.verifyEnteredText = function (reqLocator,enteredText) {
        element(reqLocator).getAttribute("value").then(function (textPresent) {
            expect(textPresent).toBe(enteredText.toString());
        })
    };

    //click the links and submit buttons
    this.click = function (strLocator) {
        var reqElement = element(strLocator);
        browser.wait(expectedCondition.presenceOf(reqElement), longWait);
        browser.actions().mouseMove(reqElement).perform();
        reqElement.click().then(null,function(error) {
            console.log("The error is occured "+ error.name) 
        }) 
    };

    // getting page title
    this.getPageTitle = function () {
        return browser.getTitle();
    };

    this.dragAndDrop = function (strLocatorDrag, strLocatorDrop) {
        var dragElement = element(strLocatorDrag);
        var dropElement = element(strLocatorDrop);
        browser.actions().
            dragAndDrop(dragElement, dropElement).
            perform();  
    };

    this.switchToFrame = function (strLocator) {
        var reqElement = element(strLocator);
        browser.switchTo().frame((reqElement).getWebElement());
    };

    this.handleAlert = function (strOperation) { // strOperation nothing but  "ok" or "Cancel"
        // Waits for an alert pops up.
        browser.wait(expectedCondition.alertIsPresent(), shortWait);
        var alertWindow = browser.switchTo().alert();
        if (strOperation.toLowerCase() == "ok") {
            alertWindow.accept();
        } else if (strOperation.toLowerCase() == "cancel") {
            alertWindow.dismiss();
        } else {
            // added for future perspective
        }
        // expect().toBe(false)
    };

   // to verify element present in the DOM or not
    this.verifyElementPresent = function (strLocator) { 
        var reqElement = element(strLocator);
        browser.wait(expectedCondition.presenceOf(reqElement), longWait);
        expect(reqElement.isDisplayed()).toBe(true);
    };

    //objElement = "none" for locator
    //strLocator = "none" for element
    this.verifyElementText = function (strLocator, objElement, strText) {
        var reqElement;
        if (objElement === "none") {
            browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
            reqElement = element(strLocator);
        }
        else if (strLocator === "none") {
            reqElement = objElement;
        }
        expect(reqElement.getText()).toEqual(strText);
    };

    this.verifyElementPartialText = function (strLocator, strText) {
        browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
        var reqElement = element(strLocator);
        expect(reqElement.getText()).toContain(strText);
    };

    this.compareString = function (strExpected, strActual) {
        expect(strExpected).toContain(strActual);
    };

    this.switchToWindow = function (windowHandleNum) {
        var countFlag = false;
        browser.wait(function () {
            browser.getAllWindowHandles().then(function (handles) {
                if (handles[windowHandleNum]) {
                    browser.switchTo().window(handles[windowHandleNum]);
                    countFlag = true;
                    return true;
                }
                else {
                    return false;
                }
            });
            return countFlag;
        }, 10000)
    }

    this.performMouseHover = function (strLocator) {
        var reqElement = element(strLocator);
        browser.actions().mouseMove(reqElement).perform();
    };

    this.getTextByLocator = function (strLocator) {
        var reqElement = element(strLocator);
        return reqElement.getText().then(function (text) {
            return text;
        });
    };

    this.getAttributeValue = function (strLocator, strAttribute) {
        var reqElement = element(strLocator);
        return reqElement.getAttribute(strAttribute);
    };

    //-- getText() gives promise so to verify the incremented value than the previous
    //first call with second attribute as none, then add enquiry/quotation etc and again call 
    // function to get updated count and to verify the same.
    this.verifySplitCountOfLocator = function (strLocator, strAttribute) {
        var reqElement = element(strLocator);
        reqElement.getText().then(function (text) {
            console.log(text);
            var splitText = text.split("(")[1].split(")");
            console.log(splitText)
            if (strAttribute == "none") {
                this.linkCountBeforeAdd = parseInt(splitText[0]);
            }
            else {
                this.linkCountAfterAdd = splitText[0];
                expect(this.linkCountAfterAdd).toEqual((this.linkCountBeforeAdd + 1).toString());
            }
        });
    };

    // intIndex = 1 for first element
    // intIndex = 0 for last element
    // intIndex = 3 for element indexed at 3
    this.getRequiredElement = function (strLocator, intIndex) {

        var reqElement;
        if (typeof(intIndex) == 'number') {
            browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
            var reqElements = element.all(strLocator);
        }
        if (intIndex == 0) {
            reqElement = reqElements.last();
        }
        else if (intIndex == 1) {
            reqElement = reqElements.first();
        }
        else {
            reqElement = reqElements.get(intIndex);
        }
        return reqElement;
    };

    this.getTodayTime = function () {
        var todayDate = new Date();
        var todayHour = todayDate.getHours();
        var todayMin = todayDate.getMinutes();
        var todaySec = todayDate.getSeconds();
        var strTodayTime = todayHour.toString() + todayMin.toString() + todaySec.toString();
        return strTodayTime;
    };

    this.getChainedElement = function (strParentLocator, strChildLocator) {
        var reqElement;
        if (strParentLocator != "" && strChildLocator != "") {
            browser.wait(expectedCondition.presenceOf(element(strParentLocator).element(strChildLocator)), avgWait);
            reqElement = element(strParentLocator).element(strChildLocator);
        }
        else {
            reqElement = "";
        }
        return reqElement;
    };

    this.uploadFile = function (strLocator, strFileRelativePath) {
        var strFileAbsPath = path.resolve(__dirname, strFileRelativePath);
        browser.wait(expectedCondition.presenceOf(element(strLocator)), longWait);
        var reqElement = element(strLocator);
        reqElement.sendKeys(strFileAbsPath)
    };

    this.uploadFileTOElement = function (reqElement, strFileRelativePath) {
        var strFileAbsPath = path.resolve(__dirname, strFileRelativePath);
        browser.wait(expectedCondition.presenceOf(reqElement), longWait);
        reqElement.sendKeys(strFileAbsPath)
    };

    this.verifyCssProperty = function (strLocator, strPropertyName, strExpectedPropertyValue) {
        var reqElement;
        browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
        reqElement = element(strLocator);
        // expect(element(reqElement).getCssValue(strPropertyName)).toBe(strExpectedPropertyValue);
    };

    this.explicitWait = function (strWait) {
        browser.sleep(strWait);
    };

    this.scrollToElement = function (strLocator) {
        var reqElement;
        reqElement = element(strLocator);   
        browser.actions().mouseMove(reqElement).perform();
        expect(reqElement.isDisplayed()).toBe(true);
    };

    this.getTodayDate = function () {
        var strTodayDate;
        var objTodayDate = new Date();
        var todayDate = objTodayDate.getDate();
        var todayMonth = objTodayDate.getMonth() + 1; //January is 0 so add 1
        var todayYear = objTodayDate.getFullYear();
        if (todayDate < 10) {
            todayDate = '0' + todayDate;
        }
        if (todayMonth < 10) {
            todayMonth = '0' + todayMonth;
        }
        strTodayDate = todayDate + '-' + todayMonth + '-' + todayYear;
        return strTodayDate;
    };

    this.getFutureDate = function(intFutureDays){
        var strTodayDate;
        var objTodayDate = new Date();
        objTodayDate.setDate(objTodayDate.getDate() + intFutureDays);
        var todayDate = objTodayDate.getDate();
        var todayMonth = objTodayDate.getMonth() + 1; //January is 0 so add 1
        var todayYear = objTodayDate.getFullYear();
        if (todayDate < 10) {
            todayDate = '0' + todayDate;
        }
        if (todayMonth < 10) {
            todayMonth = '0' + todayMonth;
        }
        strTodayDate = todayDate + '-' + todayMonth + '-' + todayYear;
        return strTodayDate;
    };

    this.browserRefresh = function () {
        browser.refresh();
    };

    this.installNpmPackage = function (packageName) {
        const execSync = require('child_process').execSync;
        code = execSync('npm install --no-save ' + packageName);
    };

    
    // Description-: To verify report file created on ftp server
    // Parameters -:
    // Param -: Host,Username, passwd in key value pair
    // filename -: Name of file to verify on ftp server

    this.checkPlatform = function () {
        this.installNpmPackage('os');
        var os = require('os');
        if (os.platform() === 'win32') {
            this.installNpmPackage('chilkat_node8_win32');
        }
        else if (os.platform() == 'linux') {
            if (os.arch() === 'arm') {
                this.installNpmPackage('chilkat_node8_arm');
            }
            else if (os.arch() === 'x86') {
                this.installNpmPackage('chilkat_node8_linux32');
            }
            else {
                this.installNpmPackage('chilkat_node8_linux64');
            }
        }
        else if (os.platform() === 'darwin') {
            this.installNpmPackage('chilkat_node8_macosx');
        }
    };

    this.ftpLogin = function (param, fileName) {
        var os = require('os');
        var chilkat;
        if (os.platform() === 'win32') {
            chilkat = require('chilkat_node8_win32');
        }
        else if (os.platform() === 'linux') {
            if (os.arch() === 'arm') {
                chilkat = require('chilkat_node8_arm');
            }
            else if (os.arch() === 'x86') {
                chilkat = require('chilkat_node8_linux32');
            }
            else {
                chilkat = require('chilkat_node8_linux64');
            }
        }
        else if (os.platform() === 'darwin') {
            var chilkat = require('chilkat_node8_macosx');
        }
        var ftp = new chilkat.Ftp2();
        var success;
        success = ftp.UnlockComponent("Success");
        if (success !== true) {
            console.log(ftp.LastErrorText);
            return 0;
        }
        ftp.Hostname = param.hostName;
        ftp.Username = param.userName;
        ftp.Password = param.passwd;

        //  Connect and login to the FTP server.
        success = ftp.Connect();
        if (success !== true) {
            console.log(ftp.LastErrorText);
            return 0;
        }

        //  Set the current remote directory to where the file is located:
        success = ftp.ChangeRemoteDir("/NEW_EFS");
        if (success !== true) {
            console.log(ftp.LastErrorText);
            return 0;
        }

        //  Test to see if the file exists by getting the file size by name.
        var fileSize = ftp.GetSizeByName(fileName);
        console.log(fileName + " file size ------>" + fileSize);
        if (fileSize > 0) {
            return fileSize;
        }
        else {
            return 0;
        }
        success = ftp.Disconnect();
    };

    this.verifyDownloadedFile = function (fileName) {
        browser.wait(function () {
            return fs.existsSync(fileName);
        }, 50000)
    };

    this.verifyAndDeleteDownloadedFile = function (dir, fileName) {
        var status = false;
        var filesList;

        browser.wait(function () {
            fs.readdir(dir, (err, files) => {
                if (files.length > 0) {
                    filesList = fs.readdirSync(dir);
                    status = true;
                    for (file of filesList) {
                        expect(file).toContain(fileName);
                        fs.unlink((dir + file), function (err) {
                            if (err != null) {
                                throw err;
                            }
                        });
                    }
                }
            });
            return status;
        }, 50000)
    };

    this.deleteDownloadedFile = function (fileName) {
        browser.wait(function () {
            return fs.existsSync(fileName);
        }, 50000).then(function () {
            if (fs.existsSync(fileName)) {
                fs.unlink(fileName, function (err) {
                    if (err != null) {
                        throw err;
                    }
                });
            }
        });
    };


    // PHASE 2 UNDER IMPROVEMENT //

    // GET LOCATOR SPECFICWAY 
    this.getIdLocator =  function (prefix, val, suffix)
    {
        if(prefix==null || prefix==undefined)
        {
            prefix="";
        }
        if(suffix==null || suffix==undefined)
        {
            suffix="";
        }
        if(value!=null || value!=undefined)
        {    
            return by.id(prefix+val+suffix);
        }
        else
        {
            console.log("value should not be null or undefined.");
        }
    };
    
    // GET LOCATOR - GENERIC WAY
    this.getLocator =  function (selector, prefix, val, suffix)
    {
        // REPLACE WITH ENUM
        // if(selector==null || selector==undefined)
        // {
        // }
        if(prefix==null || prefix==undefined)
        {
            prefix="";
        }
        if(suffix==null || suffix==undefined)
        {
            suffix="";
        }
        if(value!=null || value!=undefined)
        {   
            if(selector == "id")
            {
                elen =  by.id(prefix+val+suffix);
            }
            else if(selector == "css")
            {
                elen =  $(val);
            }
            else if(selector == "name")
            {
                elen =  by.name(val);
            }
            else if(selector == "className")
            {
                elen =  by.className(val);
            }
            else if(selector == "linkText")
            {
                elen =  by.linkText(val);
            }
            else if(selector == "partialLinkText")
            {
                elen =  by.partialLinkText(val);
            }
            else if(selector == "tagName")
            {
                elen =  by.tagName(val);
            }
            else if(selector == "xpath")
            {
                elen =  by.xpath(val);
            }
            else if(selector == "buttonText")
            {
                elen =  by.buttonText(val);
            }
            else if(selector == "cssContainingText")
            {
                elen =  by.cssContainingText(val,"");
            }
            else if(selector == "deepCss")
            {
                elen =  by.deepCss(val);
            }
            else if(selector == "exactBinding")
            {
                elen =  by.exactBinding(val);
            }
            else if(selector == "exactRepeater")
            {
                elen =  by.exactRepeater(val);
            }
            else if(selector == "js")
            {
                elen =  by.js(val);
            }
            else if(selector == "model")
            {
                elen =  by.model(val);
            }
            else if(selector == "options")
            {
                elen =  by.options(val);
            }
            else if(selector == "partialButtonText")
            {
                elen =  by.partialButtonText(val);
            }
            else if(selector == "repeater")
            {
                elen =  by.repeater(val);
            }

            if (elen != null && elen != undefined)
            {
                return elen;
            }
            else if(elen == null)
            {
                console.log("Given Elemenet is null value.");
            }
            else if(elen == undefined)
            {
                console.log("Given Elemenet is undefined value.");
            }

        }
        else
        {
            console.log("value should not be null or undefined.");
        }  
    };

    // GET ELEMENT - MORE GENERIC WAY ASYNC
    this.getElement =  async (elementn)=>
    {
        let eOut;
        try 
        {
            eOut= new Array();
            if(elementn == null || elementn =="")
            {
                expect(elementn).not.toBeNull();
                expect(elementn).not.toBe("");
                return null;
            }
            
            let ebank = await elementn.split(",,");
            for(let i=0; i < ebank.length; i++)
            {
                let f = ebank[i].split("==");
                let selector    =f[0].toString().trim();
                let val         =f[1].toString().trim();

                let elen;
                if(selector == "id")
                {
                    // return element(by.id(val))
                    elen = element(by.id(val))
                }
                else if(selector == "css")
                {
                    // return element($(val))
                    elen = element($(val))
                }
                else if(selector == "name")
                {
                    // return element(by.name(val))
                    elen = element(by.name(val))
                }
                else if(selector == "className")
                {
                    // return element(by.className(val))
                    elen = element(by.className(val))
                }
                else if(selector == "linkText")
                {
                    // return element(by.linkText(val))
                    elen = element(by.linkText(val))
                }
                else if(selector == "partialLinkText")
                {
                    // return element(by.partialLinkText(val))
                    elen = element(by.partialLinkText(val))
                }
                else if(selector == "tagName")
                {
                    // return element(by.tagName(val))
                    elen = element(by.tagName(val))
                }
                else if(selector == "xpath")
                {
                    // return element(by.xpath(val))
                    elen = element(by.xpath(val))
                }
                else if(selector == "buttonText")
                {
                    // return element(by.buttonText(val))
                    elen = element(by.buttonText(val))
                }
                else if(selector == "cssContainingText")
                {
                    // return element(by.cssContainingText(val,""))
                    elen = element(by.cssContainingText(val,""))
                }
                else if(selector == "deepCss")
                {
                    // return element(by.deepCss(val))
                    elen = element(by.deepCss(val))
                }
                else if(selector == "exactBinding")
                {
                    // return element(by.exactBinding(val))
                    elen = element(by.exactBinding(val))
                }
                else if(selector == "exactRepeater")
                {
                    // return element(by.exactRepeater(val))
                    elen = element(by.exactRepeater(val))
                }
                else if(selector == "js")
                {
                    // return element(by.js(val))
                    elen = element(by.js(val))
                }
                else if(selector == "model")
                {
                    // return element(by.model(val))
                    elen = element(by.model(val))
                }
                else if(selector == "options")
                {
                    // return element(by.options(val))
                    elen = element(by.options(val))
                }
                else if(selector == "partialButtonText")
                {
                    // return element(by.partialButtonText(val))
                    elen = element(by.partialButtonText(val))
                }
                else if(selector == "repeater")
                {
                    // return element(by.repeater(val))
                    elen = element(by.repeater(val))
                }
                // else if(selector == "addLocator")
                // {
                //     return element(by.addLocator(val, )
                // }

                if(elen == null)
                {
                    console.log("Given Elemenet is null value.")
                }
                if(elen == undefined)
                {
                    console.log("Given Elemenet is undefined value.")
                }
                
                if(eOut == null)
                {
                    console.log("Given Elemenet container eOut is null list.")
                }
                if(eOut == undefined)
                {
                    console.log("Given Elemenet container eOut is undefined.")
                }

                try 
                {
                    await eOut.push(elen);
                } 
                catch (error) 
                {
                    console.log("Error in Push Element to Array : "+error)
                }
                
            }
            // console.log(eOut)
            return eOut;
        }
        catch (error) 
        {
            return eOut;
        }


    };

    this.getTextByRegEx = function (reqFullText, reqPattern) {
        return reqFullText.match(reqPattern)[0];
    }


};
module.exports = new action();
