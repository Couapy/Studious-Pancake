/**
 * @file This file contains the image preview widget
 * @author Maël Marchand
 * @version 1.0
 * @link https://github.com/Couapy/Studious-Pancake
 */

class Viewer {
    
    /**
     * The image
     * @type {HTMLElement}
     */
    image = null
    
    /**
     * The viewer
     * @type {HTMLElement}
     */
    viewer = null
    
    /**
     * The image in the viewer
     * @type {HTMLElement}
     */
    viewer_image = null
    
    /**
     * The close button
     * @type {HTMLElement}
     */
    close_button = null
    
    /**
     * The legend of the image in the viewer
     * @type {HTMLElement}
     */
    legend = null

    /**
     * This object allow to preview images in an overlay
     * @param {HTMLElement} image img HTMLElement you want to preview
     */
    constructor(image) {
        this.image = image
        this.viewer = document.querySelector('.image-preview')
        this.viewer_image = this.viewer.querySelector('img')
        this.close_button = this.viewer.querySelector('.close')
        this.legend = this.viewer.querySelector('.legend')

        // Bind this to methods
        this.show = this.show.bind(this)
        this.close = this.close.bind(this)
    }

    /**
     * Method open the viewer
     */
    show() {
        // Set attribute to image viewer
        this.viewer_image.src = this.image.src
        this.viewer_image.alt = this.image.alt

        this.legend.innerHTML = this.image.alt

        // Show the image preview
        document.body.classList.add('noscroll')
        this.viewer.classList.add('image-preview-open')
        // Set event listener
        this.close_button.addEventListener('click', this.close)
        this.viewer_image.addEventListener('click', this.stopPropagation)
        this.legend.addEventListener('click', this.stopPropagation)
        this.viewer.addEventListener('click', this.close)
    }

    /**
     * This method close the image viewer
     */
    close() {
        // Show the image preview
        this.viewer.classList.add('image-preview-close')
        this.viewer.classList.remove('image-preview-open')
        let callback = (function () {
            document.body.classList.remove('noscroll')
            this.viewer.classList.remove('image-preview-close')
        }).bind(this)
        setTimeout(callback, 400)
        // Remove event listener
        this.close_button.removeEventListener('click', this.close)
        this.viewer_image.removeEventListener('click', this.stopPropagation)
        this.legend.removeEventListener('click', this.stopPropagation)
        this.viewer.removeEventListener('click', this.close)
    }

    /**
     * This method avoid propagation of events
     * @param {Event} e The click event
     */
    stopPropagation(e) {
        e.stopPropagation()
    }

}

(function () {
    let images = document.querySelectorAll("img")
    images.forEach(image => {
        image.addEventListener('click', () => {
            let viewer = new Viewer(image)
            viewer.show()
        })
    })
})()