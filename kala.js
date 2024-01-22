const products = [
    {
id: 1,
name:"خرس قهوه ای",
price: 133,
Image:"./images/OIP-1.jpg",

    },
    {
        id: 2,
        name:"خرگوش",
        price: 160,
        Image:"./images/OIP-2.jpg",
    },
];
let cart = {
    items: [],
    total: 0,
};
const renderProducts = () => {
    const productDiv = document.querySelector(".products");
    productDiv.innerHTML = '';
    products.forEach((item, index) => {
        productDiv.innerHTML += 

        `
<div class="mr-24 mt-3">
     
        <img src="${item.Image} " class="w-64 h-64>
   
      <h3>${item.name}</h3></br>
    <h3 class="text-green-600"${item.price} تومان</h3></br>
    <button class="border border-solid-purple-500 bg-purple-700 rounded-md w-2/3 text-white onclick="addToCart(${index})">افزودن به سبد کالا</button>
    </div>
        ` ;
    });
};
const renderCartItems = () => {
    const cartDiv = document.querySelector(".cart-items");
    cartDiv.innerHTML = '';
    const totalPriceEl = document.querySelector('.cart__total-price')

  let totalPrice = 0

  if (cart.items.length === 0) {
    cartDiv.innerHTML = 'محصولی در سبد خرید وجود ندارد'
  }

cart.items.forEach((item) =>{
    totalPrice += item.total
    cartDiv.innerHTML += `
    <div class="flex flex-row-reverse justify-between w-2/4">
  <h3>${item.name}</h3>
  <h3 >${item.qty}</h3>
  <button class="border bg-red-600 text-white rounded-md w-16 onclick="removeFromCart('${item.name}">حذف</button>
</div>
    
    `
})
totalPriceEl.innerHTML = `مجموع: ${totalPrice} تومان`
}
const addToCart = (productIndex) => {
    const product = products[productIndex]
  
    let existingProduct = false
  
    let newCartItems = cart.items.reduce((state, item) => {
      if (item.name === product.name) {
        existingProduct = true
  
        const newItem = {
          ...item,
          qty: item.qty + 1,
          total: (item.qty + 1) * item.price,
        }
  
        return [...state, newItem]
      }
  
      return [...state, item]
    }, [])
    if (!existingProduct) {
        newCartItems.push({
          ...product,
          qty: 1,
          total: product.price,
        })
      }
    
      cart = {
        ...cart,
        items: newCartItems,
      }
    
      renderCartItems()
    }
    
    const removeFromCart = (productName) => {
      let newCartItems = cart.items.reduce((state, item) => {
        if (item.name === productName) {
          const newItem = {
            ...item,
            qty: item.qty - 1,
            total: (item.qty - 1) * item.price,
          }
    
          if (newItem.qty > 0) {
            return [...state, newItem]
          } else {
            return state
          }
        }
    
        return [...state, item]
      }, [])
    
      cart = {
        ...cart,
        items: newCartItems,
      }
    
      renderCartItems()
    }
    
    renderProducts()
    renderCartItems()