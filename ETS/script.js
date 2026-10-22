document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarCollapse = document.getElementById("mainNavbar");

    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase() ||
        "index.html";

    const isHomePage = currentPage === "index.html";

    // Menutup navbar pada layar kecil setelah menu diklik
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }
        });
    });

    // Mengatur menu aktif
    function setActiveLink(activeLink) {
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link === activeLink);
        });
    }

    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (!href) return;

        const linkUrl = new URL(href, window.location.href);
        const linkPage = linkUrl.pathname.split("/").pop().toLowerCase();

        if (isHomePage && linkUrl.hash) {
            link.addEventListener("click", function () {
                setActiveLink(link);
            });
        } else if (!isHomePage && linkPage === currentPage) {
            setActiveLink(link);
        }
    });

    // Mengaktifkan menu sesuai bagian landing page yang terlihat
    const sectionIds = ["beranda", "tentang", "layanan", "footer"];

    const sections = sectionIds
        .map(function (id) {
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (isHomePage && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                const visibleSections = entries
                    .filter(function (entry) {
                        return entry.isIntersecting;
                    })
                    .sort(function (a, b) {
                        return b.intersectionRatio - a.intersectionRatio;
                    });

                if (visibleSections.length > 0) {
                    const sectionId = visibleSections[0].target.id;

                    const activeLink = document.querySelector(
                        '.navbar .nav-link[href="#' + sectionId + '"]'
                    );

                    if (activeLink) setActiveLink(activeLink);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // Menampilkan tahun jika elemennya tersedia
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Simulasi login: hanya dijalankan jika form tersedia
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const managementLink = document.getElementById("managementLink");

    if (loginForm && loginMessage) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            loginMessage.textContent =
                "Simulasi login berhasil. Silakan lanjut ke pengelolaan anggota.";

            loginMessage.className = "login-message text-success mt-3";

            if (managementLink) {
                managementLink.classList.remove("d-none");
            }

            // Form tidak di-reset agar pesan dan isian tetap terlihat
        });
    }
});
