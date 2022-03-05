export const preload = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })

export const preloadAll = (srcs: string[]) => Promise.all(srcs.map(preload))
