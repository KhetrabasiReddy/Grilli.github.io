'use strict';
/**
 * 
 *   preload 
 * 
 *  loading will be end after document is loaded
 */

const preloader = document.querySelector('[data-preload]');
window.addEventListener('load', function (){
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
});


/**
 * add event listener on multiple elements
 */

const addEventOnElements = function(elements, eventType,callback){
    for(let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType,callback);
    }
}


/**
 * 
 * navbar
 */
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = function(){
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
}
addEventOnElements(navTogglers,'click',toggleNavbar);


// header
const header = document.querySelector('[data-header]');
let lastScrollPos = 0;
const hideHeader = function(){
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add('hide');
    }else{
        header.classList.remove('hide');
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener('scroll',function(){
if(window.scrollY >= 50){
    header.classList.add('active');
    hideHeader();
}else{
    header.classList.remove('active');
}
});

/**
 * hero slider
 */
const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItem = document.querySelectorAll('[data-hero-slider-item]');

const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');

const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItem[0];

const updateSliderPos = function(){
    lastActiveSliderItem.classList.remove('active');
    heroSliderItem[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItem[currentSlidePos];

}
const slideNext = function(){
    if (currentSlidePos >= heroSliderItem.length -1){
        currentSlidePos = 0;
    }else{
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener('click',slideNext);

const slidePrev = function(){
    if(currentSlidePos <= 0){
        currentSlidePos = heroSliderItem.length - 1;
    }else{
        currentSlidePos--;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener('click',slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;
const autoSlide = function(){
    autoSlideInterval = setInterval(function (){
        slideNext();
    },7000);
}


addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseover",function(){
    clearInterval(autoSlideInterval);
});


addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseout",autoSlide);

window.addEventListener('load',autoSlide);































