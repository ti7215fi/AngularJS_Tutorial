app
        .factory('UserF', UserFactory)
        .controller('UserCtrl', UserController);

function UserFactory(){
    var user = [
        ["admin","123"],
        ["user","123"]
    ];
    
    var actions = {
        getUser : getUser,
        getUsernameByID: getUsernameByID,
        getPasswordByID: getPasswordByID
    };
    return actions;
    
    function getUser()
    {
        return user;
    }
    
    function getUsernameByID(ID)
    {
        return user[ID][0];
    }
    
    function getPasswordByID(ID)
    {
        return user[ID][1];
    }
}

function UserController($scope, User)
{
    $scope.user = User;
}
