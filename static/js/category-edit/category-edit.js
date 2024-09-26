const categorySelectButtons = document.querySelectorAll(
  ".category__select-button"
);
const editButton = document.querySelector(".category__edit-button");
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalConfirmButton = document.getElementById(
  "deleteModalConfirmButton"
);
const deleteModalCancelButton = document.getElementById(
  "deleteModalCancelButton"
);
const blankModalConfirm = document.getElementById("blankModalConfirm");
const blankModalCloseButton = document.getElementById("blankModalCloseButton");
const blankModalMessage = document.getElementById("blankModalMessage");
const categoryDepthAddButtons = document.querySelectorAll(
  ".category__depth-add-button"
);
const categoryDepthSelect = document.querySelector(".category__depth-select");
const depth2Container = document.getElementById("depth2Container");
const depth3Container = document.getElementById("depth3Container");
const depth4Container = document.getElementById("depth4Container");
const depth5Container = document.getElementById("depth5Container");

// depth 카테고리 데이터
const categoryData = {
  교과서: textbookData,
  모의고사: mockExamData,
  EBS: ebsData,
  시중단어책: sellbookData,
};

let editMode = false;

// 현재 선택된 카테고리
let currentCategory = "교과서";

// 카테고리 선택 시 데이터 로드 함수
function loadCategoryData(
  category,
  depth2Container,
  depth3Container,
  depth4Container,
  depth5Container
) {
  const data = categoryData[category];
  const depth2Keys = Object.keys(data[category]);

  // depth2 데이터 로드
  depth2Container.innerHTML = "";
  depth2Keys.forEach((key) => {
    const div = document.createElement("div");
    div.classList.add("category__depth-select-title-wrapper");
    const span = document.createElement("span");
    span.textContent = key;
    span.classList.add("category__depth-select-title");
    div.appendChild(span);
    depth2Container.appendChild(div);

    span.addEventListener("click", () => {
      depth2Container
        .querySelectorAll(".active")
        .forEach((el) => el.classList.remove("active"));
      span.classList.add("active");
      loadDepth3Data(
        data[category][key],
        depth3Container,
        depth4Container,
        depth5Container
      );
    });
  });
}

// depth3 데이터 로드 함수
function loadDepth3Data(
  depth3Data,
  depth3Container,
  depth4Container,
  depth5Container
) {
  const depth3Keys = Object.keys(depth3Data);

  // depth3 데이터 로드
  depth3Container.innerHTML = "";
  depth3Keys.forEach((key) => {
    const div = document.createElement("div");
    div.classList.add("category__depth-select-title-wrapper");
    const span = document.createElement("span");
    span.textContent = key;
    span.classList.add("category__depth-select-title");
    div.appendChild(span);
    depth3Container.appendChild(div);

    span.addEventListener("click", () => {
      depth3Container
        .querySelectorAll(".active")
        .forEach((el) => el.classList.remove("active"));
      span.classList.add("active");
      loadDepth4Data(depth3Data[key], depth4Container, depth5Container);
    });
  });
}

// depth4 데이터 로드 함수
function loadDepth4Data(depth4Data, depth4Container, depth5Container) {
  const depth4Keys = Object.keys(depth4Data);

  // depth4 데이터 로드
  depth4Container.innerHTML = "";
  depth4Keys.forEach((key) => {
    const div = document.createElement("div");
    div.classList.add("category__depth-select-title-wrapper");
    const span = document.createElement("span");
    span.textContent = key;
    span.classList.add("category__depth-select-title");
    div.appendChild(span);
    depth4Container.appendChild(div);

    span.addEventListener("click", () => {
      depth4Container
        .querySelectorAll(".active")
        .forEach((el) => el.classList.remove("active"));
      if (currentCategory === "교과서" || currentCategory === "EBS") {
        span.classList.add("active");
      }
      loadDepth5Data(depth4Data[key], depth5Container);
    });
  });
}

// depth5 데이터 로드 함수
function loadDepth5Data(depth5Data, depth5Container) {
  depth5Container.innerHTML = "";
  depth5Data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("category__depth-select-title-wrapper");
    const span = document.createElement("span");
    span.textContent = item;
    span.classList.add("category__depth-select-title");
    div.appendChild(span);
    depth5Container.appendChild(div);
  });
}

categorySelectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categorySelectButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.textContent;

    depth2Container.innerHTML = "";
    depth3Container.innerHTML = "";
    depth4Container.innerHTML = "";
    depth5Container.innerHTML = "";

    editMode = false;
    editButton.textContent = "수정";

    loadCategoryData(
      currentCategory,
      depth2Container,
      depth3Container,
      depth4Container,
      depth5Container
    );
  });
});

// 수정/저장 버튼 토글 함수
function toggleEditButtonText() {
  if (editButton.textContent === "수정" && !editMode) {
    editMode = true;
    editButton.textContent = "저장";
    addDeleteIcons();
    attachDeleteIconEvents();
    showDepthAddButtons();
    makeTitlesEditable(true);
  } else {
    editMode = false;
    editButton.textContent = "수정";
    removeDeleteIcons();
    hideDepthAddButtons();
    makeTitlesEditable(false);
    openBlankModal();
  }
}

// "항목 추가" 버튼 표시 함수
function showDepthAddButtons() {
  categoryDepthAddButtons.forEach((button) => {
    button.style.display = "flex";
  });
  categoryDepthSelect.style.marginBottom = "80px";
}

// "항목 추가" 버튼 숨김 함수
function hideDepthAddButtons() {
  categoryDepthAddButtons.forEach((button) => {
    button.style.display = "none";
  });
  categoryDepthSelect.style.marginBottom = "0";
}

// 삭제 이미지 추가하는 함수
function addDeleteIcons() {
  const depthSelectTitleWrappers = document.querySelectorAll(
    ".category__depth-select-title-wrapper"
  );

  depthSelectTitleWrappers.forEach((wrapper) => {
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
  const depthSelectTitleWrappers = document.querySelectorAll(
    ".category__depth-select-title-wrapper"
  );

  depthSelectTitleWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (img) {
      wrapper.removeChild(img);
    }
  });
}

// 삭제 아이콘 클릭 이벤트 리스너 추가 함수
function attachDeleteIconEvents() {
  const deleteButtons = document.querySelectorAll(
    ".category__depth-select-title-wrapper img"
  );

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openDeleteConfirmModal();
    });
  });
}

// 삭제 확인 모달 여는 함수
function openDeleteConfirmModal() {
  deleteModalConfirm.style.display = "flex";
}

// 삭제 확인 모달 닫는 함수
function closeDeleteConfirmModal() {
  deleteModalConfirm.style.display = "none";
}

// 빈칸 오류 모달 여는 함수
function openBlankModal() {
  blankModalConfirm.style.display = "flex";
}

// 빈칸 오류 모달 닫는 함수
function closeBlankModal() {
  blankModalConfirm.style.display = "none";
}

// depth 카테고리 텍스트 수정 가능/불가 설정하는 함수
function makeTitlesEditable(isEditable) {
  const depthSelectTitles = document.querySelectorAll(
    ".category__depth-select-title"
  );

  depthSelectTitles.forEach((title) => {
    title.contentEditable = isEditable;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategoryData(
    currentCategory,
    depth2Container,
    depth3Container,
    depth4Container,
    depth5Container
  );

  editButton.addEventListener("click", toggleEditButtonText);

  deleteModalCancelButton.addEventListener("click", closeDeleteConfirmModal);

  deleteModalConfirmButton.addEventListener("click", closeDeleteConfirmModal);

  blankModalCloseButton.addEventListener("click", closeBlankModal);
});
