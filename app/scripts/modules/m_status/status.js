/**
 * Created by bernalge on 5/8/16.
 */
angular.module('status',[]).config(['$stateProvider',
    function config($stateProvider){
        $stateProvider.state('pet',{
            url:'/pet',
            templateUrl:'views/m_status/index.html',
            controller: 'statusCtrl',
            title:'Estado Mascotas'
        });
    }
]);
