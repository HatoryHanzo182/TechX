export const toggleTheme = () => {
  const body = document.body;
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";

  if (isDarkTheme) {
    body.classList.add("dark-theme");
    document.getElementById("theme-toggle").click();
  } else {
    body.classList.remove("dark-theme");
  }

  document
    .getElementById("theme-toggle")
    .addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("dark-theme");
        localStorage.setItem("darkTheme", "true");
      } else {
        body.classList.remove("dark-theme");
        localStorage.setItem("darkTheme", "false");
      }
    });
};
