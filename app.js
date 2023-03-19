const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function copyToClickboard(text) {
    console.log('hello')
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col,index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')


        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }


        text.textContent = color
        col.style.background = color
        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateColorsHash(colors)
}

function setTextColor(element, color) {
    const luminance = chroma(color).luminance()
    element.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        document.location.hash.substring(1).split('-').map(col => '#' + col)
    }
    return []
}

function alertHint() {
  alert('Нажмите на пробел для обновления страницы')
}
alertHint()
setRandomColors(true)