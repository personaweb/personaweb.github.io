// goal  

function test (){

    console.log(".test") 
    const button = document.createElement('button')
    button.className = "button1"

    const button2 = document.createElement('button')
    button.className = "button1"
    
    const button3 = document.createElement('button')
    button.className = "button1"
    
    const container = document.getElementById('container')
    container.appendChild(button)
    container.appendChild(button2)
    container.appendChild(button3)
    // container.appendChild(button2)
    // container.appendChild(button2)
    // container.appendChild(button2)

    // container.appendChild(button)


}



function fetchJson(){
    fetch ('./test.json')
    .then((reponse) => reponse.json())
    .then((json)=> {
        const teks = document.getElementById("teks")
        teks.innerText = json.soal
    })
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
