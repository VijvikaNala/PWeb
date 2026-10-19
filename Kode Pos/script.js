
const API_URL = "https://www.emsifa.com/api-wilayah-indonesia/v2";

const provinceSelect = document.getElementById("province");
const regencySelect = document.getElementById("regency");
const districtSelect = document.getElementById("district");
const keywordInput = document.getElementById("keyword");
const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const resultInfo = document.getElementById("resultInfo");
const resultsContainer = document.getElementById("results");

let provinceData = [];
let regencyData = [];
let districtData = [];

async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Data wilayah gagal dimuat.");
    }

    const result = await response.json();
    return result.data;
}

function setOptions(select, items, placeholder) {
    select.replaceChildren();

    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = placeholder;
    select.appendChild(firstOption);

    items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function showMessage(message, isError = false) {
    resultsContainer.replaceChildren();

    const box = document.createElement("div");
    box.className = isError ? "message error" : "message";
    box.textContent = message;

    resultsContainer.appendChild(box);
}

function resetResults(message) {
    resultInfo.textContent = message;
    showMessage(message);
}

async function loadProvinces() {
    try {
        provinceData = await getData(`${API_URL}/provinces.json`);

        setOptions(
            provinceSelect,
            provinceData,
            "Pilih Provinsi"
        );
    } catch (error) {
        setOptions(provinceSelect, [], "Gagal memuat provinsi");
        resetResults(
            "Data provinsi gagal dimuat. Periksa koneksi internet."
        );
    }
}

provinceSelect.addEventListener("change", async () => {
    const provinceId = provinceSelect.value;

    setOptions(regencySelect, [], "Memuat Kabupaten/Kota...");
    setOptions(districtSelect, [], "Pilih Kecamatan");

    regencySelect.disabled = true;
    districtSelect.disabled = true;

    if (!provinceId) {
        setOptions(regencySelect, [], "Pilih Kabupaten/Kota");
        return;
    }

    try {
        regencyData = await getData(
            `${API_URL}/regencies/${provinceId}.json`
        );

        setOptions(
            regencySelect,
            regencyData,
            "Pilih Kabupaten/Kota"
        );

        regencySelect.disabled = false;
    } catch (error) {
        setOptions(regencySelect, [], "Gagal memuat data");
        resetResults("Data kabupaten/kota gagal dimuat.");
    }
});

regencySelect.addEventListener("change", async () => {
    const regencyId = regencySelect.value;

    setOptions(districtSelect, [], "Memuat Kecamatan...");
    districtSelect.disabled = true;

    if (!regencyId) {
        setOptions(districtSelect, [], "Pilih Kecamatan");
        return;
    }

    try {
        districtData = await getData(
            `${API_URL}/districts/${regencyId}.json`
        );

        setOptions(
            districtSelect,
            districtData,
            "Pilih Kecamatan"
        );

        districtSelect.disabled = false;
    } catch (error) {
        setOptions(districtSelect, [], "Gagal memuat data");
        resetResults("Data kecamatan gagal dimuat.");
    }
});

function createResultCard(item) {
    const card = document.createElement("article");
    card.className = "result-card";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const postalCode = document.createElement("p");
    postalCode.className = "postal-code";
    postalCode.textContent = item.postal_code || "Kode pos tidak tersedia";

    const district = document.createElement("p");
    district.textContent = `Kecamatan: ${item.district?.name || "-"}`;

    const regency = document.createElement("p");
    regency.textContent = `Kabupaten/Kota: ${item.regency?.name || "-"}`;

    const province = document.createElement("p");
    province.textContent = `Provinsi: ${item.province?.name || "-"}`;

    card.append(title, postalCode, district, regency, province);

    return card;
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const districtId = districtSelect.value;
    const keyword = keywordInput.value.trim().toLowerCase();

    if (!provinceSelect.value || !regencySelect.value || !districtId) {
        resetResults(
            "Silakan pilih provinsi, kabupaten/kota, dan kecamatan."
        );
        return;
    }

    if (!keyword) {
        resetResults("Masukkan kode pos atau nama daerah.");
        return;
    }

    searchButton.disabled = true;
    searchButton.textContent = "Mencari...";
    resultInfo.textContent = "Sedang mencari data kode pos...";
    showMessage("Mohon tunggu, data sedang diproses.");

    try {
        const villages = await getData(
            `${API_URL}/villages/${districtId}.json`
        );

        const matches = villages.filter((village) => {
            const nameMatch = village.name
                .toLowerCase()
                .includes(keyword);

            const postalMatch = String(village.postal_code || "")
                .includes(keyword);

            return nameMatch || postalMatch;
        });

        resultsContainer.replaceChildren();

        if (matches.length === 0) {
            resultInfo.textContent = "Tidak ditemukan hasil pencarian.";
            showMessage(
                "Tidak ada data yang cocok. Coba kata kunci lain."
            );
            return;
        }

        resultInfo.textContent =
            `Ditemukan ${matches.length} hasil pencarian.`;

        matches.forEach((village) => {
            resultsContainer.appendChild(createResultCard({
                ...village,
                district: { name: districtSelect.selectedOptions[0].text },
                regency: { name: regencySelect.selectedOptions[0].text },
                province: { name: provinceSelect.selectedOptions[0].text }
            }));
        });
    } catch (error) {
        resultInfo.textContent = "Pencarian gagal.";
        showMessage(
            "Data kode pos gagal diambil. Periksa koneksi internet dan coba lagi.",
            true
        );
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Cari";
    }
});

loadProvinces();
