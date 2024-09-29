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
const addButton = document.querySelector(".add-button__container img");
const container = document.querySelector(".problem-add__form-container");

let promptCount = 1;

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

// 프롬프트 추가 함수
function addNewPrompt() {
  const newPromptNumber =
    document.querySelectorAll(".problem-add__content").length + 1; // 현재 프롬프트 개수를 기준으로 번호 부여

  // 새로운 프롬프트 HTML 생성
  const newPrompt = document.createElement("div");
  newPrompt.classList.add("problem-add__content");
  newPrompt.innerHTML = `
    <h3>유형 프롬프트 ${newPromptNumber}</h3>
    <div class="column">
      <div class="prompt__delete-button">
        <img src="../../static/images/icon/svg/Close_round.svg" alt="삭제" />
      </div>
      <textarea placeholder="프롬프트를 입력해주세요"></textarea>
    </div>
  `;

  // 삭제 버튼 클릭 시 해당 프롬프트 제거
  const deleteButton = newPrompt.querySelector(".prompt__delete-button");
  deleteButton.addEventListener("click", () => {
    container.removeChild(newPrompt);
    updatePromptTitles(); // 번호 다시 업데이트
  });

  // 추가 버튼 위에 새 프롬프트 삽입
  container.insertBefore(
    newPrompt,
    document.querySelector(".add-button__container")
  );

  newPrompt.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 프롬프트 번호 업데이트 함수
function updatePromptTitles() {
  const prompts = document.querySelectorAll(".problem-add__content h3");
  prompts.forEach((prompt, index) => {
    prompt.textContent = `유형 프롬프트 ${index + 1}`;
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

  addButton.addEventListener("click", addNewPrompt);
});
