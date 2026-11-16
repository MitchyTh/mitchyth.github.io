const projectsData = {
pianoaction: {
    title: "Piano Action Regulation Adjustment Simulator",
    techStack: ["Unity", "C#"],
    link: "",
    linkText: "Coming Soon ↗",
    details: "An interactive VR simulator built in Unity and C# that models real-world piano action repair workflows, removing hardware cost barriers for university piano technology students. Engineered the core game manager, and persistent state and configuration I/O systems.",
    images: [
        "images/piano1.png",
        "images/piano2.png",
        "images/piano3.png"
    ]
},
radiosix: {
    title: "RadioSix",
    techStack: ["Unity", "C#", "Finite State Machines", "AI Lighting Logic"],
    link: "https://agregory-vhs.itch.io/radio-six",
    linkText: "Play on Itch.io ↗",
    details: "An analog horror title developed in a five-person agile team. Engineered enemy AI utilizing finite state machines and real-time light-sensing visibility mechanics.",
    images: [
        "images/radiosix1.png",
        "images/radiosix2.png",
        "images/radiosix3.png",
        "images/radiosix4.png"
    ]
},
unixshell: {
    title: "Custom Unix Shell",
    techStack: ["C", "Unix/Linux", "POSIX API", "Process Management"],
    link: "https://github.com/MitchyTh/UnixShell/tree/main",
    linkText: "View on GitHub ↗",
    details: "A custom command-line interpreter built from scratch in C supporting process spawning via fork/exec, I/O redirection, piping, and memory-safe background job cleanup.",
    images: [
        "images/shell1.png",
        "images/shell2.png",
        "images/shell3.png"
    ]
},
bonerush: {
    title: "Bone Rush",
    techStack: ["Unity", "C#", "VR / XR Interaction Toolkit", "NavMesh AI"],
    link: "https://mitchyth.itch.io/bone-rush",
    linkText: "Play on Itch.io ↗",
    details: "A VR wave-based shooter featuring spatial pathfinding logic and a modular weapon system that scales dynamically across ten difficulty waves.",
    images: [
        "images/bonerush1.png",
        "images/bonerush2.png"
    ]
},
ecommerce: {
    title: "ECommerce Web App",
    techStack: ["C#", ".NET", "Full Stack", "SQL"],
    link: "https://github.com/MitchyTh/eCommerce-Spring2025",
    linkText: "View on GitHub ↗",
    details: "A full-stack storefront application built with C# and .NET, handling product inventory, shopping cart state, and checkout workflows.",
},
bugginout: {
    title: "Buggin' Out",
    techStack: ["Unity", "C#", "Custom Shaders", "Game Design"],
    link: "https://github.com/jake0822/Buggin-out",
    linkText: "View on GitHub ↗",
    details: "A psychedelic photography game focused on creative camera mechanics, environmental discovery, and stylized visual feedback.",
    images: [
        "images/bugginout1.png",
    ]
}
};

const homeView = document.getElementById("home-view");
const detailView = document.getElementById("project-detail-view");
const mainContent = document.querySelector(".main-content");
const projectTabs = document.querySelectorAll(".sidebar .project-card");
const backBtn = document.getElementById("back-to-home");

const detailTitle = document.getElementById("detail-title");
const detailLink = document.getElementById("detail-link");
const detailStack = document.getElementById("detail-stack");
const detailDescription = document.getElementById("detail-description");
const detailImages = document.getElementById("detail-images");

function showProject(projectKey) {
const project = projectsData[projectKey];
if (!project) return;

// Populate text
detailTitle.textContent = project.title;
detailDescription.textContent = project.details;

// Populate tech stack badges
detailStack.innerHTML = "";
project.techStack.forEach(tech => {
    const badge = document.createElement("span");
    badge.className = "stack-badge";
    badge.textContent = tech;
    detailStack.appendChild(badge);
});

// Show/hide external link if present
if (project.link) {
    detailLink.href = project.link;
    detailLink.textContent = project.linkText || "View Repository ↗";
    detailLink.classList.remove("hidden");
} else {
    detailLink.classList.add("hidden");
}

// Populate project images if present
if (detailImages) {
    detailImages.innerHTML = "";
    if (project.images && project.images.length > 0) {
        detailImages.classList.remove("hidden");
        project.images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${project.title} screenshot`;
            img.className = "detail-screenshot";
            detailImages.appendChild(img);
        });
    } else {
        detailImages.classList.add("hidden");
    }
}

// Highlight active sidebar tab
projectTabs.forEach(tab => tab.classList.remove("active-tab"));
document.querySelector(`[data-project="${projectKey}"]`)?.classList.add("active-tab");

// Swap screens and scroll main pane to top
homeView.classList.add("hidden");
detailView.classList.remove("hidden");
mainContent.scrollTop = 0;
}

function showHome() {
projectTabs.forEach(tab => tab.classList.remove("active-tab"));
detailView.classList.add("hidden");
homeView.classList.remove("hidden");
mainContent.scrollTop = 0;
}

// Click listeners on sidebar tabs
projectTabs.forEach(tab => {
tab.addEventListener("click", () => {
    const key = tab.getAttribute("data-project");
    // Clicking the already-active tab toggles back to home
    if (tab.classList.contains("active-tab")) {
    showHome();
    } else {
    showProject(key);
    }
});
});

backBtn.addEventListener("click", showHome);

// ==========================================
// Light / Dark Mode Toggle Logic
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

// Check for saved user preference on load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    if (themeText) themeText.textContent = "Light Mode";
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            if (themeIcon) themeIcon.className = "fa-solid fa-sun";
            if (themeText) themeText.textContent = "Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            if (themeIcon) themeIcon.className = "fa-solid fa-moon";
            if (themeText) themeText.textContent = "Dark Mode";
        }
    });
}

// ==========================================
// Image Lightbox Modal Logic
// ==========================================
const lightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const galleryContainer = document.getElementById("detail-images");

if (galleryContainer && lightbox && lightboxImg) {
  // Open lightbox when clicking any screenshot in the gallery
  galleryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("detail-screenshot")) {
      lightboxImg.src = e.target.src;
      lightboxImg.alt = e.target.alt;
      lightbox.classList.remove("hidden");
    }
  });

  // Close when clicking the X button or the dark backdrop
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.add("hidden");
    }
  });

  // Close when pressing the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      lightbox.classList.add("hidden");
    }
  });
}