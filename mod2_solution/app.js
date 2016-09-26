(function() {
'use strict';
angular.module("ShoppingListCheckOff", [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;
  tobuy.checkOff = function (index) {
    ShoppingListCheckOffService.checkOff(index);
  };
  tobuy.tobuyItems = ShoppingListCheckOffService.getToBuyItems();
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var tobuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "milk", quantity: 5 },
    { name: "water", quantity: 10 },
    { name: "soft drink", quantity: 20 },
    { name: "ice cream", quantity: 10 },
  ];
  var boughtItems = [];

  service.checkOff = function (idx) {
    boughtItems.push(tobuyItems[idx])
    tobuyItems.splice(idx, 1);
  };

  service.getToBuyItems = function () {
    return tobuyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
