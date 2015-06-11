app.controller('identificationCtrl',  function ($scope){

    /* Pour l'identification : slider */
    var slides = $scope.slides = [];
        slides.push({
            icon:'fa-th-list',
            image: 'http://img1.mxstatic.com/wallpapers/3e77ac698f3900e44e410d844cba8e89_large.jpeg',
            text: 'Des milliers d\'articles n\'attendent que vous',
            title: 'Découvrez des réalisations avec leur description'
        });
        slides.push({
            icon:'fa-th-large',
            image: 'http://www.hdwallpapersos.com/wp-content/uploads/2015/04/Full-Hd-Wallpapers-1920x1080.jpg',
            text: 'Admirez nos nombreuses images',
            title: 'Inspirez-vous des réalisations grâce à ce mode visuel'
        });
        slides.push({
            icon:'fa-briefcase',
            image: 'http://t.wallpaperweb.org/wallpaper/nature/1920x1080/canadanaturecorner1920x1080wallpaper10144.jpg',
            text: 'Observez ses réalisations et prenez des idées',
            title: 'Trouvez un pro'
        });


    /* Pour la connexion et l'inscription */
    var connexion= $scope.connexion = [];
    connexion.push({
        image: 'http://img0.mxstatic.com/wallpapers/8364c61d7574406a358405c80a86d8f0_large.jpeg',
    });

});