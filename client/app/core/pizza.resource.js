(function () {

    'use strict';

    angular
            .module('app.core')
            .value('resourcePizza', null)
            .service('pizzaResource', pizzaResource)

    pizzaResource.$inject = ['$resource', 'resourcePizza'];

    function pizzaResource($resource, resourcePizza) {

        resourcePizza = $resource('/pizza/:Id', null,
                {
                    update: {
                        method: 'PUT'
                    }
                });

        var actions = {
            getPizza: getPizza,
            getPizzaById: getPizzaById,
            deletePizzaById: deletePizzaById,
            addPizza: addPizza,
            updatePizza: updatePizza
        };
        return actions;

        ///////////////////////////////////

        function getPizza() {
            return resourcePizza.query();
        }

        function getPizzaById(Id) {
            resourcePizza.get({Id: Id});
        }

        function deletePizzaById(Id) {
            resourcePizza.delete({Id: Id});
        }

        function addPizza(pizza) {
            resourcePizza.save(pizza);
        }
        
        function updatePizza(id, pizza){
            resourcePizza.update({ Id:id }, pizza);
        }


    }

})();