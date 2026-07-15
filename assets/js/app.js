// =======================================
// SMART MOSQUE DISPLAY v2.1
// APP.JS FINAL
// PART 1
// =======================================

// =======================================
// DEVELOPER MODE HELPER
// =======================================

function getCurrentDate(){

    if(
        typeof DEV_MODE !== "undefined" &&
        DEV_MODE &&
        DEV.forceFriday
    ){

        const fake = new Date();

        // Paksa menjadi hari Jumat
        fake.setDate(
            fake.getDate() +
            ((5 - fake.getDay() + 7) % 7)
        );

        return fake;

    }

    return new Date();

}

// =======================================
// DEV TIME
// =======================================

function getCurrentTime(){

    if(
        DEV_MODE &&
        DEV.forceTime !== ""
    ){

        return DEV.forceTime;

    }

    const now = getCurrentDate();

    const h = String(
        now.getHours()
    ).padStart(2,"0");

    const m = String(
        now.getMinutes()
    ).padStart(2,"0");

    return `${h}:${m}`;

}

// =======================================
// SETTINGS
// =======================================

const SETTINGS = {

    adzanDuration:20,

    iqomah:{
        Subuh:600,
        Dzuhur:600,
        Ashar:600,
        Maghrib:300,
        Isya:600
    },

    sholat:{
        Subuh:900,
        Dzuhur:600,
        Ashar:600,
        Maghrib:480,
        Isya:720
    }

};

// =======================================
// GLOBAL
// =======================================

let currentMode="dashboard";
let currentPrayer="";
let modeTimer=null;

// =======================================
// TANGGAL
// =======================================

function updateDateTime(){

    const now=new Date();

    document.getElementById("tanggalMasehi").textContent=
        new Intl.DateTimeFormat("id-ID",{

            weekday:"long",
            day:"2-digit",
            month:"long",
            year:"numeric"

        }).format(now);

    document.getElementById("tanggalHijriah").textContent=

        new Intl.DateTimeFormat("id-TN-u-ca-islamic",{

            day:"numeric",
            month:"long",
            year:"numeric"

        }).format(now);

}

updateDateTime();

setInterval(updateDateTime,60000);

// =======================================
// JAM DIGITAL
// =======================================

function updateClock(){

    const now=new Date();

    const h=String(now.getHours()).padStart(2,"0");

    const m=String(now.getMinutes()).padStart(2,"0");

    const s=String(now.getSeconds()).padStart(2,"0");

    document.getElementById("clock").textContent=

        `${h}:${m}:${s}`;

    const sholatClock=document.getElementById("sholatClock");

    if(sholatClock){

        sholatClock.textContent=`${h}:${m}:${s}`;

    }

}

updateClock();

setInterval(updateClock,1000);

// =======================================
// JADWAL SHOLAT
// =======================================

function getPrayerTimes(){

    return [...document.querySelectorAll(".prayer-item")].map(item=>{

        const name=item.querySelector("span").textContent.trim();

        const time=item.querySelector("strong").textContent.trim();

        const [hour,minute]=time.split(":").map(Number);

        return{

            name,
            hour,
            minute,
            element:item

        };

    });

}

// =======================================
// SHOLAT BERIKUTNYA
// =======================================

function updatePrayer(){

    const now=new Date();

    const prayers=getPrayerTimes();

    let nextPrayer=null;

    let target=null;

    for(const prayer of prayers){

        const t=new Date();

        t.setHours(

            prayer.hour,

            prayer.minute,

            0,

            0

        );

        if(now<t){

            nextPrayer=prayer;

            target=t;

            break;

        }

    }

    if(!nextPrayer){

        nextPrayer=prayers[0];

        target=new Date();

        target.setDate(target.getDate()+1);

        target.setHours(

            nextPrayer.hour,

            nextPrayer.minute,

            0,

            0

        );

    }

    document.getElementById("nextPrayer").textContent=

        nextPrayer.name;

    document.querySelectorAll(".prayer-item")

    .forEach(item=>{

        item.classList.remove("active");

    });

    nextPrayer.element.classList.add("active");

    let diff=target-now;

    const hh=Math.floor(diff/3600000);

    diff%=3600000;

    const mm=Math.floor(diff/60000);

    diff%=60000;

    const ss=Math.floor(diff/1000);

    document.getElementById("countdown").textContent=

        `${String(hh).padStart(2,"0")}:`+

        `${String(mm).padStart(2,"0")}:`+

        `${String(ss).padStart(2,"0")}`;

}

updatePrayer();

setInterval(updatePrayer,1000);

// =======================================
// APP.JS FINAL
// PART 2
// =======================================

// =======================================
// INFO MASJID SLIDER
// =======================================

let infoIndex = 0;

const infoSlides =
    document.querySelectorAll(".info-slide");

function updateInfoSlider(){

    if(infoSlides.length===0) return;

    infoSlides.forEach(slide=>{

        slide.classList.remove("active");

    });

    infoIndex++;

    if(infoIndex>=infoSlides.length){

        infoIndex=0;

    }

    infoSlides[infoIndex].classList.add("active");

}

setInterval(updateInfoSlider,5000);

// =======================================
// AYAT SLIDER
// =======================================

const ayatList=[

{
text:"Sesungguhnya shalat itu adalah kewajiban yang telah ditentukan waktunya atas orang-orang yang beriman.",
source:"QS. An-Nisa : 103"
},

{
text:"Dan dirikanlah shalat, tunaikanlah zakat, dan rukuklah bersama orang-orang yang rukuk.",
source:"QS. Al-Baqarah : 43"
},

{
text:"Peliharalah semua shalat(mu), dan shalat wustha.",
source:"QS. Al-Baqarah : 238"
},

{
text:"Sesungguhnya beruntunglah orang-orang yang khusyuk dalam shalatnya.",
source:"QS. Al-Mu'minun : 1-2"
}

];

let ayatIndex=0;

function updateAyat(){

    const ayat=document.getElementById("ayat");

    const sumber=document.querySelector(".ayat-card span");

    if(!ayat || !sumber) return;

    ayatIndex++;

    if(ayatIndex>=ayatList.length){

        ayatIndex=0;

    }

    ayat.textContent=
        ayatList[ayatIndex].text;

    sumber.textContent=
        ayatList[ayatIndex].source;

}

setInterval(updateAyat,20000);

// =======================================
// RUNNING TEXT
// =======================================

const runningMessages=[

"📢 Kajian Ahad Ba'da Subuh bersama Ustadz Ahmad.",

"📢 Santunan Yatim setiap tanggal 10 Muharram.",

"📢 Scan QRIS untuk Infaq Pembangunan Masjid.",

"📢 Mohon menonaktifkan nada dering ponsel saat berada di masjid."

];

let runningIndex=0;

function updateRunningText(){

    const running=
        document.querySelector(".running-content");

    if(!running) return;

    running.textContent=
        runningMessages[runningIndex];

    runningIndex++;

    if(runningIndex>=runningMessages.length){

        runningIndex=0;

    }

}

updateRunningText();

setInterval(updateRunningText,15000);

// =======================================
// AUDIO ADZAN
// =======================================

const adzanAudio=
document.getElementById("adzanAudio");

function playAdzan(){

    if(adzanAudio){

        adzanAudio.currentTime=0;

        adzanAudio.play().catch(()=>{});

    }

}

function stopAdzan(){

    if(adzanAudio){

        adzanAudio.pause();

        adzanAudio.currentTime=0;

    }

}

// =======================================
// SEMBUNYIKAN SEMUA MODE
// =======================================

function hideAllScreens(){

    document.getElementById("adzanScreen")
        ?.classList.remove("show");

    document.getElementById("iqomahScreen")
        ?.classList.remove("show");

    document.getElementById("sholatScreen")
        ?.classList.remove("show");

}

// =======================================
// DASHBOARD
// =======================================

function showDashboard(){

    currentMode="dashboard";

    hideAllScreens();

}

// =======================================
// APP.JS FINAL
// PART 3
// MODE ADZAN - IQOMAH - SHOLAT
// =======================================

// mencegah mode dijalankan berulang
let modeRunning = false;

// =======================================
// TAMPILKAN ADZAN
// =======================================

function showAdzan(prayer){

    currentMode = "adzan";

    currentPrayer = prayer;

    hideAllScreens();

    document
        .getElementById("adzanPrayer")
        .textContent = prayer;

    document
        .getElementById("adzanScreen")
        .classList.add("show");

}

// =======================================
// TAMPILKAN IQOMAH
// =======================================

function showIqomah(prayer){

    currentMode = "iqomah";

    hideAllScreens();

    document
        .getElementById("iqomahPrayer")
        .textContent = prayer;

    document
        .getElementById("iqomahScreen")
        .classList.add("show");

    startIqomah(prayer);

}

// =======================================
// TAMPILKAN MODE SHOLAT
// =======================================

function showSholat(){

    currentMode = "sholat";

    hideAllScreens();

    document
        .getElementById("sholatScreen")
        .classList.add("show");

}

// =======================================
// IQOMAH COUNTDOWN
// =======================================

function startIqomah(prayer){

    let seconds =
        SETTINGS.iqomah[prayer] || 600;

    const timer =
        document.getElementById("iqomahTimer");

    clearInterval(modeTimer);

    modeTimer = setInterval(()=>{

        const m =
            Math.floor(seconds/60);

        const s =
            seconds%60;

        timer.textContent =

            `${String(m).padStart(2,"0")}:`+

            `${String(s).padStart(2,"0")}`;

        seconds--;

        if(seconds < 0){

            clearInterval(modeTimer);

            showSholat();

            startSholatTimer(prayer);

        }

    },1000);

}

// =======================================
// DURASI SHOLAT
// =======================================

function startSholatTimer(prayer){

    let seconds =
        SETTINGS.sholat[prayer] || 600;

    clearInterval(modeTimer);

    modeTimer = setInterval(()=>{

        seconds--;

        if(seconds <= 0){

            clearInterval(modeTimer);

            modeRunning = false;

            showDashboard();

        }

    },1000);

}

// =======================================
// CEK MASUK WAKTU SHOLAT
// =======================================

function checkPrayerTime(){

    if(modeRunning) return;

    const now = getCurrentDate();

    const current = getCurrentTime();

    getPrayerTimes().forEach(prayer=>{

        const waktu =

            `${String(prayer.hour).padStart(2,"0")}:`+

            `${String(prayer.minute).padStart(2,"0")}`;

        if(current === waktu){

            modeRunning = true;

            showAdzan(prayer.name);

            setTimeout(()=>{

                stopAdzan();

                showIqomah(prayer.name);

            },SETTINGS.adzanDuration*1000);

        }

    });

}

// cek setiap detik
setInterval(checkPrayerTime,1000);

// =======================================
// APP.JS FINAL
// PART 4
// FINAL INITIALIZATION
// =======================================

// =======================================
// UPDATE TANGGAL PADA CARD TENGAH
// =======================================

function updateDateBoxes(){

    const now = getCurrentDate();

    const masehi = new Intl.DateTimeFormat("id-ID",{

        weekday:"long",
        day:"2-digit",
        month:"long",
        year:"numeric"

    }).format(now);

    const hijriah =

        new Intl.DateTimeFormat("id-TN-u-ca-islamic",{

            day:"numeric",
            month:"long",
            year:"numeric"

        }).format(now);

    const tanggalBox =
        document.getElementById("tanggalBox");

    const hijriahBox =
        document.getElementById("hijriahBox");

    if(tanggalBox){

        tanggalBox.textContent = masehi;

    }

    if(hijriahBox){

        hijriahBox.textContent = hijriah;

    }

}

updateDateBoxes();

setInterval(updateDateBoxes,60000);

// =======================================
// CEK ELEMENT HTML
// =======================================

function checkRequiredElements(){

    const ids=[

        "clock",
        "countdown",
        "nextPrayer",
        "tanggalMasehi",
        "tanggalHijriah",
        "tanggalBox",
        "hijriahBox",
        "adzanScreen",
        "iqomahScreen",
        "sholatScreen"

    ];

    ids.forEach(id=>{

        if(!document.getElementById(id)){

            console.warn(id+" tidak ditemukan");

        }

    });

}

checkRequiredElements();

// =======================================
// START DASHBOARD
// =======================================

document.addEventListener("DOMContentLoaded",()=>{

    showDashboard();

    updateClock();

    updateDateTime();

    updateDateBoxes();

    updatePrayer();

    console.log(

        "%cSmart Mosque Display v2.1 Ready",

        "color:#12945C;font-size:16px;font-weight:bold;"

    );

});

// =======================================
// FUTURE API
// =======================================

// fetchPrayerAPI();
// loadRunningText();
// loadInfoMasjid();
// loadAyat();
// syncCloud();

// =======================================
// END OF APP.JS
// =======================================

// =======================================
// LOAD IDENTITAS MASJID
// =======================================

function loadMasjidIdentity(){

    const data = JSON.parse(localStorage.getItem("smartMosqueIdentity"));

    if(!data) return;

    const title = document.getElementById("masjidTitle");
    const address = document.getElementById("masjidAddress");
    const logo = document.getElementById("masjidLogo");

    if(title && data.masjid){
        title.textContent = data.masjid;
    }

    if(address && data.alamat){
        address.textContent = data.alamat;
    }

    if(logo && data.logo){
        logo.src = data.logo;
    }

}

loadMasjidIdentity();

loadQris();

// ======================================
// LOAD IDENTITAS MASJID
// ======================================

function loadMasjidIdentity(){

    const data = JSON.parse(
        localStorage.getItem("smartMosqueIdentity")
    );

    if(!data) return;

    // Nama Masjid
    const title = document.getElementById("masjidTitle");

    if(title && data.masjid){

        title.textContent = data.masjid;

    }

    // Alamat
    const address = document.getElementById("masjidAddress");

    if(address && data.alamat){

        address.textContent = data.alamat;

    }

    // Logo
    const logo = document.getElementById("masjidLogo");

    if(logo && data.logo){

        logo.src = data.logo;

    }

}

// ======================================
// LOAD QRIS
// ======================================

function loadQris(){

    const qris = localStorage.getItem("smartMosqueQRIS");

    if(!qris) return;

    const img = document.getElementById("qrisImage");

    if(img){

        img.src = qris;

    }

}
