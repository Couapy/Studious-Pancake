const buttons = document.querySelectorAll('.menu-button')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active')
    })
})