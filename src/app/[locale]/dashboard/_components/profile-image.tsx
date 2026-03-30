import Image from 'next/image';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

// Function generates a number from 1 to 360 depends on the ID
function stringToHslColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return `hsl(${h}, 60%, 60%)`;
}

export default async function ProfileImage() {
  // Session => User Info
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session?.user?.photo ? (
        <Image
          src={session?.user.photo}
          width={48}
          height={48}
          alt="profile photo"
          className="rounded-full"
        />
      ) : (
        <div
          style={{ backgroundColor: stringToHslColor(session?.user._id!) }}
          className="h-12 w-12 capitalize flex justify-center items-center text-3xl font-medium rounded-full"
        >
          {session?.user?.firstName.slice(0, 1)}
        </div>
      )}
    </div>
  );
}
