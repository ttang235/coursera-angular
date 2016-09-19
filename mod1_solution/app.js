(function() {
'use strict';
angular.module("LunchCheck", [])
	.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ["$scope"];

function LunchCheckController($scope) {
	$scope.dishes = "";
	$scope.msgColor="green";
	$scope.checkTooMuch = function() {
		if ($scope.dishes === "") {
			$scope.message = "Please enter data first";
			$scope.msgColor="red";
			return;
		}
		$scope.msgColor="green";
		var arr = $scope.dishes.split(",");
		if (arr.length <= 3) {
			$scope.message = "Enjoy!";
		} else {
			$scope.message = "Too much!";
		}
	}
}


})();
