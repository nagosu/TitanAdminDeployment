const saveButton = document.querySelector(".save__button");
const saveErrorModalConfirm = document.getElementById("saveErrorModalConfirm");
const saveErrorModalMessage = document.getElementById("saveErrorModalMessage");
const saveErrorModalCloseButton = document.getElementById(
  "saveErrorModalCloseButton"
);
const deleteButtons = document.querySelectorAll(".delete__button");
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const deleteModalCloseButton = document.getElementById(
  "deleteModalCloseButton"
);
const dropdowns = document.querySelectorAll(".dropdown");

let selectedProblemTypes = {};

// 저장 오류 모달 열기 함수
function openSaveErrorModal() {
  saveErrorModalConfirm.style.display = "flex";
}

// 저장 오류 모달 닫기 함수
function closeSaveErrorModal() {
  saveErrorModalConfirm.style.display = "none";
}

// 삭제 모달 열기 함수
function openDeleteModal() {
  deleteModalConfirm.style.display = "flex";
}

// 삭제 모달 닫기 함수
function closeDeleteModal() {
  deleteModalConfirm.style.display = "none";
}

// 드롭다운 활성화/비활성화 처리 함수
function toggleDropdown(event, dropdown, dropdownMenu) {
  if (dropdown.contains(event.target)) {
    dropdown.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  } else {
    dropdown.classList.remove("active");
    dropdownMenu.classList.remove("active");
  }
}

// 드롭다운 메뉴 항목 선택 처리 함수
function selectDropdownItem(event, selected, dropdownMenu, dropdown, index) {
  event.stopPropagation();
  selected.childNodes[0].nodeValue = this.textContent;
  selectedProblemTypes[index] = this.textContent;
  dropdown.classList.remove("active");
  dropdownMenu.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  saveButton.addEventListener("click", openSaveErrorModal);

  saveErrorModalCloseButton.addEventListener("click", closeSaveErrorModal);

  deleteButtons.forEach((button) => {
    button.addEventListener("click", openDeleteModal);
  });

  deleteModalCloseButton.addEventListener("click", closeDeleteModal);

  dropdowns.forEach((dropdown, index) => {
    const selected = dropdown.querySelector(".selected");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    // 드롭다운 클릭시 활성화/비활성화 처리
    document.addEventListener("click", (event) =>
      toggleDropdown(event, dropdown, dropdownMenu)
    );

    // 각 드롭다운 항목을 클릭할 때 선택 항목 처리
    dropdownMenu.querySelectorAll("div").forEach((item) => {
      item.addEventListener("click", function (event) {
        selectDropdownItem.call(
          this,
          event,
          selected,
          dropdownMenu,
          dropdown,
          index
        );
      });
    });
  });
});
