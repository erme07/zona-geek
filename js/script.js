const navBar = document.querySelector(".nav")
const navLogo= document.querySelector(".nav__logo");
const slider= document.getElementById("slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dark_switch= document.getElementById("dark-switch");
const buttonTop = document.querySelector(".button-top");


let posicionY = 0;
let navbarOffset = document.querySelector('.header').offsetHeight;
let navBarHeight = navBar.offsetHeight;

const showButton = () => {
    scrollY > 400 
    ? buttonTop.classList.add("button-top--show") 
    : buttonTop.classList.remove("button-top--show");
}


const posicionarNavBar = () => {
    if(posicionY > scrollY){
        //subiendo
        if (scrollY > navbarOffset + navBarHeight)
            navBar.classList.add('nav--show');
        else if (scrollY < navbarOffset) {
            //subiendo y se pasa del navbar
            navBar.classList.remove('nav--show');
            navLogo.classList.remove('nav__logo--show');
        }
        else if(scrollY === 0){
            navBar.classList.remove('nav--show');
        }
    }else{
        //bajando
        if (scrollY > navbarOffset + navBarHeight) {
            //bajando y se pasa del navbar
            navLogo.classList.add('nav__logo--show');
            navBar.classList.remove('nav--show');
        }
        else
            navBar.classList.remove('nav--show');
    }
    posicionY = scrollY;
}


document.addEventListener('scroll', () => {
    showButton();
    posicionarNavBar();
})

document.addEventListener("click", (e) =>{
    if(e.target.id === "menu_checkbox"){
        navBar.classList.toggle("nav__menu--show");
    }
    else if(e.target.id === "filter__button"){
        if (document.querySelector(".show-options"))
            document.querySelector(".show-options").classList.remove("show-options");
        e.target.parentElement.classList.toggle("show-options");
    }
    else if (e.target.id === "prev" || e.target.matches('.prev *')) {
        prevSlide();
    }
    else if (e.target.id === "next" || e.target.matches('.next *')) {
        nextSlide();
    }
    else if (document.querySelector(".show-options") && !e.target.matches(".filter__options *")){
        document.querySelector(".show-options").classList.remove("show-options");
    }
    else if(e.target.matches(".button-top") || e.target.matches(".button-top *")){
        window.scrollTo(0, 0);
    }
});

document.addEventListener("input", (e) =>{
    if (e.target.id === "dark-switch") {
        let mode = e.target.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", mode);
        localStorage.setItem('mode', mode);
    }
})

// if (localStorage.getItem('mode')) {
//     let mode = localStorage.getItem('mode');
//     if (mode === "dark") {
//         dark_switch.checked = true
//         // document.documentElement.setAttribute("data-theme", mode)
//     }
//     else {
//         dark_switch.checked = false;
//         // document.documentElement.setAttribute("data-theme", mode)
//     }
        
// }

//::::::::::::::::::  Slider ::::::::::::::::::::::::

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
    if(data.getPropertyValue('width') === "260px")
        return 1;
}

const anchoBackground = (data) => {
    if(data.getPropertyValue('width') === "720px")
        return 144;
    if(data.getPropertyValue('width') === "520px")
        return 173.3333333;
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






let radio = document.querySelector('.score__progress').r.baseVal.value;
let cincoprogreso = 9.425;
let circunferencia = 2 * Math.PI * radio;
let progreso = 95;

let strokeDashoffset = circunferencia * (1 - progreso / 100);

const circulos = Array.from(document.getElementsByClassName("score"));


const incrementarValor = (circulos, tasa, tiempoTotal, valorMaximo) => {
    circulos.forEach(circulo => {
        let elemento = circulo.children[1];
        let barra = circulo.children[2];
        let valorActual = 0.0;
        let valorFinal = parseFloat(elemento.getAttribute("data-number"));

        // Calcula la duración del intervalo en función del valor final
        let duracion = tiempoTotal / (valorFinal / tasa);

        let radio = barra.r.baseVal.value;
        let circunferencia = 2 * Math.PI * radio;
        let intervalo = setInterval(() => {
            valorActual += tasa;
            valorActual = Math.round(valorActual * 10) / 10; // Redondea a la décima más cercana
            if (valorActual <= valorFinal) {
                elemento.innerHTML = (valorActual === 10) 
                    ? elemento.innerHTML = Math.round(valorActual)
                    : elemento.innerHTML = valorActual.toFixed(1);
                let progreso = (valorActual / valorMaximo) * 100;
                let strokeDashoffset = circunferencia * (1 - progreso / 100);
                barra.style.strokeDashoffset = strokeDashoffset;
                // Calcula el tono en función del valor actual, pero resta 3 y limita a un mínimo de 0
                let tono = 120 * Math.max((valorActual - 2) / (valorMaximo - 2), 0); // 120 es verde en la escala HSL
                //let tono = 120 * (valorActual / valorMaximo); // 120 es verde en la escala HSL
                barra.style.stroke = `hsl(${tono}, 100%, 50%)`; // Saturación y luminosidad al 100% y 50% respectivamente
            } else {
                clearInterval(intervalo);
            }
        }, duracion);
    });
}


let resenias = document.getElementById('resenias');

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('El elemento es visible');
            // Puedes detener la observación si ya no la necesitas
            incrementarValor(circulos, 0.1, 2000, 10);
            observer.unobserve(entry.target);
        }
        // else {
        //     console.log('El elemento ya no es visible');
        // }
    });
}, {
    threshold: 0.2 // Detecta cuando el 20% del elemento es visible
});

// Inicia la observación del elemento
observer.observe(resenias);