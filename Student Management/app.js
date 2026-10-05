// DATA MAHASISWA
const tableBody = document.getElementById("studentTableBody");
const dataInfo = document.getElementById("dataInfo");
const dataPerPage = 5;
let currentPage = 1;

// FORM
const form = document.querySelector(".student-form");
const nimInput = document.getElementById("nim");
const namaInput = document.getElementById("nama");
const jurusanInput = document.getElementById("jurusan");
const emailInput = document.getElementById("email");
const cancelButton = document.getElementById("cancelButton");
const resetButton = document.getElementById("resetButton");

// SEARCH
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// DATA DARI LOCAL STORAGE
let students =
    JSON.parse(localStorage.getItem("students")) || [];

// SIMPAN KE LOCAL STORAGE
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

// JIKA LOCAL STORAGE KOSONG AMBIL DATA DARI HTML
if (students.length === 0) {
    const rows =
        tableBody.querySelectorAll("tr");

    rows.forEach((row) => {

        const cells =
            row.querySelectorAll("td");

        if (cells.length >= 5) {

            students.push({
                nim: cells[1].textContent.trim(),
                nama: cells[2].textContent.trim(),
                jurusan: cells[3].textContent.trim(),
                email: cells[4].textContent.trim()
            });
        }
    });

    saveStudents();
}


// TAMPILKAN DATA KE TABEL
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.nim}</td>
            <td>${student.nama}</td>
            <td>${student.jurusan}</td>
            <td>${student.email}</td>

            <td>
                <div class="actions">

                    <button
                        class="action edit"
                        type="button"
                    >
                        Edit
                    </button>

                    <button
                        class="action delete"
                        type="button"
                    >
                        Hapus
                    </button>

                </div>
            </td>
        `;

        // TOMBOL EDIT
        const editButton =
            row.querySelector(".edit");

        editButton.addEventListener("click", function () {

            nimInput.value = student.nim;
            namaInput.value = student.nama;
            jurusanInput.value = student.jurusan;
            emailInput.value = student.email;

            /* Simpan index data yang diedit */
            form.dataset.editIndex = index;
            /* Ubah tombol Simpan menjadi Update */
            form.querySelector(
                ".btn-primary"
            ).textContent = "Update";
        });

        // TOMBOL HAPUS
        const deleteButton =
            row.querySelector(".delete");

        deleteButton.addEventListener("click", function () {

            const yakin = confirm(
                `Hapus mahasiswa ${student.nama}?`
            );

            if (!yakin) {
                return;
            }

            /* Hapus data */
            students.splice(index, 1);
            /* Simpan perubahan */
            saveStudents();
            /* Tampilkan ulang */
            renderTable();

            displayData();

        });


        tableBody.appendChild(row);

    });

}


// TAMPILKAN DATA
function displayData() {
    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();

    const rows =
        Array.from(
            tableBody.querySelectorAll("tr")
        );

    /* Filter */
    const filteredRows =
        rows.filter((row) => {

            const text =
                row.textContent.toLowerCase();

            return text.includes(keyword);
        });

    const totalData =
        filteredRows.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalData / dataPerPage
            )
        );

    /* Cek halaman */
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start =
        (currentPage - 1) * dataPerPage;
    const end =
        start + dataPerPage;

    /* Sembunyikan semua */
    rows.forEach((row) => {
        row.style.display = "none";
    });

    /* Tampilkan 5 data */
    filteredRows.forEach((row, index) => {
        if (
            index >= start &&
            index < end
        ) {
            row.style.display = "";
        }
    });

    // INFO DATA
    if (totalData === 0) {
        dataInfo.textContent =
            "Menampilkan 0 data";
    } else {
        const firstData =
            start + 1;
        const lastData =
            Math.min(
                end,
                totalData
            );

        dataInfo.textContent =
            `Menampilkan ${firstData} - ${lastData} dari ${totalData} data`;
    }

    /* Pagination */
    updatePagination(totalPages);
}

// PAGINATION
function updatePagination(totalPages) {
    const pagination =
        document.querySelector(".pagination");

    pagination.innerHTML = "";

    /* Previous */
    const prevButton =
        document.createElement("button");

    prevButton.textContent = "«";
    prevButton.disabled =
        currentPage === 1;
    prevButton.addEventListener(
        "click",
        () => {

            if (currentPage > 1) {
                currentPage--;

                displayData();
            }
        }
    );

    pagination.appendChild(
        prevButton
    );

    /* Nomor halaman */
    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {
       
        const pageButton =
            document.createElement("button");

        pageButton.textContent = i;

        if (i === currentPage) {
            pageButton.classList.add(
                "active"
            );

        }

        pageButton.addEventListener(
            "click",
            () => {
                currentPage = i;

                displayData();
            }
        );

        pagination.appendChild(
            pageButton
        );
    }

    /* Next */
    const nextButton =
        document.createElement("button");

    nextButton.textContent = "»";
    nextButton.disabled =
        currentPage === totalPages;
    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentPage < totalPages
            ) {
                currentPage++;

                displayData();
            }
        }
    );

    pagination.appendChild(
        nextButton
    );
}


// SIMPAN / UPDATE MAHASISWA
form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const nim =
            nimInput.value.trim();
        const nama =
            namaInput.value.trim();
        const jurusan =
            jurusanInput.value;
        const email =
            emailInput.value.trim();

        /* Cek input */
        if (
            nim === "" ||
            nama === "" ||
            jurusan === "" ||
            email === ""
        ) {

            alert(
                "Semua data mahasiswa harus diisi!"
            );

            return;
        }


        // CEK MODE EDIT
        const editIndex =
            form.dataset.editIndex;

        if (editIndex !== undefined) {

            /* Cek NIM duplikat */
            const nimDuplikat =
                students.some(
                    (student, index) =>
                        student.nim === nim &&
                        index !== Number(editIndex)
                );

            if (nimDuplikat) {
                alert(
                    "NIM sudah digunakan mahasiswa lain!"
                );

                return;
            }

            /* Update data */
            students[editIndex] = {
                nim: nim,
                nama: nama,
                jurusan: jurusan,
                email: email
            };

            alert(
                "Data mahasiswa berhasil diperbarui!"
            );

            /* Keluar dari mode edit */
            delete form.dataset.editIndex;
            /* Kembalikan tombol */
            form.querySelector(
                ".btn-primary"
            ).textContent = "Simpan";
        }

        // MODE TAMBAH DATA BARU
        else {
            /* Cek NIM duplikat */
            const nimSudahAda =
                students.some(
                    (student) =>
                        student.nim === nim
                );

            if (nimSudahAda) {
                alert(
                    "NIM sudah terdaftar!"
                );

                return;
            }

            /* Tambahkan data */
            students.push({
                nim: nim,
                nama: nama,
                jurusan: jurusan,
                email: email
            });


            alert(
                "Data mahasiswa berhasil disimpan!"
            );
        }

        /* Simpan ke localStorage */
        saveStudents();
        /* Tampilkan ulang tabel */
        renderTable();
        /* Kembali ke halaman pertama */
        currentPage = 1;

        /* Kosongkan form */
        form.reset();
        /* Tampilkan data */
        displayData();
    }
);

// BATAL
cancelButton.addEventListener(
    "click",
    function () {

        /* Kosongkan form */
        form.reset();
        /* Keluar dari mode Edit */
        delete form.dataset.editIndex;
        /* Kembalikan tombol Update → Simpan */
        form.querySelector(
            ".btn-primary"
        ).textContent = "Simpan";
    }
);

// RESET
resetButton.addEventListener(
    "click",
    function () {

        form.reset();
    }
);


// SEARCH
searchButton.addEventListener(
    "click",
    function () {

        currentPage = 1;
        displayData();
    }
);


// SEARCH DENGAN ENTER
searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            currentPage = 1;
            displayData();
        }
    }
);

// TAMPILKAN DATA AWAL
renderTable();
displayData();