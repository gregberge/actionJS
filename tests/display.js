define(["jquery", "qunit"], function($, qunit)
{
   return {
      start : function()
      {
         require(["aj/display/DisplayObject", "aj/geom/Point", "aj/geom/Rectangle"],
         function(DisplayObject, Point, Rectangle)
         {
            module("display");
            
            test("aj/display/DisplayObject", function()
            {
               var displayObject = new DisplayObject();
               displayObject._width = 20;
               displayObject._height = 50;
               
               ok(displayObject instanceof DisplayObject, "instanciate");
               
               equal(displayObject.localToGlobal(new Point(0, 0)).x, 0, "localToGlobal() x=0");
               equal(displayObject.localToGlobal(new Point(0, 0)).y, 0, "localToGlobal() y=0");
               
               displayObject.x = 5;
               displayObject.y = 10;
               
               equal(displayObject.localToGlobal(new Point(5, 10)).x, 5, "localToGlobal() x=5");
               equal(displayObject.localToGlobal(new Point(5, 10)).y, 10, "localToGlobal() y=10");
               
               ok(displayObject.getRect(displayObject).equals(new Rectangle(5, 10, 20, 50)), "getRect()");
               
               equal(displayObject.globalToLocal(new Point(5, 10)).x, 5, "globalToLocal() x=5");
               equal(displayObject.globalToLocal(new Point(5, 10)).y, 10, "globalToLocal() y=10");
               
               ok(displayObject.hitTest(new Point(10, 15)), "hitTest(point) ok");
               equal(displayObject.hitTest(new Point(100, 15)), false, "hitTest(point) nok");
               
               var displayObject2 = new DisplayObject();
               displayObject2.width = 2;
               displayObject2.height = 2;
               displayObject2.x = 24;
               displayObject2.y = 59;
               
               ok(displayObject2.hitTest(displayObject), "hitTest(displayObject) ok");
               
               displayObject.y = 90;
               equal(displayObject2.hitTest(displayObject), false, "hitTest(displayObject) nok");
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