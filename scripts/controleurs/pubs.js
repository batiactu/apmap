app.controller('pubsCtrl', function ($scope, $log, PubFactory){
	$scope.pubs = false;
	//$scope.pub = false;
	$scope.$log = $log;
	$scope.pubFactory = PubFactory;

	//Retourne les pubs
	PubFactory.getPubs().then(function(data){
        $scope.pubs = data;
    });
});