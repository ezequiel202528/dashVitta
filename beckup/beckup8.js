const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// ==========================================
// INTEGRAÇÃO AUTOMÁTICA COM GOOGLE SHEETS (NUVEM)
// ==========================================
const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAuQcgKhR4Kcb--r9cxLjFZ3Z3mYdOyx_uMSaEoZBGKHPx7fjWEze26FcRKiA48joDCkW0Ntj7Beu8/pub?output=csv";

let MULTAS_DATA = { 2024: [], 2025: [], 2026: [] };
let MULTAS_MONTHLY_2024 = Array(12)
  .fill(0)
  .map(() => ({ count: 0, value: 0 }));
let MULTAS_MONTHLY_2025 = Array(12)
  .fill(0)
  .map(() => ({ count: 0, value: 0 }));
let MULTAS_MONTHLY_2026 = Array(12)
  .fill(0)
  .map(() => ({ count: 0, value: 0 }));

async function carregarDadosDoGoogleSheets() {
  try {
    const resposta = await fetch(GOOGLE_SHEETS_CSV_URL);
    const csvTexto = await resposta.text();

    processarCSVMultas(csvTexto);

    updateSidebarBadges();
    updateDashboard();
    if (typeof renderEvolucaoMultasPanel === "function") {
      renderEvolucaoMultasPanel();
    }

    console.log("Dados do Google Sheets sincronizados com sucesso!");
  } catch (erro) {
    console.error("Erro ao sincronizar com o Google Sheets:", erro);
  }
}


// function processarCSVMultas(csv) {
//   const linhas = csv.split("\n");

//   let tempMultasPorAnoGravidade = {
//     2024: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } },
//     2025: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } },
//     2026: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } }
//   };

//   MULTAS_MONTHLY_2024 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
//   MULTAS_MONTHLY_2025 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
//   MULTAS_MONTHLY_2026 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));

//   for (let i = 0; i < linhas.length; i++) {
//     const linha = linhas[i].trim();
//     if (!linha) continue;

//     const lUp = linha.toUpperCase();
//     if (lUp.includes("SUPERVISOR") && lUp.includes("VALOR")) continue;

//     const colunas = linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
//     if (colunas.length < 5) continue;

//     // 1. Deteção do Ano Oficial (procura por 2024, 2025 ou 2026 na linha ou na coluna AUX_ANO)
//     let ano = 0;
//     colunas.forEach(col => {
//       const val = col.replace(/"/g, "").trim();
//       if (val === "2024" || val === "2025" || val === "2026") {
//         ano = parseInt(val);
//       }
//     });

//     if (ano === 0) {
//       if (linha.includes("2024") && !linha.includes("2025") && !linha.includes("2026")) ano = 2024;
//       else if (linha.includes("2025")) ano = 2025;
//       else if (linha.includes("2026")) ano = 2026;
//     }

//     if (![2024, 2025, 2026].includes(ano)) continue;

//     // 2. Deteção do Valor Monetário (procura por R$ ou formato decimal em todas as colunas)
//     let valorStr = "0";
//     colunas.forEach(col => {
//       const val = col.replace(/"/g, "").trim();
//       if (val.includes("R$") || /^\d+[\.,]\d{2}$/.test(val)) {
//         valorStr = val;
//       }
//     });

//     // Fallback para a penúltima ou antepenúltima coluna se não achar pelo símbolo
//     if (valorStr === "0" && colunas.length >= 10) {
//       valorStr = colunas[9] ? colunas[9].replace(/"/g, "").trim() : "0";
//     }

//     const valorLimpo = valorStr.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
//     const valorNum = parseFloat(valorLimpo) || 0;

//     // 3. Deteção Universal e Infalível da Gravidade
//     let gravidadeNorm = "Média";
//     let gravidadeEncontrada = false;

//     colunas.forEach(col => {
//       const cUp = col.replace(/"/g, "").trim().toUpperCase();
//       if (!gravidadeEncontrada) {
//         if (cUp === "LEVE") {
//           gravidadeNorm = "Leve";
//           gravidadeEncontrada = true;
//         } else if (cUp === "GRAVÍSSIMA" || cUp === "GRAVISSIMA") {
//           gravidadeNorm = "Gravíssima";
//           gravidadeEncontrada = true;
//         } else if (cUp === "GRAVE") {
//           gravidadeNorm = "Grave";
//           gravidadeEncontrada = true;
//         } else if (cUp === "MÉDIA" || cUp === "MEDIA") {
//           gravidadeNorm = "Média";
//           gravidadeEncontrada = true;
//         }
//       }
//     });

//     if (tempMultasPorAnoGravidade[ano] && tempMultasPorAnoGravidade[ano][gravidadeNorm]) {
//       tempMultasPorAnoGravidade[ano][gravidadeNorm].count += 1;
//       tempMultasPorAnoGravidade[ano][gravidadeNorm].value += valorNum;
//     }

//     // 4. Identificação do Mês (procura por número de mês 1 a 12 ou nome do mês)
//     let mesIdx = -1;
//     colunas.forEach(col => {
//       const val = parseInt(col.replace(/"/g, "").trim());
//       if (!isNaN(val) && val >= 1 && val <= 12 && mesIdx === -1) {
//         // Verifica se está numa posição de mês (geralmente entre o índice 5 e 23)
//         mesIdx = val - 1;
//       }
//     });

//     if (mesIdx === -1) {
//       const lUpper = linha.toUpperCase();
//       if (lUpper.includes("JAN")) mesIdx = 0;
//       else if (lUpper.includes("FEV")) mesIdx = 1;
//       else if (lUpper.includes("MAR")) mesIdx = 2;
//       else if (lUpper.includes("ABR")) mesIdx = 3;
//       else if (lUpper.includes("MAI")) mesIdx = 4;
//       else if (lUpper.includes("JUN")) mesIdx = 5;
//       else if (lUpper.includes("JUL")) mesIdx = 6;
//       else if (lUpper.includes("AGO")) mesIdx = 7;
//       else if (lUpper.includes("SET")) mesIdx = 8;
//       else if (lUpper.includes("OUT")) mesIdx = 9;
//       else if (lUpper.includes("NOV")) mesIdx = 10;
//       else if (lUpper.includes("DEZ")) mesIdx = 11;
//     }

//     if (mesIdx >= 0 && mesIdx <= 11) {
//       if (ano === 2024) {
//         MULTAS_MONTHLY_2024[mesIdx].count += 1;
//         MULTAS_MONTHLY_2024[mesIdx].value += valorNum;
//       } else if (ano === 2025) {
//         MULTAS_MONTHLY_2025[mesIdx].count += 1;
//         MULTAS_MONTHLY_2025[mesIdx].value += valorNum;
//       } else if (ano === 2026) {
//         MULTAS_MONTHLY_2026[mesIdx].count += 1;
//         MULTAS_MONTHLY_2026[mesIdx].value += valorNum;
//       }
//     }
//   }

//   [2024, 2025, 2026].forEach((yr) => {
//     MULTAS_DATA[yr] = Object.keys(tempMultasPorAnoGravidade[yr]).map((grav) => ({
//       gravidade: grav,
//       count: tempMultasPorAnoGravidade[yr][grav].count,
//       value: tempMultasPorAnoGravidade[yr][grav].value,
//     }));
//   });
// }

function processarCSVMultas(csv) {
  const linhas = csv.split("\n");

  let tempMultasPorAnoGravidade = {
    2024: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } },
    2025: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } },
    2026: { Leve: { count: 0, value: 0 }, Média: { count: 0, value: 0 }, Grave: { count: 0, value: 0 }, Gravíssima: { count: 0, value: 0 } }
  };

  MULTAS_MONTHLY_2024 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
  MULTAS_MONTHLY_2025 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
  MULTAS_MONTHLY_2026 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    if (!linha) continue;

    const lUp = linha.toUpperCase();
    if (lUp.includes("SUPERVISOR") && lUp.includes("VALOR")) continue;

    const colunas = linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (colunas.length < 5) continue;

    // 1. Deteção rigorosa do Ano (Coluna W / Índice 22 - AUX_ANO ou varredura)
    let ano = 0;
    if (colunas.length >= 23 && colunas[22]) {
      let anoAux = parseInt(colunas[22].replace(/"/g, "").trim());
      if ([2024, 2025, 2026].includes(anoAux)) ano = anoAux;
    }

    if (ano === 0) {
      if (linha.includes("2024") && !linha.includes("2025") && !linha.includes("2026")) ano = 2024;
      else if (linha.includes("2025")) ano = 2025;
      else if (linha.includes("2026")) ano = 2026;
    }

    if (![2024, 2025, 2026].includes(ano)) continue;

    // 2. Deteção do Valor Monetário (Coluna J / Índice 9 ou varredura)
    let valorStr = "0";
    if (colunas.length >= 10 && colunas[9] && colunas[9].replace(/"/g, "").trim() !== "") {
      valorStr = colunas[9];
    } else {
      colunas.forEach(col => {
        const val = col.replace(/"/g, "").trim();
        if (val.includes("R$") || /^\d+[\.,]\d{2}$/.test(val)) valorStr = val;
      });
    }

    const valorLimpo = valorStr.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    const valorNum = parseFloat(valorLimpo) || 0;

    // 3. Deteção Universal e Limpa da Gravidade (Coluna K / Índice 10)
    let gravidadeNorm = "Média";
    let gravidadeEncontrada = false;

    colunas.forEach(col => {
      const cUp = col.replace(/"/g, "").trim().toUpperCase();
      if (!gravidadeEncontrada) {
        if (cUp === "LEVE") {
          gravidadeNorm = "Leve";
          gravidadeEncontrada = true;
        } else if (cUp === "GRAVÍSSIMA" || cUp === "GRAVISSIMA") {
          gravidadeNorm = "Gravíssima";
          gravidadeEncontrada = true;
        } else if (cUp === "GRAVE") {
          gravidadeNorm = "Grave";
          gravidadeEncontrada = true;
        } else if (cUp === "MÉDIA" || cUp === "MEDIA") {
          gravidadeNorm = "Média";
          gravidadeEncontrada = true;
        }
      }
    });

    if (tempMultasPorAnoGravidade[ano] && tempMultasPorAnoGravidade[ano][gravidadeNorm]) {
      tempMultasPorAnoGravidade[ano][gravidadeNorm].count += 1;
      tempMultasPorAnoGravidade[ano][gravidadeNorm].value += valorNum;
    }

    // 4. Identificação Robusta do Mês (Coluna X / Índice 23 - AUX_MES ou datas)
    let mesIdx = -1;
    if (colunas.length >= 24 && colunas[23]) {
      let mesAux = parseInt(colunas[23].replace(/"/g, "").trim());
      if (!isNaN(mesAux) && mesAux >= 1 && mesAux <= 12) {
        mesIdx = mesAux - 1;
      }
    }

    // Se não encontrou pelo AUX_MES, procura por datas ou nomes dos meses na linha
    if (mesIdx === -1) {
      colunas.forEach(col => {
        const val = col.replace(/"/g, "").trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(val) || /^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          const partes = val.includes("-") ? val.split("-") : val.split("/");
          if (partes.length >= 2) {
            let m = parseInt(partes[1]) - 1;
            if (m >= 0 && m <= 11 && mesIdx === -1) mesIdx = m;
          }
        }
      });
    }

    if (mesIdx === -1) {
      const lUpper = linha.toUpperCase();
      if (lUpper.includes("JAN") || lUpper.includes("JANEIRO")) mesIdx = 0;
      else if (lUpper.includes("FEV") || lUpper.includes("FEVEREIRO")) mesIdx = 1;
      else if (lUpper.includes("MAR") || lUpper.includes("MARÇO")) mesIdx = 2;
      else if (lUpper.includes("ABR") || lUpper.includes("ABRIL")) mesIdx = 3;
      else if (lUpper.includes("MAI") || lUpper.includes("MAIO")) mesIdx = 4;
      else if (lUpper.includes("JUN") || lUpper.includes("JUNHO")) mesIdx = 5;
      else if (lUpper.includes("JUL") || lUpper.includes("JULHO")) mesIdx = 6;
      else if (lUpper.includes("AGO") || lUpper.includes("AGOSTO")) mesIdx = 7;
      else if (lUpper.includes("SET") || lUpper.includes("SETEMBRO")) mesIdx = 8;
      else if (lUpper.includes("OUT") || lUpper.includes("OUTUBRO")) mesIdx = 9;
      else if (lUpper.includes("NOV") || lUpper.includes("NOVEMBRO")) mesIdx = 10;
      else if (lUpper.includes("DEZ") || lUpper.includes("DEZEMBRO")) mesIdx = 11;
    }

    if (mesIdx >= 0 && mesIdx <= 11) {
      if (ano === 2024) {
        MULTAS_MONTHLY_2024[mesIdx].count += 1;
        MULTAS_MONTHLY_2024[mesIdx].value += valorNum;
      } else if (ano === 2025) {
        MULTAS_MONTHLY_2025[mesIdx].count += 1;
        MULTAS_MONTHLY_2025[mesIdx].value += valorNum;
      } else if (ano === 2026) {
        MULTAS_MONTHLY_2026[mesIdx].count += 1;
        MULTAS_MONTHLY_2026[mesIdx].value += valorNum;
      }
    }
  }

  [2024, 2025, 2026].forEach((yr) => {
    MULTAS_DATA[yr] = Object.keys(tempMultasPorAnoGravidade[yr]).map((grav) => ({
      gravidade: grav,
      count: tempMultasPorAnoGravidade[yr][grav].count,
      value: tempMultasPorAnoGravidade[yr][grav].value,
    }));
  });
}

const DRIVERS_EXCESSO_DATA = {
  "CENTRO OESTE": [
    { name: "Allan Barbosa", count: 39 },
    { name: "Luiz Felipe", count: 17 },
    { name: "Thatielly", count: 16 },
    { name: "Bruno Souza", count: 10 },
    { name: "Helder Silva", count: 9 },
    { name: "Rafael", count: 6 },
  ],
  NORDESTE: [
    { name: "Degrimaldo", count: 43 },
    { name: "Fabio Oliveira", count: 15 },
    { name: "Oseias", count: 7 },
    { name: "André Lopes", count: 4 },
    { name: "Pedro Serra", count: 1 },
  ],
  SUL: [
    { name: "Eduardo Boza", count: 44 },
    { name: "Cristian", count: 43 },
    { name: "Fernando", count: 27 },
    { name: "Pamela Coutinho", count: 12 },
    { name: "Deize", count: 10 },
    { name: "Phelipe Vieira", count: 10 },
    { name: "Michel", count: 8 },
    { name: "Mario Lopez", count: 5 },
    { name: "Marcelo Duarte", count: 4 },
  ],
};

const DRIVERS_FORA_HORARIO_DATA = {
  "CENTRO OESTE": [
    { name: "Thatielly", count: 58 },
    { name: "Bruno Souza", count: 24 },
    { name: "Allan", count: 15 },
    { name: "Luiz", count: 13 },
    { name: "Rafael", count: 7 },
    { name: "Helder Silva", count: 4 },
  ],
  NORDESTE: [
    { name: "André Lopez", count: 39 },
    { name: "Degrimaldo", count: 32 },
    { name: "Ítalo Marques", count: 21 },
    { name: "Oseias", count: 18 },
    { name: "Ayda", count: 7 },
  ],
  SUL: [
    { name: "Cristhian", count: 78 },
    { name: "Marcelo Duarte", count: 34 },
    { name: "Eduardo Boza", count: 29 },
    { name: "Fernando", count: 28 },
    { name: "Pamela Coutinho", count: 20 },
    { name: "Deize", count: 12 },
    { name: "Phelipe Vieira", count: 10 },
    { name: "Mario Lopez", count: 1 },
  ],
};

const NORDESTE_PANEL_DATA = {
  total: 2507,
  supervisors: [
    { name: "Pedro Serra", count: 455 },
    { name: "Ítalo Marques", count: 337 },
    { name: "Degrimaldo", count: 319 },
    { name: "Claudio Gledson", count: 250 },
    { name: "André Lopes", count: 173 },
    { name: "Igor Gabriel", count: 159 },
  ],
  routes: [
    { code: "FSA03", count: 43 },
    { code: "FSA01B", count: 33 },
    { code: "LSC01", count: 32 },
  ],
  justifications: [
    { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 399 },
    { reason: "MOTORISTA ORIENTADO", count: 375 },
  ],
};

const CENTRO_OESTE_PANEL_DATA = {
  total: 1099,
  supervisors: [
    { name: "Thatielly", count: 316 },
    { name: "Allan Barbosa", count: 214 },
    { name: "Bruno Souza", count: 208 },
  ],
  routes: [
    { code: "GO012", count: 47 },
    { code: "GOBSB2", count: 39 },
  ],
  justifications: [{ reason: "MOTORISTA ORIENTADO", count: 689 }],
};

const SUL_PANEL_DATA = {
  total: 1158,
  supervisors: [
    { name: "Cristian", count: 242 },
    { name: "Michel", count: 189 },
    { name: "Pamela Coutinho", count: 144 },
  ],
  routes: [
    { code: "PRO4", count: 61 },
    { code: "PRO5", count: 50 },
  ],
  justifications: [{ reason: "MOTORISTA ORIENTADO", count: 512 }],
};

const LOGCARE_PANEL_DATA = [
  { label: "INICIO ANTECIPADO MAIOR QUE 15 MIN", count: 2141 },
  { label: "ROTA NÃO SINCRONIZADA", count: 1224 },
  { label: "ATRASO DE INICIO", count: 598 },
  { label: "ATRASO NA 1º COLETA", count: 386 },
];

const RAW_DATABASE = {
  multiplos_excesso: {
    title: "Múltiplos Excessos de Velocidade",
    desc: "Ocorrências reincidentes.",
    icon: "zap",
    data: {
      SUL: [5, 2, 4, 1, 4, 0, 2, 0, 4, 0],
      NORDESTE: [1, 0, 2, 1, 0, 0, 2, 0, 1, 0],
      "CENTRO OESTE": [2, 1, 0, 0, 1, 1, 4, 2, 3, 1],
    },
  },
  excesso_velocidade: {
    title: "Excessos de Velocidade",
    desc: "Eventos individuais.",
    icon: "gauge",
    data: {
      SUL: [15, 13, 23, 16, 9, 17, 24, 13, 10, 1],
      NORDESTE: [6, 2, 8, 5, 3, 12, 12, 3, 7, 5],
      "CENTRO OESTE": [8, 10, 5, 4, 13, 9, 11, 8, 8, 6],
    },
  },
  rodando_fora_horario: {
    title: "Rodando Fora de Horário",
    desc: "Utilização fora do expediente.",
    icon: "clock",
    data: {
      SUL: [27, 34, 23, 29, 23, 18, 21, 16, 24, 58],
      NORDESTE: [9, 9, 15, 8, 16, 14, 15, 5, 17, 26],
      "CENTRO OESTE": [20, 22, 23, 7, 15, 11, 5, 17, 16, 27],
    },
  },
  painel_nordeste: {
    title: "Painel Nordeste",
    desc: "Análise consolidada.",
    icon: "bar-chart-2",
    data: {
      SUL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      NORDESTE: [210, 220, 260, 240, 270, 250, 280, 240, 260, 267],
      "CENTRO OESTE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  painel_centro_oeste: {
    title: "Painel Centro Oeste",
    desc: "Análise consolidada.",
    icon: "bar-chart-3",
    data: {
      SUL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      NORDESTE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "CENTRO OESTE": [90, 105, 115, 100, 120, 110, 125, 110, 112, 112],
    },
  },
  painel_sul: {
    title: "Painel Sul",
    desc: "Análise consolidada.",
    icon: "bar-chart-4",
    data: {
      SUL: [102, 115, 120, 108, 125, 112, 128, 110, 118, 120],
      NORDESTE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "CENTRO OESTE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  painel_logcare: {
    title: "Painel LogCare",
    desc: "Monitoramento de atrasos.",
    icon: "clock-5",
    data: {
      SUL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      NORDESTE: [410, 430, 490, 460, 520, 480, 530, 470, 490, 484],
      "CENTRO OESTE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
};

function generateConsolidatedData() {
  const consolidated = {
    title: "Visão Geral Consolidada",
    desc: "Soma executiva de todas as infrações.",
    data: {
      SUL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      NORDESTE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "CENTRO OESTE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  };
  Object.keys(RAW_DATABASE).forEach((catKey) => {
    if (
      catKey.startsWith("ranking_") ||
      catKey === "evolucao_multas" ||
      catKey.startsWith("painel_")
    )
      return;
    const cat = RAW_DATABASE[catKey];
    ["SUL", "NORDESTE", "CENTRO OESTE"].forEach((reg) => {
      for (let i = 0; i < 10; i++)
        consolidated.data[reg][i] += cat.data[reg][i];
    });
  });
  return consolidated;
}

const DATABASE = { visao_geral: generateConsolidatedData(), ...RAW_DATABASE };
const REGION_COLORS = {
  SUL: { stroke: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
  NORDESTE: { stroke: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  "CENTRO OESTE": { stroke: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
};

let currentTab = "visao_geral";
let evolutionChartInstance = null,
  distributionChartInstance = null,
  multasCountChartInstance = null,
  multasValueChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosDoGoogleSheets().then(() => {
    updateSidebarBadges();
    updateDashboard();
  });
  if (window.lucide) lucide.createIcons();
});

function updateSidebarBadges() {
  Object.keys(DATABASE).forEach((key) => {
    const badge = document.getElementById(`badge-${key}`);
    if (badge) {
      let catTotal = 0;
      if (key === "evolucao_multas") {
        const total2024 = MULTAS_MONTHLY_2024.reduce(
          (acc, item) => acc + item.count,
          0,
        );
        const total2025 = MULTAS_MONTHLY_2025.reduce(
          (acc, item) => acc + item.count,
          0,
        );
        const total2026 = MULTAS_MONTHLY_2026.reduce(
          (acc, item) => acc + item.count,
          0,
        );
        catTotal = total2024 + total2025 + total2026;
      } else if (key === "painel_nordeste")
        catTotal = NORDESTE_PANEL_DATA.total;
      else if (key === "painel_centro_oeste")
        catTotal = CENTRO_OESTE_PANEL_DATA.total;
      else if (key === "painel_sul") catTotal = SUL_PANEL_DATA.total;
      else if (key === "painel_logcare")
        catTotal = LOGCARE_PANEL_DATA.reduce(
          (acc, item) => acc + item.count,
          0,
        );
      else if (DATABASE[key] && DATABASE[key].data) {
        ["SUL", "NORDESTE", "CENTRO OESTE"].forEach((reg) => {
          if (DATABASE[key].data[reg])
            catTotal += DATABASE[key].data[reg].reduce((a, b) => a + b, 0);
        });
      }
      badge.innerText = catTotal.toLocaleString("pt-BR");
    }
  });
}

function switchTab(tabKey) {
  currentTab = tabKey;
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove(
      "bg-blue-600/20",
      "text-blue-400",
      "border",
      "border-blue-500/30",
      "font-semibold",
    );
    btn.classList.add(
      "text-slate-400",
      "hover:text-slate-200",
      "hover:bg-slate-800/60",
      "font-medium",
    );
  });
  const activeBtn = document.getElementById(`nav-${tabKey}`);
  if (activeBtn) {
    activeBtn.classList.remove(
      "text-slate-400",
      "hover:text-slate-200",
      "hover:bg-slate-800/60",
      "font-medium",
    );
    activeBtn.classList.add(
      "bg-blue-600/20",
      "text-blue-400",
      "border",
      "border-blue-500/30",
      "font-semibold",
    );
  }
  updateDashboard();
}

function handleFilterChange() {
  updateDashboard();
}
function getActiveMonthIndices() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function updateDashboard() {
  const activeGroup = DATABASE[currentTab];
  const selectEl = document.getElementById("regionSelect");
  const selectedRegion = selectEl ? selectEl.value : "TODAS";
  const monthIndices = getActiveMonthIndices();
  const activeMonths = monthIndices.map((i) => MONTHS[i]);

  const yearFilterContainer = document.getElementById(
    "multasYearFilterContainer",
  );
  if (yearFilterContainer) {
    if (currentTab === "evolucao_multas") {
      yearFilterContainer.classList.remove("hidden");
      yearFilterContainer.classList.add("flex");
    } else {
      yearFilterContainer.classList.add("hidden");
      yearFilterContainer.classList.remove("flex");
    }
  }

  const titleEl = document.getElementById("currentTitle");
  const descEl = document.getElementById("currentDesc");
  if (currentTab === "evolucao_multas") {
    if (titleEl) titleEl.innerText = "Evolução e Controle de Multas";
    if (descEl)
      descEl.innerText =
        "Comparativo financeiro e quantitativo puxado diretamente do Google Sheets.";
  } else {
    if (titleEl && activeGroup) titleEl.innerText = activeGroup.title;
    if (descEl && activeGroup) descEl.innerText = activeGroup.desc;
  }

  const stdCharts = document.getElementById("standardChartsContainer");
  const evolucaoMultasPanel = document.getElementById(
    "evolucaoMultasContainer",
  );
  const tableContainer = document.getElementById("tableContainer");

  if (stdCharts) stdCharts.classList.add("hidden");
  if (evolucaoMultasPanel) evolucaoMultasPanel.classList.add("hidden");
  if (tableContainer) tableContainer.classList.add("hidden");

  if (currentTab === "evolucao_multas") {
    if (evolucaoMultasPanel) evolucaoMultasPanel.classList.remove("hidden");
    renderEvolucaoMultasPanel();
  } else {
    if (stdCharts) stdCharts.classList.remove("hidden");
    if (tableContainer) tableContainer.classList.remove("hidden");
  }

  const regionKeys =
    selectedRegion === "TODAS"
      ? ["SUL", "NORDESTE", "CENTRO OESTE"]
      : [selectedRegion];
  let filteredData = {};
  if (activeGroup && activeGroup.data) {
    regionKeys.forEach((reg) => {
      const foundKey = Object.keys(activeGroup.data).find(
        (k) => k.trim().toUpperCase() === reg.trim().toUpperCase(),
      );
      filteredData[reg] = foundKey
        ? monthIndices.map((idx) => activeGroup.data[foundKey][idx])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    });
  }

  updateKPIs(filteredData, regionKeys, activeMonths);
  if (currentTab !== "evolucao_multas") {
    renderEvolutionChart(activeMonths, filteredData);
    renderDistributionChart(filteredData);
    if (activeGroup && activeGroup.data)
      renderTable(activeGroup.data, monthIndices);
  }
  if (window.lucide) lucide.createIcons();
}

function updateKPIs(filteredData, regionKeys, activeMonths) {
  let totalVal = 0;
  if (currentTab === "evolucao_multas") {
    const yearSelect = document.getElementById("multasYearSelect");
    const selectedYear = yearSelect ? yearSelect.value : "2026";
    if (selectedYear === "2024")
      totalVal = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
    else if (selectedYear === "2025")
      totalVal = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
    else if (selectedYear === "2026")
      totalVal = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
    else
      totalVal =
        MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0) +
        MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0) +
        MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
  } else {
    regionKeys.forEach((reg) => {
      if (filteredData[reg])
        totalVal += filteredData[reg].reduce((a, b) => a + b, 0);
    });
  }
  const totalEl = document.getElementById("kpi-total");
  if (totalEl) totalEl.innerText = totalVal.toLocaleString("pt-BR");
}

function renderEvolucaoMultasPanel() {
  const cardsContainer = document.getElementById("multasCardsContainer");
  const gravidadeBox = document.getElementById("distributionGravidadeContainer");
  const impactCard = document.getElementById("multasImpactCard");
  const topGrid = document.getElementById("multasTopGrid");
  const yearSelect = document.getElementById("multasYearSelect");
  const mainValueEl = document.getElementById("multasMainValue");
  const mainCountEl = document.getElementById("multasMainCount");

  if (!cardsContainer || !yearSelect) return;
  
  // Limpeza preventiva de qualquer duplicação para evitar o efeito "clone"
  cardsContainer.innerHTML = "";
  if (topGrid) topGrid.innerHTML = "";

  const selectedYear = yearSelect.value;
  updateSidebarBadges();

  const isConsolidated = selectedYear === "TODAS";
  const yearsToRender = isConsolidated ? [2024, 2025, 2026] : [parseInt(selectedYear)];
  const yearStyles = {
    2024: {
      border: "border-l-purple-500",
      badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    2025: {
      border: "border-l-amber-500",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    2026: {
      border: "border-l-blue-500",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
  };

  if (isConsolidated) {
    if (gravidadeBox) gravidadeBox.classList.add("hidden");
    if (impactCard) impactCard.classList.add("hidden");
    if (topGrid) {
      topGrid.className = "grid grid-cols-1 md:grid-cols-3 gap-4";
      let htmlConsolidado = "";
      yearsToRender.forEach((yr) => {
        const yrCount = MULTAS_DATA[yr].reduce((a, b) => a + b.count, 0);
        const yrVal = MULTAS_DATA[yr].reduce((a, b) => a + b.value, 0);
        htmlConsolidado += `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 border-l-4 ${yearStyles[yr].border} shadow-sm flex flex-col justify-between">
              <div class="flex justify-between items-center">
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidado ${yr}</span>
                  <span class="text-xs font-bold px-2.5 py-1 rounded-full ${yearStyles[yr].badgeBg}">${yrCount} Infrações</span>
              </div>
              <div class="mt-3 flex items-baseline justify-between">
                  <span class="text-2xl font-extrabold text-white">R$ ${yrVal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  <span class="text-xs text-slate-400">Total a Pagar</span>
              </div>
          </div>
        `;
      });
      topGrid.innerHTML = htmlConsolidado;
    }
  } else {
    if (gravidadeBox) gravidadeBox.classList.remove("hidden");
    if (impactCard) impactCard.classList.remove("hidden");
    if (topGrid) {
      topGrid.className = "grid grid-cols-1 lg:grid-cols-3 gap-4";
      // Restaura o HTML estrutural original do impactCard e gravidadeBox se necessário
      topGrid.innerHTML = `
        <div id="multasImpactCard" class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between border-l-4 border-l-blue-500 transition-all duration-300">
            <div class="flex justify-between items-center">
                <span id="multasImpactTitle" class="text-xs font-bold text-slate-400 uppercase tracking-wider">Impacto Financeiro Total</span>
                <i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i>
            </div>
            <div class="my-3">
                <span id="multasMainValue" class="text-3xl font-extrabold text-white">R$ 0,00</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <span id="multasImpactSubtext">Total a Pagar no Período</span>
                <span id="multasMainCount" class="font-bold text-blue-400">0 Infrações</span>
            </div>
        </div>

        <div id="distributionGravidadeContainer" class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Distribuição por Gravidade (Qtd / Valor)</span>
                <i data-lucide="pie-chart" class="w-4 h-4 text-purple-400"></i>
            </div>
            <div id="multasCardsContainer" class="grid grid-cols-2 sm:grid-cols-4 gap-3"></div>
        </div>
      `;
    }

    // Reatribui os valores corretos após restaurar o HTML
    const novoMainVal = document.getElementById("multasMainValue");
    const novoMainCount = document.getElementById("multasMainCount");
    const novoCardsContainer = document.getElementById("multasCardsContainer");

    const yr = yearsToRender[0];
    const yrCount = MULTAS_DATA[yr].reduce((a, b) => a + b.count, 0);
    const yrVal = MULTAS_DATA[yr].reduce((a, b) => a + b.value, 0);

    if (novoMainVal) novoMainVal.innerText = `R$ ${yrVal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    if (novoMainCount) novoMainCount.innerText = `${yrCount} Infrações`;

    if (novoCardsContainer) {
      let gravidadeCardsHtml = "";
      MULTAS_DATA[yr].forEach((item) => {
        gravidadeCardsHtml += `
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
              <span class="text-[11px] font-bold text-slate-400 uppercase">${item.gravidade}</span>
              <div class="my-1.5"><span class="text-lg font-extrabold text-white">${item.count} <span class="text-xs font-normal text-slate-400">ev.</span></span></div>
              <span class="text-xs font-bold text-emerald-400">R$ ${item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          </div>
        `;
      });
      novoCardsContainer.innerHTML = gravidadeCardsHtml;
    }
  }

  renderSideBySideMultasCharts(selectedYear);
  updateDashboardKPIsForMultas(selectedYear);
  if (window.lucide) lucide.createIcons();
}
function updateDashboardKPIsForMultas(selectedYear) {
  const totalEl = document.getElementById("kpi-total");
  const headerCountEl = document.getElementById("multasHeaderCount");
  let val = 0;
  if (selectedYear === "2024")
    val = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
  else if (selectedYear === "2025")
    val = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
  else if (selectedYear === "2026")
    val = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
  else
    val =
      MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0) +
      MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0) +
      MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);

  if (totalEl) totalEl.innerText = val.toLocaleString("pt-BR");
  if (headerCountEl)
    headerCountEl.innerText = `${val.toLocaleString("pt-BR")} Infrações`;
}

function renderSideBySideMultasCharts(selectedYear) {
  const countCanvas = document.getElementById("multasCountChart");
  const valueCanvas = document.getElementById("multasValueChart");
  if (!countCanvas || !valueCanvas) return;

  let labels = MONTHS,
    countDatasets = [],
    valueDatasets = [];
  if (selectedYear === "2024") {
    countDatasets = [
      {
        label: "2024",
        data: MULTAS_MONTHLY_2024.map((i) => i.count),
        backgroundColor: "rgba(168, 85, 247, 0.85)",
        borderRadius: 6,
      },
    ];
    valueDatasets = [
      {
        label: "2024",
        data: MULTAS_MONTHLY_2024.map((i) => i.value),
        backgroundColor: "rgba(16, 185, 129, 0.85)",
        borderRadius: 6,
      },
    ];
  } else if (selectedYear === "2025") {
    countDatasets = [
      {
        label: "2025",
        data: MULTAS_MONTHLY_2025.map((i) => i.count),
        backgroundColor: "rgba(245, 158, 11, 0.85)",
        borderRadius: 6,
      },
    ];
    valueDatasets = [
      {
        label: "2025",
        data: MULTAS_MONTHLY_2025.map((i) => i.value),
        backgroundColor: "rgba(16, 185, 129, 0.85)",
        borderRadius: 6,
      },
    ];
  } else if (selectedYear === "2026") {
    countDatasets = [
      {
        label: "2026",
        data: MULTAS_MONTHLY_2026.map((i) => i.count),
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderRadius: 6,
      },
    ];
    valueDatasets = [
      {
        label: "2026",
        data: MULTAS_MONTHLY_2026.map((i) => i.value),
        backgroundColor: "rgba(16, 185, 129, 0.85)",
        borderRadius: 6,
      },
    ];
  } else {
    countDatasets = [
      {
        label: "2024",
        data: MULTAS_MONTHLY_2024.map((i) => i.count),
        backgroundColor: "rgba(168, 85, 247, 0.85)",
      },
      {
        label: "2025",
        data: MULTAS_MONTHLY_2025.map((i) => i.count),
        backgroundColor: "rgba(245, 158, 11, 0.85)",
      },
      {
        label: "2026",
        data: MULTAS_MONTHLY_2026.map((i) => i.count),
        backgroundColor: "rgba(59, 130, 246, 0.85)",
      },
    ];
    valueDatasets = [
      {
        label: "2024",
        data: MULTAS_MONTHLY_2024.map((i) => i.value),
        backgroundColor: "rgba(126, 34, 206, 0.85)",
      },
      {
        label: "2025",
        data: MULTAS_MONTHLY_2025.map((i) => i.value),
        backgroundColor: "rgba(217, 119, 6, 0.85)",
      },
      {
        label: "2026",
        data: MULTAS_MONTHLY_2026.map((i) => i.value),
        backgroundColor: "rgba(16, 185, 129, 0.85)",
      },
    ];
  }

  if (multasCountChartInstance) multasCountChartInstance.destroy();
  multasCountChartInstance = new Chart(countCanvas.getContext("2d"), {
    type: "bar",
    data: { labels, datasets: countDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
  });

  if (multasValueChartInstance) multasValueChartInstance.destroy();
  multasValueChartInstance = new Chart(valueCanvas.getContext("2d"), {
    type: "bar",
    data: { labels, datasets: valueDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
  });
}

function renderEvolutionChart(labels, filteredData) {
  const canvas = document.getElementById("evolutionChart");
  if (!canvas) return;
  const datasets = Object.keys(filteredData).map((reg) => ({
    label: reg,
    data: filteredData[reg],
    borderColor: REGION_COLORS[reg].stroke,
    backgroundColor: REGION_COLORS[reg].bg,
    fill: true,
    tension: 0.3,
  }));
  if (evolutionChartInstance) evolutionChartInstance.destroy();
  evolutionChartInstance = new Chart(canvas.getContext("2d"), {
    type: "line",
    data: { labels, datasets },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

function renderDistributionChart(filteredData) {
  const canvas = document.getElementById("distributionChart");
  if (!canvas) return;
  const labels = Object.keys(filteredData);
  const totals = labels.map((reg) =>
    filteredData[reg].reduce((a, b) => a + b, 0),
  );
  if (distributionChartInstance) distributionChartInstance.destroy();
  distributionChartInstance = new Chart(canvas.getContext("2d"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        { data: totals, backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"] },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

function renderTable(fullCategoryData, monthIndices) {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  Object.keys(fullCategoryData).forEach((reg) => {
    const fullMonthArray = fullCategoryData[reg];
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-800/50";
    let htmlContent = `<td class="py-3.5 px-4">${reg}</td>`;
    let rowSum = 0;
    for (let i = 0; i < 10; i++) {
      rowSum += fullMonthArray[i];
      htmlContent += `<td class="py-3.5 px-2 text-center">${fullMonthArray[i]}</td>`;
    }
    htmlContent += `<td class="py-3.5 px-4 text-right font-extrabold">${rowSum.toLocaleString("pt-BR")}</td><td class="py-3.5 px-4 text-center">Estável</td>`;
    tr.innerHTML = htmlContent;
    tbody.appendChild(tr);
  });
}

function toggleSidebar() {
  const s = document.getElementById("sidebar");
  if (s) s.classList.toggle("hidden");
}
function toggleMenu(id) {
  const m = document.getElementById(id);
  if (m) m.classList.toggle("hidden");
}
