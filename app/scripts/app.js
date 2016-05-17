/**
 * Created by bernalge on 5/8/16.
 */

(function() {
    'use strict';
    angular.module('pets', [
        'ui.router',
        'aa.formExtensions',
        'aa.notify',
        'ngAnimate',
        'ngMessages',
        'ngSanitize',
        'ui.utils.masks',
        'validationModule',
        'validation.match',
        'status',
        'config'
    ]).config(function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/pet');
        /*$urlRouterProvider
            .otherwise(function($injector,$location) {
                    var $state = $injector.get('$state');

                    $state.go('pet');
                }
        );*/
    });
}());