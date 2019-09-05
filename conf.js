var reqConfig = require('./config/configuration.json');
var HtmlReporter = require('protractor-beautiful-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');
var reqBrowserName = reqConfig.reqBrowser;

// //-- Added below code for headless download files but the same is not working
// let got = require('got');
// let session = async function sessionFound (){await browser.getSession();}
// let sessionId = session['id_'];
// let params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': process.cwd() + '/downloadedFiles'}}
// async function sendSession (){
//     await got.post('http://localhost:4444/wd/hub/session/'+ sessionId + '/chromium/send_command', {body: JSON.stringify(params)})
// }

    var suites = {
        airImportSuite: [
            './tests/testLogin/testLogin.js',
            './tests/testRegistration/testCompanyRegistration.js',
            './tests/testRegistration/testRegistration.js',
            './tests/testAddCustomer/testAddImportCustomer.js',
            './tests/testAirImport/testAddEnquiry/testAddEnquiry.js',
            './tests/testAirImport/testAddQuotation/testAddQuotation.js',         
            //'./tests/testAirImport/testAddShipment/testAddShipment.js',
            './tests/testAirImport/testAddQuotation/testDirectAddQuotation.js',
            './tests/testAirExport/testAddQuotation/testDirectAddQuotation.js', 
            // './tests/testDemoFeedbackPoints/testDemoFeedbackPoints.js',
            // './tests/testWorkFlow/workFlowTestCases.js',
            // './tests/testAirImport/testAddEnquiry/testnewScripts.js',
            // './tests/testAirimport/testAddMasterShipment/testAddMasterShipment.js',
            // './tests/testAirImport/testAddShipment/testDirectShipment.js'
        ],
        airExportSuite: [
            // './tests/testAddCustomer/testAddCustomer.js',
            // './tests/testAirExport/testAddEnquiry/testAddEnquiry.js',
            // './tests/testAirExport/testAddQuotation/testAddQuotation.js',
            // './tests/testAirExport/testGenerateReports/testGenerateQuotationReports.js',
            // './tests/testAirExport/testAddShipment/testAddShipment.js',
            // './tests/testAirExport/testAddPickup/testAddPickupToShipment.js',
            // './tests/testAirExport/testAddDeliveryToCfs/testAddDeliveryToCfs.js',
            // './tests/testAirExport/testAddLinkingToMaster/testAddLinkingToMasterShipment.js',
            // './tests/testAirExport/testAddSignOff/testShipmentSignOff.js',
            // './tests/testAirExport/testAddAirlineSubmission/testGenerateEDI.js'        
        ],

        masterSuite: [ 
                
            // './tests/testMaster/general/company/testCompany.js',
            // './tests/testMaster/general/city/testCity.js',
            // './tests/testMaster/general/region/testRegion.js',
            // './tests/testMaster/general/currency/testCurrency.js',
            // './tests/testMaster/general/service/testService.js',
            // './tests/testMaster/general/port/testPort.js',
            // './tests/testMaster/general/state/testState.js',
            // './tests/testMaster/general/carrier/testCarrier.js',
            // './tests/testMaster/general/termsofShipment/testTermsofShipment.js',
            // './tests/testMaster/general/unit/testUnit.js',
            // './tests/testMaster/general/country/testCountry.js',
            // './tests/testMaster/general/portGroup/testPortGroup.js'
            './tests/testAirExport/testAddEnquiry/testAddEnquiryNew.js',
        ]
    }

    var configOptions = {
  //  args: ["--headless", "--disable-gpu", "--window-size=1920,1080"],
    prefs: {
        download: {
            'prompt_for_download': false,
            'default_directory': process.cwd() + '/downloadedFiles'
        }
    }
    }

    exports.config = {
    //--The address of a running selenium server. We need to give this command if we execute test manually else not
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // --to invoke default browser
     directConnect: true,
     allScriptsTimeout: 30000,
   
   
    // --set browser configuration, specify "reqBrowser":"chrome#firefox" in Configuration.json file for both browser
    // else specify "reqBrowser":"firefox" for a particular browser
    multiCapabilities: [
        // {
        //     chromeOptions: configOptions,
        //     maxInstances: 1,
        //     browserName: reqBrowserName,
        //     specs: suites.airImportSuite
        //  },
        // {
        //     chromeOptions: configOptions,
        //     maxInstances: 1,
        //     browserName: reqBrowserName,
        //     specs: suites.airExportSuite
        // },

        {
            chromeOptions: configOptions,
            maxInstances: 1,
            browserName: reqBrowserName,
            specs: suites.masterSuite
        },
    ],

    //--we can define which framework we are using
    //framework: 'jasmine2'
    jasmineNodeOpts: {
        defaultTimeoutInterval: 600000
    },

    beforeLaunch: function(){
        var folderPath = __dirname + "/report";
        console.log('Going to delete',folderPath);
        if (fs.existsSync(folderPath)) {
            rimraf(folderPath, function (error) {
            if(error){
                console.log('Failed to delete', error);
            }
            });
        }
     
    },

    onPrepare: function () {
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'report',
            screenshotsSubfolder: 'screenshots',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'EfreightSuite E2E Tests Report',
            docName: 'index.html',
            gatherBrowserLogs: true,
            preserveDirectory: true,
            sortFunction: function sortFunction(a, b) {
                if (a.cachedBase === undefined) {
                    var aTemp = a.description.split('|').reverse();
                    a.cachedBase = aTemp.slice(0).slice(0, -1);
                    a.cachedName = aTemp.slice(0).join('');
                };
                if (b.cachedBase === undefined) {
                    var bTemp = b.description.split('|').reverse();
                    b.cachedBase = bTemp.slice(0).slice(0, -1);
                    b.cachedName = bTemp.slice(0).join('');
                };
                if (a.instanceId < b.instanceId) return -1;
                else if (a.instanceId > b.instanceId) return 1;
                if (a.timestamp < b.timestamp) return -1;
                else if (a.timestamp > b.timestamp) return 1;
                return 0;
            }
        }).getJasmine2Reporter());
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    }
    };
