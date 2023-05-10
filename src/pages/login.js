import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    router.push(
      "https://pingfed-stg.freewheel.tv/sp/startSSO.ping?PartnerIdpId=http%3A%2F%2Fwww.okta.com%2Fexk2kelwyxlyzAdO93l7"
    );
  }, []);
  return <div>login</div>;
}
