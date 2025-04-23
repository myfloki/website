document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const copyButtons = document.querySelectorAll('.copy-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Add clipboard copy functionality
    // Using the browser's built-in Clipboard API
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.clipboardText;
            try {
                await navigator.clipboard.writeText(textToCopy);
                // Optional: Add visual feedback (e.g., change button text or color)
                const originalHTML = button.innerHTML; // Save original content

                // Use the checkmark path directly
                // Changed fill to use CSS variable --button-active-text
                const checkmarkSVG = `<svg class="copy-icon" viewBox="0 0 24 24" style="fill: var(--button-active-text);"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/></svg>`;
                button.innerHTML = checkmarkSVG;

                setTimeout(() => {
                    button.innerHTML = originalHTML; // Restore original content
                }, 2000); // Revert after 2 seconds

            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Optional: Show error feedback
            }
        });
    });

    // Correct path for curl command - fixed typo with extra '/'
    const curlCodeElement = document.querySelector('#curl code');
    if(curlCodeElement) {
        curlCodeElement.textContent = 'sh -c "$(curl -fsSL https://raw.githubusercontent.com/myfloki/community-tools/main/downloader.sh)"';
    }

    const curlCopyButton = document.querySelector('#curl .copy-button');
    if(curlCopyButton) {
        curlCopyButton.dataset.clipboardText = 'sh -c "$(curl -fsSL https://raw.githubusercontent.com/myfloki/community-tools/main/downloader.sh)"';
    }

    // No JS needed for boost box links, HTML/CSS handles it.
});