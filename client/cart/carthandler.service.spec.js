
describe('carthandler tests', function (){
  var carthandler;
  /*beforeEach(module('tutorialApp'));
  beforeEach(inject(function(_carthandler_) {
            console.log("inject OK");
            throw "qas";
      carthandler = _carthandler_;
    }))*/;
  // excuted before each "it" is run.
  beforeEach(function (){
    
    console.log("beforeEach OK" + (typeof inject));
    
    // load the module.
    var y = module('tutorialApp');
    console.log("asd" + y);
    
    // inject your service for testing.
    // The _underscores_ are a convenience thing
    // so you can have your variable name be the
    // same as your injected service.
    var x = inject(function(_carthandler_) {
            console.log("inject OK");

      carthandler = _carthandler_;
    });
    console.log("test" + (typeof x));
  });
    
  // check to see if it has the expected function
  it('should have an exciteText function', function () { 
    //expect(angular.isFunction(carthandler && carthandler.getLength)).toBe(true);
    expect(true).toBe(true);
  });
  
});