document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("accessibility-menu");
  const toggleBtn = document.getElementById("accessibility-toggle");
  const closeBtn = document.getElementById("accessibilityClose");


  if (!menu || !toggleBtn) {
    console.error("Erişilebilirlik menüsü veya buton bulunamadı.");
    return;
  }

    // Çarpıya tıklayınca menü kapansın
  closeBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
  });


  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "y") {
      menu.classList.toggle("hidden");
    }
  });

  document.querySelectorAll(".access-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      document.body.classList.toggle(action);
    });
  });

  /* document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
*/
  const resetBtn = document.querySelector(".access-btn.reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.body.className = "";
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const textIncreaseBtn = document.querySelector(".access-btn.text-increase");
  const lineHeightBtn = document.querySelector(".access-btn.line-height");
  const alignLeftBtn = document.querySelector(".access-btn.align-left");
  const cursorLargeBtn = document.querySelector(".access-btn.cursor-large");
  const hideImagesBtn = document.querySelector(".access-btn.hide-images");
    const highlightLinksBtn = document.querySelector(".access-btn.highlight-links");
  const highContrastBtn = document.querySelector(".access-btn.high-contrast");
  const blueLightBtn = document.querySelector(".access-btn.blue-light");
  const readingMaskBtn = document.querySelector(".access-btn.reading-mask");
  const readingGuidekBtn = document.querySelector(".access-btn.reading-guide");
   const grayscaleToggleBtn = document.querySelector(".access-btn.grayscale-toggle");
   const highBtn = document.querySelector(".access-btn.sat-high");
   const lowBtn = document.querySelector(".access-btn.sat-low");
   const dyslexiaToggleBtn = document.querySelector(".access-btn.dyslexia-toggle");
  const resetBtn = document.querySelector(".access-btn.reset");

  if (textIncreaseBtn) {
    textIncreaseBtn.addEventListener("click", () => {
      document.body.classList.toggle("text-increase");
    });
  }

  if (lineHeightBtn) {
    lineHeightBtn.addEventListener("click", () => {
      document.body.classList.toggle("line-height");
    });
  }

  if (alignLeftBtn) {
    alignLeftBtn.addEventListener("click", () => {
      document.body.classList.toggle("text-align-left");

    });
  }

  if (cursorLargeBtn) {
    cursorLargeBtn.addEventListener("click", () => {
      document.body.classList.toggle("cursor-large");
    });
  }

  if (hideImagesBtn) {
    hideImagesBtn.addEventListener("click", () => {
      document.body.classList.toggle("hide-images");
    });
  }

    if (highlightLinksBtn) {
    highlightLinksBtn.addEventListener("click", () => {
      document.body.classList.toggle("highlight-links");
    });
  }

  if (highContrastBtn) {
    highContrastBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
    });
  }

  if (blueLightBtn) {
    blueLightBtn.addEventListener("click", () => {
      document.body.classList.toggle("blue-light");
    });
  }


if (readingMaskBtn) {
    let maskActive = false;
  let readingMaskOverlay;

  function moveMask(e) {
    if (!readingMaskOverlay) return;

    // Mouse pozisyonunu yüzde olarak alıyoruz
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;

    // CSS değişkenlerini güncelle
    readingMaskOverlay.style.setProperty('--mask-x', `${xPercent}%`);
    readingMaskOverlay.style.setProperty('--mask-y', `${yPercent}%`);
  }

  readingMaskBtn.addEventListener("click", () => {
    if (!maskActive) {
      // Overlay oluştur
      readingMaskOverlay = document.createElement("div");
      readingMaskOverlay.className = "reading-mask-overlay";
      document.body.appendChild(readingMaskOverlay);

      document.addEventListener("mousemove", moveMask);

      maskActive = true;
    } else {
      if (readingMaskOverlay) {
        readingMaskOverlay.remove();
        readingMaskOverlay = null;
      }
      document.removeEventListener("mousemove", moveMask);
      maskActive = false;
    }
  });
}

if(readingGuidekBtn){
    let guideLine = document.createElement("div");
guideLine.classList.add("reading-guide-line");
document.body.appendChild(guideLine);

let guideActive = false;

readingGuidekBtn.addEventListener("click", () => {
  guideActive = !guideActive;
  guideLine.style.display = guideActive ? "block" : "none";
});

document.addEventListener("mousemove", (e) => {
  if (guideActive) {
    guideLine.style.top = `${e.clientY}px`;
  }
});
}

if (grayscaleToggleBtn) {
  grayscaleToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("grayscale-mode");
  });
}

if (highBtn) {
  highBtn.addEventListener("click", () => {
    document.body.classList.remove("saturation-low");
    document.body.classList.toggle("saturation-high");
  });
}

if (lowBtn) {
  lowBtn.addEventListener("click", () => {
    document.body.classList.remove("saturation-high");
    document.body.classList.toggle("saturation-low");
  });
}
if (dyslexiaToggleBtn) {
  dyslexiaToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dyslexia-mode");
  });
}

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.body.className = ""; // Tüm erişilebilirlik sınıflarını kaldır
    });
  }
});