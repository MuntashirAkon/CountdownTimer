"use strict";

let idleTime = 0;
$(document).ready(function () {
    setInterval(timerIncrement, 1000);
    $(this).mousemove(function (e) {
        idleTime = 0;
        $('#btn_group').fadeIn(500);
    });
    $(this).keypress(function (e) {
        switch (e.which){
            case 13: // Enter
            case 32: // Space
                if(Timer.stop) Timer.start();
                else Timer.reset();
                break;
            default:
            //
        }
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 3) {
        $('#btn_group').fadeOut(500);
    }
}

const Timer = {
    MINUTE: null, // Initial minutes
    SECOND: null, // Initial seconds
    S_MIN: null,  // Minute selector
    S_SEC: null,  // Second selector
    c_min: null,  // Current minutes
    c_sec: null,  // Current seconds
    l_sec: null,  // Last REAL second
    stop: true,
    start: function () {
        // Init
        $('#min, #sec').blur();
        this.blink.off();
        this.S_MIN = $('#min');
        this.S_SEC = $('#sec');
        this.c_min = this.MINUTE = this.S_MIN.val() | 0;
        this.c_sec = this.SECOND = this.S_SEC.val() | 0;
        this.l_sec = -1;
        this.S_MIN.val(this.addZero(this.MINUTE));
        this.S_SEC.val(this.addZero(this.SECOND));
        this.stop = false;
        // Start countdown
        this.blink.sel = $('#divider');
        this.countdown();
    },
    reset: function () {
        this.stop = true;
        this.blink.off();
        this.S_MIN.val(this.addZero(this.MINUTE));
        this.S_SEC.val(this.addZero(this.SECOND));
        Timer.blink.sel.css('visibility', 'visible');
    },
    countdown: function () {
        if(Timer.stop) return;
        let s = (new Date()).getSeconds();
        if(s !== Timer.l_sec){
            Timer.l_sec = s;
            --Timer.c_sec;
            if(Timer.c_sec === 0) {
                if(Timer.c_min > 0) {
                    Timer.c_sec = 60;
                    Timer.S_MIN.val(Timer.addZero(--Timer.c_min));
                }
            }
            Timer.S_SEC.val(Timer.addZero(Timer.c_sec));
        }
        if(Timer.c_sec !== 0) {
            setTimeout(Timer.countdown, 500);
            Timer.blink.do_blink();
        } else {
            // Blink
            Timer.blink.off();
            Timer.blink.on($('#min, #sec'));
        }
    },
    blink: {
        blinking: false,
        sel: null,
        on: function (sel) {
            this.blinking = true;
            this.sel = sel;
            this.blink();
        },
        off: function () {
            this.blinking = false;
        },
        blink: function () {
            if(Timer.blink.blinking)
                setTimeout(Timer.blink.blink, 700);
            else{
                Timer.blink.sel.css('visibility', 'visible');
                return;
            }
            Timer.blink.do_blink();
        },
        do_blink: function () {
            Timer.blink.sel.css('visibility', Timer.blink.sel.css('visibility') === 'visible' ? 'hidden' : 'visible');
        }
    },
    addZero: function (i) { return (i < 10) ? ("0" + i) : i; }
};
