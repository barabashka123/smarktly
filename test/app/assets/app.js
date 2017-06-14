angular.module('app', ['ui.router'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('app', {
                controller: 'appCtrl',
                templateUrl: 'index.html'
            })
            .state('app.login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'login.html'
            })
            .state('app.main', {
                url: '/main',
                controller: 'mainCtrl',
                templateUrl: 'main.html'
            })
            .state('app.main.words', {
                url: '/words',
                controller: 'appWordsCtrl',
                templateUrl: 'templates/example1.html'
            })
            .state('app.main.tabs1', {
                url: '/tabs1',
                controller: 'appTabs1Ctrl',
                templateUrl: 'templates/example2.html'
            })
            .state('app.main.tabs2', {
                url: '/tabs2',
                controller: 'appTabs2Ctrl',
                templateUrl: 'templates/example3.html'
            })
            .state('app.main.tabs3', {
                url: '/tabs3',
                controller: 'appTabs3Ctrl',
                templateUrl: 'templates/example4.html'
            })
            .state('app.tabs', {
                url: '/tabs4',
                controller: 'appTabs4Ctrl',
                templateUrl: 'tabs/tabs.html'
            });
    })

    .controller('appCtrl', function ($scope, $state) {
        console.log('app ctrl');
        $state.go('app.login');
    })
    .controller('loginCtrl', function ($scope, $rootScope, $stateParams, $state, LoginService) {
        console.log('login ctrl');
        $rootScope.title = "AngularJS Login Sample";

        $scope.formSubmit = function() {
            if(LoginService.login($scope.username, $scope.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('app.main');
            } else {
                $scope.error = "Incorrect username/password !";
            }
        };
    })
    .controller('mainCtrl', function ($scope, $state) {

        $scope.product = {
            select: null,
            productivity: null,
            price: null,
            square: null
        };
        $scope.$watch("product", function() {
            $scope.error = null;
            
            if ($scope.product.select && $scope.product.productivity > 0 && $scope.product.price > 0  && $scope.product.square > 0){

                //here some mathematical calculations

                $scope.profit = ($scope.product.productivity * $scope.product.price * $scope.product.square) * 2;
            } else {
                delete $scope.profit;
            }
        }, true);

        // watch for side tab changed
        $scope.$on('activeTab', function (event, data) {
            $scope.activeTab = data;
        });

    })
    .controller('appWordsCtrl', function ($scope, $state, DataService) {

        // throw event main tab change
        $scope.$emit('activeTab', 'ex1');

		$scope.words = DataService.getWords();
    })
    .controller('appTabs1Ctrl', function ($scope, $state) {
        $scope.$emit('activeTab', 'ex2');
    })
    .controller('appTabs2Ctrl', function ($scope, $state) {
        $scope.$emit('activeTab', 'ex3');
    })
    .controller('appTabs3Ctrl', function ($scope, $state) {
        $scope.$emit('activeTab', 'ex4');
    })
    .controller('appTabs4Ctrl', function ($scope, $state) {
       
	    $scope.tab = 1;

		$scope.setTab = function(newTab){
		  $scope.tab = newTab;
		};

		$scope.isSet = function(tabNum){
		  return $scope.tab === tabNum;
		};
    })
	.service('DataService', function() {
		
		this.getWords = function() {
			return [ {id: 1, text: 'dog', translate: 'собака'},
					 {id: 2, text: 'cat', translate: 'кіт'},
					 {id: 3, text: 'frog', translate: 'жаба'},
					 {id: 4, text: 'fox', translate: 'лисиця'},
					 {id: 5, text: 'elephant', translate: 'слон'}];
		}
	})
    .run(function($rootScope, $location, $state, LoginService) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                console.log('Changed state to: ' + toState);
            }
		);
        if(!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
    })
	.run(function ($rootScope) {
		$rootScope.$on('$locationChangeSuccess', function (event, url, oldUrl) {
			console.log('old url', oldUrl);
			console.log('location change changed on ', url);
		});
	})
    .factory('LoginService', function() {
        var admin = 'admin';
        var pass = 'admin';
        var isAuthenticated = false;

        return {
            login : function(username, password) {
                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated : function() {
                return isAuthenticated;
            }
        };
    })
