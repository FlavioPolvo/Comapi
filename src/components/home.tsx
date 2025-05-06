import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart3,
  Users,
  Package,
  FileText,
  Home,
  Settings,
} from "lucide-react";
import ProductionSummary from "./Dashboard/ProductionSummary";
import EntryForm from "./EntryControl/EntryForm";
import ProducerForm from "./Producers/ProducerForm";
import ComparativeReport from "./Reports/ComparativeReport";

const HomePage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation sidebar */}
      <div className="fixed inset-y-0 left-0 w-16 bg-card border-r flex flex-col items-center py-4 gap-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          <span>AP</span>
        </div>

        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          size="icon"
          onClick={() => setActiveTab("dashboard")}
          className="rounded-full"
        >
          <Home className="h-5 w-5" />
        </Button>

        <Button
          variant={activeTab === "producers" ? "default" : "ghost"}
          size="icon"
          onClick={() => setActiveTab("producers")}
          className="rounded-full"
        >
          <Users className="h-5 w-5" />
        </Button>

        <Button
          variant={activeTab === "entry" ? "default" : "ghost"}
          size="icon"
          onClick={() => setActiveTab("entry")}
          className="rounded-full"
        >
          <Package className="h-5 w-5" />
        </Button>

        <Button
          variant={activeTab === "reports" ? "default" : "ghost"}
          size="icon"
          onClick={() => setActiveTab("reports")}
          className="rounded-full"
        >
          <FileText className="h-5 w-5" />
        </Button>

        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-16 w-full">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container flex items-center justify-between h-16 px-4">
            <h1 className="text-xl font-semibold">
              Sistema de Gestão de Produção Apícola
            </h1>

            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  <span>U</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container py-6 px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="producers"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Produtores
              </TabsTrigger>
              <TabsTrigger value="entry" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Controle de Entrada
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total de Produção</CardTitle>
                    <CardDescription>Produção total de mel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1.250 kg</div>
                    <p className="text-sm text-muted-foreground">
                      +15% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Produtores Ativos</CardTitle>
                    <CardDescription>
                      Total de produtores cadastrados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">48</div>
                    <p className="text-sm text-muted-foreground">
                      +3 novos este mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Média por Produtor</CardTitle>
                    <CardDescription>
                      Produção média por produtor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">26 kg</div>
                    <p className="text-sm text-muted-foreground">
                      +2kg em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              </div>

              <ProductionSummary />
            </TabsContent>

            <TabsContent value="producers">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastro de Produtores</CardTitle>
                  <CardDescription>
                    Gerencie os dados dos produtores apícolas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProducerForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entry">
              <Card>
                <CardHeader>
                  <CardTitle>Controle de Entrada</CardTitle>
                  <CardDescription>
                    Registre a entrada de produtos apícolas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EntryForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Comparativos</CardTitle>
                  <CardDescription>
                    Analise e compare dados de produção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparativeReport />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
