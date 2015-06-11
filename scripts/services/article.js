app.factory('ArticleFactory', function ($http, $rootScope, $q) {

    var factory = {
        articles : false,
        filterOld : '',
        article : [],
        themes : false,
        entity_types : false,
        type_realisations : false,
        type_travaux : false,
        rubriques : false,
        nbArtMax : 30, // Nb d'articles par page
        nbPub : 6, // Nb de pubs
        entity_default : 'article_edito OR reseau_realisation',

        emplacementPub : function ($index){
            if ($index > 0){
                return ($index%Math.floor(factory.nbArtMax/factory.nbPub))==0;
            }
            else{
                return false;
            }
        },

        /* Fonction qui retourne tous les articles, un filtre est passé en paramètres afin de filtrer les articles selon différents critères */
        getArticles : function(filter){
            $rootScope.config.loader = true;
            var deferred = $q.defer();
            // Si on a passé un filtre (n'importe lequel), alors on vide la liste des articles
            if (typeof filter!== 'undefined' && (angular.toJson(filter)!=factory.filterOld)){
                factory.filterOld = angular.toJson(filter);
                factory.articles = false;
            }

            // Si les articles existent alors on les affiche
            if (factory.articles !== false){
                deferred.resolve(factory.articles);
                $rootScope.config.loader = false;
            }
            // Sinon on les récupère
            else{
                // Variable à compléter afin d'y passer des paramètres (filtres)
                var URL = 'http://demo.batiactu.info/webServiceSolarium/solarium3/scripts/ws.php?nb_item='+factory.nbArtMax+'&ENTITY='+factory.entity_default;

                var date_score = 'date';

                /* Si on passe un keyword en paramètre, alors on ajoute ce dernier à l'URL  et on filtre automatiquement par score decroissant*/
                if (typeof filter!== 'undefined' && typeof filter.keywords !== 'undefined'){
                    URL = URL +'&KEYWORDS='+filter.keywords;
                    date_score = 'score';
                }
                else{
                    date_score = 'date';
                }   

                /* Si on passe un sort-order en paramètre, alors on ajoute ce dernier à l'URL */
                if (typeof filter!== 'undefined' && typeof filter.sort_order !== 'undefined'){
                   date_score = 'date';
                }

                /* Si on passe un sort-order en paramètre, alors on ajoute ce dernier à l'URL */
                if (typeof filter!== 'undefined' && typeof filter.score !== 'undefined'){
                    date_score = 'score';
                }

                URL = URL +'&SORT_ORDER='+ date_score + '|DESC';

                //Si on passe un thème en paramètre alors on ajoute ce dernier à l'URL
                if (typeof filter!== 'undefined' && typeof filter.theme !== 'undefined'){
                    URL = URL +'&themeFILTER='+encodeURIComponent(filter.theme);
                }

                //Si on passe un entity_type en paramètre alors on ajoute ce dernier à l'URL
                if (typeof filter!== 'undefined' && typeof filter.entity_type !== 'undefined' && filter.entity_type !== ''){
                    URL = URL +'&ENTITY='+filter.entity_type;
                }

                //Si on passe une page en paramètre alors on ajoute cette dernière à l'URL
                if (typeof filter!== 'undefined' && typeof filter.page !== 'undefined'){
                    URL = URL +'&N='+filter.page;
                }

                //Si on passe un type de réalisation en paramètre alors on ajoute ce dernier à l'URL
                if (typeof filter!== 'undefined' && typeof filter.type_realisation !== 'undefined'){
                    URL = URL +'&type_realFILTER='+filter.type_realisation;
                }

                //Si on passe un type de travail en paramètre alors on ajoute ce dernier à l'URL
                if (typeof filter!== 'undefined' && typeof filter.type_trav !== 'undefined'){
                    URL = URL +'&type_travFILTER='+filter.type_trav;
                }        
     


                /* On récupère les articles */
                $http.get(URL)
                // En cas de succès les articles prennent la valeur de la recherche get (data.items)
                .success(function(data, status){
                    factory.articles = data;
                    // Si le type de chaque noeud de l'arbo n'est pas undefined (s'il existe) 
                    if (typeof data!== 'undefined' && typeof data.facets !== 'undefined' && typeof data.facets.theme !== 'undefined'){
                        // On récupère les thèmes
                        factory.themes = data.facets.theme;
                    }

                    // Si le type de chaque noeud de l'arbo n'est pas undefined (s'il existe) 
                    if (typeof data!== 'undefined' && typeof data.facets !== 'undefined' && typeof data.facets.rubrique !== 'undefined'){
                        // On récupère les thèmes
                        factory.rubriques = data.facets.rubrique;
                    }

                    // Si le type de chaque noeud de l'arbo n'est pas undefined (s'il existe) 
                    if (typeof data!== 'undefined' && typeof data.facets !== 'undefined' && typeof data.facets.entity_type !== 'undefined'){
                        // On récupère les entity_type
                        factory.entity_types = [];
                        angular.forEach(data.facets.entity_type, function(value){
                            factory.entity_types.push(value);
                        })
                    }
                    
                    // Si le type de chaque noeud de l'arbo n'est pas undefined (s'il existe)
                    if (typeof data!== 'undefined' && typeof data.facets !== 'undefined' && typeof data.facets.type_realisation !== 'undefined'){                       
                        // On récupère les type_realisations
                        factory.type_realisations = data.facets.type_realisation;
                    }

                    // Si le type de chaque noeud de l'arbo n'est pas undefined (s'il existe)
                    if (typeof data!== 'undefined' && typeof data.facets !== 'undefined' && typeof data.facets.type_trav !== 'undefined'){                       
                        // On récupère les type_travaux
                        factory.type_travaux = data.facets.type_trav;
                    }


                    if (factory.articles == ''){
                        factory.articles = 'Désolé, votre recherche n\'a pas abouti.';
                    }

                    // On affiche les thèmes
                    deferred.resolve(factory.articles);
                    $rootScope.config.loader = false;
                })
                // En cas d'échec 
                .error(function(data, status){
                    //on affiche un message d'erreur
                    deferred.reject('Impossible de récupérer les articles');
                });
            }
            return deferred.promise;
        },

        /* Retourne un article dont l'id est passé en paramètre */ 
        getArticle : function(id){
            var article = {};
            var deferred = $q.defer();
            if (factory.article[id] !== undefined){
                deferred.resolve(factory.article[id]);}
                else{
                    $http.get('http://demo.batiactu.info/webServiceSolarium/solarium3/scripts/ws.php?ID='+id)
                    .success(function(data, status){
                        factory.article[id] = data.items;
                        deferred.resolve(factory.article[id]);
                    }).error(function(data, status){
                        deferred.reject('Impossible de récupérer les articles');
                    });
                }
                return deferred.promise;
        },

        // Fonction qui récupère les thèmes des articles
        getThemes : function(){
            var deferred = $q.defer();
            setTimeout(function() {
                    deferred.resolve(factory.themes);
            }, 2000);
            return deferred.promise;
        },

        // Fonction qui récupère les entity_type des articles
        getEntityTypes : function(){
            var deferred = $q.defer();
            setTimeout(function() {
                    deferred.resolve(factory.entity_types);
            }, 2000);
            return deferred.promise;
        },

        // Fonction qui récupère les type_realisations des articles
        getType_realisations : function(){
            var deferred = $q.defer();
            setTimeout(function() {
                    deferred.resolve(factory.type_realisations);
            });
            return deferred.promise;
        },

        // Fonction qui récupère les type_travaux des articles
        getType_travaux : function(){
            var deferred = $q.defer();
            setTimeout(function() {
                    deferred.resolve(factory.type_travaux);
            });
            return deferred.promise;
        },

        // Fonction qui récupère les type_travaux des articles
        getRubriques : function(){
            var deferred = $q.defer();
            setTimeout(function() {
                    deferred.resolve(factory.rubriques);
            });
            return deferred.promise;
        }
    };
    return factory;
});