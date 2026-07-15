// =======================================
// SMART MOSQUE DISPLAY
// API MYQURAN
// =======================================

const API_URL = "https://api.myquran.com/v2/sholat";

// =======================================
// FORMAT TANGGAL
// =======================================

function getToday(){

    const now = new Date();

    const y = now.getFullYear();

    const m = String(now.getMonth()+1).padStart(2,"0");

    const d = String(now.getDate()).padStart(2,"0");

    return `${y}-${m}-${d}`;

}

// =======================================
// LOAD JADWAL SHOLAT
// =======================================

async function loadPrayerAPI(){

    try{

        const response = await fetch(

            `${API_URL}/jadwal/${CONFIG.cityID}/${getToday()}`

        );

        const result = await response.json();

        if(result.status){

            updatePrayerSchedule(result.data.jadwal);

        }

    }catch(error){

        console.log("API Error :",error);

    }

}

// =======================================
// UPDATE HTML
// =======================================

function updatePrayerSchedule(jadwal){

    const data={

        Imsak:jadwal.imsak,

        Subuh:jadwal.subuh,

        Syuruq:jadwal.terbit,

        Dzuhur:jadwal.dzuhur,

        Ashar:jadwal.ashar,

        Maghrib:jadwal.maghrib,

        Isya:jadwal.isya

    };

    document.querySelectorAll(".prayer-item").forEach(item=>{

        const nama=item.querySelector("span").textContent.trim();

        if(data[nama]){

            item.querySelector("strong").textContent=data[nama];

        }

    });

}

// =======================================
// START
// =======================================

loadPrayerAPI();