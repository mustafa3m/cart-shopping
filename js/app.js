const productElement = document.querySelector(".products");
const renderCartItemsElement = document.querySelector(".cartItems");
const renderSubTotalItemsElement = document.querySelector(".subtotal");
const totalItemElementInCart = document.querySelector(".totalItemsCart");
const removeElementInCart = document.querySelector(".delete");

//Scroll

const porductsListEl = document.querySelector(".productsList");
const seeMoreBtn = document.querySelector(".seeMoreBtn");

seeMoreBtn.addEventListener("click", () => {
  porductsListEl.scrollIntoView({ behavior: "smooth" });
});

// rendder products

displayProduct = () => {
  products.forEach((product) => {
    productElement.innerHTML += `
        
        <div class="item">
                <div class="itemContainer">
                    <div class="itemImg">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="addToWishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="addToCart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>

        
        `;
  });
};

displayProduct();
// cart array to save alle my items in  cart
let cart = [];

// ADD TO CART
addToCart = (id) => {
  if (
    cart.some((item) => {
      return item.id === id;
    })
  ) {
    //alert("product already exists in cart");
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => {
      return product.id === id;
    });

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  uppdateCart();
};

//update the cart
uppdateCart = () => {
  renderCartItems();
  renderSubTotalItems();
};

//  render the cart item

renderCartItems = () => {
  renderCartItemsElement.innerHTML = ""; // clear the element
  cart.forEach((item) => {
    renderCartItemsElement.innerHTML += `
    <div class="cartItem">
    
            <div class="itemInfo" >
              <img src="${item.imgSrc}" alt="${item.name}" />
              <h4>${item.name}</h4>
            </div>
            
            <div class="unitPrice"><small>$</small>${item.price}</div>
            
            <div class="units">
              <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
              <div class="number">${item.numberOfUnits}</div>
              <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
              <div class='delete' onclick='removeItemFromCart(${item.id})'><i class="fa fa-remove"></i></div>
            </div>
            
          </div>
    
    
    `;
  });
};

//change number of units for  an item
changeNumberOfUnits = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits: numberOfUnits,
    };
  });

  uppdateCart();
};

// calculate and render subtotal

renderSubTotalItems = () => {
  const summary = cart.reduce(
    (acc, val) => {
      //TotalPrice
      acc.totalPrice += val.price * val.numberOfUnits;
      //TotalItem
      acc.totalItem += val.numberOfUnits;
      return acc;
    },
    { totalPrice: 0, totalItem: 0 }
  );
  renderSubTotalItemsElement.innerHTML = `Subtotal ( ${
    summary.totalItem
  } items): $${summary.totalPrice.toFixed(2)}`;
  totalItemElementInCart.innerHTML = summary.totalItem;
};

// Remove item from cart
removeItemFromCart = (id) => {
  cart = cart.filter((item) => {
    return item.id !== id;
  });
  uppdateCart();
};



/* 
Handlekurven ved hjelpe av javascript 
 
Etter at vi fikk en oppgave om å lage en handlekurv, bestemte jeg 
meg for å lage et prosjekt om T-skjorter.   
 
Jeg bygget en shopping cart som bruker javascript . 
Jeg har et produkt som jeg setter opp med knappen. 
Den første t-skjorten er lagt opp på Handlekurven. 
Jeg kan trykke på knappen og inkrementer +  produktet og jeg kan 
dekrementer -  nummeret av enhet av produkt med knapen. 
Eks: 
Den totale summen av produserte enheter er: 500 dollar . 
Den totale summen av produktenes enhet er:  100 . 
Jeg kan slette produktene fra handlekurven med knapen «slett». 
 
Jeg har laget en funksjon som lar deg vise produktene våre. 
Jeg gjentar listen over produkter med forEach() metoden som lar oss 
returnere et nytt html element for hvert produkt i vår Array av 
objekter . 
Strukturen til produktene våre er en Array som inneholder objekter, 
hvor hvert objekt er et produkt. 
Jeg har laget en funksjon for å inkrementer og dekrementer 
Produktet.  
Jeg har laget en funksjon for å få den totale summen og det totalet 
elementet på produktene i handlekurven. 
Jeg har laget en funksjon for å slette produktene i handlekurven. 
 
Jeg har brukt onclick for legge produkter på cart Array i handlekurven 
med denne funksjon: 
onclick="addToCart(${product.id}) 
 
jeg har brukt onclick for å inkrementer og dekrementer produktene i 
handlekurven med denne funksjonen: 
onclick="changeNumberOfUnits('minus', ${item.id}) 
 
jeg har brukt onclick for å slette produktene i handlekurven med 
denne funksjonen: 
onclick='removeItemFromCart(${item.id}) 
 
 
 
 
 
Jeg lagde den totale summen, men en (loop for of) og det var veldig 
lett å finne resultatet med for loop, men jeg tenker å finne det 
samme resultatet med reduce metoden. 
Jeg fikk problemer med å lage den totale summen og det totale item 
produktet med reduce metoden, men etter hvert klarte jeg å finne 
resultatet.  
 
 
 
 


 
 
 
  
 





*/
