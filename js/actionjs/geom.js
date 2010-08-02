/**
 * Action JS library
 * Event
 * Package managing geometry
 * Classes :
 * - aj.Point
 * @required core.js
 * @author Greg Bergé
 */

/**
 * Point representation
 * @class Represents a point.
 */
aj.Point = Class.extend(
{
    /**
     * Constructor
     * @scope aj.Point
     * @constructor
     * @param [x=0] {number} The abscissa value of the point
     * @param [y=0] {number} The ordinate value of the point
     * @returns {void}
     */
    init : function(x, y)
    {
        /**
         * The abscissa value of the point
         * @type number
         */
        this.x = x;
        if(this.x == null){ this.x = 0; }
        
        /**
         * The ordinate value of the point
         * @type number
         */
        this.y = y;
        if(this.y == null){ this.y = 0; }
    }
});