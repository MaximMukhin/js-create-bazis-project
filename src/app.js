import articlesPars from "./module/articlesPars.js";
import textParsArrayList from "./module/textParsArrayList.js";
import textParsObjectList from "./module/textParsObjectList.js";
import articlesNotFoundList from "./module/articlesNotFoundList.js";
import downloadProject from "./module/downloadProject.js";
import productToWork from "./module/productToWork.js";
import readFile from "./module/readFile.js";
import fileForBprj from "./module/fileForBprj.js";
import getOrderName from "./module/getOrderName.js";
import loadProducts from "./module/loadProducts.js";

const products = loadProducts();

let order = "";
let str = "";
let toWork = [];

products.then((products) => {
  console.log(products);

  // запуск чтения файла
  const inputFile = document.getElementById("input-file");
  inputFile.addEventListener("change", () => {
    const productsArr = readFile(inputFile);
    productsArr.then((productsArr) => {
      order = "";
      str = "";
      toWork = [];
      textParsArrayList(productsArr);
      const productObj = articlesPars(productsArr);
      textParsObjectList(productObj);
      const productWork = productToWork(productObj, products);
      articlesNotFoundList(productWork);
      str = fileForBprj(productWork);
      order = getOrderName();
      toWork.push(productWork);
    });
  });
});

const downloadProjectFile = () => {
  downloadProject(order, str, toWork.flat());
};

// функция Скачки
document
  .querySelector(".btn-download")
  .addEventListener("click", downloadProjectFile);
