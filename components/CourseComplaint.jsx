import { Box, Button, FormControl, useToast,Text, Flex,GridItem,FormLabel,Select, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as URL from '@/constants'
import axios from "axios";

export default function CourseComplaint() {
    const form = useForm({
        defaultValues: {
          complaint: "",
          complaint_type: 1    
          }
    });
    const { register,handleSubmit,reset } = form;
    const toast = useToast()
    
    const createComplaint = async ({variables}) =>{
      console.log(variables);
        return axios.post(`${URL.API_URL}/complaints`,{
            complaint_type_id: variables.complaint_type,
            complaint_description: variables.complaint
        },{headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}).then(res => res.data)
  
      }


    const mutation = useMutation({
        mutationFn: createComplaint,
        retry: 2,
        onSuccess: () => {
          toast({
            title: 'تم إرسال شكواك',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        },  
        })
  
      const onSubmit = (data) => {
        mutation.mutate({variables:data})
        reset();
      }
  
  return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box bg={"gray.50"}  width={{base:"100%",md:"60%"}} marginTop={"12px"} marginX={{base:"10px",md:"10%"}} borderRadius={"7px"} >
            <Flex alignItems={"flex-start"} backgroundColor={"gray.50"} direction={"column"} >
            <Box padding={"0px"} h={"0px"} marginBottom={"50px"}>
                <Text>هل لديك شكوى متعلقة بهذه الدورة ؟ قم بكتابتها</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="complaint_type"
                  fontSize="md"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}>
                  نوع الشكوى
                </FormLabel>
                <Select
                  id="complaint_type"
                  name="complaint_type"
                  autoComplete="complaint_type"
                  placeholder="Select option"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="lg"
                  rounded="md" 
                  {...register("complaint_type" , {
                    required: {
                      value: true,
                      message: "يجب تعبئة هذا الحقل"
                    }
                  })}>
                  <option value={2}>الدورة</option>
                  <option value={1}>المنصة</option>
                </Select>
              </FormControl>
            <FormControl width={{base:"300px",md:"500px"}} marginY={"20px"}>
                <Textarea  width={"100%"} id='complaint' type="text" {...register("complaint")} />
            </FormControl> 
            <Button
            type='submit'
            padding={"10px"}
            loadingText="Submitting"
            bg={'orange.600'}
            color={'white'}
            _hover={{
                bg: 'orange',
            }}>
            إضافة شكوى
            </Button>
            </Flex>
            </Box>
        </form>
        
  )
}

