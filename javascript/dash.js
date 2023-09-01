let productCount = document.querySelector(".productCount");
let usersCount = document.querySelector(".usersCount");
const signUpData = JSON.parse(localStorage.getItem("signUpData"));
const productsTable = document.querySelector(".productsTable");
const usersTable = document.querySelector(".usersTable");
let data = JSON.parse(localStorage.getItem("products"));
const members = document.querySelector(".members");
let membersList = [];
const admins = document.querySelector(".admins");
let adminsList = [];
// Display Products
displayProducts()


// User Data
usersCount.textContent = signUpData.length;
// Display Accounts
signUpData.forEach(user => {
    if (user.Role != "Admin"){
        membersList.push(user)
    }
    else{
        adminsList.push(user)
    }
});
adminsList.forEach(admin => {
    usersTable.innerHTML += displayAdminData(admin)
});
membersList.forEach(member => {
    usersTable.innerHTML += displayUsersData(member);
});
// Account Status
const updateBtn = document.querySelectorAll(".updateUserBtn")
updateBtn.forEach(btn => {
    btn.addEventListener("click",function(){
        const parent = btn.closest("tr");
        const select = parent.querySelector("select")
        let userMail = parent.dataset.mail;
        let searchUser = signUpData.find((user) => user.email == userMail);
        searchUser.Status = select.value;
        var filterUsersData = signUpData.filter(user => user.email !== userMail);
        var newSignUpData = [...filterUsersData,searchUser]
        localStorage.setItem("signUpData", JSON.stringify(newSignUpData));
        Toast.fire({
            icon: 'success',
            title: 'Account status updated'
          })
    })
});
// links variables
const moreLink = document.getElementById("moreLink");
const links = document.querySelector(".links");
const removeLink = document.getElementById("removeLink");
let linkCount = document.querySelectorAll(".link");
// Add Link
moreLink.addEventListener("click",function(){
    if(linkCount.length<2){
        createDiv()
        linkCount = document.querySelectorAll(".link");
        removeLink.style.visibility=("visible")
    }else{
        createDiv()
        linkCount = document.querySelectorAll(".link");
        moreLink.style.display="none"
    }
})
// Remvove Link
removeLink.addEventListener("click", function(){
    let lastLink = linkCount[linkCount.length - 1];
    moreLink.style.display="inline-block"
    lastLink.remove();
    linkCount.length-=1;
    selectLinks();
    if (linkCount.length==1){
    removeLink.style.visibility=("hidden");
    }
}); 
// Function Add Link
function createDiv(){
    const newLink = document.createElement("div");
    newLink.classList.add("input","link")
    newLink.innerHTML = createLink();
    links.appendChild(newLink);
}
// Function Create Link
function createLink(){
        return `<label for="link">Insert Image Link:</label>
        <input type="text" placeholder="Put Link Here" class="form-control mb-3" />
        `;
}
// Function Count Links
function selectLinks(){
    return linkCount = document.querySelectorAll(".link")
}
// Add Products
let idCounter = (data[data.length-1].id)+1;
const newProductName = document.getElementById("productNameInput");
const newProductPrice = document.getElementById("productPriceInput");
const newProductStock = document.getElementById("productStockInput");
const newProductCategory = document.getElementById("productCategoryInput");
const newProductBrand = document.getElementById("productBrandInput");
const newProductDesc = document.getElementById("productDescInput");
const newProductAdd = document.getElementById("addBtn");
const newProductUpdate = document.getElementById("updateBtn");
newProductAdd.addEventListener("click",function(){
    let linkValue = document.querySelectorAll(".link input");
    var newProductData = {
        id: idCounter,
        title: newProductName.value,
        price: newProductPrice.value,
        stock: newProductStock.value,
        category: newProductCategory.value,
        Brand: newProductBrand.value,
        description: newProductDesc.value,
        images: []
    };
    
    // Assuming linkValue is an array of objects with a 'value' property
    for (let i = 0; i < linkValue.length; i++) {
        newProductData.images.push(linkValue[i].value);
    }
    data.push(newProductData)
    displayProducts()
    localStorage.setItem("products", JSON.stringify(data));
    idCounter = (data[data.length-1].id)+1;
})
// Delete Products
const deleteProduct = document.querySelectorAll(".deleteProduct")
deleteProduct.forEach(deletebtn => {
    deletebtn.addEventListener("click",function(){
        const parent = deletebtn.closest("tr");
        let productId = parent.dataset.id;
        parent.remove()
        data = data.filter(item => item.id != productId);
        localStorage.setItem("products", JSON.stringify(data));
    })
});
// display members and admins count
members.textContent=membersList.length;
admins.textContent=adminsList.length;
function displayAdminData(admin){
    return`
    <tr data-mail="${admin.email}" class="bg-danger">
    <td class="bg-danger">${admin.fName + " " + admin.lName}</td>
    <td class="bg-danger">${admin.email}</td>
    <td class="bg-danger">
        <select name="Status">
            <option value="" disabled selected hidden>${admin.Status}</option>
          </select>
          <button class="btn btn-danger updateUserBtn" disabled >Update</button>
    </td>
    <td class="bg-danger"><button class="btn btn-danger deleteUserBtn" disabled>Delete</button></td>
</tr>`
}
function displayUsersData(user){
    return`
    <tr data-mail="${user.email}">
    <td>${user.fName + " " + user.lName}</td>
    <td>${user.email}</td>
    <td>
        <select name="Status">
            <option value="" disabled selected hidden>${user.Status}</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button class="btn btn-danger updateUserBtn">Update</button>
    </td>
    <td><button class="btn btn-danger deleteUserBtn">Delete</button></td>
</tr>`
}
function displayProductData(product){
    return`
    <tr data-id="${product.id}">
        <td class="productTitle">${product.title}</td>
        <td class="p-0"><button class="btn btn-success w-100 h-100 editProduct">Edit</button></td>
        <td class="p-0"><button class="btn btn-danger w-100 h-100 deleteProduct">Delete</button></td>
    </tr>`
}
// function for display products
function displayProducts(){
    productCount.textContent=data.length;
let productsData="";
data.forEach(product => {
    productsData+=displayProductData(product)
});
productsTable.innerHTML= productsData;
}