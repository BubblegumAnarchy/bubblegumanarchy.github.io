/*
    Subnautica Expansion
    Arc Graph
    author: hugh@unknownworlds.com
*/

const ARC_START = Math.PI * 0.50;
const ARC_END = Math.PI * 0.50;
const ARCGRAPH_FULL_TURN = Math.PI * 2 - ARC_START + ARC_END;
const ARC_WIDTH_RATIO = 0.02;
const INNER_RADIUS_RATIO = 0.460;

class ArcGraph {
    /*
        A graph showing percentage completion as a coloured arc of a circle..
    */
    constructor(
        canvas_id,
        fill_colour='lightgrey',
        bg_colour='white',
        canvas_colour='white',
        arc_width_ratio=ARC_WIDTH_RATIO,
        inner_radius_ratio=INNER_RADIUS_RATIO,
    ) {
        if (bg_colour === null) {
            bg_colour = 'lightgrey';
        }
        this._bg_colour = bg_colour;
        this._canvas_colour = canvas_colour;
        this._canvas_id = canvas_id;
        this._canvas = document.getElementById(canvas_id);
        this._inner_radius_ratio = inner_radius_ratio;
        this._arc_width_ratio = arc_width_ratio;
        this._fill_colour = fill_colour;
        this._parent = this._canvas.parentElement;
        this._shouldEndDrawing = false;
        this.draw(0);
        return;
    }

    draw(percentage) {
        /*
            Returns null. Draw the graph on the target canvas to the percentage
            specified.
        */
       if (percentage > 1 || percentage < 0) {
            throw 'Cannot display > 100% / < 0%: ' + percentage;
        }
        var brush = this._canvas.getContext('2d');
        this._prepare_canvas_dimensions(brush);
        this._draw_background(brush);
        this._draw_100pc_arc(brush, this._outer_radius, this._inner_radius);
        var completion_radians = ARC_START + (
            ARCGRAPH_FULL_TURN * percentage
        );
        this._draw_completed_arc(
            brush,
            this._canvas_colour,
            completion_radians
        );
        this._draw_completed_arc(brush, this._fill_colour, completion_radians);
        return;
    }

    _draw_background(brush) {
        /*
            Returns null. Draws a white background the full width and height of
            the canvas.
        */
        brush.fillStyle = this._canvas_colour;
        const height = this._canvas.height * this._scale();
        const width = this._canvas.width * this._scale();
        brush.fillRect(0, 0, width, height);
        return;
    }

    _draw_100pc_arc(brush, outer_radius, inner_radius) {
        /*
            Returns null. Draws a full completion background arc using the
            background colour supplied at instantiation.

            brush
            Supply a canvas 2d context. For example, obtained using
            canvas.getContext('2d')
        */
        brush.beginPath();
        brush.fillStyle = this._bg_colour;
        this._draw_arc(brush, outer_radius);
        this._draw_arc(brush, inner_radius, ARC_END, ARC_START, true);
        brush.closePath();
        brush.fill();
        return;
    }

    _draw_completed_arc(brush, colour, completion_radians){
        /*
            Returns null. Draws a completion arc using the supplied
            colour.
        */
        brush.beginPath();
        brush.fillStyle = colour;
        this._draw_arc(
            brush,
            this._outer_radius,
            ARC_START,
            completion_radians
        );
        this._draw_arc(
            brush,
            this._inner_radius,
            completion_radians,
            ARC_START,
            true
        );
        brush.closePath();
        brush.fill();
        return;
    }

    _draw_arc(
        brush,
        radius,
        start_radians=ARC_START,
        end_radians=ARC_END,
        reverse=false
    ) {
        /*
            Returns null. Draws an arc using the supplied brush and
            parameters.
        */
        brush.arc(
            this._origin_x,
            this._origin_y,
            radius, 
            start_radians, 
            end_radians, 
            reverse);
        return;
    }

    _prepare_canvas_dimensions(context_brush){
        /*
            Returns null. Coerces canvas dimensions to match element dimensions,
            and updates the graph origin.
        */
        const scale = this._scale();
        const start_width = this._parent.clientWidth;
        const start_height = this._parent.clientHeight;
        this._arc_width = this._arc_width_ratio * start_width;
        this._inner_radius = this._inner_radius_ratio * start_width;
        this._outer_radius = this._inner_radius + this._arc_width;
        this._canvas.width = start_width * scale;
        this._canvas.height = start_height * scale;
        this._canvas.style.width = start_width + "px";
        this._canvas.style.height = start_height + "px";
        this._origin_x = this._compute_origin_x(scale);
        this._origin_y = this._compute_origin_y(scale);
        context_brush.scale(scale, scale);
        return;
    }

    _scale() {
        /*
            Returns a number scale value for canvas drawing
        */
       let scale = 1;
       if (window.devicePixelRatio) {
           scale = window.devicePixelRatio;
       }
       return scale;
    }

    _compute_origin_x(scale){
        /*
            Returns an integer representing the x-coordinate of the arc graph
            origin
        */
        return this._canvas.width / 2 / scale;
    }

    _compute_origin_y(scale){
        /*
            Returns an integer representing the y-coordinate of the arc graph
            origin
        */
        return this._canvas.height / 2 / scale;
    }
}