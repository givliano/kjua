export interface Ctx {
  p?: string,
  o?: number,
  m?: (x: number, y: number) => Ctx,
  l?: (x: number, y: number) => Ctx, 
  a?: (x: number, y: number, rad: number, foo?: any, bar?: any) => Ctx ,
  fillStyle?: string,
  fillRect?: (x: number, y: number, width: number, height: number) => void,
  rect?: (x: number, y: number, width: number, height: number) => void,
  translate?: (x: number, y: number) => void,
  beginPath?: () => void,
  fill?: () => void, 
  strokeStyle?: string,
  lineWidth?: number,
  font?: string,
  measureText?: (a: any) => any,
  strokeText?: (text: string, x: number, y: number) => void,
  fillText?: (text: string, x: number, y: number) => void,
  drawImage?: (image: any, x: number, y: number, iWidth: number, iHeight: number) => void,
  moveTo?: (x: number, y: number) => void,
  lineTo?: (x: number, y: number) => void,
  arcTo?: (x1: number, y1: number, x2: number, y2: number, radius: number) => void,
  scale?: (x: number, y: number) => void
}

export interface Settings {
  // render method: 'canvas', 'image' or 'svg'
  render?: string,

  // render pixel-perfect lines
  crisp?: boolean,

  // minimum version: 1..40
  minVersion?: number,

  // error correction level: 'L', 'M', 'Q' or 'H'
  ecLevel?: string,

  // size in pixel
  size?: number,

  // pixel-ratio, null for devicePixelRatio
  ratio?: number,

  // code color
  fill?: string,

  // background color
  back?: string,

  // content
  text?: string,

  // roundend corners in pc?: 0..100
  rounded?: number,

  // quiet zone in modules
  quiet?: number,

  // modes?: 'plain', 'label' or 'image'
  mode?: string,

  // label/image size and pos in pc?: 0..100
  mSize?: number,
  mPosX?: number,
  mPosY?: number,

  // label
  label?: string,
  fontname?: string,
  fontcolor?: string,

  // image element
  image?: any
}
