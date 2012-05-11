define(["jquery", "qunit"], function($, qunit)
{
   
   return {
      start : function()
      {
         require(["aj/Obj"], function(Obj)
         {
            module("core");
            
            test("aj/Obj", function()
            {
               var obj = new Obj();
               ok(obj instanceof Obj, "instanciate Obj" );
            });
         });
      }
   };
});