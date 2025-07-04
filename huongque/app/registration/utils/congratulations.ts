/**
 * Utility function to handle congratulations page logic
 */

export const checkAndShowCongratulations = (registrationId: string, shopName?: string) => {
  // Check if congratulations has already been shown for this registration
  const hasShown = localStorage.getItem(`congratulations_shown_${registrationId}`);
  
  if (!hasShown) {
    // Build the congratulations URL with parameters
    const params = new URLSearchParams();
    params.set('id', registrationId);
    if (shopName) {
      params.set('shopName', shopName);
    }
    
    // Redirect to congratulations page
    const congratsUrl = `/registration/congratulations?${params.toString()}`;
    window.location.href = congratsUrl;
    return true;
  }
  
  return false;
};

export const markCongratulationsAsShown = (registrationId: string) => {
  localStorage.setItem(`congratulations_shown_${registrationId}`, "true");
};

export const hasCongratulationsBeenShown = (registrationId: string): boolean => {
  return localStorage.getItem(`congratulations_shown_${registrationId}`) === "true";
};

// New function to check for newly approved registrations on login
export const checkForNewlyApprovedRegistrations = async (userEmail: string) => {
  try {
    // This should be replaced with your actual API call
    const { getRegistrationsByUser } = await import("@/app/registration/service/regis.service");
    const registrations = await getRegistrationsByUser(userEmail);
    
    // Find approved registrations that haven't shown congratulations yet
    const newlyApproved = registrations.filter((reg: any) => {
      const isApproved = reg.status?.toLowerCase().trim() === 'approved';
      const hasShownCongrats = hasCongratulationsBeenShown(reg.id);
      return isApproved && !hasShownCongrats;
    });
    
    // Show congratulations for the first newly approved registration
    if (newlyApproved.length > 0) {
      const registration = newlyApproved[0];
      return checkAndShowCongratulations(registration.id, registration.shopName);
    }
    
    return false;
  } catch (error) {
    console.error("Error checking for approved registrations:", error);
    return false;
  }
};

// Function to mark a registration as needing congratulations when approved
export const markRegistrationForCongratulations = (registrationId: string) => {
  localStorage.setItem(`pending_congratulations_${registrationId}`, "true");
};

// Function to check if a registration needs congratulations
export const needsCongratulations = (registrationId: string): boolean => {
  return localStorage.getItem(`pending_congratulations_${registrationId}`) === "true";
};

// Function to clear the pending congratulations flag
export const clearPendingCongratulations = (registrationId: string) => {
  localStorage.removeItem(`pending_congratulations_${registrationId}`);
};
