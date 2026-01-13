"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ImageUpload } from "./image-upload";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  PortfolioProject,
} from "../schema/portfolio-data";
import {
  portfolioProjectFormSchema,
  PortfolioProjectFormData,
  defaultFormValues,
} from "../schema/portfolio-form.schema";
import {
  createPortfolioProject,
  updatePortfolioProject,
  getCategories,
  getSkills,
} from "../actions/portfolio.actions";

// ============================================
// Types and Interfaces
// ============================================

interface PortfolioProjectFormModalProps {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
  initialData?: PortfolioProject;
  onSuccess: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Skill {
  id: string;
  name: string;
  categoryId?: string;
}


// ============================================
// Main Component
// ============================================

export function PortfolioProjectFormModal({
  mode,
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: PortfolioProjectFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<PortfolioProjectFormData>({
    resolver: zodResolver(portfolioProjectFormSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { formState: { isDirty } } = form;


  // Fetch categories and skills on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Fetch skills when category changes
  useEffect(() => {
    const fetchSkills = async () => {
      if (!selectedCategoryId) {
        setSkills([]);
        setSelectedSkills([]); // Reset selected skills when no category
        return;
      }

      try {
        // Reset selected skills when category changes
        setSelectedSkills([]);
        
        const skillsData = await getSkills(selectedCategoryId);
        setSkills(skillsData);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        toast.error("Failed to load skills");
      }
    };

    fetchSkills();
  }, [selectedCategoryId]);

  // Populate form with initial data in edit mode
  useEffect(() => {
    if (isOpen && mode === "edit" && initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        clientName: initialData.client.name || "",
        thumbnailUrl: initialData.images.thumbnail || "",
        liveUrl: initialData.links.live || "",
        githubUrl: initialData.links.github || "",
        demoUrl: initialData.links.demo || "",
      });
      
      // Find category ID from slug for skills fetching
      const category = categories.find(cat => cat.slug === initialData.category);
      if (category) {
        setSelectedCategoryId(category.id);
      }
      
      // Convert skills to Option format for MultipleSelector
      if (initialData.skills && initialData.skills.length > 0) {
        const skillOptions: Option[] = initialData.skills.map(skill => ({
          value: skill.id,
          label: skill.name,
        }));
        setSelectedSkills(skillOptions);
      }
    } else if (isOpen && mode === "create") {
      form.reset(defaultFormValues);
      setSelectedCategoryId("");
      setSelectedSkills([]);
    }
  }, [isOpen, mode, initialData, form, categories]);


  // Handle modal close with unsaved changes check
  const handleClose = () => {
    if (isDirty && !isSubmitting) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
      form.reset();
    }
  };

  // Confirm close without saving
  const handleConfirmClose = () => {
    setShowUnsavedDialog(false);
    onClose();
    form.reset();
  };

  // Cancel close dialog
  const handleCancelClose = () => {
    setShowUnsavedDialog(false);
  };

  // Handle form submission
  const handleSubmit = async (data: PortfolioProjectFormData, isDraft: boolean = false) => {
    try {
      setIsSubmitting(true);

      // Transform selected skills from Option[] to skill IDs (string[])
      const skillIds = selectedSkills.map(skill => skill.value);

      // Transform form data to API format
      const apiData: any = {
        title: data.title,
        description: data.description,
        category: data.category,
        status: isDraft ? "concept" : "completed", // Default to completed
        featured: false,
        thumbnailUrl: data.thumbnailUrl || null,
        galleryUrls: [],
        technologies: [],
        skillIds: skillIds.length > 0 ? skillIds : undefined, // Only send if there are skills
        clientName: data.clientName || null,
        clientIndustry: null,
        clientLocation: null,
        testimonialText: null,
        testimonialRating: null,
        startDate: null,
        endDate: null,
        duration: null,
        challenge: null,
        solution: null,
        results: [],
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        demoUrl: data.demoUrl || null,
        casestudyUrl: null,
        budget: null,
        teamSize: null,
        deliveryTime: null,
        tags: [],
      };

      if (mode === "create") {
        await createPortfolioProject(apiData);
        toast.success(isDraft ? "Portfolio saved as draft" : "Portfolio project created successfully");
      } else {
        await updatePortfolioProject(initialData!.id, apiData);
        toast.success(isDraft ? "Portfolio saved as draft" : "Portfolio project updated successfully");
      }

      form.reset();
      setSelectedSkills([]);
      setSelectedCategoryId("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save portfolio project:", error);
      toast.error("Failed to save portfolio project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle save button click
  const handleSave = form.handleSubmit((data) => handleSubmit(data, false));

  // Handle save as draft button click
  const handleSaveAsDraft = form.handleSubmit((data) => handleSubmit(data, true));

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {mode === "create" ? "Add New Portfolio Project" : "Edit Portfolio Project"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Showcase your work by adding a new portfolio project"
                : "Update your portfolio project details"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6 py-4">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project title (5-100 characters)"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project (20-2000 characters)"
                          rows={6}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/2000 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Find the category ID from the slug
                          const category = categories.find(cat => cat.slug === value);
                          if (category) {
                            setSelectedCategoryId(category.id);
                          }
                        }}
                        value={field.value}
                        disabled={isSubmitting || isLoadingData}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={isLoadingData ? "Loading categories..." : "Select a category"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Skills Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
                
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel>Skills (Optional)</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={selectedSkills}
                          onChange={setSelectedSkills}
                          options={skills.map(skill => ({
                            value: skill.id,
                            label: skill.name,
                          }))}
                          placeholder={
                            !selectedCategoryId 
                              ? "Select a category first" 
                              : skills.length === 0 
                              ? "No skills available for this category" 
                              : "Select skills..."
                          }
                          disabled={isSubmitting || !selectedCategoryId || skills.length === 0}
                          emptyIndicator={
                            <p className="text-center text-sm text-muted-foreground">
                              {!selectedCategoryId 
                                ? "Please select a category first" 
                                : "No skills found for this category"}
                            </p>
                          }
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        {selectedCategoryId 
                          ? "Select skills relevant to your project" 
                          : "Select a category to see available skills"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Company/Client Name Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Client Information</h3>
                
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Client Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company or client name"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Thumbnail Image Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Project Image</h3>
                
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail Image URL (Optional)</FormLabel>
                      <FormControl>
                        <ImageUpload
                          type="thumbnail"
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Enter image URL (e.g., from Unsplash)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Links Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Project Links</h3>
                
                <FormField
                  control={form.control}
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Project URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Repository URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://github.com/username/repo"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://demo.example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsDraft}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : mode === "create" ? "Create Project" : "Update Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Confirmation Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close without saving?
              All changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>
              Continue Editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
