const hampurilaisvalikko = document.querySelector(".hampurilaisvalikko");
const navigointimenu = document.querySelector(".navigointimenu");

hampurilaisvalikko.addEventListener("click", () => {
    hampurilaisvalikko.classList.toggle("active");
    navigointimenu.classList.toggle("active");
})

document.querySelectorAll(".navigointilinkki").forEach(n => 
    n.addEventListener ("click", () => {
        hampurilaisvalikko.classList.remove("active");
        navigointimenu.classList.remove("active");

    }))