/**
 * Created by bernalge on 5/15/16.
 */
(function(){
    angular.module('config')
        .controller('configCtrl',['$scope','$http', function($scope,$http){

            function init(){
                $scope.m_config = "Config";
                $scope.configSelected = {};
                $scope.module = {};
                $scope.crud ="";
                $scope.configs =[];
                $scope.dataSetId = "";
                getConfig();
            }

            init();


            $scope.showSelectedConfigInfo = function(config){
                var val = [];
                config.config.split(',')
                    .forEach(
                        function(e,i,arr){
                            val.push({value:e,edit:false});
                        }
                    );
                $scope.configSelected = {cfg:config,values:val};
                $scope.crud ="U";
                $scope.activeForm = true;
                $scope.modelExec = true;
            }
            $scope.setCurrentModule = function(e){
                $scope.module={id:e.currentTarget.id,name:e.currentTarget.name};
            }


            $scope.edit = function(v){
                v.edit = true;
            }

            $scope.apply = function(v){
                if(v.value != undefined)
                    if(v.value.trim() != "" )
                        v.edit = false;
            }

            $scope.newConfig = function(){
                $scope.configSelected.values.push({value:"NEW VALUE",edit:true});
            }

            $scope.saveConfig = function(){

                //consume servicio que guarda la configuración
                var fields = "";
                $scope.configSelected.values.forEach(function(e){ return fields += (fields.length==0?"":",") + e.value; });
                var url ="http://localhost:3000/modify/"+ fields + "/" + $scope.dataSetId;
                $http.post(url,{})
                    .success(function(data) {
                        $scope.response = data[0];
                        $scope.activeForm = false;
                        getConfig();
                    })
                    .error(function(error, data) {
                        $scope.response = "Error";
                    });

            }

            $scope.deleteField = function(f){
                $scope.configSelected.values = $scope.configSelected.values
                    .filter(function(v){
                        return v.value != f.value;
                    });
            }

            function getConfig(){
                $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                $http.get("http://localhost:3000/data")
                    .success(function(data){
                        $scope.configs = [data];
                    })
                    .error(function(error,data){
                        $scope.configs = [data];
                    });

                /*
                $.getJSON("json/config.json", function(json) {
                    $scope.configs = [json];
                });*/
            }

            $scope.execute=function(){
                var url ="http://localhost:3000/load";
                $http.get(url)
                    .success(function(data) {
                        $scope.modelExec = false;
                    })
                    .error(function(error, data) {
                        $scope.response = "Error";
                    });
            }
        }]);

}());