/**
 * Geom test
 */
 
if(typeof ajTu == "undefined")
{
	ajTu = {};	
}

if(typeof ajTu.Geom == "undefined")
{
	ajTu.Geom = {};	
}

/**
 * Start allTest
 */
ajTu.Geom.startAllTest = function()
{
	document.write('---------<br/>Start all geom test<br/>');
	ajTu.Geom.createPoint();
	document.write('Finish geom test<br/>---------<br/>');
};

/**
 * Create Point
 */
ajTu.Geom.createPoint = function()
{
	var pt = new aj.Point(10, 15);
	if(pt.x == 10 && pt.y == 15)
	{
		document.write('* OK createPoint<br/>');
	}
	else
	{
		document.write('* NOK createPoint<br/>');
	}
};