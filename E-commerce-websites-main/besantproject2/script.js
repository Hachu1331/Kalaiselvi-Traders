 // cart function
 const btnCart=document.querySelector('#cart');
 const cart=document.querySelector('.cart2');
 const btnClose=document.querySelector('.cart-close');
 
 
 btnCart.addEventListener('click',()=>{
 cart.classList.add('cart-active');
 });
  

 btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
  });


  //delete function
  document.addEventListener('DOMContentLoaded',loadFood);
function loadFood() {
  loadContent();
}

function loadContent() {
 //remove item from cart
 let btnRemove=document.querySelectorAll('.cart-remove');
 btnRemove.forEach((btn)=>{
  btn.addEventListener('click',removeItem)
 });
  

 // product item quntity event
 let qtyElements=document.querySelectorAll('.cart-quantity')
 qtyElements.forEach((input)=>{
  input.addEventListener('change',changeQty);
 });

 //product cart
 let cartBtns=document.querySelectorAll('.add-cart');
 cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
 });

 updateTotal();
}
 
//remove item
function removeItem(){
  if(confirm('Are you sure to remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
  this.parentElement.remove(); 
  loadContent();   
}
}

//change quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart() {
    let oil=this.parentElement;
    let title = oil.querySelector('.oil-title').innerHTML;
    let price=oil.querySelector('.oil-price').innerHTML;
    let imgsrc=oil.querySelector('.oil-img').src;
   // console.log(title,price,imgsrc);


   let newProduct={title,price,imgsrc}

   //Check Product already in cart or not

   if (itemList.find((el)=>el.title==newProduct.title))
   {
    alert("Product Already added in Cart");
    return;
   }else{
    itemList.push(newProduct);
   }

   let newProductElement=createCartProduct(title,price,imgsrc);
   let element=document.createElement('div');
   element.innerHTML=newProductElement;
   let cartBasket=document.querySelector('.cart-content');
   cartBasket.append(element);
   loadContent();
} 

function createCartProduct(title,price,imgsrc){
  return `
  <div class="cart-box">
  <img src="${imgsrc}" class="cart-image"/>
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-quantity"/>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill cart-remove" viewBox="0 0 16 16">
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
  </svg>
</div>
  `
}
   
// addtion in cart 
function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
  });

  totalValue.innerHTML='Rs.'+total;


  // product count in cart

  const cartCount=document.querySelector('.quantity');
  let count=itemList.length;
  cartCount.innerHTML=count;
}

  