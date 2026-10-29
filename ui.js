class AppUI {
  constructor(engine) {
    this.engine = engine;
    this.selectedCountryId = null;
    this.lastFrameTime = performance.now();
    this.activeModal = null;
    this.activeTab = "transmission";
    this.selectedPreset = "custom";
    this.selectedDiff = "normal";
    this.isDarkTheme = false;

    this.renderedBubbles = new Map();
    this.renderedVehicles = new Map();

    this.cacheDom();
    this.initTheme();
    this.bindEvents();
    this.renderMapSvg();
    this.startLoop();
    this.openModal('setup');
    
    // Periodically check for game over
    setInterval(() => this.checkGameOver(), 1000);
  }

  formatNum(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + " млрд";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + " млн";
    return num.toLocaleString("uk-UA");
  }

  checkGameOver() {
    if (this.engine.isGameOver && this.engine.gameOverData) {
      const data = this.engine.gameOverData;
      const modal = document.getElementById('modal-gameover');
      if (modal && modal.style.display !== 'flex') {
        document.getElementById('gameover-title').textContent = data.victory ? "Перемога Вірусу!" : "Поразка Вірусу";
        document.getElementById('gameover-reason').textContent = data.reason;
        
        const iconContainer = document.getElementById('gameover-icon');
        if (iconContainer) {
          if (data.victory) {
            // Biohazard icon for victory
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: var(--accent-red); filter: drop-shadow(0 0 10px var(--accent-red-glow));"><path d="M12 2a3 3 0 0 0-2.83 2H5.17A3 3 0 0 0 3 6.17V10a3 3 0 0 0 2 2.83V16a3 3 0 0 0 3 3h2.17A3 3 0 0 0 13 22a3 3 0 0 0 2.83-2H18a3 3 0 0 0 3-3v-3.17A3 3 0 0 0 23 11a3 3 0 0 0-2-2.83V5a3 3 0 0 0-3-3h-2.17A3 3 0 0 0 13 2h-1zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2h2v2H6V7zm10 0h2v2h-2V7zm-4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-6 3h2v2H6v-2zm10 0h2v2h-2v-2zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z"/></svg>`;
          } else if (data.reason.includes("вакцину")) {
            // Vaccine/Cure icon
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: var(--accent-blue);"><path d="M6 3h12v2H6zm11 3H7c-.55 0-1 .45-1 1v11c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V7c0-.55-.45-1-1-1z"/></svg>`;
          } else {
            // Skull icon for extinction/other defeat
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: var(--text-muted);"><path d="M12 2c-4.42 0-8 3.58-8 8 0 3.31 2.01 6.15 4.88 7.33l-.88 2.67c-.15.45.18.9.65.9h6.7c.47 0 .8-.45.65-.9l-.88-2.67C17.99 16.15 20 13.31 20 10c0-4.42-3.58-8-8-8zm-3 9c-.83 0-1.5-.67-1.5-1.5S8.17 8 9 8s1.5.67 1.5 1.5S9.83 11 9 11zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5S15.83 11 15 11z"/></svg>`;
          }
        }

        document.getElementById('gameover-dead').textContent = this.formatNum(data.stats.dead);
        document.getElementById('gameover-survivors').textContent = this.formatNum(data.stats.healthy);
        
        this.openModal('gameover');
      }
    }
  }

  cacheDom() {
    this.dom = {
      worldSvg: document.getElementById("world-svg"),
      bubbleOverlay: document.getElementById("bubble-overlay"),
      vehiclesOverlay: document.getElementById("vehicles-overlay"),
      tooltip: document.getElementById("country-tooltip"),
      drawer: document.getElementById("country-drawer"),
      startHint: document.getElementById("start-hint"),
      diseaseName: document.getElementById("disease-name"),
      daysCount: document.getElementById("days-count"),
      dnaCount: document.getElementById("dna-count"),
      dnaPillBtn: document.getElementById("dna-pill-btn"),
      themeToggleBtn: document.getElementById("theme-toggle-btn"),
      themeBtnText: document.getElementById("theme-btn-text"),
      newsText: document.getElementById("news-text"),
      speedBtns: document.querySelectorAll(".speed-btn"),
      totalExposed: document.getElementById("total-exposed"),
      totalInfected: document.getElementById("total-infected"),
      totalDead: document.getElementById("total-dead"),
      totalHealthy: document.getElementById("total-healthy"),
      cureFill: document.getElementById("cure-fill"),
      curePercent: document.getElementById("cure-percent"),
      sirCanvas: document.getElementById("sir-canvas"),
      upgradesGrid: document.getElementById("upgrades-grid"),
      countriesListTbody: document.getElementById("countries-tbody"),
      countrySearch: document.getElementById("country-search")
    };
  }

  initTheme() {
    const saved = localStorage.getItem("epidemic_theme");
    this.isDarkTheme = saved === "dark";
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle("dark-theme", this.isDarkTheme);
    if (this.dom.themeBtnText) {
      this.dom.themeBtnText.textContent = this.isDarkTheme ? "Темна" : "Світла";
    }
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = this.isDarkTheme ? 'none' : 'block';
      moonIcon.style.display = this.isDarkTheme ? 'block' : 'none';
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem("epidemic_theme", this.isDarkTheme ? "dark" : "light");
    this.applyTheme();
  }

  bindEvents() {
    if (this.dom.themeToggleBtn) {
      this.dom.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    this.dom.diseaseName.addEventListener("input", (e) => {
      this.engine.diseaseName = e.target.value || "Вірус-X";
      const bannerName = document.getElementById("virion-banner-name");
      if (bannerName) bannerName.textContent = `Штам ${this.engine.diseaseName}`;
    });

    this.dom.speedBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const spd = parseInt(btn.dataset.speed, 10);
        this.engine.speed = spd;
        this.dom.speedBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    document.querySelectorAll("[data-open-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openModal(btn.dataset.openModal);
      });
    });

    document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-backdrop") || e.target.closest(".modal-close-btn")) {
          this.closeModal();
        }
      });
    });

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTab = btn.dataset.tab;
        this.renderUpgrades();
      });
    });

    document.querySelectorAll(".preset-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".preset-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.selectedPreset = card.dataset.preset;
        const preset = PRESETS[this.selectedPreset];
        if (preset && preset.name !== "Власний патоген") {
          const nameInput = document.getElementById("setup-disease-name");
          if (nameInput) nameInput.value = preset.name;
        }
      });
    });

    document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedDiff = btn.dataset.diff;
      });
    });

    const startSimBtn = document.getElementById("btn-start-simulation");
    if (startSimBtn) {
      startSimBtn.addEventListener("click", () => {
        const nameInput = document.getElementById("setup-disease-name");
        const customName = nameInput ? nameInput.value : "Вірус-X";
        this.engine.applyPresetAndDifficulty(this.selectedPreset, this.selectedDiff, customName);
        this.dom.diseaseName.value = this.engine.diseaseName;
        this.closeModal();
        this.dom.startHint.style.display = "flex";
        this.dom.startHint.querySelector("span").textContent = `Оберіть країну на карті, щоб запустити "${this.engine.diseaseName}"!`;
        this.updateVirionBanner();
        this.renderUpgrades();
      });
    }

    const bindSlider = (id, paramKey, displayId, multiplier = 1, suffix = "") => {
      const slider = document.getElementById(id);
      const display = document.getElementById(displayId);
      if (!slider || !display) return;
      slider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        this.engine.parameters[paramKey] = val;
        display.textContent = (val * multiplier).toFixed(1) + suffix;
        this.updateVirionBanner();
      });
    };

    bindSlider("param-infectivity", "infectivity", "disp-infectivity", 1, "");
    bindSlider("param-lethality", "lethality", "disp-lethality", 100, "%");
    bindSlider("param-recovery", "recoveryRate", "disp-recovery", 100, "%");
    bindSlider("param-vaccine", "vaccineRate", "disp-vaccine", 100, "%");
    bindSlider("param-lockdown", "lockdownStrictness", "disp-lockdown", 100, "%");

    const incubSlider = document.getElementById("param-incubation");
    if (incubSlider) {
      incubSlider.addEventListener("input", (e) => {
        const days = parseFloat(e.target.value);
        this.engine.parameters.incubationRate = 1.0 / Math.max(0.5, days);
        document.getElementById("disp-incubation").textContent = days.toFixed(1) + " дн.";
      });
    }

    if (this.dom.countrySearch) {
      this.dom.countrySearch.addEventListener("input", () => {
        this.renderCountriesTable();
      });
    }

    document.getElementById("drawer-start-btn").addEventListener("click", () => {
      if (this.selectedCountryId) {
        this.engine.startOutbreak(this.selectedCountryId);
        this.dom.startHint.style.display = "none";
        this.updateDrawer();
      }
    });

    document.getElementById("drawer-close-btn").addEventListener("click", () => {
      this.dom.drawer.style.display = "none";
      if (this.selectedCountryId) {
        const prev = document.getElementById(`country-${this.selectedCountryId}`);
        if (prev) prev.classList.remove("selected");
        this.selectedCountryId = null;
      }
    });
  }

  renderMapSvg() {
    const svg = this.dom.worldSvg;
    svg.innerHTML = "";

    const countriesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    countriesGroup.id = "countries-group";

    for (const [id, data] of Object.entries(COUNTRIES_DATA)) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("id", `country-${id}`);
      path.setAttribute("class", "country-path");
      path.setAttribute("d", data.d);

      path.addEventListener("mouseenter", (e) => this.showTooltip(e, id));
      path.addEventListener("mousemove", (e) => this.moveTooltip(e));
      path.addEventListener("mouseleave", () => this.hideTooltip());
      path.addEventListener("click", () => this.handleCountryClick(id));

      countriesGroup.appendChild(path);
    }
    svg.appendChild(countriesGroup);
  }

  handleCountryClick(countryId) {
    if (!this.engine.isStarted) {
      this.engine.startOutbreak(countryId);
      this.dom.startHint.style.display = "none";
    }
    this.selectCountry(countryId);
  }

  selectCountry(countryId) {
    if (this.selectedCountryId) {
      const prev = document.getElementById(`country-${this.selectedCountryId}`);
      if (prev) prev.classList.remove("selected");
    }
    this.selectedCountryId = countryId;
    const curr = document.getElementById(`country-${countryId}`);
    if (curr) curr.classList.add("selected");
    this.updateDrawer();
  }

  updateDrawer() {
    if (!this.selectedCountryId) return;
    const c = this.engine.countries[this.selectedCountryId];
    if (!c) return;
    this.dom.drawer.style.display = "block";
    document.getElementById("drawer-country-name").textContent = c.name;

    const total = c.population || 1;
    const hPct = (c.healthy / total) * 100;
    const ePct = (c.exposed / total) * 100;
    const iPct = (c.infected / total) * 100;
    const dPct = (c.dead / total) * 100;
    const rPct = (c.recovered / total) * 100;

    document.getElementById("drawer-bar-healthy").style.width = `${hPct}%`;
    document.getElementById("drawer-bar-exposed").style.width = `${ePct}%`;
    document.getElementById("drawer-bar-infected").style.width = `${iPct}%`;
    document.getElementById("drawer-bar-dead").style.width = `${dPct}%`;
    document.getElementById("drawer-bar-recovered").style.width = `${rPct}%`;

    document.getElementById("drawer-healthy-val").textContent = c.healthy.toLocaleString("uk-UA");
    document.getElementById("drawer-exposed-val").textContent = c.exposed.toLocaleString("uk-UA");
    document.getElementById("drawer-infected-val").textContent = c.infected.toLocaleString("uk-UA");
    document.getElementById("drawer-dead-val").textContent = c.dead.toLocaleString("uk-UA");

    const badgesContainer = document.getElementById("drawer-badges");
    badgesContainer.innerHTML = "";

    const addBadge = (text, isOpen, isWarning = false) => {
      const b = document.createElement("span");
      b.className = `badge ${isOpen ? "open" : isWarning ? "closed" : ""}`;
      b.textContent = text;
      badgesContainer.appendChild(b);
    };

    const climateNames = { cold: "Холодний", hot: "Спекотний", humid: "Вологий", temperate: "Помірний" };
    addBadge(`Клімат: ${climateNames[c.climate] || "Помірний"}`, false);

    const wealthNames = { rich: "Багата", medium: "Середня", poor: "Бідна" };
    addBadge(`Економіка: ${wealthNames[c.wealth] || "Середня"}`, false);

    if (c.hasAirport) {
      addBadge(c.airportClosed ? "Аеропорти закриті" : "Аеропорти відкриті", !c.airportClosed, c.airportClosed);
    }
    if (c.hasPort) {
      addBadge(c.portClosed ? "Порти закриті" : "Порти відкриті", !c.portClosed, c.portClosed);
    }

    const startBtn = document.getElementById("drawer-start-btn");
    if (!this.engine.isStarted) {
      startBtn.style.display = "flex";
      startBtn.textContent = `Почати епідемію в: ${c.name}`;
    } else {
      startBtn.style.display = "none";
    }
  }

  showTooltip(e, countryId) {
    const c = this.engine.countries[countryId];
    if (!c) return;
    this.dom.tooltip.style.display = "block";
    document.getElementById("tooltip-country-name").textContent = c.name;
    document.getElementById("tooltip-healthy-val").textContent = c.healthy.toLocaleString("uk-UA");
    document.getElementById("tooltip-exposed-val").textContent = c.exposed.toLocaleString("uk-UA");
    document.getElementById("tooltip-infected-val").textContent = c.infected.toLocaleString("uk-UA");
    document.getElementById("tooltip-dead-val").textContent = c.dead.toLocaleString("uk-UA");
    this.moveTooltip(e);
  }

  moveTooltip(e) {
    const x = e.clientX + 16;
    const y = e.clientY + 16;
    this.dom.tooltip.style.left = `${Math.min(window.innerWidth - 230, x)}px`;
    this.dom.tooltip.style.top = `${Math.min(window.innerHeight - 180, y)}px`;
  }

  hideTooltip() {
    this.dom.tooltip.style.display = "none";
  }

  openModal(modalId) {
    this.closeModal();
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
      modal.style.display = "flex";
      this.activeModal = modalId;
      if (modalId === "upgrades") {
        this.updateVirionBanner();
        this.renderUpgrades();
      }
      if (modalId === "chart") this.drawSirChart();
      if (modalId === "countries") this.renderCountriesTable();
    }
  }

  closeModal() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.style.display = "none");
    this.activeModal = null;
  }

  updateVirionBanner() {
    const bannerName = document.getElementById("virion-banner-name");
    if (bannerName) bannerName.textContent = `Штам ${this.engine.diseaseName}`;

    const effectiveBeta = this.engine.parameters.infectivity * (1 + this.engine.getMultiplier("infectivity"));
    const effectiveMu = (this.engine.parameters.lethality + this.engine.getMultiplier("lethality")) * 100;
    const cureSlow = this.engine.getMultiplier("cureSlow") * 100;

    const infEl = document.getElementById("virion-metric-infect");
    if (infEl) infEl.textContent = effectiveBeta.toFixed(2);

    const lethalEl = document.getElementById("virion-metric-lethal");
    if (lethalEl) lethalEl.textContent = effectiveMu.toFixed(1) + "%";

    const cureEl = document.getElementById("virion-metric-cure");
    if (cureEl) cureEl.textContent = cureSlow.toFixed(0) + "%";
  }

  renderUpgrades() {
    const grid = this.dom.upgradesGrid;
    grid.innerHTML = "";
    document.getElementById("modal-dna-display").textContent = this.engine.dnaPoints;
    this.updateVirionBanner();

    for (const [id, upg] of Object.entries(this.engine.upgrades)) {
      if (upg.tab !== this.activeTab) continue;

      const card = document.createElement("div");
      card.className = `upgrade-card ${upg.unlocked ? "unlocked" : ""}`;

      let canBuy = !upg.unlocked && this.engine.dnaPoints >= upg.cost;
      for (const req of upg.requires) {
        if (!this.engine.upgrades[req] || !this.engine.upgrades[req].unlocked) {
          canBuy = false;
        }
      }

      let badgeHtml = "";
      if (upg.unlocked) {
        badgeHtml = `<span class="upgrade-status-badge unlocked">Мутовано</span>`;
      } else if (canBuy) {
        badgeHtml = `<span class="upgrade-status-badge available">Доступно</span>`;
      } else {
        badgeHtml = `<span class="upgrade-status-badge locked">Заблоковано</span>`;
      }

      const reqNames = upg.requires.map(r => this.engine.upgrades[r]?.title || r).join(", ");
      const reqHtml = reqNames && !upg.unlocked ? `<div style="font-size:11px;color:#dc2626;font-weight:600;margin-bottom:8px;">Потребує: ${reqNames}</div>` : "";

      card.innerHTML = `
        <div class="upgrade-img-wrap">
          <img src="${upg.image}" class="upgrade-img" alt="${upg.title}" loading="lazy">
          ${badgeHtml}
        </div>
        <div class="upgrade-content">
          <div>
            <div class="upgrade-title">${upg.title}</div>
            <div class="upgrade-desc">${upg.desc}</div>
            ${reqHtml}
          </div>
          <div class="upgrade-footer">
            <div class="upgrade-cost">
              <svg viewBox="0 0 24 24"><path d="M12 2c-.55 0-1 .45-1 1v1.1c-2.83.48-5 2.94-5 5.9 0 1.34.45 2.58 1.21 3.57L5.7 15.08C5.26 15.65 5 16.3 5 17c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-.7-.26-1.35-.7-1.92l-1.51-1.51c.76-.99 1.21-2.23 1.21-3.57 0-2.96-2.17-5.42-5-5.9V3c0-.55-.45-1-1-1zm0 4c2.21 0 4 1.79 4 4 0 .86-.28 1.66-.75 2.32l-1.42-1.42c.11-.28.17-.58.17-.9 0-1.1-.9-2-2-2s-2 .9-2 2c0 .32.06.62.17.9l-1.42 1.42C8.28 11.66 8 10.86 8 10c0-2.21 1.79-4 4-4zm-4 12c-.55 0-1-.45-1-1 0-.25.09-.48.26-.66L8.7 15h6.6l1.44 1.34c.17.18.26.41.26.66 0 .55-.45 1-1 1H8z"/></svg>
              ${upg.cost} ДНК
            </div>
            <button class="upgrade-btn ${upg.unlocked ? "bought" : ""}" ${!canBuy && !upg.unlocked ? "disabled" : ""}>
              ${upg.unlocked ? "Вивчено" : "Мутувати"}
            </button>
          </div>
        </div>
      `;

      const btn = card.querySelector(".upgrade-btn");
      if (!upg.unlocked && canBuy) {
        btn.addEventListener("click", () => {
          if (this.engine.buyUpgrade(id)) {
            this.animateDnaPill();
            this.renderUpgrades();
          }
        });
      }

      grid.appendChild(card);
    }
  }

  animateDnaPill() {
    const pill = this.dom.dnaPillBtn;
    if (pill) {
      pill.classList.remove("dna-bounce");
      void pill.offsetWidth;
      pill.classList.add("dna-bounce");
    }
  }

  renderCountriesTable() {
    const tbody = this.dom.countriesListTbody;
    if (!tbody) return;
    const filter = (this.dom.countrySearch?.value || "").toLowerCase();
    tbody.innerHTML = "";

    const list = Object.values(this.engine.countries).filter(c =>
      c.name.toLowerCase().includes(filter) || c.id.toLowerCase().includes(filter)
    );

    list.sort((a, b) => (b.infected + b.exposed) - (a.infected + a.exposed) || b.dead - a.dead || b.population - a.population);

    for (const c of list) {
      const tr = document.createElement("tr");
      tr.style.cursor = "pointer";
      tr.innerHTML = `
        <td style="font-weight:700;">${c.name}</td>
        <td>${c.population.toLocaleString("uk-UA")}</td>
        <td style="color:var(--accent-amber);font-weight:700;">${c.exposed.toLocaleString("uk-UA")}</td>
        <td style="color:var(--accent-red);font-weight:700;">${c.infected.toLocaleString("uk-UA")}</td>
        <td style="color:var(--text-muted);">${c.dead.toLocaleString("uk-UA")}</td>
        <td>${c.airportClosed ? "Закриті" : "Відкриті"}</td>
      `;
      tr.addEventListener("click", () => {
        this.closeModal();
        this.selectCountry(c.id);
      });
      tbody.appendChild(tr);
    }
  }

  updateMapColors() {
    for (const [id, c] of Object.entries(this.engine.countries)) {
      const path = document.getElementById(`country-${id}`);
      if (!path) continue;

      const activeRatio = (c.infected + c.exposed) / (c.population || 1);
      const deadRatio = c.population > 0 ? c.dead / c.population : 0;

      if (activeRatio <= 0 && deadRatio <= 0) {
        if (c.vaccinated > 0 && c.vaccinated >= c.population * 0.7) {
          path.style.fill = this.isDarkTheme ? "#064e3b" : "#d1fae5";
        } else {
          path.style.fill = "";
        }
        continue;
      }

      if (deadRatio > 0.5) {
        path.style.fill = this.isDarkTheme ? "#0f172a" : "#334155";
      } else {
        const infFactor = Math.min(1.0, activeRatio * 4);
        if (this.isDarkTheme) {
          const r = Math.round(22 + infFactor * 220);
          const g = Math.round(34 * (1 - infFactor));
          const b = Math.round(53 * (1 - infFactor));
          path.style.fill = `rgb(${r}, ${g}, ${b})`;
        } else {
          const r = Math.round(255 - infFactor * 20);
          const g = Math.round(240 - infFactor * 200);
          const b = Math.round(240 - infFactor * 200);
          path.style.fill = `rgb(${r}, ${Math.max(30, g)}, ${Math.max(30, b)})`;
        }
      }
    }
  }

  updateVehicles() {
    const container = this.dom.vehiclesOverlay;
    const svgRect = this.dom.worldSvg.getBoundingClientRect();
    const scaleX = svgRect.width / 2000;
    const scaleY = svgRect.height / 1001;

    const currentIds = new Set();

    for (const v of this.engine.vehicles) {
      currentIds.add(v.id);
      let el = this.renderedVehicles.get(v.id);
      const curX = (v.startPos[0] + (v.endPos[0] - v.startPos[0]) * v.progress) * scaleX;
      const curY = (v.startPos[1] + (v.endPos[1] - v.startPos[1]) * v.progress) * scaleY;

      if (!el) {
        el = document.createElement("div");
        el.className = v.type === "plane" ? "vehicle-plane" : "vehicle-ship";
        if (v.isInfected) {
          el.style.fill = "#ef4444";
        }
        el.innerHTML = v.type === "plane"
          ? `<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`
          : `<svg viewBox="0 0 24 24"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.33-.41-.59-.47l-5.29-1.2V4c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v3.87L5.7 9.07c-.26.06-.47.23-.59.47s-.14.52-.06.78L3.95 19z"/></svg>`;
        container.appendChild(el);
        this.renderedVehicles.set(v.id, el);
      }

      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    }

    for (const [id, el] of this.renderedVehicles.entries()) {
      if (!currentIds.has(id)) {
        el.remove();
        this.renderedVehicles.delete(id);
      }
    }
  }

  updateBubbles() {
    const container = this.dom.bubbleOverlay;
    const svgRect = this.dom.worldSvg.getBoundingClientRect();
    const scaleX = svgRect.width / 2000;
    const scaleY = svgRect.height / 1001;

    const currentIds = new Set();

    for (const b of this.engine.bubbles) {
      currentIds.add(b.id);
      let el = this.renderedBubbles.get(b.id);
      const posX = b.x * scaleX;
      const posY = b.y * scaleY;

      if (!el) {
        el = document.createElement("div");
        el.className = `game-bubble ${b.type}`;

        let icon = "";
        if (b.type === "infection") {
          icon = `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-2.83 2H5.17A3 3 0 0 0 3 6.17V10a3 3 0 0 0 2 2.83V16a3 3 0 0 0 3 3h2.17A3 3 0 0 0 13 22a3 3 0 0 0 2.83-2H18a3 3 0 0 0 3-3v-3.17A3 3 0 0 0 23 11a3 3 0 0 0-2-2.83V5a3 3 0 0 0-3-3h-2.17A3 3 0 0 0 13 2h-1zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 2h2v2H6V7zm10 0h2v2h-2V7zm-4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-6 3h2v2H6v-2zm10 0h2v2h-2v-2zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z"/></svg>`;
        } else if (b.type === "dna") {
          icon = `<svg viewBox="0 0 24 24"><path d="M12 2c-.55 0-1 .45-1 1v1.1c-2.83.48-5 2.94-5 5.9 0 1.34.45 2.58 1.21 3.57L5.7 15.08C5.26 15.65 5 16.3 5 17c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-.7-.26-1.35-.7-1.92l-1.51-1.51c.76-.99 1.21-2.23 1.21-3.57 0-2.96-2.17-5.42-5-5.9V3c0-.55-.45-1-1-1zm0 4c2.21 0 4 1.79 4 4 0 .86-.28 1.66-.75 2.32l-1.42-1.42c.11-.28.17-.58.17-.9 0-1.1-.9-2-2-2s-2 .9-2 2c0 .32.06.62.17.9l-1.42 1.42C8.28 11.66 8 10.86 8 10c0-2.21 1.79-4 4-4zm-4 12c-.55 0-1-.45-1-1 0-.25.09-.48.26-.66L8.7 15h6.6l1.44 1.34c.17.18.26.41.26.66 0 .55-.45 1-1 1H8z"/></svg>`;
        } else {
          icon = `<svg viewBox="0 0 24 24"><path d="M6 3h12v2H6zm11 3H7c-.55 0-1 .45-1 1v11c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V7c0-.55-.45-1-1-1z"/></svg>`;
        }
        el.innerHTML = icon;

        const onPop = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const popped = this.engine.popBubble(b.id);
          if (popped) {
            this.showFloatingReward(posX, posY, `+${popped.reward} ДНК`);
            this.animateDnaPill();
            this.dom.dnaCount.textContent = this.engine.dnaPoints;
            el.remove();
            this.renderedBubbles.delete(b.id);
          }
        };

        el.addEventListener("pointerdown", onPop);
        el.addEventListener("click", onPop);

        container.appendChild(el);
        this.renderedBubbles.set(b.id, el);
      }

      el.style.left = `${posX}px`;
      el.style.top = `${posY}px`;
    }

    for (const [id, el] of this.renderedBubbles.entries()) {
      if (!currentIds.has(id)) {
        el.remove();
        this.renderedBubbles.delete(id);
      }
    }
  }

  showFloatingReward(x, y, text) {
    const el = document.createElement("div");
    el.className = "floating-reward";
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    this.dom.bubbleOverlay.appendChild(el);
    setTimeout(() => el.remove(), 750);
  }

  drawSirChart() {
    const canvas = this.dom.sirCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const history = this.engine.history;
    if (!history || history.length < 2) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "14px sans-serif";
      ctx.fillText("Очікування накопичення даних епідемії...", 20, 40);
      return;
    }

    const padding = { top: 30, right: 30, bottom: 40, left: 65 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const maxPop = this.engine.totalWorldPop || 1;
    const maxDay = Math.max(10, history[history.length - 1].day);

    ctx.strokeStyle = this.isDarkTheme ? "#1e304d" : "#e2e8f0";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      const val = (maxPop * (1 - i / 4)) / 1e9;
      ctx.fillStyle = this.isDarkTheme ? "#94a3b8" : "#64748b";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${val.toFixed(1)} млрд`, padding.left - 8, y + 4);
    }

    const capY = padding.top + chartH * (1 - this.engine.parameters.healthcareThreshold);
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(padding.left, capY);
    ctx.lineTo(w - padding.right, capY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#0284c7";
    ctx.textAlign = "right";
    ctx.fillText("Поріг лікарень", w - padding.right, capY - 6);

    const getX = (day) => padding.left + (day / maxDay) * chartW;
    const getY = (val) => padding.top + chartH * (1 - (val || 0) / maxPop);

    const drawLine = (prop, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      history.forEach((pt, idx) => {
        const x = getX(pt.day);
        const y = getY(pt[prop]);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine("healthy", "#2563eb");
    drawLine("exposed", "#f59e0b");
    drawLine("infected", "#ef4444");
    drawLine("recovered", "#10b981");
    drawLine("dead", "#64748b");

    ctx.fillStyle = this.isDarkTheme ? "#cbd5e1" : "#64748b";
    ctx.textAlign = "center";
    ctx.fillText(`Час (Дні): ${maxDay}`, w / 2, h - 10);
  }

  updateTopBar() {
    this.dom.daysCount.textContent = this.engine.day;
    this.dom.dnaCount.textContent = this.engine.dnaPoints;

    const latestNews = this.engine.newsQueue[0];
    if (latestNews && this.dom.newsText.textContent !== latestNews.text) {
      this.dom.newsText.textContent = latestNews.text;
    }
  }

  updateBottomBar() {
    this.dom.totalExposed.textContent = this.engine.globalStats.exposed.toLocaleString("uk-UA");
    this.dom.totalInfected.textContent = this.engine.globalStats.infected.toLocaleString("uk-UA");
    this.dom.totalDead.textContent = this.engine.globalStats.dead.toLocaleString("uk-UA");
    this.dom.totalHealthy.textContent = this.engine.globalStats.healthy.toLocaleString("uk-UA");

    const pct = Math.floor(this.engine.cure.progress * 100);
    this.dom.cureFill.style.width = `${pct}%`;
    this.dom.curePercent.textContent = `${pct}%`;
  }

  startLoop() {
    const loop = (timestamp) => {
      const deltaMs = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;

      this.engine.tick(deltaMs);

      this.updateTopBar();
      this.updateBottomBar();
      this.updateMapColors();
      this.updateVehicles();
      this.updateBubbles();

      if (this.selectedCountryId) {
        this.updateDrawer();
      }

      if (this.activeModal === "chart") {
        this.drawSirChart();
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
