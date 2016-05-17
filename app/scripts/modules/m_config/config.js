/**
 * Created by bernalge on 5/15/16.
 */
angular.module('config',['filters']).config(['$stateProvider',
    function config($stateProvider){
        $stateProvider.state('config',{
            url:'/config',
            templateUrl:'views/m_config/index.html',
            controller: 'configCtrl',
            title:'Configuración'
        });
    }
]);
