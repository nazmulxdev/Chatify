import { useRef, useState } from "react";
import useGlobalContext from "../../Hooks/useGlobalContext";

const ProfileHeader = () => {
  const { currentUser, logoutHandler, profilePicUploader } = useGlobalContext();
  const [selectImage, setSelectImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogout = async () => {
    await logoutHandler();
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectImage(base64Image);
        await profilePicUploader({ profilePic: base64Image });
      };
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
      <div className="flex items-center space-x-3">
        {/* Profile Picture */}
        <div className="relative">
          <div>
            <button
              className="group relative w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold hover:cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {currentUser?.profilePic || selectImage ? (
                <img
                  src={selectImage || currentUser?.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{currentUser?.fullName.charAt(0)}</span>
              )}

              <div className="absolute rounded-full inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <span className="text-white text-xs">Change</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-100"></div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            ></input>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-base-content">
            {currentUser?.fullName}
          </h2>
          <p className="text-sm text-base-content/70">Online</p>
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-3">
        {/* Sound Icon */}
        <button className="btn btn-ghost btn-circle btn-sm">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
