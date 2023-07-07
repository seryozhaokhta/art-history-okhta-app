document.addEventListener("DOMContentLoaded", (event) => {
  const gridContainer = document.querySelector(".grid-container");

  gridContainer.addEventListener("click", function (e) {
    const target = e.target;

    if (!target.matches(".hide-show-icon")) return;

    const parentBlock = target.closest(".grid-item");
    const contentBlock = parentBlock.querySelector(".content");

    const isHidden = contentBlock.classList.toggle("hidden");

    if (parentBlock.matches(".grid-item-text")) {
      target.src = isHidden ? "artist_inf.svg" : "close_block.svg";
    } else if (parentBlock.matches(".grid-item-bibliography")) {
      target.src = isHidden ? "local_library.svg" : "close_block.svg";
    }

    parentBlock.classList.toggle("collapsed", isHidden);
  });

  document.addEventListener("click", function (e) {
    const target = e.target;

    if (!target.matches(".art-img") || target.matches(".fullscreen")) return;

    const existingFullscreenElement = document.querySelector(".fullscreen");
    if (existingFullscreenElement) {
      existingFullscreenElement.remove();
    }

    const artItem = target.cloneNode(true);
    artItem.classList.add("fullscreen");
    document.body.appendChild(artItem);

    artItem.addEventListener("click", () => artItem.remove());
  });
});
