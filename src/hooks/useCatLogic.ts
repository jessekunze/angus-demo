import { useState, useEffect, useRef } from "react";
import { setupUser, fetchCatCount, updateCatCountInDB } from "../utils/api";
import { getUserIdLocalStorage, setUserIdLocalStorage } from "../utils/storage";

const DEBOUNCE_DELAY = 150;

export const useCatLogic = () => {
  const [catCount, setCatCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pendingCatCount, setPendingCatCount] = useState<number | null>(null);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load Users, Cats when page loads
  useEffect(() => {
    const storedUserId = getUserIdLocalStorage();

    const initializeUser = async () => {
      setIsLoading(true);
      try {
        if (storedUserId) {
          setUserId(storedUserId);
          const data = await fetchCatCount(storedUserId);

          if (data) {
            setCatCount(data.count);
          }
        } else {
          throw new Error("No user ID found, setting up new user");
        }
      } catch (error) {
        console.error("User ID might be invalid, creating a new one...");

        try {
          const newUser = await setupUser();
          if (newUser) {
            setUserId(newUser.userId);
            setUserIdLocalStorage(newUser.userId);
            const data = await fetchCatCount(newUser.userId);
            if (data) setCatCount(data.count);
          }
        } catch {
          setError("Failed to set up user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();

    // Save cat count before unload in case of refresh, etc
    const handleBeforeUnload = () => {
      if (pendingCatCount !== null && userId) {
        updateCatCountInDB(userId, pendingCatCount);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Debounce multiple clicks into fewer API calls
  useEffect(() => {
    if (pendingCatCount !== null && userId) {
      debounceTimeout.current = setTimeout(() => {
        updateCatCountInDB(userId, pendingCatCount)
          .catch(() => setError("Failed to update cat count"));
        debounceTimeout.current = null;
      }, DEBOUNCE_DELAY);

      return () => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      };
    }
  }, [pendingCatCount, userId]);

  // Function: Update Cat Count (Local + API Debounced)
  const changeCatCount = (change: number) => {
    setCatCount((prevCount) => {
      const newCount = Math.max(0, prevCount + change);
      setPendingCatCount(newCount);
      return newCount;
    });
  };

  return { catCount, changeCatCount, isLoading, error };
};