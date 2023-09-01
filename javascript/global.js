let productCards = document.querySelectorAll(".productCard");
const productCtn = document.querySelector(".productCtn");
const loadingIcon = document.querySelector(".loadingIcon");
const originalPrices = [];
// Wish List
		let WishlistData = JSON.parse(localStorage.getItem("Wishlist")) ?? [];
		const WishListCount = document.querySelector(".WishListCount");
		const wishList = document.querySelector(".wishListCtn");
		const wishListDetails = wishList.querySelector(".wishListCtn .details");
		const wishListIcon = document.querySelector(".wishListIcon");
		const wishListCtnCloseCart = document.querySelector(".wishListCtn .closeCart");
		let deleteFromWishList = document.querySelectorAll(".deleteFromWishList")
	// Shopping Cart
		const shoppingcartData = JSON.parse(localStorage.getItem("cart")) ?? [];
		const shoppingCart = document.querySelector(".shoppingCart");
		const shoppingCartDetails = shoppingCart.querySelector(".shoppingCart .details");
		const shoppingCartIcon = document.querySelector(".shoppingCartIcon");
		const shoppingCartCloseCart = document.querySelector(".shoppingCart .closeCart");
		let addToCartFromWishListBtn = document.querySelectorAll(".addToCartFromWishListBtn")

const cartCtn = document.querySelector(".cartCtn")
const cartCount = document.querySelector(".cartCount");
const shoppingcarts = document.querySelector(".carts");
const Wishes = document.querySelector(".Wishes");
let addToCartBtn = document.querySelectorAll(".addToCartBtn");
const currency = document.getElementById("currency");
const totalCartsPrice = document.querySelector(".totalCartsPrice");
let totalPrice = 0;
const menu = document.querySelector(".menu");
const userName = document.querySelector(".userName");
const userIcon = document.querySelector(".userImg");
const userImg = document.querySelector(".userImg img");
const navbarDropdown = document.getElementById("navbarDropdown");
const logoutBtn = document.querySelector(".logout");
let viewIcons = document.querySelectorAll(".viewIcon");
let heartIcons = document.querySelectorAll(".heartIcon");
// Invoke Startup Functions
checkLogin();
CheckUserImage();
logout(logoutBtn);
cartAndWishCount(shoppingcartData,cartCount);
cartAndWishCount(WishlistData,WishListCount);
loadShoppingCarts();
loadWishlist();
ShopAndWishClick(shoppingCart,shoppingCartDetails,shoppingCartIcon);
closeShopAndWish(shoppingCart,shoppingCartDetails,shoppingCartCloseCart);
ShopAndWishClick(wishList,wishListDetails,wishListIcon);
closeShopAndWish(wishList,wishListDetails,wishListCtnCloseCart);


document.addEventListener("DOMContentLoaded", function() {
	viewIconsFunction(viewIcons);
	heartIconFunction(heartIcons);
	changeCurrency(currency);
	storeOrginalPrice(productCards);
	addToCartBtn = document.querySelectorAll(".addToCartBtn")
	addToCart(addToCartBtn);
	checkWishList(productCards);
	SearchStock();
});


// Functions

// View Icons function
function viewIconsFunction(viewIcons){
	viewIcons = document.querySelectorAll(".viewIcon")
	viewIcons.forEach((icon) => {
		const parent = icon.closest(".productCard")
		const hiddenVeiw = parent.querySelector(".hiddenVeiw");
		productsIconsHover(icon,hiddenVeiw);
		icon.addEventListener("click", function () {
			const productId = icon.closest(".productCard").dataset.id;
			let productObject = getProductsData().find((product) => product.id == productId);
			loadingIcon.style.display = "block";
			loadShoppingCarts();
			setTimeout(() => {
				loadingIcon.style.display = "none";
				createProductOverlay(productObject)
			}, 2000);
		});
	});
}
// Heart Icons function
function heartIconFunction(heartIcons){
	heartIcons = document.querySelectorAll(".heartIcon")
	heartIcons.forEach((icon) => {
		const parent = icon.closest(".productCard");
		const hiddenHeart = parent.querySelector(".hiddenHeart");
		productsIconsHover(icon,hiddenHeart);
		icon.addEventListener("click", function () {
			if (hiddenHeart.textContent == "Remove from Wishlist"){
				const parent = icon.closest(".productCard");
				const productId = parent.dataset.id
				WishlistData = WishlistData.filter(item => item.id != productId);
				localStorage.setItem("Wishlist", JSON.stringify(WishlistData));
				hiddenHeart.textContent="Add to Wishlist";
				icon.style.animation = "";
				const iconI = icon.querySelector("i")
				iconI.style.color = "black";
				loadWishlist();
				cartAndWishCount(WishlistData,WishListCount);
				deleteFromWishListFunction()
				addToCartWish()
			}else{
				const iconCtn = icon.closest(".cardIcons");
				const view = iconCtn.querySelector(".viewIcon");
				heartClick(icon)
				addToWishList(icon)
				view.style.display = "none";
				iconCtn.style.backgroundColor = "transparent";
				hiddenHeart.textContent="Remove from Wishlist";
				cartAndWishCount(WishlistData,WishListCount);
				loadWishlist();
				deleteFromWishListFunction()
				addToCartWish()
				setTimeout(() => {
					heartClickDelay(icon)
					iconCtn.style.backgroundColor = "#fff";
					view.style.display = "block";
				}, 2900);
			}
		});
	});
}
// Shop And Wish Icons Click Function
function ShopAndWishClick(div,details,icon){
	icon.addEventListener("click",function(){
		div.classList.remove("d-none")
		div.classList.add("d-block")
		setTimeout(() => {
			details.style.right="0"
		}, 100);
	})
}
// Shop And Wish Close Icons Function
function closeShopAndWish(div,details,close){
	close.addEventListener("click",function(){
		details.style.right="-700px"
		setTimeout(() => {
			div.classList.add("d-none")
		}, 600);
	}) 
}
// Shop And Wish Counter
function cartAndWishCount(list,counter){
	if (list.length == 0){
		counter.style.display="none"
	}
	else{
		counter.style.display="block"
		counter.textContent=list.length
	}
}
// Add Acive Class To Images Function
function viewProductActiveImg(productOverlay) {
	const productViewMainImg = productOverlay.querySelector(".mainImg");
	const productViewImages = productOverlay.querySelectorAll(".pImage");
	productViewImages.forEach((item) => {
		item.addEventListener("click", function () {
			productViewMainImg.src = item.src;
			removeActive(productViewImages);
			item.classList.add("active");
		});
	});
}
// Remove Active Class From Images Function
function removeActive(imgs) {
	imgs.forEach(function (item) {
		item.classList.remove("active");
	});
}
// Products Icon Hover Function
function productsIconsHover(icon,hidden){
	icon.addEventListener("mouseover", function () {
		hidden.style.visibility = "visible";
	});
	icon.addEventListener("mouseout", function () {
		hidden.style.visibility = "hidden";
	});
}
// Products Details (Overlay) Function
function productDetails(product) {
    let images = "";
    product.images.forEach(imageUrl => {
        images += `<div class="p-1 rounded-2 m-1"><img class="pImage" src="${imageUrl}"></div>`;
    });
	return `<div class = "container d-flex align-items-center justify-content-center overlay h-100">
	<div class = "d-flex flex-column flex-lg-row bg-white rounded-2 w-100 p-4 ProductCtn productCard position-relative" data-id="${product.id}">
	<a id="closeProduct" class="fas fa-x closeProduct"></a>
		<div class = "left p-3 w-75 h-100">
            <div class="h-100 d-flex flex-column justify-content-between">
                <div class="h-50">
                    <img src = "${product.images[0]}" alt = "Product Image" class="w-75 h-100 d-block m-auto rounded-2 mainImg">
                </div>
                <div class="hover-container d-flex flex-wrap align-items-center justify-content-center mt-2">
                ${images}  
                </div>
            </div>
		</div>
		<div class = "right w-50 p-3 h-100">
			<div class="h-100 d-flex flex-column justify-content-between position-relative">
				<span class = "product-name d-block">${product.title}</span>
				<h3 class = "d-block text-muted fs-4"> Price: ${product.price} EGP</h3>
				<h3 class = "d-block text-muted fs-4">Category ${product.category}</h3>
				<h3 class = "d-block text-muted fs-4">Brand: ${product.Brand}</h3>
				<div class = "product-rating mt-2">
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
				</div>
				<div class = "mt-2 d-flex flex-column flex-lg-row gap-2">
					<button class = "btn btn-outline-primary p-2 text-capitalize addToCartOverlayBtn"><i class = "fas fa-shopping-cart p-2"></i>add to cart</button>
				</div>
          </div>
		</div>
	</div>
</div>
`;
}
// Heart Click Function
function heartClick(icon){
    const iconI = icon.querySelector("i")
	iconI.style.color = "red";
	icon.style.backgroundColor = "transparent";
	icon.style.position = "absolute";
	icon.style.animation = "move 3s";
	iconI.classList.add("fs-1");
}
// Heart Click Remove Function
function heartClickDelay(icon){
    const iconI = icon.querySelector("i")
	iconI.style.color = "red";
	iconI.classList.remove("fs-1");
	iconI.classList.add("fs-5");
	icon.style.position = "relative";
}
// Get Products Data Function
function getProductsData() {
	return JSON.parse(localStorage.getItem("products"));
}
// Create Shopping Cart Items Function
function cartItemData(item){
	return `<div class="cartItem px-3" data-id="${item.id}">
	<div class="d-flex align-items-center justify-content-between">
	  <img src="${item.images[0]}" alt="Product img" class="rounded-2">
	  <div class="cartText px-3">
		<h4>${item.title}</h4>
	  </div>
	  <span class="text-muted">${item.quantity}X</span>
	  <div class="price px-3">${item.price.toLocaleString('en-US')}EGP</div>
	</div>
	<hr>
  </div>`
}
// Create Wishlist Items  Function
function wishItemData(item){
	return `<div class="cartItem px-3 py-2" data-id="${item.id}">
	<div class="d-flex align-items-center justify-content-between position-relative">
	  <i class="fas fa-x position-absolute deleteFromWishList"></i>
	  <img src="${item.images[0]}" alt="Product img" class="rounded-2">
	  <div class="cartText px-3">
	  <h4>${item.title}</h4>
	  </div>
	  <button class = "btn btn-outline-success p-2 text-capitalize addToCartFromWishListBtn">add to cart</button>
	</div>
	<hr>
  </div>`
}
// Success Msg (Add to card And Wish List) Function
function success(url, title , msg) {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-right",
		iconColor: "white",
		customClass: {
			popup: "colored-toast",
		},
		showConfirmButton: true,
		confirmButtonText: "Close",
		imageUrl: url,
		imageWidth: 300,
		imageHeight: 150,
		imageAlt: "Custom image",
		timer: 3500,
		timerProgressBar: true,
	});
	Toast.fire({
		icon: "success",
        title: `<span><h5 class="text-primary">${title}</h5> <br> ${msg} <br> </span>`,
	});
}
// Add To Cart Function
function addToCart(item) {
	item.forEach((btn) => {
		btn.addEventListener("click", () => {
            const parent = btn.closest(".productCard");
			let productId = parent.dataset.id;
			let productObject = getProductsData().find((product) => product.id == productId);
			let searchProduct = shoppingcartData.find((product) => product.id == productId);
			if (searchProduct == undefined) {
				shoppingcartData.push({ ...productObject, quantity: 1 });
				success(productObject.images[0], productObject.title , "Added To Cart Successfully");
				cartAndWishCount(shoppingcartData,cartCount);
			} else {
				searchProduct.quantity++;
				success(productObject.images[0], productObject.title , "Quantity increased");
			}
			localStorage.setItem("cart", JSON.stringify(shoppingcartData));
			cartCount.textContent=shoppingcartData.length;
			loadShoppingCarts()
		});
	});
}
// Add To Wishlist Function
function addToWishList(btn) {
	const parent = btn.closest(".productCard");
	let productId = parent.dataset.id;
	let productObject = getProductsData().find((product) => product.id == productId);
	let searchProduct = WishlistData.find((product) => product.id == productId);
	success(productObject.images[0], productObject.title, "Added To Wishlist Successfully");
	if (searchProduct == undefined) {
		WishlistData.push(productObject);
	}
	WishListCount.textContent=WishlistData.length
	localStorage.setItem("Wishlist", JSON.stringify(WishlistData));
}
// Change Currency Function
function changeCurrency(currency){
	productCards = document.querySelectorAll(".productCard");
	currency.addEventListener("change", function() {
		if (currency.value == "Egy") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " EGP";
				priceElement.textContent = originalPrices[index];
			});
		}
		if (currency.value == "dolar") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " $";
				const originalPrice = originalPrices[index];
				let newPrice = (originalPrice / 30.84);
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
		if (currency.value == "Euro") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " €";
				const originalPrice = originalPrices[index];
				let newPrice = originalPrice / 33.59;
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
		if (currency.value == "CAD") {
			productCards.forEach((product, index) => {
				const priceElement = product.querySelector(".price");
				const priceSign = product.querySelector(".priceSign");
				priceSign.textContent = " c$";
				const originalPrice = originalPrices[index];
				let newPrice = originalPrice / 22.73;
				priceElement.textContent = newPrice.toFixed(2);
			});
		}
	});
}
// Get Session Data Function
function getSessionData() {
	return JSON.parse(localStorage.getItem("session"));
}
// Check Login Function
function checkLogin(){
    if(getSessionData() != null){
		if(getSessionData().Role == "Admin"){
			userName.textContent = "Welcome" + " " + getSessionData().fName + " " + "(Admin)"
			
		}
		else{
			userName.textContent = getSessionData().fName + " " + getSessionData().lName
		}
		userName.setAttribute("href", "#");
		menu.setAttribute("data-bs-toggle", "dropdown");
		userName.style.cursor="default"
		navbarDropdown.style.cursor="pointer"
    }

}
// Logout Function
function logout(btn){
	btn.addEventListener("click",function(){
		localStorage.removeItem("session");
		localStorage.removeItem("cart");
		localStorage.removeItem("Wishlist");
		window.location.href = "/index.html"
	})
}
// Check Wishlist Items
function checkWishList(producsArray){
	producsArray.forEach(product => {
		const productId = product.dataset.id;
		const heart = product.querySelector(".heart");
		let checkWishlist = false;

		WishlistData.forEach(item => {
			if (item.id == productId) {
				checkWishlist = true;
			}
		});
	
		if (checkWishlist) {
			let hiddenHeart = heart.querySelector(".hiddenHeart")
			let heartIcon = heart.querySelector(".heartIcon i")
			heartIcon.style.color = "red"
			hiddenHeart.textContent="Remove from Wishlist"
		}
	});
}
// Store Original Price Function
function storeOrginalPrice(producsArray){
	producsArray.forEach(product => {
		const priceElement = product.querySelector(".price");
		originalPrices.push((priceElement.textContent));
	});
}
// Check User Image Function
function CheckUserImage(){
	if(getSessionData() != null){
		if (getSessionData().imageSrc !== ""){
			userImg.style.display="block"
			userImg.src = getSessionData().imageSrc;
			userIcon.classList.remove("fa-user","bg-dark","p-2")
		}
	}
}
// Load Shopping Carts Function
function loadShoppingCarts(){
	shoppingcarts.innerHTML="";
	shoppingcartData.forEach(element => {
		shoppingcarts.innerHTML += cartItemData(element)
		totalPrice += (element.quantity * element.price)
	});
	totalCartsPrice.textContent=totalPrice.toLocaleString('en-US')
}
// Load Wishlist Function
function loadWishlist(){
	Wishes.innerHTML="";
	WishlistData.forEach(element => {
		Wishes.innerHTML += wishItemData(element)
	});
}
// Create Product Overlay Function
function createProductOverlay(productObject){
	const productOverlay = document.createElement("div");
	productOverlay.classList.add("productOverlay");
	productOverlay.innerHTML = productDetails(productObject);
	productCtn.appendChild(productOverlay);
	productOverlay.style.display = "block";
	viewProductActiveImg(productOverlay)
	const addToCartOverlayBtn = document.querySelectorAll(".addToCartOverlayBtn")
	addToCart(addToCartOverlayBtn)
	const closeProduct = productOverlay.querySelector(".closeProduct");
	closeProduct.addEventListener("click", function () {
		productOverlay.style.display = "none";
	});
}

deleteFromWishListFunction()
function deleteFromWishListFunction(){
	deleteFromWishList = document.querySelectorAll(".deleteFromWishList")
	deleteFromWishList.forEach(item => {
		item.addEventListener("click",function(){
			const parent = item.closest(".cartItem");
			const productId = parent.dataset.id
			WishlistData = WishlistData.filter(item => item.id != productId);
			parent.remove();
			localStorage.setItem("Wishlist", JSON.stringify(WishlistData));
			cartAndWishCount(WishlistData,WishListCount);
		})
		});
}

function addToCartWish() {
	addToCartFromWishListBtn = document.querySelectorAll(".addToCartFromWishListBtn")
	addToCartFromWishListBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
            const parent = btn.closest(".cartItem");
			let productId = parent.dataset.id;
			let productObject = getProductsData().find((product) => product.id == productId);
			let searchProduct = shoppingcartData.find((product) => product.id == productId);
			if (searchProduct == undefined) {
				shoppingcartData.push({ ...productObject, quantity: 1 });
				success(productObject.images[0], productObject.title , "Added To Cart Successfully");
				cartAndWishCount(shoppingcartData,cartCount);
			} else {
				searchProduct.quantity++;
				success(productObject.images[0], productObject.title , "Quantity increased");
			}
			localStorage.setItem("cart", JSON.stringify(shoppingcartData));
			cartCount.textContent=shoppingcartData.length;
		});
	});
}
addToCartWish(addToCartFromWishListBtn);

export {heartIconFunction , viewIconsFunction , addToCart , addToWishList , success , WishListCount , loadWishlist , SearchStock};
// fixed navbar
const navbar = document.querySelector(".navbar")

var toTopButton = document.getElementById("toTop");
// Invoke To Top and Fixed nav Functions
window.onscroll = function () {
  toTop();
  fixedNav();
};

function SearchStock(){
	productCards = document.querySelectorAll(".productCard")
	productCards.forEach(item => {
		if(item.dataset.stock == 0){
			const productLabel = item.querySelector(".productLabel")
			const newLabel = document.createElement("div");
			newLabel.innerHTML = outOfStockLabel();
			productLabel.appendChild(newLabel)
			const btn = item.querySelector(".addToCartBtn")
			btn.disabled = true;
		}
	});
}
function outOfStockLabel(){
	return`<span class="outOfStock">out of stock</span>`
}
// To top Function
function toTop() {
  if (window.scrollY > 600) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}
function fixedNav(){
	if (window.scrollY >= 80){
		navbar.classList.remove("sticky-top")
		navbar.classList.add("fixed-top")
	}
	else{
		navbar.classList.add("sticky-top")
		navbar.classList.remove("fixed-top")
	}
}
toTopButton.addEventListener("click", function () {
	window.scrollTo({top: 0 , behavior: "smooth"});
});

