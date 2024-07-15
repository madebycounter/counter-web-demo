import { getProducts } from "@/lib/shopify";

export default async function Home() {
    const data = await getProducts({});

    console.log(data[0].images);

    return <main>hey</main>;
}
