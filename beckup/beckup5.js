const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Dados mensais de 2024
const MULTAS_MONTHLY_2024 = [
    { month: "JAN/24", count: 32, value: 7328.12 },
    { month: "FEV/24", count: 15, value: 5280.02 },
    { month: "MAR/24", count: 19, value: 2857.25 },
    { month: "ABR/24", count: 30, value: 10216.51 },
    { month: "MAI/24", count: 26, value: 10879.00 },
    { month: "JUN/24", count: 12, value: 3958.72 },
    { month: "JUL/24", count: 20, value: 5604.20 },
    { month: "AGO/24", count: 19, value: 3026.77 },
    { month: "SET/24", count: 8, value: 1341.24 },
    { month: "OUT/24", count: 13, value: 5664.06 },
    { month: "NOV/24", count: 13, value: 2589.73 },
    { month: "DEZ/24", count: 18, value: 4298.87 }
];

// Dados mensais de 2025
const MULTAS_MONTHLY_2025 = [
    { month: "JAN/25", count: 0, value: 0.00 },
    { month: "FEV/25", count: 0, value: 0.00 },
    { month: "MAR/25", count: 5, value: 879.18 },
    { month: "ABR/25", count: 3, value: 717.10 },
    { month: "MAI/25", count: 6, value: 1107.58 },
    { month: "JUN/25", count: 5, value: 2216.37 },
    { month: "JUL/25", count: 17, value: 2962.93 },
    { month: "AGO/25", count: 14, value: 4855.13 },
    { month: "SET/25", count: 32, value: 7941.11 },
    { month: "OUT/25", count: 10, value: 1693.29 },
    { month: "NOV/25", count: 39, value: 8817.30 },
    { month: "DEZ/25", count: 26, value: 5464.12 }
];

// Dados mensais de 2026
const MULTAS_MONTHLY_2026 = [
    { month: "JAN/26", count: 9, value: 2750.02 },
    { month: "FEV/26", count: 27, value: 8406.25 }, 
    { month: "MAR/26", count: 38, value: 10602.49 },
    { month: "ABR/26", count: 34, value: 6167.76 },
    { month: "MAI/26", count: 12, value: 3565.75 },
    { month: "JUN/26", count: 43, value: 10774.87 },
    { month: "JUL/26", count: 17, value: 2431.22 },
    { month: "AGO/26", count: 21, value: 5212.49 },
    { month: "SET/26", count: 21, value: 4625.55 },
    { month: "OUT/26", count: 31, value: 6732.61 },
    { month: "NOV/26", count: 0, value: 0.00 },
    { month: "DEZ/26", count: 0, value: 0.00 }
];

const MULTAS_DATA = {
    2024: [
        { gravidade: "Média", count: 129, value: 16927.81 },
        { gravidade: "Leve", count: 1, value: 90.78 },
        { gravidade: "Grave", count: 46, value: 8990.34 },
        { gravidade: "Gravíssima", count: 49, value: 37035.56 }
    ],
    2025: [
        { gravidade: "Média", count: 105, value: 16047.63 },
        { gravidade: "Leve", count: 3, value: 194.62 },
        { gravidade: "Grave", count: 35, value: 7792.66 },
        { gravidade: "Gravíssima", count: 14, value: 12619.20 }
    ],
    2026: [
        { gravidade: "Média", count: 188, value: 26763.51 },
        { gravidade: "Leve", count: 1, value: 88.38 },
        { gravidade: "Grave", count: 41, value: 11819.94 },
        { gravidade: "Gravíssima", count: 23, value: 22597.18 }
    ]
};


const DRIVERS_EXCESSO_DATA = {
    "CENTRO OESTE": [
        { name: "Allan Barbosa", count: 39 },
        { name: "Luiz Felipe", count: 17 },
        { name: "Thatielly", count: 16 },
        { name: "Bruno Souza", count: 10 },
        { name: "Helder Silva", count: 9 },
        { name: "Rafael", count: 6 }
    ],
    "NORDESTE": [
        { name: "Degrimaldo", count: 43 },
        { name: "Fabio Oliveira", count: 15 },               
        { name: "Oseias", count: 7 },
        { name: "André Lopes", count: 4 },              
        { name: "Pedro Serra", count: 1 },
    ],
    "SUL": [
        { name: "Eduardo Boza", count: 44 },
        { name: "Cristian", count: 43 },
        { name: "Fernando", count: 27 },
        { name: "Pamela Coutinho", count: 12 },
        { name: "Deize", count: 10 },
        { name: "Phelipe Vieira", count: 10 },
        { name: "Michel", count: 8 },
        { name: "Mario Lopez", count: 5 },
        { name: "Marcelo Duarte", count: 4 },
    ]
};

const DRIVERS_FORA_HORARIO_DATA = {
    "CENTRO OESTE": [
        { name: "Thatielly", count: 58 },
        { name: "Bruno Souza", count: 24 },
        { name: "Allan", count: 15 },
        { name: "Luiz", count: 13 },                
        { name: "Rafael", count: 7 },
        { name: "Helder Silva", count: 4 }
    ],
    "NORDESTE": [
        { name: "André Lopez", count: 39 },               
        { name: "Degrimaldo", count: 32 },
        { name: "Ítalo Marques", count: 21 },
        { name: "Oseias", count: 18 },
        { name: "Ayda", count: 7 }
    ],
    "SUL": [
        { name: "Cristhian", count: 78 },
        { name: "Marcelo Duarte", count: 34 },
        { name: "Eduardo Boza", count: 29 },
        { name: "Fernando", count: 28 },
        { name: "Pamela Coutinho", count: 20 },
        { name: "Deize", count: 12 },
        { name: "Phelipe Vieira", count: 10 },
        { name: "Mario Lopez", count: 1 }
    ]
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
        { name: "Ayda Carielo", count: 138 },
        { name: "Thomas Alisson", count: 116 },
        { name: "Lenilson", count: 111 },
        { name: "Oseias", count: 81 }
    ],
    routes: [
        { code: "FSA03", count: 43 },
        { code: "FSA01B", count: 33 },
        { code: "LSC01", count: 32 },
        { code: "PE011", count: 31 },
        { code: "AEROMAB", count: 29 },
        { code: "GNM01A", count: 29 },
        { code: "RN005", count: 28 },
        { code: "AEROMCP", count: 28 },
        { code: "TER01A", count: 28 },
        { code: "VDC01", count: 27 }
    ],
    justifications: [
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 399},
        { reason: "MOTORISTA ORIENTADO", count: 375 },
        { reason: "SUPERVISOR COMUNICADO / ROTA INICIADA", count: 363 },
        { reason: "REALIZAÇÃO DE CHECKLIST", count: 239 },
        { reason: "SEM APARELHO CELULAR", count: 168 }
    ]
};

const CENTRO_OESTE_PANEL_DATA = {
    total: 1099,
    supervisors: [
        { name: "Thatielly", count: 316 },
        { name: "Allan Barbosa", count: 214 },
        { name: "Bruno Souza", count: 208 },
        { name: "Helder Silva", count: 74 },
        { name: "Rafael", count: 57 },
        { name: "Luiz Felipe", count: 46 }
    ],
    routes: [
        { code: "GO012", count: 47 },
        { code: "GOBSB2", count: 39 },
        { code: "DF003", count: 35 },
        { code: "GO014", count: 34 },
        { code: "GOBSB1", count: 30 }
    ],
    justifications: [
        { reason: "MOTORISTA ORIENTADO", count: 689 },
        { reason: "INSTABILIDADE NO SISTEMA DO LOGCARE", count: 67 },
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 55 },
        { reason: "TRÂNSITO CONGESTIONADO", count: 45 }
    ]
};

const SUL_PANEL_DATA = {
    total: 1158,
    supervisors: [
        { name: "Cristian", count: 242 },
        { name: "Michel", count: 189 },
        { name: "Pamela Coutinho", count: 144 },
        { name: "Eduardo Boza", count: 142 },
        { name: "Marcelo Duarte", count: 59 },
        { name: "Phelipe Vieira", count: 58 }
    ],
    routes: [
        { code: "PRO4", count: 61 },
        { code: "PRO5", count: 50 },
        { code: "JOI05", count: 37 },
        { code: "JOI09", count: 34 },
        { code: "PRO3.1", count: 27 }
    ],
    justifications: [
        { reason: "MOTORISTA ORIENTADO", count: 512 },
        { reason: "SUPERVISOR COMUNICADO / ROTA INICIADA", count: 215 },
        { reason: "CONEXÃO DO CELULAR COM A INTERNET", count: 148 },
        { reason: "REALIZAÇÃO DE CHECKLIST", count: 96 }
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
            SUL:            [5, 2, 4, 1, 4, 0, 2, 0, 4, 0],
            NORDESTE:       [1, 0, 2, 1, 0, 0, 2, 0, 1, 0],
            "CENTRO OESTE": [2, 1, 0, 0, 1, 1, 4, 2, 3, 1]
        }
    },
    excesso_velocidade: {
        title: "Excessos de Velocidade",
        desc: "Eventos individuais de transposição dos limites de velocidade configurados na telemetria.",
        icon: "gauge",
        data: {
            SUL:            [15, 13, 23, 16, 9, 17, 24, 13, 10, 1],
            NORDESTE:       [6, 2, 8, 5, 3, 12, 12, 3, 7, 5],
            "CENTRO OESTE": [8, 10, 5, 4, 13, 9, 11, 8, 8, 6]
        }
    },
    rodando_fora_horario: {
        title: "Rodando Fora de Horário",
        desc: "Utilização do veículo fora da janela de operação autorizada ou jornadas estendidas.",
        icon: "clock",
        data: {
            SUL:            [27, 34, 23, 29, 23, 18, 21, 16, 24, 58],
            NORDESTE:       [9, 9, 15, 8, 16, 14, 15, 5, 17, 26],
            "CENTRO OESTE": [20, 22, 23, 7, 15, 11, 5, 17, 16, 27]
        }
    },
    ranking_condutores: {
        title: "Ranking de Excessos de Velocidade por Condutor",
        desc: "Detalhamento individual dos condutores com maior número de excessos de velocidade registrados.",
        icon: "user-x",
        data: {
            SUL:            [16, 15, 20, 18, 12, 18, 24, 15, 14, 11],
            NORDESTE:       [8, 4, 10, 6, 5, 10, 12, 5, 7, 5],
            "CENTRO OESTE": [10, 11, 8, 6, 14, 11, 14, 10, 8, 5]
        }
    },
    ranking_fora_horario: {
        title: "Ranking Rodando Fora do Horário por Condutor",
        desc: "Detalhamento individual dos condutores com maior frequência de uso do veículo fora do expediente.",
        icon: "clock-4",
        data: {
            SUL:            [27, 34, 23, 29, 23, 18, 21, 16, 24, 58],
            NORDESTE:       [9, 9, 15, 8, 16, 14, 15, 5, 17, 26],
            "CENTRO OESTE": [20, 22, 23, 7, 15, 11, 5, 17, 16, 24]
        }
    },
   
    painel_nordeste: {
        title: "Painel Detalhado de Ocorrências — Nordeste",
        desc: "Análise consolidada por supervisores, rotas e principais justificativas operacionais.",
        icon: "bar-chart-2",
        data: { SUL: [0,0,0,0,0,0,0,0,0,0], NORDESTE: [210, 220, 260, 240, 270, 250, 280, 240, 260, 267], "CENTRO OESTE": [0,0,0,0,0,0,0,0,0,0] }
    },
    painel_centro_oeste: {
        title: "Painel Detalhado de Ocorrências — Centro Oeste",
        desc: "Análise consolidada por supervisores, rotas críticas e principais justificativas na regional Centro Oeste.",
        icon: "bar-chart-3",
        data: { SUL: [0,0,0,0,0,0,0,0,0,0], NORDESTE: [0,0,0,0,0,0,0,0,0,0], "CENTRO OESTE": [90, 105, 115, 100, 120, 110, 125, 110, 112, 112] }
    },
    painel_sul: {
        title: "Painel Detalhado de Ocorrências — Sul",
        desc: "Análise consolidada por supervisores, rotas críticas e principais justificativas na regional Sul.",
        icon: "bar-chart-4",
        data: { SUL: [102, 115, 120, 108, 125, 112, 128, 110, 118, 120], NORDESTE: [0,0,0,0,0,0,0,0,0,0], "CENTRO OESTE": [0,0,0,0,0,0,0,0,0,0] }
    },
    painel_logcare: {
        title: "Painel LogCare — Ocorrências Operacionais de Viagem",
        desc: "Monitoramento de atrasos, início antecipado e rotas não sincronizadas no LogCare.",
        icon: "clock-5",
        data: { SUL: [0,0,0,0,0,0,0,0,0,0], NORDESTE: [410, 430, 490, 460, 520, 480, 530, 470, 490, 484], "CENTRO OESTE": [0,0,0,0,0,0,0,0,0,0] }
    }
};

function generateConsolidatedData() {
    const consolidated = {
        title: "Visão Geral Consolidada",
        desc: "Soma executiva de todas as infrações e comportamentos de risco monitorados no sistema.",
        data: { SUL: [0,0,0,0,0,0,0,0,0,0], NORDESTE: [0,0,0,0,0,0,0,0,0,0], "CENTRO OESTE": [0,0,0,0,0,0,0,0,0,0] }
    };

    Object.keys(RAW_DATABASE).forEach(catKey => {
        if (catKey.startsWith('ranking_') || catKey === 'evolucao_multas' || catKey.startsWith('painel_')) return;
        const cat = RAW_DATABASE[catKey];
        ['SUL', 'NORDESTE', 'CENTRO OESTE'].forEach(reg => {
            for (let i = 0; i < 10; i++) {
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
    updateSidebarBadges();
    updateDashboard();
    if (window.lucide) {
        lucide.createIcons();
    }
});

function updateSidebarBadges() {
    Object.keys(DATABASE).forEach(key => {
        const badge = document.getElementById(`badge-${key}`);
        if (badge) {
            let catTotal = 0;
            if (key === 'ranking_fora_horario') {
                Object.keys(DRIVERS_FORA_HORARIO_DATA).forEach(reg => {
                    catTotal += DRIVERS_FORA_HORARIO_DATA[reg].reduce((acc, curr) => acc + curr.count, 0);
                });
            } else if (key === 'evolucao_multas') {
                // Aqui você define se quer fixar o total geral (635) ou deixar dinâmico. 
                // Como vimos na sua referência, vamos fixar o total geral consolidado de 635:
                const total2024 = MULTAS_MONTHLY_2024.reduce((acc, item) => acc + item.count, 0);
                const total2025 = MULTAS_MONTHLY_2025.reduce((acc, item) => acc + item.count, 0);
                const total2026 = MULTAS_MONTHLY_2026.reduce((acc, item) => acc + item.count, 0);
                catTotal = total2024 + total2025 + total2026; // Total = 635
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
            // Garante a renderização do número dentro do span do aside
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
    const selectEl = document.getElementById('regionSelect');
    if (!selectEl) return;
    const selectedRegion = selectEl.value;

    if (currentTab === 'painel_nordeste' || currentTab === 'painel_centro_oeste' || currentTab === 'painel_sul') {
        if (selectedRegion === 'NORDESTE') switchTab('painel_nordeste');
        if (selectedRegion === 'CENTRO OESTE') switchTab('painel_centro_oeste');
        if (selectedRegion === 'SUL') switchTab('painel_sul');
    } else {
        updateDashboard();
    }
}

function getActiveMonthIndices() {
    const periodSelect = document.getElementById('periodSelect');
    const period = periodSelect ? periodSelect.value : '2026-YTD';
    if (period === '2026-Q3') return [6, 7, 8];
    if (period === '2026-Q2') return [3, 4, 5];
    if (period === '2026-Q1') return [0, 1, 2];
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function updateDashboard() {
    const activeGroup = DATABASE[currentTab];
    const selectEl = document.getElementById('regionSelect');
    const selectedRegion = selectEl ? selectEl.value : 'TODAS';
    const monthIndices = getActiveMonthIndices();
    const activeMonths = monthIndices.map(i => MONTHS[i]);

    // 1. Controle do Seletor de Ano Base (Aparece APENAS na aba de Multas)
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

    // 2. Controle do Seletor de Regional (Aparece na Visão Geral e nos 3 menus de ocorrências)
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

    const periodContainer = document.getElementById('periodSelect')?.closest('.flex');
    if (periodContainer) {
        const isRankingTab = currentTab === 'ranking_condutores' || currentTab === 'ranking_fora_horario';
        const isSpecialTab = currentTab.startsWith('painel_') || currentTab === 'evolucao_multas';

        if (isRankingTab || isSpecialTab) {
            periodContainer.classList.add('hidden');
        } else {
            periodContainer.classList.remove('hidden');
        }
    }

    const titleEl = document.getElementById('currentTitle');
    const descEl = document.getElementById('currentDesc');

    // Correção do Título e Descrição para a aba de Multas vs Demais abas
    if (currentTab === 'evolucao_multas') {
        if (titleEl) titleEl.innerText = "Evolução e Controle de Multas (2024 - 2026)";
        if (descEl) descEl.innerText = "Comparativo financeiro e quantitativo das infrações autuadas por gravidade e evolução mensal.";
    } else {
        if (titleEl && activeGroup) titleEl.innerText = activeGroup.title;
        if (descEl && activeGroup) descEl.innerText = activeGroup.desc;
    }

    const stdCharts = document.getElementById('standardChartsContainer');
    const driversRank = document.getElementById('driversRankingContainer');
    const nordestePanel = document.getElementById('nordestePanelContainer');
    const centroOestePanel = document.getElementById('centroOestePanelContainer');
    const sulPanel = document.getElementById('sulPanelContainer');
    const logcarePanel = document.getElementById('logcarePanelContainer');
    const evolucaoMultasPanel = document.getElementById('evolucaoMultasContainer');
    const tableContainer = document.getElementById('tableContainer');

    const isRankingTab = currentTab === 'ranking_condutores' || currentTab === 'ranking_fora_horario';
    const isNordesteTab = currentTab === 'painel_nordeste';
    const isCentroOesteTab = currentTab === 'painel_centro_oeste';
    const isSulTab = currentTab === 'painel_sul';
    const isLogcareTab = currentTab === 'painel_logcare';
    const isEvolucaoMultasTab = currentTab === 'evolucao_multas';

    // Esconde todos os blocos por padrão
    if (stdCharts) stdCharts.classList.add('hidden');
    if (driversRank) driversRank.classList.add('hidden');
    if (nordestePanel) nordestePanel.classList.add('hidden');
    if (centroOestePanel) centroOestePanel.classList.add('hidden');
    if (sulPanel) sulPanel.classList.add('hidden');
    if (logcarePanel) logcarePanel.classList.add('hidden');
    if (evolucaoMultasPanel) evolucaoMultasPanel.classList.add('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');

    // Exibe apenas o bloco correspondente à aba ativa
    if (isRankingTab) {
        if (driversRank) { driversRank.classList.remove('hidden'); driversRank.classList.add('grid'); }
        renderDriversRanking(selectedRegion, currentTab);
    } else if (isNordesteTab) {
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
                filteredData[reg] = monthIndices.map(idx => activeGroup.data[foundKey][idx]);
            } else {
                filteredData[reg] = [0,0,0,0,0,0,0,0,0,0];
            }
        });
    }

    updateKPIs(filteredData, regionKeys, activeMonths);

    if (!isRankingTab && !isNordesteTab && !isCentroOesteTab && !isSulTab && !isLogcareTab && !isEvolucaoMultasTab) {
        renderEvolutionChart(activeMonths, filteredData);
        renderDistributionChart(filteredData);
        if (activeGroup && activeGroup.data) {
            renderTable(activeGroup.data, monthIndices);
        }
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}
function updateKPIs(filteredData, regionKeys, activeMonths) {
    let totalVal = 0;
    const regionTotals = {};

    if (currentTab === 'evolucao_multas') {
        const yearSelect = document.getElementById('multasYearSelect');
        const selectedYear = yearSelect ? yearSelect.value : '2026';
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
    } else if (currentTab === 'painel_nordeste') {
        totalVal = NORDESTE_PANEL_DATA.total;
        regionTotals["NORDESTE"] = totalVal;
    } else if (currentTab === 'painel_centro_oeste') {
        totalVal = CENTRO_OESTE_PANEL_DATA.total;
        regionTotals["CENTRO OESTE"] = totalVal;
    } else if (currentTab === 'painel_sul') {
        totalVal = SUL_PANEL_DATA.total;
        regionTotals["SUL"] = totalVal;
    } else if (currentTab === 'painel_logcare') {
        totalVal = LOGCARE_PANEL_DATA.reduce((acc, curr) => acc + curr.count, 0);
        regionTotals["LOGCARE"] = totalVal;
    } else if (currentTab === 'ranking_condutores' || currentTab === 'ranking_fora_horario') {
        const dataSource = currentTab === 'ranking_fora_horario' ? DRIVERS_FORA_HORARIO_DATA : DRIVERS_EXCESSO_DATA;
        regionKeys.forEach(reg => {
            if (dataSource[reg]) {
                const regSum = dataSource[reg].reduce((acc, curr) => acc + curr.count, 0);
                regionTotals[reg] = regSum;
                totalVal += regSum;
            }
        });
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

    const nMonths = activeMonths.length;
    let percentChange = 0;

    if (nMonths >= 2 && currentTab !== 'ranking_fora_horario' && currentTab !== 'evolucao_multas') {
        let currentMonthTotal = 0;
        let prevMonthTotal = 0;

        regionKeys.forEach(reg => {
            if (filteredData && filteredData[reg]) {
                currentMonthTotal += filteredData[reg][nMonths - 1] || 0;
                prevMonthTotal += filteredData[reg][nMonths - 2] || 0;
            }
        });

        if (prevMonthTotal > 0) {
            percentChange = ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;
        } else if (currentMonthTotal > 0) {
            percentChange = 100;
        }
    }

    const kpiVarEl = document.getElementById('kpi-variation');
    const kpiIconBg = document.getElementById('kpi-trend-icon-bg');
    const kpiIcon = document.getElementById('kpi-trend-icon');
    const formattedChange = Math.abs(percentChange).toFixed(1) + '%';

    if (kpiVarEl && kpiIconBg && kpiIcon) {
        if (percentChange <= 0) {
            kpiVarEl.innerText = percentChange === 0 ? "0.0%" : `-${formattedChange}`;
            kpiVarEl.className = "text-3xl font-extrabold text-emerald-400";
            kpiIconBg.className = "p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20";
            kpiIcon.setAttribute('data-lucide', 'trending-down');
        } else {
            kpiVarEl.innerText = `+${formattedChange}`;
            kpiVarEl.className = "text-3xl font-extrabold text-rose-400";
            kpiIconBg.className = "p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20";
            kpiIcon.setAttribute('data-lucide', 'trending-up');
        }
    }

    const lastMonthName = activeMonths[activeMonths.length - 1];
    const prevMonthName = activeMonths[activeMonths.length - 2] || 'Anterior';
    const varSubEl = document.getElementById('kpi-variation-sub');
    if (varSubEl) varSubEl.innerText = `${lastMonthName} vs ${prevMonthName}`;

    const avgVal = nMonths > 0 ? (totalVal / nMonths).toFixed(1) : 0;
    const avgEl = document.getElementById('kpi-avg');
    if (avgEl) avgEl.innerText = avgVal;
}

// PAINEL DE EVOLUÇÃO DE MULTAS (INDIVIDUAL OU UNIDO)
function renderEvolucaoMultasPanel() {
    const cardsContainer = document.getElementById('multasCardsContainer');
    const tablesContainer = document.getElementById('multasTablesContainer');
    const yearSelect = document.getElementById('multasYearSelect');

    if (!cardsContainer || !tablesContainer) return;

    cardsContainer.innerHTML = '';
    tablesContainer.innerHTML = '';

    const selectedYear = yearSelect ? yearSelect.value : '2026';

    // Atualiza o número do menu lateral (aside) em tempo real conforme o ano selecionado
    updateSidebarBadges();

    const total2024Count = MULTAS_DATA[2024].reduce((a,b)=>a+b.count,0);
    const total2024Val = MULTAS_DATA[2024].reduce((a,b)=>a+b.value,0);
    const total2025Count = MULTAS_DATA[2025].reduce((a,b)=>a+b.count,0);
    const total2025Val = MULTAS_DATA[2025].reduce((a,b)=>a+b.value,0);
    const total2026Count = MULTAS_DATA[2026].reduce((a,b)=>a+b.count,0);
    const total2026Val = MULTAS_DATA[2026].reduce((a,b)=>a+b.value,0);

    // Renderização dos cards baseada na seleção (Individual ou Unida)
    if (selectedYear === '2024' || selectedYear === 'TODAS') {
        cardsContainer.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 border-l-4 border-l-purple-500 shadow-sm">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidado 2024</span>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">${total2024Count} Infrações</span>
                </div>
                <div class="mt-3 flex items-baseline justify-between">
                    <span class="text-2xl font-extrabold text-white">R$ ${total2024Val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <span class="text-xs text-slate-400">Total a Pagar</span>
                </div>
            </div>
        `;
    }
    if (selectedYear === '2025' || selectedYear === 'TODAS') {
        cardsContainer.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 border-l-4 border-l-amber-500 shadow-sm">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidado 2025</span>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">${total2025Count} Infrações</span>
                </div>
                <div class="mt-3 flex items-baseline justify-between">
                    <span class="text-2xl font-extrabold text-white">R$ ${total2025Val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <span class="text-xs text-slate-400">Total a Pagar</span>
                </div>
            </div>
        `;
    }
    if (selectedYear === '2026' || selectedYear === 'TODAS') {
        cardsContainer.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 border-l-4 border-l-blue-500 shadow-sm">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consolidado 2026</span>
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">${total2026Count} Infrações</span>
                </div>
                <div class="mt-3 flex items-baseline justify-between">
                    <span class="text-2xl font-extrabold text-white">R$ ${total2026Val.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <span class="text-xs text-slate-400">Total a Pagar</span>
                </div>
            </div>
        `;
    }

    const yearsToRender = selectedYear === 'TODAS' ? [2024, 2025, 2026] : [parseInt(selectedYear)];

    yearsToRender.forEach(yr => {
        let rows = '';
        const yrTotalVal = MULTAS_DATA[yr].reduce((a,b)=>a+b.value,0);
        const colorClass = yr === 2024 ? 'text-purple-400' : (yr === 2025 ? 'text-amber-400' : 'text-blue-400');
        
        MULTAS_DATA[yr].forEach(item => {
            rows += `
                <tr class="hover:bg-slate-800/40">
                    <td class="py-2.5 px-4 font-semibold text-slate-200">${item.gravidade}</td>
                    <td class="py-2.5 px-3 text-center">${item.count}</td>
                    <td class="py-2.5 px-4 text-right font-bold ${colorClass}">R$ ${item.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                </tr>
            `;
        });

        tablesContainer.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div class="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h4 class="font-bold text-slate-200 text-sm">Detalhamento — ${yr}</h4>
                    <span class="text-xs font-bold ${colorClass}">R$ ${yrTotalVal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                            <tr>
                                <th class="py-2.5 px-4">Gravidade</th>
                                <th class="py-2.5 px-3 text-center">Qtd</th>
                                <th class="py-2.5 px-4 text-right">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/60 font-medium text-slate-300">${rows}</tbody>
                    </table>
                </div>
            </div>
        `;
    });

    renderSideBySideMultasCharts(selectedYear);
    updateDashboardKPIsForMultas(selectedYear);
}

function updateDashboardKPIsForMultas(selectedYear) {
    const totalEl = document.getElementById('kpi-total');
    if (!totalEl) return;

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
    totalEl.innerText = val.toLocaleString('pt-BR');
}

function renderSideBySideMultasCharts(selectedYear) {
    const countCanvas = document.getElementById('multasCountChart');
    const valueCanvas = document.getElementById('multasValueChart');
    if (!countCanvas || !valueCanvas) return;

    const countTitleEl = countCanvas.closest('.bg-slate-900').querySelector('h3');
    const valueTitleEl = valueCanvas.closest('.bg-slate-900').querySelector('h3');

    let labels = MONTHS;
    let countDatasets = [];
    let valueDatasets = [];

    if (selectedYear === '2024') {
        if (countTitleEl) countTitleEl.innerHTML = `<i data-lucide="bar-chart-2" class="w-4 h-4 text-purple-400"></i> Multas por mês — 2024`;
        if (valueTitleEl) valueTitleEl.innerHTML = `<i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i> Valor das multas por mês (R$) — 2024`;
        
        countDatasets = [{
            label: '2024',
            data: MULTAS_MONTHLY_2024.map(i => i.count),
            backgroundColor: 'rgba(168, 85, 247, 0.85)',
            borderColor: '#a855f7',
            borderWidth: 1,
            borderRadius: 6
        }];
        valueDatasets = [{
            label: '2024',
            data: MULTAS_MONTHLY_2024.map(i => i.value),
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 6
        }];
    } else if (selectedYear === '2025') {
        if (countTitleEl) countTitleEl.innerHTML = `<i data-lucide="bar-chart-2" class="w-4 h-4 text-amber-400"></i> Multas por mês — 2025`;
        if (valueTitleEl) valueTitleEl.innerHTML = `<i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i> Valor das multas por mês (R$) — 2025`;
        
        countDatasets = [{
            label: '2025',
            data: MULTAS_MONTHLY_2025.map(i => i.count),
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            borderColor: '#f59e0b',
            borderWidth: 1,
            borderRadius: 6
        }];
        valueDatasets = [{
            label: '2025',
            data: MULTAS_MONTHLY_2025.map(i => i.value),
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 6
        }];
    } else if (selectedYear === '2026') {
        if (countTitleEl) countTitleEl.innerHTML = `<i data-lucide="bar-chart-2" class="w-4 h-4 text-blue-400"></i> Multas por mês — 2026`;
        if (valueTitleEl) valueTitleEl.innerHTML = `<i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i> Valor das multas por mês (R$) — 2026`;

        countDatasets = [{
            label: '2026',
            data: MULTAS_MONTHLY_2026.map(i => i.count),
            backgroundColor: 'rgba(59, 130, 246, 0.85)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 6
        }];
        valueDatasets = [{
            label: '2026',
            data: MULTAS_MONTHLY_2026.map(i => i.value),
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 6
        }];
    } else {
        if (countTitleEl) countTitleEl.innerHTML = `<i data-lucide="bar-chart-2" class="w-4 h-4 text-indigo-400"></i> Comparativo Unificado (2024 vs 2025 vs 2026)`;
        if (valueTitleEl) valueTitleEl.innerHTML = `<i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i> Comparativo de Valores Unificado (R$)`;

        countDatasets = [
            {
                label: '2024',
                data: MULTAS_MONTHLY_2024.map(i => i.count),
                backgroundColor: 'rgba(168, 85, 247, 0.85)',
                borderColor: '#a855f7',
                borderWidth: 1,
                borderRadius: 4
            },
            {
                label: '2025',
                data: MULTAS_MONTHLY_2025.map(i => i.count),
                backgroundColor: 'rgba(245, 158, 11, 0.85)',
                borderColor: '#f59e0b',
                borderWidth: 1,
                borderRadius: 4
            },
            {
                label: '2026',
                data: MULTAS_MONTHLY_2026.map(i => i.count),
                backgroundColor: 'rgba(59, 130, 246, 0.85)',
                borderColor: '#3b82f6',
                borderWidth: 1,
                borderRadius: 4
            }
        ];
        valueDatasets = [
            {
                label: '2024',
                data: MULTAS_MONTHLY_2024.map(i => i.value),
                backgroundColor: 'rgba(126, 34, 206, 0.85)',
                borderColor: '#7e22ce',
                borderWidth: 1,
                borderRadius: 4
            },
            {
                label: '2025',
                data: MULTAS_MONTHLY_2025.map(i => i.value),
                backgroundColor: 'rgba(217, 119, 6, 0.85)',
                borderColor: '#d97706',
                borderWidth: 1,
                borderRadius: 4
            },
            {
                label: '2026',
                data: MULTAS_MONTHLY_2026.map(i => i.value),
                backgroundColor: 'rgba(16, 185, 129, 0.85)',
                borderColor: '#10b981',
                borderWidth: 1,
                borderRadius: 4
            }
        ];
    }

    if (window.lucide) lucide.createIcons();

    if (multasCountChartInstance) multasCountChartInstance.destroy();
    multasCountChartInstance = new Chart(countCanvas.getContext('2d'), {
        type: 'bar',
        data: { labels: labels, datasets: countDatasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: selectedYear === 'TODAS', labels: { color: '#94a3b8', font: { size: 11 } } },
                tooltip: {
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderWidth: 1,
                    callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw} multas` }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                y: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#94a3b8' }, beginAtZero: true }
            }
        }
    });

    if (multasValueChartInstance) multasValueChartInstance.destroy();
    multasValueChartInstance = new Chart(valueCanvas.getContext('2d'), {
        type: 'bar',
        data: { labels: labels, datasets: valueDatasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: selectedYear === 'TODAS', labels: { color: '#94a3b8', font: { size: 11 } } },
                tooltip: {
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderWidth: 1,
                    callbacks: { label: ctx => ` ${ctx.dataset.label}: R$ ${ctx.raw.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                y: { 
                    grid: { color: 'rgba(51, 65, 85, 0.2)' }, 
                    ticks: { 
                        color: '#94a3b8',
                        callback: val => 'R$ ' + (val >= 1000 ? (val/1000).toFixed(0) + ' mil' : val)
                    }, 
                    beginAtZero: true 
                }
            }
        }
    });
}

// DEMAIS PAINÉIS
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

function renderDriversRanking(selectedRegion, activeTab) {
    const driversCoEl = document.getElementById('drivers-co');
    const driversNeEl = document.getElementById('drivers-ne');
    const driversSulEl = document.getElementById('drivers-sul');
    if (!driversCoEl) return;

    const dataSource = activeTab === 'ranking_fora_horario' ? DRIVERS_FORA_HORARIO_DATA : DRIVERS_EXCESSO_DATA;
    const regions = [
        { key: "CENTRO OESTE", container: driversCoEl, cardContainer: driversCoEl.closest('.bg-slate-900'), totalElId: "card-total-co" },
        { key: "NORDESTE", container: driversNeEl, cardContainer: driversNeEl.closest('.bg-slate-900'), totalElId: "card-total-ne" },
        { key: "SUL", container: driversSulEl, cardContainer: driversSulEl.closest('.bg-slate-900'), totalElId: "card-total-sul" }
    ];

    regions.forEach(reg => {
        if (selectedRegion === 'TODAS' || selectedRegion === reg.key) {
            if (reg.cardContainer) reg.cardContainer.classList.remove('hidden');
            const list = dataSource[reg.key] || [];
            const total = list.reduce((acc, item) => acc + item.count, 0);
            const totalEl = document.getElementById(reg.totalElId);
            if (totalEl) totalEl.innerText = `Total: ${total}`;

            reg.container.innerHTML = '';
            const maxCount = list.length > 0 ? list[0].count : 1;
            list.forEach((driver, idx) => {
                const pct = Math.round((driver.count / maxCount) * 100);
                reg.container.innerHTML += `
                    <div class="space-y-1 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                        <div class="flex justify-between items-center text-xs">
                            <span class="font-semibold text-slate-200">${idx + 1}. ${driver.name}</span>
                            <span class="font-extrabold text-slate-100 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">${driver.count}</span>
                        </div>
                        <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div class="bg-blue-500 h-full rounded-full" style="width: ${pct}%"></div>
                        </div>
                    </div>
                `;
            });
        } else {
            if (reg.cardContainer) reg.cardContainer.classList.add('hidden');
        }
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
        for (let i = 0; i < 10; i++) {
            const isSelected = monthIndices.includes(i);
            const val = fullMonthArray[i];
            if (isSelected) rowSum += val;
            htmlContent += `<td class="py-3.5 px-2 text-center ${isSelected ? 'text-slate-100 font-bold' : 'text-slate-600 opacity-40'}">${val}</td>`;
        }

        htmlContent += `<td class="py-3.5 px-4 text-right font-extrabold text-white whitespace-nowrap">${rowSum.toLocaleString('pt-BR')}</td>`;
        htmlContent += `<td class="py-3.5 px-4 text-center whitespace-nowrap"><span class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Estável</span></td>`;

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
    
    // Alterna a visibilidade do submenu (equivalente ao que você fez na sidebar)
    menu.classList.toggle('hidden');
    
    // Opcional: faz a setinha do menu girar ao abrir/fechar se houver o ícone correspondente
    if (icon) {
        icon.classList.toggle('rotate-180');
    }
}