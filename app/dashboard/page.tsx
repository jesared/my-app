/* eslint-disable react/no-unescaped-entities */

import { Notification } from "@/components/notifications/notification";
import { useAuth } from '@/context/auth-context';

export default function Dashboard() {

  // const { session } = useAuth();


  return (
    <>
      <Notification />
    </>
  );
}
