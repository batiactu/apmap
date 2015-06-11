app.controller('photosCtrl', function ($scope, ArticleFactory, $anchorScroll, $location, $routeParams) {

	$scope.entity_types = false;
	$scope.ws = false;
	$scope.articles = false;
	$scope.image = ($routeParams.image==undefined)?1:$routeParams.image;
	$scope.$routeParams = $routeParams;

	$scope.filter.entity_type='reseau_realisation';
	ArticleFactory.getArticles($scope.filter).then(function(data){
	$scope.articles = data.items;
	$scope.ws = data;
	});

	//Fonction qui retourne tous les articles par entity_type (passé en paramètre)
    $scope.sortByEntityType = function(entity_type){
    	$scope.filter.page = '1';
        if (entity_type == 'toutes'){
            $scope.filter.entity_type='reseau_realisation OR article_edito';
        }
        else{
            $scope.filter.entity_type=entity_type;
        }
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

    // Convertie un string en valeur
    $scope.int_val = function(value){
        return parseInt(value);
    }


    /*
	$scope.imagePrecedente = function(image){
        if ($scope.int_val($scope.image)>1){
            $location.path('/photos/'+($scope.int_val($scope.image)-1));
    }
    };

    $scope.imageSuivante = function(image){
        if ($scope.int_val($scope.image)<30){
            $location.path('/photos/'+($scope.int_val($scope.image)+1));
    }
    };*/

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

});

