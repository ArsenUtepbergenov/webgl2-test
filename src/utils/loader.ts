/**
 * The function to load shader text resource
 * @param url url to resource
 */
export async function loadShaderResource(url: RequestInfo) {
  try {
    const response: Response = await fetch(url)

    if (!response.ok ||
        response.status < 200 ||
        response.status > 299)
      throw new Error(`Error: can't load the shader: HTTP status - ${response.status}, on resource - ${url}`)

    const textShader = await response.text()

    return textShader
  } catch (error) {
    console.error(error.message)
  }
}