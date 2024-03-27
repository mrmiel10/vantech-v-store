import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const SearchBar = () => {
    const Router = useRouter()
  const formValidateSearch = z.object({
    searchTerm: z.string({}).trim(),
  });
  const form = useForm<z.infer<typeof formValidateSearch>>({
    resolver: zodResolver(formValidateSearch),
    defaultValues: {
      searchTerm: "",
    },
  });


  function onSubmit(values: z.infer<typeof formValidateSearch>) {
    if(!values.searchTerm) return Router.push('/')
  }

  return (
    <div className="flex ">
     
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl id="comment" className={`p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-blue-500 w-80`}>
                      <Input
                        className="peer"
                        id="comment"
                        type="text"
                        {...field}
                      />
                    </FormControl>
              
                  </div>
                
                
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-500 hover:opacity-80 text-white p-2 rounded-r-md flex items-center justify-center">
                <Search className="text-white w-5 h-5" />
            </Button>
            

         
          </form>
        </Form>
     
  
    </div>
  );
};

export default SearchBar;
