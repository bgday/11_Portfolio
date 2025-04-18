const curYear = new Date();
document.querySelector("#year").textContent = curYear.getFullYear();

// get me a list of all the items to watch
const myListOfItems = document.querySelectorAll('section')

// a comma deliniated list of name/value pairs controlling how the observer works
let observerOptions = {
    //null is the default and references the viewport
    root: null,
    //alters the viewport. negative values decrease the size.
    rootMargin: '0px 0px 0px 0px',
    //0 is barely showing, 1 is fully showing
    threshold: 0.25
  }

// AllItems is a list of all elements being watched
const myObserver = new IntersectionObserver(allItems => {
    allItems.forEach(singleItem => {
        if (singleItem.isIntersecting){
            hiliteNav(singleItem.target)
        }
    })
}, observerOptions)

// function to hilight the current navigation items
function hiliteNav(x) {
	document.querySelector('.active').classList.remove('active');
	let theid = x.getAttribute('id');
	let newActiveLink = document.querySelector(`[href="#${theid}"]`)
	newActiveLink.parentElement.classList.add('active');
}

//call the function for each element in the list
myListOfItems.forEach(item => {
    myObserver.observe(item)
});

// Disable smooth scroll on load
window.addEventListener("load", () => {
    const html = document.documentElement;
  
    // Temporarily disable smooth scroll
    html.style.scrollBehavior = "auto";
  
    // Force re-scroll to the hash manually (in case it hasn't landed)
    if (window.location.hash) {
      const id = window.location.hash;
      const el = document.querySelector(id);
      if (el) el.scrollIntoView(); // Jump without animation
    }
  
    // Re-enable smooth scroll after a tick
    setTimeout(() => {
      html.style.scrollBehavior = "smooth";
    }, 50); // tweak delay if needed
  });