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
         
         require(["aj/display/DisplayObjectContainer", "aj/display/DisplayObject", "aj/geom/Point", "aj/events/Event", "aj/display/Stage"],
         function(DisplayObjectContainer, DisplayObject, Point, Event, Stage)
         {
            test("aj/display/DisplayObjectContainer", function()
            {
               var doc = new DisplayObjectContainer();
               ok(doc instanceof DisplayObjectContainer, "instanciate");
               
               var child = new DisplayObject();
               child.name = "child1";
               var child2 = new DisplayObject();
               child2.name = "child2";
               
               equal(doc.addChild(child), child, "addChild() return child");
               equal(doc._children[0], child, "addChild() effective");
               
               ok(doc.contains(child), "contains() true");
               equal(doc.contains(child2), false, "contains() false");
               
               equal(doc.addChildAt(child2, 0), child2, "addChildAt() return child");
               equal(doc._children[0], child2, "addChildAt() effective");
               
               equal(doc.getChildAt(2), false, "getChildAt() false");
               equal(doc.getChildAt(1), child, "getChildAt() effective");
               
               equal(doc.getChildIndex(child2), 0, "getChildIndex() effective");
               
               equal(doc.removeChild(child2), child2, "removeChild() return child");
               equal(doc._children[0], child, "removeChild() effective");
               
               equal(doc.removeChildAt(0), child, "removeChildAt() return child");
               equal(doc._children.length, 0, "removeChildAt() effective");
               
               doc.addChild(child);
               
               equal(doc.setChildIndex(child2, 0), false, "setChildIndex() false");
               
               doc.addChild(child2);
               
               equal(doc.setChildIndex(child2, 0), child2, "setChildIndex() return child");
               equal(doc._children[0], child2, "setChildIndex() effective");
               
               doc.swapChildren(child, child2);
               
               equal(doc._children[0], child, "swapChildren() effective");
               
               doc.swapChildrenAt(1, 0);
               
               equal(doc._children[0], child, "swapChildrenAt() effective");
               
               var d1 = new DisplayObject();
               d1._width = 20;
               d1._height = 50;
               
               var pt = new Point(5, 5);
               
               doc.addChild(d1);
               
               var doc2 = new DisplayObjectContainer();
               doc2.addChild(doc);
               
               equal(doc2.getObjectsUnderPoint(pt)[0], d1, "getObjectsUnderPoint effective");
            
               var d1 = new DisplayObject(), d2 = new DisplayObjectContainer();
               var added = false, added_to_stage = false, removed = false, removed_from_stage = false;
               
               d1.addEventListener(Event.ADDED, function(){added = true;});
               d1.addEventListener(Event.ADDED_TO_STAGE, function(){added_to_stage = true;});
               d1.addEventListener(Event.REMOVED, function(){removed = true;});
               d1.addEventListener(Event.REMOVED_FROM_STAGE, function(){removed_from_stage = true;});
               d2.addChild(d1);
               
               ok(added, "event 'added'");
               
               var stage = new Stage(300, 300);
               
               stage.addChild(d2);
               
               ok(added_to_stage, "event 'added_to_stage'");
               
               stage.removeChild(d2);
               
               ok(removed_from_stage, "event 'removed_from_stage'");
               
               d2.removeChild(d1);
               
               ok(removed, "event 'removed'");
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