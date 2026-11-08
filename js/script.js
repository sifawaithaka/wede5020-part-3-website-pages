document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SELECT DOM ELEMENTS
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.querySelector(".lightbox-close");
  const galleryTriggers = document.querySelectorAll(".lightbox-trigger");

  // 2. ADVANCED DOM MANIPULATION & EVENT HANDLING
  galleryTriggers.forEach((image) => {
    image.addEventListener("click", (event) => {
      const clickedImage = event.target;
      
      // Dynamic DOM manipulation: Copy src and alt attributes to the modal element
      lightboxImg.src = clickedImage.src;
      lightboxImg.alt = clickedImage.alt;
      lightboxCaption.textContent = clickedImage.alt;

      // Toggle modal visibility using class manipulation
      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent page scrolling while lightbox is open
    });
  });

  // 3. CLOSE LIGHTBOX EVENT LISTENERS
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "auto"; // Re-enable background scrolling
    }
  };

  // Close when clicking the 'X' button
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Close when clicking outside the image (overlay area)
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard Accessibility: Close lightbox when pressing 'Escape'
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

});