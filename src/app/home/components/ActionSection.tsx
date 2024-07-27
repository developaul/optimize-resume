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

const FormSchema = z.object({
  apikey: z.string().min(10, {
    message: "La api key parece ser muy corta",
  }),
  jobPost: z.string(),
  cvFile: z.any(),
});

const ActionSection = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apikey: "",
      jobPost: "",
      cvFile: undefined,
    },
  });

  function onSubmit(_data: z.infer<typeof FormSchema>) {
    console.log("submit");
  }

  return (
    <div className="bg-gray-100 p-4 overflow-auto">
      <div className="w-full max-w-screen-xl m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="apikey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API KEY</FormLabel>
                  <FormControl>
                    <Input
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
              name="jobPost"
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
                      TxtHelper="Archivo formato .pdf máximo 1 MB"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button className="bg-blue hover:bg-purple-500" type="submit">
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
