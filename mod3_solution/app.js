(function() {
'use strict';
angular.module("NarrowItDownApp", [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'dirCtrl',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.getMatchedMenuItems = function () {
    console.log('getMatchedMenuItems called with searchTerm', ctrl.searchTerm);
    if (!ctrl.searchTerm) {
      ctrl.found = [];
      console.log('ctrl.found set to []');
      return;
    }
    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
    .then(function setData(result) {
      ctrl.found = result;
      console.log('ctrl.found:', ctrl.found);
    });
  };

  ctrl.remove = function(index) {
    ctrl.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];
      var menu_items = result.data.menu_items
      for (var i = 0; i < menu_items.length; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(menu_items[i]);
        }
      }
      // return processed items
      return foundItems;
    });
  }
}

})();
