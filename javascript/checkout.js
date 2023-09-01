const cardNumber = document.querySelector(".cardNumber");
const masterCardImg = document.querySelector(".masterCardImg");
const visaImg = document.querySelector(".visaImg");
const cartList = document.querySelector(".cartList");
const promoDiv = document.querySelector(".promoDiv");
const promoIcon = document.querySelector(".promoIcon");
const promo = document.querySelector(".promo");
const totalPrice = document.querySelector(".totalPrice");
const discount = document.querySelector(".discount");
const redeem = document.querySelector(".redeem");
const discountRate = document.querySelector(".discountRate");

const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const mastercardPattern = /^5[1-5][0-9]{14}$/;

getCartData().forEach(cart => {
    cartList.innerHTML += cartListItem(cart)
});
CalcTotal()

function cartListItem(product){
    return`<tr>
    <td><h6 class="productName">${splitCardTitle(product).cardTitle}</h6></td>
    <td><h6>x<span class="quantity">${product.quantity}</span></h6></td>
    <td><h6 class="text-muted"><span class="price">${product.price}</span><br> EGP</h6></td>
</tr>`
}

function splitCardTitle(product) {
	let title = product.title.split(" ");
	let cardTitle = title.slice(0, 6).join(" ");
	if (title.length > 6) {
		cardTitle+= " ..";
	}
	return { cardTitle };
}

console.log(getCartData());

// Get Cart Data Function
function getCartData() {
	return JSON.parse(localStorage.getItem("cart"));
}

// promo code
promoIcon.addEventListener("click",function(){
    promoIcon.style.display = "none"
    promoDiv.style.display = "block"
})

// redeem
redeem.addEventListener("click",function(e){
    e.preventDefault()
    if (promo.value == "discount7"){
        let calcDiscount = (parseInt(totalPrice.textContent) * 0.07);
        console.log(calcDiscount);
        discount.style.display="table-row"
        discountRate.textContent= `7% (${parseInt(calcDiscount)})`
        let oldPrice = (parseInt(totalPrice.textContent))
        totalPrice.textContent= (oldPrice - calcDiscount).toLocaleString('en-US');
        Toast.fire({
            icon: "success",
            title: `Promo code  applied`,
        });
    }
    else{
        Toast.fire({
            icon: "error",
            title: `promo code is invalid`,
        });
    }
})

// Validate Card
cardNumber.addEventListener("input",function(e){
    if (e.target.value.length>=16){
        console.log();
        if (!cardNumber.value.match(mastercardPattern) && (!cardNumber.value.match(visaPattern))){
            Swal.fire(
                "Enter a Valid Credit card Data (Master Card or Visa) !",
                "",
                "error"
            );
            masterCardImg.style.filter="grayscale(100)"
            visaImg.style.filter="grayscale(100)"
        }else{
            if (cardNumber.value.match(visaPattern)) {
                visaImg.style.filter="none"
                console.log("Visa");
            }
            else if (cardNumber.value.match(mastercardPattern)) {
                masterCardImg.style.filter="none"
            }
        }
    }
    else if (e.target.value.length<16){
        masterCardImg.style.filter="grayscale(100)"
        visaImg.style.filter="grayscale(100)"
    }

})
const fName = document.getElementById("fName")
const lName = document.getElementById("lName")
const email = document.getElementById("email")
const address = document.getElementById("address")
const address2 = document.getElementById("address2")
const country = document.getElementById("country")
const Governorate = document.getElementById("Governorate")
const zip = document.getElementById("zip")
const ccName = document.getElementById("ccName")
const ccNumber = document.getElementById("ccNumber")
const ccExpiration = document.getElementById("ccExpiration")
const ccCvv = document.getElementById("ccCvv")
const submitBtn = document.querySelector(".submitBtn")
var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
validateForm()
let AllOrders = JSON.parse(localStorage.getItem("AllOrders")) ?? [];

fName.value=loginGetData().fName;
lName.value=loginGetData().lName;
if (loginGetData().Address != ""){
    address.value=loginGetData().address;
}else{
    address.value="";
}
email.value=loginGetData().email;
function validateForm(){
    let inputList = [fName, lName, email, address, address2, country, Governorate, zip];
    let creditData = [ccName, ccNumber, ccExpiration, ccCvv]
    submitBtn.addEventListener("click",function(e){
        e.preventDefault()
        if (
            fName.value == "" ||
            lName.value == "" ||
            email.value == "" ||
            address.value == "" ||
            country.value == "" ||
            Governorate.value == "" ||
            zip.value == ""
        ) {
            Swal.fire(
                "Data Not Completely filled",
                "Please Fill Data Completely",
                "error"
            );  
            inputList.forEach((item) => {
                if (item.value == "") {
                    item.style.border = "2px solid red";
                }
            });
        }
        else if(
            ccName.value == "" ||
            ccNumber.value == "" ||
            ccExpiration.value == "" ||
            ccCvv.value == ""
        ){
            Swal.fire(
                "Complete Credit card Data !",
                "Please Fill Data Completely",
                "error"
            );
            creditData.forEach((item) => {
                if (item.value == "") {
                    item.style.border = "2px solid red";
                }
            });
        }
        else{
            inputList.forEach((item) => {
                item.value=""
            });
            creditData.forEach((item) => {
                item.value=""
            });
            swal.fire({
                title: 'Thanks For Purchasing From us',
                text: "Our Team Will Contact You Within 3 Days",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then(function() {
                window.location.href = "/index.html"
              })
              let userOrder = ({ cartItems:getCartData(), email :loginGetData().email, totalPrice : totalPrice.textContent , time : getDate()});
              AllOrders.push(userOrder)
              localStorage.setItem("AllOrders", JSON.stringify(AllOrders));
              localStorage.removeItem("cart");
        }
    })

}
function loginGetData() {
	return JSON.parse(localStorage.getItem("session"));
}
function CalcTotal(){
    let total = 0;
    getCartData().forEach(item => {
        total += item.price * item.quantity
        totalPrice.innerHTML= total;
    });
    if (getCartData().length == 0){
        totalPrice.innerHTML= 0;
    }
}
// Get Date And Time Function
console.log(getDate());
function getDate(){
	let currentDate = new Date();
	currentDate.setUTCHours(currentDate.getUTCHours() + 3);
	let year = currentDate.getUTCFullYear();
	let month = currentDate.getUTCMonth() + 1;
	let day = currentDate.getUTCDate();
	let hours = currentDate.getUTCHours();
	let minutes = currentDate.getUTCMinutes();
	if (hours === 0) {
		hours = 12;
	} else {
		hours = hours % 12;
	}
	let formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
	let formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
	let dateAndTime = formattedDate + " " + "(" + formattedTime + ")"
	return dateAndTime
}