app.factory('ConfigFactory', function ($http, $q) {

    var factoryConf = {
        res : {},
        URLConfTrad : "scripts/config/trad.json",

        getTrad : function(){
            var deferred = $q.defer();
           
            $http.get(this.URLConfTrad)
            // En cas de succès les articles prennent la valeur de la recherche get (data.items)
            .success(function(data, status){
                this.res = data;
                deferred.resolve(this.res);
            })
            // En cas d'échec 
            .error(function(data, status){
                deferred.reject('Impossible de récupérer la traduction');
            });
            return deferred.promise;
        }
    };
    return factoryConf;
});