import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

import { UploadProfilePhoto } from './upload-profile-photo';
import { UserProfileForm } from './user-profile-form';

export async function ProfileFormContainer() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex flex-col gap-4 w-full">
      <UploadProfilePhoto
        initialUrl={user?.photo}
        fallbackText={user?.firstName?.[0]}
      />

      <UserProfileForm user={user!} />
    </div>
  );
}
