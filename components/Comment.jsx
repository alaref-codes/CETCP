import { Box, Button, FormControl, useToast,FormLabel,Text, Flex, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
export default function Comment() {
    const form = useForm();
    const { register,handleSubmit } = form;
    const toast = useToast()

    const onSubmit = (values) => {
        toast({
            title: 'تم إرسال تعليقك',
            status: 'success',
            duration: 6000,
            isClosable: true,
          })

    }
  
  
  return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box bg={"gray.50"}  width={{base:"100%",md:"60%"}} marginTop={"12px"} marginX={{base:"10px",md:"10%"}} borderRadius={"7px"} >
            <Flex alignItems={"flex-start"} backgroundColor={"gray.50"} direction={"column"} >
            <Box padding={"0px"} h={"0px"} marginBottom={"10px"}>
                <Text>قم بكتابة تعليقك</Text>
            </Box>
            <FormControl width={"500px"} marginY={"20px"}>
                <Textarea  placeholder="أضف تعليقك هنا"  id='firstName' type="text" {...register("firstName")} />
            </FormControl> 
            <Button
            type='submit'
            loadingText="Submitting"
            width={"15%"}
            bg={'blue.400'}
            color={'white'}
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

