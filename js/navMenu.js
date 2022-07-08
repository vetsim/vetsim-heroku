const x = document.getElementById("dashboardtab");
const y = document.getElementById("drugstab");
const z = document.getElementById("fluidstab");
const s = document.getElementById("settingstab");


function showDashboardTab() {
  x.style.display = "block";
  y.style.display = "none";
  z.style.display = "none";
  s.style.display = "none";
}
  
function showDrugsTab() {  
  y.style.display = "block";
  x.style.display = "none";
  z.style.display = "none";
  s.style.display = "none";
}
  
function showFluidsTab() {
  z.style.display = "block";
  x.style.display = "none";
  y.style.display = "none";
  s.style.display = "none";
}
  
function showSettingsTab() {
  s.style.display = "block";
  z.style.display = "none";
  x.style.display = "none";
  y.style.display = "none";
}
  