// const dom = require('./dom');
import { dom } from './dom';
// const draw_module_rounded = require('./draw_rounded');
import { draw_module_rounded } from './draw_rounded';
// const draw_mode = require('./draw_mode');
import { draw_mode } from './draw_mode';

interface Settings {
  // render method: 'canvas', 'image' or 'svg'
  render?: string,

  // render pixel-perfect lines
  crisp?: boolean,

  // minimum version: 1..40
  minVersion?: number,

  // error correction level: 'L', 'M', 'Q' or 'H'
  ecLevel?: string,

  // size in pixel
  size: number,

  // pixel-ratio, null for devicePixelRatio
  ratio?: number,

  // code color
  fill: string,

  // background color
  back: string,

  // content
  text?: string,

  // roundend corners in pc?: 0..100
  rounded: number,

  // quiet zone in modules
  quiet?: number,

  // modes?: 'plain', 'label' or 'image'
  mode: string,

  // label/image size and pos in pc?: 0..100
  mSize: number,
  mPosX: number,
  mPosY: number,

  // label
  label: string,
  fontname: string,
  fontcolor: string,

  // image element
  image: any
}

const draw_background = (ctx: CanvasRenderingContext2D, settings: Settings) => {
    if (settings.back) {
        ctx.fillStyle = settings.back;
        ctx.fillRect(0, 0, settings.size, settings.size);
    }
};

const draw_module_default = (qr, ctx: CanvasRenderingContext2D, settings: Settings, width: number, row: number, col: number) => {
    if (qr.is_dark(row, col)) {
        ctx.rect(col * width, row * width, width, width);
    }
};

const draw_modules = (qr, ctx: CanvasRenderingContext2D, settings: Settings) => {
    if (!qr) {
        return;
    }

    const draw_module = settings.rounded > 0 && settings.rounded <= 100 ? draw_module_rounded : draw_module_default;
    const mod_count = qr.module_count;

    let mod_size = settings.size / mod_count;
    let offset = 0;
    if (settings.crisp) {
        mod_size = Math.floor(mod_size);
        offset = Math.floor((settings.size - mod_size * mod_count) / 2);
    }

    ctx.translate(offset, offset);
    ctx.beginPath();
    for (let row = 0; row < mod_count; row += 1) {
        for (let col = 0; col < mod_count; col += 1) {
            draw_module(qr, ctx, settings, mod_size, row, col);
        }
    }
    ctx.fillStyle = settings.fill;
    ctx.fill();
    ctx.translate(-offset, -offset);
};

const draw = (qr, ctx: CanvasRenderingContext2D, settings: Settings) => {
    draw_background(ctx, settings);
    draw_modules(qr, ctx, settings);
    draw_mode(ctx, settings);
};

export const create_canvas_qrcode = (qr, settings: Settings, as_image: boolean) => {
    const ratio = settings.ratio || dom.dpr || 1;
    const canvas = dom.create_canvas(settings.size, ratio);
    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    context.scale(ratio, ratio);
    draw(qr, context, settings);
    return as_image ? dom.canvas_to_img(canvas) : canvas;
};
