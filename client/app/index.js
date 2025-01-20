import { Redirect } from "expo-router";

const Page = () => {
  const isSignedIn = false;

  if (isSignedIn === true) return <Redirect href="/(root)/(tabs)/verify" />;

  return <Redirect href="/(auth)/login" />;
};

export default Page;