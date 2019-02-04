function debounce(func, wait=20, immediate = true) { // time in seconds "wait" to how many in seconds to catch the event
let timeout;                                // debounce is good for the events like scroll for performance
return function(){
    let context = this, args=arguments; 
    // arguments is Array-like object waccessible inside the function, contains the values /
    //of the argmnts passed . since it is array-like, it has length property, properties indexed from zero but 
    //it doesnt have array methods like map or loops like forEach
    let later= function(){
        timeout=null;
        if(!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
    };
};
const slider = document.querySelectorAll('.slide-in');

function checkSlide(e){ // function for every single image
   // console.log(e)
   //console.log(window.scrollY)  -----let us know which point how many pixels of the scrolling we did from the top. 
   slider.forEach(slide => {
                                // half way image
       const slideInAt = (window.scrollY + window.innerHeight) - slide.height / 2;
             // to know how close/far we are to the bottom we need to convert scrollY here
             //slider.height is going to allow us to slide image when we are at the very bottom and we divide it by 2 
             // will slide in when we are at the half way
             //console.log(slideInAt);


             //bottom of the image
    const imageBottom = slide.offsetTop +slide.height      //offsetTop says us how far is the top of them image from the top of window
    // we need this variable to see when the image bottom is, that is why we add slider to offset and the reason is 
    //when we scroll back to up image has to know when to slide in when we are coming from the bottom as well as 
    //when to slide out when we are at the end.

    const halfShown = slideInAt > slide.offsetTop;
    const isNotPassed = window.scrollY < imageBottom;
    if (halfShown && isNotPassed) { //if image is halfshown and is not passed scrolled
        slide.classList.add('active'); //add the class active
    } else {
        slide.classList.remove('active')
    }
   })
}

window.addEventListener('scroll', debounce(checkSlide)); // changed the wait time to half a second