/**
 * Action JS library
 * Key
 * Package managing keyboard
 * Classes :
 * - aj.Key
 * @required core.js
 * @author Greg Bergé
 */

/**
 * Key
 * @class Represents the key, manage keyboard events.
 */
aj.Key = Class.extend(
{
    /**
     * Constructor
     * @param {aj.Stage} stage
     */
    init : function(stage)
    {
		if(aj.Key._currentInstance === null)
		{
			aj.Key._currentInstance = this;
		}
		
        this.keysDown = [];
        this.stage = stage;

		this.stage.jqEl.focusin($.proxy(this.onFocusIn, this));
		this.stage.jqEl.focusout($.proxy(this.onFocusOut, this));
		document.onkeydown = jQuery.proxy(this.keyDownListener, this);
        document.onkeyup = jQuery.proxy(this.keyUpListener, this);
    },

	onFocusIn : function()
	{
		document.onkeydown = jQuery.proxy(this.keyDownListener, this);
        document.onkeyup = jQuery.proxy(this.keyUpListener, this);
	},
	
	onFocusOut : function()
	{
		document.onkeydown = null;
        document.onkeyup = null;
	},
    
    /**
     * The listener of the event onkeydown
     * @private
     * @event
     * @param {event} event The event
     * @returns {boolean} false to stop propagation
     */
    keyDownListener : function(event)
    {
        event.preventDefault();
        
        if(this.isUp(event.keyCode))
        {
            this.keysDown.push(event.keyCode);
            
            var keyEvent = new aj.KeyboardEvent(aj.KeyboardEvent.KEY_DOWN);
            keyEvent.keyCode = event.keyCode;
            this.stage.dispatchEvent(keyEvent);
        }
        
        return false;
    },
    
    /**
     * The listener of the event onkeyup
     * @private
     * @event
     * @param {event} event The event
     * @returns {boolean} false to stop propagation
     */
    keyUpListener : function(event)
    {   
		event.preventDefault();
		
        for(var i=0, il=this.keysDown.length; i<il; i++)
        {
            if(this.keysDown[i] == event.keyCode)
            {
                this.keysDown.splice(i, 1);
                
                var keyEvent = new aj.KeyboardEvent(aj.KeyboardEvent.KEY_UP);
                keyEvent.keyCode = event.keyCode;
                this.stage.dispatchEvent(keyEvent);
            }
        }
        
        return false;
    },
    
    /**
     * Check if a key is down
     * @public
     * @param {integer} keyCode Key code to test
     * @returns {boolean} true if the key is down, else false
     */
    isDown : function(keyCode)
    {
        for(var i=0, il=this.keysDown.length; i<il; i++)
        {
            if(this.keysDown[i] == keyCode)
            {
                return true;
            }
        }
        
        return false;
    },
    
    /**
     * Check if a key is up
     * @public
     * @param {integer} keyCode Key code to test
     * @returns {boolean} true if the key is up, else false
     */
    isUp : function(keyCode)
    {
        var exist = false;
        
        for(var i=0, il=this.keysDown.length; i<il; i++)
        {
            if(this.keysDown[i] == keyCode)
            {
                exist = true;
            }
        }
        
        return !exist;
    }
});

/**
 * Current instance
 * @private
 * @static
 * @type aj.Key
 */
aj.Key._currentInstance = null;

/**
 * Return the current instance
 * @public
 * @static
 * @returns {aj.Key}
 */
aj.Key.getCurrentInstance = function()
{	
	return aj.Key._currentInstance;
};

/**
 * The left key code
 * @static
 * @type integer
 */
aj.Key.LEFT = 37;

/**
 * The up key code
 * @static
 * @public
 * @type integer
 */
aj.Key.UP = 38;

/**
 * The right key code
 * @static
 * @public
 * @type integer
 */
aj.Key.RIGHT = 39;

/**
 * The down key code
 * @static
 * @public
 * @type integer
 */
aj.Key.DOWN = 40;

/**
 * The space key code
 * @static
 * @public
 * @type integer
 */
aj.Key.SPACE = 32;