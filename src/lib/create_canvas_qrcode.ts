// const dom = require('./dom');
import { dpr, create_canvas, canvas_to_img } from './dom';
// const draw_module_rounded = require('./draw_rounded');
import { draw_module_rounded } from './draw_rounded';
// const draw_mode = require('./draw_mode');
import { draw_mode } from './draw_mode';

import { Ctx, Settings } from './types';


const draw_background = (ctx: Ctx, settings: Settings) => {
    if (settings.back) {
        ctx.fillStyle = settings.back;
        ctx.fillRect!(0, 0, settings.size!, settings.size!);
    }
};

const draw_module_default = (qr, ctx: Ctx, settings: Settings, width: number, row: number, col: number) => {
    if (qr.is_dark(row, col)) {
        ctx.rect!(col * width, row * width, width, width);
    }
};

const draw_modules = (qr, ctx: Ctx, settings: Settings) => {
    if (!qr) {
        return;
    }

    const draw_module = settings.rounded! > 0 && settings.rounded! <= 100 ? draw_module_rounded : draw_module_default;
    const mod_count = qr.module_count;

    let mod_size = settings.size! / mod_count;
    let offset = 0;
    if (settings.crisp) {
        mod_size = Math.floor(mod_size);
        offset = Math.floor((settings.size! - mod_size * mod_count) / 2);
    }

    ctx.translate!(offset, offset);
    ctx.beginPath!();
    for (let row = 0; row < mod_count; row += 1) {
        for (let col = 0; col < mod_count; col += 1) {
            draw_module(qr, ctx, settings, mod_size, row, col);
        }
    }
    ctx.fillStyle = settings.fill;
    ctx.fill!();
    ctx.translate!(-offset, -offset);
};

const draw = (qr, ctx: Ctx, settings: Settings) => {
    draw_background(ctx, settings);
    draw_modules(qr, ctx, settings);
    draw_mode(ctx, settings);
};

export const create_canvas_qrcode = (qr, settings: Settings, as_image: boolean) => {
    const ratio = settings.ratio || dpr || 1;
    const canvas = create_canvas(settings.size!, ratio);
    const context = canvas.getContext('2d') as Ctx;

    if (!context) {
        return;
    }

    context.scale!(ratio, ratio);
    draw(qr, context, settings);
    return as_image ? canvas_to_img(canvas) : canvas;
};
