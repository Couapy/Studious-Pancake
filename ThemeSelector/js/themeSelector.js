const toggleSwitch = document.querySelector('.theme-switch-button')
const currentTheme = localStorage.getItem('theme')

/**
 * Switch the theme and save it in the local storage
 */
function switchTheme() {
    if (document.body.dataset.theme == 'light') {
        localStorage.setItem('theme', 'dark')
    }
    else {
        localStorage.setItem('theme', 'light')
    }
    updateTheme()
}

/**
 * Update the theme from localstorage
 */
function updateTheme() {
    let currentTheme = localStorage.getItem('theme')
    let meta_theme = document.querySelector('meta[name="theme-color"]')
    document.body.dataset.theme = currentTheme
    meta_theme.content = getComputedStyle(document.body).getPropertyValue('--color-theme').replace(' ', '')
}

// If there is already selected, apply it
if (currentTheme) {
    updateTheme()
}
toggleSwitch.addEventListener('click', switchTheme, false)