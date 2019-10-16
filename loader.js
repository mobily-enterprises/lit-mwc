
const script1 = window.document.createElement('SCRIPT')
script1.src = 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
const script2 = window.document.createElement('SCRIPT')
script2.src = 'distr/material.js'
const script3 = window.document.createElement('SCRIPT')
script3.src = 'distr/tpe.js'

window.document.head.appendChild(script1)
window.document.head.appendChild(script2)
window.document.head.appendChild(script3)

/*
const script1 = window.document.createElement('SCRIPT')
script1.onload = function () {
  const script2 = window.document.createElement('SCRIPT')
  script2.onload = function () {
    const script3 = window.document.createElement('SCRIPT')
    script3.src = 'distr/tpe.js'
    window.document.head.appendChild(script3)
  }
  script2.src = 'distr/material.js'
  window.document.head.appendChild(script2)
}
script1.src = 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
window.document.head.appendChild(script1)
*/

/* IGNORE WHAT COMES AFTER THIS LINE */

/*
const script1 = window.document.createElement('SCRIPT')
script1.onload = function () {
  const script2 = window.document.createElement('SCRIPT')
  script2.onload = function () {
    const script3 = window.document.createElement('SCRIPT')
    script3.src = './themes/material/material.js'
    script3.type = 'module'
    window.document.head.appendChild(script3)
  }
  script2.src = './tpe.js'
  script2.type = 'module'
  window.document.head.appendChild(script2)
}
script1.src = 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
window.document.head.appendChild(script1)
*/

/*
const script1 = window.document.createElement('SCRIPT')
script1.onload = function () {
  setTimeout(function () {
    const script2 = window.document.createElement('SCRIPT')
    script2.onload = function () {
      setTimeout(function () {
        const script3 = window.document.createElement('SCRIPT')
        script3.src = 'https://unpkg.com/tpe/distr/tpe.js'
        window.document.head.appendChild(script3)
      }, 0)
    }
    script2.src = 'https://unpkg.com/tpe/distr/material.js'
    window.document.head.appendChild(script2)
  }, 0)
}
script1.src = 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
window.document.head.appendChild(script1)
*/
