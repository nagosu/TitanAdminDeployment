const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deleteButton");
const saveErrorModalConfirm = document.getElementById("saveErrorModalConfirm");
const saveErrorModalCloseButton = document.getElementById(
  "saveErrorModalCloseButton"
);
const promptErrorModalConfirm = document.getElementById(
  "promptErrorModalConfirm"
);
const promptErrorModalCloseButton = document.getElementById(
  "promptErrorModalCloseButton"
);
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalConfirmButton = document.getElementById(
  "deleteModalConfirmButton"
);
const deleteModalCancelButton = document.getElementById(
  "deleteModalCancelButton"
);

// 저장 오류 모달 열기 함수
function openSaveErrorModal() {
  saveErrorModalConfirm.style.display = "flex";
}

// 저장 오류 모달 닫기 함수
function closeSaveErrorModal() {
  saveErrorModalConfirm.style.display = "none";
}

// 프롬프트 번호 오류 모달 열기 함수
function openPromptErrorModal() {
  promptErrorModalConfirm.style.display = "flex";
}

// 프롬프트 번호 오류 모달 닫기 함수
function closePromptErrorModal() {
  promptErrorModalConfirm.style.display = "none";
}

// 삭제 모달 열기 함수
function openDeleteModal() {
  deleteModalConfirm.style.display = "flex";
}

// 삭제 모달 닫기 함수
function closeDeleteModal() {
  deleteModalConfirm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  saveButton.addEventListener("click", () => {
    openSaveErrorModal();
    openPromptErrorModal();
  });

  saveErrorModalCloseButton.addEventListener("click", closeSaveErrorModal);

  promptErrorModalCloseButton.addEventListener("click", closePromptErrorModal);

  deleteButton.addEventListener("click", openDeleteModal);

  deleteModalConfirmButton.addEventListener("click", closeDeleteModal);

  deleteModalCancelButton.addEventListener("click", closeDeleteModal);
});
