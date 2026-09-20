const form = document.getElementById("studentForm");
const confirmation = document.getElementById("confirmation");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
