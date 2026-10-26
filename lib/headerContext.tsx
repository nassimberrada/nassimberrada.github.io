"use client";

import React, { createContext, useContext, useState } from "react";

interface HeaderContextType {
  isExploreMode: boolean;
  setIsExploreMode: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedTopic: string;
  setSelectedTopic: (v: string) => void;
  selectedContext: string;
  setSelectedContext: (v: string) => void;
  cardView: "grid" | "list";
  setCardView: (v: "grid" | "list") => void;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedContext, setSelectedContext] = useState("All");
  const [cardView, setCardView] = useState<"grid" | "list">("grid");

  return (
    <HeaderContext.Provider
      value={{
        isExploreMode,
        setIsExploreMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTopic,
        setSelectedTopic,
        selectedContext,
        setSelectedContext,
        cardView,
        setCardView,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    return {
      isExploreMode: false,
      setIsExploreMode: () => {},
      searchQuery: "",
      setSearchQuery: () => {},
      selectedCategory: "All",
      setSelectedCategory: () => {},
      selectedTopic: "All",
      setSelectedTopic: () => {},
      selectedContext: "All",
      setSelectedContext: () => {},
      cardView: "grid",
      setCardView: () => {},
    };
  }
  return context;
}
