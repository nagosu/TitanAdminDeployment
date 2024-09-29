const rangeSaveButton = document.querySelector(".range__save-button");
const saveModalConfirm = document.getElementById("saveModalConfirm");
const saveModalMessage = document.getElementById("saveModalMessage");
const saveModalConfirmButton = document.getElementById(
  "saveModalConfirmButton"
);
const saveModalCancelButton = document.getElementById("saveModalCancelButton");
const slider = document.getElementById("range");
const startOutput = document.querySelector(".range__start");
const endOutput = document.getElementById("range__end");

// % 값 변경 함수
function changeSliderValue() {
  const currentValue = this.value;
  startOutput.textContent = 100 - currentValue + "%";
  endOutput.textContent = currentValue + "%";
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
