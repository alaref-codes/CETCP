import { Box, Button, FormControl, useToast,Text, Flex, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as URL from '@/constants'
import axios from "axios";
import { useRouter } from 'next/router';

export default function Comment({lectureId,values}) {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            comment: "",    
          },
          values
    });
    const { register,handleSubmit,reset } = form;
    const toast = useToast()
    
    const createComment = async ({variables}) =>{
        return axios.post(`${URL.API_URL}/comments`,{
            course_lecture_id: lectureId,
            comment: variables.comment
        },{headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}).then(res => res.data)
      }


    const mutation = useMutation({
        mutationFn: createComment,
        retry: 2,
        onSuccess: () => {
          console.log("success");
          toast({
            position: 'top',
            title: 'تم إرسال تعليقك',
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
            <Box padding={"0px"} h={"0px"} marginBottom={"10px"}>
                <Text>قم بكتابة تعليقك</Text>
            </Box>
            <FormControl width={{base:"300px",md:"500px"}} marginY={"20px"}>
                <Textarea  required width={"100%"} placeholder="أضف تعليقك هنا"  id='comment' type="text" {...register("comment")} />
            </FormControl> 
            <Button
              type='submit'
              loadingText="Submitting"
              bg={'gray.200'}
              color={'linkedin.700'}
              _hover={{
                  bg: 'blue.500',
            }}>
            إضافة تعليق
            </Button>
            </Flex>
            </Box>
        </form>
        
  )
}

