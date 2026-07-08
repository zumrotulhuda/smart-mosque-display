// =======================================
// SMART MOSQUE DISPLAY v2.0
// =======================================

// =======================================
// TANGGAL
// =======================================

function updateDateTime() {

    const now = new Date();

    const masehi = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(now);

    document.getElementById("tanggalMasehi").textContent = masehi;

    const hijriah = new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    document.getElementById("tanggalHijriah").textContent = hijriah + " H";

}

updateDateTime();
setInterval(updateDateTime,60000);


// =======================================
// JAM DIGITAL
// =======================================

function updateClock(){

    const now = new Date();

    const jam = String(now.getHours()).padStart(2,"0");
    const menit = String(now.getMinutes()).padStart(2,"0");
    const detik = String(now.getSeconds()).padStart(2,"0");

    document.getElementById("clock").textContent =
        `${jam}:${menit}:${detik}`;

}

updateClock();
setInterval(updateClock,1000);


// =======================================
// AMBIL JADWAL DARI SIDEBAR
// =======================================

function getPrayerTimes(){

    const items = document.querySelectorAll(".prayer-item");

    return [...items].map(item=>{

        const name = item.querySelector("span").textContent.trim();

        const time = item.querySelector("strong").textContent.trim();

        const [hour,minute] = time.split(":").map(Number);

        return{

            name,
            hour,
            minute,
            element:item

        };

    });

}


// =======================================
// UPDATE SHOLAT BERIKUTNYA
// =======================================

function updatePrayer(){

    const now = new Date();

    const prayers = getPrayerTimes();

    let nextPrayer = null;

    let target = null;

    for(const prayer of prayers){

        const prayerTime = new Date();

        prayerTime.setHours(prayer.hour,prayer.minute,0,0);

        if(now < prayerTime){

            nextPrayer = prayer;
            target = prayerTime;

            break;

        }

    }

    // Jika sudah lewat Isya
    if(!nextPrayer){

        nextPrayer = prayers[0];

        target = new Date();

        target.setDate(target.getDate()+1);

        target.setHours(
            nextPrayer.hour,
            nextPrayer.minute,
            0,
            0
        );

    }

    // =====================
    // Nama Sholat
    // =====================

    document.getElementById("nextPrayer").textContent =
        nextPrayer.name;

    // =====================
    // Highlight Sidebar
    // =====================

    document.querySelectorAll(".prayer-item").forEach(item=>{

        item.classList.remove("active");

    });

    nextPrayer.element.classList.add("active");

    // =====================
    // Countdown
    // =====================

    let diff = target - now;

    const jam = Math.floor(diff / 3600000);

    diff %= 3600000;

    const menit = Math.floor(diff / 60000);

    diff %= 60000;

    const detik = Math.floor(diff / 1000);

    document.getElementById("countdown").textContent =

        `${String(jam).padStart(2,"0")}:`+
        `${String(menit).padStart(2,"0")}:`+
        `${String(detik).padStart(2,"0")}`;

}

updatePrayer();

setInterval(updatePrayer,1000);