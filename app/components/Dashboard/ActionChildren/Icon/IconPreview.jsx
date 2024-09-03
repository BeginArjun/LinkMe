import * as TablerIcons from '@tabler/icons-react';

const IconPreview = ({icon, onChange, onRemove})=>{
    const IconComponent = TablerIcons[icon]? TablerIcons[icon]: <></>;
    return(
        <div className='flex justify-between items-center p-2 w-full gap-4'>
            <IconComponent className="w-12 h-12"/>
            <div className='flex flex-col justify-between items-center gap-4 w-full'>
                <button className='bg-[--brand-primary] px-4 py-2 hover:bg-pink-500 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000] w-full rounded-full font-semibold text-white'>Change</button>
                <button className='px-4 py-2 hover:bg-slate-500 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000] rounded-full font-semibold w-full text-black'>Remove</button>
            </div>
        </div>
    )
}

export default IconPreview;