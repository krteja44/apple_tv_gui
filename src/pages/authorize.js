import React, { useEffect, useState } from "react";

export default function Authorize({ authenticated, refValue, response }) {
  const [referenceValue, setReferenceValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authenticated);
  }, [authenticated]);

  useEffect(() => {
    setReferenceValue(refValue);
  }, [refValue]);

  return (
    <>
      {referenceValue ? (
        <>
          {loading ? (
            <div>
              Getting session from the Backend, for reference ID ={" "}
              {referenceValue}
            </div>
          ) : (
            <>
              {isAuthenticated ? (
                <div>Authenticated!</div>
              ) : (
                <div>Login Again!</div>
              )}
            </>
          )}
        </>
      ) : (
        <div>No reference ID provided, please try again!</div>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  if (!query.ref) {
    // TODO: Throw error for insufficient data
    return {
      redirect: {
        destination: "/404",
      },
    };
  }
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ REF: query.ref }),
    });
    if (data) {
      const response = await data.json();
      return {
        props: {
          refValue: query.ref,
          authenticated: true,
          response,
        },
      };
    } else {
      console.log("here----");
      return {
        redirect: {
          destination: "/500",
        },
      };
    }
  } catch (error) {
    console.log("something bad happend!!!", error);
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
}
