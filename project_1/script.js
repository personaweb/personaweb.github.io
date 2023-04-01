// validasi input no telepon 
// validasi input nama dan no telepon 


const eNama = document.getElementById('nama')
const eTelepon = document.getElementById('telepon')
const ePesan = document.getElementById('pesan')


function button(nomor){
    
    // validasi input  
    if (nomor == 0){
        let nama = eNama.value
        let telepon = eTelepon.value
        
        if (nama == "" || telepon == ""){
            pesan("input belum terisi")
        }
        else {
            // lakukan fetching get (nama,telepon)
            pesan("pencarian dimulai ..")
            fetchLogin(nama,telepon)
            
        }   
    }

    // clear input
    if (nomor == 1){
        clear()
        console.log("di")
    }

     
}

function pesan (pesan){
    ePesan.innerText = pesan
}

function clear(){
    eNama.value =""
    eTelepon.value =""
    pesan("")
}

function buatRequest(nama,telepon){

    console.log("pesanan diproses")
    
    // fetch pesanan 
    fetch("https://script.google.com/macros/s/AKfycbx-RSvI6WBRyHCTUTReqLP8xmQxigH7Jk4hq1AtcGai69EP2uCvlrjLo5JI71E1nLVm/exec?nama="+ String(nama) + "&noTelp=" + String(telepon)
        
    ).then(response => {
        console.log(response);
        
    }).catch(err => {
        console.log("Error:" + err);
        
    });
}


async function fetchLogin(nama,telepon){
    
    const response = await fetch("https://script.google.com/macros/s/AKfycbx-RSvI6WBRyHCTUTReqLP8xmQxigH7Jk4hq1AtcGai69EP2uCvlrjLo5JI71E1nLVm/exec?nama="+ String(nama) + "&noTelp=" + String(telepon),{method: 'GET'});
    const data = await response.json();
    let hasil = JSON.parse(data)
    if (hasil == -1){
        pesan("id tidak ditemukan")
    }
    else{
        pesan("id adalah : " + hasil)
    }
    
  
    return hasil
}
