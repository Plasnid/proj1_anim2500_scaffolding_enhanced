gsap.registerPlugin(ScrollToPlugin);
let navOffset = document.querySelector("nav").offsetHeight+10;
console.log(navOffset);

// * create a list of sections for later use
let mySections = document.querySelectorAll("main>section");
console.log(mySections);

// * ensure that when landing on the page that the first section is active
let activeSection  = document.querySelector("nav>a:nth-child(1)");
console.log(activeSection);
activeSection.classList.add("active");

// * update the initial scroll to take the page to 0
gsap.to(window,
    {scrollTo:{y:0}, duration:.1, ease:"power2.inOut"}
);

window.addEventListener("scroll", scrollAction);

function scrollAction(e){
    //console.log("I have been scrolled");
    mySections.forEach(sect => {
        //console.log(sect);
        // *find the position of the section
        let secTopPos = sect.offsetTop-navOffset;
        let secBottomPos = secTopPos+sect.offsetHeight;
        let windowPos = window.scrollY;
        //console.log(secTopPos, secBottomPos, window.scrollY);
        // * find out what section you are looking at in the loop
        let secID = sect.getAttribute("id");
        //* find out what nav element is connected to it
        let navEl = document.querySelector(`nav a[href='#${secID}']`);
        //console.log(navEl);
        //console.log(`Section ${secID} -> top: ${secTopPos} bottom: ${secBottomPos}`);
        // *check what section is currently visible in the viewport
        if (windowPos >=secTopPos && windowPos<secBottomPos){
            console.log(secID, " is active");
            navEl.classList.add("active");
        }else{
            navEl.classList.remove("active");
        }
    })
}

let navElements = document.querySelectorAll("nav a[href^='#']");
navElements.forEach(el => el.addEventListener("click", navClickAction));

function navClickAction(e){
    e.preventDefault();
    let hrefAttr = e.target.getAttribute("href");
    console.log(document.querySelector(hrefAttr).offsetTop);
    let scrollToVal =document.querySelector(hrefAttr).offsetTop -navOffset;
    gsap.to(window, 
        {scrollTo:{y: scrollToVal}, duration: 1, ease:"circ.out"}
    );
}
