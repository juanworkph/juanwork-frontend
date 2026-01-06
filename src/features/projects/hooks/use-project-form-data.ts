'use client';

import { useState, useEffect } from 'react';
import {
  getAllCategories,
  getSkillsByCategory,
  getAllUpgradeTypes,
} from '../actions/project-post.actions';
import {
  Category,
  Skill,
  UpgradeType,
} from '../schema/project-post.schema';
import { filterSkillsByQuery } from '../utils/skill-filter';

interface UseProjectFormDataReturn {
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
  refetchSkills: (categorySlug: string) => Promise<void>;
  refetchUpgrades: () => Promise<void>;
  filterSkills: (query: string, selectedSkills: string[]) => Skill[];
}

export const useProjectFormData = (
  selectedCategorySlug?: string
): UseProjectFormDataReturn => {
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

  // Fetch skills when selectedCategorySlug changes
  useEffect(() => {
    if (!selectedCategorySlug) {
      setSkills([]);
      return;
    }

    const fetchSkills = async () => {
      setIsLoadingSkills(true);
      setErrorSkills(null);

      try {
        const data = await getSkillsByCategory(selectedCategorySlug);
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
  }, [selectedCategorySlug]);

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

  const refetchSkills = async (categorySlug: string): Promise<void> => {
    setIsLoadingSkills(true);
    setErrorSkills(null);

    try {
      const data = await getSkillsByCategory(categorySlug);
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

  // Filter skills based on query and selected skills
  const filterSkills = (query: string, selectedSkills: string[]): Skill[] => {
    return filterSkillsByQuery(skills, query, selectedSkills);
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
    filterSkills,
  };
};
