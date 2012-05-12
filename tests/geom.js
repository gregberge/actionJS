define(["jquery", "qunit"], function($, qunit)
{
   return {
      start : function()
      {
         require(["aj/geom/Point"], function(Point)
         {
            module("geom");
            
            test("aj/geom/Point", function()
            {
               var x = 5,
                   y = 5,
                   point = new Point(x, y);
               ok(point instanceof Point, "instanciate");
               
               equal(point.x, x, "x coord");
               equal(point.y, y, "y coord");
               
               equal(point.length(), 7.0710678118654755, "length()");
               
               var point2X = 10,
                   point2Y = 10,
                   point2 = new Point(point2X, point2Y);
               
               equal(Point.distance(point, point2), 7.0710678118654755, "distance()");
               
               var point3 = point2.add(point);
               
               equal(point3.x, 15, "add() x");
               equal(point3.y, 15, "add() y");
               
               var point4 = point3.clone();
               
               ok(point4.equals(point3), "equals()");
               
               var point5 = Point.interpolate(point, point2, 0.5);
               
               equal(point5.x, 7.5, "interpolate() x");
               equal(point5.y, 7.5, "interpolate() y");
               
               point.offset(2, 3);
               
               equal(point.x, 7, "offset() x");
               equal(point.y, 8, "offset() y");
               
               var point6 = new Point(0, 5),
                   point7 = new Point(5, 0),
                   point8 = new Point(2, 4);
               
               point6.normalize(1);
               point7.normalize(1);
               point8.normalize(2.23);
               
               equal(point6.y, 1, "normalize() x=0");
               equal(point7.x, 1, "normalize() y=0");
               equal(point8.x, 0.9972863179649062, "normalize()");
               
               point8.setTo(2, 3);
               
               equal(point8.x, 2, "setTo() x");
               equal(point8.y, 3, "setTo() y");
               
               var point9 = new Point(1, 1);
               
               var point10 = point8.substract(point9);
               
               equal(point10.x, 1, "substract() x");
               equal(point10.y, 2, "substract() y");
            });
         });
      }
   };
});