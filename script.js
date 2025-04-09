document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const extensionsContainer = document.getElementById('extensions-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // State
  let extensionsData = [];
  let currentFilter = 'all';

  // Initialize
  initTheme();
  loadExtensions();

  // Event Listeners
  themeToggle.addEventListener('click', toggleTheme);
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      updateFilterButtons();
      renderExtensions();
    });
  });

  // Functions
  function initTheme() {
    // Check for saved theme preference - the default is dark based on the image
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  function toggleTheme() {
    const isLightMode = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  }

  function loadExtensions() {
    // In a real app, this would be a fetch request to get the JSON data
    // For this demo, we'll use the data directly
    extensionsData = [
      {
        logo: "./assets/images/logo-devlens.svg",
        name: "DevLens",
        description: "Quickly inspect page layouts and visualize element boundaries.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-style-spy.svg",
        name: "StyleSpy",
        description: "Instantly analyze and copy CSS from any webpage element.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-speed-boost.svg",
        name: "SpeedBoost",
        description: "Optimizes browser resource usage to accelerate page loading.",
        isActive: false
      },
      {
        logo: "./assets/images/logo-json-wizard.svg",
        name: "JSONWizard",
        description: "Formats, validates, and prettifies JSON responses in-browser.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-tab-master-pro.svg",
        name: "TabMaster Pro",
        description: "Organizes browser tabs into groups and sessions.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-viewport-buddy.svg",
        name: "ViewportBuddy",
        description: "Simulates various screen resolutions directly within the browser.",
        isActive: false
      },
      {
        logo: "./assets/images/logo-markup-notes.svg",
        name: "Markup Notes",
        description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-grid-guides.svg",
        name: "GridGuides",
        description: "Overlay customizable grids and alignment guides on any webpage.",
        isActive: false
      },
      {
        logo: "./assets/images/logo-palette-picker.svg",
        name: "Palette Picker",
        description: "Instantly extracts color palettes from any webpage.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-link-checker.svg",
        name: "LinkChecker",
        description: "Scans and highlights broken links on any page.",
        isActive: true
      },
      {
        logo: "./assets/images/logo-dom-snapshot.svg",
        name: "DOM Snapshot",
        description: "Capture and export DOM structures quickly.",
        isActive: false
      },
      {
        logo: "./assets/images/logo-console-plus.svg",
        name: "ConsolePlus",
        description: "Enhanced developer console with advanced filtering and logging.",
        isActive: true
      }
    ];
    
    renderExtensions();
  }

  function updateFilterButtons() {
    filterButtons.forEach(button => {
      if (button.dataset.filter === currentFilter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  function renderExtensions() {
    // Clear container
    extensionsContainer.innerHTML = '';
    
    // Filter extensions based on current filter
    const filteredExtensions = extensionsData.filter(extension => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'active') return extension.isActive;
      if (currentFilter === 'inactive') return !extension.isActive;
      return true;
    });
    
    // Create and append extension cards
    filteredExtensions.forEach(extension => {
      const extensionCard = createExtensionCard(extension);
      extensionsContainer.appendChild(extensionCard);
    });
  }

  function createExtensionCard(extension) {
    const card = document.createElement('div');
    card.className = 'extension-card';
    card.dataset.name = extension.name;
    
    card.innerHTML = `
      <div class="extension-header">
        <img class="extension-logo" src="${extension.logo}" alt="${extension.name} logo">
        <div class="extension-content">
          <div class="extension-name">${extension.name}</div>
          <div class="extension-description">${extension.description}</div>
        </div>
      </div>
      <div class="extension-actions">
        <button class="remove-btn">Remove</button>
        <label class="toggle-switch">
          <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
    `;
    
    // Add event listeners to the card's interactive elements
    const toggleSwitch = card.querySelector('input[type="checkbox"]');
    toggleSwitch.addEventListener('change', () => {
      toggleExtension(extension.name);
    });
    
    const removeButton = card.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => {
      removeExtension(extension.name);
    });
    
    return card;
  }

  function toggleExtension(name) {
    // Find and update the extension in the data
    const extension = extensionsData.find(ext => ext.name === name);
    if (extension) {
      extension.isActive = !extension.isActive;
      
      // If we're filtering, we might need to re-render if the extension
      // no longer matches the current filter
      if (currentFilter !== 'all') {
        renderExtensions();
      }
    }
  }

  function removeExtension(name) {
    // Remove the extension from the data
    extensionsData = extensionsData.filter(ext => ext.name !== name);
    
    // Re-render the list
    renderExtensions();
  }
});