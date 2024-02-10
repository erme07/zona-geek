const slider= document.getElementById("slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let contador=0,position=0, positionBg=0;

const obtenerAnchoSlide = (data) => {
    let ancho = document.querySelector(".block-4__item").offsetWidth;
    ancho = parseInt(data.getPropertyValue('gap'), 10) + ancho;
    return ancho;
}

const numeroSlides = (data) => {
    if(data.getPropertyValue('width') === "720px")
        return 5;
    if(data.getPropertyValue('width') === "520px")
        return 3;
    if(data.getPropertyValue('width') === "285px")
        return 2;
    if(data.getPropertyValue('width') === "260px")
        return 1;
}

const anchoBackground = (data) => {
    if(data.getPropertyValue('width') === "720px")
        return 144;
    if(data.getPropertyValue('width') === "520px")
        return 173.3333333;
    if(data.getPropertyValue('width') === "285px")
        return 142.5;
    if(data.getPropertyValue('width') === "260px")
        return 260;
}

const nextSlide = () => {
    if (contador == 0) 
        return;
    let slider_data = getComputedStyle(slider);
    prev.classList.remove("blocked");
    contador--;
    position += obtenerAnchoSlide(slider_data);
    positionBg += anchoBackground(slider_data);
    slider.style.setProperty('--positionBackground', positionBg + 'px')
    slider.style.setProperty('--positionSlide', position + 'px')
    if (contador == 0) 
        next.classList.add("blocked");
}
const prevSlide = () => {
    let slider_data = getComputedStyle(slider);
    if (contador >= slider.childElementCount - numeroSlides(slider_data)) 
        return;
    next.classList.remove("blocked");
    position -= obtenerAnchoSlide(slider_data);
    positionBg -= anchoBackground(slider_data);
    slider.style.setProperty('--positionBackground', positionBg + 'px')
    slider.style.setProperty('--positionSlide', position + 'px')
    contador++;
    if (contador >= slider.childElementCount - numeroSlides(slider_data)) 
        prev.classList.add("blocked");
}

document.addEventListener("click", (e) =>{
    if (e.target.id === "prev" || e.target.matches('.prev *')) {
        prevSlide();
    }
    else if (e.target.id === "next" || e.target.matches('.next *')) {
        nextSlide();
    }
})