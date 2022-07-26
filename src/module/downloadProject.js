// Скачка файла
const downloadProject = (order, str, error) => {

  if (error[1].length === 0) {

    let link = document.createElement("a");
    link.download = `${order}.bprj`;
    let blob = new Blob([str], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  } else {
    let errorAlarm = `<div class="error-alarm">Внимание есть ошибки!!!</div>`
    document.getElementById("error-alarm").innerHTML = errorAlarm;
    console.log('Есть ошибки!')
  }
}




export default downloadProject;
