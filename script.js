function jam(){

let sekarang=new Date();

document.getElementById("clock").innerHTML=

sekarang.toLocaleTimeString('id-ID');

document.getElementById("date").innerHTML=

sekarang.toLocaleDateString('id-ID',

{

weekday:'long',

day:'numeric',

month:'long',

year:'numeric'

});

}

setInterval(jam,1000);

jam();
