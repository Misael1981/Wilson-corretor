import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore"; // Importe orderBy e limit se for usar ordenação/limite
import { db } from "@/firebase.js"; // Assumindo que firebase.js exporta 'db'
import { Link } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const DashboardContainer = styled.div`
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: #f8f9fa; /* Cor de fundo clara para o dashboard */
  min-height: 100%; /* Garante que o container ocupe a altura disponível */
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Espaçamento entre as seções */

  h1 {
    color: var(--color-blue);
    text-align: center;
    font-size: 2rem;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #eee; /* Linha divisória */
  padding-bottom: 0.5rem;
`;

const SummaryCardsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Layout responsivo de grid */
  gap: 1.5rem; /* Espaçamento entre os cards */
`;

// Estilo base para cada card
const Card = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Sombra suave */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 150px; /* Altura mínima para consistência */
`;

const CardTitle = styled.h3`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
`;

const CardValue = styled.p`
  color: var(--color-blue, #0f1e2e); /* Cor principal do seu tema */
  font-size: 2.5rem;
  font-weight: bold;
`;

const QuickActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Layout responsivo de grid */
  gap: 1.5rem;
`;

// Estilo para cada botão de ação rápida
const QuickActionButton = styled(Link)`
  background-color: var(--color-golden, #f39c12); /* Cor dourada do seu tema */
  color: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 0.8rem;
  text-decoration: none; /* Remove sublinhado do link */
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Transições suaves */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para profundidade */

  &:hover {
    background-color: var(
      --color-dark-orange,
      #e67e22
    ); /* Cor mais escura no hover */
    transform: translateY(-3px); /* Efeito de "levantar" no hover */
  }
`;

// Container para a seção de atividade recente
const RecentActivityContainer = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

// Lista de atividades
const ActivityList = styled.ul`
  list-style: none; /* Remove marcadores da lista */
  padding: 0;
  margin: 0;
`;

// Item individual da atividade
const ActivityItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee; /* Linha divisória entre itens */
  color: #666;
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none; /* Remove a linha do último item */
  }
`;

// Container para os gráficos
const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Layout responsivo de grid */
  gap: 1.5rem;
`;

// Card específico para gráficos (herda do Card base)
const ChartCard = styled(Card)`
  padding: 1rem;
  min-height: 300px; /* Altura mínima para o gráfico */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch; /* Estica o gráfico para preencher o card */
`;

const AdminDashboardPage = () => {
  // Estados para armazenar os dados das estatísticas
  const [totalProperties, setTotalProperties] = useState(0);
  const [pendingProperties, setPendingProperties] = useState(0);
  const [newUsersLast7Days, setNewUsersLast7Days] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [mostViewedProperties, setMostViewedProperties] = useState([]); // Placeholder

  // Dados mockados para atividades recentes (substituir por dados reais do Firestore/API)
  const [recentActivities, setRecentActivities] = useState([
    "Imóvel 'Apartamento Centro' foi atualizado por Admin.",
    "Novo usuário 'Ana Paula' cadastrado.",
    "Artigo 'Melhores bairros para investir' publicado.",
    "Imóvel 'Casa com Piscina' foi marcado como vendido.",
  ]);

  console.log(
    mostViewedProperties,
    setMostViewedProperties,
    setRecentActivities
  );

  // Dados mockados para os gráficos (substituir por dados reais do Firestore)
  const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Fev", users: 300 },
    { name: "Mar", users: 600 },
    { name: "Abr", users: 800 },
    { name: "Mai", users: 1200 },
    { name: "Jun", users: 1500 },
    { name: "Jul", users: 1800 },
  ];

  const propertiesByTypeData = [
    { name: "Casas", count: 120 },
    { name: "Apartamentos", count: 85 },
    { name: "Terrenos", count: 40 },
    { name: "Comerciais", count: 15 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Buscar Total de Imóveis Cadastrados
        const propertiesCollection = collection(db, "properties"); // Assumindo coleção 'properties'
        const propertiesSnapshot = await getDocs(propertiesCollection);
        setTotalProperties(propertiesSnapshot.size);

        // 2. Buscar Imóveis Pendentes de Aprovação
        // Assumindo que imóveis têm um campo 'status'
        const pendingPropertiesQuery = query(
          propertiesCollection,
          where("status", "==", "pending")
        );
        const pendingPropertiesSnapshot = await getDocs(pendingPropertiesQuery);
        setPendingProperties(pendingPropertiesSnapshot.size);

        // 3. Buscar Novos Usuários Cadastrados (Últimos 7 dias)
        const usersCollection = collection(db, "users"); // Assumindo coleção 'users'
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Calcula a data de 7 dias atrás

        // A data no Firestore pode ser um Timestamp. A comparação direta com Date pode precisar de ajuste.
        // Se 'createdAt' for Timestamp, você pode precisar converter 'sevenDaysAgo' para Timestamp ou comparar com .toDate()
        const newUsersQuery = query(
          usersCollection,
          where("createdAt", ">=", sevenDaysAgo)
        );
        const newUsersSnapshot = await getDocs(newUsersQuery);
        setNewUsersLast7Days(newUsersSnapshot.size);

        // 4. Buscar Total de Artigos Publicados
        const articlesCollection = collection(db, "articles"); // Assumindo coleção 'articles'
        const articlesSnapshot = await getDocs(articlesCollection);
        setTotalArticles(articlesSnapshot.size);

        // 5. Imóveis Mais Visualizados - Placeholder, pois requer integração com analytics ou sistema de contagem
        // setMostViewedProperties (requer lógica de backend ou integração com Google Analytics, etc.)

        // 6. Atividade Recente - Por enquanto, dados mockados.
        // Para dados reais, você precisaria de uma coleção 'activities' que registra ações.
        // setRecentActivities (requer uma coleção ou lógica de log de atividades)
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        // Você pode definir estados de erro aqui para exibir uma mensagem ao usuário
      }
    };

    fetchData();
  }, []);
  return (
    <DashboardContainer>
      <h1>Dashboard Administrativo</h1>
      <SectionTitle>Visão Geral</SectionTitle>
      <SummaryCardsContainer>
        <Card>
          <CardTitle>Imóveis Ativos</CardTitle>
          <CardValue>{totalProperties}</CardValue>
        </Card>
        <Card>
          <CardTitle>Imóveis Pendentes</CardTitle>
          <CardValue>{pendingProperties}</CardValue>
        </Card>
        <Card>
          <CardTitle>Novos Usuários (7 dias)</CardTitle>
          <CardValue>{newUsersLast7Days}</CardValue>
        </Card>
        <Card>
          <CardTitle>Artigos Publicados</CardTitle>
          <CardValue>{totalArticles}</CardValue>
        </Card>
        <Card>
          <CardTitle>Imóveis Mais Visualizados</CardTitle>
          {/* Este card é um placeholder, pois a métrica de visualizações não está implementada */}
          <CardValue>N/A</CardValue>
          {/* Se você implementar a lógica de visualizações, pode renderizar a lista aqui:
          {mostViewedProperties.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              {mostViewedProperties.map((prop, index) => (
                <li key={index}>{prop.title} ({prop.views} views)</li>
              ))}
            </ul>
          ) : <CardValue>N/A</CardValue>}
          */}
        </Card>
      </SummaryCardsContainer>

      <SectionTitle>Ações Rápidas</SectionTitle>
      <QuickActionsContainer>
        <QuickActionButton to="/admin/imoveis/cadastrar">
          + Cadastrar Novo Imóvel
        </QuickActionButton>
        <QuickActionButton to="/admin/artigos/criar">
          + Escrever Novo Artigo
        </QuickActionButton>
        <QuickActionButton to="/admin/mensagens">
          Ver Mensagens de Contato
        </QuickActionButton>
        <QuickActionButton to="/admin/usuarios">
          Gerenciar Usuários
        </QuickActionButton>
      </QuickActionsContainer>

      <SectionTitle>Atividade Recente</SectionTitle>
      <RecentActivityContainer>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>{activity}</ActivityItem>
          ))}
        </ActivityList>
      </RecentActivityContainer>

      <SectionTitle>Estatísticas</SectionTitle>
      <ChartsContainer>
        <ChartCard>
          <CardTitle>Crescimento de Usuários</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={userGrowthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <CardTitle>Imóveis por Tipo</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={propertiesByTypeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsContainer>
    </DashboardContainer>
  );
};

export default AdminDashboardPage;
