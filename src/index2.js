import { artMax, acquaCraft, iberis } from "./products.js";
console.log("start");
const productsAll = [...artMax, ...acquaCraft, ...iberis];

//let productsAll = [];

/* Promise.all([
  fetch('http://127.0.0.1:5500/products/acqua-craft.json'),

  fetch('http://127.0.0.1:5500/products/acqua-craft.json'),

  fetch('http://127.0.0.1:5500/products/acqua-craft.json'),

  
])
.then((resArr) => {
  Promise.all(resArr).then((data) => console.log('data',data))
})

console.log('end')
console.log('productsAll', productsAll) */

// база артикулов
const products = productsAll;

let articles = []; // заказ клиента
let articlesObj = []; // заказ клиента

const toWork = []; // массив артикулов в работу
const articlesNotFound = []; // ненайденые артикулы в базе

let order = "";

const getOrderName = () => {
  order = document.getElementById("input-order").value;
  console.log(order);
};

// функция загрузки файла
const readFile = (input) => {
  articles = [];
  articlesObj = [];
  articlesNotFound = [];

  let file = input.files[0];

  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    //читаю файл
    const res = reader.result;
    //разбиваю на массив
    const strSlice = res.split("\n");
    //console.log('strSlice', strSlice)

    //добавляю в колекцию массив
    for (let i = 0; i < strSlice.length; i++) {
      articles.push(strSlice[i]);
    }
    document.getElementById("text-file").innerHTML = res;

    //разбиваю на обьект
    articlesPars(articles);
    objectToWork();
    console.log("toWork", toWork);
    outList();
    outList2();
    outList3();
    console.log("articlesObj", articlesObj);
    console.log("articlesNotFound", articlesNotFound);
  };
};

// разбиваем заказ клиента на обьекты
const articlesPars = (arr) => {
  //const result = []
  const arrPars = [];

  //разбиваю строки на масивы артикул + количество
  arr.forEach((el) => {
    arrPars.push(el.split("\t"));
  });

  arrPars.forEach((el) => {
    articlesObj.push({ article: el[0], qty: el[1] });
  });

  //return result //=
};

//делаю обьект с сылками на заказ
const objectToWork = () => {
  for (const key of articlesObj) {
    const result = products.find((el) => el.article === key.article);
    console.log("result", result);
    if (key.article === result?.article) {
      toWork.push({
        article: key.article,
        qty: key.qty,
        link: result?.link,
        series: result?.series,
      });
    } else {
      articlesNotFound.push(key.article);
      console.log("Артикул не найден:", key.article);
    }
  }
};

const file = () => {
  let result = "";
  console.log(toWork.length);
  for (let i = 0; i < toWork.length; i += 1) {
    const text = `
    <File>
      <Type>0</Type>
      <Name>${toWork[i].link}</Name>
      <SubName/>
      <Sign>${toWork[i].article}</Sign>
      <Note/>
      <Comment/>
      <Count>${toWork[i].qty}</Count>
    </File>
    `;
    if (result === "") result = text;
    else result += text;
  }

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<Document>
  <DataProject>
    <ListFiles>
    ${result}
      </ListFiles>
    <CuttingInfo>
      <Parameters/>
      <ProductCount>1</ProductCount>
    </CuttingInfo>
    <EstimateInfo/>
  </DataProject>
</Document>
`;

  return xml;
};

//отрисовка списка
const outList = () => {
  let out = "";
  for (const article in articles) {
    out += `<div>${articles[article]}</div>`;
  }
  document.getElementById("text-file-array").innerHTML = out;
};

//отрисовка списка
const outList2 = () => {
  let out2 = "";
  let count = 1;
  for (const article of articlesObj) {
    out2 += `<div>count:${count} art: ${article.article} - qty: ${article.qty}<div>`;
    count += 1;
  }
  document.getElementById("text-file-object").innerHTML = out2;
};

//отрисовка списка
const outList3 = () => {
  let out3 = "";
  for (const article of articlesNotFound) {
    out3 += `<div class="not-found-alarm">${article}<div>`;
  }
  document.getElementById("articlesf-not-found").innerHTML = out3;
};

// Скачка файла
const downloadBazisProject = () => {
  getOrderName();
  let str = file();
  console.log(str);

  let link = document.createElement("a");
  link.download = `${order}.txt`;
  let blob = new Blob([str], { type: "text/plain" });
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
  console.log("download");
};

// функция запуск скачки файла проекта Базис
document
  .querySelector(".btn-download")
  .addEventListener("click", downloadBazisProject);

// запуск чтения файла
const inputFile = document.getElementById("input-file");
inputFile.addEventListener("change", () => {
  readFile(inputFile);
});