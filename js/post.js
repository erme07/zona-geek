const buttonTop = document.querySelector(".button-top");
let posicionY = 0;

import * as smart_sidebar from './smart_sidebar.js';
import * as nav_bar from './navbar.js';


document.addEventListener("click", (e) =>{
    if(e.target.id === "menu_checkbox"){
        document.querySelector(".nav").classList.toggle("nav__menu--show");
    }
    else if(e.target.id === "filter__button"){
        if (document.querySelector(".show-options"))
            document.querySelector(".show-options").classList.remove("show-options");
        e.target.parentElement.classList.toggle("show-options");
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

const showButton = () => {
    scrollY > 400
    ? buttonTop.classList.add("button-top--show")
    : buttonTop.classList.remove("button-top--show");
}

document.addEventListener('scroll', () => {
    showButton();
    scrollDirection();
    posicionY = scrollY;
})


const scrollDirection=()=>{
    if(posicionY > scrollY){
        //subiendo
        nav_bar.navBarScrollUp();
        smart_sidebar.sidebarScrollUp();
    }else{
        //bajando
        nav_bar.navBarScrollDown();
        smart_sidebar.sidebarScrollDown();
    }
}