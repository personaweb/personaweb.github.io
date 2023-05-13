let paket = []
let paket2 = []
let metaData = []
let last = 1
let level = 1
let panjangJawaban = 0

function test (){
    fetchJson()
    displayLoading(1)
    setTimeout(start,5000)
    // fetchJson()
}

function fetchVideoMeta(){
    const videoURL = paket["videoURL"]
    const url = `https://youtube.com/oembed?url=${videoURL}&format=json`
    console.log('fetching meta')

    fetch (url)
    .then((Response)=>{
        console.log("response")
        return Response.json()
    }).then((responseJson)=>{
        metaData = responseJson
    })
}

function displayLoading(display){
    const loadingPage = document.getElementById('loadingPage')
    if (display == true) {
        loadingPage.style.animation = 'loading1 2s'
    }
    else {
        loadingPage.style.zIndex = -100
        loadingPage.style.display = 'none'
    }
}

function start (){
    console.log("jalan1")
    fetchVideoMeta()
    displayLoading(0)

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

function displayJudulSoal(){
    const judulSoal = document.getElementById('judulSoal')
    judulSoal.innerText = paket['soal']["ayat"]
}

function displaySoal(){
    const divSoal = document.getElementById("soal")
    
    let teks = paket['soal']["teks"]
    let blank = paket['soal']["blank"]
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

function displayButtonOpsi(){

    const divOpsi = document.getElementById("opsi")
    let teksOpsi = paket['soal']["opsi"]
    
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
        component1.style.top = (blank[i].getBoundingClientRect().y - 7) + "px"
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
    let nomorOpsi = paket['soal']["opsi"].indexOf(text)

    const buttonOpsi = document.getElementsByClassName('buttonOpsi')
    buttonOpsi[nomorOpsi].disabled = false
}

function buttonText (button){
    return button.innerText
}

function cekJawaban(){
    let kunci = paket['soal']["kunci"]
    let opsi = paket['soal']["opsi"]

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
    let judul = "1 Menit"
    let konten = "judul, gambar, div click"
    const pageQuiz = document.getElementById("quizPage")
    const pagePenutup = document.getElementById("penutupPage")

    pageQuiz.style.display = 'none'
    pagePenutup.style.display = "flex"

    const divJudul = document.getElementById("judulPenutup")
    const divKonten = document.getElementById("konten")
    const imgKonten = document.getElementById("kontenImg")
    const divJudulVideo = document.getElementById("judulVideo")

    imgKonten.src = metaData['thumbnail_url']

    divKonten.style.display = "flex"
    divKonten.style.animation = 'keyframeAyat 1s forwards'

    divJudul.innerText = judul
    divJudul.style.display = "flex"

    divJudulVideo.innerText = metaData['title'] 
}

function openLinkYoutube (){
    console.log ("halo")
    const videoURL = paket['videoURL']
    window.open(videoURL)
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

    // fetch ("./test.json")
    fetch ("https://script.google.com/macros/s/AKfycbwoUsooSzvxwFfyal58fmBsdkjhvpz_H4tzMKPWSKxI94PMYEc4Y4ofPfjl_0LaJtK2bQ/exec")
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
