
export const sidebar = document.querySelector(".sidebar--sticky");
export const sidebar_content= document.querySelector(".sidebar__content--sticky");

let contentRect = sidebar_content.getBoundingClientRect();
let sidebarRect = sidebar.getBoundingClientRect();
let estilos = getComputedStyle(sidebar_content);


export const sidebarScrollUp = () =>{
    contentRect = sidebar_content.getBoundingClientRect();
    sidebarRect = sidebar.getBoundingClientRect();
    estilos = getComputedStyle(sidebar_content);
    if(estilos.position === "fixed" && estilos.bottom === "0px"){
        sidebar_content.style.position = "absolute";
        sidebar_content.style.bottom = "auto";
        sidebar_content.style.top = `${Math. abs(sidebarRect.top - contentRect.top)}px`;
    }
    if(contentRect.top>=20){
        sidebar_content.style.position = "sticky";
        sidebar_content.style.top = "20px";
        sidebar_content.style.bottom = "auto";
    }
}

export const sidebarScrollDown = () =>{
    contentRect = sidebar_content.getBoundingClientRect();
    sidebarRect = sidebar.getBoundingClientRect();
    estilos = getComputedStyle(sidebar_content);
    if(estilos.position === "sticky" && estilos.top === "20px"){
        sidebar_content.style.position = "absolute";
        sidebar_content.style.top = `${Math. abs(sidebarRect.top - contentRect.top)}px`;
        sidebar_content.style.bottom = "auto";
    }
    else if(contentRect.bottom + 35 >= sidebarRect.bottom){
        sidebar_content.style.position = "absolute";
        sidebar_content.style.top = "auto";
        sidebar_content.style.bottom = "0px";
    }
    else if(contentRect.bottom + 35 <= innerHeight && sidebarRect.bottom > innerHeight){
        sidebar_content.style.position = "fixed";
        sidebar_content.style.bottom = "0px";
        sidebar_content.style.top = "auto";
        sidebar_content.style.width = `${sidebarRect.width - 40}px`;
    }
}


export const initialPositionSidebar=()=>{
    if(contentRect.bottom + 35 <= innerHeight && sidebarRect.bottom > innerHeight){
        sidebar_content.style.position = "fixed";
        sidebar_content.style.bottom = "0px";
        sidebar_content.style.top = "auto";
        sidebar_content.style.width = `${sidebarRect.width - 40}px`;
    }
    else if(sidebarRect.bottom<=innerHeight){
        sidebar_content.style.position = "absolute";
        sidebar_content.style.top = "auto";
        sidebar_content.style.bottom = "0px";
    }
}