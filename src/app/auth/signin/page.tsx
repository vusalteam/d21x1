
import { getSession } from "@/services/user"
import Form from "@/components/auth/signin/Form"
import { redirect, useRouter } from "next/navigation";

export default async function SignIn() {
  return (
    <Form />
  )
}
