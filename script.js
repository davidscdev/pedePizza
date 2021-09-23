//simplifica a seleção de elementos com o uso do c -> querySelector e cs -> All
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); // Cria um elemento igual ao pizza-item que está dentro da div models (essa tá hdden).

    //Carregando os itens do jSON para a tela.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    c('.pizza-area').append(pizzaItem); //Coloca esse elemento que acabou de ser criado e coloca na div pizza-area.

    console.log(item.name);
});