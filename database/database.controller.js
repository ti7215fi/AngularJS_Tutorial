database
        .controller("DatabaseController", DatabaseController);


function DatabaseController($scope, DatabaseFactory)
{
    $scope.database = DatabaseFactory;
};
