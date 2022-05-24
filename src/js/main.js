const iframe = document.querySelector("iframe"),
html5Area = document.querySelector("#html5"),
cssArea = document.querySelector("#css3"),
jsArea = document.querySelector("#javascript"),
style = document.createElement("style"),
js = document.createElement("script"),
runBtn = document.querySelector(".run"),
saveBtn = document.querySelector(".save"),
iframeHeadTag = iframe.contentWindow.document.querySelector("head"),
selectArea = document.querySelector("#history"),
iframeBodyTag = iframe.contentWindow.document.querySelector("body"),
editorArea = document.querySelector(".editor"),
minimizeBtn = document.querySelector(".min");
let recordName;

function render(){
    iframeHeadTag.appendChild(style);
    iframeHeadTag.firstElementChild.textContent = cssArea.value;
    iframeBodyTag.innerHTML = html5Area.value + `<script>${jsArea.value}</script>`;
}

runBtn.addEventListener("click",render)

function getData(){
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i) !== "anonymous"){
            selectArea.innerHTML += `<option>${localStorage.key(i)}</option>`;
        }
    }
}

saveBtn.addEventListener("click",function(){
    if(html5Area.value.length > 0 || cssArea.value.length > 0 || jsArea.value.length > 0){
        let arr = [];
        arr.push(html5Area.value,cssArea.value,jsArea.value);
        recordName = prompt("Lütfen kayıt adı giriniz");
        localStorage.setItem(recordName,JSON.stringify(arr));
        getData();
    }else {
        alert("İçerik giriniz.")
    }
})

selectArea.addEventListener("change",function(e){
    let currentData = JSON.parse(localStorage.getItem(e.target.value));
    if(Array.isArray(currentData)){
        html5Area.value = currentData[0];
        cssArea.value = currentData[1];
        jsArea.value = currentData[2];
        render();
    }
})

minimizeBtn.addEventListener("click", () => {
    if(minimizeBtn.innerText === "Minimize") {
        editorArea.style.height = "200px";
        minimizeBtn.innerText = "Maximize";
        iframe.style.height = "700px";
    }else {
        minimizeBtn.innerText = "Minimize"
        iframe.style.height = "500px";
        editorArea.style.height = "350px";
    }
})

window.addEventListener("load", () => {
    getData();
    jsArea.value = JSON.parse(localStorage.getItem("anonymous")).js;
    cssArea.value = JSON.parse(localStorage.getItem("anonymous")).css;
    html5Area.value = JSON.parse(localStorage.getItem("anonymous")).html;
});

[html5Area,cssArea,jsArea].forEach(item => {
    item.addEventListener("blur",function(){
        localStorage.setItem("anonymous",JSON.stringify({js:jsArea.value,css:cssArea.value,html:html5Area.value}));
    })
})

document.addEventListener("keydown",function(e) {
    if (e.ctrlKey && e.keyCode === 83) {
        render();
    }
});