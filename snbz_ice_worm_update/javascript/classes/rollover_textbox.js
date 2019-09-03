 /**
* 
* UWE Subnautica Expansion - Rollover Textbox Class
* Author - jess@unknownworlds.com
* 
*/
const ROLLOVER_TEXTBOX_CLASS = 'textbox-rollover';
const ROLLOVER_TEXTBOX_IN = 'textbox-rollover-in';

class RolloverTextbox {
    constructor(element) {
        this._element = element;
        if (!this._element) {
            throw Error("Textbox element can't be falsey", element);
        }
        this._hasFadedIn = false;
        const self = this;
        document.addEventListener('onmouseover', this.rollover.bind(self));
        return;
    }

    rollover() {
        this._rolloverIn(); return;
    }

    _rolloverIn() {
        this._element.classList.add(ROLLOVER_TEXTBOX_IN);
        this._hasFadedIn = true;
        return;
    }

}