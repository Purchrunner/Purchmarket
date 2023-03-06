﻿import Image from "next/image";
import { useState } from "react";
import AvtalCard from "../../../components/avtal-card";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Container from "../../../components/container";
import {
  getAllAvtal,
  getAllLeverantorer,
  getLeverantor,
  getWishList,
} from "../../../lib/api";

export default function LeverantorDetalj({ leverantor, allAvtal, wishList }) {
  const [favorite, setFavorite] = useState(wishList?.productIds);

  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mx-auto mt-16 max-w-2xl">
          {leverantor?.featuredImage?.node?.sourceUrl && (
            <div className="relative mx-auto mb-4 h-48 w-48 rounded-lg border">
              <Image
                fill
                alt={leverantor?.title}
                src={leverantor?.featuredImage?.node?.sourceUrl}
                className="rounded-xl object-contain object-center"
              />
            </div>
          )}
          <h1 className="relative mb-4 text-center text-6xl font-bold">
            {leverantor?.title}
          </h1>
          <div
            className="gutenberg-text mb-8 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: leverantor?.content }}
          />
          <h1 className="relative mb-4 text-6xl font-bold">Avtal</h1>
          {allAvtal?.edges
            .filter((name) => name.node?.avtalstyp?.leverantor !== null)
            .filter(
              (name) =>
                name.node?.avtalstyp?.leverantor[0].title === leverantor?.title
            )
            .map((item) => (
              <AvtalCard
                key={item.node.id}
                productId={item.node.productId}
                title={item.node.title}
                excerpt={item.node.excerpt}
                slug={item.node.slug}
                categories={item.node.productCategories}
                sourceUrl={item.node.featuredImage?.node.sourceUrl}
                setFavorite={setFavorite}
                favorite={favorite}
              />
            ))}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const leverantor = await getLeverantor(params.slug);
  const allAvtal = await getAllAvtal();
  const wishList = await getWishList();

  return { props: { leverantor, allAvtal, wishList } };
}

export async function getStaticPaths() {
  const leverantorWithSlugs = await getAllLeverantorer();
  return {
    paths:
      leverantorWithSlugs.edges.map(
        ({ node }) => `/leverantorer/${node.slug}`
      ) || [],
    fallback: true,
  };
}
