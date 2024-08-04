import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DropZone from "./DropZone";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormSchema = z.object({
  apiKey: z.string().min(10, {
    message: "La api key parece ser muy corta",
  }),
  jobContent: z.string(),
  cvFile: z.any(),
  keyType: z.enum(["open-ai", "gemini"]),
});

const modelTypes = [
  { value: "open-ai", label: "OpenAI" },
  { value: "gemini", label: "Gemini" },
];

interface ActionSectionProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const ActionSection: FC<ActionSectionProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: "",
      jobContent: "",
      cvFile: [],
      keyType: "open-ai",
    },
  });

  return (
    <div className="p-4 overflow-auto">
      <div className="w-full max-w-screen-xl m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="apiKey"
              disabled={form.formState.isSubmitting}
              render={({ field, formState }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>API KEY</FormLabel>

                    <FormField
                      control={form.control}
                      name={"keyType"}
                      disabled={form.formState.isSubmitting}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger aria-label="Seleciona un modelo">
                                <SelectValue placeholder="Seleciona un modelo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Modelos</SelectLabel>
                                  {modelTypes.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      type="password"
                      placeholder="xxxx-xxxxx-xxxxx-xxxx"
                      {...field}
                    />
                  </FormControl>
                  {Boolean(formState.errors.apiKey) ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>No sera guardada.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobContent"
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Anuncio de empleo al que quieres postular
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Pega el link o el anuncio de empleo"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropZone
                      label="Sube tu cv"
                      TxtHelper={
                        <div className="mt-3 flex flex-col gap-2 text-gray-500">
                          <span className="small">Formato .pdf</span>
                          <span className="small">Maximo 10 MB</span>
                        </div>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                className="bg-blue hover:bg-purple-500 text-neutral-900 font-bold"
                type="submit"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                loadingText="Validando..."
                loading={form.formState.isSubmitting}
              >
                Iniciar análisis
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ActionSection;
