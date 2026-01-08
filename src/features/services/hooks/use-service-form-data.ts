'use client';

import { useState, useEffect } from 'react';
import {
  getAllCategories,
  getSkillsByCategory,
  getAllUpgradeTypes,
} from '../actions/service-post.actions';
import {
  Category,
  Skill,
  UpgradeType,
} from '../schema/service-post.schema';

interface UseServiceFormDataReturn {
  categories: Category[];
  skills: Skill[];
  upgradeTypes: UpgradeType[];
  isLoadingCategories: boolean;
  isLoadingSkills: boolean;
  isLoadingUpgrades: boolean;
  errorCategories: string | null;
  errorSkills: string | null;
  errorUpgrades: string | null;
  refetchCategories: () => Promise<void>;
  refetchSkills: (categoryId: string) => Promise<void>;
  refetchUpgrades: () => Promise<void>;
}

/**
 * Custom hook for managing service form data fetching
 * Handles categories, skills, and upgrade types with loading and error states
 * 
 * @param selectedCategoryId - Optional category ID to fetch skills for
 * @returns Object containing data, loading states, error states, and refetch functions
 */
export const useServiceFormData = (
  selectedCategoryId?: string
): UseServiceFormDataReturn => {
  // State for data
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [upgradeTypes, setUpgradeTypes] = useState<UpgradeType[]>([]);

  // Loading states
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(false);
  const [isLoadingUpgrades, setIsLoadingUpgrades] = useState<boolean>(false);

  // Error states
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [errorSkills, setErrorSkills] = useState<string | null>(null);
  const [errorUpgrades, setErrorUpgrades] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setErrorCategories(null);

      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load categories. Please try again.';
        setErrorCategories(errorMessage);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch skills when selectedCategoryId changes
  useEffect(() => {
    if (!selectedCategoryId) {
      setSkills([]);
      return;
    }

    const fetchSkills = async () => {
      setIsLoadingSkills(true);
      setErrorSkills(null);

      try {
        const data = await getSkillsByCategory(selectedCategoryId);
        setSkills(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load skills. Please try again.';
        setErrorSkills(errorMessage);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchSkills();
  }, [selectedCategoryId]);

  // Fetch upgrade types on mount
  useEffect(() => {
    const fetchUpgrades = async () => {
      setIsLoadingUpgrades(true);
      setErrorUpgrades(null);

      try {
        const data = await getAllUpgradeTypes();
        setUpgradeTypes(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load upgrades. You can continue without upgrades.';
        setErrorUpgrades(errorMessage);
        // Allow form continuation even if upgrades fail to load
      } finally {
        setIsLoadingUpgrades(false);
      }
    };

    fetchUpgrades();
  }, []);

  // Refetch functions
  const refetchCategories = async (): Promise<void> => {
    setIsLoadingCategories(true);
    setErrorCategories(null);

    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load categories. Please try again.';
      setErrorCategories(errorMessage);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const refetchSkills = async (categoryId: string): Promise<void> => {
    setIsLoadingSkills(true);
    setErrorSkills(null);

    try {
      const data = await getSkillsByCategory(categoryId);
      setSkills(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load skills. Please try again.';
      setErrorSkills(errorMessage);
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const refetchUpgrades = async (): Promise<void> => {
    setIsLoadingUpgrades(true);
    setErrorUpgrades(null);

    try {
      const data = await getAllUpgradeTypes();
      setUpgradeTypes(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load upgrades. You can continue without upgrades.';
      setErrorUpgrades(errorMessage);
    } finally {
      setIsLoadingUpgrades(false);
    }
  };

  return {
    categories,
    skills,
    upgradeTypes,
    isLoadingCategories,
    isLoadingSkills,
    isLoadingUpgrades,
    errorCategories,
    errorSkills,
    errorUpgrades,
    refetchCategories,
    refetchSkills,
    refetchUpgrades,
  };
};
