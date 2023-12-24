'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
    id: number;
    name: string;
    boughtAt: string;
    updatedAt: string;
    capacity: number;
    color: string;
    isSailing: string;
    description: string;
    imageUrl: string;
}

export default function DeleteProduct(product: Product) {
    const [modal, setModal] = useState(false);
    const router = useRouter();


    function handleChange(){
        setModal(!modal);
    }

    async function handleDelete(productId: number){

        await fetch(`http://localhost:5000/products/${productId}`,{
            method: 'DELETE',
        });

        router.refresh();
        setModal(false);
    }

    
    return (
        <div>
            <button onClick={handleChange} className="text-white bg-darkred rounded-md border-2 border-black px-5 py-1 mb-5">DELETE</button>

            {modal && (
                <div className='overlay'>
                    <div className="container fixed bg-white rounded-md text-black p-10">
                        <h3 className="flex font-bold text-lg justify-center">Delete?</h3>
                        
                            <div className="flex gap-4 pt-3 justify-center">
                                <button type="button" onClick={handleChange} className="bg-black text-white px-3 py-1 rounded-lg">Close</button>
                                <button type="submit" onClick={() => handleDelete(product.id)} className="bg-darkred text-white px-3 py-1 rounded-lg">Delete</button>
                            </div>

                    </div>
                </div>
            
            )}
        </div>
    )
}