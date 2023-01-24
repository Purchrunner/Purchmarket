import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getPrimaryMenu } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Header from "../components/header"
import Link from "next/link"
import arrowRight from '../public/arrow-right.svg'
import OmslagsBild from '../public/omslag.jpg'
import Image from "next/image"

export default function Index({ allPosts: { edges }, menuItems }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <Layout>
      <Header />
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <div className="relative wp-block-cover w-full flex items-center">
        <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
        <div className="text-white z-40 relative container mx-auto px-5">
            <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-bold">För en bättre vård och omsorg</h1>
            <p className="max-w-lg font-semibold leading-8">Vår leverantör av sjukvårdsmaterial. Mediqs sortiment innehåller förbrukningsartiklar och medicintekniska produkter.</p>
        </div>
        <Image 
          fill
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild} />
      </div>
      <Container>
        {/*  <Intro /> */}
        <div className="flex justify-between items-center mt-12 mb-6">
          <h1 className="text-6xl font-bold">Nyheter</h1>
          <Link href="/" className="flex items-center font-bold text-[#17375E]">
            Visa alla nyheter
            <Image 
              width={40}
              height={14}
              className="ml-4"
              alt="arrow right"
              src={arrowRight} />
          </Link>
        </div>
        <div className="flex">
          <div className="flex-1 mr-5">
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.featuredImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
          </div>
          <div className="flex-1">
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const menuItems = await getPrimaryMenu()

  return {
    props: { allPosts, preview, menuItems },
    revalidate: 10,
  }
}
