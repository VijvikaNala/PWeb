
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarCollapse = document.getElementById("mainNavbar");

    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase() ||
        "index.html";

    const isHomePage =
        currentPage === "index.html" || currentPage === "";

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

    // Mengatur menu aktif untuk halaman landing page dan halaman terpisah
    function setActiveLink(activeLink) {
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link === activeLink);
        });
    }

    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href) return;

        // Menu yang menuju bagian di landing page
        if (isHomePage && href.startsWith("#")) {
            link.addEventListener("click", function () {
                setActiveLink(link);
            });
        } else if (!isHomePage && !href.startsWith("#")) {
            // Menu halaman terpisah: Daftar Anggota, Pendaftaran, Login
            const linkPage = href.split("#")[0].toLowerCase();

            if (linkPage === currentPage) {
                setActiveLink(link);
            }
        }
    });

    // Bagian landing page, termasuk footer untuk menu Kontak
    const sectionIds = ["beranda", "tentang", "layanan", "footer"];

    const sections = sectionIds
        .map(function (id) {
            return document.getElementById(id);
        })
        .filter(Boolean);

    // Mengaktifkan menu sesuai bagian yang terlihat saat scroll
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

                    if (activeLink) {
                        setActiveLink(activeLink);
                    }
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

    // Menampilkan tahun jika elemen tersedia
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Simulasi login petugas jika form tersedia
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm && loginMessage) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            loginMessage.textContent =
                "Simulasi berhasil dijalankan. Sistem login belum terhubung ke server.";

            loginMessage.style.color = "#064675";

            loginForm.reset();
        });
    }
});
