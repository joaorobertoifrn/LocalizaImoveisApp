angular.module('starter.services',[])
.factory('propertyService', function($http,$rootScope) {
  'use strict';

  var service = {
    getPropertylist: function () {		 
		 return $http.get("data/property/property.json");
		 
    },

getPropertyfilter: function () {		 
		 return $http.get("data/property/filter.json");
		 
    },

getPropertysort: function () {     
     return $http.get("data/property/sort.json");
     
    },


getFilterData: function (cat_id,ftype) {
    if(typeof($rootScope.brandsFobj)=='undefined')$rootScope.brandsFobj = [];
    if(typeof($rootScope.priceFobj)=='undefined')$rootScope.priceFobj = [];
    if(typeof($rootScope.discFobj)=='undefined')$rootScope.discFobj = [];

    var tval = '';
    if(ftype=='brands')tval = $rootScope.brandsFobj[cat_id];
    if(ftype=='price')tval = $rootScope.priceFobj[cat_id];
    if(ftype=='discount')tval = $rootScope.discFobj[cat_id];

    if(typeof(tval)=='undefined')
      return '';
    else
      return Object.keys(tval).map(function (key) {return tval[key]});
  },

getSelectedFilter(data,seletedArray,ftype){
   angular.forEach(data,function(obj){
     angular.forEach(seletedArray,function(id){
      if(ftype=='brands')if(obj.brand_id==id){ obj.selected = true; }
      if(ftype=='price')if(obj.pricefilter==id){ obj.selected = true; }
      if(ftype=='discount')if(obj.discountfilter==id){ obj.selected = true; }
     });
   });

   return data;
}





  };

  return service;
});