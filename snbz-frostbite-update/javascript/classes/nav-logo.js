/**
 * 
 * UWE Subnautica Expansion - Nav Logo Class
 * Author - jess@unknownworlds.com, hugh@unknownworlds.com
 * 
 */

class NavLogo {
    constructor(elementId, primaryLogoId) {
        this._element = document.getElementById(elementId);
        this._primaryLogoElement = document.getElementById(primaryLogoId);
        if (!this._element) { throw Error('nav logo element not found');}
        const self = this;
        this._lastCall = 0;
        window.addEventListener('scroll', this.animate.bind(self));
        this.draw();
    }

    animate(callTime) {
        const self = this;
        const innerBind = this.animate.bind(self);
        if (callTime <= this._lastCall) {
            requestAnimationFrame(innerBind);
            return;
        }
        this.draw();
        return;
    }

    draw() {
        /* Is the primary logo out of view? */
        const primaryRect = this._primaryLogoElement.getBoundingClientRect();
        const primaryBottom = primaryRect.bottom;
        const overlap = (this._primaryLogoElement.clientHeight / 3);
        const threshold = primaryBottom - overlap;
        if (threshold > 0) {
            this._element.style.opacity = 0;
            return;
        }
        const animationDistance = this._element.clientHeight * 2;
        if (-threshold >= animationDistance) {
            this._element.style.opacity = 1;
            return;
        }
        const proportion = -threshold / animationDistance;
        if (proportion > 1) { throw Error('Nav logo proportion > 1') }
        if (proportion < 0) { throw Error('Nav logo proportion < 0') }
        this._element.style.opacity = proportion;
        return;

    }
}