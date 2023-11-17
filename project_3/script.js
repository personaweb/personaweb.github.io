// goal  

let s_toko = "";
let s_buffer_input = "";

let s_jumlah = 0;
let s_jumlah2= [0,0,0,0,0,0,0,0];


function total_update (total_rupiah){
    const element = document.getElementById("total_rupiah");
    // console.log (element.innerText);
    element.innerText = "TOTAL = " + total_rupiah;
}

function update_list_detail(){
    const element = document.getElementById("list_detail");
    element.appendChild()
}

function f_button(input){
    if (input < 10) += s_buffer_input;
    if (input == 10) clear();
    if (input == 11) ok(); 
}

function clear(){
    console.log ("clear")
}

function ok(){
    console.log ("ok")
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
