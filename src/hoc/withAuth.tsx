/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth, useAuthAdmin } from "../hooks/useAuth";

const withAuthAdmin =
  (WrappedComponent): any =>
  (props) => {
    const router = useRouter();
    const isAdmin = useAuthAdmin();

    useEffect(() => {
      if (isAdmin.isLoading === false) {
        if (isAdmin.isAdmin === false) {
          router.replace("/");
        }
      }
    }, [isAdmin, router]);
    WrappedComponent.displayName = "WrappedComponent";
    return <WrappedComponent {...props} />;
  };

const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const isUser = useAuth();

  useEffect(() => {
    if (isUser.isLoading === false) {
      if (isUser.isUser === false) {
        router.replace("/login");
      }
    }
  }, [isUser, router]);

  return <WrappedComponent {...props} />;
};
export { withAuthAdmin, withAuth };
