const schoolButtonSave = document.querySelector(".school__button.save");
const schoolButtonDelete = document.querySelector(".school__button.delete");
const selectErrorModalConfirm = document.getElementById(
  "selectErrorModalConfirm"
);
const selectErrorModalMessage = document.getElementById(
  "selectErrorModalMessage"
);
const selectErrorModalCloseButton = document.getElementById(
  "selectErrorModalCloseButton"
);
const saveModalConfirm = document.getElementById("saveModalConfirm");
const saveModalMessage = document.getElementById("saveModalMessage");
const saveModalCloseButton = document.getElementById("saveModalCloseButton");
const deleteErrorModalConfirm = document.getElementById(
  "deleteErrorModalConfirm"
);
const deleteErrorModalMessage = document.getElementById(
  "deleteErrorModalMessage"
);
const deleteErrorModalCloseButton = document.getElementById(
  "deleteErrorModalCloseButton"
);
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalConfirmButton = document.getElementById(
  "deleteModalConfirmButton"
);
const deleteModalCancelButton = document.getElementById(
  "deleteModalCancelButton"
);
const inputContainer = document.querySelector(".input__container");
const inputDropdown = document.querySelector(".input__dropdown");

// 문제 30개를 생성하는 함수
function createProblems() {
  const problemGrid = document.querySelector(".problem__grid");

  for (let i = 1; i <= 30; i++) {
    const problemGridItem = document.createElement("div");
    problemGridItem.classList.add("problem__grid-item");

    const problemTitle = document.createElement("h4");
    problemTitle.textContent = `문제 ${i}.`;

    // DEPTH 1, 2, 3 Dropdown 생성
    const depth1Dropdown = createDropdown(
      "DEPTH 1",
      Object.keys(problemData),
      i,
      "depth1"
    );
    const depth2Dropdown = createDropdown("DEPTH 2", [], i, "depth2");
    const depth3Dropdown = createDropdown("DEPTH 3", [], i, "depth3");

    problemGridItem.appendChild(problemTitle);
    problemGridItem.appendChild(depth1Dropdown);
    problemGridItem.appendChild(depth2Dropdown);
    problemGridItem.appendChild(depth3Dropdown);

    problemGrid.appendChild(problemGridItem);
  }
}

// 드롭다운 생성 함수
function createDropdown(depthLabel, options, problemIndex, depthClass) {
  const container = document.createElement("div");
  container.classList.add("problem__dropdown-container");

  const depth = document.createElement("span");
  depth.classList.add("depth");
  depth.textContent = depthLabel;

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown", depthClass);
  dropdown.dataset.index = problemIndex;

  const selected = document.createElement("div");
  selected.classList.add("selected");
  selected.textContent = depthLabel;
  const triangle = document.createElement("img");
  triangle.src = "/static/images/icon/svg/Arrow_drop_down.svg";
  triangle.alt = "드롭다운 화살표";
  triangle.classList.add("triangle");

  selected.appendChild(triangle);

  const dropdownMenu = document.createElement("div");
  dropdownMenu.classList.add("dropdown-menu");

  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    dropdownMenu.appendChild(optionDiv);
  });

  dropdown.appendChild(selected);
  dropdown.appendChild(dropdownMenu);

  container.appendChild(depth);
  container.appendChild(dropdown);

  // Dropdown 토글 기능
  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });

  // Dropdown 옵션 선택 시 처리
  dropdownMenu.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();

      const dropdown = this.closest(".dropdown"); // item의 상위에 있는 dropdown을 찾음
      const selected = dropdown.querySelector(".selected"); // 해당 dropdown의 selected 요소 찾음
      const dropdownMenu = dropdown.querySelector(".dropdown-menu"); // 해당 dropdown의 dropdown-menu 요소 찾음

      selected.childNodes[0].nodeValue = this.textContent + " ";
      dropdown.classList.remove("active");
      dropdownMenu.classList.remove("active");

      // DEPTH 1, 2, 3에 따라 다른 항목 업데이트
      if (depthClass === "depth1") {
        updateDepth2Options(problemIndex, this.textContent);
        resetDropdown(problemIndex, "depth3");
      } else if (depthClass === "depth2") {
        updateDepth3Options(problemIndex, selected.textContent);
      }
    });
  });

  return container;
}

// DEPTH 2 옵션 업데이트 함수
function updateDepth2Options(problemIndex, depth1Value) {
  const depth2Dropdown = document.querySelector(
    `.problem__grid-item:nth-child(${problemIndex}) .depth2 .dropdown-menu`
  );
  depth2Dropdown.innerHTML = "";

  const options = Object.keys(problemData[depth1Value]);
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth2Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(
        `.problem__grid-item:nth-child(${problemIndex}) .depth2 .selected`
      );
      selected.childNodes[0].nodeValue = this.textContent + " ";

      updateDepth3Options(problemIndex, option);
    });
  });

  resetDropdown(problemIndex, "depth3");
}

// DEPTH 3 옵션 업데이트 함수
function updateDepth3Options(problemIndex, depth2Value) {
  const depth1Selected = document
    .querySelector(
      `.problem__grid-item:nth-child(${problemIndex}) .depth1 .selected`
    )
    .textContent.trim(); // 앞서 추가된 공백을 고려하여 텍스트를 trim
  const depth3Dropdown = document.querySelector(
    `.problem__grid-item:nth-child(${problemIndex}) .depth3 .dropdown-menu`
  );
  depth3Dropdown.innerHTML = "";

  const options = problemData[depth1Selected][depth2Value];
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = option;
    depth3Dropdown.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      const selected = document.querySelector(
        `.problem__grid-item:nth-child(${problemIndex}) .depth3 .selected`
      );
      // 텍스트만 변경하고 이미지 유지
      selected.childNodes[0].nodeValue = this.textContent + " ";
    });
  });
}

// DEPTH 2, 3 초기화 함수
function resetDropdown(problemIndex, depthClass) {
  const selected = document.querySelector(
    `.problem__grid-item:nth-child(${problemIndex}) .${depthClass} .selected`
  );
  const dropdownMenu = document.querySelector(
    `.problem__grid-item:nth-child(${problemIndex}) .${depthClass} .dropdown-menu`
  );

  selected.childNodes[0].nodeValue = `${depthClass.toUpperCase()} `; // 초기화된 텍스트
  dropdownMenu.innerHTML = ""; // 메뉴 항목 초기화
}

// 선택 오류 모달 열기 함수
function openSelectErrorModal() {
  selectErrorModalConfirm.style.display = "flex";
}

// 선택 오류 모달 닫기 함수
function closeSelectErrorModal() {
  selectErrorModalConfirm.style.display = "none";
}

// 저장 모달 열기 함수
function openSaveModal() {
  saveModalConfirm.style.display = "flex";
}

// 저장 모달 닫기 함수
function closeSaveModal() {
  saveModalConfirm.style.display = "none";
}

// 삭제 모달 열기 함수
function openDeleteModal() {
  deleteModalConfirm.style.display = "flex";
}

// 삭제 모달 닫기 함수
function closeDeleteModal() {
  deleteModalConfirm.style.display = "none";
}

// 삭제 오류 모달 열기 함수
function openDeleteErrorModal() {
  deleteErrorModalConfirm.style.display = "flex";
}

// 삭제 오류 모달 닫기 함수
function closeDeleteErrorModal() {
  deleteErrorModalConfirm.style.display = "none";
}

// input 드롭다운 활성화/비활성화 처리 함수
function toggleInputDropdown(event, inputContainer, dropdown) {
  if (inputContainer.contains(event.target)) {
    dropdown.classList.add("active");
  } else {
    dropdown.classList.remove("active");
  }
}

// DOMContentLoaded 이벤트 핸들링
document.addEventListener("DOMContentLoaded", () => {
  createProblems();

  schoolButtonSave.addEventListener("click", () => {
    openSelectErrorModal();
    openSaveModal();
  });

  selectErrorModalCloseButton.addEventListener("click", () => {
    closeSelectErrorModal();
  });

  schoolButtonDelete.addEventListener("click", () => {
    openDeleteErrorModal();
    openDeleteModal();
  });

  deleteErrorModalCloseButton.addEventListener("click", () => {
    closeDeleteErrorModal();
  });

  saveModalCloseButton.addEventListener("click", closeSaveModal);

  deleteModalCancelButton.addEventListener("click", closeDeleteModal);

  deleteModalConfirmButton.addEventListener("click", closeDeleteModal);

  document.addEventListener("click", (event) =>
    toggleInputDropdown(event, inputContainer, inputDropdown)
  );
});
