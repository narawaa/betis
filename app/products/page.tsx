import AddProduct from './add';
import UpdateProduct from './update';
import DeleteProduct from './delete';
import Image from 'next/image';

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

async function getProducts(){
    const res = await fetch('http://localhost:5000/products', {cache: 'no-store'})
    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
    return (
        <div>
            <header className="flex items-center justify-between">
                <a className="text-primary font-bold text-2xl italic" href="">BETI Harbour</a>
                <nav className="flex gap-5 font-semibold">
                    <a href={''} className="bg-primary rounded-md text-black px-5 py-2">Home</a>
                    <a href={'https://betis.cs.ui.ac.id'} 
                    target="_blank" className="bg-primary rounded-md text-black px-5 py-2">Contact Us</a>
                </nav>
            </header>

            <div className="text-center text-primary font-bold p-5 italic mt-10">
                <h2>SHIPS</h2>
            </div>
            
            <AddProduct />

            {products.map((product, index) => (
                <div key={product.id} className="bg-primary p-8 rounded-md mb-10 ">
                    <div className="grid grid-cols-2 gap-7">
                        <div style={{ position: 'relative', width: '100%', minHeight: '280px'}}>
                            <Image src={product.imageUrl} alt="ship" layout="fill" className="rounded-md"/>
                        </div>
                        <div className="text-black">
                            <p>Name : {product.name}</p>
                            <p>Bought at : {product.boughtAt}</p>
                            <p>Updated at : {product.updatedAt}</p>
                            <p>Capacity : {product.capacity}</p>
                            <p>Color : {product.color}</p>
                            <p>Is Sailing : {product.isSailing}</p>
                            <p>Description : {product.description}</p>
                        </div>
                    </div>

                    <nav className="flex gap-5 pt-5 pr-5 justify-end">
                        <UpdateProduct {...product} />
                        <DeleteProduct {...product} />
                </nav> 
                </div>
                ))}

            <h2 className='text-center text-primary font-bold p-5 italic m-20'>Thank You!</h2> 
        </div>
    )
}