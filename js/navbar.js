
const $navBar = document.querySelector(".nav")
const $navLogo= document.querySelector(".nav__logo");
let navbarOffset = document.querySelector('.header').offsetHeight;
let navBarHeight = $navBar.offsetHeight;


export const navBarScrollUp = () => {
    if (scrollY > navbarOffset + navBarHeight)
            $navBar.classList.add('nav--show');
    else if (scrollY < navbarOffset) {
        //subiendo y se pasa del navbar
        $navBar.classList.remove('nav--show');
        $navLogo.classList.remove('nav__logo--show');
    }
    else if(scrollY === 0)
        $navBar.classList.remove('nav--show');
}

export const navBarScrollDown = () => {
    if (scrollY > navbarOffset + navBarHeight) {
        //bajando y se pasa del navbar
        $navLogo.classList.add('nav__logo--show');
        $navBar.classList.remove('nav--show');
    }
    else
        $navBar.classList.remove('nav--show');
}








