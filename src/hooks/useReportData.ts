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
  code: string;
  name: string;
}

export interface Municipality {
  id: number;
  name: string;
}

export interface ReportData {
  producers: Producer[];
  entries: EntryRecord[];
  municipalities: Municipality[];
  colors: Color[];
}

// Hook para gerenciar os dados dos relatórios
export function useReportData() {
  const [data, setData] = useState<ReportData>({
    producers: [],
    entries: [],
    municipalities: [],
    colors: [],
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
        ];

        // Dados mockados para entradas
        const mockEntries: EntryRecord[] = [
          {
            id: "e1",
            date: new Date(2024, 0, 15), // 15 de Janeiro de 2024
            producerId: "1",
            producerName: "João Silva",
            municipality: "São Paulo",
            community: "Comunidade A",
            quantity: 5,
            grossWeight: 125.5,
            netWeight: 120.0,
            tare: 1.1,
            totalTare: 5.5,
            unitValue: 25.0,
            totalValue: 3000.0,
            colorCode: "3",
            humidity: 18.5,
            apiary: "Apiário Central",
            lot: "L2024-001",
            contract: "C2024-001",
          },
          {
            id: "e2",
            date: new Date(2024, 1, 10), // 10 de Fevereiro de 2024
            producerId: "2",
            producerName: "Maria Oliveira",
            municipality: "Rio de Janeiro",
            community: "Comunidade B",
            quantity: 8,
            grossWeight: 200.0,
            netWeight: 192.0,
            tare: 1.0,
            totalTare: 8.0,
            unitValue: 22.5,
            totalValue: 4320.0,
            colorCode: "4",
            humidity: 19.0,
            apiary: "Apiário Sul",
            lot: "L2024-002",
            contract: "C2024-002",
          },
          {
            id: "e3",
            date: new Date(2024, 2, 5), // 5 de Março de 2024
            producerId: "3",
            producerName: "Pedro Santos",
            municipality: "Belo Horizonte",
            community: "Comunidade C",
            quantity: 6,
            grossWeight: 150.0,
            netWeight: 144.0,
            tare: 1.0,
            totalTare: 6.0,
            unitValue: 24.0,
            totalValue: 3456.0,
            colorCode: "2",
            humidity: 17.5,
            apiary: "Apiário Leste",
            lot: "L2024-003",
            contract: "C2024-003",
          },
          {
            id: "e4",
            date: new Date(2024, 2, 20), // 20 de Março de 2024
            producerId: "4",
            producerName: "Ana Pereira",
            municipality: "Salvador",
            community: "Comunidade D",
            quantity: 4,
            grossWeight: 100.0,
            netWeight: 96.0,
            tare: 1.0,
            totalTare: 4.0,
            unitValue: 26.0,
            totalValue: 2496.0,
            colorCode: "5",
            humidity: 18.0,
            apiary: "Apiário Norte",
            lot: "L2024-004",
            contract: "C2024-004",
          },
          {
            id: "e5",
            date: new Date(2024, 3, 8), // 8 de Abril de 2024
            producerId: "5",
            producerName: "Carlos Mendes",
            municipality: "São Paulo",
            community: "Comunidade A",
            quantity: 7,
            grossWeight: 175.0,
            netWeight: 168.0,
            tare: 1.0,
            totalTare: 7.0,
            unitValue: 25.5,
            totalValue: 4284.0,
            colorCode: "3",
            humidity: 18.2,
            apiary: "Apiário Oeste",
            lot: "L2024-005",
            contract: "C2024-005",
          },
        ];

        // Dados mockados para municípios
        const mockMunicipalities: Municipality[] = [
          { id: 1, name: "São Paulo" },
          { id: 2, name: "Rio de Janeiro" },
          { id: 3, name: "Belo Horizonte" },
          { id: 4, name: "Salvador" },
          { id: 5, name: "Recife" },
        ];

        // Dados mockados para cores
        const mockColors: Color[] = [
          { code: "1", name: "Branco Água" },
          { code: "2", name: "Extra Branco" },
          { code: "3", name: "Branco" },
          { code: "4", name: "Âmbar Extra Claro" },
          { code: "5", name: "Âmbar Claro" },
          { code: "6", name: "Âmbar" },
          { code: "7", name: "Âmbar Escuro" },
        ];

        // Atualiza o estado com os dados mockados
        setData({
          producers: mockProducers,
          entries: mockEntries,
          municipalities: mockMunicipalities,
          colors: mockColors,
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
