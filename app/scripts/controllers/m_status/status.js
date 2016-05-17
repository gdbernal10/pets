(function(){
angular.module('status')
    .controller('statusCtrl',['$scope','$http', function($scope,$http){

        function init(){
            $scope.APP_NAME = "Mascotas";
            $scope.m_config = "Config";
            //$scope.pets = [
            //    {id:1,name:'lazy',age:'1',gender:'female',healthState:'good',img:"1.jpeg",lastMonth_td:"",total_td:""},
            //    {id:2,name:'lazy1',age:'2',gender:'male',healthState:'good',img:"2.jpeg"},
            //    {id:3,name:'lazy2',age:'3',gender:'female',healthState:'bad',img:"3.jpeg"},
            //    {id:4,name:'lazy2',age:'4',gender:'female',healthState:'Bad',img:"4.jpeg"},
            //    {id:5,name:'lazy2',age:'5',gender:'female',healthState:'Bad',img:"5.jpeg"},
            //    {id:6,name:'lazy2',age:'6',gender:'female',healthState:'Bad',img:"6.jpeg"},
            //    {id:7,name:'lazy2',age:'7',gender:'female',healthState:'Bad',img:"7.jpeg"},
            //    {id:8,name:'lazy2',age:'8',gender:'female',healthState:'Bad',img:"8.jpeg"},
            //    {id:9,name:'lazy2',age:'9',gender:'female',healthState:'Bad',img:"9.jpeg"},
            //    {id:10,name:'lazy2',age:'10',gender:'female',healthState:'Bad',img:"10.jpeg"},
            //    {id:11,name:'lazy2',age:'11',gender:'female',healthState:'Bad',img:"11.jpeg"},
            //    {id:12,name:'lazy2',age:'12',gender:'female',healthState:'Bad',img:"12.jpeg"},
            //    {id:13,name:'lazy2',age:'13',gender:'female',healthState:'Bad',img:"13.jpeg"},
            //    {id:14,name:'lazy2',age:'14',gender:'female',healthState:'Bad',img:"14.jpeg"},
            //    {id:15,name:'lazy2',age:'15',gender:'female',healthState:'Bad',img:"15.jpeg"}
            //];
            getPets();
            getRaces();
            $scope.petSelected = {};
            $scope.module = {};

        }

        init();


        $scope.showSelectedPetInfo = function(pet){
            var race = null;
            $scope.races
                .some(function(e,i,arr){
                    if(e.race == pet.race){
                        race = e;
                        return true;
                    }
                });
            $scope.petSelected = {pet:pet,race: race,predict:"None"};
        }
        $scope.setCurrentModule = function(e){
            $scope.module={id:e.currentTarget.id,name:e.currentTarget.name};
        }

        $scope.predict = function(pet){
            //$http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
            var json = [[pet.race,pet.heart_fre,pet.temp,pet.weight,pet.resp_min]];
            //$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            //$http.post('https://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:9443/api/models/11/predict',json,
            $http.post('http://ec2-52-36-54-240.us-west-2.compute.amazonaws.com:3003/api/predict/11',json,
                {
                headers:{
                    'Content-Type':'application/json'
                    //, 'Authorization':'Basic YWRtaW46YWRtaW4='
                }
                }).success(function(data) {
                    $scope.petSelected.predict = data[0];
                })
                .error(function(error, data) {
                    $scope.petSelected.predict = "Error";
                });
            //$scope.petSelected.predict = pet.Res_pre;
        }

        function getPets(){
            $.getJSON("json/pets_medical.json", function(json) {
                $scope.pets = json;
            });
        }

        function getRaces(){
            $.getJSON("json/races_data.json", function(json) {
                $scope.races = json;
            });
        }
        
        
    }]);

}());