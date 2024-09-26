const fileInputUpload = document.getElementById("fileInputUpload");
const uploadImageBtn = document.getElementById("uploadImageBtn");
const imageFileTitle = document.querySelector(".image-file__title");

function clickUploadImageBtn() {
  fileInputUpload.click();
}

function setFileName() {
  imageFileTitle.textContent = fileInputUpload.files[0].name;
}

document.addEventListener("DOMContentLoaded", () => {
  uploadImageBtn.addEventListener("click", clickUploadImageBtn);

  fileInputUpload.addEventListener("change", setFileName);
});
