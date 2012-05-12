define(["jquery", "qunit"], function($, qunit)
{
   return {
      start : function()
      {
         require(["aj/display/DisplayObject"], function(DisplayObject)
         {
            module("display");
            
            test("aj/display/DisplayObject", function()
            {
               var displayObject = new DisplayObject();
               ok(displayObject instanceof DisplayObject, "instanciate");
            });
         });
         
         require(["aj/display/Stage"], function(Stage)
         {
            test("aj/display/Stage", function()
            {
               var stage = new Stage(10, 10);
               ok(stage instanceof Stage, "instanciate");
               
               equal(typeof stage._domElement, "object", "create canvas");
               
               var racineElement = document.createElement("div"),
                   racineElementId = "stage";
               racineElement.id = racineElementId;
               document.body.appendChild(racineElement);
               
               stage.attachTo(racineElementId);
            });
         });
      }
   };
});