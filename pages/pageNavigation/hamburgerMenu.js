var actionLib = require('../../library/action.js');
var efsLib    = require('../../library/appspecificactions.js');

var hamburgerMenu = function () {


this.navigateToPage = function () {
     actionLib.click(by.className('icon-menu hamburger-icon iconbar'));
     actionLib.click(by.xpath('//*[@class="ng-binding" and .='+"'"+arguments[0]+"'"+']'));
     for(var i=1; i<arguments.length; i++){ 
          reqLocator = by.xpath("//*[@class='col-xs-9 ptb14 pl10 ng-binding' and contains(text(),'"+arguments[i]+ "')]")
          actionLib.click(reqLocator);
     }
}



}

module.exports = new hamburgerMenu();