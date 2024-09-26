const rangeSaveButton = document.querySelector(".range__save-button");
const saveModalConfirm = document.getElementById("saveModalConfirm");
const saveModalMessage = document.getElementById("saveModalMessage");
const saveModalConfirmButton = document.getElementById(
  "saveModalConfirmButton"
);
const saveModalCancelButton = document.getElementById("saveModalCancelButton");
let slider = document.getElementById("range");
let output = document.getElementById("value");

// % 값 변경 함수
function changeSliderValue() {
  output.innerHTML = this.value + "%";
}

// 저장 확인 모달 열기 함수
function openSaveModal() {
  saveModalConfirm.style.display = "flex";
}

// 저장 확인 모달 닫기 함수
function closeSaveModal() {
  saveModalConfirm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  changeSliderValue.call(slider);

  slider.addEventListener("input", changeSliderValue);

  rangeSaveButton.addEventListener("click", openSaveModal);

  saveModalConfirmButton.addEventListener("click", closeSaveModal);

  saveModalCancelButton.addEventListener("click", closeSaveModal);
});
