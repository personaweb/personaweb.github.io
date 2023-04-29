let paket = []
let last = 1
let level = 1
let panjangJawaban = 0

function test (){
    fetchJson()
    setTimeout(start,3000)
    // fetchJson()
}

function start (){
    console.log("jalan1")

    displayJudulSoal(1)
    displaySoal(1)
    displayButtonOpsi(1) 
    generateButtonJawaban()

    
    console.log("stop1")
}

function naikLevel(){
    displayPopup1(true)
    setTimeout(displayPopup1,2000)
    
    clearUI()

    level+=1;

    const panjangSoal = paket['soal'].length
    if (level <= panjangSoal){
        displayJudulSoal(level)
        displaySoal(level)
        displayButtonOpsi(level)
        generateButtonJawaban()
    }
    else {
        displayAyat()
    }
}

function clearUI(){
    const judul = document.getElementById("judulSoal")
    const soal = document.getElementById("soal")
    const opsi = document.getElementById("opsi")
    const jawaban = document.getElementById("jawaban")

    judul.innerHTML =''
    soal.innerHTML =''
    opsi.innerHTML =''
    jawaban.innerHTML =''

    last = 1
}

function displayJudulSoal(nomor){
    const judulSoal = document.getElementById('judulSoal')
    judulSoal.innerText = paket['soal'][nomor-1]["ayat"]
}

function displaySoal(nomor){
    const divSoal = document.getElementById("soal")
    
    let teks = paket['soal'][nomor-1]["teks"]
    let blank = paket['soal'][nomor-1]["blank"]
    panjangJawaban = blank.length

    for ( let i = 0; i < blank.length; i++){
        let component1 = document.createElement("div")
        component1.className = "text"
        component1.innerText = teks[i]

        let component2 = document.createElement("div")
        component2.className = "blank"
        component2.innerText = blank[i]

        divSoal.appendChild(component1)
        divSoal.appendChild(component2)
    }

    if (blank.length < teks.length){
        let component1 = document.createElement("div")
        component1.className = "text"
        component1.innerText = teks[teks.length-1]

        divSoal.appendChild(component1)
    }
    
}

function displayButtonOpsi(nomor){

    const divOpsi = document.getElementById("opsi")
    let teksOpsi = paket['soal'][nomor-1]["opsi"]
    
    for ( let i = 0; i < teksOpsi.length; i++){
    
        let component1 = document.createElement("button")
        component1.className = "buttonOpsi"
        component1.onclick = function(){opsiOnClick(i)}
        component1.innerText = teksOpsi[i]

        divOpsi.appendChild(component1)
    }
}

function generateButtonJawaban(){
    const divJawaban = document.getElementById("jawaban")
    let blank =  document.getElementsByClassName('blank')

    for ( let i = 0; i < blank.length; i++){
    
        let component1 = document.createElement("button")
        component1.className = "buttonJawaban"
        component1.innerText = 'a'
        component1.style.width = (blank[i].getBoundingClientRect().width - 5) + "px"
        component1.style.height = (blank[i].getBoundingClientRect().height) + "px"
        component1.style.position ='absolute'
        component1.style.top = (blank[i].getBoundingClientRect().y - 5) + "px"
        component1.style.left = (blank[i].getBoundingClientRect().x )  + "px"
        component1.onclick = function(){jawabanOnClick(i)}

        divJawaban.appendChild(component1)
    }
}

function opsiOnClick(nomor){

    const button = document.getElementsByClassName('buttonOpsi')
    button[nomor].disabled = true

    const buttonJawaban = document.getElementsByClassName('buttonJawaban')

    for (let i = buttonJawaban.length; i>0; i--){
        if (buttonJawaban[i-1].style.display != 'flex'){
            last = i
        }
    }
    
    buttonJawaban[last-1].innerText = button[nomor].innerText
    buttonJawaban[last-1].style.display = 'flex'
    buttonJawaban[last-1].style.animation = 'showJawaban 0.3s'

}

function jawabanOnClick(nomor){

    const buttonJawaban = document.getElementsByClassName('buttonJawaban')
    buttonJawaban[nomor].style.display = 'none'
    buttonJawaban[nomor].style.backgroundColor = "rgb(237, 243, 243)"
    
    let text = buttonJawaban[nomor].innerText
    let nomorOpsi = paket['soal'][level-1]["opsi"].indexOf(text)

    const buttonOpsi = document.getElementsByClassName('buttonOpsi')
    buttonOpsi[nomorOpsi].disabled = false
}

function buttonText (button){
    return button.innerText
}

function cekJawaban(nomor){
    let kunci = paket['soal'][level-1]["kunci"]
    let opsi = paket['soal'][level-1]["opsi"]

    const buttonJawaban = document.getElementsByClassName('buttonJawaban')

    let jawaban = []

    let jumlahKunci = kunci.length
    for (let i = 0; i<jumlahKunci; i++){    
        if (buttonJawaban[i].style.display == 'flex')
        {   
            jawaban.push(buttonJawaban[i].innerText)
        }  
    } 
    
    
    let jumlahJawaban = jawaban.length
    if (jumlahJawaban != jumlahKunci){
        displayPopup2(true)
        setTimeout(displayPopup2,2000)
    }
    else {
        let benar = 0
        for (let i = 0; i<jumlahKunci; i++){
           
            // jika benar
            if (opsi[kunci[i]] == jawaban[i]){
                buttonJawaban[i].disabled = true
                buttonJawaban[i].style.animation = 'benar 0.3s forwards'
                
                benar += 1
            }

            // jika salah 
            else{
                buttonJawaban[i].style.animation = 'salah 1s forwards'
            }

        } 
        if ( benar == jumlahKunci){
            console.log("nextlevev")
            naikLevel()
        } 
    } 
}

function displayPopup2(show=false){
    const div = document.getElementById("popup2")
    if (show){
        console.log("test1")
        div.style.zIndex = 152;
        div.style.display = 'flex'
    }
    else {
        div.style.zIndex = -100;
        div.style.display = 'none'
    }   
}

function displayAyat(){
    let ayat = paket['ayat tema'][0]
    let isiAyat = paket['ayat tema'][1]
    const pageQuiz = document.getElementById("quizPage")
    const pageAyat = document.getElementById("ayatPage")

    const divAyat = document.getElementById("ayat")
    const divIsiAyat = document.getElementById("isiAyat")

    pageQuiz.style.display = 'none'
    pageAyat.style.display = "flex"
    
    divIsiAyat.innerText = isiAyat
    divIsiAyat.style.display = "flex"
    divIsiAyat.style.animation = 'keyframeAyat 1s forwards'

    divAyat.innerText = ayat
    divAyat.style.display = "flex"
    // divAyat.style.animation = 'keyframeAyat 1s forwards'
    
}

function displayPopup1(show=false,textJudul='Benar !'){
    const div = document.getElementById("popup1")
    const judul = document.getElementById("judul")
    const isi = document.getElementById("isiPopup")

    const panjangSoal = paket['soal'].length

    if (show){
        judul.innerText = textJudul;
        isi.innerText = String(level)+'/'+String(panjangSoal)
        div.style.zIndex = 152;
        div.style.display = 'flex'
        div.style.animation = 'keyframePopup1 1s forwards'
    }
    else {
        div.style.zIndex = -100;
        div.style.display = 'none'
    }   
}

function fetchJson(){
    console.log('fetching')

    fetch ("./test.json")
    .then((Response)=>{
        return Response.json()
    })
    .then((hasil)=>{
        paket = hasil
        return hasil;
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
