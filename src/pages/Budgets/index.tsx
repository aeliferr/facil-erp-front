import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

interface Budget {
  id: string;
  clientName: string;
  vendor: {
    fullName: string;
  };
  budgetItems: Array<{
    description: string;
    unitValue: number;
    quantity: number;
  }>;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get("/budget");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const editBudget = (budgetId: string) => {
    navigate(`/update-budget/${budgetId}`);
  };

  const createNewBudget = () => {
    navigate(`/create-budget`);
  };

  const calculateBudgetTotalValue = (budgetItems: Budget["budgetItems"]) => {
    return budgetItems.reduce((total, item) => total + item.quantity * item.unitValue, 0);
  };

  const printBudget = async (budgetId: string) => {
    try {
      const response = await api.get(`/budget/${budgetId}/print`, {
        responseType: "blob",
      });

      const pdfUrl = URL.createObjectURL(response.data);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error printing budget:", error);
    }
  };

  const printContract = async (budgetId: string) => {
    try {
      const response = await api.get(`/contract/from-budget/${budgetId}/print`, {
        responseType: "blob",
      });

      const pdfUrl = URL.createObjectURL(response.data);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error printing contract:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Lista de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button onClick={createNewBudget}>Criar Novo Orçamento</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.clientName}</TableCell>
                  <TableCell>{budget.vendor.fullName}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(calculateBudgetTotalValue(budget.budgetItems))}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => printBudget(budget.id)}
                    >
                      Imprimir
                    </Button>
                    <Button onClick={() => editBudget(budget.id)}>Editar</Button>
                    <Button onClick={() => printContract(budget.id)}>Imprimir Contrato</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Budgets;
