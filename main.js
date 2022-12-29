const addSingleProductToCart = (p) => {
    const product = JSON.parse(localStorage.getItem("products") || "[]");
    const oldProductIndex = product.findIndex((x) => x.id === p.id);
    if (oldProductIndex >= 0) {
      product[oldProductIndex].productNumber += 1;
    } else {
      product.push({ ...p, productNumber: 1 });
    }
    localStorage.setItem("products", JSON.stringify(product));
  };
  