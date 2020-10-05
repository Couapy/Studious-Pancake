"use strict";

window.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.slider');
  var slide = slider.querySelector('.slide');
  var animation = false;

  function scrollhandler(event) {
    if (animation == false) {
      var previous_slide = slide;
      var sliding = '';

      if (event.deltaY > 0 || event.deltaX > 0) {
        slide = slide.nextElementSibling;
        sliding = 'left';

        if (slide === null) {
          slide = previous_slide.parentElement.firstElementChild;
        }
      } else {
        slide = slide.previousElementSibling;
        sliding = 'right';

        if (slide === null) {
          slide = previous_slide.parentElement.lastElementChild;
        }
      }

      if (slide !== null) {
        previous_slide.classList.remove('active');
        previous_slide.classList.add('sliding-' + sliding);
      }

      slide.classList.add('active');
      animation = true;
      setTimeout(function () {
        animation = false;
        previous_slide.classList.remove('active');
        previous_slide.classList.remove('sliding-' + sliding);
      }, 1100);
    }
  }

  window.addEventListener('mousewheel', scrollhandler);
});