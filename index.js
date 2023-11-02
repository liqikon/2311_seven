
gsap.set(".seven", { yPercent: -5});
gsap.to(".seven", {
  yPercent: 0,
  ease: "none",
  scrollTrigger: {
    scrub: 0
  },
});
gsap.set(".bottom", { yPercent: 0});
gsap.to(".bottom", {
  yPercent: -5,
  ease: "none",
  scrollTrigger: {
    scrub: 5
  }
});

// function changeText(element) {
//     if (element.innerHTML === '7') element.innerHTML = 'D';
//    else if (element.innerHTML === 'D') element.innerHTML = 'F';
//     else element.innerHTML = '7';
// }