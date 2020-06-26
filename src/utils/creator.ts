/**
 * The function that creates and compiles a shader
 * @param gl GL rendering context
 * @param type GL type
 * @param source shader source
 */
export function createShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type) as WebGLShader
  try {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (success)
      return shader
    else
      throw new Error(`Error: can't create the shader: ${gl.getShaderInfoLog(shader)}`)
  } catch (error) {
    console.error(error.message)
    gl.deleteShader(shader)
  }
}
/**
 * The function that creates and attaches the shaders to the program
 * @param gl GL rendering context
 * @param vertexShader the vertex shader
 * @param fragmentShader the fragment shader
 */
export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram() as WebGLProgram
  try {
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (success)
      return program
    else
      throw new Error(`Error: can't create the program: ${gl.getProgramInfoLog(program)}`)
  }
  catch (error) {
    console.error(error.message)
    gl.deleteProgram(program)
  }
}