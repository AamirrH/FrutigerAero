function getWindowRoot(titleBar) {
  return titleBar.closest(".overlay, .window, .ie6-window");
}

function getControlButtons(titleBar) {
  const titleRightButtons = Array.from(titleBar.querySelectorAll(".title-right .btn"));

  return {
    minimize: titleBar.querySelector(".minimise, .min") || titleRightButtons[0],
    maximize: titleBar.querySelector(".Resume, .max") || titleRightButtons[1],
    close: titleBar.querySelector(".close-btn, .close, .btn1"),
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function keepWindowInViewport(root) {
  const rect = root.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - rect.width);
  const maxTop = Math.max(0, window.innerHeight - rect.height);

  root.style.left = `${clamp(rect.left, 0, maxLeft)}px`;
  root.style.top = `${clamp(rect.top, 0, maxTop)}px`;
}

function startDrag(event, root, dragState) {
  if (event.target.closest("button") || root.classList.contains("window-maximized")) {
    return;
  }

  const rect = root.getBoundingClientRect();
  dragState.active = true;
  dragState.offsetX = event.clientX - rect.left;
  dragState.offsetY = event.clientY - rect.top;

  root.style.position = "fixed";
  root.style.width = `${rect.width}px`;
  root.style.height = `${rect.height}px`;
  root.style.left = `${rect.left}px`;
  root.style.top = `${rect.top}px`;
  root.style.margin = "0";
  root.style.zIndex = "4000";
}

function dragWindow(event, root, dragState) {
  if (!dragState.active) {
    return;
  }

  const maxLeft = Math.max(0, window.innerWidth - root.offsetWidth);
  const maxTop = Math.max(0, window.innerHeight - root.offsetHeight);
  const nextLeft = clamp(event.clientX - dragState.offsetX, 0, maxLeft);
  const nextTop = clamp(event.clientY - dragState.offsetY, 0, maxTop);

  root.style.left = `${nextLeft}px`;
  root.style.top = `${nextTop}px`;
}

function stopDrag(dragState) {
  dragState.active = false;
}

document.querySelectorAll(".title-bar").forEach((titleBar) => {
  const root = getWindowRoot(titleBar);

  if (!root) {
    return;
  }

  root.classList.add("window-managed");

  const buttons = getControlButtons(titleBar);

  buttons.minimize?.addEventListener("click", () => {
    root.classList.toggle("window-minimized");
    root.classList.remove("window-maximized");
  });

  buttons.maximize?.addEventListener("click", () => {
    root.classList.toggle("window-maximized");
    root.classList.remove("window-minimized");

    if (root.classList.contains("window-maximized")) {
      root.style.left = "";
      root.style.top = "";
      root.style.width = "";
      root.style.height = "";
    }
  });

  buttons.close?.addEventListener("click", () => {
    root.classList.add("window-closed");
  });

  const dragState = {
    active: false,
    offsetX: 0,
    offsetY: 0,
  };

  titleBar.addEventListener("mousedown", (event) => startDrag(event, root, dragState));
  window.addEventListener("mousemove", (event) => dragWindow(event, root, dragState));
  window.addEventListener("mouseup", () => stopDrag(dragState));
  window.addEventListener("resize", () => keepWindowInViewport(root));
});
