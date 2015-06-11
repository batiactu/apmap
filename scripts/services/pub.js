app.factory('PubFactory', function ($http, $q){
	var pubFactory = {
		pubs : false,
		URLpub : 'http://capinfoproreport.batiactu.com/cap_pub/scripts/get-pub-support-emplacement.php?e=DROITE1&date=20150429&JSON',

	getPubs : function (){
		var deferred = $q.defer();

		// Si les pubs existent alors on les affiche
		if (pubFactory.pubs !== false){
			deferred.resolve(pubFactory.pubs);
		}
		//Sinon on les récupère

		else {
			// On récupère les pubs
            $http.get(pubFactory.URLpub)
            // En cas de succès les pubs prennent la valeur de la recherche get (data.items)
            .success(function(data, status){
                angular.forEach(data, function(value, key){
                        // On ne renvoie ques les gif (plus précisément on exclue les swf)
                        if (value.fichier.indexOf("swf")==-1){
                            if (pubFactory.pubs == false){
                                pubFactory.pubs = [];
                            }
                        pubFactory.pubs.push(value);
                        }
                    })
                    deferred.resolve(pubFactory.pubs);
                })
                // En cas d'échec 
                .error(function(data, status){
                    //on affiche un message d'erreur
                    deferred.reject('Impossible de récupérer les pubs');
                });
		}

		return deferred.promise;
	},

	/* Retourne une pub dont l'id est passé en paramètre */ 
        getPub : function(id){
            var pub = {};
            var deferred = $q.defer();
            if (pubFactory.pub[id] !== undefined){
                deferred.resolve(pubFactory.pub[id]);}
                else{
                    $http.get('http://capinfoproreport.batiactu.com/cap_pub/scripts/get-pub-support-emplacement.php?&ID='+id)
                    .success(function(data, status){
                        pubFactory.pub[id] = data.items;
                        deferred.resolve(pubFactory.pub[id]);
                    }).error(function(data, status){
                        deferred.reject('Impossible de récupérer les pubs');
                    });
                }
                return deferred.promise;
            },
        };
    return pubFactory;
});