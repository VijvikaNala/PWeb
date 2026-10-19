
const form = document.getElementById("formRegistrasi");
const inputNama = document.getElementById("nama");
const inputNim = document.getElementById("nim");
const inputMatkul = document.getElementById("matkul");
const inputDosen = document.getElementById("dosen");

const rekomendasiNama = document.getElementById("rekomendasiNama");
const hasil = document.getElementById("hasil");

// Data nama mahasiswa untuk rekomendasi
const daftarNama = [
    "Nala Putri",
    "Nadia Putri",
    "Naufal Akbar",
    "Nur Aisyah",
    "Nanda Pratama",
    "Rizky Ramadhan",
    "Rina Amelia",
    "Rafi Kurniawan",
    "Dinda Maharani",
    "Dimas Saputra"
];

// Menampilkan rekomendasi nama saat pengguna mengetik
inputNama.addEventListener("input", function () {
    const kataKunci = inputNama.value.trim().toLowerCase();

    rekomendasiNama.replaceChildren();

    if (kataKunci === "") {
        return;
    }

    const hasilPencarian = daftarNama.filter(function (nama) {
        return nama.toLowerCase().includes(kataKunci);
    });

    hasilPencarian.forEach(function (nama) {
        const item = document.createElement("div");

        item.className = "rekomendasi-item";
        item.textContent = nama;

        item.addEventListener("click", function () {
            inputNama.value = nama;
            rekomendasiNama.replaceChildren();
            inputNama.focus();
        });

        rekomendasiNama.appendChild(item);
    });
});

// Menangani pengiriman form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const nim = inputNim.value.trim();
    const matkul = inputMatkul.value;
    const dosen = inputDosen.value.trim();

    // Validasi input
    if (!nama || !nim || !matkul || !dosen) {
        alert("Semua kolom wajib diisi!");
        return;
    }

    // Menampilkan hasil registrasi
    hasil.innerHTML = "";

    const judul = document.createElement("h2");
    judul.textContent = "Registrasi Berhasil!";

    const dataRegistrasi = [
        ["Nama Mahasiswa", nama],
        ["NIM", nim],
        ["Mata Kuliah", inputMatkul.options[inputMatkul.selectedIndex].text],
        ["Dosen", dosen]
    ];

    hasil.appendChild(judul);

    const daftarData = document.createElement("ul");

    dataRegistrasi.forEach(function (data) {
        const item = document.createElement("li");
        item.textContent = data[0] + ": " + data[1];
        daftarData.appendChild(item);
    });

    hasil.appendChild(daftarData);

    rekomendasiNama.replaceChildren();
});

// Menangani tombol reset
form.addEventListener("reset", function () {
    rekomendasiNama.replaceChildren();
    hasil.replaceChildren();
});
