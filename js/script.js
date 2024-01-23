const navBar = document.querySelector(".nav")
const navLogo= document.querySelector(".nav__logo");
const slider= document.getElementById("slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const buttonTop = document.querySelector('.button-top');


let posicionY = 0;
let navbarOffset = document.querySelector('.header').offsetHeight;
let navBarHeight = navBar.offsetHeight;

const showButton = () => {
    if (window.scrollY > 400) {
        buttonTop.classList.add("button-top--show")
    } else {
        buttonTop.classList.remove("button-top--show")
    }
}
buttonTop.addEventListener('click', () =>window.scrollTo(0, 0))

const posicionarNavBar = () => {
    if (posicionY > scrollY && scrollY > navbarOffset + navBarHeight)
        //subiendo
        navBar.classList.add('nav--show');
    else if (posicionY > scrollY && scrollY < navbarOffset) {
        //subiendo y se pasa del navbar
        navBar.classList.remove('nav--show');
        navLogo.classList.remove('nav__logo--show');
    }
    else if (posicionY < scrollY && scrollY > navbarOffset + navBarHeight) {
        //bajando y se pasa del navbar
        navLogo.classList.add('nav__logo--show');
        navBar.classList.remove('nav--show');
    }
    else if(posicionY < scrollY)
        //bajando
        navBar.classList.remove('nav--show');
    posicionY = scrollY;
}


document.addEventListener('scroll', () => {
    showButton();
    posicionarNavBar();
})

//::::::::::::::::::  Slider ::::::::::::::::::::::::

let contador=0,position=0, positionBg=0;
for(i=5;i<slider.childElementCount;i++){
    slider.children[i].classList.toggle("hidden");
}

next.addEventListener('click', ()=>{
    if(contador==0) return;
    prev.classList.remove("blocked");
    contador--;
    position += 143;
    positionBg += 142;
    slider.children[contador].classList.toggle("hidden");
    slider.children[5+contador].classList.toggle("hidden");
    slider.style.setProperty('--positionBackground', positionBg+'px')
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
    position -= 143;
    positionBg -= 142;
    slider.style.setProperty('--positionBackground', positionBg+'px')
    //document.querySelectorAll(".block-4__item").style.setProperty('--positionSlide',position+'px')
    Array.from(slider.children).forEach(e => {
        e.style.setProperty('--positionSlide',position+'px')
    });
    contador++;
    if(contador>=slider.childElementCount-5) prev.classList.add("blocked");
})

let radio = document.querySelector('.score__progress').r.baseVal.value;
let cincoprogreso = 9.425;
let circunferencia = 2 * Math.PI * radio;
let progreso = 95;

let strokeDashoffset = circunferencia * (1 - progreso / 100);
console.log(strokeDashoffset)

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


let elemento = document.getElementById('prueba');
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
    threshold: 0.5 // Detecta cuando el 50% del elemento es visible
});

// Inicia la observación del elemento
observer.observe(elemento);