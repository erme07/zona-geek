const navBar = document.querySelector(".nav")
const slider= document.getElementById("slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const buttonTop = document.querySelector('.button-top');

let previousPosition=0;
let positionNavScrollDown = navBar.offsetTop+navBar.offsetHeight
let positionNavScrollUp = navBar.offsetTop;

const showButton = () => {
    if (window.scrollY > 400) {
        buttonTop.classList.add("button-top--show")
    } else {
        buttonTop.classList.remove("button-top--show")
    }
}
buttonTop.addEventListener('click', () =>window.scrollTo(0, 0))

window.addEventListener("scroll", ()=>{
    showButton()
    const currentPosition = window.pageYOffset;
    if(currentPosition > previousPosition && currentPosition> positionNavScrollDown){
        //bajando
        navBar.classList.remove("nav--show");
    }   
    if(currentPosition < previousPosition){
        //subiendo
        if(currentPosition>positionNavScrollUp){
            navBar.classList.add("nav--show")
        }else{
            navBar.classList.remove("nav--show")
        }
    }
    previousPosition=currentPosition;
})


//::::::::::::::::::  Slider ::::::::::::::::::::::::

let contador=0,position=0;
for(i=5;i<slider.childElementCount;i++){
    slider.children[i].classList.toggle("hidden");
}

next.addEventListener('click', ()=>{
    if(contador==0) return;
    prev.classList.remove("blocked");
    contador--;
    position+=143;
    slider.children[contador].classList.toggle("hidden");
    slider.children[5+contador].classList.toggle("hidden");
    slider.style.setProperty('--positionBackground', position+'px')
    Array.from(slider.children).forEach(e => {
        e.style.setProperty('--positionSlide',position+'px')
    });
    if(contador==0) next.classList.add("blocked");
})
prev.addEventListener('click', ()=>{
    if(contador>=slider.childElementCount-5) return;
    next.classList.remove("blocked");
    slider.children[contador].classList.toggle("hidden");
    slider.children[5+contador].classList.toggle("hidden");
    position-=143;
    slider.style.setProperty('--positionBackground', position+'px')
    //document.querySelectorAll(".block-4__item").style.setProperty('--positionSlide',position+'px')
    Array.from(slider.children).forEach(e => {
        e.style.setProperty('--positionSlide',position+'px')
    });
    contador++;
    if(contador>=slider.childElementCount-5) prev.classList.add("blocked");
})


// Animcaion circular barra :::::::::::::
// window.onload=()=>{
//     let numero = document.getElementsByName("puntaje");
//     let count=5;
//     setInterval(() =>{
//         if(count<85){
//             count+=5;
//             if(count<51){
//                 numero[1].innerHTML=((count/10)).toFixed(1);
//             }
//             numero[0].innerHTML=((count/10)).toFixed(1);
//         }else{
//             clearInterval();
//         }
//     },100);
// }
