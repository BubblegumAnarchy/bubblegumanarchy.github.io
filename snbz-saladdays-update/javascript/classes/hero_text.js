/**
 * 
 * UWE Subnautica Expansion - Hero Text Class
 * Author - hugh@unknownworlds.com
 * 
 */

class HeroText {
    constructor(elementId, margin=0.1, completion=0.5, debug=false) {
        this._element = document.getElementById(elementId);
        this._margin = margin;
        this._completion = completion;
        if (!this._element) { throw Error("Couldn't find hero quote element") }
        const self = this;
        window.addEventListener('scroll', this.draw.bind(self));
        this._hasAppeared = false;
        this._debug = debug;
        return;
    }

    draw() {
        if (this._hasAppeared) { return }
        const elementRect = this._element.getBoundingClientRect();
        const elementBottom = elementRect.bottom;
        const distanceFromBottom = -(elementBottom - window.innerHeight);
        const hasAppearedInView = distanceFromBottom > 0;
        if (!hasAppearedInView) { return }
        const pcFromBottom = distanceFromBottom / window.innerHeight;
        if (this._debug) {
            console.log('Margin: ' + this._margin);
            console.log('% from bottom: ' + pcFromBottom);
        }
        if (pcFromBottom < this._margin) { return }
        const docScroll = document.documentElement.scrollTop;
        const bodyScroll = document.body.scrollTop;
        const currentScroll = docScroll || bodyScroll;
        const scroll = (document.documentElement.scrollTop || document.body.scrollTop);
        const pageY = elementBottom + scroll;
        const currentScrollBottom = currentScroll + window.innerHeight;
        const marginHeight = this._margin * window.innerHeight;
        const scrollRelativeToElement = currentScrollBottom - pageY - marginHeight;
        const topsideHeight = this._completion * window.innerHeight;
        const excludedHeight = marginHeight + topsideHeight;
        const scrollableDistance = window.innerHeight - excludedHeight;
        const scrollFactor = scrollRelativeToElement / scrollableDistance;
        if (scrollFactor < 0) { throw Error('Negative scroll factor!') }
        if (scrollFactor >= 1) {
            this._hasAppeared = true;
            this._element.style.opacity = 1;
            const self = this;
            window.removeEventListener('scroll', this.draw.bind(self));
            return;
        }
        this._element.style.opacity = scrollFactor;
        return;
    }
}