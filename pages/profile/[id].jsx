import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import Loading from '@/components/Loading';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import * as URL from '@/constants'
  import { AuthContext } from '@/context/AuthContext';
  import { useForm } from 'react-hook-form';
  import { useToast } from '@chakra-ui/react';
  import { 
    useQuery,
    useMutation
  } from '@tanstack/react-query';
import React from 'react';
import { useRouter } from 'next/router';
import ProfileForm from '@/components/ProfileForm';

  async function getUserData(token) {
  return await fetch(`${URL.API_URL}/user-show`, {
    headers: {'Authorization': `Bearer ${token}`} })
  .then(res => res.json())
  .catch(err => {
    console.log(err);
  })
}

  export default function ProfilePage() {
    const { isLoggedIn, token } = React.useContext(AuthContext);
    const [data, setData] = React.useState(undefined);
    const router = useRouter();
    const toast = useToast();
    let form = useForm();

    React.useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("token") != "null") {
          localStorage.setItem("token", localStorage.getItem("token"))
          getUserData(localStorage.getItem("token")).then((data) => {
            setData(data);
          });
        } else { 
          router.push("/signin");
        }
    },[])

    if (data) {
      form = useForm({
        defaultValues: {
          username: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
          birthday: data.data.birthday
        }
      });
    } else {
      form = useForm({
        defaultValues: {
          username: "",
          email: "",
          phone: "",
          birthday: ""
        }
      });
    }

    const mutation = useMutation({
      mutationFn: () => {console.log("hello world");},
      retry: 2,
      onSuccess: () => {
        toast({
          position: 'top',
          title: 'تم تحديث الحساب بنجاح',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      },

      })

 
    const onSubmit = (data) => {
      mutation.mutate({variables:data})
    }

    if (!data) {
      return <Loading/>
    }

    return (
      <Flex
        minH={'90vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        {data && <ProfileForm user={data.data} ></ProfileForm>}
      </Flex>
    );
  }
  