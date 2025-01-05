import { auth, signOut } from "@/auth";
import Link from "next/link";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}

const Header = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div>
      {session?.user ? (
        <SignOut />
      ) : (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
    </div>
  );
};

export default Header;
