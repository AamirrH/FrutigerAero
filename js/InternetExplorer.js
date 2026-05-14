const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const iframe = document.getElementById("searchFrame");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = encodeURIComponent(input.value.trim());

  if (query) {
    iframe.src = `https://bing.com/?q=${query}`;
  }
});
