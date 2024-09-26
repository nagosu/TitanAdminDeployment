const myPassageFolderDropdown = document.getElementById(
  "myPassageFolderDropdown"
);
const myPassageFolderSelected = document.getElementById(
  "myPassageFolderSelected"
);
const myPassageFolderDropdownMenu = document.getElementById(
  "myPassageFolderDropdownMenu"
);
const passageDropdown = document.getElementById("passageDropdown");
const passageSelected = document.getElementById("passageSelected");
const passageDropdownMenu = document.getElementById("passageDropdownMenu");

let selectedPassageFolder = "";
let selectedPassage = "";

// 드롭다운 활성화/비활성화 처리 함수 (MY 지문 폴더 선택)
function toggleMyPassageFolderDropdown(event) {
  if (myPassageFolderDropdown.contains(event.target)) {
    myPassageFolderDropdown.classList.toggle("active");
    myPassageFolderDropdownMenu.classList.toggle("active");
  } else {
    myPassageFolderDropdown.classList.remove("active");
    myPassageFolderDropdownMenu.classList.remove("active");
  }
}

// 드롭다운 메뉴 항목 선택 처리 함수 (MY 지문 폴더 선택)
function selectMyPassageFolderItem(event) {
  event.stopPropagation();
  myPassageFolderSelected.childNodes[0].nodeValue = this.textContent;
  selectedPassageFolder = this.textContent;
  console.log("selectedPassageFolder :", selectedPassageFolder);
  myPassageFolderDropdown.classList.remove("active");
  myPassageFolderDropdownMenu.classList.remove("active");
}

// 드롭다운 활성화/비활성화 처리 함수 (지문 선택)
function togglePassageDropdown(event) {
  if (passageDropdown.contains(event.target)) {
    passageDropdown.classList.toggle("active");
    passageDropdownMenu.classList.toggle("active");
  } else {
    passageDropdown.classList.remove("active");
    passageDropdownMenu.classList.remove("active");
  }
}

// 드롭다운 메뉴 항목 선택 처리 함수 (지문 선택)
function selectPassageItem(event) {
  event.stopPropagation();
  passageSelected.childNodes[0].nodeValue = this.textContent;
  selectedPassage = this.textContent;
  console.log("selectedPassage :", selectedPassage);
  passageDropdown.classList.remove("active");
  passageDropdownMenu.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", toggleMyPassageFolderDropdown);
  myPassageFolderDropdownMenu.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", selectMyPassageFolderItem);
  });

  document.addEventListener("click", togglePassageDropdown);
  passageDropdownMenu.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", selectPassageItem);
  });
});
