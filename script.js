const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");

document.querySelectorAll(".comic-image-button").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const visitCount = document.querySelector("[data-visit-count]");

if (visitCount) {
  const countKey = "paski-banasa-visit-count";
  const ownerOptOutKey = "paski-banasa-owner";
  const query = new URLSearchParams(window.location.search);

  // Visiting once with ?bez-licznika permanently excludes this browser. The
  // counter stays private and does not read or store anyone's IP address.
  if (query.has("bez-licznika")) localStorage.setItem(ownerOptOutKey, "true");

  const isOwner = localStorage.getItem(ownerOptOutKey) === "true";
  const previousCount = Number.parseInt(localStorage.getItem(countKey) || "0", 10);
  const currentCount = isOwner ? previousCount : previousCount + 1;

  if (!isOwner) localStorage.setItem(countKey, String(currentCount));
  visitCount.textContent = new Intl.NumberFormat("pl-PL").format(currentCount);
}
