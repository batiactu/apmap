app.controller('profilProCtrl', function ($scope, $location, ArticleFactory) {

    $scope.progress = false;
    $scope.location = $location;
    $scope.articles = false;
    $scope.ws = false;

    $scope.resetActive = function(id, url) {

        $("#row_step div").each(function () {
            if ($(this).hasClass("activestep")) {
                $(this).removeClass("activestep");
            }
        });

        if ($('#'+id).hasClass("col-md-2")) {
            $('#'+id).addClass("activestep");
        }
        else {
           // $('#'+id).parent().addClass("activestep");
        }


        if (url != undefined) {
            $location.path(url);
        }
    };


    if($location.path() == '/profilPro/vueEnsemble' || $location.path() == '/profilPro') {
        $scope.resetActive('mpp_ve');
    }
     if($location.path() == '/profilPro/photoProjet') {
        $scope.resetActive('mpp_photo');
    }
     if($location.path() == '/profilPro/servicesPro') {
        $scope.resetActive('mpp_secteurs');
    }

        //Retourne les articles
    ArticleFactory.getArticles($scope.filter).then(function(data){
        $scope.articles = data.items;
        $scope.ws = data;
    });


});