console.log("Welcome to wURthy 💕");

(function () {
  "use strict";

  // ── Helpers ──────────────────────────────────────────────────────────────
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_RE.test(value.trim());
  }

  function setError(input, errorEl, message) {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove("input-error");
    input.setAttribute("aria-invalid", "false");
    errorEl.textContent = "";
  }

  function announce(liveRegion, message) {
    // Toggling textContent triggers the ARIA live region in all browsers.
    liveRegion.textContent = "";
    requestAnimationFrame(function () {
      liveRegion.textContent = message;
    });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    var form       = document.getElementById("email-form");
    var input      = document.getElementById("email-input");
    var errorEl    = document.getElementById("email-error");
    var successEl  = document.getElementById("email-success");
    var liveRegion = document.getElementById("form-status");

    if (!form || !input || !errorEl || !successEl || !liveRegion) {
      return; // Elements not found; exit gracefully.
    }

    // ── Validate on blur ────────────────────────────────────────────────────
    input.addEventListener("blur", function () {
      var value = input.value.trim();
      if (value === "") {
        clearError(input, errorEl);
        return;
      }
      if (!isValidEmail(value)) {
        setError(input, errorEl, "Please enter a valid email address (e.g. name@example.com).");
      } else {
        clearError(input, errorEl);
      }
    });

    // ── Clear error as user types ────────────────────────────────────────────
    input.addEventListener("input", function () {
      if (input.classList.contains("input-error") && isValidEmail(input.value.trim())) {
        clearError(input, errorEl);
      }
    });

    // ── Validate and handle submit ───────────────────────────────────────────
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      successEl.textContent = "";

      var value = input.value.trim();

      if (value === "") {
        setError(input, errorEl, "Email address is required.");
        announce(liveRegion, "Error: Email address is required.");
        input.focus();
        return;
      }

      if (!isValidEmail(value)) {
        setError(input, errorEl, "Please enter a valid email address (e.g. name@example.com).");
        announce(liveRegion, "Error: Please enter a valid email address.");
        input.focus();
        return;
      }

      // ── Success path ──────────────────────────────────────────────────────
      clearError(input, errorEl);
      input.value = "";

      var successMessage = "You\u2019re in! Check your inbox for a welcome message.";
      successEl.textContent = successMessage;
      announce(liveRegion, "Success: " + successMessage);

      // TODO: Replace with actual backend / newsletter-service API call.
      console.log("Email submitted:", value);
    });
  });
}());
