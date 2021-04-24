export default function logoutUser() {
  //Object.keys(tokensInternal).forEach((key) => {
  localStorage.removeItem("infoUser");
  //});
  window.location.href = "/";
}
