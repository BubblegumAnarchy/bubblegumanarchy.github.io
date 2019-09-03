/**
 * 
 * UWE Subnautica Expansion - Loading Screen Class
 * Author - hugh@unknownworlds.com
 * 
 */

const LOADING_FADEOUT = 'loading-screen-fadeout';
const LOAD_TIME = 2000;

class LoadingScreen {
    constructor(elementId, timerId, graphId) {
        const element = document.getElementById(elementId);
        if (!element) { throw Error("No load screen element found!") }
        const timer = document.getElementById(timerId);
        if (!timer) { throw Error("No timer found!") }
        this._timer = timer;
        this._element = element;
        this._graph = new ArcGraph(graphId);
        this._start = (new Date()).getTime();
        this._end = this._start + LOAD_TIME;
        this._lastCall = 0;
        const self = this;
        const innerBind = this.animate.bind(self)
        requestAnimationFrame(innerBind);
        return;
    }

    animate(callTime) {
        const self = this;
        const innerBind = this.animate.bind(self)
        if (callTime <= this._lastCall) {
            requestAnimationFrame(innerBind);
            return 
        };
        this._lastCall = callTime;
        const now = (new Date()).getTime();
        const remaining = (this._end - now).toFixed(0);
        if (remaining < 5) { this._close(); return }
        this.drawTimer(remaining);
        const proportionRemaining = remaining / LOAD_TIME;
        const completed = 1 - proportionRemaining;
        this.drawGraph(completed);
        requestAnimationFrame(innerBind);
        return;
    }

    drawGraph(proportion) {
        this._graph.draw(proportion);
        return;
    }

    drawTimer(remaining) {
        const timerString =  ((1 - (remaining / 2000)) * 100).toFixed(0);
        this._timer.innerHTML = timerString + '%';
        return;
    }

    _close() {
        this._graph.draw(1);
        this._timer.innerHTML = '100%';
        const forceScroll = setInterval(() => {
            scroll(0, 0);
            return;
        }, 30);
        this._element.classList.add(LOADING_FADEOUT);
        setTimeout(() => {
            clearInterval(forceScroll);
            this._element.parentElement.removeChild(this._element);
            return;
        }, 900)
        return;
    }
}