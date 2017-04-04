import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Popup from 'react-popup';

//import Analytics from '../imports/ui/App.jsx';

import { renderRoutes } from '../imports/startup/client/routes.js';


Meteor.startup(() => {
    render((
        renderRoutes()
    ), document.getElementById('container'));
    //render(<Analytics />, document.getElementById('container'));
    render(<Popup
        className="mm-popup"
        btnClass="mm-popup__btn"
        closeBtn={true}
        closeHtml={null}
        defaultOk="Ok"
        defaultCancel="Cancel"
        wildClasses={false}
        />, document.getElementById('popupContainer'));
});

//render(renderRoutes(), document.getElementById('render-analytics'));