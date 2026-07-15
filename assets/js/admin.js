// ======================================
// SMART MOSQUE DISPLAY
// ADMIN PANEL v2.2
// ======================================

// ======================================
// ELEMENT
// ======================================

const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const menus = document.querySelectorAll(".menu-item");

// ======================================
// DATA LOGO
// ======================================

let selectedLogo = "";
let selectedQris = "";

// ======================================
// TEMPLATE HALAMAN
// ======================================

const pages = {

identitas:`

<div class="card">

<h2>🕌 Identitas Masjid</h2>

<div class="form-group">

<label>Nama Masjid</label>

<input
type="text"
id="masjidName"
placeholder="Masjid Jami' Zumrotul Huda">

</div>

<div class="form-group">

<label>Alamat Masjid</label>

<input
type="text"
id="masjidAddress"
placeholder="Pondok Cabe Ilir • Pamulang">

</div>

<div class="form-group">

<label>Nama DKM</label>

<input
type="text"
id="dkmName"
placeholder="DKM Masjid">

</div>

<div class="form-group">

<label>Kota Jadwal Sholat</label>

<select id="city">

    <option value="1639">Tangerang Selatan</option>
    <option value="1301">Jakarta Selatan</option>
    <option value="1206">Depok</option>
    <option value="1201">Bogor</option>
    <option value="1105">Bekasi</option>

</select>

</div>

<div class="form-group">

<label>Logo Masjid</label>

<input
type="file"
id="logoUpload"
accept="image/*">

</div>

<div class="form-group">

<label>Preview Logo</label>

<div class="logo-preview">

<img
id="logoPreview"
src="assets/images/logo.png"
alt="Preview Logo">

</div>

</div>

<button class="save-btn">

💾 Simpan Identitas

</button>

</div>

`,

// ======================================

pengumuman:`

<div class="card">

<h2>📢 Pengumuman Dashboard</h2>

<div class="form-group">

<label>Running Text</label>

<textarea
id="runningText"
rows="4"
placeholder="Masukkan running text..."></textarea>

</div>

<hr style="margin:25px 0;">

<h2>🕌 Info Slider Masjid</h2>

<div class="form-group">

<label>Info 1</label>

<input
type="text"
id="info1"
placeholder="Kajian Ahad Ba'da Subuh">

</div>

<div class="form-group">

<label>Info 2</label>

<input
type="text"
id="info2"
placeholder="Santunan Yatim">

</div>

<div class="form-group">

<label>Info 3</label>

<input
type="text"
id="info3"
placeholder="Kerja Bakti">

</div>

<button class="save-running">

💾 Simpan Pengumuman

</button>

</div>

`,

// ======================================

jadwal:`

<div class="card">

<h2>🕋 Jadwal Sholat</h2>

<div class="form-group">

<label>Kota Aktif</label>

<div id="cityName">

Tangerang Selatan

</div>

</div>

<table class="jadwal-table">

<tr>

<td>Imsak</td>

<td id="jImsak">-</td>

</tr>

<tr>

<td>Subuh</td>

<td id="jSubuh">-</td>

</tr>

<tr>

<td>Syuruq</td>

<td id="jSyuruq">-</td>

</tr>

<tr>

<td>Dzuhur</td>

<td id="jDzuhur">-</td>

</tr>

<tr>

<td>Ashar</td>

<td id="jAshar">-</td>

</tr>

<tr>

<td>Maghrib</td>

<td id="jMaghrib">-</td>

</tr>

<tr>

<td>Isya</td>

<td id="jIsya">-</td>

</tr>

</table>

<button class="refresh-jadwal">

🔄 Refresh Jadwal

</button>

</div>

`,

// ======================================

jumat:`

<div class="card">

<h2>🕌 Mode Jumat</h2>

<div class="form-group">

<label>

<input
type="checkbox"
id="enableJumat">

 Aktifkan Mode Jumat

</label>

</div>

<div class="form-group">

<label>Jam Mulai Khutbah</label>

<input
type="time"
id="jumatStart"
value="11:30">

</div>

<div class="form-group">

<label>Jam Selesai Jumat</label>

<input
type="time"
id="jumatEnd"
value="13:30">

</div>

<div class="form-group">

<label>Durasi Khutbah (menit)</label>

<input
type="number"
id="khutbahDuration"
value="30">

</div>

<div class="form-group">

<label>Durasi Iqomah (menit)</label>

<input
type="number"
id="iqomahDuration"
value="10">

</div>

<button
class="save-btn"
id="saveJumat">

💾 Simpan Mode Jumat

</button>

</div>

`,

// ======================================
// QRIS
// ======================================

qris:`

<div class="card">

<h2>💳 QRIS Masjid</h2>

<p class="section-desc">

Upload gambar QRIS yang akan tampil di Dashboard.

</p>

<div class="form-group">

<label>Upload QRIS</label>

<input
type="file"
id="qrisUpload"
accept="image/*">

</div>

<div class="form-group">

<label>Preview QRIS</label>

<div class="logo-preview">

<img
id="qrisPreview"
src="assets/images/qris.png"
alt="QRIS Preview">

</div>

</div>

<button class="save-qris">

💾 Simpan QRIS

</button>

</div>

`,

// ======================================

pengaturan:`

<div class="card">

<h2>⚙️ Pengaturan</h2>

<p>

Durasi Adzan,
Iqomah
dan
Sholat.

</p>

</div>

`

};

// ======================================
// JUDUL HALAMAN
// ======================================

const titles={

identitas:"🕌 Identitas Masjid",

pengumuman:"📢 Pengumuman",

jadwal:"🕋 Jadwal Sholat",

jumat:"🕌 Mode Jumat",

qris:"💳 QRIS",

pengaturan:"⚙️ Pengaturan"

};

// ======================================
// NAVIGASI MENU
// ======================================

menus.forEach(menu=>{

    menu.addEventListener("click",()=>{

        menus.forEach(item=>item.classList.remove("active"));

        menu.classList.add("active");

        const page=menu.dataset.page;

        pageTitle.innerHTML=titles[page];

        pageContent.innerHTML=pages[page];

        switch(page){

    case "identitas":

        loadIdentity();

    break;

    case "pengumuman":

        loadRunningText();

        loadInfoMasjid();

    break;

    case "jadwal":

        loadJadwalAdmin();

    break;

    case "qris":

        loadQris();

    break;

    case "jumat":

    initJumat();

    break;

}

    });

});

// ======================================
// HALAMAN PERTAMA
// ======================================

pageTitle.innerHTML=titles.identitas;

pageContent.innerHTML=pages.identitas;

loadIdentity();

// ======================================
// SIMPAN IDENTITAS
// ======================================

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("save-btn")) return;

    const data={

    masjid:document.getElementById("masjidName").value,

    alamat:document.getElementById("masjidAddress").value,

    dkm:document.getElementById("dkmName").value,

    kota:document.getElementById("city").value,

    logo:selectedLogo

};

    localStorage.setItem(

        "smartMosqueIdentity",

        JSON.stringify(data)

    );

    alert("✅ Identitas Masjid berhasil disimpan.");

});

// ======================================
// SIMPAN QRIS
// ======================================

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("save-qris")) return;

    localStorage.setItem(

        "smartMosqueQRIS",

        selectedQris

    );

    alert("✅ QRIS berhasil disimpan.");

});

// ======================================
// LOAD IDENTITAS
// ======================================

function loadIdentity(){

    const data = JSON.parse(

        localStorage.getItem("smartMosqueIdentity")

    );

    if(!data) return;

    if(document.getElementById("masjidName"))
        document.getElementById("masjidName").value=data.masjid||"";

    if(document.getElementById("masjidAddress"))
        document.getElementById("masjidAddress").value=data.alamat||"";

    if(document.getElementById("dkmName"))
        document.getElementById("dkmName").value=data.dkm||"";

    if(document.getElementById("city"))
        document.getElementById("city").value=data.kota||"";

    // ==========================
    // LOAD LOGO
    // ==========================

    if(data.logo){

        selectedLogo = data.logo;

        const preview = document.getElementById("logoPreview");

        if(preview){

            preview.src = data.logo;

        }

    }

}

// ======================================
// SIMPAN RUNNING TEXT
// ======================================

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("save-running")) return;

    localStorage.setItem(

        "runningText",

        document.getElementById("runningText").value

    );

    const info={

        info1:document.getElementById("info1").value,

        info2:document.getElementById("info2").value,

        info3:document.getElementById("info3").value

    };

    localStorage.setItem(

        "infoMasjid",

        JSON.stringify(info)

    );

    alert("✅ Pengumuman berhasil disimpan.");

});

// ======================================
// LOAD RUNNING TEXT
// ======================================

function loadRunningText(){

    const text = localStorage.getItem("runningText");

    const textarea = document.getElementById("runningText");

    if(textarea){

        textarea.value = text || "";

    }

}

// ======================================
// LOAD INFO MASJID
// ======================================

function loadInfoMasjid(){

    const data = JSON.parse(

        localStorage.getItem("infoMasjid")

    );

    if(!data) return;

    if(document.getElementById("info1"))
        document.getElementById("info1").value = data.info1 || "";

    if(document.getElementById("info2"))
        document.getElementById("info2").value = data.info2 || "";

    if(document.getElementById("info3"))
        document.getElementById("info3").value = data.info3 || "";

}

// ======================================
// SIMPAN MODE JUMAT
// ======================================

function initJumat(){

    const btn=document.getElementById("saveJumat");

    if(!btn) return;

    loadJumat();

    btn.onclick=function(){

        const data={

            enable:
            document.getElementById("enableJumat").checked,

            start:
            document.getElementById("jumatStart").value,

            end:
            document.getElementById("jumatEnd").value,

            khutbah:
            document.getElementById("khutbahDuration").value,

            iqomah:
            document.getElementById("iqomahDuration").value

        };

        localStorage.setItem(

            "smartMosqueJumat",

            JSON.stringify(data)

        );

        alert("Mode Jumat berhasil disimpan.");

    };

}

// ======================================
// LOAD MODE JUMAT
// ======================================

function loadJumat(){

    const data=JSON.parse(

        localStorage.getItem("smartMosqueJumat")

    );

    if(!data) return;

    document.getElementById("enableJumat").checked=data.enable;

    document.getElementById("jumatStart").value=data.start;

    document.getElementById("jumatEnd").value=data.end;

    document.getElementById("khutbahDuration").value=data.khutbah;

    document.getElementById("iqomahDuration").value=data.iqomah;

}

// ======================================
// LOAD DATA HALAMAN PERTAMA
// ======================================

loadIdentity();

loadRunningText();

loadInfoMasjid();

// ======================================
// UPLOAD LOGO
// ======================================

document.addEventListener("change",(e)=>{

    if(e.target.id!=="logoUpload") return;

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(ev){

        selectedLogo = ev.target.result;

        const preview=document.getElementById("logoPreview");

        if(preview){

            preview.src=selectedLogo;

        }

    };

    reader.readAsDataURL(file);

});

// ======================================
// PREVIEW QRIS
// ======================================

document.addEventListener("change",(e)=>{

    if(e.target.id!=="qrisUpload") return;

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(ev){

        selectedQris = ev.target.result;

        const preview = document.getElementById("qrisPreview");

        if(preview){

            preview.src = selectedQris;

        }

    };

    reader.readAsDataURL(file);

});

// ======================================
// LOAD QRIS
// ======================================

function loadQris(){

    const qris = localStorage.getItem("smartMosqueQRIS");

    if(!qris) return;

    selectedQris = qris;

    const preview = document.getElementById("qrisPreview");

    if(preview){

        preview.src = qris;

    }

}

// ======================================
// LOAD JADWAL ADMIN
// ======================================

function loadJadwalAdmin(){

    const identity = JSON.parse(

        localStorage.getItem("smartMosqueIdentity")

    );

    if(identity){

        const city=document.getElementById("cityName");

        if(city){

            const nama={
                "1639":"Tangerang Selatan",
                "1301":"Jakarta Selatan",
                "1206":"Depok",
                "1201":"Bogor",
                "1105":"Bekasi"
            };

            city.textContent=

                nama[identity.kota] ||

                "Belum dipilih";

        }

    }

}

// ======================================
// PERSIAPAN FITUR BERIKUTNYA
// ======================================
//
// v2.3
// - Upload Logo
// - Upload QRIS
// - Jadwal API
// - Mode Jumat
// - Pengaturan Durasi
//
// ======================================