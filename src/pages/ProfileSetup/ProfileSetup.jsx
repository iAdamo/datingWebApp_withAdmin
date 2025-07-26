import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "./PersonalInfo";
import PartnerPreferences from "./PartnerPreferences";
import Lifestyle from "./Lifestyle";
import PhysicalAppearance from "./PhysicalAppearance";
import MarriagePlans from "./MarriagePlans";
import CareerEducation from "./CareerEducation";
import InterestsHobbies from "./InterestHobbies";
import ProfileImage from "./ProfileImage";
import ProfileBio from "./ProfileBio";

import {
  createUserProfile,
  uploadProfilePhoto,
  updateUserPreferences,
} from "@/utils/api";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateFormData = (newData) => {
    console.log(newData);
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };
  useEffect(
    function () {
      console.log(formData);
    },
    [formData]
  );
  const nextSubStep = (data = {}) => {
    updateFormData(data);
    if (data.gender) {
      updateFormData({ gender: data.gender });
    }

    if (step === 1 && subStep === 1) {
      setSubStep(2);
    } else if (step === 1 && subStep === 2) {
      setStep(2);
      setSubStep(1);
    }
  };

  const prevSubStep = () => {
    if (step === 1 && subStep === 2) {
      setSubStep(1);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
      setSubStep(2);
    }
  };

  const nextStep = (data = {}) => {
    updateFormData(data);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const sanitizeForJSON = (data) => {
    const clean = {};
    for (const [key, value] of Object.entries(data)) {
      if (
        typeof value === "object" &&
        (value instanceof File ||
          value instanceof Blob ||
          value instanceof HTMLElement ||
          value instanceof Window)
      ) {
        continue;
      }
      clean[key] = value;
    }
    return clean;
  };

  const handleFinalSubmit = async (data = {}) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const merged = { ...formData, ...data };
      const cleanedData = sanitizeForJSON(merged);

      const {
        // Partner Preferences
        partnerMaritalStatus,
        partnerHasChildren,
        partnerCountry,
        partnerEmirate,
        partnerNationality,
        partnerBackground,
        partnerVeiled,
        partnerHeight,
        partnerWeight,
        partnerEyeColor,
        partnerHairColor,
        partnerSkinColor,
        partnerSmoker,
        partnerDrinks,
        partnerRelocate,
        partnerPolygamy,
        partnerWantsChildren,
        partnerQualification,
        customPartnerQualification,
        minPartnerQualification,
        customMinPartnerQualification,
        partnerField,
        customPartnerField,
        partnerLocation,
        partnerOccupation,
        similarFinance,
        partnerHobbyPreference,

        // Career & Education
        qualification,
        workField,
        workLocation,
        occupation,
        financialStatus,
        incomeRange,
        languages,

        // Profile Info
        firstName,
        lastName,
        gender,
        dob,
        nationality,
        maritalStatus,
        hasChildren,
        country,
        emirate,
        veiled,
        height,
        weight,
        eyeColor,
        hairColor,
        skinColor,
        smoker,
        drinks,
        relocate,
        polygamy,
        wantsChildren,
        bio,
        hobbies,
        profileImage,
      } = cleanedData;

      const preferencesData = {
        partner_marital_status:
          partnerMaritalStatus?.value || partnerMaritalStatus,
        partner_has_children: partnerHasChildren?.value || partnerHasChildren,
        partner_country: partnerCountry?.value || partnerCountry,
        partner_emirate: partnerEmirate?.value || partnerEmirate,
        partner_nationality: partnerNationality?.value || partnerNationality,
        partner_background: partnerBackground?.value || partnerBackground,
        partner_veiled: partnerVeiled?.value || partnerVeiled,
        partner_height: partnerHeight?.value || partnerHeight,
        partner_weight: partnerWeight?.value || partnerWeight,
        partner_eye_color: partnerEyeColor?.value || partnerEyeColor,
        partner_hair_color: partnerHairColor?.value || partnerHairColor,
        partner_skin_color: partnerSkinColor?.value || partnerSkinColor,
        partner_smoker: partnerSmoker?.value || partnerSmoker,
        partner_drinks: partnerDrinks?.value || partnerDrinks,
        partner_relocate: partnerRelocate?.value || partnerRelocate,
        partner_polygamy: partnerPolygamy?.value || partnerPolygamy,
        partner_wants_children:
          partnerWantsChildren?.value || partnerWantsChildren,
        partner_qualification:
          partnerQualification?.value || partnerQualification,
        custom_partner_qualification: customPartnerQualification || "",
        min_partner_qualification:
          minPartnerQualification?.value || minPartnerQualification,
        custom_min_partner_qualification: customMinPartnerQualification || "",
        partner_field: partnerField?.value || partnerField,
        custom_partner_field: customPartnerField || "",
        partner_location: partnerLocation?.value || partnerLocation,
        partner_occupation: partnerOccupation || "",
        similar_finance: similarFinance?.value || similarFinance,
        partner_hobby_preference: Array.isArray(partnerHobbyPreference)
          ? partnerHobbyPreference.map((h) => h?.value || h)
          : [],
      };

      const userData = {
        first_name: firstName?.value || firstName,
        last_name: lastName?.value || lastName,
        date_of_birth: dob ? new Date(dob).toISOString().split("T")[0] : "",

        gender: gender === "Male" ? "M" : gender === "Female" ? "F" : null,
        marital_status: maritalStatus?.toLowerCase() || null,
        has_children: hasChildren === "Yes" || hasChildren === true,

        country_of_residence: country?.value || country,
        emirate: emirate?.value || emirate,
        nationality: nationality?.value || nationality,
        smoker: smoker === "Yes" || smoker === true,
        veiled: veiled === "Yes" || veiled === true,
        alcohol: drinks === "Yes" || drinks === true,

        has_pets: false,
        has_allergies: false,
        has_disabilities: false,
        disability_description: null,

        height: parseInt(height?.value || height || 0),
        weight: parseInt(weight?.value || weight || 0),

        skin_color: skinColor?.toLowerCase() || null,
        eye_color: eyeColor?.toLowerCase() || null,
        hair_color: hairColor?.toLowerCase() || null,

        marriage_type: null,
        willing_to_go_abroad: relocate === "Yes" || relocate === true,
        open_to_polygamy: polygamy === "Yes" || polygamy === true,
        wants_children: wantsChildren === "Yes" || wantsChildren === true,

        academic_qualification: qualification?.value || qualification || null,
        field_of_work: workField?.value || workField.join(",") || null,
        work_location: workLocation?.value || workLocation || null,
        occupation: occupation?.value || occupation || null,

        financial_status: financialStatus?.value || financialStatus || null,
        monthly_income_range: incomeRange
          ? incomeRange.replace(/\s*–\s*/g, "-").replace(/\s+/g, "")
          : null,

        languages: Array.isArray(languages)
          ? languages.map((lang) => lang?.value || lang).join(", ")
          : typeof languages === "string"
          ? languages
          : "",

        interests: Array.isArray(hobbies)
          ? hobbies.map((h) => h?.value || h).join(", ")
          : "",

        bio: bio || "",
        verified: false,
      };

      console.log("Creating user profile with data:", userData);
      const profileResponse = await createUserProfile(userData);
      console.log("Profile created successfully:", profileResponse);

      if (profileImage && profileImage instanceof File) {
        console.log("Uploading profile image:", profileImage);
        await uploadProfilePhoto(profileImage);
        console.log("Profile image uploaded successfully");
      }

      console.log("Updating partner preferences:", preferencesData);
      await updateUserPreferences(preferencesData);
      console.log("Partner preferences updated successfully");

      alert("Profile submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Profile submission failed:", error);
      if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        alert("Network error. Please check your connection and try again.");
      } else if (
        error.message.includes("401") ||
        error.message.includes("unauthorized")
      ) {
        alert("Authentication error. Please log in again.");
        navigate("/login");
      } else {
        alert(`Failed to submit profile: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 1 && subStep === 1 && (
        <PersonalInfo
          nextStep={nextSubStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 1 && subStep === 2 && (
        <PartnerPreferences
          nextStep={nextStep}
          prevStep={prevSubStep}
          gender={formData.gender}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 2 && (
        <Lifestyle
          nextStep={nextStep}
          prevStep={prevSubStep}
          gender={formData.gender}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <PhysicalAppearance
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 4 && (
        <MarriagePlans
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 5 && (
        <CareerEducation
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && (
        <InterestsHobbies
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 7 && (
        <ProfileBio
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          updateFormData={updateFormData}
          onFinalSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {step === 8 && (
        <ProfileImage
          prevStep={prevStep}
          formData={formData}
          updateFormData={updateFormData}
          onFinalSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
};

export default ProfileSetup;
