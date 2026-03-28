(function () {
  const copyButtons = document.querySelectorAll("[data-copy]");
  const statusNode = document.getElementById("copy-status");
  const toggleButton = document.getElementById("toggle-links");
  const linksPanel = document.getElementById("links-panel");

  function setStatus(message, isError) {
    if (!statusNode) {
      return;
    }

    statusNode.textContent = message;
    statusNode.style.color = isError ? "#8f2a2a" : "#215d46";
  }

  async function handleCopy(value) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      setStatus("Twoja przeglądarka nie wspiera kopiowania automatycznego.", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setStatus("Skopiowano do schowka.", false);
    } catch (error) {
      setStatus("Nie udało się skopiować. Użyj przycisku \"Wyświetl linki\".", true);
    }
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.getAttribute("data-copy");
      if (value) {
        handleCopy(value);
      }
    });
  });

  if (toggleButton && linksPanel) {
    toggleButton.addEventListener("click", function () {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      const nextExpanded = !isExpanded;

      toggleButton.setAttribute("aria-expanded", String(nextExpanded));
      linksPanel.hidden = !nextExpanded;
      toggleButton.textContent = nextExpanded ? "Ukryj linki" : "Wyświetl linki";
    });
  }
})();
