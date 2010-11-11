package NS
{
	import flash.display.Bitmap;
	import flash.display.Loader;
	import flash.display.Sprite;
	import flash.events.Event;
	
	public class Bullet extends Sprite
	{
		
		/**
		 * The speed of the plane
		 */
		private var _speed:Number = 8;
		
		/**
		 * Bullets
		 */
		public static var arBullets:Array = new Array();
		
		/**
		 * Constructor
		 */
		public function Bullet(x:int, y:int)
		{
			super();
			var img:Bitmap = Main.main.library.getObject("bullet");
			this.addChild(img);
			
			this.x = x;
			this.y = y;
			
			this.width = 5;
			this.height = 5;
			
			this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			
			NS.Bullet.arBullets.push(this);
		}
		
		/**
		 * Called on enter frame
		 */
		private function onEnterFrame(e:Event):void
		{
			this.y -= this._speed;
			
			this.gb();
		}
		
		/**
		 * Garbage collector
		 */
		private function gb():void
		{
			if(this.y < this.height)
			{
				this.dispose();
			}
		}
		
		/**
		 * Remove completely the object
		 */
		private function dispose():void
		{
			//Remove events
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			
			//Remove object
			this.stage.removeChild(this);
			
			for(var i:String in Bullet.arBullets)
			{
				if(Bullet.arBullets[i] == this)
				{
					Bullet.arBullets.splice(i, 1);
				}
			}
		}
		
	}
}