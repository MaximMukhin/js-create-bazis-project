//делаю обьект с сылками на заказ
const productToWork = (articlesObj, products) => {
  let toWork = [];
  let articlesNotFound = [];
  for (const key of articlesObj) {
    const result = products.find((el) => el.article === key.article);
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

  return [toWork, articlesNotFound];
};
export default productToWork;
