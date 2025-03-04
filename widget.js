(function(w, d) {
    // Create the floating action button
    const fab = document.createElement("button");
    fab.classList.add("floating-action-button");
    fab.innerHTML = "+"; // Using + as the default icon
    
    // Add click handler
    fab.onclick = function() {
        alert("FAB clicked!");
    };

    // Add CSS styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        .floating-action-button {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #2196F3;
            color: white;
            border: none;
            font-size: 24px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .floating-action-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .floating-action-button:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(styleTag);

    // Append the FAB to the body
    document.body.appendChild(fab);
})(window, document);
