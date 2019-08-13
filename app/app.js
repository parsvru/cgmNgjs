'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/'});
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', ['$scope', '$uibModal', '$filter', function($scope, $uibModal, $filter) {
  $scope.records = [];
  $scope.recordfinal = [];
  $scope.checkboxModel = [];
  $scope.checkboxModelf = [];

  $scope.openModal = function(record) {
    $uibModal.open({
        resolve: {record: null},
        templateUrl: 'modaldialog.html',
        controller: 'ModalCtrl'
    }).result.then(function(newRecord) {
      $scope.records.push(newRecord); 
    });
  }


  $scope.CheckUncheckAll = function (indicator) {
    
  };

    $scope.add = function() {
      let newDataList=[];
      $scope.records.forEach(function(items){
        if(items.selected === false || !items.selected){
          newDataList.push(items);
        } else {
          $scope.recordfinal.push(items);
          items.selected = false;
        }
      });
      $scope.records = newDataList;
    }

    $scope.remove = function() {
      let newDataListf = [];
      $scope.recordfinal.forEach(function(items){
        if(items.selected === false || !items.selected){
          newDataListf.push(items);
        } else {
          $scope.records.push(items);
          items.selected = false;
        }
        
      });
      $scope.recordfinal = newDataListf;
    }
  
}])
.controller('ModalCtrl', ['$scope', '$uibModalInstance', 'record', function($scope, $uibModalInstance, record) {
    
  $scope.record = angular.copy(record);
  
  // save the input and dismiss the dialog
  $scope.save = function() {
      $uibModalInstance.close($scope.record);
  };

  $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
  };
  
  $scope.deleteRecord = function() {
    $uibModalInstance.close($scope.record);
  };
}])
.directive('dateDirective', function() {
  return {
      scope: {
          model: '=ngModel'
      },
      restrict: 'A',
      templateUrl: 'views/date.html',
      controller: function($scope) {
          $scope.format = 'dd/MM/yyyy';

          $scope.open = function() {
              $scope.status.opened = true;
          };

          $scope.status = {
              opened: false
          };
      }
  }
});;
