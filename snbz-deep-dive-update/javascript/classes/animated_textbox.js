/**
 * 
 * UWE Subnautica Expansion - Parallax Image Class
 * Author - jess@unknownworlds.com, hugh@unknownworlds.com
 * 
 */
const ANIMATING_TEXTBOX_CLASS = 'textbox-animating';
const ANIMATING_TEXTBOX_IN = 'textbox-animate-in';

class AnimatingTextbox {
    constructor(element) {
        this._element = element;
        if (!this._element) {
            throw Error("Textbox element can't be falsey", element);
        }
        this._hasFadedIn = false;
        const self = this;
        document.addEventListener('scroll', this.animate.bind(self));
        window.addEventListener('resize', this.animate.bind(self));
        return;
    }

    animate() {
        if (this._hasFadedIn) { return; }
        const elementRect = this._element.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;
        const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
        if (!isVisible) { return; }
        const distanceFromBottom = elementBottom - window.innerHeight;
        const margin = -(window.innerHeight - this._element.offsetHeight) / 5;
        if (distanceFromBottom < margin) { this._animateIn(); return; }
        const fallback = this._element.offsetHeight + 50;
        if (window.innerHeight < fallback) { this._animateIn(); return; }
        return;
    }

    _animateIn() {
        this._element.classList.add(ANIMATING_TEXTBOX_IN);
        this._hasFadedIn = true;
        return;
    }

}