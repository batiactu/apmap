var app = angular.module('myapp', ['ngRoute', 'ngSanitize', 'angular.css.injector', 'ngTouch', 'ui.bootstrap'] );
app.config(function($routeProvider){
    $routeProvider
        .when('/', {templateUrl : 'views/home.html', controller: 'articlesCtrl'})
        .when('/profil/:id', {templateUrl: 'views/profil.html', controller:'profilCtrl'})
        .when('/profil/:id/:page', {templateUrl : 'views/profil.html', controller:'profilCtrl'})
        .when('/contact', {templateUrl: 'views/contact.html'})
        .when('/connexion', {templateUrl: 'views/connexion.html'})
        .when('/actualites', {templateUrl : 'views/home.html', controller:'articlesCtrl'})
        .when('/realisations', {templateUrl : 'views/home.html', controller:'articlesCtrl'})
        .when('/inscription', {templateUrl : 'views/inscription.html'})
        .when('/identification', {templateUrl : 'views/identification.html', controller:'identificationCtrl'})
        .when('/photos', {templateUrl : 'views/photos.html', controller:'photosCtrl'})
        .when('/trouverPro', {templateUrl : 'views/trouverPro.html', controller:'articlesCtrl'})
        .when('/profilPro', {templateUrl : 'views/profilPro.html', controller:'profilProCtrl'})
        .when('/profilPro/vueEnsemble', {templateUrl : 'views/profilPro.html', controller:'profilProCtrl'})
        .when('/profilPro/photoProjet', {templateUrl : 'views/profilPro.html', controller:'profilProCtrl'})
        .when('/profilPro/secteurs', {templateUrl : 'views/secteurs.html', controller:'profilProCtrl'})
        .otherwise({redirectTo : '/'});
        
    });

app.run(function($rootScope, ConfigFactory) {
    $rootScope.filter = {};
    $rootScope.config = {};
    $rootScope.menuToggle = {};
    $rootScope.config.loader = false;
    ConfigFactory.getTrad().then(function(data){
        $rootScope.config.trad = data;
    });
})

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };
});

/* Fonction pour la traduction */
app.filter('traduction', function($rootScope) {
    return function(input, key){
        // Si le input est DESC ou ASC (pour la date ou la pertinence)
        if (input == "DESC" || input == "ASC"){
            input = key + '_' + input;
        }
        // Si le input vaut 0, on le remplace par 1 (pour la pagination)
        if (input == "0"){
            input = "1";
        }

        if (typeof input=='undefined' || typeof $rootScope.config.trad=='undefined' || typeof $rootScope.config.trad[input]=='undefined'){
            return input;
        }
        else{
            return $rootScope.config.trad[input];
        }
    };

   
});

/* Fonction pour remplacer les caractères spéciaux */
app.filter('getCSS', function() {
    return function(input) {
        if (typeof input == 'undefined'){
            return 'commun.min';
        }
        else{
            return input
        }
    };
});

/* Fonction pour remplacer les caractères spéciaux */
app.filter('replaceCharacter', function() {
    return function(input) {
        return input
        .replace(/\r\n/g,'<br>')
        .replace(/\t/g,'&nbsp&nbsp&nbsp&nbsp')
        .replace('[PUB]',' ')
        .replace('[NOPUB]',' ');
    };
});

/* Fonction pour dédoubler les themes */
app.filter('dedoublonne', function() {
    return function(input){
        if (input==undefined){
            return [];
        }
        var newList = [];
        var tt = [];
        for (var i = 0; i < input.length; i++) {
            if (newList[input[i]] == undefined) {
                newList[input[i]] = input[i];
                tt.push(input[i]);
            }
        }
        return tt;
    };
});