/* Small progressive enhancements. Every page works fully without this file:
   the contents links still jump, and every photograph is an ordinary image. */
(function () {
  "use strict";

  /* ---------- Projects: highlight the project being read in the contents column ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll('.project-index a[href^="#"]');
    if (!links.length) return;

    var entries = [];
    links.forEach(function (link) {
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (target) entries.push({ link: link, target: target });
    });
    if (!entries.length) return;

    document.documentElement.classList.add("has-scroll-spy");
    var current = null;
    var queued = false;

    function update() {
      queued = false;
      var header = document.querySelector(".site-header");
      var headerBottom = header && getComputedStyle(header).position === "sticky"
        ? header.getBoundingClientRect().bottom : 0;
      // A project counts as "being read" once its top passes a line a third of the way down.
      var line = headerBottom + (window.innerHeight - headerBottom) / 3;
      var active = null;
      entries.forEach(function (entry) {
        if (entry.target.getBoundingClientRect().top <= line) active = entry;
      });
      // At the very bottom of the page, the last project is the one in view.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        active = entries[entries.length - 1];
      }
      if (active === current) return;
      if (current) current.link.removeAttribute("aria-current");
      if (active) active.link.setAttribute("aria-current", "location");
      current = active;
    }

    function queue() {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
  }

  /* ---------- Creative: open photographs in a larger, uncropped view ---------- */
  function initLightbox() {
    var figures = Array.prototype.slice.call(document.querySelectorAll(
      ".documentary-main-photo, .documentary-support-photo, #photography .photo-grid > figure"
    )).filter(function (figure) { return figure.querySelector("img"); });
    if (!figures.length || typeof HTMLDialogElement !== "function") return;

    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-labelledby", "lightbox-caption");
    dialog.innerHTML =
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-image" alt="">' +
        '<figcaption class="lightbox-caption" id="lightbox-caption"></figcaption>' +
      "</figure>" +
      '<button type="button" class="lightbox-button lightbox-close" aria-label="Close">' +
        '<span aria-hidden="true">×</span></button>' +
      '<button type="button" class="lightbox-button lightbox-prev" aria-label="Previous photo">' +
        '<span aria-hidden="true">‹</span></button>' +
      '<button type="button" class="lightbox-button lightbox-next" aria-label="Next photo">' +
        '<span aria-hidden="true">›</span></button>';
    document.body.appendChild(dialog);

    var image = dialog.querySelector(".lightbox-image");
    var caption = dialog.querySelector(".lightbox-caption");
    var closeButton = dialog.querySelector(".lightbox-close");
    var index = 0;
    var opener = null;

    function show(i) {
      index = (i + figures.length) % figures.length;
      var source = figures[index].querySelector("img");
      var sourceCaption = figures[index].querySelector("figcaption");
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      if (source.getAttribute("width")) {
        image.setAttribute("width", source.getAttribute("width"));
        image.setAttribute("height", source.getAttribute("height"));
      }
      caption.textContent = sourceCaption ? sourceCaption.textContent.replace(/\s+/g, " ").trim() : "";
    }

    figures.forEach(function (figure, i) {
      var img = figure.querySelector("img");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "zoom-button";
      button.setAttribute("aria-haspopup", "dialog");
      img.parentNode.insertBefore(button, img);
      button.appendChild(img); // the image's alt text names the button
      button.addEventListener("click", function () {
        opener = button;
        show(i);
        dialog.showModal();
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", function () { dialog.close(); });
    dialog.querySelector(".lightbox-prev").addEventListener("click", function () { show(index - 1); });
    dialog.querySelector(".lightbox-next").addEventListener("click", function () { show(index + 1); });

    // A click on the dark backdrop (outside the photo and buttons) closes the viewer.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    var buttons = dialog.querySelectorAll("button");

    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { show(index - 1); event.preventDefault(); }
      if (event.key === "ArrowRight") { show(index + 1); event.preventDefault(); }
      // Keep Tab cycling through the viewer's own buttons while it is open.
      if (event.key === "Tab") {
        var first = buttons[0];
        var last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
        else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
      }
    });

    // Escape closes the dialog natively; either way, focus returns to the photo that opened it.
    dialog.addEventListener("close", function () {
      if (opener) opener.focus();
    });
  }

  initScrollSpy();
  initLightbox();
})();
