import {Alert, AlertIcon,
    AlertTitle,
    AlertDescription,} from '@chakra-ui/react'
import { ButtonSecondaryMedium } from '../Button'

type MessageProps={
    message:string,
    status:string,
    variant:string,
    title:string
}

export  function InfoMessage({
    message,
    title,
    variant
}:MessageProps){
    return(
        <Alert
        variant={variant?variant:'subtle'}
        status='info'
        bgColor='#D6FAFF'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='flex-start'
        borderRadius='5rem'
        >
            <div className='flex flex-row'>
            <AlertIcon/>
            <AlertTitle fontSize='md'>{title}</AlertTitle>
            </div>
            <div className='flex flex-row w-full items-center justify-between'>
                <AlertDescription fontSize='sm'>{message}</AlertDescription>
                <ButtonSecondaryMedium variant='secondary' className='text-sm'>Copy URL</ButtonSecondaryMedium>
            </div>
        </Alert>
    )
}