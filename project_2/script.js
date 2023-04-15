// validasi input no telepon 
// validasi input nama dan no telepon 

const soal = ["definisi satu adalah"," ____ ", "dimana kedua adalah"," ____ ","dan ketiga itu", "____"]
const opsi = ["jawaban 1","dua","jawaban 2","jawaban 3","lima","enam","Tujuh"]
const kunci = [0,2,3]

let last=0

function test () {

    buatSoal(soal)
    buatButtonOpsi()
    buatButtonIsian()
}

function lanjut(){
    console.log("NextLevel")
}

function cekJawaban(){
    let isian = document.getElementsByClassName('buttonIsian')
    if (isian.length != kunci.length){
        console.log ("jawaban kurang")
    }
    else {
        let benar = 0
        for (let i = 0 ; i < isian.length ; i++){

            if (isian[i].textContent == opsi[kunci[i]]){
                console.log(`jawaban no ${i+1} benar`)
                isian[i].disabled = "true"
                benar += 1
            }
            else {
                console.log(`jawaban no ${i+1} salah`);
                isian[i].style.backgroundColor = "rgb(236, 111, 111)";
            }
            
        }
        if (benar == kunci.length){
            lanjut()
        }
    }
    
    
}

function buttonTerpilih(jenis,nomor){
    
    if (jenis == "isian"){
        
        let buttonsIsian = document.getElementsByClassName('buttonIsian')
        let buttonIsian = buttonsIsian[nomor]
        let text = buttonIsian.innerText

        buttonIsian.innerText = ""
        buttonIsian.style.display = "none"
        
        let buttonsOpsi = document.getElementsByClassName('buttonOpsi')
        let index = opsi.indexOf(text)
        let buttonOpsi = buttonsOpsi[index]

        buttonOpsi.disabled = false
        
        if (nomor < last){
            last = nomor
        }
        
        

    }

    if (jenis == "opsi"){
        let buttonsOpsi = document.getElementsByClassName('buttonOpsi')
        let buttonOpsi = buttonsOpsi[nomor]

        buttonOpsi.disabled = "true"

        let buttonsIsian = document.getElementsByClassName('buttonIsian')
        let buttonIsian = buttonsIsian[last]
        
        buttonIsian.innerText = opsi[nomor]
        buttonIsian.style.backgroundColor = "rgb(113, 243, 123)";
        buttonIsian.style.display = "block"
        
        last += 1
    }
}

function test2(){
    let hasil = opsi.indexOf("dua")
    console.log ("hasil")
    
    console.log (hasil)
}

function buatButtonOpsi(){
    let container = document.getElementById("divOpsi")
    let jumlah = opsi.length

    for ( let i = 0 ; i < jumlah ; i++){
        
        let button = document.createElement('button')
        
        button.className = "buttonOpsi"
        button.innerText = opsi[i]
        
        button.onclick = function(){buttonTerpilih("opsi",i)}
    
        container.appendChild(button)
    }
}

function updateButton(index, isi){
    let buttons = document.getElementsByClassName('buttonIsian')
    let button = buttons[index]
    button.textContent = isi
    button.style.display="block"
}

function buatButtonIsian(){
    let isian = document.getElementsByClassName('isian')
    let jumlah = isian.length
    let isi = ""    

    for (let i = 0;i < jumlah; i++){
        
        let rect = isian[i].getBoundingClientRect()
        
        let posX = rect.x
        let posY = rect.y
        let lebar = rect.width
        let tinggi = rect.height

        let button = document.createElement('button')

        button.className = "buttonIsian"
        button.innerText = isi

        button.style.top = (posY - 7 ) + "px"
        button.style.left = (posX - 10) + "px"
        // button.style.width = (lebar + 10)  + "px"
        // button.style.height = (tinggi/2) + "px"

        button.style.display = "none"
        button.onclick = function(){buttonTerpilih("isian",i)}

        document.body.appendChild(button)
    }

}

function buatSoal (){
    
    let container = document.getElementById("divSoal")
    let content = ""
    
    for (let i = 0 ; i < soal.length; i++){
        if (i%2 == 0){
            content+= `<p class="teks"> ${soal[i]} </p>`
        }
        else{
            content+= `<p class="isian"> ${soal[i]} </p>`
        }
    }
    container.innerHTML = content
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
