let cursor = document.querySelector(".cursor");
let main = document.querySelector(".main");

document.addEventListener("mousemove", function (dets) {
    cursor.style.left = dets.x + "px";
    cursor.style.top = dets.y + "px";
})

let goku = document.getElementById("goku-ui");

goku.addEventListener("mouseenter", function () {
    cursor.innerHTML = "Goku",
        cursor.style.width = "45px",
        cursor.style.height = "25px",
        cursor.style.borderRadius = "55px"

})
goku.addEventListener("mouseleave", function () {
    cursor.innerHTML = "",
        cursor.style.width = "20px",
        cursor.style.height = "20px",
        cursor.style.borderRadius = "50%"
})




function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
init();

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers: true,
        start: "top 30%",
        end: "top 0",
        scrub: 3
    }
})
tl.to(".page1 h1", {
    x: -70
}, "anime")
tl.to(".page1 h2", {
    x: 100
}, "anime")
tl.to(".page1 video", {
    width: "90%"
}, "anime")

let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers: true,
        start: "top -120%",
        end: "top 125%",
        scrub: 3
    }
})

tl2.to(".main", {
    background: "#fff"
})

let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers: true,
        start: "top -360%",
        end: "top -370%",
        scrub: 3
    }
})

tl3.to(".main", {
    background: "#000436"
})

let boxes = document.querySelectorAll(".box");
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        elem.style.background = "rgba(255, 255, 255, 0.1)";
        let att = elem.getAttribute("data-image");
        cursor.style.width = "350px";
        cursor.style.height = "250px";
        cursor.style.backgroundSize = "cover";
        cursor.style.borderRadius = "0";
        cursor.style.backgroundImage = `url(${att})`;
    })
    elem.addEventListener("mouseleave", function(){
        elem.style.background = "transparent";
        let att = elem.getAttribute("data-image");
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.borderRadius = "50%";
        cursor.style.background = "blueviolet";
    })
})

// let nav_h4 = document.querySelectorAll("#nav h4");
// let purple = document.querySelector("#purple");
// nav_h4.forEach(function(val){
//     val.addEventListener("mousemove", function(){
//         purple.style.display = "block";
//         purple.style.opacity = "1";
//     })
//     val.addEventListener("mouseleave", function(){
//         purple.style.display = "none";
//         purple.style.opacity = "0";
//     })
// })