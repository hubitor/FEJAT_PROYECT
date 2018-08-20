'use strict';

const Handlebars = require('handlebars');

Handlebars.registerHelper('menu', function(menu, addclass)
{
    let partial;
    if (menu.path) {
        partial = Handlebars.partials['task'];
    } else if (menu.subMenus) {
        if (typeof addclass === 'string') menu.addclass = addclass;
        partial = Handlebars.partials['menu'];
    } else return;
    partial = Handlebars.compile(partial);
    return partial(menu);
});