// ======================================
// CONFIG
// ======================================

const identity = JSON.parse(

    localStorage.getItem("smartMosqueIdentity")

);

const CONFIG = {

    cityID: identity?.kota || "1639"

};

// ======================================
// API MYQURAN
// ======================================

const API_BASE=

"https://api.myquran.com/v2/sholat";

// ======================================
// FORMAT TANGGAL
// ======================================

function getToday(){

    const d=new Date();

    const y=d.getFullYear();

    const m=String(

        d.getMonth()+1

    ).padStart(2,"0");

    const day=String(

        d.getDate()

    ).padStart(2,"0");

    return `${y}-${m}-${day}`;

}

// ======================================
// AMBIL API
// ======================================

async function loadPrayerAPI(){

    try{

        const url=

`${API_BASE}/jadwal/${CONFIG.cityID}/${getToday()}`;

        const res=

        await fetch(url);

        const json=

        await res.json();

        if(!json.status){

            return;

        }

        updatePrayerHTML(

            json.data.jadwal

        );

    }

    catch(err){

        console.log(err);

    }

}

// ======================================
// UPDATE HTML
// ======================================

function updatePrayerHTML(data){

    const prayerMap={

        Imsak:data.imsak,

        Subuh:data.subuh,

        Syuruq:data.terbit,

        Dzuhur:data.dzuhur,

        Ashar:data.ashar,

        Maghrib:data.maghrib,

        Isya:data.isya

    };

    document

    .querySelectorAll(".prayer-item")

    .forEach(item=>{

        const nama=

        item.querySelector("span")

        .textContent.trim();

        if(prayerMap[nama]){

            item.querySelector("strong")

            .textContent=

            prayerMap[nama];

        }

    });

}

loadPrayerAPI();