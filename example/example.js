angular.module('MyApp', ['angular-plaid-link'])
.config([
  'plaidLinkProvider',

  function(plaidProvider) {
    plaidProvider.init({
      clientName: 'My App',
      env: 'tartan',
      key: 'test_key',
      product: 'auth'
    });
  }
])

.controller('mainCtrl', ['$scope', 'plaid', function($scope, plaid) {
  $scope.token = '';
  $scope.plaidIsLoaded = plaidLink.isLoaded;

  plaidLink.create({
    onSuccess: function(token) {
      $scope.token = token;
    },
    onExit: function() {
      console.log('user closed');
    }
  });

  $scope.openPlaid = function(bankType) {
    plaidLink.open(bankType);
  };
}]);
