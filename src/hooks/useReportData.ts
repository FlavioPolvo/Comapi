import { useState, useEffect } from "react";

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
    productionByMonth: Array<{ month: string; production: number }>;
    productionByColor: Array<{
      color: string;
      production: number;
      percentage: number;
    }>;
  };
}

// Hook para gerenciar os dados dos relatórios
export function useReportData() {
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
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Dados mockados para produtores
        const mockProducers: Producer[] = [
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

        // Dados mockados para cores com cores hexadecimais
        const mockColors: Color[] = [
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

        // Dados mockados para municípios com regiões
        const mockMunicipalities: Municipality[] = [
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
            mockProducers[Math.floor(Math.random() * mockProducers.length)];

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
            mockColors[Math.floor(Math.random() * mockColors.length)].code;

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

        // Ordenar entradas por data
        mockEntries.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Calcular resumo de produção
        const totalProduction = mockEntries.reduce(
          (sum, entry) => sum + entry.netWeight,
          0,
        );
        const uniqueProducers = new Set(
          mockEntries.map((entry) => entry.producerId),
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

        mockEntries.forEach((entry) => {
          const monthYear = `${months[entry.date.getMonth()]}/${entry.date.getFullYear()}`;
          if (!productionByMonth[monthYear]) {
            productionByMonth[monthYear] = 0;
          }
          productionByMonth[monthYear] += entry.netWeight;
        });

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
        mockEntries.forEach((entry) => {
          const colorName =
            mockColors.find((c) => c.code === entry.colorCode)?.name ||
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

        // Atualiza o estado com os dados mockados
        setData({
          producers: mockProducers,
          entries: mockEntries,
          municipalities: mockMunicipalities,
          colors: mockColors,
          productionSummary: {
            totalProduction,
            averagePerProducer,
            totalProducers,
            productionByMonth: productionByMonthArray,
            productionByColor: productionByColorArray,
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
}
