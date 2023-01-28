﻿import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { GET_USER } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Container from "../components/container";

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export default function LogOut() {
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [
      { query: GET_USER }
    ],
  });
  const loggedOut = Boolean(data?.logout?.status); 

  const router = useRouter();     

  useEffect(() => {
    logOut();
    router.push('/');
  }, [logOut]);

  return (
    <Container>
      <div className="bg-[#DFEDFF] mb-5 p-16 rounded-3xl mt-8">
        {!called || loading ? (
          <h1 className="text-4xl font-black">Loggar ut...</h1>
        ) : error ? (
          <p>{error.message}</p>
        ) : !loggedOut ? (
          <h1 className="text-4xl font-black">Det går inte att logga ut. Ladda om sidan och försök igen.</h1>
        ) : (
          <h1 className="text-4xl font-black">Du har loggats ut.</h1>
        )}
      </div>
    </Container>
  );
}