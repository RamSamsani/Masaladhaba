const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", () => {
  function loader() {
    const preloader = document.querySelector("[data-preaload]");
    const preloaderLogo = document.querySelector(".preloader-logo");
    const heroTitle = document.querySelector(".hero-title");
    const h1 = document.querySelector("h1"); // Adjust selectors to match your elements
    const p = document.querySelector("p");

    if (preloader && preloaderLogo && heroTitle && h1 && p) {
      window.addEventListener("load", function () {
        gsap.to(preloaderLogo, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            gsap.to(preloader, {
              opacity: 0,
              scale: 0.5,
              duration: 1.2,
              ease: "power2.out",
              onComplete: () => {
                preloader.classList.add("loaded");
                document.body.classList.add("loaded");

                gsap.set(heroTitle, { opacity: 0, y: 50 });
                gsap.to(heroTitle, {
                  opacity: 1,
                  y: 0,
                  stagger: 0.2,
                  duration: 1.5,
                  ease: "power2.out",
                });

                gsap.set([h1, p], { opacity: 0, y: 50 });
                gsap.to([h1, p], {
                  opacity: 1,
                  y: 0,
                  stagger: 0.3,
                  duration: 1.5,
                  ease: "power2.out",
                });
              },
            });
          },
        });
      });
    }
  }

  loader();

  /**
   * NAVBAR
   */
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  const navLinks = document.querySelectorAll("[data-navbar] a");

  const toggleNavbar = function () {
    if (navbar && overlay) {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("nav-active");
    }
  };

  if (navTogglers) {
    navTogglers.forEach((toggler) => {
      toggler.addEventListener("click", toggleNavbar);
    });
  }

  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar && navbar.classList.contains("active")) {
          toggleNavbar();
        }
      });
    });
  }

  /**
   * HEADER & BACK TOP BUTTON
   */
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  if (header && backTopBtn) {
    let lastScrollPos = 0;

    const hideHeader = function () {
      const isScrollBottom = lastScrollPos < window.scrollY;
      if (isScrollBottom) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }
      lastScrollPos = window.scrollY;
    };

    window.addEventListener("scroll", function () {
      if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    });
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const sliderItems = document.querySelectorAll(".slider-item");
  let currentIndex = 0;

  function showNextSlide() {
    // Remove active class from the current slide
    sliderItems[currentIndex].classList.remove("active");

    // Update index to the next slide
    currentIndex = (currentIndex + 1) % sliderItems.length;

    // Add active class to the next slide
    sliderItems[currentIndex].classList.add("active");
  }

  // Automatically cycle slides every 5 seconds
  setInterval(showNextSlide, 5000);
});





// Get references to the mealType, timeSlot, and bookingDate elements
const mealTypeSelect = document.querySelector('select[name="mealType"]');
const timeSlotSelect = document.querySelector('select[name="timeSlot"]');
const bookingDateInput = document.querySelector('input[name="bookingDate"]');

// Function to update the time slots based on selected meal type and date
function updateTimeSlots() {
  const mealType = mealTypeSelect.value;
  const selectedDate = new Date(bookingDateInput.value);
  const dayOfWeek = selectedDate.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
  
  let timeOptions = [];

  if (mealType === "breakfast") {
    timeOptions = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
  } else if (mealType === "lunch") {
    timeOptions = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
  } else if (mealType === "dinner") {
    // Determine dinner timings based on the day of the week
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Saturday and Sunday
      timeOptions = [
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", 
        "20:30", "21:00", "21:30", "22:00", "22:30"
      ];
    } else { // Monday to Friday
      timeOptions = [
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", 
        "20:30", "21:00", "21:30", "22:00"
      ];
    }
  }

  populateTimeOptions(timeOptions, mealType);
}

// Helper function to populate time slots in the dropdown
function populateTimeOptions(options, mealType) {
  // Clear existing options
  timeSlotSelect.innerHTML = '';

  // Add new options to the timeSlot select element
  options.forEach(time => {
    const option = document.createElement("option");
    const suffix = getTimeSuffix(time, mealType);
    option.value = time;
    option.textContent = `${time} ${suffix}`;
    timeSlotSelect.appendChild(option);
  });
}

// Helper function to determine AM/PM suffix based on time and meal type
function getTimeSuffix(time, mealType) {
  if (mealType === "breakfast") {
    return "AM";
  }
  if (mealType === "lunch") {
    return parseInt(time.split(":")[0]) < 12 ? "AM" : "PM";
  }
  return "PM"; // Dinner always in PM
}

// Add event listeners for mealType and bookingDate changes
mealTypeSelect.addEventListener('change', updateTimeSlots);
bookingDateInput.addEventListener('change', updateTimeSlots);

// Call updateTimeSlots initially to set the default options
updateTimeSlots();


/*const form = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission
  formMessage.textContent = ''; // Clear previous messages

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      formMessage.textContent = 'Form submitted successfully!';
      formMessage.style.color = 'green';
    } else {
      formMessage.textContent = 'Failed to submit the form. Please try again.';
      formMessage.style.color = 'red';
    }
  } catch (error) {
    formMessage.textContent = 'An error occurred. Please try again later.';
    formMessage.style.color = 'red';
  }
});*/
const form = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');
const loader = document.getElementById('reservationFormLoader');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission
  formMessage.textContent = ''; // Clear previous messages

  // Show loader
  loader.style.display = 'block';

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Display success message
      formMessage.textContent = 'Your table reservation is successful!';
      formMessage.style.color = 'green';

      // Reset form fields
      form.reset();
    } else {
      // Display failure message
      formMessage.textContent = 'Failed booking. Please try again.';
      formMessage.style.color = 'red';
    }
  } catch (error) {
    // Handle network or other errors
    formMessage.textContent = 'An error occurred. Please try again later.';
    formMessage.style.color = 'red';
  } finally {
    // Hide loader after response
    loader.style.display = 'none';
  }
});

