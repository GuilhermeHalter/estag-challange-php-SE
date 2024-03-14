const urlGetProduct = "http://localhost/api/product/get.php";
const urlPutProduct = "http://localhost/api/product/put.php";
const urlGetOrder = "http://localhost/api/order/get.php";
const urlPostOrder = "http://localhost/api/order/post.php";
const urlGetOrderItem = "http://localhost/api/orderItem/get.php";
const urlPostOrderItem = "http://localhost/api/orderItem/post.php";

const tbodyContent = document.querySelector("tbody");
const modalBody = document.getElementById("modal-body");

const getOrders = fetch(urlGetOrder).then((res) => {
  return res.json();
});

const getProducts = fetch(urlGetProduct).then((res) => {
  return res.json();
});

const getOrderItem = fetch(urlGetOrderItem).then((res) => {
  return res.json();
});

const updateTable = async () => {
  try {
    const history = await getOrders;
    tbodyContent.innerHTML = "";

    history.forEach((tableItem) => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.textContent = tableItem.code;

      const td2 = document.createElement("td");
      td2.textContent = tableItem.tax;

      const td3 = document.createElement("td");
      td3.textContent = tableItem.total;

      const td4 = document.createElement("td");
      const link = document.createElement("a");
      link.href = `produtoView.html?code=${tableItem.code}`;
      link.textContent = "Details";

      const viewButton = document.createElement("button");
      viewButton.appendChild(link);

      td4.appendChild(viewButton);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);


      tbodyContent.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao atualizar tabela:", error);
  }
};


updateTable();

/*
const getHistory = () => JSON.parse(localStorage.getItem("db_carrinho")) || [];

const setHistory = (history) =>
  localStorage.setItem("db_carrinho", JSON.stringify(history));

  const renderSummary = () => {
    const history = getHistory();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    history.forEach((innerArray, index) => {
      const summaryRow = document.createElement("tr");
  
      const td1 = document.createElement("td");
      td1.textContent = index + 1;
  
      const td2 = document.createElement("td");
      td2.textContent = innerArray.length + " items";
  
      const td3 = document.createElement("td");
      const verDetalhesButton = document.createElement("button");
      verDetalhesButton.textContent = "Ver detalhes";
      verDetalhesButton.addEventListener("click", () => showDetails(index));
  
      td3.appendChild(verDetalhesButton);
  
      summaryRow.appendChild(td1);
      summaryRow.appendChild(td2);
      summaryRow.appendChild(td3);
  
      tbody.appendChild(summaryRow);
    });
  };
  

const showDetails = (index) => {
  const history = getHistory();
  const selectedArray = history[index];
  localStorage.setItem("selectedArray", JSON.stringify(selectedArray));
  window.location.href = "produtoView.html";
};


renderSummary();
*/
