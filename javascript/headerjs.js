const hampurilaisvalikko = document.querySelector(".hampurilaisvalikko");
const navigointimenu = document.querySelector(".navigointimenu");
const hakupainikemobiili = document.querySelector(".hakupainike-mobiili");
const cancelBtn = document.querySelector(".cancel-btn");
const hakupalkki = document.querySelector(".hakupalkki");
const oikeaPuoli = document.querySelector(".oikea-puoli");


hampurilaisvalikko.addEventListener("click", () => {
    hampurilaisvalikko.classList.toggle("active");
    navigointimenu.classList.toggle("active");
    
})

document.querySelectorAll(".navigointilinkki").forEach(n => 
    n.addEventListener ("click", () => {
        hampurilaisvalikko.classList.remove("active");
        navigointimenu.classList.remove("active");
       


    }))

hakupainikemobiili.addEventListener("click", () => {
    hakupalkki.classList.add("active");
    oikeaPuoli.classList.add("hidden");    
    cancelBtn.classList.add("active");  
});

cancelBtn.addEventListener("click", () => {
 hakupalkki.classList.remove("active");
  oikeaPuoli.classList.remove("hidden");
  cancelBtn.classList.remove("active");
});