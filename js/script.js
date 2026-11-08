document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. LIGHTBOX GALLERY LOGIC
  // ==========================================
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.querySelector(".lightbox-close");
  const galleryTriggers = document.querySelectorAll(".lightbox-trigger");

  galleryTriggers.forEach((image) => {
    image.addEventListener("click", (event) => {
      const clickedImage = event.target;
      
      lightboxImg.src = clickedImage.src;
      lightboxImg.alt = clickedImage.alt;
      lightboxCaption.textContent = clickedImage.alt;

      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "auto";
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // ==========================================
  // 2. VOLUNTEER FORM VALIDATION & PROCESSING (ADDED HERE)
  // ==========================================
  const volunteerForm = document.getElementById("volunteerForm");
  const responseContainer = document.getElementById("volunteerResponse");

  if (volunteerForm) {
    volunteerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent standard page reload

      // Extract values
      const name = document.getElementById("vol-name").value.trim();
      const email = document.getElementById("vol-email").value.trim();
      const phone = document.getElementById("vol-phone").value.trim();
      const roleSelect = document.getElementById("role");
      const roleValue = roleSelect.value;
      const roleText = roleSelect.options[roleSelect.selectedIndex].text;

      // Validate phone number length
      if (phone.length < 10) {
        alert("Please enter a valid 10-digit South African phone number.");
        return;
      }

      // Determine dynamic schedule and cost information based on chosen role
      let availabilityInfo = "";
      let costInfo = "Free (No registration fee required)";

      switch (roleValue) {
        case "pantry":
          availabilityInfo = "Saturdays 08:00 – 13:00 at Johannesburg Central Hub";
          break;
        case "driver":
          availabilityInfo = "Weekdays 09:00 – 15:00 (Valid driver's license required)";
          break;
        case "packing":
          availabilityInfo = "Wednesdays & Fridays 10:00 – 14:00";
          break;
        case "admin":
          availabilityInfo = "Flexible remote hours (Monday to Friday)";
          break;
        default:
          availabilityInfo = "Flexible schedule";
      }

      // Inject dynamic response details into DOM
      responseContainer.innerHTML = `
        <h3>Thank you for volunteering, ${name}!</h3>
        <p>We have processed your registration for the <strong>${roleText}</strong> role.</p>
        <ul>
          <li><strong>Role Availability & Shifts:</strong> ${availabilityInfo}</li>
          <li><strong>Cost/Fees:</strong> ${costInfo}</li>
          <li><strong>Confirmation Sent To:</strong> ${email}</li>
          <li><strong>Contact Phone:</strong> ${phone}</li>
        </ul>
        <p>Our volunteer coordinator will contact you shortly to schedule your orientation.</p>
      `;

      // Display response container
      responseContainer.style.display = "block";
      
      // Reset form fields
      volunteerForm.reset();
    });
  }

});