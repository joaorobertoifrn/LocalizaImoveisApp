// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
'starter.controllers',
'starter.directives',
'starter.services',
'ngMessages',
'ngCordova',
'ngStorage',
'rzModule',
'ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  //---User authentication section------
    .state('app.login', {
  	cache:false,
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'js/auth/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.register', {
      cache:false,
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'js/auth/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('app.forgot-password', {
          cache:false,
          url: '/forgot-password',
          views: {
            'menuContent': {
              templateUrl: 'js/auth/forgotpassword.html',
              controller: 'ForgotPasswordCtrl'
            }
          }
        })

 .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'js/account/account.html',
          controller: 'AccountCtrl'
        }
      }
    })
//----------------------------------------


 .state('app.dashbaord', {
      url: '/dashbaord',
      views: {
        'menuContent': {
          templateUrl: 'js/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

 .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'js/feedback/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

.state('app.propertyListing', {
      cache:false,
      url: '/propertyListing',
      views: {
        'menuContent': {
          templateUrl: 'js/property/propertyListing.html',
          controller: 'PropertyCtrl'
        }
      }
    })

.state('app.property-detail', {
      url: '/property-detail/:prId',
      views: {
        'menuContent': {
          templateUrl: 'js/property/property-detail.html',
          controller: 'PropertyDetailCtrl'
        }
      }
    })
.state('app.property-route-detail', {
      url: '/property-route-detail/:latlong',
      views: {
        'menuContent': {
          templateUrl: 'js/property/property-road-map.html',
          controller: 'RouteCtrl'
        }
      }
    })

.state('app.propertysorting', {
      url: '/propertysorting',
      views: {
        'menuContent': {
          templateUrl: 'js/property/propertysorting.html',
          controller: 'PropertyCtrl'
        }
      }
    })

.state('app.propertyfilter', {
    cache:false,
      url: '/propertyfilter',
      views: {
        'menuContent': {
          templateUrl: 'js/property/propertyfilter.html',
          controller: 'ProductsFilterCtrl'
        }
      }
    })

.state('app.requirement', {
      url: '/requirement',
      views: {
        'menuContent': {
          templateUrl: 'js/requirements/requirement.html',
          controller: 'RequirementCtrl'
        }
      }
    })

.state('app.post-property', {
      url: '/post-property',
      views: {
        'menuContent': {
          templateUrl: 'js/post-property/post-property.html',
          controller: 'ResponseCtrl'
        }
      }
    })


.state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'js/search/propertysearch.html',
          controller: 'PropertySearchCtrl'
        }
      }
    })


.state('app.shortlist', {
    cache:false,
      url: '/shortlist',
      views: {
        'menuContent': {
          templateUrl: 'js/shortlist/shortlist.html',
          controller: 'ShortListCtrl'
        }
      }
    })
  //-------------------------

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

Array.prototype.getIndexBy = function (name, value) {
for (var i = 0; i < this.length; i++) {
    if (this[i][name] == value) {
        return i;
    }
}
return -1;
}
