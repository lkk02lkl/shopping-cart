let shop = document.getElementById("shop");
let basket;


const loadBasketData = () => {
  return new Promise((resolve) => {
    basket = JSON.parse(localStorage.getItem("data")) || [];
    resolve();
  });
};


const initializePage = async () => {
  await loadBasketData(); 
  generateShop();
  calculation();
  updateQuantitiesAfterLoad();
};

const updateQuantitiesAfterLoad = () => {
  basket.forEach(item => {
    update(item.id);
  });
};

initializePage();

let generateShop = () => {
  shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((x) => x.id === id) || { item: 0 };

    return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="" onload="update(${id})"> 
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${search.item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(id);
  saveToLocalStorage();
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(id);
  basket = basket.filter((x) => x.item !== 0);
  saveToLocalStorage();
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

let saveToLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(basket));
};
