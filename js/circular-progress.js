let radio = document.querySelector('.score__progress').r.baseVal.value;
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
        barra.style.strokeDasharray = `${circunferencia} ${circunferencia}`;
        barra.style.strokeDashoffset = circunferencia;
        
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


const reviews = document.getElementById('reviews');

const options={
    root: null,
    rootMargin: '0px',
    threshold: 0.25
}

const observerCallback = (entries, observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            incrementarValor(circulos, 0.1, 2000, 10);
            observer.unobserve(entry.target);
        }
    });
    
}


let observer = new IntersectionObserver(observerCallback, options);


observer.observe(reviews);