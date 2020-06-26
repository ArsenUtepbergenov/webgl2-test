import { loadShaderResource } from './utils/loader'
import { createShader, createProgram } from './utils/creator'

import { SHADER } from 'enums'

let vertexShader: WebGLShader
let fragmentShader: WebGLShader

async function loadShaders(gl: WebGL2RenderingContext): Promise<void> {
  const [vertexShaderSource, fragmentShaderSource] = [await loadShaderResource(SHADER.VERTEX_SOURCE), await loadShaderResource(SHADER.FRAGMENT_SOURCE)]
  vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
}

async function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2')

  if (!gl) {
    console.info('Your browser does not support WebGL 2')
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', () => resizeCanvas(canvas, gl), false)

  await loadShaders(gl)
  if (vertexShader && fragmentShader)
    console.log(createProgram(gl, vertexShader, fragmentShader))
}

function resizeCanvas(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl.viewport(0, 0, canvas.width, canvas.height)
}

main()