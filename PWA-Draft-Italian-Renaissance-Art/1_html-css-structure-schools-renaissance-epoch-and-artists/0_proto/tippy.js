tippy(".artist-link", {
  content(reference) {
    const title = reference.getAttribute("data-tippy-content");
    return title;
  },
  theme: "myCustomTheme",
  animation: "scale",
});

tippy(".year-link", {
  content(reference) {
    const title = reference.getAttribute("data-tippy-content");
    return title;
  },
  allowHTML: true,
  theme: "myCustomTheme",
  animation: "scale",
});
