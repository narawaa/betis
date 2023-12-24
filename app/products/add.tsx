'use client';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Ship1 from '/images/Ship1.png';
import Ship2 from '/images/Ship2.png';
import Ship3 from '/images/Ship3.png';
import Ship4 from '/images/Ship4.png';
import Ship5 from '/images/Ship5.png';
import Ship6 from '/images/Ship6.png';

const shipImages = [Ship1, Ship2, Ship3, Ship4, Ship5, Ship6];

export default function AddProduct() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedImage, setImage] = useState(shipImages[0]);
    const router = useRouter();

    const ImageButtons = () => {
        return shipImages.map((image, index) => (
            <label key={index}>
                <input type="radio" checked={selectedImage === image} onChange={() => handleImageChange(image)} />
                <div style={{position: 'relative', width: '150px', height: '150px'}}>
                    <Image src={image} alt={`Ship ${index + 1}`} layout='fill'/>
                </div>
            </label>
        ));
    };
    
    const handleImageChange = (newImage) => {
        setImage(newImage);
    };

    function handleChange(){
        setModal(!modal);
    }

    async function handleSubmit(e: SyntheticEvent){
        e.preventDefault();
        console.log(name, color, description, capacity)

        const currentDate = new Date();
        const boughtAt = currentDate.toDateString();
        const updatedAt = currentDate.toDateString();
        const isSailing = "False";

        await fetch('http://localhost:5000/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                boughtAt: boughtAt,
                updatedAt: updatedAt,
                capacity: capacity,
                color: color,
                isSailing: isSailing,
                description: description,
                imageUrl: selectedImage
            })
        })

        setName('');
        setColor('');
        setDescription('');
        setCapacity('');
        router.refresh();
        setModal(false);
    }


    return (
        <div>
            <button onClick={handleChange} className="text-black font-semibold bg-white rounded-md px-5 py-1 mb-5">Add New Ship</button>

            {modal && (
                <div className="mb-20">
                    <div className="bg-primary rounded-md p-16 text-black">
                        <h3 className="flex font-bold text-lg justify-center">Add New Ship!</h3>
                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="scroller">
                                {ImageButtons()}
                            </div>

                            <div className='mb-5'>
                                <label className="font-bold">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input w-full input-border border-2 border-black rounded-lg px-5 py-2" placeholder="Enter the name of the ship" />
                            </div>

                            <div className='mb-5'>
                                <label className="font-bold">Color</label>
                                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="input w-full input-border border-2 border-black rounded-lg px-5 py-2" placeholder="Enter color"/>
                            </div>

                            <div className='mb-5'>
                                <label className="font-bold">Capacity</label>
                                <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="input w-full input-border border-2 border-black rounded-lg px-5 py-2" placeholder="Enter the capacity of the ship" />
                            </div>

                            <label className="font-bold">Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="input w-full input-border border-2 border-black rounded-lg px-5 py-2 " placeholder="Enter description"/>

                            <div className="flex gap-4 pt-10 justify-center">
                                <button type="button" onClick={handleChange} className="bg-darkred text-white px-3 py-1 rounded-lg">Close</button>
                                <button type="submit" className="bg-black text-white px-3 py-1 rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}