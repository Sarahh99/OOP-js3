
class Product1 {
    productName;
    productPrice;
    productNumber;
  constructor (productName,productPrice,productNumber){
this.productName=productName;
this.productPrice=productPrice;
this.productNumber=productNumber;
  }
}
class CartLine1 {
Product;
constructor(Product){
    this.Product=Product;
}

      incQuantity= ()=> {
        this.Product.productNumber += 1;
        
        localStorage.setItem("products", JSON.stringify(product));
        
        
        console.log("C");
      }
       decQuantity = () => {
        if (this.product.productNumber > 1) {
          this.Product.productNumber--;
          rendering();
        }
      }
       delete_func = function () {
        this.Product.clear();
        rendering();
      }
      
}
class Cart1 {
    CartLine;
    constructor(CartLine){
        this.CartLine=CartLine;
    }
    shipping = function()  {
        let sh = this.CartLine.length * 10;
        return sh + "$";
      };
     subtotal =function() {
      let st=0;
      for (let i=0; i<this.CartLine.length; i++){
        st+=this.CartLine[i].Product.productPrice*this.CartLine[i].Product.productNumber;
      }
      return st+"$";
      };
       total = () => {
        
        return parseInt(this.subtotal())+ parseInt(this.shipping()) + "$";
      };
}


document.getElementById("btn").setAttribute("onclick", "add_func()");
const products = JSON.parse(localStorage.getItem("products") || "[]");
const add_func = () => {
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
      localStorage.setItem("products", JSON.stringify(products));
      rendering();
    } else {
      alert(
        "check Product name , Price & Quantity again please or Product already exsit you can change quantity"
      );
      return "";
    }
    
  };
  const rendering = () => {
    document.getElementById("products").innerHTML = "";
    product.forEach((p, i) => {
      document.getElementById("products").innerHTML += add_row(p, i);
      bindClasses();
      

    });
    
  
    
  };
   bindClasses = () => {
    
    const cartLineArray = [];
    product.forEach((p) => {
      let newProduct = new Product1(p.productName,p.productPrice,p.productNumber);
      let newCartLine = new CartLine1(newProduct);
      cartLineArray.push(newCartLine);
      
    })
    
    let newCart = new Cart1(cartLineArray);
    document.getElementById("sub-total").innerHTML = newCart.subtotal();
    document.getElementById("shipping").innerHTML = newCart.shipping();
    document.getElementById("total").innerHTML = newCart.total();
    localStorage.setItem("products", JSON.stringify(product));
  }
  
 
 add_row = (p) => {
    producttotal = p.productNumber * p.productPrice;
    return `<tr class="thead-dark"><td>${p.productName}</td><td>${p.productPrice}$</td><td><div class="numOfProducts id="w"><button type="button" onclick="nwe cartLine.decQuantity() >
  <i class="fa fa-minus"></i>
  </button>${p.productNumber} 
  <button type="button"  onclick="nwe cartLine.incQuantity()">
      <i class="fa fa-plus"></i>
  </button></div>
  </td><td>${producttotal}$</td><td><button onclick="new cartLine.delete_func()">remove</button></td></tr>`;
  };
rendering();
