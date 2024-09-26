const loginButton = document.getElementById("loginButton");
const loginModalCloseButton = document.getElementById("loginModalCloseButton");
const loginModalConfirm = document.getElementById("loginModalConfirm");

// 로그인 오류 모달 열기 함수
function openLoginErrorModal() {
  loginModalConfirm.style.display = "flex";
}

// 로그인 오류 모달 닫기 함수
function closeLoginErrorModal() {
  loginModalConfirm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  loginButton.addEventListener("click", openLoginErrorModal);

  loginModalCloseButton.addEventListener("click", closeLoginErrorModal);
});
