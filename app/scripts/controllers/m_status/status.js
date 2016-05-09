(function(){
angular.module('pets')
    .controller('statusCtrl',['$scope', function($scope){

        function init(){
            $scope.APP_NAME = "Mascotas";
            $scope.pets = [
                {id:1,name:'lazy',age:'1',gender:'female',healthState:'Good',img:"1.jpeg"},
                {id:2,name:'lazy1',age:'2',gender:'male',healthState:'Good',img:"2.jpeg"},
                {id:3,name:'lazy2',age:'3',gender:'female',healthState:'Bad',img:"3.jpeg"},
                {id:4,name:'lazy2',age:'4',gender:'female',healthState:'Bad',img:"4.jpeg"},
                {id:5,name:'lazy2',age:'5',gender:'female',healthState:'Bad',img:"5.jpeg"},
                {id:6,name:'lazy2',age:'6',gender:'female',healthState:'Bad',img:"6.jpeg"},
                {id:7,name:'lazy2',age:'7',gender:'female',healthState:'Bad',img:"7.jpeg"},
                {id:8,name:'lazy2',age:'8',gender:'female',healthState:'Bad',img:"8.jpeg"},
                {id:9,name:'lazy2',age:'9',gender:'female',healthState:'Bad',img:"9.jpeg"},
                {id:10,name:'lazy2',age:'10',gender:'female',healthState:'Bad',img:"10.jpeg"},
                {id:11,name:'lazy2',age:'11',gender:'female',healthState:'Bad',img:"11.jpeg"},
                {id:12,name:'lazy2',age:'12',gender:'female',healthState:'Bad',img:"12.jpeg"},
                {id:13,name:'lazy2',age:'13',gender:'female',healthState:'Bad',img:"13.jpeg"},
                {id:14,name:'lazy2',age:'14',gender:'female',healthState:'Bad',img:"14.jpeg"},
                {id:15,name:'lazy2',age:'15',gender:'female',healthState:'Bad',img:"15.jpeg"}
            ];
        }

        init();

    }]);

}());