const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// ==========================================
// INTEGRAÇÃO COM GOOGLE SHEETS (MULTAS)
// ==========================================
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAuQcgKhR4Kcb--r9cxLjFZ3Z3mYdOyx_uMSaEoZBGKHPx7fjWEze26FcRKiA48joDCkW0Ntj7Beu8/pub?output=csv";

let MULTAS_DATA = { 2024: {}, 2025: {}, 2026: {} };
let MULTAS_MONTHLY_2024 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
let MULTAS_MONTHLY_2025 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));
let MULTAS_MONTHLY_2026 = Array(12).fill(0).map(() => ({ count: 0, value: 0 }));

async function carregarDadosDoGoogleSheets() {
    try {
        const resposta = await fetch(GOOGLE_SHEETS_CSV_URL);
        const csvTexto = await resposta.text();
        processarCSVMultas(csvTexto);
        updateSidebarBadges();
        updateDashboard();
        if (typeof renderEvolucaoMultasPanel === 'function') {
            renderEvolucaoMultasPanel();
        }
    } catch (erro) {
        console.error("Erro ao sincronizar com o Google Sheets:", erro);
    }
}

function processarCSVMultas(csv) {
    const linhas = csv.split("\n");
    
    let tempGravidades = {
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
        
        // Pula o cabeçalho da tabela
        if (lUp.includes("SUPERVISOR") && (lUp.includes("VALOR") || lUp.includes("MÊS"))) continue;

        const colunas = linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/"/g, "").trim());
        if (colunas.length < 5) continue;

        // Estrutura das Colunas:
        // Coluna 0 (A): SUPERVISOR
        // Coluna 1 (B): MÊS
        // Coluna 2 (C): DATA DA INFRAÇÃO (Utilizada para extração exata do mês e ano)
        // Coluna 3 (D): VALOR
        // Coluna 4 (E): INFRAÇÃO / Gravidade

        const dataStr = colunas[2];
        const valorStr = colunas[3];
        const infracaoStr = colunas[4] || "Média";

        let ano = 0;
        let mesIdx = -1;

        if (dataStr) {
            if (dataStr.includes("-")) {
                const partes = dataStr.split(/[-/]/);
                if (partes.length >= 3 && partes[0].length === 4) {
                    ano = parseInt(partes[0]);
                    mesIdx = parseInt(partes[1]) - 1;
                }
            } else if (dataStr.includes("/")) {
                const partes = dataStr.split("/");
                if (partes.length === 3) {
                    mesIdx = parseInt(partes[1]) - 1;
                    ano = parseInt(partes[2]);
                }
            }
        }

        if (![2024, 2025, 2026].includes(ano)) {
            if (linha.includes("2024")) ano = 2024;
            else if (linha.includes("2025")) ano = 2025;
            else if (linha.includes("2026")) ano = 2026;
            else continue;
        }

        if (mesIdx < 0 || mesIdx > 11) continue;

        // Conversão limpa do valor monetário
        const valorLimpo = valorStr.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
        const valorNum = parseFloat(valorLimpo) || 0;

        // Normalização da Infração / Gravidade
        let gravidadeNorm = "Média";
        const gUp = infracaoStr.toUpperCase();
        if (gUp.includes("LEVE")) gravidadeNorm = "Leve";
        else if (gUp.includes("GRAVISSIMA") || gUp.includes("GRAVÍSSIMA")) gravidadeNorm = "Gravíssima";
        else if (gUp.includes("GRAVE")) gravidadeNorm = "Grave";
        else if (gUp.includes("MEDIA") || gUp.includes("MÉDIA")) gravidadeNorm = "Média";

        if (tempGravidades[ano] && tempGravidades[ano][gravidadeNorm]) {
            tempGravidades[ano][gravidadeNorm].count += 1;
            tempGravidades[ano][gravidadeNorm].value += valorNum;
        }

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

    [2024, 2025, 2026].forEach((yr) => {
        if (tempGravidades[yr]) {
            MULTAS_DATA[yr] = Object.keys(tempGravidades[yr]).map((grav) => ({
                gravidade: grav,
                count: tempGravidades[yr][grav].count,
                value: tempGravidades[yr][grav].value,
            }));
        }
    });
}

// ==========================================
// BASES DE DADOS ORIGINAIS PRESERVADAS
// ==========================================
const DRIVERS_EXCESSO_DATA = {
    "CENTRO OESTE": [
        { name: "Allan Barbosa", count: 39 }, { name: "Luiz Felipe", count: 17 }, { name: "Thatielly", count: 16 },
        { name: "Bruno Souza", count: 10 }, { name: "Helder Silva", count: 9 }, { name: "Rafael", count: 6 }
    ],
    "NORDESTE": [
        { name: "Degrimaldo", count: 43 }, { name: "Fabio Oliveira", count: 15 }, { name: "Oseias", count: 7 },
        { name: "André Lopes", count: 4 }, { name: "Pedro Serra", count: 1 },
    ],
    "SUL": [
        { name: "Eduardo Boza", count: 44 }, { name: "Cristian", count: 43 }, { name: "Fernando", count: 27 },
        { name: "Pamela Coutinho", count: 12 }, { name: "Deize", count: 10 }, { name: "Phelipe Vieira", count: 10 },
        { name: "Michel", count: 8 }, { name: "Mario Lopez", count: 5 }, { name: "Marcelo Duarte", count: 4 },
    ]
};

const DRIVERS_FORA_HORARIO_DATA = {
    "CENTRO OESTE": [
        { name: "Thatielly", count: 58 }, { name: "Bruno Souza", count: 24 }, { name: "Allan", count: 15 },
        { name: "Luiz", count: 13 }, { name: "Rafael", count: 7 }, { name: "Helder Silva", count: 4 }
    ],
    "NORDESTE": [
        { name: "André Lopez", count: 39 }, { name: "Degrimaldo", count: 32 }, { name: "Ítalo Marques", count: 21 },
        { name: "Oseias", count: 18 }, { name: "Ayda", count: 7 }
    ],
    "SUL": [
        { name: "Cristhian", count: 78 }, { name: "Marcelo Duarte", count: 34 }, { name: "Eduardo Boza", count: 29 },
        { name: "Fernando", count: 28 }, { name: "Pamela Coutinho", count: 20 }, { name: "Deize", count: 12 },
        { name: "Phelipe Vieira", count: 10 }, { name: "Mario Lopez", count: 1 }
    ]
};

const NORDESTE_PANEL_DATA = {
    total: 2507,
    supervisors: [
        { name: "Pedro Serra", count: 455 }, { name: "Ítalo Marques", count: 337 }, { name: "Degrimaldo", count: 319 },
        { name: "Claudio Gledson", count: 250 }, { name: "André Lopes", count: 173 }, { name: "Igor Gabriel", count: 159 },
        { name: "Ayda Carielo", count: 138 }, { name: "Thomas Alisson", count: 116 }, { name: "Lenilson", count: 111 }, { name: "Oseias", count: 81 }
    ],
    routes: [
        { code: "FSA03", count: 43 }, { code: "FSA01B", count: 33 }, { code: "LSC01", count: 32 }, { code: "PE011", count: 31 },
        { code: "AEROMAB", count: 29 }, { code: "GNM01A", count: 29 }, { code: "RN005", count: 28 }, { code: "AEROMCP", count: 28 }, { code: "TER01A", count: 28 }, { code: "VDC01", count: 27 }
    ],
    justifications: [
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 399}, { reason: "MOTORISTA ORIENTADO", count: 375 },
        { reason: "SUPERVISOR COMUNICADO / ROTA INICIADA", count: 363 }, { reason: "REALIZAÇÃO DE CHECKLIST", count: 239 }, { reason: "SEM APARELHO CELULAR", count: 168 }
    ]
};

const CENTRO_OESTE_PANEL_DATA = {
    total: 1099,
    supervisors: [
        { name: "Thatielly", count: 316 }, { name: "Allan Barbosa", count: 214 }, { name: "Bruno Souza", count: 208 },
        { name: "Helder Silva", count: 74 }, { name: "Rafael", count: 57 }, { name: "Luiz Felipe", count: 46 }
    ],
    routes: [
        { code: "GO012", count: 47 }, { code: "GOBSB2", count: 39 }, { code: "DF003", count: 35 }, { code: "GO014", count: 34 }, { code: "GOBSB1", count: 30 }
    ],
    justifications: [
        { reason: "MOTORISTA ORIENTADO", count: 689 }, { reason: "INSTABILIDADE NO SISTEMA DO LOGCARE", count: 67 },
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 55 }, { reason: "TRÂNSITO CONGESTIONADO", count: 45 }
    ]
};

const SUL_PANEL_DATA = {
    total: 1158,
    supervisors: [
        { name: "Cristian", count: 242 }, { name: "Michel", count: 189 }, { name: "Pamela Coutinho", count: 144 },
        { name: "Eduardo Boza", count: 142 }, { name: "Marcelo Duarte", count: 59 }, { name: "Phelipe Vieira", count: 58 }
    ],
    routes: [
        { code: "PRO4", count: 61 }, { code: "PRO5", count: 50 }, { code: "JOI05", count: 37 }, { code: "JOI09", count: 34 }, { code: "PRO3.1", count: 27 }
    ],
    justifications: [
        { reason: "MOTORISTA ORIENTADO", count: 512 }, { reason: "SUPERVISOR COMUNICADO / ROTA INICIADA", count: 215 },
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 148 }, { reason: "REALIZAÇÃO DE CHECKLIST", count: 96 }
    ]
};

const LOGCARE_PANEL_DATA = [
    { label: "INICIO ANTECIPADO MAIOR QUE 15 MIN", count: 2141 },
    { label: "ROTA NÃO SINCRONIZADA", count: 1224 },
    { label: "ATRASO DE INICIO", count: 598 },
    { label: "ATRASO NA 1º COLETA", count: 386 },
    { label: "ATRASO DE INICIO E ATRASO NA 1º COLETA", count: 319 },
    { label: "INICIO ANTECIPADO MAIOR QUE 15 MIN E...", count: 67 },
    { label: "INICIO ANTECIPADO MAIOR QUE 30 MIN", count: 18 },
    { label: "ATRASO NA ENTREGA", count: 11 }
];

const RAW_DATABASE = {
    multiplos_excesso: {
        title: "Múltiplos Excessos de Velocidade",
        desc: "Ocorrências reincidentes de alta velocidade registradas pelo mesmo veículo em sequência.",
        icon: "zap",
        data: {
            SUL:            [5, 2, 4, 1, 4, 0, 2, 0, 4, 0, 0, 0],
            NORDESTE:       [1, 0, 2, 1, 0, 0, 2, 0, 1, 0, 0, 0],
            "CENTRO OESTE": [2, 1, 0, 0, 1, 1, 4, 2, 3, 1, 0, 0] 
        }
    },
    excesso_velocidade: {
        title: "Excessos de Velocidade",
        desc: "Eventos individuais de transposição dos limites de velocidade configurados na telemetria.",
        icon: "gauge",
        data: {
            SUL:            [15, 13, 23, 16, 9, 17, 24, 13, 10, 1, 0, 0],
            NORDESTE:       [6, 2, 8, 5, 3, 12, 12, 3, 7, 5, 0, 0],
            "CENTRO OESTE": [8, 10, 5, 4, 13, 9, 11, 8, 8, 6, 0, 0]
        }
    },
    rodando_fora_horario: {
        title: "Rodando Fora de Horário",
        desc: "Utilização do veículo fora da janela de operação autorizada ou jornadas estendidas.",
        icon: "clock",
        data: {
            SUL:            [27, 34, 23, 29, 23, 18, 21, 16, 24, 58, 0, 0],
            NORDESTE:       [9, 9, 15, 8, 16, 14, 15, 5, 17, 26, 0, 0],
            "CENTRO OESTE": [20, 22, 23, 7, 15, 11, 5, 17, 16, 27, 0, 0]
        }
    },
    painel_nordeste: {
        title: "Painel Detalhado de Ocorrências — Nordeste",
        desc: "Análise consolidada por supervisores, rotas e principais justificativas operacionais.",
        icon: "bar-chart-2",
        data: { SUL: Array(12).fill(0), NORDESTE: [210, 220, 260, 240, 270, 250, 280, 240, 260, 267, 0, 0], "CENTRO OESTE": Array(12).fill(0) }
    },
    painel_centro_oeste: {
        title: "Painel Detalhado de Ocorrências — Centro Oeste",
        desc: "Análise consolidada por supervisores, rotas críticas e principais justificativas na regional Centro Oeste.",
        icon: "bar-chart-3",
        data: { SUL: Array(12).fill(0), NORDESTE: Array(12).fill(0), "CENTRO OESTE": [90, 105, 115, 100, 120, 110, 125, 110, 112, 112, 0, 0] }
    },
    painel_sul: {
        title: "Painel Detalhado de Ocorrências — Sul",
        desc: "Análise consolidada por supervisores, rotas críticas e principais justificativas na regional Sul.",
        icon: "bar-chart-4",
        data: { SUL: [102, 115, 120, 108, 125, 112, 128, 110, 118, 120, 0, 0], NORDESTE: Array(12).fill(0), "CENTRO OESTE": Array(12).fill(0) }
    },
    painel_logcare: {
        title: "Painel LogCare — Ocorrências Operacionais de Viagem",
        desc: "Monitoramento de atrasos, início antecipado e rotas não sincronizadas no LogCare.",
        icon: "clock-5",
        data: { SUL: Array(12).fill(0), NORDESTE: [410, 430, 490, 460, 520, 480, 530, 470, 490, 484, 0, 0], "CENTRO OESTE": Array(12).fill(0) }
    }
};

function generateConsolidatedData() {
    const consolidated = {
        title: "Visão Geral Consolidada",
        desc: "Soma executiva de todas as infrações e comportamentos de risco monitorados no sistema.",
        data: { SUL: Array(12).fill(0), NORDESTE: Array(12).fill(0), "CENTRO OESTE": Array(12).fill(0) }
    };
    Object.keys(RAW_DATABASE).forEach(catKey => {
        if (catKey.startsWith('ranking_') || catKey === 'evolucao_multas' || catKey.startsWith('painel_')) return;
        const cat = RAW_DATABASE[catKey];
        ['SUL', 'NORDESTE', 'CENTRO OESTE'].forEach(reg => {
            for (let i = 0; i < 12; i++) {
                consolidated.data[reg][i] += cat.data[reg][i];
            }
        });
    });
    return consolidated;
}

const DATABASE = {
    visao_geral: generateConsolidatedData(),
    ...RAW_DATABASE
};

const REGION_COLORS = {
    SUL: { stroke: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    NORDESTE: { stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    "CENTRO OESTE": { stroke: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
};

let currentTab = 'visao_geral';
let evolutionChartInstance = null;
let distributionChartInstance = null;
let multasCountChartInstance = null;
let multasValueChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosDoGoogleSheets().then(() => {
        updateSidebarBadges();
        updateDashboard();
    });
    if (window.lucide) {
        lucide.createIcons();
    }
});

function updateSidebarBadges() {
    Object.keys(DATABASE).forEach(key => {
        const badge = document.getElementById(`badge-${key}`);
        if (badge) {
            let catTotal = 0;
            if (key === 'evolucao_multas') {
                const total2024 = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
                const total2025 = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
                const total2026 = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
                catTotal = total2024 + total2025 + total2026;
            } else if (key === 'painel_nordeste') {
                catTotal = NORDESTE_PANEL_DATA.total;
            } else if (key === 'painel_centro_oeste') {
                catTotal = CENTRO_OESTE_PANEL_DATA.total;
            } else if (key === 'painel_sul') {
                catTotal = SUL_PANEL_DATA.total;
            } else if (key === 'painel_logcare') {
                catTotal = LOGCARE_PANEL_DATA.reduce((acc, item) => acc + item.count, 0);
            } else if (DATABASE[key] && DATABASE[key].data) {
                ['SUL', 'NORDESTE', 'CENTRO OESTE'].forEach(reg => {
                    if (DATABASE[key].data[reg]) {
                        catTotal += DATABASE[key].data[reg].reduce((a, b) => a + b, 0);
                    }
                });
            }
            badge.innerText = catTotal.toLocaleString('pt-BR');
        }
    });
}

function switchTab(tabKey) {
    currentTab = tabKey;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600/20', 'text-blue-400', 'border', 'border-blue-500/30', 'font-semibold');
        btn.classList.add('text-slate-400', 'hover:text-slate-200', 'hover:bg-slate-800/60', 'font-medium');
    });
    const activeBtn = document.getElementById(`nav-${tabKey}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-400', 'hover:text-slate-200', 'hover:bg-slate-800/60', 'font-medium');
        activeBtn.classList.add('bg-blue-600/20', 'text-blue-400', 'border', 'border-blue-500/30', 'font-semibold');
    }
    updateDashboard();
}

function handleFilterChange() {
    updateDashboard();
}

function getActiveMonthIndices() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}

function updateDashboard() {
    const activeGroup = DATABASE[currentTab];
    const selectEl = document.getElementById('regionSelect');
    const selectedRegion = selectEl ? selectEl.value : 'TODAS';
    const monthIndices = getActiveMonthIndices();
    const activeMonths = monthIndices.map(i => MONTHS[i]);


    const regionFilterContainer = document.getElementById('regionFilterContainer');
    if (regionFilterContainer) {
        const allowedTabsForRegion = ['visao_geral', 'multiplos_excesso', 'excesso_velocidade', 'rodando_fora_horario'];
        if (allowedTabsForRegion.includes(currentTab)) {
            regionFilterContainer.classList.remove('hidden');
            regionFilterContainer.classList.add('flex');
        } else {
            regionFilterContainer.classList.add('hidden');
            regionFilterContainer.classList.remove('flex');
        }
    }


    const yearFilterContainer = document.getElementById('multasYearFilterContainer');
    if (yearFilterContainer) {
        if (currentTab === 'evolucao_multas') {
            yearFilterContainer.classList.remove('hidden');
            yearFilterContainer.classList.add('flex');
        } else {
            yearFilterContainer.classList.add('hidden');
            yearFilterContainer.classList.remove('flex');
        }
    }

    const titleEl = document.getElementById('currentTitle');
    const descEl = document.getElementById('currentDesc');

    if (currentTab === 'evolucao_multas') {
        if (titleEl) titleEl.innerText = "Evolução e Controle de Multas (Google Sheets)";
        if (descEl) descEl.innerText = "Comparativo financeiro e quantitativo das infrações autuadas por gravidade e evolução mensal.";
    } else {
        if (titleEl && activeGroup) titleEl.innerText = activeGroup.title;
        if (descEl && activeGroup) descEl.innerText = activeGroup.desc;
    }

    const stdCharts = document.getElementById('standardChartsContainer');
    const nordestePanel = document.getElementById('nordestePanelContainer');
    const centroOestePanel = document.getElementById('centroOestePanelContainer');
    const sulPanel = document.getElementById('sulPanelContainer');
    const logcarePanel = document.getElementById('logcarePanelContainer');
    const evolucaoMultasPanel = document.getElementById('evolucaoMultasContainer');
    const tableContainer = document.getElementById('tableContainer');

    const isNordesteTab = currentTab === 'painel_nordeste';
    const isCentroOesteTab = currentTab === 'painel_centro_oeste';
    const isSulTab = currentTab === 'painel_sul';
    const isLogcareTab = currentTab === 'painel_logcare';
    const isEvolucaoMultasTab = currentTab === 'evolucao_multas';

    if (stdCharts) stdCharts.classList.add('hidden');
    if (nordestePanel) nordestePanel.classList.add('hidden');
    if (centroOestePanel) centroOestePanel.classList.add('hidden');
    if (sulPanel) sulPanel.classList.add('hidden');
    if (logcarePanel) logcarePanel.classList.add('hidden');
    if (evolucaoMultasPanel) evolucaoMultasPanel.classList.add('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');

    if (isNordesteTab) {
        if (nordestePanel) nordestePanel.classList.remove('hidden');
        renderNordestePanel();
    } else if (isCentroOesteTab) {
        if (centroOestePanel) centroOestePanel.classList.remove('hidden');
        renderCentroOestePanel();
    } else if (isSulTab) {
        if (sulPanel) sulPanel.classList.remove('hidden');
        renderSulPanel();
    } else if (isLogcareTab) {
        if (logcarePanel) logcarePanel.classList.remove('hidden');
        renderLogcarePanel();
    } else if (isEvolucaoMultasTab) {
        if (evolucaoMultasPanel) evolucaoMultasPanel.classList.remove('hidden');
        renderEvolucaoMultasPanel();
    } else {
        if (stdCharts) stdCharts.classList.remove('hidden');
        if (tableContainer) tableContainer.classList.remove('hidden');
    }

    const regionKeys = selectedRegion === 'TODAS' 
        ? ['SUL', 'NORDESTE', 'CENTRO OESTE'] 
        : [selectedRegion];

    const filteredData = {};
    if (activeGroup && activeGroup.data) {
        regionKeys.forEach(reg => {
            const foundKey = Object.keys(activeGroup.data).find(k => k.trim().toUpperCase() === reg.trim().toUpperCase());
            if (foundKey) {
                filteredData[reg] = monthIndices.map(idx => activeGroup.data[foundKey][idx] || 0);
            } else {
                filteredData[reg] = Array(12).fill(0);
            }
        });
    }

    updateKPIs(filteredData, regionKeys, activeMonths);

    if (!isNordesteTab && !isCentroOesteTab && !isSulTab && !isLogcareTab && !isEvolucaoMultasTab) {
        renderEvolutionChart(activeMonths, filteredData);
        renderDistributionChart(filteredData);
        if (activeGroup && activeGroup.data) {
            renderTable(activeGroup.data, monthIndices);
        }
    }

    validarEOcultarCardsPorTela();

    if (window.lucide) {
        lucide.createIcons();
    }
}

function updateKPIs(filteredData, regionKeys, activeMonths) {
    let totalVal = 0;
    const regionTotals = {};

    if (currentTab === 'evolucao_multas') {
        const yearSelect = document.getElementById('multasYearSelect');
        const selectedYear = yearSelect ? yearSelect.value : '2024';
        if (selectedYear === '2024') {
            totalVal = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
        } else if (selectedYear === '2025') {
            totalVal = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
        } else if (selectedYear === '2026') {
            totalVal = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
        } else {
            totalVal = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0) + 
                       MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0) + 
                       MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
        }
        regionTotals["TOTAL MULTAS"] = totalVal;
    } else {
        regionKeys.forEach(reg => {
            if (filteredData && filteredData[reg]) {
                const regSum = filteredData[reg].reduce((a, b) => a + b, 0);
                regionTotals[reg] = regSum;
                totalVal += regSum;
            }
        });
    }

    const totalEl = document.getElementById('kpi-total');
    if (totalEl) totalEl.innerText = totalVal.toLocaleString('pt-BR');

    let highestRegion = '-';
    let highestVal = -1;
    Object.keys(regionTotals).forEach(reg => {
        if (regionTotals[reg] > highestVal) {
            highestVal = regionTotals[reg];
            highestRegion = reg;
        }
    });

    const highestEl = document.getElementById('kpi-highest');
    const highestValEl = document.getElementById('kpi-highest-val');
    if (highestEl) highestEl.innerText = highestRegion;
    if (highestValEl) highestValEl.innerText = `${highestVal >= 0 ? highestVal.toLocaleString('pt-BR') : 0} ev.`;
}

function renderEvolucaoMultasPanel() {
    const yearSelect = document.getElementById('multasYearSelect');
    const topGrid = document.getElementById('multasTopGrid');

    if (!yearSelect || !topGrid) return;

    const selectedYear = yearSelect.value;
    updateSidebarBadges();

    const isConsolidated = selectedYear === "TODAS";
    const yearsToRender = isConsolidated ? [2024, 2025, 2026] : [parseInt(selectedYear)];
    const yearStyles = {
        2024: { border: "border-l-purple-500", badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        2025: { border: "border-l-amber-500", badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        2026: { border: "border-l-blue-500", badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
    };

    if (isConsolidated) {
        topGrid.className = "grid grid-cols-1 md:grid-cols-3 gap-4";
        let htmlConsolidado = "";
        yearsToRender.forEach(yr => {
            const yrCount = MULTAS_DATA[yr] ? Object.values(MULTAS_DATA[yr]).reduce((a, b) => a + b.count, 0) : 0;
            const yrVal = MULTAS_DATA[yr] ? Object.values(MULTAS_DATA[yr]).reduce((a, b) => a + b.value, 0) : 0;
            htmlConsolidado += `
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 border-l-4 ${yearStyles[yr] ? yearStyles[yr].border : 'border-l-blue-500'} shadow-sm flex flex-col justify-between">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidado ${yr}</span>
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full ${yearStyles[yr] ? yearStyles[yr].badgeBg : 'bg-blue-500/20 text-blue-300'}">${yrCount} Infrações</span>
                    </div>
                    <div class="mt-3 flex items-baseline justify-between">
                        <span class="text-2xl font-extrabold text-white">R$ ${yrVal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                        <span class="text-xs text-slate-400">Total a Pagar</span>
                    </div>
                </div>
            `;
        });
        topGrid.innerHTML = htmlConsolidado;
    } else {
        topGrid.className = "grid grid-cols-1 lg:grid-cols-3 gap-4";
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

        const novoMainVal = document.getElementById('multasMainValue');
        const novoMainCount = document.getElementById('multasMainCount');
        const novoCardsContainer = document.getElementById('multasCardsContainer');

        const yr = yearsToRender[0];
        const yrData = MULTAS_DATA[yr] || [];
        const yrCount = yrData.reduce((a, b) => a + b.count, 0);
        const yrVal = yrData.reduce((a, b) => a + b.value, 0);

        if (novoMainVal) novoMainVal.innerText = `R$ ${yrVal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        if (novoMainCount) novoMainCount.innerText = `${yrCount} Infrações`;

        if (novoCardsContainer) {
            let gravidadeCardsHtml = "";
            yrData.forEach(item => {
                gravidadeCardsHtml += `
                    <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
                        <span class="text-[11px] font-bold text-slate-400 uppercase">${item.gravidade}</span>
                        <div class="my-1.5"><span class="text-lg font-extrabold text-white">${item.count} <span class="text-xs font-normal text-slate-400">ev.</span></span></div>
                        <span class="text-xs font-bold text-emerald-400">R$ ${item.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
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
    let val = 0;
    if (selectedYear === '2024') {
        val = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
    } else if (selectedYear === '2025') {
        val = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
    } else if (selectedYear === '2026') {
        val = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
    } else {
        val = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0) + 
              MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0) + 
              MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
    }

    const headerCountEl = document.getElementById('multasHeaderCount');
    if (headerCountEl) {
        headerCountEl.innerText = `${val.toLocaleString('pt-BR')} Infrações`;
    }
}

function renderSideBySideMultasCharts(selectedYear) {
    const countCanvas = document.getElementById('multasCountChart');
    const valueCanvas = document.getElementById('multasValueChart');
    if (!countCanvas || !valueCanvas) return;

    let labels = MONTHS, countDatasets = [], valueDatasets = [];
    if (selectedYear === '2024') {
        countDatasets = [{ label: '2024', data: MULTAS_MONTHLY_2024.map(i => i.count), backgroundColor: 'rgba(168, 85, 247, 0.85)', borderRadius: 6 }];
        valueDatasets = [{ label: '2024', data: MULTAS_MONTHLY_2024.map(i => i.value), backgroundColor: 'rgba(16, 185, 129, 0.85)', borderRadius: 6 }];
    } else if (selectedYear === '2025') {
        countDatasets = [{ label: '2025', data: MULTAS_MONTHLY_2025.map(i => i.count), backgroundColor: 'rgba(245, 158, 11, 0.85)', borderRadius: 6 }];
        valueDatasets = [{ label: '2025', data: MULTAS_MONTHLY_2025.map(i => i.value), backgroundColor: 'rgba(16, 185, 129, 0.85)', borderRadius: 6 }];
    } else if (selectedYear === '2026') {
        countDatasets = [{ label: '2026', data: MULTAS_MONTHLY_2026.map(i => i.count), backgroundColor: 'rgba(59, 130, 246, 0.85)', borderRadius: 6 }];
        valueDatasets = [{ label: '2026', data: MULTAS_MONTHLY_2026.map(i => i.value), backgroundColor: 'rgba(16, 185, 129, 0.85)', borderRadius: 6 }];
    } else {
        countDatasets = [
            { label: '2024', data: MULTAS_MONTHLY_2024.map(i => i.count), backgroundColor: 'rgba(168, 85, 247, 0.85)' },
            { label: '2025', data: MULTAS_MONTHLY_2025.map(i => i.count), backgroundColor: 'rgba(245, 158, 11, 0.85)' },
            { label: '2026', data: MULTAS_MONTHLY_2026.map(i => i.count), backgroundColor: 'rgba(59, 130, 246, 0.85)' }
        ];
        valueDatasets = [
            { label: '2024', data: MULTAS_MONTHLY_2024.map(i => i.value), backgroundColor: 'rgba(126, 34, 206, 0.85)' },
            { label: '2025', data: MULTAS_MONTHLY_2025.map(i => i.value), backgroundColor: 'rgba(217, 119, 6, 0.85)' },
            { label: '2026', data: MULTAS_MONTHLY_2026.map(i => i.value), backgroundColor: 'rgba(16, 185, 129, 0.85)' }
        ];
    }

    if (multasCountChartInstance) multasCountChartInstance.destroy();
    multasCountChartInstance = new Chart(countCanvas.getContext('2d'), {
        type: 'bar',
        data: { labels, datasets: countDatasets },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });

    if (multasValueChartInstance) multasValueChartInstance.destroy();
    multasValueChartInstance = new Chart(valueCanvas.getContext('2d'), {
        type: 'bar',
        data: { labels, datasets: valueDatasets },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });
}

function renderSulPanel() {
    const supContainer = document.getElementById('sul-supervisors-list');
    const routeContainer = document.getElementById('sul-routes-list');
    const justContainer = document.getElementById('sul-justifications-list');
    if (!supContainer) return;

    supContainer.innerHTML = '';
    const maxSup = SUL_PANEL_DATA.supervisors[0].count;
    SUL_PANEL_DATA.supervisors.forEach(sup => {
        const pct = Math.round((sup.count / maxSup) * 100);
        supContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${sup.name}</span>
                    <span class="text-blue-400 font-extrabold">${sup.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    routeContainer.innerHTML = '';
    const maxRoute = SUL_PANEL_DATA.routes[0].count;
    SUL_PANEL_DATA.routes.forEach(rt => {
        const pct = Math.round((rt.count / maxRoute) * 100);
        routeContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${rt.code}</span>
                    <span class="text-blue-400 font-extrabold">${rt.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    justContainer.innerHTML = '';
    const maxJust = SUL_PANEL_DATA.justifications[0].count;
    SUL_PANEL_DATA.justifications.forEach(j => {
        const pct = Math.round((j.count / maxJust) * 100);
        justContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-300">${j.reason}</span>
                    <span class="text-blue-400 font-extrabold">${j.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function renderCentroOestePanel() {
    const supContainer = document.getElementById('co-supervisors-list');
    const routeContainer = document.getElementById('co-routes-list');
    const justContainer = document.getElementById('co-justifications-list');
    if (!supContainer) return;

    supContainer.innerHTML = '';
    const maxSup = CENTRO_OESTE_PANEL_DATA.supervisors[0].count;
    CENTRO_OESTE_PANEL_DATA.supervisors.forEach(sup => {
        const pct = Math.round((sup.count / maxSup) * 100);
        supContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${sup.name}</span>
                    <span class="text-emerald-400 font-extrabold">${sup.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    routeContainer.innerHTML = '';
    const maxRoute = CENTRO_OESTE_PANEL_DATA.routes[0].count;
    CENTRO_OESTE_PANEL_DATA.routes.forEach(rt => {
        const pct = Math.round((rt.count / maxRoute) * 100);
        routeContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${rt.code}</span>
                    <span class="text-emerald-400 font-extrabold">${rt.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    justContainer.innerHTML = '';
    const maxJust = CENTRO_OESTE_PANEL_DATA.justifications[0].count;
    CENTRO_OESTE_PANEL_DATA.justifications.forEach(j => {
        const pct = Math.round((j.count / maxJust) * 100);
        justContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-300">${j.reason}</span>
                    <span class="text-emerald-400 font-extrabold">${j.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function renderNordestePanel() {
    const supContainer = document.getElementById('supervisors-list');
    const routeContainer = document.getElementById('routes-list');
    const justContainer = document.getElementById('justifications-list');
    if (!supContainer) return;

    supContainer.innerHTML = '';
    const maxSup = NORDESTE_PANEL_DATA.supervisors[0].count;
    NORDESTE_PANEL_DATA.supervisors.forEach(sup => {
        const pct = Math.round((sup.count / maxSup) * 100);
        supContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${sup.name}</span>
                    <span class="text-amber-400 font-extrabold">${sup.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    routeContainer.innerHTML = '';
    const maxRoute = NORDESTE_PANEL_DATA.routes[0].count;
    NORDESTE_PANEL_DATA.routes.forEach(rt => {
        const pct = Math.round((rt.count / maxRoute) * 100);
        routeContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-200">${rt.code}</span>
                    <span class="text-amber-400 font-extrabold">${rt.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    justContainer.innerHTML = '';
    const maxJust = NORDESTE_PANEL_DATA.justifications[0].count;
    NORDESTE_PANEL_DATA.justifications.forEach(j => {
        const pct = Math.round((j.count / maxJust) * 100);
        justContainer.innerHTML += `
            <div class="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-300">${j.reason}</span>
                    <span class="text-amber-400 font-extrabold">${j.count}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                    <div class="bg-gradient-to-r from-amber-500 to-yellow-500 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function renderLogcarePanel() {
    const container = document.getElementById('logcare-list');
    const totalBadge = document.getElementById('logcare-total-badge');
    if (!container) return;

    container.innerHTML = '';
    const totalSum = LOGCARE_PANEL_DATA.reduce((acc, item) => acc + item.count, 0);
    if (totalBadge) totalBadge.innerText = `Total: ${totalSum.toLocaleString('pt-BR')}`;

    const maxVal = LOGCARE_PANEL_DATA[0].count;
    LOGCARE_PANEL_DATA.forEach(item => {
        const pct = Math.round((item.count / maxVal) * 100);
        container.innerHTML += `
            <div class="space-y-1.5 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/90">
                <div class="flex justify-between items-center text-xs sm:text-sm">
                    <span class="font-bold tracking-wide text-slate-200">${item.label}</span>
                    <span class="text-emerald-400 font-extrabold text-sm sm:text-base bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">${item.count.toLocaleString('pt-BR')}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function renderEvolutionChart(labels, filteredData) {
    const canvas = document.getElementById('evolutionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const datasets = Object.keys(filteredData).map(reg => {
        const color = REGION_COLORS[reg] || { stroke: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
        return {
            label: reg,
            data: filteredData[reg],
            borderColor: color.stroke,
            backgroundColor: color.bg,
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: color.stroke
        };
    });

    if (evolutionChartInstance) evolutionChartInstance.destroy();
    evolutionChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: 600 } } }
            },
            scales: {
                x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' }, beginAtZero: true }
            }
        }
    });
}

function renderDistributionChart(filteredData) {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const labels = Object.keys(filteredData);
    const totals = labels.map(reg => filteredData[reg].reduce((a, b) => a + b, 0));
    const backgroundColors = labels.map(reg => (REGION_COLORS[reg] ? REGION_COLORS[reg].stroke : '#3b82f6'));

    if (distributionChartInstance) distributionChartInstance.destroy();
    distributionChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{ data: totals, backgroundColor: backgroundColors, borderWidth: 3, borderColor: '#0f172a' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: 600 }, padding: 15 } }
            },
            cutout: '68%'
        }
    });
}

function renderTable(fullCategoryData, monthIndices) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const selectEl = document.getElementById('regionSelect');
    const selectedRegion = selectEl ? selectEl.value : 'TODAS';
    const regionsToDisplay = selectedRegion === 'TODAS' ? ['SUL', 'NORDESTE', 'CENTRO OESTE'] : [selectedRegion];

    regionsToDisplay.forEach(reg => {
        const foundKey = Object.keys(fullCategoryData).find(k => k.trim().toUpperCase() === reg.trim().toUpperCase());
        const fullMonthArray = foundKey ? fullCategoryData[foundKey] : null;
        if (!fullMonthArray) return;

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/50 transition-colors";

        let badgeClass = "bg-blue-500/20 text-blue-400 border-blue-500/30";
        if (reg === 'NORDESTE') badgeClass = "bg-amber-500/20 text-amber-400 border-amber-500/30";
        if (reg === 'CENTRO OESTE') badgeClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

        let htmlContent = `<td class="py-3.5 px-4 whitespace-nowrap"><span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${badgeClass}">${reg}</span></td>`;

        let rowSum = 0;
        for (let i = 0; i < 12; i++) {
            const isSelected = monthIndices.includes(i);
            const val = fullMonthArray[i] || 0;
            if (isSelected) rowSum += val;
            htmlContent += `<td class="py-3.5 px-2 text-center ${isSelected ? 'text-slate-100 font-bold' : 'text-slate-600 opacity-40'}">${val}</td>`;
        }

        htmlContent += `<td class="py-3.5 px-4 text-right font-extrabold text-white whitespace-nowrap">${rowSum.toLocaleString('pt-BR')}</td>`;
        // htmlContent += `<td class="py-3.5 px-4 text-center whitespace-nowrap"><span class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Estável</span></td>`;

        tr.innerHTML = htmlContent;
        tbody.appendChild(tr);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('w-0');
    sidebar.classList.toggle('p-0');
    sidebar.classList.toggle('opacity-0');
    sidebar.classList.toggle('overflow-hidden');
}

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(`icon-${menuId}`);
    if (!menu) return;
    menu.classList.toggle('hidden');
    if (icon) {
        icon.classList.toggle('rotate-180');
    }
}

function validarEOcultarCardsPorTela() {
    const generalKpis = document.getElementById("generalKpisContainer");
    if (generalKpis) {
        if (currentTab === "evolucao_multas") {
            generalKpis.style.display = "none";
        } else {
            generalKpis.style.display = "grid";
        }
    }

    const topGrid = document.getElementById("multasTopGrid");
    if (topGrid) {
        if (currentTab === "evolucao_multas") {
            topGrid.style.display = "grid";
        } else {
            topGrid.style.display = "grid";
        }
    }
}