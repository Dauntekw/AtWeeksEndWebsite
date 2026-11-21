var mainVolume = 0;
var soundChannels = {};

function updateVolume() {
  mainVolume = getVolume()
  setVolume(mainVolume);
}

function getVolume() {
  return document.getElementById("audioVolume").value / 100;
}

function setVolume(val) {
  document.getElementById("uiCancel").volume = val;
  document.getElementById("uiConfirm").volume = val;
  document.getElementById("uiMove").volume = val;
  document.getElementById("mainTheme").volume = val;
}

function playUIMove() {
  document.getElementById("uiMove").load();
  document.getElementById("uiMove").play();
}

function playUIConfirm() {
  document.getElementById("uiConfirm").load();
  document.getElementById("uiConfirm").play();
}

function playUICancel() {
  document.getElementById("uiCancel").load();
  document.getElementById("uiCancel").play();
}