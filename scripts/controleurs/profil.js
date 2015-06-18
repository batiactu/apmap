app.controller('profilCtrl',  function ($scope, ArticleFactory, $log, $routeParams, $location, $route){
    
    $scope.article = false;
    $scope.$location = $location;
    $scope.$log = $log;
    $scope.page = ($routeParams.page==undefined)?1:$routeParams.page;
    $scope.$routeParams = $routeParams;
    $scope.unArticle = {};
    $scope.filter.entity_type = 'reseau_realisation';

    ArticleFactory.getArticle($routeParams.id).then(function(data){
        if (typeof data == 'undefined'){
            $scope.article = {};
        }
        else{
            $scope.article = data[0];
            $scope.unArticle = $scope.fromJJson($scope.article.zs_json)
        }

    });



    

    //Permet de 'dé-jsonisait'
    $scope.fromJJson = function (value) {
        return angular.fromJson(value);
    }

    //Permet de compter les pages
    $scope.comptePage = function (listePage){
        if (listePage == null || listePage == undefined){
            return '';
        }
        else {
            return listePage.length +1;    
        }  
    }

    // Convertie un string en valeur
    $scope.int_val = function(value){
        return parseInt(value);
    }

    /* Fonction retournant le chemin d'un template (fichier HTML)
     *  Paramètre : entity, un entity_type
     *  Résultat : le chemin (absolu) du template correspondant à l'entity_type
     */
    $scope.changeTemplate = function (entity){
        return 'views/templates/' + entity + '.html'
    }

    /*$scope.recupPhoto = function(photo, page){
        $scope.
    }*/

    //Permet d'afficher la bonne photo pour la page d'un article
    $scope.lienPhoto = function(listePhotos, numPage){
        var i;
        for (i=0; i<listePhotos.length;i++){
            if (parseInt(listePhotos[i].page) == numPage){
                var fichier = listePhotos[i].photo.fichier1;
                var taille = listePhotos[i].taille;
                return {"toto":4, "fichier": listePhotos[i].photo.fichier1, "taille": taille};
            }
        }
        return {};
    }

    //Permet de redimensionner l'image
    $scope.imgResize = function (urlIMG) {
        return urlIMG.replace('medium', 'medium_auto/300-200-c')
    }

    //Permet de redimensionner l'image
    $scope.clicImage = function (urlIMG) {
        return urlIMG.replace('medium', 'big')
    }

    $scope.precSuiv = function(){
        var i;
        var index=-1;
        var idPrec = '';
        var labelPrec = '';
        var imgPrec = '';
        var idSuiv = '';
        var labelSuiv = '';
        var imgSuiv = '';

        // Si articles ne vaut pas false alors on fait le traitement.
        if(ArticleFactory.articles){
            if (ArticleFactory.articles.items == undefined) {
                return {};
            }
            for (i=0; i<ArticleFactory.articles.items.length; i++){
                if ((ArticleFactory.articles.items[i].id)==($routeParams.id)){
                    index=i;
                }  
            }
            // Il n'y a pas de précédent car on est au tout premier article
            if (index==0){
                if (ArticleFactory.articles.items!=undefined && ArticleFactory.articles.items[index+1]!=undefined){
                    var idSuiv = ArticleFactory.articles.items[index+1].id;
                    var labelSuiv = ArticleFactory.articles.items[index+1].label;
                    if (ArticleFactory.articles.items[index+1].sm_image_url != undefined && ArticleFactory.articles.items[index+1].sm_image_url[0] != undefined)
                        var imgSuiv = ArticleFactory.articles.items[index+1].sm_image_url[0];
                    else
                        var imgSuiv = null;
                }
            }
            // Il n'y a pas de suivant car on est au dernier article
            else if(index==ArticleFactory.articles.items.length-1){
                if (ArticleFactory.articles.items!=undefined && ArticleFactory.articles.items[index-1]!=undefined){
                    var idPrec = ArticleFactory.articles.items[index-1].id;
                    var labelPrec = ArticleFactory.articles.items[index-1].label;
                    if (ArticleFactory.articles.items[index-1].sm_image_url != undefined && ArticleFactory.articles.items[index-1].sm_image_url[0] != undefined)
                        var imgPrec = ArticleFactory.articles.items[index-1].sm_image_url[0];
                    else
                        var imgPrec = null;
                }
            }
            // Il y a un précédent et un suivant car on est en plein milieu
            else{
                if (ArticleFactory.articles.items!=undefined && ArticleFactory.articles.items[index-1]!=undefined){
                    var idPrec = ArticleFactory.articles.items[index-1].id;
                    var labelPrec = ArticleFactory.articles.items[index-1].label;
                    if (ArticleFactory.articles.items[index-1].sm_image_url != undefined && ArticleFactory.articles.items[index-1].sm_image_url[0] != undefined)
                        var imgPrec = ArticleFactory.articles.items[index-1].sm_image_url[0];
                    else
                        var imgPrec = null;
                }
                if (ArticleFactory.articles.items!=undefined && ArticleFactory.articles.items[index+1]!=undefined){
                    var idSuiv = ArticleFactory.articles.items[index+1].id;
                    var labelSuiv = ArticleFactory.articles.items[index+1].label;
                    if (ArticleFactory.articles.items[index+1].sm_image_url != undefined && ArticleFactory.articles.items[index+1].sm_image_url[0] != undefined)
                        var imgSuiv = ArticleFactory.articles.items[index+1].sm_image_url[0];
                    else
                        var imgSuiv = null;
                }
            }
            return {"idPrec":idPrec,"labelPrec":labelPrec,"imgPrec":imgPrec,"idSuiv":idSuiv,"labelSuiv":labelSuiv,"imgSuiv":imgSuiv}
        }
        else{
            return {};
        }  
    return {};

    }

    $scope.pagePrecedente = function(page, unArticle){
        if ($scope.int_val($scope.page)>1){
            $location.path('/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)-1));
    }
    };

    $scope.pageSuivante = function(page, unArticle){
        if ($scope.int_val($scope.page) < $scope.comptePage(unArticle.TPage)){
            $location.path('/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)+1));

    }
    };

    // le bouton "retour recherche" renvoie vers l'entity_type sur le quel on était, sinon sur accueil
    $scope.retourRecherche = function(entity){
        if (entity=='reseau_realisation'){
            $location.path('/realisations');
        }
        else if (entity=='article_edito'){
            $location.path('/actualites');
        }
        else{
            $location.path('/');
        }
    };

    /* Pour swiper d'article */
    /*var myElement = document.getElementById('monBody');
    var mc = new Hammer(myElement);
    // Pour avoir l'article précédent : on swipe de la gauche vers la droite
    mc.on("swiperight", function(ev) {
        if ($scope.int_val($scope.page)>1){
            console.log('terminal', '/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)-1));
                $location.path('/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)-1));
                //$route.reload();
        }
    });
    // Pour avoir l'article suivant : on swipe de la droite vers la gauche
    mc.on("swipeleft", function(ev) {
        console.log($routeParams);
        console.log('gjh', $scope.unArticle);
        if ($scope.int_val($scope.page) < $scope.comptePage($scope.unArticle.TPage)){
            console.log('sdjkghfjh', $scope.page);
            console.log('titi', '/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)+1));

                $location.path('/profil/'+($routeParams.id)+'/'+($scope.int_val($scope.page)+1));
                //$route.reload();
        }
    });*/

    
    jQuery("a.test").fancybox();
         
});