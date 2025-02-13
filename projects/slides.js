const projects = [
  { src: "image1.png", title: "1 / 5", caption: 'Minimalist <a href="https://jacqueline.dev/pomodoro/">pomodoro timer</a> with a real-time animated gradient built using GLSL shaders.' },
  { src: "image2.png", title: "2 / 5", caption: 'A <a href="https://jacquelinehf-xray-classifier.hf.space/">computer vision chest X-ray classifier</a> with GenAI plain language interpretation.' },
  { src: "image3.png", title: "3 / 5", caption: 'An interactive, <a href="https://jacqueline.dev/volcanoatlas/">3D globe graphic</a> plotting volcanic events from the National Centers for Environmental Information.' },
  { src: "image4.png", title: "4 / 5", caption: 'Discovered a protein family that forms hydrophobic conduits critical for building the bacterial outer membrane, with implications for antibiotic development. <a href="https://www.pnas.org/doi/10.1073/pnas.2015556117">paper</a> / <a href="https://journals.asm.org/doi/10.1128/msphere.00631-23">commentary</a>' },
  { src: "image5.png", title: "5 / 5", caption: 'Article: <a href="https://massivesci.com/articles/internal-clock-circadian-rhythm-jet-lag-sleep-metabolism/">This is how the light from your phone breaks your internal clock</a>.' }
]

const prevTag = document.querySelector("nav a.prev")
const nextTag = document.querySelector("nav a.next")
const descriptionTag = document.querySelector("header div")
const captionTag = document.querySelector("div.canvas-holder .caption")

const canvas = document.querySelector("div.canvas-holder canvas")
const sandbox = new GlslCanvas(canvas)
sandbox.load(frag(projects))

let startIndex = 0
let endIndex = 0
let timeline = performance.now() - 9999

const sizer = function () {
  const ww = window.innerWidth
  const wh = window.innerHeight
  const s = Math.min(ww, wh)
  const dpi = window.devicePixelRatio

  canvas.width = s * 0.9 * dpi
  canvas.height = s * 0.6 * dpi
  canvas.style.width = Math.round(s * 0.9) + "px"
  canvas.style.height = Math.round(s * 0.6) + "px"
}

const next = function () {
  endIndex = endIndex + 1

  if (endIndex > projects.length - 1) {
    endIndex = 0
  }

  update()
}

const prev = function () {
  endIndex = endIndex - 1

  if (endIndex < 0) {
    endIndex = projects.length - 1
  }

  update()
}

const update = function () {
  descriptionTag.innerHTML = projects[endIndex].title
  captionTag.innerHTML = projects[endIndex].caption
  timeline = performance.now()

  sandbox.setUniform("startIndex", startIndex)
  sandbox.setUniform("endIndex", endIndex)
  tick()

  startIndex = endIndex
}

const tick = function () {
  const diff = (performance.now() - timeline) / 1000
  sandbox.setUniform("timeline", diff)
  requestAnimationFrame(tick)
}

const load = function () {
  sizer()
  tick()

  projects.forEach((project, index) => {
    sandbox.setUniform(`textures[${index}]`, project.src)
  })
}

load()

nextTag.addEventListener("click", function (event) {
  event.preventDefault()
  next()
})

prevTag.addEventListener("click", function (event) {
  event.preventDefault()
  prev()
})

window.addEventListener("resize", function () {
  sizer()
})
