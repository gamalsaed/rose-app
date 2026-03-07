'use client';

import { useTranslations } from 'next-intl';

import { useUpdateCategory } from '../_hooks/use-update-category';
import { Category } from '@/lib/types/categories';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateCategorySchema } from '@/lib/schemas/categories.schema';
import { UpdateCategoryFormData } from '@/lib/types/categories';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorBox } from '@/components/shared/error-box';

import { Image as ImageIcon } from 'lucide-react';

type UpdateCategoryFormProps = {
  category: Category;
};

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  // Translations
  const categoriesTranslations = useTranslations('dashboard.categories');

  // Mutations
  const { updateCategory, updateCategoryLoading, updateCategoryError } =
    useUpdateCategory();

  // Form
  const form = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategorySchema(categoriesTranslations)),
    defaultValues: {
      name: category.name,
    },
  });

  // Functions
  const onSubmit = (data: UpdateCategoryFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);

    updateCategory({
      id: category._id,
      formData,
    });
  };

  const handleViewCategoryImage = () => {
    // TODO: integrate with image viewer once merged on dev branch
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        {/* Category Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>{categoriesTranslations('name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12"
                  error={!!error}
                  placeholder={categoriesTranslations('name-placeholder')}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display Category Image */}
        <Button
          type="button"
          variant={'outline'}
          className="w-fit ms-auto mt-4 border-black/10 text-blue-600 hover:bg-white"
          onClick={handleViewCategoryImage}
        >
          <ImageIcon /> {categoriesTranslations('view-category-image')}
        </Button>

        {/* Backend Validation Error */}
        <div className="h-32 flex flex-col pb-6">
          {updateCategoryError && (
            <ErrorBox error={updateCategoryError.message} />
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-end">
          <Button type="submit" loading={updateCategoryLoading}>
            {categoriesTranslations('update-category')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
