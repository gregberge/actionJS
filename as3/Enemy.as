package NS
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.geom.Point;
	
	public class Enemy extends Sprite
	{
		/**
		 * The speed of the plane
		 */
		private var _speed:Number = 2;
		
		/**
		 * Constructor
		 */
		public function Enemy()
		{
			super();
			
			var img:Bitmap = Main.main.library.getObject("meteorite");
			this.addChild(img);
			
			this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
			this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
		}
		
		/**
		 * Called after added on the stage
		 */
		private function onAddedToStage(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
			this.x = (this.stage.stageWidth - this.width) * Math.random();
		}
		
		/**
		 * Called on enter frame
		 */
		private function onEnterFrame(e:Event):void
		{
			if(!Main.main.gameEnd)
			{
				this.move();
				this.checkColPlane();
				this.checkBullet();
				this.gb();
			}
		}
		
		/**
		 * Check the colision with the plane
		 */
		private function checkColPlane():void
		{
			var testPoint:Point = new Point(this.x + this.width / 2, this.y + this.height / 2);
			if(Main.main.plane.stage != null && Main.main.plane.hitTestPoint(testPoint.x, testPoint.y))
			{
				Main.main.finish();
			}
		}
		
		/**
		 * Check the colision with the bullets
		 */
		private function checkBullet():void
		{
			for(var i:String in Bullet.arBullets)
			{
 				if((Bullet.arBullets[i] as Bullet).hitTestObject(this))
				{
					this.dispose();
					break;
				}
			}
		}
		
		/**
		 * Move
		 */
		private function move():void
		{
			this.y += this._speed;
		}
		
		/**
		 * The garbage collector
		 */
		private function gb():void
		{
			if(this.stage != null)
			{
				if(this.y > this.stage.stageHeight)
				{
					this.dispose();
				}
			}
		}
		
		/**
		 * Remove completely the objet
		 */
		private function dispose():void
		{
			//Remove events
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			
			//Remove object
			this.stage.removeChild(this);
		}
	}
}