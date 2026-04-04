"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <SidebarContext.Provider value={{ 
      isMenuOpen, 
      setIsMenuOpen, 
      categories, 
      setCategories,
      activeCategory,
      setActiveCategory
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
