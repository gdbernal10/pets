/**
 * Created by bernalge on 5/8/16.
 */

(function() {
    'use strict';
    angular.module('pets', [
        'ui.router',
        'status'
    ]).config(function ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            //$state.go('default');
            $state.go('pet');
        });

        /*
        $stateProvider.state('default', {
            url: '/',
            onEnter: ['$state', function ($state) {
                $state.go('pet');
            }],
            data: {
                publicPage: true
            }
        });
        */

        //$stateProvider.go('default');

        /*
         $stateProvider.state('pet.status', {
         url: '/pet.status',
         templateUrl: 'views/m_status/index.html',
         controller: 'statusCtrl',
         title: 'Consultar Solicitud | Originación',
         data: {
         publicPage: true
         }
         });
         */
        
    });
}());