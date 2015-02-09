# Frameless window

A sample application to showcase how you can use `"frame": false` windows to allow total customization of the window's real state. At beginning, the window is open with no titlebar. As long as you check one of the titlebars, it is added to the appropriate position. Notice that the added titlebars are the only parts of the window that allows dragging. This is achieved through a special CSS property applied to what is draggable or non-draggable (by default, the whole window is not draggable): `-webkit-app-region: drag|no-drag;`

**This demo requires node-webkit >= v0.3.0** 

## Screen shot

![screenshot](http://ww1.sinaimg.cn/large/6556d357tw1dxuhssppffj.jpg)

## APIs

* [Window](https://github.com/rogerwang/node-webkit/wiki/Window)
* [Frameless Window](https://github.com/rogerwang/node-webkit/wiki/Frameless-Window)

