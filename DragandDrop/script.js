let upload = document.querySelector("#upload")
let button = document.querySelector(".hiddenButton")
let dropBox = document.querySelector(".dropBox")

let dataTable = document.querySelector(".dataTable")
let table = document.querySelector(".table");
let tbody = document.querySelector("tbody");
let fileNum = 0;
let rowNum = 1;


button.onclick=function(){
    upload.click();
}
upload.addEventListener("change", (e)=>{
    let files = Array.from(e.target.files)
    files.forEach(file =>{
        ShowImage(file);
        fileNum++;
    })
})

dropBox.addEventListener("dragenter", () => {
    dropBox.style.boxShadow = "8px 6px 6px -5px #136CC3"
    console.log("file has entered the our drop Box");
})
dropBox.addEventListener("dragleave", () => {})

dropBox.addEventListener("dragover",(e) =>{
    e.preventDefault();
})
dropBox.addEventListener("drop",(e) =>{
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
        ShowImage(file);
        fileNum++;
    }) 
})
function ShowImage(file){
    if(file.type !=="image/jpg" && file.type !=="image/jpeg" && file.type !=="image/png" ){
    alert("Please choose image file")
    return; 
}
    const fileReader = new FileReader(); 
    fileReader.readAsDataURL(file)
    fileReader.addEventListener("loadend", () => {
        let removeBtn = document.createElement("removeBtn")
        removeBtn.className = "remove"
        let removeIcon = document.createElement("i")
        removeIcon.className = "fas fa-trash-restore";
        removeBtn.append(removeIcon)

        let img = document.createElement("img") 
        img.src = fileReader.result 
        img.style.width = "80px" 
        // img.style.height = "50px"

        table.classList.remove("d-none")
        let tbody = document.createElement("tbody")
        table.appendChild(tbody)
        let tr = document.createElement("tr")
        tbody.appendChild(tr)
        let th = document.createElement("th")
        th.setAttribute("data", "row")
        th.innerHTML = rowNum
        rowNum++;

        
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        td1.append(img)
        td3.innerText = file.type
        td2.innerText = Math.round((file.size / 1024 ))
        td4.append(removeBtn)
        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        dataTable.appendChild(table)
        
        removeBtn.onclick = function(){
            if(fileNum > 1){
                let conf = confirm("Do you want to delete this file?")
                if(conf){
                    tr.remove();
                }
            }      
            else if (fileNum == 1){
                let conf =  confirm1("Do you want to delete last file?")
                if (conf) {
                    tr.remove();
                    fileNum--;
                    table.classList.add("d-none")
                }
            }
            else{
                tr.remove();
            }
        }
    }
    )

}
