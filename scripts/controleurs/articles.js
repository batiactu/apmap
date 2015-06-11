app.controller('articlesCtrl', function ($scope, $log, $location, ArticleFactory, $route, $anchorScroll) {
    $scope.articles = false;
    $scope.themes = false;
    $scope.entity_types = false;
    $scope.$location = $location;
    $scope.nb_page = 0;
    $scope.ws = false;
    $scope.type_realisations = false;
    $scope.type_travaux = false;
    $scope.rubriques = false;
    $scope.Math = window.Math;



    /* Pour changer l'entity_type en fonction du mot-clé passé en URL */
    
    if($location.path()=='/actualites') $scope.filter.entity_type='article_edito';
    if($location.path()=='/realisations') $scope.filter.entity_type='reseau_realisation';
    if($location.path()=='/') $scope.filter.entity_type='';

    if ($location.path=='/' || $location.path=='/actualites' || $location.path=='/realisations'){
    if($scope.filter.entity_type=='article_edito') $location.path('/actualites');
    if($scope.filter.entity_type=='reseau_realisation') $location.path('/realisations');
    if($scope.filter.entity_type=='') $location.path('/');
    }
    /*$scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };*/

    //Permet de changer de page
    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    // Convertie un string en valeur
    $scope.int_val = function(value){
        return parseInt(value);
    }

    //Retourne les articles
    ArticleFactory.getArticles($scope.filter).then(function(data){
        $scope.articles = data.items;
        $scope.ws = data;
    });



    // Fonction qui retourne tous les articles contenant la valeur de filter (passé en paramètre)
    $scope.search = function(filter){
        //Si le mot clé est vide, on le supprime
        if ($scope.filter.keywords==''){
            delete($scope.filter.keywords);
        }
        ArticleFactory.getArticles(filter).then(function(data){
        $scope.articles = data.items;
        $scope.ws = data;
        });
    }

    // Fonction qui retourne tous les article selon leur score (ASC ou DESC)
     $scope.sortScore = function(sort){
        // Si le filtre sur la date existe, on le supprime
        if($scope.filter.sort_order!=''){
            delete($scope.filter.sort_order);
        }
        $scope.filter.score=sort;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui permet de filtrer par page
    $scope.filterPage = function(page){
        $scope.filter.page=page;
        ArticleFactory.getArticles($scope.filter).then(function(data){
        $scope.articles = data.items;
        $scope.ws = data;
        });
        $location.hash('top');
        $anchorScroll();
    }

    // Fonction qui retourne tous les articles par ordre de date de publication (DESC ou ASC)
    $scope.sortDate = function(sort){
        //Si le filtre sur la pertinence existe, on le supprime
        if($scope.filter.score!=''){
            delete($scope.filter.score);
        }
        $scope.filter.sort_order=sort;
        ArticleFactory.getArticles($scope.filter).then(function(data){
        $scope.articles = data.items;
        $scope.ws = data;
        });
    }

    //Fonction qui retourne tous les articles par thème (passé en paramètre)
    $scope.sortByTheme = function(theme){
        //Si on filtre par thème, cela supprime tous les autres filtres
        angular.forEach($scope.filter, function(value, index){
            delete ($scope.filter[index]);
        });
        $scope.filter.theme=theme;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui retourne tous les articles par thème (passé en paramètre)
    $scope.sortByRubrique = function(rubrique){
        //Si on filtre par rubrique, cela supprime tous les autres filtres
        angular.forEach($scope.filter, function(value, index){
            delete ($scope.filter[index]);
        });
        $scope.filter.rubrique=rubrique;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui retourne tous les articles par entity_type (passé en paramètre)
    $scope.sortByEntityType = function(entity_type){
        $scope.filter.entity_type=entity_type;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui retourne tous les articles par type_realisation (passé en paramètre)
    $scope.sortByType_real = function(type_realisation){
        //Si on filtre par type de réal, cela supprime tous les autres filtres
        angular.forEach($scope.filter, function(value, index){
            delete ($scope.filter[index]);
        });
        $scope.filter.type_realisation=type_realisation;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui retourne tous les articles par type_realisation (passé en paramètre)
    $scope.sortByType_travaux = function(type_trav){
        //Si on filtre par type de travaux, cela supprime tous les autres filtres
        angular.forEach($scope.filter, function(value, index){
            delete ($scope.filter[index]);
        });
        $scope.filter.type_trav=type_trav;
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
    }

    //Fonction qui supprime les filtres par clé 
    $scope.removeFilters = function(key, value){
        delete ($scope.filter[key]);
        ArticleFactory.getArticles($scope.filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        })

     
        ArticleFactory.getEntityTypes().then(function(data){
        $scope.menuToggle.entity_types = data;
    });
    }
  
    //Permet de redimensionner l'image
    $scope.imgResize = function (urlIMG) {
        return urlIMG.replace('medium', 'medium_auto/300-200-c')
    }

    //Permet de redimensionner l'image
    $scope.clicImage = function (urlIMG) {
        return urlIMG.replace('medium', 'big')
    }

    /* Fonction permettant de supprimer tous les filtres 
     *  Paramètres : Aucun
     *  Traitement : - On supprime le filtre
     *               - On affecte data.items à $scope.articles, et data à $scope.ws (obtenus par getArticles)
     *               - On rafraîchit la page
     *               - On affecte data (tous les entity) à $scope.menuToggle.entity_type
     *  Résultat : Aucun
     */
    $scope.removeAllFilters = function(filter){
        angular.forEach(filter, function(value, index){
            delete ($scope.filter[index]);
        });
        ArticleFactory.getArticles(filter).then(function(data){
            $scope.articles = data.items;
            $scope.ws = data;
        });
        $location.path('/');
        $route.reload();
        ArticleFactory.getEntityTypes().then(function(data){
            $scope.menuToggle.entity_types = data;
        });
    }

    //Permet de changer d'entity et de supprimés les filtres
    $scope.changeEntity = function(unEntity){
        angular.forEach($scope.filter, function(value, index){
            delete ($scope.filter[index]);
        });
        $scope.filter.entity_type=unEntity;
    }



    // Retourne les thèmes
    ArticleFactory.getThemes().then(function(data){
        $scope.menuToggle.themes = data;
    });

    // Retourne les entity_type
    ArticleFactory.getEntityTypes().then(function(data){
        $scope.menuToggle.entity_types = data;
    });

    // Retourne les type_realisation
    ArticleFactory.getType_realisations().then(function(data){
        $scope.menuToggle.type_realisations = data;
    });

    // Retourne les type_travaux
    ArticleFactory.getType_travaux().then(function(data){
        $scope.menuToggle.type_travaux = data;
    });

    // Retourne les rubriques
    ArticleFactory.getRubriques().then(function(data){
        $scope.menuToggle.rubriques = data;
    });    

    $scope.$log = $log; 

})

