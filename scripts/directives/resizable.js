app.directive('resizable', function($window) {
  return function($scope) {
    return angular.element($window).bind('resize', function() {
      $scope.largeur = $window.innerWidth;
      return $scope.$apply();
    });
  };
});