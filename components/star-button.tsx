﻿import { gql, useMutation } from "@apollo/client";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ADD_FAVORITE = gql`
  mutation ADD_FAVORITE($productId: Int!) {
    addToWishlist(input: { productId: $productId }) {
      added
      clientMutationId
      error
      productId
      wishlistProductIds
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation REMOVE_FAVORITE($productId: Int!) {
    removeFromWishlist(input: { productId: $productId }) {
      productId
    }
  }
`;

export default function StarButton({ productId, icon, wishList }) {
  const [favoriteAdd] = useMutation(ADD_FAVORITE);
  const [favoriteRemove] = useMutation(REMOVE_FAVORITE);
  const [favorite, setFavorite] = useState(wishList.productIds);

  //const router = useRouter();
  //console.log("wishlist", favorite);

  /* useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]); */

  const toggleAvtal = () => {
    if (favorite.includes(productId)) {
      toast.success("Avtalet har tagits bort");
      favoriteRemove({ variables: { productId: productId } });
      setFavorite((prevFavorite) =>
        prevFavorite.filter((id) => id !== productId)
      );
      //refetch();
      //router.reload();
    } else {
      toast.success("Avtalet är sparat");
      favoriteAdd({ variables: { productId: productId } });
      setFavorite((prevFavorite) => [...prevFavorite, productId]);
      //refetch();
      //router.reload();
    }
  };

  return (
    <div>
      {icon === true ? (
        <button
          onClick={toggleAvtal}
          className="absolute top-0 right-0 h-6 w-6 cursor-pointer text-yellow-500"
        >
          {favorite?.includes(productId) ? (
            <StarIcon className="h-6 w-6 text-[#FFAB57]" />
          ) : (
            <StarIconOutline className="h-6 w-6 text-[#FFAB57]" />
          )}
        </button>
      ) : (
        <button
          onClick={toggleAvtal}
          className="flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-6 py-3 font-bold text-gray-900 hover:bg-gray-200"
        >
          {favorite?.includes(productId) ? (
            <div className="flex">
              <StarIcon className="mr-2 h-6 w-6 text-[#FFAB57]" />
              Sparat
            </div>
          ) : (
            <div className="flex">
              <StarIconOutline className="mr-2 h-6 w-6 text-[#FFAB57]" />
              Spara avtal
            </div>
          )}
        </button>
      )}
    </div>
  );
}
