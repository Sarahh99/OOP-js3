document.getElementById("btn").setAttribute("onclick", "add_func()");
const rendering = () => {
  document.getElementById("products").innerHTML = "";
  product.forEach((p, i) => {
    document.getElementById("products").innerHTML += add_row(p, i);
  });
  document.getElementById("sub-total").innerHTML = subtotal();
  document.getElementById("shipping").innerHTML = shipping();
  document.getElementById("total").innerHTML = total();
};

const add_func = (p) => {
  let currentProducts = product.map(({ productName }) => productName);
  let productName = document.getElementById("product-name").value;
  let productPrice = Number(document.getElementById("price").value);
  let productNumber = Number(document.getElementById("quantity").value);
  if (
    productName != "" &&
    productPrice != "" &&
    productNumber != "" &&
    !Number.isNaN(productPrice) &&
    productPrice > 0 &&
    Number.isInteger(productNumber) &&
    productNumber > 0 &&
    !currentProducts.includes(productName)
  ) {
    product.push({
      productName: productName,
      productPrice: productPrice,
      productNumber: productNumber,
    });
    localStorage.setItem("products", JSON.stringify(product));
    rendering();
  } else {
    alert(
      "check Product name , Price & Quantity again please or Product already exsit you can change quantity"
    );
    return "";
  }
};
const add_row = (p, i) => {
  producttotal = p.productNumber * p.productPrice;
  return `<tr class="thead-dark"><td>${p.productName}</td><td>${p.productPrice}$</td><td><div class="numOfProducts"><button type="button"  onclick="decQuantity(${i})">
<i class="fa fa-minus"></i>
</button>${p.productNumber} 
<button type="button"  onclick="incQuantity(${i})">
    <i class="fa fa-plus"></i>
</button></div>
</td><td>${producttotal}$</td><td><button onclick="delete_func(${i})">remove</button></td></tr>`;
};
const subtotal = () => {
  let st = product
    .map((p) => p.productPrice * p.productNumber)
    .reduce((a, t) => (a += t), 0);
  return st + "$";
};
const shipping = () => {
  let t = product.length * 10;
  return t + "$";
};
const total = () => {
  let st = product
    .map((p) => p.productPrice * p.productNumber)
    .reduce((a, t) => (a += t), 0);
  let t = product.length * 10;
  return t + st + "$";
};
const incQuantity = (i) => {
  product[i].productNumber += 1;
  localStorage.setItem("products", JSON.stringify(product));
  rendering();
};
const decQuantity = (i) => {
  if (product[i].productNumber > 1) {
    product[i].productNumber -= 1;
    localStorage.setItem("products", JSON.stringify(product));
    rendering();
  }
};
const delete_func = function (i) {
  product.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(product));
  rendering();
};
const product = JSON.parse(localStorage.getItem("products") || "[]");
rendering();
