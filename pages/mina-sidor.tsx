﻿import React from 'react'
import Container from "../components/container"
import Header from "../components/header"
import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import Image from "next/image"
import MinaAvtal from '../public/mina-avtal.svg'
import Rapporter from '../public/rapporter.svg'
import SparadeAvtal from '../public/sparade-avtal.svg'
import arrowRight from '../public/arrow-right.svg'
import Link from "next/link"
import ProfileCard from "../components/profile-card"

function profile() {
  const { data: session } = useSession()

  if (session) {
    let str = session.user.image;
    str.replace("?s=96&d=identicon", "");
    console.log(str);
    return (
      <Layout>
        <Header />
        <Container>
          <div className="flex flex-col items-center my-24">
            <Image
              width={200}
              height={200}
              className="mb-4 rounded-full"
              alt="arrow right"
              src={str.replace("?s=96&d=identicon", "?s=400")} />
              <h2 className="text-4xl font-bold">{session.user.name}</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <ProfileCard 
              Icon={MinaAvtal} 
              LinkText="Visa alla Mina Avtal" 
              Title="Mina Avtal"
            />
            <ProfileCard 
              Icon={SparadeAvtal} 
              LinkText="Visa alla Sparade Avtal" 
              Title="Sparade Avtal"
            />
            <ProfileCard 
              Icon={Rapporter} 
              LinkText="Visa alla Rapporter" 
              Title="Rapporter"
            />
          </div>
        </Container>
      </Layout>
    )
  }
}

export default profile