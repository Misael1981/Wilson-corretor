import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import CardRecentlyAdded from "../CardRecentlyAdded";

import {
  RecentlyAddedContainer,
  RecentlyAddedTitle,
  RecentlyAddedList,
} from "./RecentlyAddedStyles";

const RecentlyAdded = () => {
  const [recentProperties, setRecentProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const q = query(
          collection(db, "properties"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const querySnapshot = await getDocs(q);
        const fetchedProperties = [];
        querySnapshot.forEach((doc) => {
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });
        setRecentProperties(fetchedProperties);
      } catch (err) {
        console.error("Erro ao buscar imóveis recentes:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProperties();
  }, []);

  if (isLoading)
    return (
      <RecentlyAddedContainer>
        <p>Carregando imóveis recentes...</p>
      </RecentlyAddedContainer>
    );
  if (error)
    return (
      <RecentlyAddedContainer>
        <p>Erro ao carregar imóveis recentes: {error.message}</p>
      </RecentlyAddedContainer>
    );
  if (!recentProperties || recentProperties.length === 0)
    return (
      <RecentlyAddedContainer>
        <p>Nenhum imóvel recente encontrado.</p>
      </RecentlyAddedContainer>
    );

  return (
    <RecentlyAddedContainer>
      <RecentlyAddedTitle>Adicionados Recentemente</RecentlyAddedTitle>
      <RecentlyAddedList>
        {recentProperties.map((property) => (
          <CardRecentlyAdded key={property.id} propertyData={property} />
        ))}
      </RecentlyAddedList>
    </RecentlyAddedContainer>
  );
};

export default RecentlyAdded;
