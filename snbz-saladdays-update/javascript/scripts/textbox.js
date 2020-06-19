/**
 * 
 * UWE Subnautica Expansion - Textbox Script
 * Author - hugh@unknownworlds.com
 * 
 */

function prepareTextboxes() {
    const textboxElements = document.getElementsByClassName(
        ANIMATING_TEXTBOX_CLASS
   );
   let textboxes = Array();
   for (let i = 0; i < textboxElements.length; i++) {
       let box = new AnimatingTextbox(textboxElements[i]);
       textboxes.push(box);
   }
   return textboxes
}

const ANIMATING_TEXTBOXES = prepareTextboxes();


/**
    * 
    * UWE Subnautica Expansion - Textbox Script
    * Author - hugh@unknownworlds.com
    * 
    */

    function prepareRolloverTextboxes() {
    const textboxElements = document.getElementsByClassName(
        ROLLOVER_TEXTBOX_CLASS
    );
    let textboxes = Array();
    for (let i = 0; i < textboxElements.length; i++) {
        let box = new RolloverTextbox(textboxElements[i]);
        textboxes.push(box);
    }
    return textboxes
}

const ROLLOVER_TEXTBOXES = prepareRolloverTextboxes();
