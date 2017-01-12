/*Deci acum iau aplicatia mea si vad pe ce ruta trebuie sa mearga. 
este var pt ca sunt mai multe variabile la prof in curs -let app =anglar.module('myApp'[ui-pt fiecare ruta ])*/
 var myApp = angular.module("myApp", ['ngRoute']);
 
 /*ce as vrea sa am in interior fara sa intantez acele obiecte implicite noua ne trebuie un route provider si deci o sa implementam sa ne dea asta*/
 /*$are dolar in fata -> toata modulele de angular se numesc cu dolar in fata */
 /*pot sa pun functia inainte pt ca am nevoie doar de rute provider daca as fi avut mai multe trebuia sa le pun numele '$routeprovider' si apoi ,function($routebla)*/
 
 myApp.config(function($routeProvider)  {
     /*Aici scriem care este starea default*/
  $routeProvider.
  when('/home', {
   templateUrl: 'pages/home.html',
  }).
  /*si starile suport al 2-lea parametru este configuratia starii este cum ajung la stare ( url) si avem /addnewpatient*/
  /*urmatoarea- ce view folosesc la curs proful a scris direct view-ul acolo pt a a a cut doar pagina default */
  /*asta este starea in care adaug un pacient*/
  when('/addnewpatient', {
   templateUrl: 'pages/addnewpatient.html',
  }).
  /*asta va fi starea in care vad pacientii*/
  /*va afisa ceva ce vine de la server deci voi avea un controller*/
  /*imi spune unde si mai ales cum sa ajung unde vreau sa ajung*/
  when('/viewpatients', {
   templateUrl: 'pages/viewpatients.html',
   controller: 'patientsController'
  }).
  /*aici iar avem nevoie de accesare de server si mai departe */
  when('/deletepatients', {
   templateUrl: 'pages/deletepatients.html',
   controller: 'deletePacientController'
  }).
  when('/editpatients', {
   templateUrl: 'pages/editpatients.html',
   controller: 'editPacientController'
  }).
  
  /*ma va duce la pagina default */
  otherwise({
   redirectTo: '/home'
  });
 });
 
 
 /*aici vom face cum a facut profu in message control la curs pentru fiecare din paginile web pe care vrem sa le cream */
 /*in acest SPA*/
/*primul parametru = numele iar al 2-lea param cum am vazut in metoda config  trebuie sa aiba scope ca sa poata transmite ceva view-ului*/
/*trebuie sa fac un request pe http si din cauza asta avem acolo http*/
/*scriu http pt ca avem ca spo sa deschidem un http cand intam pe pag respetiva*/
 myApp.controller('patientsController', ['$scope', '$http', function($scope, $http) {
  /*ne va "aduce" paciantii sau mai bine zis lista pe care am initializat-o*/
  $http.get('/patients').then(function(response) {
   $scope.patients = response.data;
  });
 }]);
/*stergem ce avem aici */
 myApp.controller('deletePacientController', ['$scope', '$http', function($scope, $http) {
  $http.get('/patients').then(function(response) {
   $scope.patients = response.data;
  });
  $scope.deleteBook = function() {
   $http.delete('/patients/' + $scope.x.patient_id)
    .success(function(response, status, headers, config) {})
    .error(function(response, status, headers, config) {
     /*dam mesaj de eroare in caz ca nu s-a putut efectua operatia*/
     $scope.error_message = response.error_message;
    });
  }
 }]);
 
/*??*/
 myApp.controller('editPatientController', ['$scope', '$http', function($scope, $http) {
  $http.get('/patients').then(function(response) {
   $scope.patients = response.data;
  });

 
  $scope.changeName = function() {
   document.getElementById("formChangeName").style.display = "block";
}

  $scope.changeNameDatabase = function() {
   $http.put('/patients/' + $scope.x.patient_id, $scope.patientEdit).
   success(function(data) {
    console.log("put successful");
   }).error(function(data) {
    console.error("error in put http request");
   })
   $scope.patientEdit = "";
  }
 }]);


 myApp.directive('numbersOnly', function() {
  return {
   require: 'ngModel',
   link: function(scope, element, attr, ngModelCtrl) {
    function fromUser(text) {
     if (text) {
      var transformedInput = text.replace(/[^0-9]/g, '');

      if (transformedInput !== text) {
       ngModelCtrl.$setViewValue(transformedInput);
       ngModelCtrl.$render();
      }
      return transformedInput;
     }
     return undefined;
    }
    ngModelCtrl.$parsers.push(fromUser);
   }
  };
 });



 