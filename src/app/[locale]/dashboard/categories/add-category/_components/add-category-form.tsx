'use client';

import { useTranslations } from 'next-intl';

import { useAddCategory } from '../_hooks/use-add-category';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCategorySchema } from '@/lib/schemas/categories.schema';
import { AddCategoryFormData } from '@/lib/types/categories';

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
import InputFile from '@/components/shared/input-file';
import { Button } from '@/components/ui/button';
import { ErrorBox } from '@/components/shared/error-box';

export function AddCategoryForm() {
  // Translation
  const categoriesTranslations = useTranslations('dashboard.categories');

  // Form
  const form = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategorySchema(categoriesTranslations)),
    defaultValues: {
      name: '',
      image: null,
    },
  });

  // Mutations
  const {
    mutate: addCategory,
    isPending,
    error: addCategoryError,
  } = useAddCategory();

  // Functions
  const onSubmit = async (data: AddCategoryFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);

    addCategory(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl">
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

        {/* Category Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>{categoriesTranslations('category-image')}</FormLabel>

              <FormControl>
                <InputFile
                  existingFileUrl={field.value}
                  onChange={e => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Backend Validation Error */}
        <div className="h-32 flex flex-col pb-6">
          {addCategoryError && (
            <ErrorBox error={addCategoryError.message} className="mt-auto" />
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-end">
          <Button type="submit" loading={isPending}>
            {categoriesTranslations('add-category')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
