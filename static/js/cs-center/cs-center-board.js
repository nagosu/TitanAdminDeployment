const deleteButtons = document.querySelectorAll(".delete__button");
const deleteModalConfirm = document.getElementById("deleteModalConfirm");
const deleteModalConfirmButton = document.getElementById(
  "deleteModalConfirmButton"
);
const deleteModalCancelButton = document.getElementById(
  "deleteModalCancelButton"
);

function openDeleteModal() {
  deleteModalConfirm.style.display = "flex";
}

function closeDeleteModal() {
  deleteModalConfirm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", openDeleteModal);
  });

  deleteModalConfirmButton.addEventListener("click", closeDeleteModal);

  deleteModalCancelButton.addEventListener("click", closeDeleteModal);
});
