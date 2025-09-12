"use client";

import { useState } from "react";
import { Language, languages, LANGUAGE_STORAGE_KEY, defaultLanguage } from "@/configs/i18n.config";

export const useLanguage = () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
        // Initialize with localStorage value if available, otherwise use default
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
            return saved && languages.includes(saved) ? saved : defaultLanguage;
        }
        return defaultLanguage;
    });

    const changeLanguage = (newLanguage: Language) => {
        if (!languages.includes(newLanguage)) return;

        // Save to localStorage
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        setCurrentLanguage(newLanguage);
    };

    return {
        currentLanguage,
        changeLanguage,
        languages,
    };
};
