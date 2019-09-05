/* 
Description : This file contains all the re-usable functions required 
var efsLib = require('../../../library/appspecificactions.js');
*/
var actionLib = require('../library/action.js');

var appspecificactions = function () {

    //** task : 1 CALL BELOW ACTION VARIABLES - IF WE USED BELOW IN MOVED FUNCTIONS - CREATE IN ALL CLASS OR MOVE TO ONE PLACE */
    var expectedCondition = protractor.ExpectedConditions;
    var longWait    = 30000;
    var shortWait   = 10000;
    var avgWait     = 20000;

    //** WHY THIS VARIABLE REQUIRED IN CLASS LEVEL? */
    //** MOVE THIS TO FUNCTION LEVEL */
    var beforeSum;
    var afterSum;


    //** USED IN  getToastMessageText, getAppDisplayedText FUNCTIONS ***START****/
    // Field Error
    this.fieldError     = by.css("span[class='error-message'][aria-hidden='false']");
    this.fieldErrorMsg  = by.css("span[class='error-message'][aria-hidden='false'] small[class='ng-binding']");

    // Alert
    this.alertElement   = by.css("div[class*='ngdialog ngdialog-theme-default'][class*='ng-scope'][role='alertdialog']");
    this.alertBtnOk     = by.css("button[ng-click='confirm(1)']");
    this.alertMsg       = by.css("div[class*='ngdialog ngdialog-theme-default'][class*='ng-scope'][role='alertdialog'] div[class='ngdialog-content'] p");
    this.alertBtns      = by.css("div[class*='ngdialog ngdialog-theme-default'][class*='ng-scope'][role='alertdialog'] div[class='ngdialog-footer'] button");

    this.popupYesButton     = by.css("button['Yes']");
    this.popupNoButton      = by.xpath('//button[.="No"]');
    this.popupCancelButton  = by.xpath('//button[.="Cancel"]');
    // this.popupOkButton   = by.xpath('//button[.="Ok"]');

    // Notification Errors
    // this.NotificationRespHidden  = by.xpath("//div[@ng-click='respClear()'][@aria-hidden='true']");
    this.NotificationRespVisible    = by.css("div[ng-click='respClear()'][aria-hidden='false']");
    this.NotificationRespClose      = by.css("div[ng-click='respClear()'][aria-hidden='false'] a");
    this.NotificationRespMsg        = by.css("div[ng-click='respClear()'][aria-hidden='false'] span");

    // this.NotificationHidden      = by.xpath("//div[@ng-click='clear()'][@aria-hidden='true']");
    this.NotificationVisible        = by.css("div[ng-click='clear()'][aria-hidden='false']");
    this.NotificationClose          = by.css("div[ng-click='clear()'][aria-hidden='false'] a");
    this.NotificationMsg            = by.css("div[ng-click='clear()'][aria-hidden='false'] span");

    // Notification kill Msg
    this.NotificationGreen          = by.css("[class^='ui-notification ng-scope'][class$='clickable killed'] h3[aria-hidden='true']");
    this.NotificationGreenMsg       = by.css("[class^='ui-notification ng-scope'][class$='clickable killed'] div[class='message ng-binding']");

    // NotificationGreenMsg
    this.NotificationkillGreensuccess       = by.css("[class='ui-notification ng-scope success clickable killed'] h3[aria-hidden='true']");
    this.NotificationkillGreensuccessMsg    = by.css("[class='ui-notification ng-scope success clickable killed'] div[class='message ng-binding']");

    // NotificationRedMsg
    this.NotificationkillRedError       = by.css("[class='ui-notification ng-scope success clickable killed'] h3[aria-hidden='true']");
    this.NotificationkillRedErrorMsg    = by.css("[class='ui-notification ng-scope error clickable killed'] div[class='message ng-binding']");

    // GET CONFIRMATION AND HANDLE TABLE To ITERARTE
    this.borderHighlight                = by.css("[class*='error-control']");
    this.borderHighlightAlertMsg        = by.css("div[class^='modal'] div[class^='modal-content'] div[class^='modal-body'] [ng-repeat='errObj in errList track by $index']");
    this.borderHighlightAlertLabel      = by.css("div[class^='modal'] div[class^='modal-content'] div[class^='modal-header'] h4");
    this.borderHighlighAlertCancelBtn   = by.css("div[class^='modal'] div[class^='modal-content'] div[class^='modal-header'] li [class*='cancel-btn']");
    //** USED IN  getToastMessageText, getAppDisplayedText FUNCTIONS ***END****/


    //** LOGIN WILL BE TAKEN TO LOGIN PAGE OR HANDLED TWISE TO LOGIN ALL OVER REQUIREMENT*/
    var openApplication = function (strUrl) {
        browser.get(strUrl);
        // expect(browser.getCurrentUrl()).toBe(strUrl+"#/login");
    };

    this.setApplicationUrl = function (loginPage, testSpecName) {
        var appIp = process.env.APP_IP || '10.10.16.42';//'localhost'
        var appUrl = "http://" + appIp + ":8080/index.html";
        console.log('Running ' + testSpecName + ' test on: ', appUrl);
        openApplication(appUrl);
        browser.getCurrentUrl().then(function (url) 
        {
                if (url.indexOf("#/login") == -1) 
            {// checking if the URL is contains  "#login" or not
                console.log("Executed beforeAll function logout...");
                loginPage.appLogout();
                openApplication(appUrl);
            }
        });
    };

    //launch the application and verifing the SaasId text box and login
    this.setUrlAndLoginApp = function (loginPage, loginData, testSpecName) {
        
        this.setApplicationUrl(loginPage, testSpecName); 
        actionLib.verifyElementPresent(loginPage.textboxSaasid);
        loginPage.appLogin(loginData.loginPage.FirstData);       
    };
    
    //** LIST PAGE TABLE WILL BE TAKEN TO LIST PAGE */
    //-- enter text in table specific column 
    this.fillTextInTableColumn = function (strDataElement, intRowNum, intColumnNum, strText) {
        var reqElement = by.xpath("//super-table[@data = '" + strDataElement + "']//thead/tr[" + intRowNum + "]/th[" + intColumnNum + "]//input");
        return actionLib.setText(reqElement, strText);
    };

    //-- verify text in table specific row column 
    this.verifySearchTextInTableRowCol = function (strDataElement, intRowNum, intColumnNum, strText) {
        var reqElement = element(by.xpath("//super-table[@data = '" + strDataElement + "']//tbody/tr[" + intRowNum + "]/td[" + intColumnNum + "]/span[@class='ng-binding']"));
        expect(reqElement.getAttribute('textContent')).toBe(strText);
    };

    this.clickRowInAirExportTable = function (strCustomerName, strOtherColumnVal) {
        var reqElement = by.xpath("//td[@title='" + strCustomerName + "']/../td[@title='" + strOtherColumnVal + "']");
        actionLib.click(reqElement);
    };

    this.clickAddCustomerTable = function (strCustomerName) {
        var customerName = by.xpath("//input[@id='partyMaster']/../..//span");
        actionLib.click(customerName);
        var addCustomer = by.xpath("//*[contains(text(),'Add New')]");
        actionLib.click(addCustomer);
    };

    // ** DROPDOWN */
    this.selectDropdown = function (strLocator, strText) {
        browser.wait(expectedCondition.presenceOf(element(strLocator)), avgWait);
        reqElement = element(strLocator).element(by.xpath("option[@label='" + strText + "']")); 
        reqElement.click();
    };

    this.selectDefaultDropdown = function (reqLocator, lable) {
        if(lable != undefined){
            browser.wait(expectedCondition.presenceOf(element(reqLocator)), avgWait);
            browser.actions().mouseMove(element(reqLocator)).perform();
            element(reqLocator).element(by.xpath("//option[@label ='"+ lable +"']")).click();
            // actionLib.getAttributeValue(by.model('searchDto.searchName'), 'value').then(function (text) {
            //     realText = text.split(":");
            //     expect(realText[1]).toBe(lable);
            // })
        }
    };

    this.selectTableDropdown = function (reqLocator, index, strInput) {
        if(strInput != undefined){
            browser.wait(expectedCondition.presenceOf(element(reqLocator)), avgWait);
            browser.actions().mouseMove(element(reqLocator)).perform();
            element(reqLocator).sendKeys(strInput);
            var indexedElement = element.all(by.repeater("match in matches track by $index"));
            indexedElement.getText().then(function (strArray) {
                toLower = function(text){
                    return text.toLowerCase();
                };
                strArray = strArray.map(toLower);
                // console.log(strArray)
                var i=0;
                strArray.forEach(fullRowText => {
                    var individualTextArray = fullRowText.split("\n");
                    // console.log(individualTextArray);
                    if (individualTextArray.indexOf(strInput.toLowerCase()) == index-1) {
                        browser.actions().mouseMove(indexedElement.get(i)).perform();
                        indexedElement.get(i).click();
                    }
                    i++;
                });
            });
        }  
    };

    this.selectNormalDropdown = function (reqLocator, strInput) {
        if(strInput != undefined){
            browser.wait(expectedCondition.presenceOf(element(reqLocator)), avgWait);
            browser.actions().mouseMove(element(reqLocator)).perform();
            if (strInput.toLowerCase() == 'add new'){ // workingfine
                var reqElement = element(reqLocator).element(by.xpath('..')).element(by.xpath('..'));
                reqElement.element(by.tagName('span')).click(); 
                var indexedElement = element.all(by.repeater('match in matches track by $index'));
                indexedElement.get(0).click();
            } else { // working fine
                // element(reqLocator).sendKeys(strInput);
                actionLib.setText(reqLocator,strInput);
                var indexedElement = element.all(by.repeater('match in matches track by $index'));
                indexedElement.getText().then(function (strArray) {
                    toLower = function(text){
                        return text.toLowerCase();
                    };
                    strArray = strArray.map(toLower);
                    strArray.forEach(fullRowText => {
                        // console.log(fullRowText);
                        if ( fullRowText.toLowerCase() == strInput.toLowerCase()) {
                            indexedElement.get(strArray.indexOf(strInput.toLowerCase())).click();
                        }
                    });
                })
            }
        }  
    };

    // ** RADIO BUTTON */
    this.clickOnRadioButton=function(strLabel, CheckBoxValue){
        reqElement = by.xpath("//Label['"+strLabel+"']/following::md-radio-button[@aria-label='"+CheckBoxValue+"']");
        actionLib.click(reqElement);
    };

    // ** SWITCH */
    this.chooseFromSwitch = function (reqLocator, reqOption) {
        if (reqOption != undefined) {
            var reqElement = element(reqLocator);
            browser.wait(expectedCondition.presenceOf(reqElement), shortWait);
            browser.actions().mouseMove(reqElement).perform();
            var mainElement = reqElement.element(by.xpath('..')).element(by.xpath('..'));
            mainElement.element(by.className('opc-5')).getText().then(function (text) {
                if (text.toLowerCase() == reqOption.toLowerCase()) {
                    reqElement.click();
                }
            });
        }
    };
    
    // ** TAB PAGE */
    this.verifyTabCount = function (strTabLocator1,strTabLocator2, beforeAfter){
        var firstTabCountBefore,secondTabCountBefor,firstTabCountAfter,secondTabCountAfter;
        if (beforeAfter == 'before') {
  
          reqElement = actionLib.getTextByLocator(strTabLocator1);
          reqElement.then(function (val) {
          var splitText = val.split("(")[1].split(")");
          linkCount = splitText[0];
          firstTabCountBefore = parseInt(linkCount);
          
          });
  
          reqElement = actionLib.getTextByLocator(strTabLocator2);
          reqElement.then(function (val) {
          var splitText = val.split("(")[1].split(")");
          linkCount = splitText[0];
          secondTabCountBefor = parseInt(linkCount);
          beforeSum = firstTabCountBefore + secondTabCountBefor ;
          
          }); 
        } 
        else {
  
          reqElement = actionLib.getTextByLocator(strTabLocator1);
          reqElement.then(function (val) {
          var splitText = val.split("(")[1].split(")");
          linkCount = splitText[0];
          firstTabCountAfter = parseInt(linkCount);
          
          });
  
          reqElement = actionLib.getTextByLocator(strTabLocator2);
          reqElement.then(function (val) {
          var splitText = val.split("(")[1].split(")");
          linkCount = splitText[0];
          secondTabCountAfter = parseInt(linkCount);
          afterSum = firstTabCountAfter + secondTabCountAfter;
          expect(beforeSum).toEqual(afterSum);
          });
        }
    };
    
    // ** ERRORS */
    this.getToastMessageText = function () {
        
        browser.ignoreSynchronization   = true;
        var promises                    = [];
        var NotificationGreenMsg        = null;
        var rounds                      = 500;
        
        for (var x = 1; x <= rounds; x++) 
        {
            promises.push( element.all(this.NotificationGreenMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(NotificationGreenMsg==null){
                                NotificationGreenMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationGreenMsg;
                        }
                        if(allE.length >1) {
                            if(NotificationGreenMsg==null){
                                // GET CONFIRMATION THEN ADD AS ONE
                                NotificationGreenMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationGreenMsg;
                        }
                })
            );
        }
        return Promise.all(promises)
                .then(function () 
                {
                    if(NotificationGreenMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationGreenMsg;
                    }
                    else {
                        browser.ignoreSynchronization = false;
                        return "Toast Message Element Not Present";
                    }
                    
                })
                .catch(function(error)
                {
                    if(NotificationGreenMsg != null)
                    {
                        browser.ignoreSynchronization = false;
                        return NotificationGreenMsg;
                    }
                    else
                    {
                        browser.ignoreSynchronization = false;
                        return error;
                    }
                })
    };
    
    // UNDER IMPROVEMENT // TEMP : Increase the var rounds according to requirement
    this.getAppDisplayedText = function () {
        
        browser.ignoreSynchronization       = true;
        var rounds                          = 75;
        var promises                        = [];
        var NotificationGreenMsg            = null;
        var NotificationkillGreensuccessMsg = null;
        var NotificationkillRedErrorMsg     = null;
        var NotificationRespMsg             = null;
        var NotificationMsg                 = null;
        var alertMsg                        = null;
        var fieldErrorMsg                   = null;
        var borderHighlight                 = null;
        //1. CONFIRM : MIDDLE WINDOW COMMON COMPONENT
        
        
        for (var x = 1; x <= rounds; x++) 
        {
            promises.push( element.all(this.NotificationGreenMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(NotificationGreenMsg==null){
                                NotificationGreenMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationGreenMsg;
                        }
                        if(allE.length >1) {
                            if(NotificationGreenMsg==null){
                                //2.1 GET CONFIRMATION THEN ADD AS ONE
                                NotificationGreenMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationGreenMsg;
                        }
                })
            );

            promises.push( element.all(this.NotificationRespMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(NotificationRespMsg==null){
                                NotificationRespMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationRespMsg;
                        }
                        if(allE.length >1) {
                            if(NotificationRespMsg==null){
                                //2.2 GET CONFIRMATION THEN ADD AS ONE
                                NotificationRespMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationRespMsg;
                        }
                })
            );

            promises.push( element.all(this.NotificationMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(NotificationMsg==null){
                                NotificationMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationMsg;
                        }
                        if(allE.length >1) {
                            if(NotificationMsg==null){
                                //2.3 GET CONFIRMATION THEN ADD AS ONE
                                NotificationMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return NotificationMsg;
                        }
                })
            );
            
            promises.push( element.all(this.alertMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(alertMsg==null){
                                alertMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return alertMsg;
                        }
                        if(allE.length >1) {
                            if(alertMsg==null){
                                //2.4 GET CONFIRMATION THEN ADD AS ONE
                                alertMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return alertMsg;
                        }
                })
            );
            
            promises.push( element.all(this.fieldErrorMsg)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(fieldErrorMsg==null){
                                fieldErrorMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return fieldErrorMsg;
                        }
                        if(allE.length >1) {
                            if(fieldErrorMsg==null){
                                //2.5 GET CONFIRMATION THEN ADD AS ONE
                                fieldErrorMsg = allE[0].getText().then(function(tex){return tex});
                            }
                            return fieldErrorMsg;
                        }
                })
            );
            promises.push( element.all(this.borderHighlight)
                .then(function(allE){
                        if(allE.length ==1) {
                            if(borderHighlight==null){
                                borderHighlight = allE[0].getText().then(function(tex){return tex});
                            }
                            return borderHighlight;
                        }
                        if(allE.length >1) {
                            if(borderHighlight==null){
                                //2.6 GET CONFIRMATION THEN ADD AS ONE
                                borderHighlight = allE[0].getText().then(function(tex){return tex});
                            }
                            return borderHighlight;
                        }
                })
            );
        }

        return Promise.all(promises)
                .then(function () 
                {
                    // 3. GET CONFIRMATION HANDLE : AT A TIME MORE THAN ONE DIFFERENT ERRORS APPEARE 
                    //      ALSO EACH ONE MULTIPLE -- END example 5 toast and 1 notification

                    // 4. Below NotificationGreenMsg contain 2 error elements 
                    //      success green and fail red colur backround toast message

                    // 5. CLOSE ERROR ELEMENTS FINALY - Finalize Total Error Elements then Click all

                    if(NotificationGreenMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationGreenMsg;
                    }
                    else if(NotificationRespMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationRespMsg;
                    }
                    else if(NotificationMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationMsg;
                    }
                    else if(alertMsg != null) {
                        // 6. CONFIRM AND GET MESSAGE CLICK OK CANCEL YES NO BUTTON
                        
                        // switch (strBtnText.toLowerCase()) {
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     case 'yes':
                        //             element(this.popupYesButton).click(); 
                        //             break;    
                        //     default:
                        //             console.error(strBtnText + "Button is not available");
                        //             // return new Promise((resolve, reject) =>
                        //             // reject(failLPFW + 'click  :: try CATCH Exception :: Issue While Click On popupCancelButton Element : ' + errC + error + '\n'));
                                    // break;

                        browser.ignoreSynchronization = false;
                        return alertMsg;
                    }
                    else if(fieldErrorMsg != null) {
                        browser.ignoreSynchronization = false;
                        return fieldErrorMsg;
                    }
                    else if(borderHighlight != null) {
                        // 7. CONFIRM AND GET MESSAGE LEFT SIDE ELEMENT IN TABLE
                        browser.ignoreSynchronization = false;
                        return borderHighlight;
                    }
                    else {
                        browser.ignoreSynchronization = false;
                        return "Error Element Not Present";
                    }
                    
                })
                .catch(function(error)
                {
                    if(NotificationGreenMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationGreenMsg;
                    }
                    else if(NotificationRespMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationRespMsg;
                    }
                    else if(NotificationMsg != null) {
                        browser.ignoreSynchronization = false;
                        return NotificationMsg;
                    }
                    else if(alertMsg != null) {
                        // CONFIRM AND GET MESSAGE CLICK OK CANCEL YES NO BUTTON
                        browser.ignoreSynchronization = false;
                        return alertMsg;
                    }
                    else if(fieldErrorMsg != null) {
                        browser.ignoreSynchronization = false;
                        return fieldErrorMsg;
                    }
                    else if(borderHighlight != null) {
                        // CONFIRM AND GET MESSAGE LEFT SIDE ELEMENT IN TABLE
                        browser.ignoreSynchronization = false;
                        return borderHighlight;
                    }
                    else
                    {
                        browser.ignoreSynchronization = false;
                        return error;
                    }
                });
    };

    //** WILL BE IMPROVED OR MOVED OR REMOVED */
    //Save the page
    this.saveButton = function(strValue)
    {
        var reqElement =element(by.id('ngdialog1-aria-describedby'));
        expect(reqElement.getText()).toEqual("Are you sure you want to Fetch Party Data?");
        if(strValue =='Yes')
        {
           
            element(by.buttonText('Yes')).click();
        }
        else if(strValue =='No') {
            element(by.buttonText('No')).click();
        }
        
    };
    
    //Save and Cancel button 
    this.saveandCancelButton = function(strLocator,strInput) {
    if(strInput == "Save") {
        browser.wait(expectedCondition.presenceOf(element(strLocator)), longWait);
        var reqElement = element(strLocator);
        reqElement.click();
    }
    else if(strInput == "Cancel") {
        browser.wait(expectedCondition.presenceOf(element(strLocator)), longWait);
        var reqElement = element(strLocator);
        reqElement.click();
    }

    else if(strInput == "No") {
        browser.wait(expectedCondition.presenceOf(element(strLocator)), longWait);
        var reqElement = element(strLocator);
        reqElement.click();
    }
    };

    //** CHECK BOX */
    
    //** OTHER NEW DESIGN NAMES */
    this.accordionAction = function (reqLocator, reqAction) {
        browser.actions().mouseMove(element(reqLocator)).perform();
        actionLib.getAttributeValue(reqLocator,'class').then(function (attributeValue) {
            if (reqAction.toLowerCase() == 'open' && attributeValue =='icon-downarrow') {
                actionLib.click(reqLocator);
            } else if(reqAction.toLowerCase() == 'close' && attributeValue =='icon-uparrow'){ 
                actionLib.click(reqLocator);
            }
            else{
                console.log(reqAction +'Action not doable');
            }
        });
    }

    this.getIdOf = function (transactionType, reqLocator) {
        var enquiryPattern = "[E][0-9]{6}";
        var quotationPattern = "[Q][0-9]{6}";
        var shipmentPattern = "[S][H][A][0-9]{6}";
        var requiredId= "";
        return actionLib.getTextByLocator(reqLocator).then(function (fullText) {
            switch (transactionType.toLowerCase()){
                case 'enquiry':
                    requiredId = actionLib.getTextByRegEx(fullText, enquiryPattern)
                    break;
                case 'quotation':
                    requiredId = actionLib.getTextByRegEx(fullText, quotationPattern)
                    break;
                case 'shipment':
                    requiredId = actionLib.getTextByRegEx(fullText, shipmentPattern)
                    break;
                default:
                    console.log(transactionType + "transaction type is not exist.")
                    break;
            }
            return requiredId; 
        }) 
    }

};
module.exports = new appspecificactions();
