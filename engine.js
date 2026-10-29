const UPGRADES_CONFIG = {
  trans_air_1: {
    id: "trans_air_1",
    tab: "transmission",
    title: "Повітряно-крапельний шлях I",
    desc: "Аерозольне розпилення віріонів у повітрі при диханні. Підвищує заразність у сухому кліматі та літаках.",
    cost: 8,
    unlocked: false,
    requires: [],
    image: "images/air_1.jpg",
    effects: { infectivity: 0.2, airChance: 0.35, aridBonus: 0.25 }
  },
  trans_air_2: {
    id: "trans_air_2",
    tab: "transmission",
    title: "Аерозольний вектор II",
    desc: "Вірус утворює ультрадисперсні частки розміром менше 5 мкм, які проникають крізь вентиляцію.",
    cost: 14,
    unlocked: false,
    requires: ["trans_air_1"],
    image: "images/air_2.jpg",
    effects: { infectivity: 0.3, airChance: 0.55, aridBonus: 0.4 }
  },
  trans_water_1: {
    id: "trans_water_1",
    tab: "transmission",
    title: "Водний шлях I",
    desc: "Стійкість до водного середовища та каналізаційних систем. Посилює передачу через морські порти.",
    cost: 8,
    unlocked: false,
    requires: [],
    image: "images/water_1.jpg",
    effects: { infectivity: 0.18, seaChance: 0.4, humidBonus: 0.3 }
  },
  trans_water_2: {
    id: "trans_water_2",
    tab: "transmission",
    title: "Водна трансмісія II",
    desc: "Інактивація хлоруванням неефективна. Збудник проникає на ізольовані острови на зразок Гренландії.",
    cost: 15,
    unlocked: false,
    requires: ["trans_water_1"],
    image: "images/water_2.jpg",
    effects: { infectivity: 0.3, seaChance: 0.65, humidBonus: 0.45 }
  },
  trans_zoonotic: {
    id: "trans_zoonotic",
    tab: "transmission",
    title: "Зоонозний вектор (Тварини)",
    desc: "Міграційні птахи та міські гризуни переносять штам через закриті сухопутні кордони.",
    cost: 12,
    unlocked: false,
    requires: [],
    image: "images/zoonotic.jpg",
    effects: { infectivity: 0.25, landBonus: 0.65, bypassBorders: true }
  },
  trans_blood: {
    id: "trans_blood",
    tab: "transmission",
    title: "Гематогенний шлях (Кров)",
    desc: "Пряме проникнення в кров'яне русло при ін'єкціях та травмах. Ефективно в бідних країнах.",
    cost: 10,
    unlocked: false,
    requires: [],
    image: "images/blood.jpg",
    effects: { infectivity: 0.25, poorBonus: 0.55 }
  },
  symp_cough: {
    id: "symp_cough",
    tab: "symptoms",
    title: "Кашель та чхання",
    desc: "Ураження війчастого епітелію трахеї. Носій викидає мільярди віріонів у навколишній простір.",
    cost: 6,
    unlocked: false,
    requires: [],
    image: "images/cough.jpg",
    effects: { infectivity: 0.22, lethality: 0.001 }
  },
  symp_fever: {
    id: "symp_fever",
    tab: "symptoms",
    title: "Пірогенна лихоманка",
    desc: "Цитокіновий каскад та температура тіла понад 39°C. Погіршує загальний стан організму.",
    cost: 9,
    unlocked: false,
    requires: ["symp_cough"],
    image: "images/fever.jpg",
    effects: { infectivity: 0.18, lethality: 0.006 }
  },
  symp_pneumonia: {
    id: "symp_pneumonia",
    tab: "symptoms",
    title: "Вірусна пневмонія",
    desc: "Масивне запалення легеневих альвеол із порушенням газообміну та критичною гіпоксією.",
    cost: 14,
    unlocked: false,
    requires: ["symp_fever"],
    image: "images/pneumonia.jpg",
    effects: { infectivity: 0.25, lethality: 0.025 }
  },
  symp_fibrosis: {
    id: "symp_fibrosis",
    tab: "symptoms",
    title: "Легеневий фіброз",
    desc: "Заміщення паренхіми легень сполучною рубцевою тканиною. Значне підвищення летальності.",
    cost: 20,
    unlocked: false,
    requires: ["symp_pneumonia"],
    image: "images/fibrosis.jpg",
    effects: { infectivity: 0.15, lethality: 0.06 }
  },
  symp_organ_failure: {
    id: "symp_organ_failure",
    tab: "symptoms",
    title: "Поліорганна недостатність",
    desc: "Критичний колапс нирок, печінки та міокарда. Вкрай висока летальність у стаціонарах.",
    cost: 28,
    unlocked: false,
    requires: ["symp_fibrosis"],
    image: "images/organ_failure.jpg",
    effects: { infectivity: 0.08, lethality: 0.15 }
  },
  abil_cold_1: {
    id: "abil_cold_1",
    tab: "abilities",
    title: "Стійкість до холоду I",
    desc: "Стабілізація ліпідного суперкапсиду при температурі нижче 0°C (Канада, Норвегія, Сибір).",
    cost: 10,
    unlocked: false,
    requires: [],
    image: "images/cold_1.jpg",
    effects: { coldBonus: 0.55 }
  },
  abil_cold_2: {
    id: "abil_cold_2",
    tab: "abilities",
    title: "Стійкість до холоду II",
    desc: "Кріопротекторні білки капсиду. Здатність до тривалої персистенції в Гренландії та Арктиці.",
    cost: 16,
    unlocked: false,
    requires: ["abil_cold_1"],
    image: "images/cold_2.jpg",
    effects: { coldBonus: 0.95 }
  },
  abil_heat_1: {
    id: "abil_heat_1",
    tab: "abilities",
    title: "Термостійкість спайк-білків",
    desc: "Білки-шипи не денатурують під дією сухого тепла пустель та ультрафіолетового випромінювання.",
    cost: 10,
    unlocked: false,
    requires: [],
    image: "images/heat_1.jpg",
    effects: { heatBonus: 0.55 }
  },
  abil_drug_1: {
    id: "abil_drug_1",
    tab: "abilities",
    title: "Фармакорезистентність I",
    desc: "Мутація вірусної полімерази блокує дію стандартних противірусних препаратів у багатих країнах.",
    cost: 14,
    unlocked: false,
    requires: [],
    image: "images/drug_1.jpg",
    effects: { cureSlow: 0.35 }
  },
  abil_genetic_hardening: {
    id: "abil_genetic_hardening",
    tab: "abilities",
    title: "Генетичне гартування",
    desc: "Висока частота точкових мутацій ускладнює визначення нейтралізуючих епітопів для вакцини.",
    cost: 22,
    unlocked: false,
    requires: ["abil_drug_1"],
    image: "images/hardening.jpg",
    effects: { cureSlow: 0.55 }
  }
};

const PRESETS = {
  custom: {
    id: "custom",
    name: "Власний патоген",
    tagline: "Створіть свій унікальний штам вірусу",
    infectivity: 0.65,
    incubationDays: 5,
    lethality: 0.012,
    recoveryRate: 0.035,
    unlocked: []
  },
  spanish_flu: {
    id: "spanish_flu",
    name: "Іспанський грип 1918 (H1N1)",
    tagline: "R₀ ≈ 2.8. Блискавичний повітряний спалах, цитокіновий шторм та легеневі ускладнення",
    infectivity: 0.85,
    incubationDays: 3,
    lethality: 0.045,
    recoveryRate: 0.03,
    unlocked: ["trans_air_1", "symp_cough", "symp_fever", "symp_pneumonia"]
  },
  plague: {
    id: "plague",
    name: "Чорна смерть (Чума)",
    tagline: "R₀ ≈ 3.2. Зоонозний переносник через гризунів, некроз тканин та вкрай висока летальність",
    infectivity: 0.75,
    incubationDays: 4,
    lethality: 0.095,
    recoveryRate: 0.02,
    unlocked: ["trans_zoonotic", "trans_blood", "symp_fever", "symp_fibrosis"]
  },
  covid19: {
    id: "covid19",
    name: "COVID-19 (SARS-CoV-2)",
    tagline: "R₀ ≈ 3.4. Довгий безсимптомний інкубаційний період (SEIR), надшвидке авіапоширення",
    infectivity: 0.95,
    incubationDays: 7,
    lethality: 0.015,
    recoveryRate: 0.04,
    unlocked: ["trans_air_1", "trans_air_2", "symp_cough"]
  }
};

const DIFFICULTIES = {
  easy: {
    id: "easy",
    name: "Легко",
    desc: "Люди рідко миють руки, кордони майже не закриваються, розробка ліків повільна.",
    infectMult: 1.25,
    lockdownMult: 0.4,
    cureMult: 0.6
  },
  normal: {
    id: "normal",
    name: "Нормально",
    desc: "Збалансований рівень: помірна гігієна, стандартне реагування ВООЗ та лікарень.",
    infectMult: 1.0,
    lockdownMult: 1.0,
    cureMult: 1.0
  },
  hard: {
    id: "hard",
    name: "Складно",
    desc: "Суворий локдаун, швидкий скринінг пасажирів в аеропортах, багаті лабораторії.",
    infectMult: 0.85,
    lockdownMult: 1.6,
    cureMult: 1.5
  },
  hell: {
    id: "hell",
    name: "Hell (Кошмар)",
    desc: "Тотальний контроль: негайне закриття кордонів при перших випадках, форсована вакцина.",
    infectMult: 0.7,
    lockdownMult: 2.3,
    cureMult: 2.2
  }
};

class EpidemicEngine {
  constructor() {
    this.day = 0;
    this.speed = 0;
    this.diseaseName = "Вірус-X";
    this.presetId = "custom";
    this.difficultyId = "normal";
    this.dnaPoints = 16;
    this.patientZero = null;
    this.isStarted = false;
    this.isGameOver = false;
    this.gameOverData = null;

    this.parameters = {
      infectivity: 0.65,
      incubationRate: 0.18,
      lethality: 0.015,
      recoveryRate: 0.035,
      vaccineRate: 0.03,
      lockdownStrictness: 0.25,
      healthcareThreshold: 0.15
    };

    this.upgrades = JSON.parse(JSON.stringify(UPGRADES_CONFIG));
    this.countries = {};
    this.totalWorldPop = 0;
    this.globalStats = {
      healthy: 0,
      exposed: 0,
      infected: 0,
      recovered: 0,
      dead: 0,
      vaccinated: 0
    };

    this.history = [];
    this.cure = {
      progress: 0,
      isStarted: false,
      speed: 0.0016
    };

    this.vehicles = [];
    this.bubbles = [];
    this.newsQueue = [];
    this.stepAccumulator = 0;

    this.initCountries();
  }

  applyPresetAndDifficulty(presetId, diffId, customName) {
    this.presetId = presetId || "custom";
    this.difficultyId = diffId || "normal";
    if (customName) this.diseaseName = customName.trim();

    this.day = 0;
    this.speed = 0;
    this.isStarted = false;
    this.isGameOver = false;
    this.gameOverData = null;
    this.patientZero = null;
    this.dnaPoints = 16;
    this.vehicles = [];
    this.bubbles = [];
    this.newsQueue = [];
    this.history = [];
    this.cure.progress = 0;
    this.cure.isStarted = false;

    const preset = PRESETS[this.presetId] || PRESETS.custom;
    const diff = DIFFICULTIES[this.difficultyId] || DIFFICULTIES.normal;

    this.parameters.infectivity = preset.infectivity * diff.infectMult;
    this.parameters.incubationRate = 1.0 / (preset.incubationDays || 5);
    this.parameters.lethality = preset.lethality;
    this.parameters.recoveryRate = preset.recoveryRate;
    this.parameters.lockdownStrictness = 0.25 * diff.lockdownMult;
    this.cure.speed = 0.0016 * diff.cureMult;

    this.upgrades = JSON.parse(JSON.stringify(UPGRADES_CONFIG));
    for (const uid of (preset.unlocked || [])) {
      if (this.upgrades[uid]) {
        this.upgrades[uid].unlocked = true;
      }
    }

    this.initCountries();
  }

  initCountries() {
    this.countries = {};
    this.totalWorldPop = 0;
    for (const [id, c] of Object.entries(COUNTRIES_DATA)) {
      this.totalWorldPop += c.population;
      this.countries[id] = {
        id: id,
        name: c.name,
        population: c.population,
        healthy: c.population,
        exposed: 0,
        infected: 0,
        recovered: 0,
        dead: 0,
        vaccinated: 0,
        climate: c.climate,
        wealth: c.wealth,
        hasAirport: c.hasAirport,
        hasPort: c.hasPort,
        airportClosed: false,
        portClosed: false,
        bordersClosed: false,
        infectedRatio: 0,
        exposedRatio: 0,
        deadRatio: 0
      };
    }
    this.updateGlobalTotals();
    this.recordHistory();
  }

  startOutbreak(countryId) {
    if (!this.countries[countryId]) return;
    this.patientZero = countryId;
    this.isStarted = true;
    const country = this.countries[countryId];
    const initialInfected = Math.min(25, country.healthy);
    country.healthy -= initialInfected;
    country.exposed += Math.floor(initialInfected * 0.6);
    country.infected += Math.ceil(initialInfected * 0.4);
    this.updateGlobalTotals();
    this.recordHistory();

    this.spawnBubble("infection", countryId, 5);
    this.addNews(`Спалах патогену "${this.diseaseName}" зафіксовано в: ${country.name}!`);

    if (this.speed === 0) {
      this.speed = 1;
    }
  }

  updateGlobalTotals() {
    let h = 0, exp = 0, inf = 0, r = 0, d = 0, v = 0;
    for (const id in this.countries) {
      const c = this.countries[id];
      h += c.healthy;
      exp += c.exposed;
      inf += c.infected;
      r += c.recovered;
      d += c.dead;
      v += c.vaccinated;
      c.exposedRatio = c.population > 0 ? c.exposed / c.population : 0;
      c.infectedRatio = c.population > 0 ? c.infected / c.population : 0;
      c.deadRatio = c.population > 0 ? c.dead / c.population : 0;
    }
    this.globalStats.healthy = Math.max(0, h);
    this.globalStats.exposed = Math.max(0, exp);
    this.globalStats.infected = Math.max(0, inf);
    this.globalStats.recovered = Math.max(0, r);
    this.globalStats.dead = Math.max(0, d);
    this.globalStats.vaccinated = Math.max(0, v);
  }

  recordHistory() {
    this.history.push({
      day: this.day,
      healthy: this.globalStats.healthy,
      exposed: this.globalStats.exposed,
      infected: this.globalStats.infected,
      recovered: this.globalStats.recovered + this.globalStats.vaccinated,
      dead: this.globalStats.dead
    });
  }

  getMultiplier(prop) {
    let total = 0;
    for (const k in this.upgrades) {
      const u = this.upgrades[k];
      if (u.unlocked && u.effects && u.effects[prop]) {
        total += u.effects[prop];
      }
    }
    return total;
  }

  hasUpgrade(prop) {
    for (const k in this.upgrades) {
      const u = this.upgrades[k];
      if (u.unlocked && u.effects && u.effects[prop]) {
        return true;
      }
    }
    return false;
  }

  stepDay() {
    if (!this.isStarted || this.isGameOver) return;
    this.day += 1;

    const baseBeta = this.parameters.infectivity * (1 + this.getMultiplier("infectivity"));
    const sigma = this.parameters.incubationRate;
    const baseMu = this.parameters.lethality + this.getMultiplier("lethality");
    const baseGamma = this.parameters.recoveryRate;
    const cureSlowdown = Math.max(0.2, 1 - this.getMultiplier("cureSlow"));

    const globalActiveRatio = (this.globalStats.infected + this.globalStats.exposed) / this.totalWorldPop;
    const isHealthcareOverwhelmed = (this.globalStats.infected / this.totalWorldPop) > this.parameters.healthcareThreshold;

    if (!this.cure.isStarted) {
      if (globalActiveRatio > 0.015 || this.globalStats.dead > 30000 || this.day > 50) {
        this.cure.isStarted = true;
        this.addNews("ВООЗ оголосила міжнародну тривогу! Розпочато глобальну розробку вакцини.");
      }
    } else if (this.cure.progress < 1.0) {
      let researchPower = this.cure.speed * cureSlowdown;
      if (globalActiveRatio > 0.12) researchPower *= 1.6;
      this.cure.progress = Math.min(1.0, this.cure.progress + researchPower);

      if (this.cure.progress >= 0.25 && this.cure.progress < 0.26) {
        this.addNews("Визначено молекулярну будову шипоподібного білка (25% прогресу вакцини).");
        this.spawnRandomBubble("cure", 0);
      } else if (this.cure.progress >= 0.5 && this.cure.progress < 0.51) {
        this.addNews("Успішні доклінічні випробування вакцини на тваринах (50% прогресу ліків).");
        this.spawnRandomBubble("cure", 0);
      } else if (this.cure.progress >= 0.75 && this.cure.progress < 0.76) {
        this.addNews("Вакцина перейшла у фінальну III фазу клінічних досліджень (75%).");
        this.spawnRandomBubble("cure", 0);
      } else if (this.cure.progress >= 1.0) {
        this.addNews("Вакцину завершено та сертифіковано ВООЗ!");
      }
    }

    const newlyInfectedCountries = [];
    const bypassBorders = this.hasUpgrade("bypassBorders");

    for (const id in this.countries) {
      const c = this.countries[id];
      if (c.population <= 0) continue;

      if (!c.airportClosed && (c.infectedRatio > 0.12 || globalActiveRatio > 0.25)) {
        if (Math.random() < this.parameters.lockdownStrictness * 0.7) {
          c.airportClosed = true;
          if (c.hasAirport) this.addNews(`${c.name} призупиняє міжнародні авіарейси через карантин.`);
        }
      }
      if (!c.portClosed && (c.infectedRatio > 0.18 || globalActiveRatio > 0.35)) {
        if (Math.random() < this.parameters.lockdownStrictness * 0.6) {
          c.portClosed = true;
          if (c.hasPort) this.addNews(`${c.name} закриває морські порти для іноземних суден.`);
        }
      }
      if (!c.bordersClosed && c.infectedRatio > 0.3) {
        if (Math.random() < this.parameters.lockdownStrictness * 0.8) {
          c.bordersClosed = true;
        }
      }

      const activeCarriers = c.infected + c.exposed * 0.5;
      if (activeCarriers <= 0 && c.healthy > 0) continue;

      let envFactor = 1.0;
      if (c.climate === "cold") envFactor *= (0.7 + this.getMultiplier("coldBonus"));
      if (c.climate === "hot") envFactor *= (0.7 + this.getMultiplier("heatBonus"));
      if (c.climate === "humid") envFactor *= (1.0 + this.getMultiplier("humidBonus"));
      if (c.climate === "arid") envFactor *= (1.0 + this.getMultiplier("aridBonus"));
      if (c.wealth === "poor") envFactor *= (1.1 + this.getMultiplier("poorBonus"));
      if (c.wealth === "rich") envFactor *= 0.88;

      let lockdownReduction = 1.0;
      if (c.airportClosed || c.bordersClosed) {
        lockdownReduction = Math.max(0.35, 1 - this.parameters.lockdownStrictness * 0.5);
      }
      const effectiveBeta = baseBeta * envFactor * lockdownReduction;

      const newExposures = Math.min(
        c.healthy,
        Math.floor((effectiveBeta * c.healthy * activeCarriers) / c.population) + (activeCarriers > 0 && c.healthy > 0 ? 1 : 0)
      );

      let newInfections = Math.floor(c.exposed * sigma);
      if (newInfections === 0 && c.exposed > 0 && Math.random() < sigma) {
        newInfections = 1;
      }
      newInfections = Math.min(c.exposed, newInfections);

      const muMultiplier = isHealthcareOverwhelmed ? 1.8 : 1.0;
      const effectiveMu = baseMu * muMultiplier;
      let newDeaths = Math.floor(c.infected * effectiveMu);
      if (newDeaths === 0 && c.infected > 0 && Math.random() < effectiveMu) {
        newDeaths = 1;
      }
      newDeaths = Math.min(c.infected, newDeaths);

      let newRecoveries = Math.floor(c.infected * baseGamma);
      if (newRecoveries === 0 && c.infected > 0 && Math.random() < baseGamma) {
        newRecoveries = 1;
      }
      newRecoveries = Math.min(c.infected - newDeaths, newRecoveries);

      let newVaccinations = 0;
      if (this.cure.progress >= 1.0) {
        if (c.healthy > 0) {
          const vRate = this.parameters.vaccineRate * (c.wealth === "rich" ? 1.5 : 0.85);
          newVaccinations = Math.min(c.healthy - newExposures, Math.floor(c.healthy * vRate) + 60);
        }
        if (c.infected > 0) {
          const treated = Math.max(1, Math.floor(c.infected * 0.2));
          c.infected = Math.max(0, c.infected - treated);
          c.recovered += treated;
        }
        if (c.exposed > 0) {
          const postExposures = Math.max(1, Math.floor(c.exposed * 0.25));
          c.exposed = Math.max(0, c.exposed - postExposures);
          c.recovered += postExposures;
        }
      }

      c.healthy = Math.max(0, c.healthy - newExposures - newVaccinations);
      c.exposed = Math.max(0, c.exposed + newExposures - newInfections);
      c.infected = Math.max(0, c.infected + newInfections - newDeaths - newRecoveries);
      c.recovered = Math.max(0, c.recovered + newRecoveries);
      c.dead = Math.max(0, c.dead + newDeaths);
      c.vaccinated = Math.max(0, c.vaccinated + newVaccinations);

      if (activeCarriers > 0 && (!c.bordersClosed || bypassBorders)) {
        const neighbors = COUNTRIES_DATA[id].neighbors || [];
        for (const nid of neighbors) {
          const neighbor = this.countries[nid];
          if (neighbor && neighbor.healthy > 0 && neighbor.infected === 0 && neighbor.exposed === 0) {
            let crossChance = (0.08 + this.getMultiplier("landBonus") * 0.15) * Math.log10(c.infected + c.exposed + 1) / 4;
            if (neighbor.bordersClosed && !bypassBorders) crossChance *= 0.2;
            if (Math.random() < crossChance) {
              neighbor.exposed += 5;
              neighbor.healthy = Math.max(0, neighbor.healthy - 5);
              newlyInfectedCountries.push(neighbor);
            }
          }
        }
      }
    }

    for (const c of newlyInfectedCountries) {
      this.spawnBubble("infection", c.id, 4);
      this.addNews(`Інфекція перетнула сухопутний кордон: спалах у країні ${c.name}!`);
    }

    if (Math.random() < 0.2) {
      const activeKeys = Object.keys(this.countries).filter(k => this.countries[k].infected > 20 || this.countries[k].exposed > 20);
      if (activeKeys.length > 0) {
        const rndKey = activeKeys[Math.floor(Math.random() * activeKeys.length)];
        this.spawnBubble("dna", rndKey, Math.floor(Math.random() * 3) + 3);
      }
    }

    this.dispatchTraffic();
    this.updateGlobalTotals();
    this.recordHistory();
    this.checkGameStatus();
  }

  dispatchTraffic() {
    const allKeys = Object.keys(this.countries);
    const infectedKeys = allKeys.filter(k => (this.countries[k].infected + this.countries[k].exposed) > 5);

    if (this.vehicles.length < 24 && Math.random() < 0.75) {
      let fromId = null;
      if (infectedKeys.length > 0 && Math.random() < 0.65) {
        fromId = infectedKeys[Math.floor(Math.random() * infectedKeys.length)];
      } else {
        fromId = allKeys[Math.floor(Math.random() * allKeys.length)];
      }

      const toId = allKeys[Math.floor(Math.random() * allKeys.length)];
      if (!fromId || !toId || fromId === toId) return;

      const fromC = this.countries[fromId];
      const toC = this.countries[toId];
      const fromMeta = COUNTRIES_DATA[fromId];
      const toMeta = COUNTRIES_DATA[toId];

      const fromHasInfection = (fromC.infected + fromC.exposed) > 0;
      const carrierRatio = fromC.population > 0 ? (fromC.infected * 0.5 + fromC.exposed) / fromC.population : 0;

      if (fromMeta.hasAirport && toMeta.hasAirport) {
        let airAllowed = true;
        if (fromC.airportClosed || toC.airportClosed) {
          airAllowed = Math.random() < 0.15;
        }
        if (airAllowed) {
          const airChance = 0.2 + this.getMultiplier("airChance") * 0.5;
          const infectedFlight = fromHasInfection && Math.random() < Math.min(0.98, carrierRatio * 10 + airChance);
          this.vehicles.push({
            id: Math.random().toString(36).substr(2, 9),
            type: "plane",
            from: fromId,
            to: toId,
            progress: 0,
            speed: 0.01 + Math.random() * 0.005,
            isInfected: infectedFlight,
            startPos: fromMeta.center,
            endPos: toMeta.center
          });
        }
      } else if (fromMeta.hasPort && toMeta.hasPort) {
        let portAllowed = true;
        if (fromC.portClosed || toC.portClosed) {
          portAllowed = Math.random() < 0.2;
        }
        if (portAllowed) {
          const seaChance = 0.15 + this.getMultiplier("seaChance") * 0.4;
          const infectedShip = fromHasInfection && Math.random() < Math.min(0.95, carrierRatio * 8 + seaChance);
          this.vehicles.push({
            id: Math.random().toString(36).substr(2, 9),
            type: "ship",
            from: fromId,
            to: toId,
            progress: 0,
            speed: 0.005 + Math.random() * 0.003,
            isInfected: infectedShip,
            startPos: fromMeta.center,
            endPos: toMeta.center
          });
        }
      }
    }

    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      v.progress += v.speed * (this.speed || 1);
      if (v.progress >= 1.0) {
        if (v.isInfected) {
          const target = this.countries[v.to];
          if (target && target.healthy > 0 && target.infected === 0 && target.exposed === 0) {
            target.exposed += 8;
            target.healthy = Math.max(0, target.healthy - 8);
            this.spawnBubble("infection", target.id, 5);
            this.addNews(`Вірус занесено ${v.type === "plane" ? "авіалініями" : "морським транспортом"} до країни: ${target.name}!`);
          }
        }
        this.vehicles.splice(i, 1);
      }
    }
  }

  spawnBubble(type, countryId, dnaReward) {
    if (!COUNTRIES_DATA[countryId]) return;
    const center = COUNTRIES_DATA[countryId].center;
    this.bubbles.push({
      id: "bubble_" + Math.random().toString(36).substr(2, 9),
      type: type,
      countryId: countryId,
      x: center[0] + (Math.random() * 26 - 13),
      y: center[1] + (Math.random() * 20 - 10),
      reward: dnaReward,
      life: 450
    });
  }

  spawnRandomBubble(type, reward) {
    const keys = Object.keys(this.countries);
    const rndId = keys[Math.floor(Math.random() * keys.length)];
    this.spawnBubble(type, rndId, reward);
  }

  popBubble(bubbleId) {
    const idx = this.bubbles.findIndex(b => b.id === bubbleId);
    if (idx === -1) return null;
    const bubble = this.bubbles[idx];
    this.bubbles.splice(idx, 1);
    this.dnaPoints += bubble.reward;
    return bubble;
  }

  buyUpgrade(upgradeId) {
    const upg = this.upgrades[upgradeId];
    if (!upg || upg.unlocked) return false;
    if (this.dnaPoints < upg.cost) return false;
    for (const req of upg.requires) {
      if (!this.upgrades[req] || !this.upgrades[req].unlocked) return false;
    }
    this.dnaPoints -= upg.cost;
    upg.unlocked = true;
    this.addNews(`Штам мутував: розблоковано "${upg.title}"!`);
    return true;
  }

  addNews(text) {
    this.newsQueue.unshift({ text, day: this.day, time: Date.now() });
    if (this.newsQueue.length > 25) this.newsQueue.pop();
  }

  checkGameStatus() {
    if (!this.isStarted || this.isGameOver) return;

    if (this.cure.progress >= 1.0) {
      this.isGameOver = true;
      this.speed = 0;
      this.gameOverData = {
        victory: false,
        reason: "Вчені розробили вакцину та зупинили пандемію. Людство врятовано!",
        stats: { ...this.globalStats }
      };
      return;
    }

    if (this.globalStats.healthy === 0 && this.globalStats.infected === 0 && this.globalStats.exposed === 0) {
      this.isGameOver = true;
      this.speed = 0;
      this.gameOverData = {
        victory: true,
        reason: "Ви знищили все людство. Вірус переміг!",
        stats: { ...this.globalStats }
      };
      return;
    }
    
    if (this.globalStats.infected === 0 && this.globalStats.exposed === 0 && this.globalStats.healthy > 0) {
      this.isGameOver = true;
      this.speed = 0;
      this.gameOverData = {
        victory: false,
        reason: "Вірус вимер, не встигнувши заразити всіх. Людство вижило.",
        stats: { ...this.globalStats }
      };
      return;
    }
  }

  tick(deltaMs) {
    if (this.speed === 0 || !this.isStarted || this.isGameOver) return;
    const dayInterval = 1000 / this.speed;
    this.stepAccumulator += deltaMs;
    while (this.stepAccumulator >= dayInterval) {
      this.stepDay();
      this.stepAccumulator -= dayInterval;
    }

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      this.bubbles[i].life -= 1;
      if (this.bubbles[i].life <= 0) {
        this.bubbles.splice(i, 1);
      }
    }
  }
}
