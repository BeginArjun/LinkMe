'use client'
import { Reorder } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import LinkItem from "../Link";
import { useSelector } from "react-redux";
import { Links } from "@prisma/client";
import { RootState } from "../../../../redux/store";

export default function LinkList() {
    const link = useSelector((state : RootState) => state.links as Links[]);
    const [isPending, startTransition] = useTransition();

    const [links, setLinks] = useState<Links[]>([]);

    useEffect(()=>{
        startTransition(() => {
            setLinks(link);
        })
    },[link])

    return (
        <Reorder.Group axis="y" values={links} onReorder={setLinks} className="flex flex-col gap-4">
            {links.map((link) => (
                <LinkItem key={link.id} link={link} />
            ))}
        </Reorder.Group>
    );
}