const buttons = document.querySelectorAll(".select__button button");
const usedButton = document.querySelector(".used__button");
const notUsedButton = document.querySelector(".not-used__button");
const usedTable = document.querySelector(".used__table");
const notUsedTable = document.querySelector(".not-used__table");

// 사용/미사용 코드 테이블 변경 함수
function changeTable() {
  if (usedTable.classList.contains("active")) {
    notUsedTable.style.display = "none";
    usedTable.style.display = "flex";
  } else if (notUsedTable.classList.contains("active")) {
    usedTable.style.display = "none";
    notUsedTable.style.display = "flex";
  }
}

// 버튼 클릭 시 active 클래스 추가 함수
function addActiveClass(button) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  if (button.classList.contains("used__button")) {
    usedTable.classList.add("active");
    notUsedTable.classList.remove("active");
  } else if (button.classList.contains("not-used__button")) {
    notUsedTable.classList.add("active");
    usedTable.classList.remove("active");
  }
  changeTable();
}

document.addEventListener("DOMContentLoaded", () => {
  changeTable(); // 초기 테이블 설정

  // 사용/미사용 버튼 클릭 이벤트
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      addActiveClass(button);
    });
  });
});
