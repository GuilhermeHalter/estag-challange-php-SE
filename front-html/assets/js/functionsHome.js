const urlGetProduct = "http://localhost/api/product/get.php";
const urlPutProduct = "http://localhost/api/product/put.php";
const urlGetOrder = "http://localhost/api/order/get.php";
const urlPostOrder = "http://localhost/api/order/post.php";
const urlGetOrderItem = "http://localhost/api/orderItem/get.php";
const urlPostOrderItem = "http://localhost/api/orderItem/post.php";

const form = document.getElementById("form");
const finish = document.getElementById("finish-button");
var cart = [];

const info = {
  input: {
    select: document.getElementById("select"),
    amount: document.getElementById("amount"),
  },
  tax: document.getElementById("tax"),
  finalTax: document.getElementById("final-tax"),
  price: document.getElementById("price"),
  total: document.getElementById("total"),
};

const updateTableAfterDelete = (code) => {
  const contactTable = document.getElementById("tbody");
  const index = cart.findIndex((product) => product.code === code);
  if (index !== -1) {
    cart.splice(index, 1);
    contactTable.innerHTML = "";
    cart.forEach((product) => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.textContent = product.code;

      const td2 = document.createElement("td");
      td2.textContent = product.name;

      const td3 = document.createElement("td");
      td3.textContent = product.amount;

      const td4 = document.createElement("td");
      td4.textContent = product.amount * product.price;

      const td5 = document.createElement("td");
      td5.textContent = product.category_code;

      const td6 = document.createElement("td");
      td6.textContent =
        product.amount * product.price + parseFloat(product.tax);

      const td7 = document.createElement("td");
      const excluirButton = document.createElement("button");
      excluirButton.type = "button";
      excluirButton.className = "button red";
      excluirButton.textContent = "Delete";
      excluirButton.onclick = function () {
        deleteProduct(product.code), window.location.reload();
      };

      td7.appendChild(excluirButton);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);

      contactTable.appendChild(tr);
    });
    updateTotalAndTaxFields();
  }
};

const selectElement = document.getElementById("select");
selectElement.innerHTML =
  '<option value="#" disabled selected>Select the Product</option>';

const clearFields = () => {
  info.input.select.value = "";
  info.input.amount.value = "";
  info.price.value = "";
  info.tax.value = "";
  info.finalTax.value = "";
  info.total.value = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#crudTable>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

async function deleteProduct(code) {
  try {
    const res = await fetch(
      `http://localhost/api/orderItem/delete.php?code=${code}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      updateTableAfterDelete(code);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function addToCart(product) {
  let quantidade = info.input.amount.value;
  let existe = cart.find((item) => item.code == product.code);

  if (existe) {
    existe.amount = parseInt(quantidade) + parseInt(existe.amount);
  } else {
    let comprar = { ...product, amount: quantidade };
    cart.push(comprar);
  }

  async function subtractFromProduct(cart) {
    try {
      const products = await fetch("http://localhost/api/product/get.php").then(
        async (res) => {
          return await res.json();
        }
      );

      for (const item of cart) {
        const product = products.find((product) => product.code == item.code);
        console.log(item.amount);

        if (item.amount <= product.amount) {
          product.amount -= item.amount;
          await fetch(
            `http://localhost/api/product/put.php?code=${product.code}`,
            {
              method: "PUT",
              body: JSON.stringify(product),
            }
          );
        } else {
          alert("Quantidade insuficiente em estoque");
          deleteProduct(product.code)
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  clearFields();
  clearTable();

  const contactTable = document.getElementById("tbody");

  cart.forEach((product) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = product.code;

    const td2 = document.createElement("td");
    td2.textContent = product.name;

    const td3 = document.createElement("td");
    td3.textContent = product.amount;

    const td4 = document.createElement("td");
    td4.textContent = product.amount * product.price;

    const td5 = document.createElement("td");
    td5.textContent = product.category_code;

    const td6 = document.createElement("td");
    td6.textContent = product.amount * product.price + parseFloat(product.tax);

    const td7 = document.createElement("td");
    const excluirButton = document.createElement("button");
    excluirButton.type = "button";
    excluirButton.className = "button red";
    excluirButton.textContent = "Delete";
    excluirButton.onclick = function () {
      deleteProduct(product.code), window.location.reload();
    };

    td7.appendChild(excluirButton);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    if (td3.textContent <= -1) {
      alert("Quantidade invalida (valor negativo não permitido)");
      deleteProduct(product.code);
      window.location.reload();
    }

    contactTable.appendChild(tr);
    updateTotalAndTaxFields();
    subtractFromProduct([product]);
  });
}

async function changeInfo(productCode) {
  let products = await fetch("http://localhost/api/product/get.php").then(
    async (res) => {
      return await res.json();
    }
  );
  if (productCode != "#" && products.length > 0) {
    let selected = products.find((item) => item.code == productCode);
    console.log(selected);

    info.price.value = selected.price;
    info.tax.value = selected.tax;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let products = fetch("http://localhost/api/product/get.php").then(
    async (res) => {
      return await res.json();
    }
  );

  let data = await products;
  let product = info.input.select.value;

  let selected = await data.find((item) => item.code == product);
  console.log(product);
  if (selected.amount <= info.input.amount.value) {
    alert("Quantidade insuficiente em estoque");
    return;
  } else {
    addToCart(selected);
  }
});

info.input.select.addEventListener("change", async () => {
  let product = info.input.select.value;
  changeInfo(product);
});

const calculateTotalAndTax = () => {
  const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  const tax = cart.reduce((acc, item) => acc + item.tax * item.amount, 0);
  return { total, tax };
};

const updateTotalAndTaxFields = () => {
  const { total, tax } = calculateTotalAndTax();
  document.getElementById("final-tax").value = `${tax.toFixed(2)}`;
  document.getElementById("total").value = `${(total + tax).toFixed(2)}`;
};



function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

const postOrder = async (history) => {
  try {
    const res = await fetch(urlPostOrder, {
      method: "POST",
      body: history,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const postOrderItem = async (orderItem) => {
  try {
    const res = await fetch(urlPostOrderItem, {
      method: "POST",
      body: orderItem,
    });
  } catch (error) {
    console.log(error.message);
  }
};


finish.addEventListener("click", async () => {
  if (cart.length < 1) {
    alert("Por favor compre alguma coisa");
    return;
  }else{
    alert("Compra realizada com sucesso !!");
  }
  });

const cartToHistory = async () => {
  try {
    const order = {
      code: Math.random().toString(16).slice(2),
      total: document.getElementById("total").value,
      tax: document.getElementById("final-tax").value,
    };

    const orderFormData = objectToFormData(order);
    await postOrder(orderFormData);

    for (const item of cart) {
      const order_item = {
        order_code: order.code,
        product_code: item.code,
        amount: item.amount,
        price: item.price,
        tax: item.tax,
      };
      let orderItemFormData = objectToFormData(order_item);
      await postOrderItem(orderItemFormData);
    }

    clearTable();
    cart = [];
  } catch (error) {
    console.log("Erro ao finalizar compra:", error);
    alert("Erro ao finalizar compra. Por favor, tente novamente.");
  }
};




const cancelBuy = () => {
  const response = confirm(
    "As alterações não serão salvas. Deseja realmente cancelar o carrinho?"
  );
  if (response);
  cart = [];
  clearTable();
};

async function init() {
  let products = fetch("http://localhost/api/product/get.php").then(
    async (res) => {
      return await res.json();
    }
  );

  let data = await products;
  console.log(data);

  data.forEach((element) => {
    document.getElementById(
      "select"
    ).innerHTML += `<option value=${element.code}>${element.name}</option>`;
  });

  let product = info.input.select.value;
  changeInfo(product);
}
init();

document.getElementById("cancel").addEventListener("click", cancelBuy);

/*
var produtos = JSON.parse(localStorage.getItem("db_produto")) ?? [];
var categorias = JSON.parse(localStorage.getItem("db_category")) ?? [];
var home = JSON.parse(localStorage.getItem("db_home")) ?? [];

const setLocalStorage = (dbHome) =>
  localStorage.setItem("db_home", JSON.stringify(dbHome));

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_home")) ?? [];

const getLocalStorageCategory = () =>
  JSON.parse(localStorage.getItem("db_category")) ?? [];

const setLocalStorageCarrinho = (dbCarrinho) =>
  localStorage.setItem("db_carrinho", JSON.stringify(dbCarrinho));

const getLocalStorageCarrinho = () =>
  JSON.parse(localStorage.getItem("db_carrinho")) ?? [];

const setLocalStorageProduto = (dbProduto) =>
  localStorage.setItem("db_produto", JSON.stringify(dbProduto));

const getLocalStorageProduto = () =>
  JSON.parse(localStorage.getItem("db_produto")) ?? [];

var select = document.getElementById("select");
var amountValue = document.getElementById("amount");
var taxValue = document.getElementById("tax-value");
var taxCarrinho = document.getElementById("tax-carrinho");
var unitPrice = document.getElementById("unit-price");

produtos.forEach(function (produto) {
  var option = document.createElement("option");
  option.textContent = produto.product;
  option.value = produto.product;
  select.appendChild(option);
});

const calculateTotalAndTax = () => {
  const carrinho = getLocalStorage();

  const total = carrinho.reduce((acc, item) => acc + item.unit * item.amount, 0);
  const tax = carrinho.reduce((acc, item) => acc + item.tax * item.amount, 0);
  return { total, tax };
};

const updateTotalAndTaxFields = () => {
  const { total, tax } = calculateTotalAndTax();
  document.getElementById("tax-carrinho").value = `${tax.toFixed(2)}`;
  document.getElementById("total-carrinho").value = `${(total + tax).toFixed(
    2
  )}`;
};

select.addEventListener("change", function () {
  var selectedProductName = this.value;
  var selectedProduct = produtos.find(function (produto) {
    return produto.product === selectedProductName;
  });

  if (selectedProduct) {
    var foundCategory = categorias.find(function (categoria) {
      return categoria.category === selectedProduct.category;
    });

    if (foundCategory) {
      taxValue.value = foundCategory.tax;
    } else {
      taxValue.value = "Categoria não encontrada";
    }
  } else {
    taxValue.value = "Produto não encontrado";
  }
});

select.addEventListener("change", function () {
  var selectedProductName = this.value;
  var selectedProduct = produtos.find(function (produto) {
    return produto.product === selectedProductName;
  });

  if (selectedProduct) {
    var foundPrice = produtos.find(function (produto) {
      return produto.product === selectedProduct.product;
    });

    if (foundPrice) {
      unitPrice.value = foundPrice.unit;
    } else {
      unitPrice.value = "Preço não encontrado";
    }
  } else {
    unitPrice.value = "Preço não encontrado";
  }
});

const createProduct = (product) => {
  const dbHome = getLocalStorage();
  dbHome.push(product);
  setLocalStorage(dbHome);
};

const readProduct = () => getLocalStorage();

const updateProduto = (index, product) => {
  const dbHome = readProduct();
  dbHome[index] = product;
  setLocalStorage(dbHome);
};

const deleteProduto = (index) => {
  const dbHome = readProduct();
  const product = dbHome[index];
  const amount = product.amount;
  dbHome.splice(index, 1);
  setLocalStorage(dbHome);


  subtrctFromProduct(product, -amount);
};


const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const saveProduct = (e) => {
  if (isValidFields()) {
    const selectedProduct = select.value;
    const selectedAmount = parseInt(amountValue.value);

    const product = {
      product: selectedProduct,
      amount: selectedAmount,
      unit: unitPrice.value,
      tax: parseFloat(taxValue.value),
      total: parseFloat(unitPrice.value * selectedAmount),
    };

    if (subtrctFromProduct(product, selectedAmount)) {
      const index = parseInt(select.dataset.index);
      if (isNaN(index)) {
        createProduct(product);
      } else {
        updateProduto(index, product);
      }

      updateTotalAndTaxFields();
      updateTable();
      clearFields();
    }
  }
};

const subtrctFromProduct = (product, amount) => {
  const products = getLocalStorageProduto();
  const existingProduct = products.find(p => p.product === product.product);

  if (existingProduct && existingProduct.amount >= amount) {
    existingProduct.amount -= amount;
    setLocalStorageProduto(products);
    return true; 
  } else {
    alert("Quantidade insuficiente em estoque");
    return false; 
  }
};


console.log(saveProduct());
const createRow = (produto, index) => {

  
  const newRow = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.textContent = produto.product;

  const td2 = document.createElement("td");
  td2.textContent = produto.unit;


  
  const td3 = document.createElement("td");
  td3.textContent = produto.amount;

  
  const td4 = document.createElement("td");
  td4.textContent = produto.total;



  const td5 = document.createElement("td");

  
  const editarButton = document.createElement("button");
  editarButton.type = "button";
  editarButton.className = "button green";
  editarButton.id = `editar-${index}`;
  editarButton.textContent = "Editar";

  const excluirButton = document.createElement("button");
  excluirButton.type = "button";
  excluirButton.className = "button red";
  excluirButton.id = `excluir-${index}`;
  excluirButton.textContent = "Excluir";

  td5.appendChild(editarButton);
  td5.appendChild(excluirButton);

  newRow.appendChild(td1);
  newRow.appendChild(td2);
  newRow.appendChild(td3);
  newRow.appendChild(td4);
  newRow.appendChild(td5);

  document.getElementById("crudTable").querySelector("tbody").appendChild(newRow);  
  
  if(td2.textContent <= 0){
    alert("Valor unitario invalido (valor negativo ou 0, não permitido)")
    deleteProduto(index);
    updateTable();
  }

  if (/[a-zA-ZÀ-ÿ\s]/g.test(td2.textContent)){
    alert("Valor unitario invalido (Letra inserida, apenas numeros são permitidos)")
    deleteProduto(index);
    updateTable();
  }

  if(td3.textContent <= 0){
      alert("Quantidade invalida (valor negativo não permitido)")
      deleteProduto(index);
      updateTable();
  }

  if (/[a-zA-ZÀ-ÿ\s]/g.test(td3.textContent)){
    alert("Quantidade invalida (Letra inserida, apenas numeros são permitidos)")
    deleteProduto(index);
    updateTable();
  }

  if(td4.textContent <= 0){
    alert("total invalido (valor negativo não permitido)")
    deleteProduto(index);
    updateTable();
  }
  

};

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("select").dataset.index = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#crudTable tbody tr");
  rows.forEach((row) => row.remove());
};

const deleteTable = (index) => {
  const dbHome = readProduct();
  dbHome.splice(index);
  setLocalStorage(dbHome);

  clearTable();
};

const finishCarrinho = () => {
  const dbHome = getLocalStorage();
  const taxFinal = calculateTotalAndTax();
  const dbCarrinho = getLocalStorageCarrinho();

  dbHome.push(taxFinal);

  if (dbHome == 0) {
    alert("Faça alguma compra antes de finalizar");
  } else {
    dbCarrinho.push(dbHome);
    setLocalStorageCarrinho(dbCarrinho);
    alert("Compra realizada com sucesso!!!");
  }

  deleteTable();
  clearTable();
};

const fillFields = (produto) => {
  document.getElementById("select").value = produto.product;
  document.getElementById("amount").value = produto.amount;
  document.getElementById("unit-price").value = produto.unit;
  document.getElementById("select").dataset.index = produto.index;
};

const editProduct = (index) => {
  const product = readProduct()[index];
  product.index = index;
  fillFields(product);
};

const updateTable = () => {
  const dbHome = readProduct();
  clearTable();
  dbHome.forEach((produto, index) => createRow(produto, index));
};

console.log(updateTable());

const editDelete = (event) => {
  if (event.target.tagName === "BUTTON") {
    const [action, index] = event.target.id.split("-");
    if (action === "editar") {
      editProduct(index);
    } else if (action === "excluir") {
      updateTotalAndTaxFields();
      const product = readProduct()[index];
      const response = confirm(
        `Deseja realmente excluir o produto ${product.product}`
      );
      if (response) {
        updateTotalAndTaxFields();
        deleteProduto(index);
        updateTable();
      }
    }
  }
};

document.querySelectorAll('input[type="number"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9.]/g, ''); 
  });
});


document.querySelectorAll('input[type="text"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); 
    if (this.value.length > 20) {
      this.value = this.value.substring(0, 20); 
    }
  });
});

document.querySelectorAll('select').forEach(function(select) {
  select.addEventListener("change", function() {
    if (!this.value) {
      this.selectedIndex = -1; 
    }
  });
});

updateTable();

document.getElementById("salvar").addEventListener("click", () => {
    saveProduct(event);
    updateTotalAndTaxFields();
    subtrctFromProduct();
});



document
  .getElementById("compra")
  .addEventListener("input", updateTotalAndTaxFields);

document
  .getElementById("crudTable")
  .querySelector("tbody")
  .addEventListener("click", editDelete);

document
  .getElementById("cancel")
  .addEventListener("click", clearTable && deleteTable);

document
  .getElementById("cancel")
  .addEventListener("click", updateTotalAndTaxFields);

document
  .getElementById("finish")
  .addEventListener("click", clearTable && finishCarrinho);

document
  .getElementById("finish")
  .addEventListener("click", updateTotalAndTaxFields);

updateTotalAndTaxFields();

};
*/
