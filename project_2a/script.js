let paket = []
let last = 1
let panjangJawaban = 0

function test (){
    fetchJson()
    setTimeout(start,3000)
    // fetchJson()
}

function start (){
    console.log("jalan1")
    // displayJudulSoal(1)
    displaySoal(1)
    generateButtonJawaban()
    displayButtonOpsi(1)
    
    console.log("stop1")
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
        // component1.onclick = `opsiOnClick(${i})`
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
           console.log(i)
            last = i
        }
    }
    
    buttonJawaban[last-1].innerText = button[nomor].innerText
    buttonJawaban[last-1].style.display = 'flex'

}

function jawabanOnClick(nomor){

    const buttonJawaban = document.getElementsByClassName('buttonJawaban')
    buttonJawaban[nomor].style.display = 'none'
    
    let text = buttonJawaban[nomor].innerText
    let nomorOpsi = paket['soal'][nomor]["opsi"].indexOf(text)

    const buttonOpsi = document.getElementsByClassName('buttonOpsi')
    buttonOpsi[nomorOpsi].disabled = false
}

function buttonText (button){
    return button.innerText
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
