const urlGetProduct = "http://localhost/api/product/get.php";
const urlPutProduct = "http://localhost/api/product/put.php";
const urlGetOrder = "http://localhost/api/order/get.php";
const urlPostOrder = "http://localhost/api/order/post.php";
const urlGetOrderItem = "http://localhost/api/orderItem/get.php";
const urlPostOrderItem = "http://localhost/api/orderItem/post.php";

const readOrderItem = async () => {
  const response = await fetch("http://localhost/api/orderItem/get.php");
  const data = await response.json();
  console.log;
  return data;
};

const createRow = (orderItem) => {
  const tableBody = document.getElementById("tbody");
  const newRow = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.textContent = orderItem.code;

  const td2 = document.createElement("td");
  td2.textContent = orderItem.product_code;

  const td3 = document.createElement("td");
  td3.textContent = orderItem.amount;

  const td4 = document.createElement("td");
  td4.textContent = orderItem.price;

  const td5 = document.createElement("td");
  td5.textContent = orderItem.tax;

  newRow.appendChild(td1);
  newRow.appendChild(td2);
  newRow.appendChild(td3);
  newRow.appendChild(td4);
  newRow.appendChild(td5);
  tableBody.appendChild(newRow);

};



const updateTable = async () => {
  const orderItem = await readOrderItem();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("code"));
  console.log(orderItem);

  orderItem.forEach((element) => {
    if (element.order_code == urlParams.get("code")) {
      createRow(element);
      return;
    }
  });
};

updateTable();

/*
const renderDetails = () => {
  const selectedArray = JSON.parse(localStorage.getItem("selectedArray"));
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const lastItem = selectedArray.pop();

  
  selectedArray.forEach((item) => {
    const detailRow = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = item.product;
  
    const td2 = document.createElement("td");
    td2.textContent = item.amount;
  
    const td3 = document.createElement("td");
    td3.textContent = item.unit;

    const td4 = document.createElement("td");
    td4.textContent = item.tax;
  
    const td5 = document.createElement("td");
    td5.textContent = item.total;
  
    detailRow.appendChild(td1);
    detailRow.appendChild(td2);
    detailRow.appendChild(td3);
    detailRow.appendChild(td4);
    detailRow.appendChild(td5);

    document.getElementById("crudTable").querySelector("tbody").appendChild(detailRow);
    tbody.appendChild(detailRow);
    document.getElementById(
      "Total"
    ).textContent = `O valor total foi de R$ ${lastItem.total};`;
    document.getElementById(
      "Tax"
    ).textContent = `O valor da taxa foi de R$ ${lastItem.tax};`;
    document.getElementById(
      "valueWithTax"
    ).textContent = `O valor da taxa foi de R$ ${
      lastItem.tax + lastItem.total
    };`;
  });



  console.log("Última linha:", lastItem);
};




document.querySelectorAll('input[type="number"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9.]/g, '');
  });
});

document.querySelectorAll('input[type="text"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); 
    if (this.value.length > 25) {
      this.value = this.value.substring(0, 25); 
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

renderDetails();
*/
