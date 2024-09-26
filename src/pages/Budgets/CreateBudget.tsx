import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { api } from "@/lib/api";


// Definir o esquema de validação usando Zod
const budgetSchema = z.object({
  clientName: z.string().min(1, "O nome do cliente é obrigatório"),
  budgetItems: z.array(
    z.object({
      description: z.string().min(1, "A descrição é obrigatória"),
      unitValue: z.coerce.number().min(0.01, "O valor unitário deve ser maior que zero"),
      quantity: z.coerce.number().min(1, "A quantidade deve ser pelo menos 1"),
    })
  ),
});

// Tipos derivados do esquema Zod
type BudgetFormData = z.infer<typeof budgetSchema>;

const CreateBudget: React.FC = () => {
  const navigate = useNavigate();
  
  // Configuração do react-hook-form com validação usando Zod
  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      clientName: "",
      budgetItems: [{ description: "", unitValue: 0, quantity: 1 }],
    },
  });

  // Usando useFieldArray para gerenciar os itens de orçamento dinâmicos
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "budgetItems",
  });

  // Função de envio de formulário
  const onSubmit = async (data: BudgetFormData) => {
    try {

        await api.post('/budget', data)

        navigate("/budgets");
    } catch (error) {
        console.error("Error:", error);
        alert("Houve um erro ao enviar os dados do orçamento.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Criar Orçamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form }>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="clientName" render={({field}) => (
                    <FormItem>
                    <FormLabel>Nome do Cliente</FormLabel>
                    <FormControl>
                    <Input
                        type="text"
                        placeholder="Digite o nome do cliente"
                        { ...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />

                Itens do orçamento
                <div className="space-y-4">
                {fields.map((item, index) => (
                    <div key={item.id} className="flex space-x-4 items-center">
                        <FormField name={`budgetItems.${index}.description`} control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    {...field}
                                    placeholder="Descrição do item"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name={`budgetItems.${index}.unitValue`} control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Valor Unitário</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="Valor unitário"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name={`budgetItems.${index}.quantity`} control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="Quantidade"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="mt-4"
                    >
                        Remover
                    </Button>
                    </div>
                ))}
                </div>

                {/* Botões de adicionar item e enviar */}
                <div className="flex justify-between">
                <Button type="button" onClick={() => append({ description: "", unitValue: 0, quantity: 1 })}>
                    Adicionar Item
                </Button>
                <Button type="submit">Enviar Orçamento</Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBudget;
