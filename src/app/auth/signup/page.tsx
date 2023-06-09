import { getSession } from "@/services/user";
import Form from "@/components/auth/signup/Form";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getSession();
  if (session) redirect("/");
  return <Form/>;
}
