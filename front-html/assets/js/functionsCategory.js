const tempCategory = {
    category: "1",
    tax: "2",
  };
  
  //url Category
  const urlGet = "http://localhost/api/category/get.php";
  const urlPost = "http://localhost/api/category/post.php";
  const urlDelete = "http://localhost/api/category/delete.php";
  const urlPut = "http://localhost/api/category/put.php";
  
  const urlGetProducts = "http://localhost/api/product/get.php";
  
  const tbody = document.querySelector("tbody");
  const form = document.getElementById("form-category");
  
  const getCategories = fetch(urlGet).then((res) => {
    return res.json();
  });
  const getProducts = fetch(urlGetProducts).then((res) => {
    return res.json();
  });
  console.log(getCategories);
  
  const postCategory = () => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const data = new FormData(form);
      try {
        const res = await fetch(
          urlPost,
          {
            method: "POST",
            body: data,
          },
          window.location.reload()
        );
      } catch (error) {
        console.log(error.message);
      }
    });
  };
  
  async function updateTable() {
    let categories = await getCategories;
  
    tbody.innerHTML = "";
    categories.forEach((category) => {
      const tr = document.createElement("tr");
  
      const td1 = document.createElement("td");
      td1.textContent = category.code;
  
      const td2 = document.createElement("td");
      td2.textContent = category.name;
  
      const td3 = document.createElement("td");
      td3.textContent = category.tax;
  
      const td4 = document.createElement("td");
      const excluirButton = document.createElement("button");
      excluirButton.type = "button";
      excluirButton.className = "button red";
      excluirButton.textContent = "Delete";
      excluirButton.onclick = function () {
        deleteCategory(category.code), window.location.reload();
      };
  
      td4.appendChild(excluirButton);
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
  
      document.getElementById("crudTable").querySelector("tbody").appendChild(tr);
  
      if (/[0-9]/g.test(td2.textContent)) {
        alert(
          "Categoria invalida (Numero inserido, apenas letras são permitidas)"
        );
        deleteCategory(category.code);
        window.location.reload();
      }
  
      if (td3.textContent <= -1) {
        alert("Taxa invalida (valor negativo não permitido)");
        deleteCategory(category.code);
        window.location.reload();
      }
  
      if (/[a-zA-ZÀ-ÿ\s]/g.test(td3.textContent)) {
        alert("Taxa invalida (Letra inserida, apenas numeros são permitidos)");
        deleteCategory(category.code);
        window.location.reload();
      }
    });
  }
  
  const updateCategory = async (code, category) => {
    try {
      const response = await fetch(
        `http://localhost/api/category/put.php?code=${code}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return false;
    }
  };
  
  /////////////////////////////////////////////////////
  
  async function deleteCategory(code) {
    try {
      const res = await fetch(
        `http://localhost/api/category/delete.php?code=${code}`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  /*
  async function deleteCategory(code) {
    try {
      const res = await fetch(
        `http://localhost/api/category/delete.php?code=${code}`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  }*/
  /////////////////////////////////////////////////////
  
  const isValidFields = () => {
    return document.getElementById("form-category").reportValidity();
  };
  
  const clearTable = () => {
    const rows = document.querySelectorAll("#crudTable tbody tr");
    rows.forEach((row) => row.remove());
  };
  
  const fillFields = (category) => {
    document.getElementById("name").value = category.category;
    document.getElementById("tax").value = category.tax;
    document.getElementById("name").dataset.index = category.index;
  };
  
  updateTable();
  
  /*
  
  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_category")) ?? [];
  
  const setLocalStorage = (dbCategory) =>
    localStorage.setItem("db_category", JSON.stringify(dbCategory));
  
  const createCategory = (category) => {
    const dbCategory = getLocalStorage();
    dbCategory.push(category);
    setLocalStorage(dbCategory);
  };
  
  const readCategory = () => getLocalStorage();
  
  const updateCategory = (index, category) => {
    const dbCategory = readCategory();
    dbCategory[index] = category;
    setLocalStorage(dbCategory);
  };
  
  
  
  
  
  const saveCategory = (e) => {
    e.preventDefault();
    if (isValidFields()) {
      const categoria = {
        category: document.getElementById("name").value,
        tax: document.getElementById("tax").value,
      };
      if (tax.value < 0) {
        alert("Por favor insira um valor positivo");
        deleteCategory(index, -1);
      }
      const index = parseInt(document.getElementById("name").dataset.index);
      if (isNaN(index)) {
        createCategory(categoria);
      } else {
        updateCategory(index, categoria);
      }
  
  
      updateTable();
      clearFields();
    }
  };
  
  
  
  
  
  const clearFields = () => {
    const fields = document.querySelectorAll(".modal-field");
    fields.forEach((field) => (field.value = ""));
    document.getElementById("name").dataset.index = "";
  };
  
  
  
  
  const editCategory = (index) => {
    const category = readCategory()[index];
    category.index = index;
    fillFields(category);
  };
  
  
  
  const editDelete = (event) => {
    if (event.target.tagName === "BUTTON") {
      const [action, index] = event.target.id.split("-");
      if (action === "editar") {
        editCategory(index);
      } else if (action === "excluir") {
        const category = readCategory()[index];
        const response = confirm(
          `Deseja realmente excluir a categoria ${category.category}`
        );
        if (response) {
          deleteCategory(index);
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
  
  document.querySelectorAll('td').forEach,
    
  
  document.querySelectorAll('select').forEach(function(select) {
    select.addEventListener("change", function() {
      if (!this.value) {
        this.selectedIndex = -1; 
      }
    });
  });
  
  
  
  var cells = document.querySelectorAll('td');
  
  cells.forEach(function(cell) {
      var content = cell.textContent;
      if (/[^a-zA-Z0-9]/.test(content)) {
          cell.textContent = '';
      }
  });
  
  
  
  
  
  document.getElementById("submit").addEventListener("submit", postCategory);
  
  document
    .getElementById("crudTable")
    .querySelector("tbody")
    .addEventListener("click", editDelete);
  */
  