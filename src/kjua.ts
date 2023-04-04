//const defaults = require('./lib/defaults');
import { defaults } from './lib/defaults';
//const qrcode = require('./lib/qrcode');
import { qrcode } from './lib/qrcode';
// const create_canvas_qrcode = require('./lib/create_canvas_qrcode');
import { create_canvas_qrcode } from './lib/create_canvas_qrcode';
// const create_svg_qrcode = require('./lib/create_svg_qrcode');
import { create_svg_qrcode } from './lib/create_svg_qrcode';
import { Settings } from './lib/types';

export const kjua = (options) => {
    const settings = Object.assign({}, defaults, options);
    const qr = qrcode(settings.text, settings.ecLevel, settings.minVersion, settings.quiet);

    if (settings.render === 'svg') {
        return create_svg_qrcode(qr, settings);
    }
    return create_canvas_qrcode(qr, settings, settings.render === 'image');
};


// /* eslint-disable */ try {
//    jQuery.fn.kjua = function (options) {
//        return this.each((idx, el) => el.appendChild(kjua(options)));
//    };
//} catch (e) {} /* eslint-enable */
