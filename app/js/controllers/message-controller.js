/*global angular*/
/*lista de dependente*/
let ctrl = angular.module('messageController',['ui.router']);
/*aici am initializat o constanta cu numele servereului meu ca sa nu mai trebuiasca sa fac mereu referire la link ci sa pot pune direct server*/
let SERVER = 'https://webtech3ie-hypothetical-andrei.c9users.io'
/*primul parametru = numele iar al 2-lea param cum am vazut in metoda config  trebuie sa aiba scope ca sa poata transmite ceva view-ului*/
/*trebuie sa fac un request pe http si din cauza asta avem acolo http*/
ctrl.controller('messageController', function($scope, $http){
    /*avem fucntie de scope http*/
    /*scope.constructor este o functie */
  $scope.constructor = () => {
    /*get server - iau pagina default aceasta metoda returneaza un promiss (promis = o valoare viitoare) la aceasta metoda pot sa leg un ??? (value?)*/
    $http.get(SERVER + '/hello')
    /*atunci raspunsul (nu doar continutul raspunsului ci si codul)*/
      .then((response) => {
        /*message este cheia din message.html avem proprieatea data ca sa aflam ce am primit efectiv fara cod  al 2-lea messajge e din server.js*/
        $scope.message = response.data.message
      })
      /*cad ai o fcti -> trebuie sa prinzi eroarea */
      .catch((error) => {
        /*in momentul in care se va incarca view-ul console log - acest cod se va rula*/
        console.log(error)
        $scope.message = 'problem occured'
      })		  
    }
  $scope.constructor()/*aici se ruleaza functia */
})

