// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(typeof analytics !== 'undefined') {
      window.analytics.startTrackerWithId('UA-104875174-1', 30);
      window.analytics.trackView('Homepage');
    }
    else {
      console.log("Google Analytics Unavailable");
    }
  });
});
app.controller('priceController',function($scope) {
  $scope.data = {};
  $scope.data.avgPrice = 0;
  var socket = io.connect("http://shivamchawla.net:3001/price");
  //var socket = io.connect("http://localhost:3001/price");
  socket.on('price', function(msg){
    $scope.data.zebpayBuyPrice = msg.zebpayBuyPrice;
    $scope.data.zebpaySellPrice = msg.zebpaySellPrice;
    $scope.data.unocoinBuyPrice = msg.unocoinBuyPrice;
    $scope.data.unocoinSellPrice = msg.unocoinSellPrice;
    $scope.data.coinsecureBuyPrice = msg.coinsecureBuyPrice;
    $scope.data.coinsecureSellPrice = msg.coinsecureSellPrice;
    $scope.data.pocketBitsBuyPrice = msg.pocketBitsBuyPrice;
    $scope.data.pocketBitsSellPrice = msg.pocketBitsSellPrice;

    var totalPrice = 0;
    var totalExchanges = 0;
    if(msg.zebpayBuyPrice) {
      totalPrice = totalPrice + $scope.data.zebpayBuyPrice;
      totalExchanges++;
    }
    if(msg.zebpaySellPrice) {
      totalPrice = totalPrice + $scope.data.zebpaySellPrice;
      totalExchanges++;
    }
    if(msg.unocoinBuyPrice) {
      totalPrice = totalPrice + $scope.data.unocoinBuyPrice;
      totalExchanges++;
    }
    if(msg.unocoinBuyPrice) {
      totalPrice = totalPrice + $scope.data.unocoinSellPrice;
      totalExchanges++;
    }
    if(msg.coinsecureBuyPrice) {
      totalPrice = totalPrice + $scope.data.coinsecureBuyPrice;
      totalExchanges++;
    }
    if(msg.coinsecureSellPrice) {
      totalPrice = totalPrice + $scope.data.coinsecureSellPrice;
      totalExchanges++;
    }

    if(msg.pocketBitsBuyPrice) {
      totalPrice = totalPrice + $scope.data.pocketBitsBuyPrice;
      totalExchanges++;
    }
    if(msg.pocketBitsSellPrice) {
      totalPrice = totalPrice + $scope.data.pocketBitsSellPrice;
      totalExchanges++;
    }
    $scope.avgPrice = totalPrice/totalExchanges;
    $scope.$apply();
  });
});

