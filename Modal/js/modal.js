/**
 * @file This file contains the modal widget
 * @author Maël Marchand
 * @version 1.0
 */

class Modal {

    /**
     * The modal
     * 
     * @type {HTMLElement} 
     */
    modal = null

    /**
     * The dialog box of modal
     * @type {HTMLElement}
     */
    dialog_box = null

    /**
     * The close button HTML element
     * 
     * @type {HTMLElement} 
     */
    close_button = null

    /**
     * The cancel button HTML element
     * 
     * @type {HTMLElement} 
     */
    cancel_button = null

    /**
     * The submit button HTML element
     * 
     * @type {HTMLElement} 
     */
    validate_button = null

    /**
     * Contains the callback for custom cancel behavior
     * @type {Function}
     */
    cancelCallback = function () {}

    /**
     * Contains the callback for custom submit behavior
     * @type {Function}
     */
    submitCallback = function () {}

    /**
     * Contains the callback for custom close behavior
     * @type {Function}
     */
    closeCallback = function () {}

    /**
     * This object handle a modal dialog
     * 
     * Following callback are availables : cancelCallback, submitCallback, closeCallback
     * 
     * @param {HTMLElement} modal HTML element of modal .modal
     * @param {object} args A dictionnary containing callbacks
     */
    constructor(modal, args={}) {
        this.modal = modal
        this.close_button = modal.querySelector('.close')
        this.dialog_box = modal.querySelector('.modal-dialog')
        this.cancel_button = modal.querySelector('.cancel')
        this.validate_button = modal.querySelector('.validate')
        this.cancelCallback = function() {}
        this.submitCallback = function() {}
        this.closeCallback = function() {}

        if ('cancelCallback' in args) {
            this.cancelCallback = args['cancelCallback'].bind(this)
        }
        if ('submitCallback' in args) {
            this.submitCallback = args['submitCallback'].bind(this)
        }
        if ('closeCallback' in args) {
            this.closeCallback = args['closeCallback'].bind(this)
        }

        this.show = this.show.bind(this)
        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)
        this.submit = this.submit.bind(this)
    }

    /**
     * This method display the modal
     */
    show() {
        // Show the modal
        this.modal.classList.add('modal-open')
        // Set event listeners
        this.close_button.addEventListener('click', this.close)
        this.cancel_button.addEventListener('click', this.cancel)
        this.validate_button.addEventListener('click', this.submit)
        this.modal.addEventListener('click', this.close)
        this.dialog_box.addEventListener('click', this.stopPropagation)
    }
    
    /**
     * This method close the modal
     */
    close() {
        this.closeCallback()
        // Hide the modal
        this.modal.classList.add('modal-closed')
        this.modal.classList.remove('modal-open')
        let callback = (function () {
            this.modal.classList.remove('modal-closed')
        }).bind(this)
        setTimeout(callback, 500)
        // Remove event listeners
        this.close_button.removeEventListener('click', this.close)
        this.cancel_button.removeEventListener('click', this.cancel)
        this.validate_button.removeEventListener('click', this.submit)
        this.modal.removeEventListener('click', this.close)
        this.dialog_box.removeEventListener('click', this.stopPropagation)
    }    

    /**
     * This method execute the cancel button behavior
     */
    cancel() {
        this.cancelCallback()
        this.close()
    }

    /**
     * This method execute the submit button behavior
     */
    submit() {
        this.submitCallback()
        this.close()
    }

    /**
     * This method avoid propagation of events
     * @param {Event} e The click event
     */
    stopPropagation(e) {
        e.stopPropagation()
    }

}

(
    /**
     * Main function for modals elements
     *
     * Add listeners on buttons "[data-modal]"
     */
    function() {
        let buttons = document.querySelectorAll('[data-modal]')

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                let modal_element = document.getElementById(this.dataset.modal)
                let modal = new Modal(
                    modal_element,
                    {
                        'cancelCallback': function () {
                            console.log('CANCEL');
                        },
                        'submitCallback': function () {
                            console.log('SUBMIT');
                        }
                    }
                )
                modal.show()
            })
        })
    }
)()
