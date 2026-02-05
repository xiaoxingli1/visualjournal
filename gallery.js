(() => {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const lbImg = lb.querySelector("img");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");
  const btnClose = lb.querySelector(".lb-close");

  let items = [];
  let idx = 0;

  function openAt(i){
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].src;
    lb.classList.add("open");
  }
  function close(){
    lb.classList.remove("open");
    lbImg.src = "";
  }
  function next(){ openAt(idx + 1); }
  function prev(){ openAt(idx - 1); }

  // Collect all images marked for gallery
  document.querySelectorAll("[data-gallery] .card img").forEach((img, i) => {
    items.push(img);
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openAt(i));
  });

  btnNext.addEventListener("click", (e) => { e.stopPropagation(); next(); });
  btnPrev.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  btnClose.addEventListener("click", (e) => { e.stopPropagation(); close(); });

  lb.addEventListener("click", close);

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();

