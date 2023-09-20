﻿import Container from "../components/container";
import MinaAvtal from "../public/mina-avtal.svg";
import KundNummer from "../public/mina-kundnummer.svg";
import Rapporter from "../public/rapporter.svg";
import SparadeAvtal from "../public/sparade-avtal.svg";
import ProfileCard from "../components/profile-card";
import ProfileInfo from "../components/profile-info";
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import AuthContent from "../components/AuthContent";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Profile() {
  return (
    <AuthContent>
      <Breadcrumbs />
      <Container>
        <ProfileInfo />
        <div className="mb-16 flex justify-center">
          <Link
            href="/installningar"
            className="mr-4 flex items-center rounded-full border border-gray-200 
            bg-white px-8 py-3 font-bold hover:bg-gray-200"
          >
            <Cog8ToothIcon className="mr-2 h-6 w-6 text-gray-900" />
            Inställningar
          </Link>
          <Link
            href="/logout"
            className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-3 font-bold hover:bg-gray-200 sm:px-8"
          >
            <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 text-gray-900" />
            Logga ut
          </Link>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-4">
          <ProfileCard
            Icon={MinaAvtal}
            Linkto="/avtal"
            LinkText="Visa alla inköpsavtal"
            Title="Hitta inköpsavtal"
          />
          <ProfileCard
            Icon={SparadeAvtal}
            Linkto="/sparade-avtal"
            LinkText="Visa alla sparade avtal"
            Title="Sparade avtal"
          />
          <ProfileCard
            Icon={Rapporter}
            Linkto="/rapporter"
            LinkText="Visa alla rapporter"
            Title="Rapporter"
          />
          <ProfileCard
            Icon={KundNummer}
            Linkto="/kundnummer"
            LinkText="Visa mina kundnummer"
            Title="Kundnummer"
          />
        </div>
      </Container>
    </AuthContent>
  );
}
