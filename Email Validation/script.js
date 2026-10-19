
const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("email");
const resultMessage = document.getElementById("resultMessage");

// Memeriksa format alamat email
function isValidEmail(email) {
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (email.length > 254) {
        return false;
    }

    if (email.startsWith(".") || email.endsWith(".")) {
        return false;
    }

    if (email.includes("..")) {
        return false;
    }

    return emailPattern.test(email);
}

// Menampilkan pesan hasil validasi
function showResult(isValid, message) {
    resultMessage.hidden = false;
    resultMessage.className = isValid
        ? "result-message success"
        : "result-message error";

    const title = document.createElement("strong");
    title.textContent = isValid
        ? "Email Valid!"
        : "Email Tidak Valid!";

    const description = document.createElement("span");
    description.textContent = message;

    resultMessage.replaceChildren(title, description);

    emailInput.classList.toggle("input-valid", isValid);
    emailInput.classList.toggle("input-invalid", !isValid);
}

// Memproses form ketika tombol ditekan
emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {
        showResult(
            false,
            "Silakan masukkan alamat email terlebih dahulu."
        );
        emailInput.focus();
        return;
    }

    if (isValidEmail(email)) {
        showResult(
            true,
            "Format alamat email " + email + " sudah sesuai."
        );
    } else {
        showResult(
            false,
            "Periksa kembali alamat email. Pastikan nama pengguna, tanda @, dan domain ditulis dengan benar."
        );
    }
});

// Menghapus status sebelumnya ketika pengguna mengedit email
emailInput.addEventListener("input", function () {
    emailInput.classList.remove("input-valid", "input-invalid");
    resultMessage.hidden = true;
});
