import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { BlogContext } from "../Context/blogContext";
import ProfileSidebar from "../Components/ProfileSidebar";
import UserBlogs from "../Components/UserBlogs";
import UserBooks from "../Components/UserBooks";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { blogs, getMyBlogs } = useContext(BlogContext);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (user) {
      getMyBlogs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Please login to view profile.
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 h-full">

        {/* LEFT SIDE - Sidebar sticky */}
        <div className="col-span-1 sticky top-10 h-[calc(100vh-4rem)]">
          <ProfileSidebar />
        </div>

        {/* RIGHT SIDE - Scrollable content */}
        <div className="col-span-2 flex flex-col overflow-y-auto space-y-12 pr-2 hide-scrollbar h-[calc(100vh-4rem)]">
          <UserBlogs
            blogs={blogs}
            isVerified={user?.isAccountVerified}
            showAll={showAll}
            setShowAll={setShowAll}
          />

          <UserBooks />
        </div>
      </div>
    </div>
  );
};

export default Profile;