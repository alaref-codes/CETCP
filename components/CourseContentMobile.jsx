import {Box,Heading,OrderedList,ListItem,Link} from "@chakra-ui/react"

export default function CourseContentMobile({lectures,course,currentLectureId}) {
  return (
    <Box> 
            <Heading fontSize={"1.7rem"} padding={"10px"} height={"min-content"} borderBottom={"1px solid black"} >محتوى الدورة</Heading>    
            {lectures && course && lectures.map(lecture => (
              
              lecture.id == currentLectureId ? 
              <OrderedList listStyleType={"none"} bg={"gray"} paddingRight={"30px"} 
              _hover={{
                background: "lightgray",
              }}
              >
                <Link key={lecture.id} href={`/coursePage/lecture/${course.data.id}/${lecture.id}`}>
                  <ListItem color={"whiteAlpha.900"}
                  _hover={{
                    color: "black",
                  }}
                  padding={"20px"} paddingRight={"2px"} fontWeight={"extrabold"} fontSize={"1.2rem"} >{lecture.id}  - {lecture.name}</ListItem>
                </Link>
              </OrderedList> : 
              <OrderedList listStyleType={"none"} paddingRight={"30px"}
              _hover={{
                background: "lightgray",
                color: "black",
              }}
              >
                <Link key={lecture.id} href={`/coursePage/lecture/${course.data.id}/${lecture.id}`} >
                  <ListItem bg={"cornsilk.300"} 
                  _hover={{
                    color: "black",
                  }}
                  padding={"20px"} paddingRight={"2px"} fontWeight={"bold"}  >{lecture.id}  - {lecture.name}</ListItem>
                </Link>
              </OrderedList>  
            ))}

            <OrderedList marginRight={"30px"} >

        </OrderedList>
        </Box>
  )
}
