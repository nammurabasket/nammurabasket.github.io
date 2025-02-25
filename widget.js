(function(w, d) {
    // Create the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.classList.add("widget-container");

    // Add content to the widget container
    const widgetContent = document.createElement("p");
    widgetContent.textContent = "Hello, World!";
    widgetContainer.appendChild(widgetContent);

    // Create a button
    const button = document.createElement("button");
    button.textContent = "Click Me";
    button.onclick = function() {
        alert("Button clicked!");
    };
    widgetContainer.appendChild(button);

    // Add CSS styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .widget-container {
        width: 200px;
        height: 100px;
        background-color: #f0f0f0;
        padding: 10px;
        border: 1px solid #ddd;
      }
    `;
    document.head.appendChild(styleTag);

    // Append the widget to the body
    document.body.appendChild(widgetContainer);
})(window, document);
