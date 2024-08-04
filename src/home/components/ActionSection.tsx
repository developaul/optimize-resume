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
import { FC } from "react";

export const FormSchema = z.object({
  apikey: z.string().min(10, {
    message: "La api key parece ser muy corta",
  }),
  jobUrl: z.string(),
  cvFile: z.any(),
});

interface ActionSectionProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const ActionSection: FC<ActionSectionProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apikey: "",
      jobUrl: "",
      cvFile: [],
    },
  });

  return (
    <div className="p-4 overflow-auto">
      <div className="w-full max-w-screen-xl m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="apikey"
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API KEY</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      type="password"
                      placeholder="xxxx-xxxxx-xxxxx-xxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>No sera guardada.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobUrl"
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
                          <span className="small text-neutral-400">
                            Formato .pdf
                          </span>
                          <span className="small text-neutral-400">
                            Maximo 10 MB
                          </span>
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
