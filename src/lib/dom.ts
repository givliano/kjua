const win = window || {
  document: null,
  devicePixelRatio: 1
}; // eslint-disable-line no-undef
const doc = win.document;
export const dpr = win.devicePixelRatio;

export const SVG_NS = 'http://www.w3.org/2000/svg';

interface HTMLElementOpt {
    width: number | string | null;
    height: number | string | null;
    crossOrigin?: string;
    src?: string;
    toDataURL?: string;
}

interface SVGElementOpt {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    d?: string;
    href?: string;
    xmlns?: string;
    viewBox?: string;
}

export const get_attr = (el: HTMLElement | SVGElement, key: string): string | null => el.getAttribute(key);

const set_attrs = (el: HTMLCanvasElement | HTMLElement | SVGElement, obj: HTMLElementOpt | SVGElementOpt): HTMLCanvasElement | HTMLElement | SVGElement => {
    Object.keys(obj || {}).forEach(key => {
        el.setAttribute(key, obj[key]);
    });
    return el;
};

export const create_el = (name: string, obj: HTMLElementOpt) => {
    return set_attrs(doc.createElement(name), obj);
}

export const create_svg_el = (name: string, obj: SVGElementOpt) => {
    return set_attrs(doc.createElementNS(SVG_NS, name), obj);
}

export const create_canvas = (size: number, ratio: number): HTMLCanvasElement => {
    const canvas = create_el('canvas', {
        width: size * ratio,
        height: size * ratio
    });
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    return canvas as HTMLCanvasElement;
};

export const canvas_to_img = (canvas: HTMLCanvasElement) => {
    const img = create_el('img', {
        crossOrigin: 'anonymous',
        src: canvas.toDataURL('image/png'),
        width: get_attr(canvas, 'width'),
        height: get_attr(canvas, 'height')
    });
    img.style.width = canvas.style.width;
    img.style.height = canvas.style.height;
    return img;
};

