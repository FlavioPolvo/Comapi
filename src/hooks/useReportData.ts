import { useState, useEffect } from "react";
import {
<<<<<<< Updated upstream
  supabase,
  getProducers,
  getEntries,
  getMunicipalities,
  getColors,
=======
    supabase,
    getProducers,
    getEntries,
    getMunicipalities,
    getColors,
>>>>>>> Stashed changes
} from "@/lib/supabase";

// Tipos para os dados
export interface Producer {
    id: string;
    name: string;
    cod_na_comapi: string;
    municipality: string;
    community: string;
}

export interface EntryRecord {
    id: string;
    date: Date;
    producerId: string;
    producerName: string;
    municipality: string;
    community: string;
    quantity: number;
    grossWeight: number;
    netWeight: number;
    tare: number;
    totalTare: number;
    unitValue: number;
    totalValue: number;
    colorCode: string;
    humidity: number;
    apiary: string;
    lot: string;
    contract: string;
}

export interface Color {
    id: string;
    code: string;
    name: string;
    hexColor: string;
}

export interface Municipality {
    id: number;
    name: string;
    region: string;
}

export interface ReportData {
    producers: Producer[];
    entries: EntryRecord[];
    municipalities: Municipality[];
    colors: Color[];
    productionSummary: {
        totalProduction: number;
        averagePerProducer: number;
        totalProducers: number;
        productionByMonth: Array<{ month: string; production: number; }>;
        productionByColor: Array<{ color: string; percentage: number; }>;
        productionByMunicipality: Array<{ municipality: string; production: number; }>;
        productionTrend: Array<{ month: string; production: number; }>;
    }
}

// Hook para gerenciar os dados dos relatórios
export const useReportData = () => {
    const [data, setData] = useState<ReportData>({
        producers: [],
        entries: [],
        municipalities: [],
        colors: [],
        productionSummary: {
            totalProduction: 0,
            averagePerProducer: 0,
            totalProducers: 0,
            productionByMonth: [],
            productionByColor: [],
            productionByMunicipality: [], // Adicionado valor inicial
            productionTrend: [], // Adicionado valor inicial
        },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar os dados
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

<<<<<<< Updated upstream
        // Tentar buscar dados do Supabase
        let producersData: Producer[] = [];
        let entriesData: EntryRecord[] = [];
        let municipalitiesData: Municipality[] = [];
        let colorsData: Color[] = [];

        try {
          // Verificar se temos conexão com o Supabase
          const { data: testData, error: testError } = await supabase
            .from("colors")
            .select("count", { count: "exact", head: true });

          if (!testError) {
            // Buscar dados reais do Supabase
            const producers = await getProducers();
            const entries = await getEntries();
            const municipalities = await getMunicipalities();
            const colors = await getColors();

            // Mapear para o formato esperado
            producersData = producers.map((p) => ({
              id: p.id,
              name: p.nome_completo,
              cod_na_comapi: p.cod_na_comapi,
              municipality: p.municipality || "",
              community: p.community || "",
            }));

            entriesData = entries.map((e) => ({
              id: e.id,
              date: new Date(e.date),
              producerId: e.producer_id,
              producerName: e.producers?.nome_completo || "",
              municipality: e.municipality,
              community: e.community,
              quantity: e.quantity,
              grossWeight: e.gross_weight,
              netWeight: e.net_weight,
              tare: e.tare,
              totalTare: e.total_tare,
              unitValue: e.unit_value,
              totalValue: e.total_value,
              colorCode: e.color_code,
              humidity: e.humidity,
              apiary: e.apiary || "",
              lot: e.lot || "",
              contract: e.contract || "",
            }));

            municipalitiesData = municipalities.map((m) => ({
              id: m.id,
              name: m.name,
              region: m.region,
            }));

            colorsData = colors.map((c) => ({
              id: c.id,
              code: c.code,
              name: c.name,
              hexColor: c.hex_color,
            }));
          }
        } catch (supabaseError) {
          console.warn(
            "Erro ao buscar dados do Supabase, usando dados mockados:",
            supabaseError,
          );
        }

        // Se não conseguimos dados do Supabase, usar dados mockados
        if (producersData.length === 0) {
          producersData = [
            {
              id: "1",
              name: "João Silva",
              cod_na_comapi: "COMAPI001",
              municipality: "São Paulo",
              community: "Comunidade A",
            },
            {
              id: "2",
              name: "Maria Oliveira",
              cod_na_comapi: "COMAPI002",
              municipality: "Rio de Janeiro",
              community: "Comunidade B",
            },
            {
              id: "3",
              name: "Pedro Santos",
              cod_na_comapi: "COMAPI003",
              municipality: "Belo Horizonte",
              community: "Comunidade C",
            },
            {
              id: "4",
              name: "Ana Pereira",
              cod_na_comapi: "COMAPI004",
              municipality: "Salvador",
              community: "Comunidade D",
            },
            {
              id: "5",
              name: "Carlos Mendes",
              cod_na_comapi: "COMAPI005",
              municipality: "São Paulo",
              community: "Comunidade A",
            },
            {
              id: "6",
              name: "Fernanda Lima",
              cod_na_comapi: "COMAPI006",
              municipality: "Rio de Janeiro",
              community: "Comunidade B",
            },
            {
              id: "7",
              name: "Roberto Alves",
              cod_na_comapi: "COMAPI007",
              municipality: "Belo Horizonte",
              community: "Comunidade C",
            },
            {
              id: "8",
              name: "Juliana Costa",
              cod_na_comapi: "COMAPI008",
              municipality: "Salvador",
              community: "Comunidade D",
            },
            {
              id: "9",
              name: "Marcos Souza",
              cod_na_comapi: "COMAPI009",
              municipality: "Recife",
              community: "Comunidade E",
            },
            {
              id: "10",
              name: "Luciana Ferreira",
              cod_na_comapi: "COMAPI010",
              municipality: "Recife",
              community: "Comunidade E",
            },
          ];
        }

        if (colorsData.length === 0) {
          colorsData = [
            { id: "1", code: "1", name: "Branco Água", hexColor: "#F5F5F5" },
            { id: "2", code: "2", name: "Extra Branco", hexColor: "#FFFFFF" },
            { id: "3", code: "3", name: "Branco", hexColor: "#FFFAFA" },
            {
              id: "4",
              code: "4",
              name: "Âmbar Extra Claro",
              hexColor: "#FFEBCD",
            },
            { id: "5", code: "5", name: "Âmbar Claro", hexColor: "#FFD700" },
            { id: "6", code: "6", name: "Âmbar", hexColor: "#FFA500" },
            { id: "7", code: "7", name: "Âmbar Escuro", hexColor: "#B8860B" },
          ];
        }

        if (municipalitiesData.length === 0) {
          municipalitiesData = [
            { id: 1, name: "São Paulo", region: "Sudeste" },
            { id: 2, name: "Rio de Janeiro", region: "Sudeste" },
            { id: 3, name: "Belo Horizonte", region: "Sudeste" },
            { id: 4, name: "Salvador", region: "Nordeste" },
            { id: 5, name: "Recife", region: "Nordeste" },
            { id: 6, name: "Fortaleza", region: "Nordeste" },
            { id: 7, name: "Porto Alegre", region: "Sul" },
            { id: 8, name: "Curitiba", region: "Sul" },
            { id: 9, name: "Manaus", region: "Norte" },
            { id: 10, name: "Belém", region: "Norte" },
          ];
        }

        if (entriesData.length === 0) {
          // Gerar dados de entrada para os últimos 12 meses
          const mockEntries: EntryRecord[] = [];
          const currentDate = new Date();
          const startDate = new Date(currentDate);
          startDate.setMonth(startDate.getMonth() - 12); // 12 meses atrás

          // Gerar entre 80 e 120 entradas
          const numEntries = Math.floor(Math.random() * 41) + 80; // Entre 80 e 120

          for (let i = 0; i < numEntries; i++) {
            // Data aleatória nos últimos 12 meses
            const entryDate = new Date(
              startDate.getTime() +
                Math.random() * (currentDate.getTime() - startDate.getTime()),
            );

            // Produtor aleatório
            const producer =
              producersData[Math.floor(Math.random() * producersData.length)];

            // Quantidade entre 2 e 15
            const quantity = Math.floor(Math.random() * 14) + 2;

            // Tara entre 0.8 e 1.2
            const tare = 0.8 + Math.random() * 0.4;

            // Peso bruto entre 20 e 50 por unidade
            const weightPerUnit = 20 + Math.random() * 30;
            const grossWeight = weightPerUnit * quantity;
            const totalTare = tare * quantity;
            const netWeight = grossWeight - totalTare;

            // Valor unitário entre 20 e 30
            const unitValue = 20 + Math.random() * 10;
            const totalValue = netWeight * unitValue;

            // Cor aleatória
            const colorCode =
              colorsData[Math.floor(Math.random() * colorsData.length)].code;

            // Umidade entre 16 e 20
            const humidity = 16 + Math.random() * 4;

            mockEntries.push({
              id: `e${i + 1}`,
              date: entryDate,
              producerId: producer.id,
              producerName: producer.name,
              municipality: producer.municipality,
              community: producer.community,
              quantity,
              grossWeight,
              netWeight,
              tare,
              totalTare,
              unitValue,
              totalValue,
              colorCode,
              humidity,
              apiary: `Apiário ${Math.floor(Math.random() * 5) + 1}`,
              lot: `L${entryDate.getFullYear()}-${String(i + 1).padStart(3, "0")}`,
              contract: `C${entryDate.getFullYear()}-${String(Math.floor(Math.random() * 20) + 1).padStart(3, "0")}`,
            });
          }

          entriesData = mockEntries;
        }

        // Ordenar entradas por data
        entriesData.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Calcular resumo de produção
        const totalProduction = entriesData.reduce(
          (sum, entry) => sum + entry.netWeight,
          0,
        );
        const uniqueProducers = new Set(
          entriesData.map((entry) => entry.producerId),
        );
        const totalProducers = uniqueProducers.size;
        const averagePerProducer = totalProduction / totalProducers;
=======
                // Tentar buscar dados do Supabase
                let producersData: Producer[] = [];
                let entriesData: EntryRecord[] = [];
                let municipalitiesData: Municipality[] = [];
                let colorsData: Color[] = [];

                try {
                    // Verificar se temos conexão com o Supabase
                    const { data: testData, error: testError } = await supabase
                        .from("colors")
                        .select("count", { count: "exact", head: true });

                    if (!testError) {
                        // Buscar dados reais do Supabase
                        const producers = await getProducers();
                        const entries = await getEntries();
                        const municipalities = await getMunicipalities();
                        const colors = await getColors();

                        // Mapear para o formato esperado
                        producersData = producers.map((p) => ({
                            id: p.id,
                            name: p.nome_completo,
                            cod_na_comapi: p.cod_na_comapi,
                            municipality: p.municipality || "",
                            community: p.community || "",
                        }));

                        entriesData = entries.map((e) => ({
                            id: e.id,
                            date: new Date(e.date),
                            producerId: e.producer_id,
                            producerName: e.producers?.nome_completo || "",
                            municipality: e.municipality,
                            community: e.community,
                            quantity: e.quantity,
                            grossWeight: e.gross_weight,
                            netWeight: e.net_weight,
                            tare: e.tare,
                            totalTare: e.total_tare,
                            unitValue: e.unit_value,
                            totalValue: e.total_value,
                            colorCode: e.color_code,
                            humidity: e.humidity,
                            apiary: e.apiary || "",
                            lot: e.lot || "",
                            contract: e.contract || "",
                        }));

                        municipalitiesData = municipalities.map((m) => ({
                            id: m.id,
                            name: m.name,
                            region: m.region,
                        }));

                        colorsData = colors.map((c) => ({
                            id: c.id,
                            code: c.code,
                            name: c.name,
                            hexColor: c.hex_color,
                        }));
                    }
                } catch (supabaseError) {
                    console.warn(
                        "Erro ao buscar dados do Supabase, usando dados mockados:",
                        supabaseError,
                    );
                }

                // Se não conseguimos dados do Supabase, usar dados mockados
                if (producersData.length === 0) {
                    producersData = [
                        {
                            id: "1",
                            name: "João Silva",
                            cod_na_comapi: "COMAPI001",
                            municipality: "São Paulo",
                            community: "Comunidade A",
                        },
                        {
                            id: "2",
                            name: "Maria Oliveira",
                            cod_na_comapi: "COMAPI002",
                            municipality: "Rio de Janeiro",
                            community: "Comunidade B",
                        },
                        {
                            id: "3",
                            name: "Pedro Santos",
                            cod_na_comapi: "COMAPI003",
                            municipality: "Belo Horizonte",
                            community: "Comunidade C",
                        },
                        {
                            id: "4",
                            name: "Ana Pereira",
                            cod_na_comapi: "COMAPI004",
                            municipality: "Salvador",
                            community: "Comunidade D",
                        },
                        {
                            id: "5",
                            name: "Carlos Mendes",
                            cod_na_comapi: "COMAPI005",
                            municipality: "São Paulo",
                            community: "Comunidade A",
                        },
                        {
                            id: "6",
                            name: "Fernanda Lima",
                            cod_na_comapi: "COMAPI006",
                            municipality: "Rio de Janeiro",
                            community: "Comunidade B",
                        },
                        {
                            id: "7",
                            name: "Roberto Alves",
                            cod_na_comapi: "COMAPI007",
                            municipality: "Belo Horizonte",
                            community: "Comunidade C",
                        },
                        {
                            id: "8",
                            name: "Juliana Costa",
                            cod_na_comapi: "COMAPI008",
                            municipality: "Salvador",
                            community: "Comunidade D",
                        },
                        {
                            id: "9",
                            name: "Marcos Souza",
                            cod_na_comapi: "COMAPI009",
                            municipality: "Recife",
                            community: "Comunidade E",
                        },
                        {
                            id: "10",
                            name: "Luciana Ferreira",
                            cod_na_comapi: "COMAPI010",
                            municipality: "Recife",
                            community: "Comunidade E",
                        },
                    ];
                }

                if (colorsData.length === 0) {
                    colorsData = [
                        { id: "1", code: "1", name: "Branco Água", hexColor: "#F5F5F5" },
                        { id: "2", code: "2", name: "Extra Branco", hexColor: "#FFFFFF" },
                        { id: "3", code: "3", name: "Branco", hexColor: "#FFFAFA" },
                        {
                            id: "4",
                            code: "4",
                            name: "Âmbar Extra Claro",
                            hexColor: "#FFEBCD",
                        },
                        { id: "5", code: "5", name: "Âmbar Claro", hexColor: "#FFD700" },
                        { id: "6", code: "6", name: "Âmbar", hexColor: "#FFA500" },
                        { id: "7", code: "7", name: "Âmbar Escuro", hexColor: "#B8860B" },
                    ];
                }

                if (municipalitiesData.length === 0) {
                    municipalitiesData = [
                        { id: 1, name: "São Paulo", region: "Sudeste" },
                        { id: 2, name: "Rio de Janeiro", region: "Sudeste" },
                        { id: 3, name: "Belo Horizonte", region: "Sudeste" },
                        { id: 4, name: "Salvador", region: "Nordeste" },
                        { id: 5, name: "Recife", region: "Nordeste" },
                        { id: 6, name: "Fortaleza", region: "Nordeste" },
                        { id: 7, name: "Porto Alegre", region: "Sul" },
                        { id: 8, name: "Curitiba", region: "Sul" },
                        { id: 9, name: "Manaus", region: "Norte" },
                        { id: 10, name: "Belém", region: "Norte" },
                    ];
                }

                if (entriesData.length === 0) {
                    // Gerar dados de entrada para os últimos 12 meses
                    const mockEntries: EntryRecord[] = [];
                    const currentDate = new Date();
                    const startDate = new Date(currentDate);
                    startDate.setMonth(startDate.getMonth() - 12); // 12 meses atrás

                    // Gerar entre 80 e 120 entradas
                    const numEntries = Math.floor(Math.random() * 41) + 80; // Entre 80 e 120

                    for (let i = 0; i < numEntries; i++) {
                        // Data aleatória nos últimos 12 meses
                        const entryDate = new Date(
                            startDate.getTime() +
                            Math.random() * (currentDate.getTime() - startDate.getTime()),
                        );

                        // Produtor aleatório
                        const producer =
                            producersData[Math.floor(Math.random() * producersData.length)];

                        // Quantidade entre 2 e 15
                        const quantity = Math.floor(Math.random() * 14) + 2;

                        // Tara entre 0.8 e 1.2
                        const tare = 0.8 + Math.random() * 0.4;
>>>>>>> Stashed changes

                        // Peso bruto entre 20 e 50 por unidade
                        const weightPerUnit = 20 + Math.random() * 30;
                        const grossWeight = weightPerUnit * quantity;
                        const totalTare = tare * quantity;
                        const netWeight = grossWeight - totalTare;

<<<<<<< Updated upstream
        entriesData.forEach((entry) => {
          const monthYear = `${months[entry.date.getMonth()]}/${entry.date.getFullYear()}`;
          if (!productionByMonth[monthYear]) {
            productionByMonth[monthYear] = 0;
          }
          productionByMonth[monthYear] += entry.netWeight;
        });
=======
                        // Valor unitário entre 20 e 30
                        const unitValue = 20 + Math.random() * 10;
                        const totalValue = netWeight * unitValue;
>>>>>>> Stashed changes

                        // Cor aleatória
                        const colorCode =
                            colorsData[Math.floor(Math.random() * colorsData.length)].code;

                        // Umidade entre 16 e 20
                        const humidity = 16 + Math.random() * 4;

                        mockEntries.push({
                            id: `e${i + 1}`,
                            date: entryDate,
                            producerId: producer.id,
                            producerName: producer.name,
                            municipality: producer.municipality,
                            community: producer.community,
                            quantity,
                            grossWeight,
                            netWeight,
                            tare,
                            totalTare,
                            unitValue,
                            totalValue,
                            colorCode,
                            humidity,
                            apiary: `Apiário ${Math.floor(Math.random() * 5) + 1}`,
                            lot: `L${entryDate.getFullYear()}-${String(i + 1).padStart(3, "0")}`,
                            contract: `C${entryDate.getFullYear()}-${String(Math.floor(Math.random() * 20) + 1).padStart(3, "0")}`,
                        });
                    }

                    entriesData = mockEntries;
                }

<<<<<<< Updated upstream
        // Produção por cor
        const productionByColor: { [key: string]: number } = {};
        entriesData.forEach((entry) => {
          const colorName =
            colorsData.find((c) => c.code === entry.colorCode)?.name ||
            entry.colorCode;
          if (!productionByColor[colorName]) {
            productionByColor[colorName] = 0;
          }
          productionByColor[colorName] += entry.netWeight;
        });
=======
                // Ordenar entradas por data
                entriesData.sort((a, b) => a.date.getTime() - b.date.getTime());
>>>>>>> Stashed changes

                // Calcular resumo de produção
                const totalProduction = entriesData.reduce(
                    (sum, entry) => sum + entry.netWeight,
                    0,
                );
                const uniqueProducers = new Set(
                    entriesData.map((entry) => entry.producerId),
                );
                const totalProducers = uniqueProducers.size;
                const averagePerProducer = totalProduction / totalProducers;

                // Produção por mês
                const productionByMonth: { [key: string]: number } = {};
                const months = [
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

<<<<<<< Updated upstream
        // Produção por município
        const productionByMunicipality: { [key: string]: number } = {};
        entriesData.forEach((entry) => {
          if (!productionByMunicipality[entry.municipality]) {
            productionByMunicipality[entry.municipality] = 0;
          }
          productionByMunicipality[entry.municipality] += entry.netWeight;
        });

        // Converter para array
        const productionByMunicipalityArray = Object.entries(
          productionByMunicipality,
        ).map(([municipality, production]) => ({
          municipality,
          production,
        }));

        // Ordenar por produção (decrescente)
        productionByMunicipalityArray.sort(
          (a, b) => b.production - a.production,
        );

        // Atualiza o estado com os dados
        setData({
          producers: producersData,
          entries: entriesData,
          municipalities: municipalitiesData,
          colors: colorsData,
          productionSummary: {
            totalProduction,
            averagePerProducer,
            totalProducers,
            productionByMonth: productionByMonthArray,
            productionByColor: productionByColorArray,
            productionByMunicipality: productionByMunicipalityArray,
          },
        });
=======
                entriesData.forEach((entry) => {
                    const monthYear = `${months[entry.date.getMonth()]}/${entry.date.getFullYear()}`;
                    if (!productionByMonth[monthYear]) {
                        productionByMonth[monthYear] = 0;
                    }
                    productionByMonth[monthYear] += entry.netWeight;
                });
>>>>>>> Stashed changes

                // Converter para array e ordenar por data
                const productionByMonthArray = Object.entries(productionByMonth).map(
                    ([month, production]) => ({
                        month,
                        production,
                    }),
                );

                // Ordenar por data (assumindo formato Mes/Ano)
                productionByMonthArray.sort((a, b) => {
                    const [monthA, yearA] = a.month.split("/");
                    const [monthB, yearB] = b.month.split("/");

                    if (yearA !== yearB) {
                        return parseInt(yearA) - parseInt(yearB);
                    }

                    return months.indexOf(monthA) - months.indexOf(monthB);
                });

                // Produção por cor
                const productionByColor: { [key: string]: number } = {};
                entriesData.forEach((entry) => {
                    const colorName =
                        colorsData.find((c) => c.code === entry.colorCode)?.name ||
                        entry.colorCode;
                    if (!productionByColor[colorName]) {
                        productionByColor[colorName] = 0;
                    }
                    productionByColor[colorName] += entry.netWeight;
                });

                // Converter para array e calcular percentagens
                const productionByColorArray = Object.entries(productionByColor).map(
                    ([color, production]) => ({
                        color,
                        production,
                        percentage: (production / totalProduction) * 100,
                    }),
                );

                // Ordenar por produção (decrescente)
                productionByColorArray.sort((a, b) => b.production - a.production);

                // Produção por município
                const productionByMunicipality: { [key: string]: number } = {};
                entriesData.forEach((entry) => {
                    if (!productionByMunicipality[entry.municipality]) {
                        productionByMunicipality[entry.municipality] = 0;
                    }
                    productionByMunicipality[entry.municipality] += entry.netWeight;
                });

                // Converter para array
                const productionByMunicipalityArray = Object.entries(
                    productionByMunicipality,
                ).map(([municipality, production]) => ({
                    municipality,
                    production,
                }));

                // Ordenar por produção (decrescente)
                productionByMunicipalityArray.sort(
                    (a, b) => b.production - a.production,
                );

                // Atualiza o estado com os dados
                setData({
                    producers: producersData,
                    entries: entriesData,
                    municipalities: municipalitiesData,
                    colors: colorsData,
                    productionSummary: {
                        totalProduction,
                        averagePerProducer,
                        totalProducers,
                        productionByMonth: productionByMonthArray,
                        productionByColor: productionByColorArray.map(item => ({ color: item.color, percentage: item.percentage })),
                        productionByMunicipality: productionByMunicipalityArray || [],
                        productionTrend: productionByMonthArray, // Usando productionByMonthArray para productionTrend
                    },
                });

                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar dados");
                setLoading(false);
                console.error("Erro ao carregar dados:", err);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
