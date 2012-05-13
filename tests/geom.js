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
               
               equal(point.length, 7.0710678118654755, "length");
               
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
               
               point8.x = 2;
               point8.y = 3;
               
               var point9 = new Point(1, 1);
               
               var point10 = point8.substract(point9);
               
               equal(point10.x, 1, "substract() x");
               equal(point10.y, 2, "substract() y");
               
               var point11 = new Point();
               point11.copyFrom(point10);
               
               equal(point11.x, 1, "copyFrom() x");
               equal(point11.y, 2, "copyFrom() y");
            });
         });
         
         require(["aj/geom/Rectangle", "aj/geom/Point"], function(Rectangle, Point)
         {
            test("aj/geom/Rectangle", function()
            {
               var x = 1,
                   y = 2,
                   width = 20,
                   height = 10,
                   rectangle = new Rectangle(x, y, width, height);
               
               ok(rectangle instanceof Rectangle, "instanciate");
               
               equal(rectangle.x, x, "x");
               equal(rectangle.y, y, "y");
               equal(rectangle.width, width, "width");
               equal(rectangle.height, height, "height");
               
               equal(rectangle.bottom, y + height, "bottom");
               equal(rectangle.top, y, "top");
               equal(rectangle.left, x, "left");
               equal(rectangle.right, x + width, "right");
               
               equal(rectangle.topLeft.x, x, "topLeft x");
               equal(rectangle.topLeft.y, y, "topLeft y");
               
               equal(rectangle.bottomRight.x, x + width, "bottomRight x");
               equal(rectangle.bottomRight.y, y + height, "bottomRight y");
               
               equal(rectangle.size.x, width, "size x");
               equal(rectangle.size.y, height, "size y");
               
               var point = new Point(3, 3);
               
               ok(rectangle.contains(3, 3), "contains(x, y) ok");
               
               equal(rectangle.contains(0, 0), false, "contains(x, y) nok");
               
               ok(rectangle.contains(point), "contains(point) ok");
               
               point.x = 0;
               
               equal(rectangle.contains(point), false, "contains(point) nok");
               
               var rectangle2 = new Rectangle(3, 3, 5, 5);
               
               ok(rectangle.contains(rectangle2), "contains(rectangle) ok");
               
               rectangle2.width = 20;
               
               equal(rectangle.contains(rectangle2), false, "contains(rectangle) nok");
               
               var rectangle3 = new Rectangle();
               
               equal(rectangle3.equals(rectangle), false, "equals()");
               
               rectangle3.copyFrom(rectangle);
               
               ok(rectangle3.equals(rectangle), "copyFrom()");
               
               rectangle.inflate(2, 2);
               
               equal(rectangle.x, -1, "inflate(x, y) x");
               
               equal(rectangle.width, 24, "inflate(x, y) width");
               
               rectangle.inflate(new Point(-2, -2));
               
               equal(rectangle.x, 1, "inflate(point) x");
               equal(rectangle.width, 20, "inflate(point) width");
               
               var rect3 = new Rectangle(0, 2, 15, 10),
                   rect4 = new Rectangle(1, 1, 12, 12),
                   rect5 = rect3.intersection(rect4);
               
               equal(rect5.x, 1, "intersection() x");
               equal(rect5.y, 2, "intersection() y");
               equal(rect5.width, 12, "intersection() width");
               equal(rect5.height, 10, "intersection() height");
               
               ok(rect5.intersects(rect3), "intersects() ok");
               ok(rect5.intersects(rect4), "intersects() ok");
               
               rect5.offset(1, 2);
               
               equal(rect5.x, 2, "offset(x, y) x");
               equal(rect5.y, 4, "offset(x, y) y");
               
               rect5.offset(-1, -2);
               rect5.offset(new Point(1, 2));
               
               equal(rect5.x, 2, "offset(point) x");
               equal(rect5.y, 4, "offset(point) y");
               
               var rect6 = new Rectangle(0, 0, 5, 5),
                   rect7 = new Rectangle(-2, -5, 2, 10);
               
               rect6.union(rect7);
               
               equal(rect6.x, -2, "union() x");
               equal(rect6.y, -5, "union() y");
               equal(rect6.width, 7, "union() width");
               equal(rect6.height, 10, "union() height");
            });
         });
      }
   };
});