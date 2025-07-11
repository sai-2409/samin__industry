// Connecting GSAP Plugin "SplitText"
gsap.registerPlugin(SplitText);

function logoJumping() {
  const logotypeSamin = document.querySelector(".header__logo");

  gsap.to(logotypeSamin, {
    y: 20,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}
logoJumping();

// function addingItemToCartAnimation() {
//   document.querySelectorAll(".card__cart").forEach((cartButton) => {
//     const cartButtonAnimation = cartButton.closest(".cardM");
//   });
// }

// Writing animational for the main page

// Connecting GSAP Plugin "SplitText"
gsap.registerPlugin(SplitText);

let splitHeaderTitle = SplitText.create(".mright__header", {
  type: "chars",
});
gsap.from(splitHeaderTitle.chars, {
  x: -100,
  autoAlpha: 0,
  stagger: {
    amount: 0.5,
    from: "end",
  },
});

let splitHeaderStatement = SplitText.create(".mright__statement", {
  type: "chars",
});

gsap.from(splitHeaderStatement.chars, {
  y: 100,
  autoAlpha: 0,
  stagger: {
    amount: 0.5,
    from: "start",
  },
});

// Writing animation for the commitment section
let splitCommitmentText = SplitText.create(".commitment__header", {
  type: "words",
});
gsap.from(splitCommitmentText.words, {
  y: 100,
  autoAlpha: 0,
  stagger: {
    amount: 0.5,
    from: "end",
  },
});

let splitCommitmentStatement = SplitText.create(".commitment__text", {
  type: "words",
});
gsap.from(splitCommitmentStatement.words, {
  y: 100,
  autoAlpha: 0,
  stagger: {
    amount: 0.9,
    from: "start",
  },
});
