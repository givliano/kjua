const RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;

// const qr_gen = require('qrcode-generator');
import qr_gen from 'qrcode-generator';

qr_gen.stringToBytes = qr_gen.stringToBytesFuncs['UTF-8'];

const min_qrcode = (text: string, level: ErrorCorrectionLevel, min_ver: TypeNumber = 1) => {
    min_ver = Math.max(1, min_ver) as TypeNumber;

    for (let version = min_ver; version <= 40; version += 1) {
        try {
            const qr = qr_gen(version as TypeNumber, level); 
            qr.addData(text);
            qr.make();
            const module_count = qr.getModuleCount();
            const is_dark = (row: number, col: number) => {
                return row >= 0 &&
                    row < module_count &&
                    col >= 0 &&
                    col < module_count &&
                    qr.isDark(row, col);
            };
            return {text, level, version, module_count, is_dark};
        } catch (err) {
            if (!(version < 40 && RE_CODE_LENGTH_OVERFLOW.test(err))) {
                throw new Error(err);
            }
        }
    }
    return null;
};

export const qrcode = (text: string = '', level: ErrorCorrectionLevel = 'L', min_ver: TypeNumber = 1, quiet: number = 0) => {
    const qr = min_qrcode(text, level, min_ver);
    if (qr) {
        const prev_is_dark = qr.is_dark;
        qr.module_count += 2 * quiet;
        qr.is_dark = (row, col) => prev_is_dark(row - quiet, col - quiet);
    }
    return qr;
};

