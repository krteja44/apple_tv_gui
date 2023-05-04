import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Authorize() {
  const [referenceValue, setReferenceValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.ref) {
      setReferenceValue(router.query.ref);
      getUserAuthStatus(router.query.ref);
    }
  }, [router.query]);

  const getUserAuthStatus = async (ref) => {
    const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ REF: ref }),
    });
    if (data) {
      const response = await data.json();
      setLoading(false);
      setIsAuthenticated(true);
    }
  };

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
