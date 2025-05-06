import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  Printer,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { cn } from "@/lib/utils";

interface ComparativeReportProps {
  className?: string;
}

const ComparativeReport: React.FC<ComparativeReportProps> = ({
  className = "",
}) => {
  const [reportType, setReportType] = useState<string>("period");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>();
  const [selectedProducer, setSelectedProducer] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [chartType, setChartType] = useState<string>("bar");

  // Mock data for dropdowns
  const municipalities = [
    { id: 1, name: "São Paulo" },
    { id: 2, name: "Rio de Janeiro" },
    { id: 3, name: "Belo Horizonte" },
    { id: 4, name: "Salvador" },
    { id: 5, name: "Recife" },
  ];

  const producers = [
    { id: 101, name: "João Silva" },
    { id: 102, name: "Maria Oliveira" },
    { id: 103, name: "Carlos Santos" },
    { id: 104, name: "Ana Pereira" },
    { id: 105, name: "Paulo Costa" },
  ];

  const colors = [
    { id: 1, name: "Branco Água" },
    { id: 2, name: "Extra Branco" },
    { id: 3, name: "Branco" },
    { id: 4, name: "Âmbar Extra Claro" },
    { id: 5, name: "Âmbar Claro" },
    { id: 6, name: "Âmbar" },
    { id: 7, name: "Âmbar Escuro" },
  ];

  // Mock data for charts
  const mockChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Produção (kg)",
        data: [120, 190, 300, 250, 280, 320],
      },
    ],
  };

  const mockComparisonData = {
    labels: [
      "São Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Salvador",
      "Recife",
    ],
    datasets: [
      {
        label: "2023",
        data: [420, 390, 340, 280, 310],
      },
      {
        label: "2024",
        data: [520, 450, 380, 320, 350],
      },
    ],
  };

  // Helper function to get report data based on current tab
  const getReportData = () => {
    let title = "";
    let headers = [];
    let data = [];

    if (reportType === "period") {
      title = "Relatório de Produção por Período";
      headers = [
        "Período",
        "Quantidade (kg)",
        "Valor Total (R$)",
        "Média por Produtor",
      ];
      data = [
        ["Janeiro/2024", "1.250", "R$ 25.000,00", "125 kg"],
        ["Fevereiro/2024", "1.420", "R$ 28.400,00", "142 kg"],
        ["Março/2024", "1.680", "R$ 33.600,00", "168 kg"],
      ];
    } else if (reportType === "municipality") {
      title = "Relatório de Produção por Município";
      headers = [
        "Município",
        "Quantidade (kg)",
        "Nº de Produtores",
        "Média por Produtor",
      ];
      data = [
        ["São Paulo", "3.250", "15", "216,7 kg"],
        ["Rio de Janeiro", "2.840", "12", "236,7 kg"],
        ["Belo Horizonte", "2.100", "10", "210,0 kg"],
      ];
    } else if (reportType === "producer") {
      title = "Relatório de Produção por Produtor";
      headers = [
        "Produtor",
        "Município",
        "Quantidade (kg)",
        "Valor Total (R$)",
      ];
      data = [
        ["João Silva", "São Paulo", "850", "R$ 17.000,00"],
        ["Maria Oliveira", "Rio de Janeiro", "720", "R$ 14.400,00"],
        ["Carlos Santos", "Belo Horizonte", "680", "R$ 13.600,00"],
      ];
    }

    return { title, headers, data };
  };

  const handleExportPDF = () => {
    const { title, headers, data } = getReportData();
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text(title, 14, 20);

    // Add date range if available
    if (fromDate && toDate) {
      doc.setFontSize(12);
      doc.text(
        `Período: ${format(fromDate, "dd/MM/yyyy")} até ${format(toDate, "dd/MM/yyyy")}`,
        14,
        30,
      );
    }

    // Add filters if available
    let yPos = 40;
    if (selectedMunicipality) {
      doc.text(`Município: ${selectedMunicipality}`, 14, yPos);
      yPos += 10;
    }
    if (selectedProducer) {
      doc.text(`Produtor: ${selectedProducer}`, 14, yPos);
      yPos += 10;
    }
    if (selectedColor) {
      doc.text(`Classificação por Cor: ${selectedColor}`, 14, yPos);
      yPos += 10;
    }

    // Add table
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: yPos,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    // Save the PDF
    doc.save(
      `relatorio_${reportType}_${new Date().toISOString().split("T")[0]}.pdf`,
    );
  };

  const handleExportExcel = () => {
    const { title, headers, data } = getReportData();

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");

    // Generate Excel file
    XLSX.writeFile(
      wb,
      `relatorio_${reportType}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const handlePrint = () => {
    // Placeholder for print functionality
    console.log("Printing report...");
  };

  return (
    <div className={cn("bg-background p-6 rounded-lg", className)}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Relatórios Comparativos</CardTitle>
          <CardDescription>
            Gere relatórios comparativos de produção por período, município ou
            produtor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={reportType}
            onValueChange={setReportType}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="period">Por Período</TabsTrigger>
              <TabsTrigger value="municipality">Por Município</TabsTrigger>
              <TabsTrigger value="producer">Por Produtor</TabsTrigger>
            </TabsList>

            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Date Range Selector */}
                <div className="flex flex-col space-y-2 flex-1">
                  <label className="text-sm font-medium">Período</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate
                            ? format(fromDate, "dd/MM/yyyy")
                            : "Data inicial"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "dd/MM/yyyy") : "Data final"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Municipality Selector */}
                <div className="flex flex-col space-y-2 flex-1">
                  <label className="text-sm font-medium">Município</label>
                  <Select
                    value={selectedMunicipality}
                    onValueChange={setSelectedMunicipality}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um município" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem
                          key={municipality.id}
                          value={municipality.name}
                        >
                          {municipality.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Producer Selector */}
                <div className="flex flex-col space-y-2 flex-1">
                  <label className="text-sm font-medium">Produtor</label>
                  <Select
                    value={selectedProducer}
                    onValueChange={setSelectedProducer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produtor" />
                    </SelectTrigger>
                    <SelectContent>
                      {producers.map((producer) => (
                        <SelectItem key={producer.id} value={producer.name}>
                          {producer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Classification Selector */}
                <div className="flex flex-col space-y-2 flex-1">
                  <label className="text-sm font-medium">
                    Classificação por Cor
                  </label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.name}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Chart Type Selector */}
              <div className="flex justify-end gap-2">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart3 className="h-4 w-4 mr-1" /> Barras
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="h-4 w-4 mr-1" /> Linhas
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("pie")}
                >
                  <PieChart className="h-4 w-4 mr-1" /> Pizza
                </Button>
              </div>
            </div>

            <TabsContent value="period" className="space-y-4">
              <div className="h-[400px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                {/* Placeholder for chart */}
                <div className="text-center">
                  <p className="text-lg font-medium">
                    Gráfico de Produção por Período
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {fromDate && toDate
                      ? `Dados de ${format(fromDate, "dd/MM/yyyy")} até ${format(toDate, "dd/MM/yyyy")}`
                      : "Selecione um período para visualizar os dados"}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">Período</th>
                      <th className="p-2 text-left">Quantidade (kg)</th>
                      <th className="p-2 text-left">Valor Total (R$)</th>
                      <th className="p-2 text-left">Média por Produtor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Janeiro/2024</td>
                      <td className="p-2">1.250</td>
                      <td className="p-2">R$ 25.000,00</td>
                      <td className="p-2">125 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Fevereiro/2024</td>
                      <td className="p-2">1.420</td>
                      <td className="p-2">R$ 28.400,00</td>
                      <td className="p-2">142 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Março/2024</td>
                      <td className="p-2">1.680</td>
                      <td className="p-2">R$ 33.600,00</td>
                      <td className="p-2">168 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="municipality" className="space-y-4">
              <div className="h-[400px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                {/* Placeholder for chart */}
                <div className="text-center">
                  <p className="text-lg font-medium">
                    Gráfico de Produção por Município
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMunicipality
                      ? `Dados de produção para ${selectedMunicipality}`
                      : "Selecione um município para visualizar os dados"}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">Município</th>
                      <th className="p-2 text-left">Quantidade (kg)</th>
                      <th className="p-2 text-left">Nº de Produtores</th>
                      <th className="p-2 text-left">Média por Produtor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">São Paulo</td>
                      <td className="p-2">3.250</td>
                      <td className="p-2">15</td>
                      <td className="p-2">216,7 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Rio de Janeiro</td>
                      <td className="p-2">2.840</td>
                      <td className="p-2">12</td>
                      <td className="p-2">236,7 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Belo Horizonte</td>
                      <td className="p-2">2.100</td>
                      <td className="p-2">10</td>
                      <td className="p-2">210,0 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="producer" className="space-y-4">
              <div className="h-[400px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                {/* Placeholder for chart */}
                <div className="text-center">
                  <p className="text-lg font-medium">
                    Gráfico de Produção por Produtor
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProducer
                      ? `Dados de produção para ${selectedProducer}`
                      : "Selecione um produtor para visualizar os dados"}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">Produtor</th>
                      <th className="p-2 text-left">Município</th>
                      <th className="p-2 text-left">Quantidade (kg)</th>
                      <th className="p-2 text-left">Valor Total (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">João Silva</td>
                      <td className="p-2">São Paulo</td>
                      <td className="p-2">850</td>
                      <td className="p-2">R$ 17.000,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Maria Oliveira</td>
                      <td className="p-2">Rio de Janeiro</td>
                      <td className="p-2">720</td>
                      <td className="p-2">R$ 14.400,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Carlos Santos</td>
                      <td className="p-2">Belo Horizonte</td>
                      <td className="p-2">680</td>
                      <td className="p-2">R$ 13.600,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Total de registros: 42
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <Download className="h-4 w-4 mr-1" /> Excel
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" /> Imprimir
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComparativeReport;
