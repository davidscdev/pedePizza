let cart = []; //Array que registrará as pizzas no carrinho
let modalQt = 1;
let modalKey = 0;

//simplifica a seleção de elementos com o uso do c -> querySelector e cs -> All
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); // Cria um elemento igual ao pizza-item que está dentro da div models (essa tá hdden).

    //Carregando os itens do jSON para a tela.
    pizzaItem.setAttribute('data-key', index); //Seta o indice da pizza pra passar para o modal.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        console.log(pizzaJson[key]);

        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, index) => {

            if (index == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[index];
        });


        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${ pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => c('.pizzaWindowArea').style.opacity = 1, 200);
        console.log(`Clicou na pizza de ${key}.`);
    });

    c('.pizza-area').append(pizzaItem); //Coloca esse elemento que acabou de ser criado e coloca na div pizza-area.

    console.log(item.name);
});


// Funções para tratar dentro do modal
function closeModal() {
    c('.pizzaWindowArea').style.display = 'none';
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((element) => {
    element.addEventListener('click', closeModal);
});

//Trata os botões de qtd de pizzas no modal
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

//Criando a funcionalidade de click nos botões de tamanho de pizza.
cs('.pizzaInfo--size').forEach((size, index) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//Funcionalidade do botão adicionar pizza ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {

    let selectSize = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')); //Seleciona o tamanho.

    let identifier = pizzaJson[modalKey].id + '@' + selectSize; // Cria um identificador para saber se já existe no carrinho o mesmo sabor e tamanho selecioado.

    let chave = cart.findIndex((item) => item.identifier == identifier);

    if (chave > -1) {
        cart[chave].qtd += modalQt;
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            size: selectSize,
            qtd: modalQt
        });
    }
    closeModal();
    updateCart();
})

function updateCart() {
    if (cart.length > 0) {
        c('aside').classList.add('show'); //Adiciona a classe que mostra o carrinho.
        c('.cart').innerHTML = ''; //Limpa o carrinho antes de atualizar.

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            let cartItem = c('.models .cart--item').cloneNode(true); //Copia a estrutura da pizza no carrinho.

            let size;
            switch (cart[i].size) {
                case 0:
                    size = 'P';
                    break;
                case 1:
                    size = 'M';
                    break;
                case 2:
                    size = 'G';
                    break;
            }
            let nameAndSize = `${pizzaItem.name} (${size})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = nameAndSize;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;

            c('.cart').append(cartItem); //Adiciona uma estrutura de pizza ao carrinho.
            console.log(pizzaItem);
        }
    } else {
        c('aside').classList.remove('show');
    }
}