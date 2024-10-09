const saveButton = document.querySelector(".save__button");
const saveTitleErrorModalConfirm = document.getElementById(
  "saveTitleErrorModalConfirm"
);
const saveTitleErrorModalCloseButton = document.getElementById(
  "saveTitleErrorModalCloseButton"
);
const saveContentErrorModalConfirm = document.getElementById(
  "saveContentErrorModalConfirm"
);
const saveContentErrorModalCloseButton = document.getElementById(
  "saveContentErrorModalCloseButton"
);
const deleteButtons = document.querySelectorAll(".delete__button");
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalCloseButton = document.getElementById(
  "deleteModalCloseButton"
);
const inputPassageTitle = document.querySelector('input[name="지문제목"]');
const inputPassageContent = document.querySelector('textarea[name="지문본문"]');
const inputFiles = document.querySelectorAll('input[type="file"]');
const inputButtons = document.querySelectorAll(".input__button");
const depth2Dropdown = document.querySelector(".depth2 .dropdown-menu");
const depth3Dropdown = document.querySelector(".depth3 .dropdown-menu");
const depth4Dropdown = document.querySelector(".depth4 .dropdown-menu");
const depth5Dropdown = document.querySelector(".depth5 .dropdown-menu");
const depth2Title = document.querySelector(".depth2 .selected");
const depth3Title = document.querySelector(".depth3 .selected");
const depth4Title = document.querySelector(".depth4 .selected");
const depth5Title = document.querySelector(".depth5 .selected");

const lectureData = {
  교과서: textbookData,
  모의고사: mockExamPassageData,
  EBS: ebsData,
  시중단어책: sellbookData,
};

function initDropdown() {
  const depth1Options = Object.keys(lectureData);
  createDropdown(depth1Options, "depth1");
  createDropdown([], "depth2");
  createDropdown([], "depth3");
  createDropdown([], "depth4");
  createDropdown([], "depth5");
}

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
        updateDepth3Options(this.textContent);
      } else if (depthClass === "depth3") {
        updateDepth4Options(this.textContent);
      } else if (depthClass === "depth4") {
        updateDepth5Options(this.textContent);
      }
    });
  });
}

function updateDepth2Options(depth1Value) {
  depth2Dropdown.innerHTML = "";
  depth3Dropdown.innerHTML = "";
  depth4Dropdown.innerHTML = "";
  depth5Dropdown.innerHTML = "";

  depth2Title.childNodes[0].nodeValue = "2차 카테고리 선택 ";
  depth3Title.childNodes[0].nodeValue = "3차 카테고리 선택 ";
  depth4Title.childNodes[0].nodeValue = "4차 카테고리 선택 ";
  depth5Title.childNodes[0].nodeValue = "지문 등록 및 수정 ";

  const options = Object.keys(lectureData[depth1Value]);
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

function updateDepth3Options(depth2Value) {
  const depth1Selected = document
    .querySelector(".depth1 .selected")
    .textContent.trim();

  depth3Dropdown.innerHTML = "";
  depth4Dropdown.innerHTML = "";
  depth5Dropdown.innerHTML = "";

  depth3Title.childNodes[0].nodeValue = "3차 카테고리 선택 ";
  depth4Title.childNodes[0].nodeValue = "4차 카테고리 선택 ";
  depth5Title.childNodes[0].nodeValue = "지문 등록 및 수정 ";

  const options = Object.keys(lectureData[depth1Selected][depth2Value]);
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth3Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(".depth3 .selected");
      selected.childNodes[0].nodeValue = this.textContent + " ";

      if (depth1Selected === "모의고사" || depth1Selected === "시중단어책") {
        const depth4Selected = document.querySelector(".depth4 .selected");
        depth4Selected.childNodes[0].nodeValue = "해당 사항 없음 ";
        updateDepth5Options(option);
      } else {
        updateDepth4Options(option);
      }
    });
  });
}

function updateDepth4Options(depth3Value) {
  const depth1Selected = document
    .querySelector(".depth1 .selected")
    .textContent.trim();
  const depth2Selected = document
    .querySelector(".depth2 .selected")
    .textContent.trim();

  depth4Dropdown.innerHTML = "";
  depth5Dropdown.innerHTML = "";

  depth4Title.childNodes[0].nodeValue = "4차 카테고리 선택 ";
  depth5Title.childNodes[0].nodeValue = "지문 등록 및 수정 ";

  const options = Object.keys(
    lectureData[depth1Selected][depth2Selected][depth3Value]
  );

  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth4Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(".depth4 .selected");
      selected.childNodes[0].nodeValue = this.textContent + " ";

      updateDepth5Options(option);
    });
  });
}

function updateDepth5Options(depth4Value) {
  const depth1Selected = document
    .querySelector(".depth1 .selected")
    .textContent.trim();
  const depth2Selected = document
    .querySelector(".depth2 .selected")
    .textContent.trim();
  const depth3Selected = document
    .querySelector(".depth3 .selected")
    .textContent.trim();

  depth5Dropdown.innerHTML = "";

  depth5Title.childNodes[0].nodeValue = "지문 등록 및 수정 ";

  const addNewPassage = document.createElement("div");
  addNewPassage.textContent = "신규 지문 등록";
  depth5Dropdown.appendChild(addNewPassage);

  addNewPassage.addEventListener("click", function () {
    const selected = document.querySelector(".depth5 .selected");
    selected.childNodes[0].nodeValue = this.textContent + " ";
  });

  let options;

  if (depth1Selected === "모의고사") {
    options = lectureData[depth1Selected][depth2Selected][depth4Value];
  } else if (depth1Selected === "시중단어책") {
    options = lectureData[depth1Selected][depth2Selected][depth4Value];
  } else {
    options =
      lectureData[depth1Selected][depth2Selected][depth3Selected][depth4Value];
  }

  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth5Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(".depth5 .selected");
      selected.childNodes[0].nodeValue = this.textContent + " ";
    });
  });
}

function updateButtonTextToFileName(input, button) {
  const fileName = input.files[0].name;
  button.textContent = fileName;
}

// 저장 오류 모달 열기 함수
function openSaveErrorModal() {
  if (inputPassageTitle.value === "") {
    saveTitleErrorModalConfirm.style.display = "flex";
  } else if (inputPassageContent.value === "") {
    saveContentErrorModalConfirm.style.display = "flex";
  }
}

// 저장 오류 모달 닫기 함수
function closeSaveErrorModal() {
  saveTitleErrorModalConfirm.style.display = "none";
  saveContentErrorModalConfirm.style.display = "none";
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

  saveButton.addEventListener("click", openSaveErrorModal);

  saveTitleErrorModalCloseButton.addEventListener("click", closeSaveErrorModal);

  saveContentErrorModalCloseButton.addEventListener(
    "click",
    closeSaveErrorModal
  );

  deleteButtons.forEach((button) => {
    button.addEventListener("click", openDeleteModal);
  });

  deleteModalCloseButton.addEventListener("click", closeDeleteModal);

  inputButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button
        .closest(".pdf__item-title-container")
        .querySelector("input[type='file']");
      input.click();
    });
  });

  inputFiles.forEach((input) => {
    input.addEventListener("change", () => {
      const button = input
        .closest(".pdf__item-title-container")
        .querySelector(".input__button");
      updateButtonTextToFileName(input, button);
    });
  });
});
