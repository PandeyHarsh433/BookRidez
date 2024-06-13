import React, { useEffect, useRef } from "react";
import Booking from "@/components/Booking";
import Carousel from "@/components/Carousel";
import Explore from "@/components/Explore";
import FAQ from "@/components/FAQ";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import LoginModal from "@/components/Loginmodal";
import {
  loginModalState,
  loadingState,
  modalWarningState,
  joinAsCustomerModalState,
} from "@/data/store";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import useClickOutside from "@/hooks/useClickOutside";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import useApiRequest from "@/hooks/useApiRequest";

const Page = () => {
  const [showLoading, setShowLoading] = useRecoilState(loadingState);

  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);
  const [warningModal, setWarningModal] = useRecoilState(modalWarningState);
  const [joinAsCustomerModal, setJoinAsCustomerModal] = useRecoilState(
    joinAsCustomerModalState
  );

  const router = useRouter();
  const modalRef = useRef(null);

  const { error, sendRequest } = useApiRequest();

  useEffect(() => {
    const { query } = router;
    if (showLoginModal) {
      router.push("?login=true");
    }
    if (query?.login === "true" && !showLoginModal) {
      setShowLoginModal(true);
    }
  }, [showLoginModal, router?.query]);

  const closeModal = () => {
    setShowLoginModal(false);
    router.push("/");
  };

  const modalClickOutsideHandler = () => {
    closeModal();
  };

  useClickOutside(modalRef, modalClickOutsideHandler);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    sendRequest("user/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.data && response.data.success) {
          console.log("logged out successfully");
          window.location.reload();
        } else {
          console.log("Error in logging out");
        }
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        setVehicleData([]);
      });
  };
  const handleJoinAsCustomer = () => {
    sendRequest("customer/join", {
      method: "POST",
    })
      .then((response) => {
        if (response.data && response.data.success) {
          console.log("switched to customer successfully");
          window.location.reload();
        } else {
          console.log("Error in switching out");
        }
      })
      .catch((error) => {
        console.error("Error switching role:", error);
      });
  };

  return (
    <div className="relative">
      {warningModal && (
        <Modal warningText={"Are you really want to Logout?"}>
          <button
            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            onClick={() => setWarningModal(false)}
          >
            Cancel
          </button>
          <button
            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Modal>
      )}
      {joinAsCustomerModal && (
        <Modal warningText={"Do you really want to join as customer?"}>
          <button
            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            onClick={() => setJoinAsCustomerModal(false)}
          >
            Cancel
          </button>
          <button
            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
            onClick={handleJoinAsCustomer}
          >
            Join
          </button>
        </Modal>
      )}
      {showLoading && <Loader />}
      {showLoginModal && (
        <div ref={modalRef}>
          <LoginModal onClose={closeModal} />
        </div>
      )}
      <Carousel />
      <Booking />
      <Explore />
      <Featured />
      <FAQ />
    </div>
  );
};

export default Page;
