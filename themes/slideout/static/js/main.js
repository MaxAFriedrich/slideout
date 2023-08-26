window.onload = () => {
  let isSlideMode = true;
  let slideCount = 0;
  let currentSlide = 0;

  const notesButton = document.getElementById("modeNotes");
  const slidesButton = document.getElementById("modeSlides");
  const masthead = document.getElementsByClassName("masthead")[0];
  const header = document.getElementsByTagName("header")[0];
  const metaData = document.getElementsByClassName("article-meta")[0];
  const article = document.getElementsByTagName("article")[0];
  const footer = document.getElementsByTagName("footer")[0];
  const css = document.getElementById("jsCSS");
  const slideState = document.getElementById("slideState");
  const moveNext = document.getElementById("moveNext");
  const movePrevious = document.getElementById("movePrevious");

  const slideComponent = ".slide-component{display:none;}"

  function toggleVisual() {
    if (isSlideMode) {
      masthead.style.visibility = "hidden";
      header.classList.add("slideHeader")
      footer.style.display = "none"
      metaData.style.display = "none"
      article.classList.add("articleSlides")
      setSlide()
      slideState.style.display = "revert"
      moveNext.style.display = "revert"
      movePrevious.style.display = "revert"
    } else {
      masthead.style.visibility = "visible";
      header.classList.remove("slideHeader")
      footer.style.display = "flex"
      metaData.style.display = "block"
      article.classList.remove("articleSlides")
      css.innerHTML = "";
      slideState.style.display = "none"
      moveNext.style.display = "none"
      movePrevious.style.display = "none"
    }
  }

  function toggleButton() {
    isSlideMode = !isSlideMode;
    const color = "var(--hl1)"
    if (isSlideMode) {
      notesButton.style.backgroundColor = ""
      slidesButton.style.backgroundColor = color
    } else {
      notesButton.style.backgroundColor = color
      slidesButton.style.backgroundColor = ""
    }
    toggleVisual()
  }

  function parseSlides() {
    const elms = article.children;
    for (let i = 0; i < elms.length; i++) {
      if (elms[i].tagName === "HR")
        slideCount++
      else
        elms[i].classList.add(`slide-index-${slideCount}`)
      elms[i].classList.add("slide-component")
    }
    setSlide()
  }

  function setSlide() {
    if (!isSlideMode)
      return
    if (currentSlide > slideCount)
      currentSlide = 0
    if (currentSlide < 0)
      currentSlide = 0
    css.innerHTML = slideComponent + `.slide-index-${currentSlide}{display:revert;}`
    slideState.innerText = `${currentSlide}/${slideCount}`
  }



  parseSlides()
  document.getElementById("modeToggle").style.display = "flex"
  toggleButton()
  notesButton.addEventListener("click", toggleButton)
  slidesButton.addEventListener("click", toggleButton)
  moveNext.addEventListener("click", () => { currentSlide++; setSlide() })
  movePrevious.addEventListener("click", () => { currentSlide--; setSlide() })
  document.addEventListener("keyup", (event) => {
    event.preventDefault()
    if (["ArrowRight", "ArrowDown", "l", "k", " ", "Enter", "PageDown", "d", "s"].includes(event.key))
      currentSlide++
    else if (["ArrowLeft", "ArrowUp", "h", "j", "PageUp", "w", "a"].includes(event.key))
      currentSlide--
    else if ("Home" === event.key)
      currentSlide = 0
    else if ("End" === event.key)
      currentSlide = slideCount
    setSlide()
  })
}
