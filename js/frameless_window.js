var gui = require('nw.gui');
var win = gui.Window.get();
var menu = new gui.Menu();


//=======================================================
// If no previous localStorage data, revert to default   |
//=======================================================
window.onload = function() {
    if (localStorage.win_x !== undefined) {
        window.moveTo(localStorage.win_x, localStorage.win_y);
        window.resizeTo(localStorage.win_width, localStorage.win_height);
    } else {
        window.moveTo(window.screen.width - 265, 0);
        window.resizeTo(270, window.screen.height);
    }

    win.show();
};


//======================
// Create a tray icon   |
//======================
var tray = new gui.Tray({
    title: 'Tray',
    icon: './images/icon.png'
});


//========================
// Give tray icon a menu  |
//========================
menu.append(new gui.MenuItem({
    label: 'Reset App',
    click: function() {
        setTimeout(function() {
            sessionStorage.clear();
            localStorage.clear();
            win.reload();
        }, 1000);
    }
}));

menu.append(new gui.MenuItem({
    label: 'DEV',
    click: function() {
        //var win = gui.Window.get();
        win.showDevTools();
        console.log(win.x);

    }
}));

tray.menu = menu;
menu.append(new gui.MenuItem({
    label: 'Exit',
    click: function() {
        window.close();
    }
}));


//===================================
// Focus Slider on Hover and Click   |
//===================================

tray.on('click', function() {
    win.focus();
});

window.onmouseover = function() {
    win.focus();
};


//=============================
// Save size to localStorage   |
//=============================

window.onresize = function() {
    localStorage.win_width = win.width;
    localStorage.win_height = win.height;
};


//========================================
// Save screen location to localStorage   |
//========================================
win.on('move', function() {
    localStorage.win_x = win.x;
    localStorage.win_y = win.y;
});