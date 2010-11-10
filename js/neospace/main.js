/**
 * NeoSpace - Main class
 * @author berge
 */
 
if(typeof NS == "undefined")
{
   NS = {};	
}

NS.Main = Class.extend({
	
	/**
	 * Stage
	 * @type aj.Stage
	 */
	stage : null,
	
	/**
	 * Plane
	 * @type NS.Plane
	 */
	plane : null,
	
	/**
	 * Constructor
	 */
	init : function()
	{
		this.stage = new aj.Stage("neospace");
		this.stage.library.addImage("plane", "http://asset1.rentability.com/images/transport/plane.png");
		this.stage.library.addImage("bullet", "http://www.cs.utk.edu/~berry/Bullets/orange-bullet.gif");
		this.stage.library.addImage("meteorite", "http://www.sail.enxt.net/cleanup/Tech/GameMaker/Sprites/Space/meteorite_medium2.png");
		
		this.stage.addEventListener(aj.Event.COMPLETE, $.proxy(this.start, this));
		
		this.stage.load();
		this.stage.showFps = true;
		
		NS.Main.stage = this.stage;
		NS.Main.main = this;
	},
	
	/**
	 * Start
	 */
	start : function()
	{
		this.plane = new NS.Plane();
		this.stage.addChild(this.plane);
		
		setInterval($.proxy(this.addEnnemy, this), 500);
	},
	
	finish : function()
	{
		this.stage.stop();
		alert("Game over");
	},
	
	/**
	 * Add enemy on the scene
	 */
	addEnnemy : function()
	{
		var enemy = new NS.Enemy();
		this.stage.addChild(enemy);
	}
	
});