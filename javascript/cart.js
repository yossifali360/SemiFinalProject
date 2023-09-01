let shoppingcartData = JSON.parse(localStorage.getItem("cart"))
const cartsCtn = document.querySelector(".cartsCtn")
const totalPrice = document.querySelector(".totalPrice")
let WishlistData = JSON.parse(localStorage.getItem("Wishlist")) ?? [];
shoppingcartData.forEach(cart => {
    cartsCtn.innerHTML+= loadCarts(cart)
});
const plus = document.querySelectorAll(".fa-plus")
const minus = document.querySelectorAll(".fa-minus")
const remove = document.querySelectorAll(".fa-trash")
const heart  = document.querySelectorAll(".cartHeart")
plus.forEach(sign => {
    sign.addEventListener("click",function(){
        const parent = sign.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = shoppingcartData.find((cart) => cart.id == cartId);
        productObject.quantity++;
        const quantity = parent.querySelector(".count")
        console.log(quantity);
        let currentQuantity = parseInt(quantity.innerHTML);
        let newQuantity = currentQuantity + 1;
        quantity.innerHTML = newQuantity;
        localStorage.setItem("cart", JSON.stringify(shoppingcartData));
        CalcTotal()
        Toast.fire({
            icon: "success",
            title: `Quantity increased ,  Current quantity is ${newQuantity}`,
        });
    })
});
minus.forEach(sign => {
    sign.addEventListener("click",function(){
        const parent = sign.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = shoppingcartData.find((cart) => cart.id == cartId);
        const quantity = parent.querySelector(".count")
        let currentQuantity = parseInt(quantity.textContent);
        if(currentQuantity > 1){
            productObject.quantity--;
            let newQuantity = currentQuantity - 1;
            quantity.innerHTML = newQuantity;
            localStorage.setItem("cart", JSON.stringify(shoppingcartData));
            CalcTotal()
            Toast.fire({
                icon: "success",
                title: `Quantity decresed , Current quantity is ${newQuantity}`,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: `Quantity cannot be less Than 1`,
            });
        }
    })
});
remove.forEach(icon => {
    icon.addEventListener("click",function(){
        const parent = icon.closest(".itemCtn");
        let cartId = parent.dataset.id;
        shoppingcartData = shoppingcartData.filter((cart) => cart.id != cartId);
        parent.remove();
        localStorage.setItem("cart", JSON.stringify(shoppingcartData));
        CalcTotal();
        Toast.fire({
            icon: "success",
            title: `Product Removed Successfuly`,
        });
    })
});
heart.forEach(icon => {
    icon.addEventListener("click",function(){
        const parent = icon.closest(".itemCtn");
        let cartId = parent.dataset.id;
        let productObject = getProductsData().find((product) => product.id == cartId);
        let searchProduct = WishlistData.find((cart) => cart.id == cartId);
        success(productObject.images[0], productObject.title, "Added To Wishlist Successfully");
        if (searchProduct == undefined) {
            WishlistData.push(productObject);
        }
        WishListCount.textContent=WishlistData.length
        localStorage.setItem("Wishlist", JSON.stringify(WishlistData));
        loadWishlist()
    })
});
import { WishListCount , success , loadWishlist} from './global.js';

function loadCarts(cart){
    return`<div class="itemCtn" data-id="${cart.id}">
    <div class="item d-flex align-items-center justify-content-between flex-column flex-sm-row">
        <div class="d-flex align-items-center gap-4">
            <img src="${cart.images[0]}" alt="" class="rounded-4 pr-2">
            <div class="info">
                <h6 class="text-info">${cart.title}</h6>
                <div class="brand px-1">${cart.category} , ${cart.Brand}</div>
                <i class="fa-solid fa-trash bg-primary text-white rounded-2 my-2"></i>
                <i class="fas fa-heart bg-danger text-white rounded-2 my-2 cartHeart"></i>
            </div>
        </div>
        <div class="quantityCtn d-flex align-items-center justify-content-between d-sm-block px-4">
            <div class="quantity p-2  d-flex bg-secondary-subtle rounded-2">
                <i class="fas fa-plus rounded-1 bg-primary text-white"></i>
                <span class="count px-4">${cart.quantity}</span>
                <i class="fas fa-minus rounded-1 bg-primary text-white"></i>
            </div>
            <div class="itemsPrice text-muted text-center">
                ${cart.price.toLocaleString('en-US')} EGP
            </div>
        </div>
    </div>
    <hr  class="mx-5">
</div>`
}
// Get Products Data Function
function getProductsData() {
	return JSON.parse(localStorage.getItem("products"));
}
CalcTotal()
function CalcTotal(){
    let total = 0;
    shoppingcartData.forEach(item => {
        total += item.price * item.quantity
        totalPrice.innerHTML= total.toLocaleString('en-US');
    });
    if (shoppingcartData.length == 0){
        totalPrice.innerHTML= 0;
    }
}