document.addEventListener("DOMContentLoaded", () => {
  
  // SELECT DOM ELEMENTS
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.querySelector(".lightbox-close");
  const galleryTriggers = document.querySelectorAll(".lightbox-trigger");

  //ADVANCED DOM MANIPULATION & EVENT HANDLING
  galleryTriggers.forEach((image) => {
    image.addEventListener("click", (event) => {
      if (lightboxModal && lightboxImg && lightboxCaption) {
        lightboxModal.style.display = "block";
        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.alt || "Gallery image";
      }
    });
  });

  // CLOSE LIGHTBOX EVENT LISTENERS
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.style.display = "none";
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }
});

// Volunteer Form summary
const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("vol-name")?.value.trim() || "";
    const email = document.getElementById("vol-email")?.value.trim() || "";
    const phone = document.getElementById("vol-phone")?.value.trim() || "";

    const roleSelect = document.getElementById("role");
    const roleName = roleSelect && roleSelect.selectedIndex >= 0
      ? roleSelect.options[roleSelect.selectedIndex].text
      : "Not selected";

    const hoursPerWeek = parseFloat(document.getElementById("hours")?.value) || 0;
    const totalWeeks = parseFloat(document.getElementById("weeks")?.value) || 0;

    const totalHours = hoursPerWeek * totalWeeks;
    const estimatedMealsServed = totalHours * 15;

    const summaryData = {
      name,
      email,
      phone,
      roleName,
      hoursPerWeek,
      totalWeeks,
      totalHours,
      estimatedMealsServed,
      submissionDate: new Date().toLocaleDateString("en-ZA")
    };

    sessionStorage.setItem("volunteerSummary", JSON.stringify(summaryData));
    window.location.href = "summary.html";
  });
}