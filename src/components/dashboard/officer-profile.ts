/** Posting details for the signed-in officer. Mock until a profile table exists. */
export interface OfficerPosting {
  policeStation: string;
  area: string;
  district: string;
  state: string;
  country: string;
}

export const officerPosting: OfficerPosting = {
  policeStation: "Shivaji Nagar Police Station",
  area: "Shivaji Nagar",
  district: "Pune",
  state: "Maharashtra",
  country: "India",
};
