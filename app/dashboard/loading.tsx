'use client'
import { Skeleton, SkeletonCircle, SkeletonText,Box } from '@chakra-ui/react'

const Header=()=>{
    return(
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    )
}

const Loading=()=>{
    return(
        <div className='h-screen bg-white'>
        <Header/>
        </div>
    )
}
export default Loading