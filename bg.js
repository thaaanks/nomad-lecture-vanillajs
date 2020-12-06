const body = document.querySelector("body");
const IMG_NumBER = 4;

function handleImgLoad(){

}
function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NumBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();