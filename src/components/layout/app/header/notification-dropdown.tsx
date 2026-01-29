'use client';

import { useInfiniteQuery  } from '@tanstack/react-query';
import { Bell, BrushCleaning, CheckCheck, BellOff, EllipsisVertical, Check, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import getAllNotifications from '@/lib/actions/getallnotification.api';
import deleteNotification from '@/lib/actions/deletenotification.action';
import markAsReadNotification from '@/lib/actions/markasreadnotification.action';
import clearAllNotifications from '@/lib/actions/clearallnotifications.action';
import markAllAsRead from '@/lib/actions/markallasread.actions';
import { NotificationType } from '@/lib/types/notification-schema';

export default function NotificationDropDown() {
 const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => getAllNotifications(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.metadata?.currentPage === lastPage?.metadata?.totalPages) return undefined;
        return lastPage.metadata.currentPage + 1;
      }
  });

  
  const notifications = data?.pages
    .flatMap((page) => page?.notifications || [])
    .map((notification: NotificationType) => notification) ?? [];

   

  return (

    <div className="container text-center m-auto ">

      <DropdownMenu modal={true}>
        <DropdownMenuTrigger className="m-auto">
          <Bell />
        </DropdownMenuTrigger>
        <DropdownMenuContent id="scrollableDiv" className="w-80 h-fit mr-4 overflow-y-auto">
          <div className="bg-maroon-700 text-white px-5 py-3 font-semibold flex items-center gap-1">
            <span>Notifications</span>
            <span className="text-sm opacity-90">({notifications.length})</span>
          </div>

          <div className=" flex justify-between text-sm h-10 pt-3 bg-white ">
            <button
              onClick={async () => {
                await clearAllNotifications();
              }}
              className="flex gap-1 text-red-600 hover:text-red-800"
            >
              <BrushCleaning  />
              Clear All notifications
            </button>

            <button
              onClick={async () => {
                await markAllAsRead();
              }}
              className="flex"
            >
              <CheckCheck  />
              Mark All as Read
            </button>
          </div>

           {/* Notification List with Infinite Scroll */}
                <InfiniteScroll
        dataLength={notifications.length}
         next={fetchNextPage}
          hasMore={hasNextPage}
           loader={<div className="py-6 text-center">Loading..</div>}
            scrollableTarget="scrollableDiv"   
           endMessage={
               <p className="py-6 text-center text-muted-foreground">
            No more notifications
             </p>
            }
          >
            {/* Loading State, Empty State, and Notification Items  */}
          {isLoading ? (
            <div className="p-4 space-y-4">
                <div  className="flex gap-3 px-4 py-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <BellOff className="mx-auto mb-4 scale-125 opacity-70" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <>
              {notifications.map((notification) => (
                <div key={notification._id}>
                  <div className="px-5 py-3 w-80 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.body}
                        </p>
                      </div>
        {/* Dropdown Menu for Each Notification */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1">
                            <EllipsisVertical  />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={async () => {
                              await markAsReadNotification([notification._id]);
                            }}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-700"
                            onClick={async () => {
                              await deleteNotification(notification._id);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete notification
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <DropdownMenuSeparator className=" w-full bg-gray-300" />
                </div>
              ))}
            </>
          )}
          </InfiniteScroll>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
