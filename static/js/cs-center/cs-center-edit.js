const fileInputEdit = document.getElementById("fileInputEdit");
const editImageBtn = document.getElementById("editImageBtn");
const imageFileTitle = document.querySelector(".image-file__title");

function clickEditImageBtn() {
  fileInputEdit.click();
}

function setFileName() {
  imageFileTitle.textContent = fileInputEdit.files[0].name;
}

document.addEventListener("DOMContentLoaded", () => {
  editImageBtn.addEventListener("click", clickEditImageBtn);

  fileInputEdit.addEventListener("change", setFileName);
});
