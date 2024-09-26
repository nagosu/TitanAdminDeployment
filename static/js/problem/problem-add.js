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

// 드롭다운 초기화 함수
function initDropdown() {
  const depth1Options = Object.keys(problemData);
  createDropdown(depth1Options, "depth1");
  createDropdown([], "depth2");
  createDropdown([], "depth3");
}

// 드롭다운 생성 함수
function createDropdown(options, depthClass) {
  const dropdown = document.querySelector(`.${depthClass}`);
  const selected = dropdown.querySelector(".selected");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");

  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    dropdownMenu.appendChild(optionDiv);
  });

  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });

  dropdownMenu.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();

      const dropdown = this.closest(".dropdown");
      const selected = dropdown.querySelector(".selected");
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");

      selected.childNodes[0].nodeValue = this.textContent + " ";
      dropdown.classList.remove("active");
      dropdownMenu.classList.remove("active");

      if (depthClass === "depth1") {
        updateDepth2Options(this.textContent);
      } else if (depthClass === "depth2") {
        updateDepth3Options(selected.textContent);
      }
    });
  });
}

// DEPTH 2 옵션 업데이트 함수
function updateDepth2Options(depth1Value) {
  const depth2Dropdown = document.querySelector(".depth2 .dropdown-menu");
  depth2Dropdown.innerHTML = "";

  const options = Object.keys(problemData[depth1Value]);
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth2Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(".depth2 .selected");
      selected.childNodes[0].nodeValue = this.textContent + " ";

      updateDepth3Options(option);
    });
  });
}

// DEPTH 3 옵션 업데이트 함수
function updateDepth3Options(depth2Value) {
  const depth1Selected = document
    .querySelector(".depth1 .selected")
    .textContent.trim();
  const depth3Dropdown = document.querySelector(".depth3 .dropdown-menu");
  depth3Dropdown.innerHTML = "";

  const addNewType = document.createElement("div");
  addNewType.textContent = "신규 유형 등록";
  depth3Dropdown.appendChild(addNewType);

  addNewType.addEventListener("click", function () {
    const selected = document.querySelector(".depth3 .selected");
    selected.childNodes[0].nodeValue = this.textContent + " ";
  });

  const options = problemData[depth1Selected][depth2Value];
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth3Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(".depth3 .selected");
      selected.childNodes[0].nodeValue = this.textContent + " ";
    });
  });
}

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
  initDropdown();

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
