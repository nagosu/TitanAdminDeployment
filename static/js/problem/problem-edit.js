const problemDepthSelectTitles = document.querySelectorAll(
  ".problem__depth-select-title"
);
const problemEditButton = document.querySelector(".problem__edit-button");
const problemDepthAddButtons = document.querySelectorAll(
  ".problem__depth-add-button"
);
const problemDepthSelects = document.querySelectorAll(".problem__depth-select");
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalConfirmButton = document.getElementById(
  "deleteModalConfirmButton"
);
const deleteModalCancelButton = document.getElementById(
  "deleteModalCancelButton"
);
const depth1Container = document.querySelector(".problem__depth-select.depth1");
const depth2Container = document.querySelector(".problem__depth-select.depth2");
const depth3Container = document.querySelector(".problem__depth-select.depth3");

let editMode = false;
let selectedDepth1 = "";
let selectedDepth2 = "";
let categoryToDelete = null; // 삭제할 카테고리

// depth1 항목 표시 함수
function showDepth1Options() {
  depth1Container.innerHTML = "";
  Object.keys(problemData).forEach((depth1) => {
    const div = document.createElement("div");
    div.classList.add("problem__depth-select-title-wrapper");
    div.innerHTML = `<span class="problem__depth-select-title">${depth1}</span>`;
    div.addEventListener("click", (event) => {
      handleDepth1Select(depth1);
      handleDepthSelect.call(event.target); // 클릭 시 active 적용
    });
    depth1Container.appendChild(div);
  });
}

// depth1 선택 시 depth2 항목 표시 함수
function handleDepth1Select(selected) {
  if (editMode) return;

  selectedDepth1 = selected;
  depth2Container.innerHTML = "";
  depth3Container.innerHTML = "";
  const depth2Data = Object.keys(problemData[selected]);
  depth2Data.forEach((depth2) => {
    const div = document.createElement("div");
    div.classList.add("problem__depth-select-title-wrapper");
    div.innerHTML = `<span class="problem__depth-select-title">${depth2}</span>`;
    div.addEventListener("click", (event) => {
      handleDepth2Select(depth2);
      handleDepthSelect.call(event.target); // 클릭 시 active 적용
    });
    depth2Container.appendChild(div);
  });
  depth2Container.style.display = "flex"; // depth2 표시
}

// depth2 선택 시 depth3 항목 표시 함수
function handleDepth2Select(selected) {
  if (editMode) return;

  selectedDepth2 = selected;
  depth3Container.innerHTML = ""; // 초기화
  const depth3Data = problemData[selectedDepth1][selected];
  depth3Data.forEach((depth3) => {
    const div = document.createElement("div");
    div.classList.add("problem__depth-select-title-wrapper");
    div.innerHTML = `<span class="problem__depth-select-title">${depth3}</span>`;
    depth3Container.appendChild(div);
  });
  depth3Container.style.display = "flex"; // depth3 표시
}

// "항목 추가" 버튼 클릭 시 새 카테고리 추가 함수
function addNewCategory(button) {
  const categoryContainer = button.previousElementSibling;

  const newCategoryWrapper = document.createElement("div");
  newCategoryWrapper.classList.add("problem__depth-select-title-wrapper");

  const newCategoryTitle = document.createElement("span");
  newCategoryTitle.classList.add("problem__depth-select-title");
  newCategoryTitle.textContent = "신규 카테고리";

  newCategoryWrapper.appendChild(newCategoryTitle);
  categoryContainer.appendChild(newCategoryWrapper);
}

function deleteCategory() {
  if (categoryToDelete) {
    categoryToDelete.remove();
    categoryToDelete = null;
    closeDeleteConfirmModal();
  }
}

// 삭제 확인 모달 여는 함수
function openDeleteConfirmModal() {
  deleteModalConfirm.style.display = "flex";
}

// 삭제 확인 모달 닫는 함수
function closeDeleteConfirmModal() {
  deleteModalConfirm.style.display = "none";
}

// depth 카테고리 active 클래스 변경 함수
function handleDepthSelect() {
  const problemDepthSelectContainer = this.closest(".problem__depth-select");
  const titles = problemDepthSelectContainer.querySelectorAll(
    ".problem__depth-select-title"
  );

  titles.forEach((title) => title.classList.remove("active"));
  this.classList.add("active");
}

// 수정/저장 버튼 토글 함수
function toggleEditButtonText() {
  editMode = !editMode; // 수정 모드 상태 토글

  if (problemEditButton.textContent === "수정") {
    problemEditButton.textContent = "저장";
    addDeleteIcons();
    attachDeleteIconEvents();
    showDepthAddButtons();
    makeTitlesEditable(true);
  } else {
    problemEditButton.textContent = "수정";
    removeDeleteIcons();
    hideDepthAddButtons();
    makeTitlesEditable(false);
  }
}

// "항목 추가" 버튼 표시 함수
function showDepthAddButtons() {
  problemDepthAddButtons.forEach((button) => {
    button.style.display = "flex";
  });

  problemDepthSelects.forEach((item) => {
    item.style.marginBottom = "80px";
  });
}

// "항목 추가" 버튼 숨김 함수
function hideDepthAddButtons() {
  problemDepthAddButtons.forEach((button) => {
    button.style.display = "none";
  });

  problemDepthSelects.forEach((item) => {
    item.style.marginBottom = "0";
  });
}

// 삭제 이미지 추가하는 함수
function addDeleteIcons() {
  const problemDepthSelectTitleWrappers = document.querySelectorAll(
    ".problem__depth-select-title-wrapper"
  );

  problemDepthSelectTitleWrappers.forEach((wrapper) => {
    if (!wrapper.querySelector("img")) {
      const img = document.createElement("img");
      img.src = "../../static/images/icon/svg/Remove.svg";
      img.alt = "삭제";
      wrapper.appendChild(img);
    }
  });
}

// 삭제 이미지 제거하는 함수
function removeDeleteIcons() {
  const problemDepthSelectTitleWrappers = document.querySelectorAll(
    ".problem__depth-select-title-wrapper"
  );

  problemDepthSelectTitleWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (img) {
      wrapper.removeChild(img);
    }
  });
}

// 삭제 아이콘 클릭 이벤트 리스너 추가 함수
function attachDeleteIconEvents() {
  const deleteButtons = document.querySelectorAll(
    ".problem__depth-select-title-wrapper img"
  );

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      categoryToDelete = e.target.closest(
        ".problem__depth-select-title-wrapper"
      );
      openDeleteConfirmModal();
    });
  });
}

// depth 카테고리 텍스트 수정 가능/불가 설정하는 함수
function makeTitlesEditable(isEditable) {
  const problemDepthSelectTitles = document.querySelectorAll(
    ".problem__depth-select-title"
  );

  problemDepthSelectTitles.forEach((title) => {
    title.contentEditable = isEditable;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showDepth1Options();

  problemDepthSelectTitles.forEach((title) => {
    title.addEventListener("click", handleDepthSelect);
  });

  problemEditButton.addEventListener("click", toggleEditButtonText);

  deleteModalConfirmButton.addEventListener("click", deleteCategory);

  deleteModalCancelButton.addEventListener("click", closeDeleteConfirmModal);

  problemDepthAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addNewCategory(button);
      addDeleteIcons();
      attachDeleteIconEvents();
      makeTitlesEditable(true);
    });
  });
});
