//simplifica a seleção de elementos com o uso do c -> querySelector e cs -> All
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); // Cria um elemento igual ao pizza-item que está dentro da div models (essa tá hdden).

    c.('.pizza-area').append(pizzaItem); //Coloca esse elemento que acabou de ser criado e coloca na div pizza-area.
});