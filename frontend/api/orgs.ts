import { fetchUtil } from "@/api/fetch";
import { Organization } from "@/config/dbtypes";

export const addOrganization = async (username: string, email: string) => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/orgs`,
      {
        method: "POST",
        body: { username, email },
      },
    );
    console.log("Organization added successfully", response);
  } catch (error) {
    throw new Error("Error adding Organization");
  }
};

export const fetchOrganization = async (): Promise<Organization[]> => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/orgs`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    throw new Error("Error fetching Organization");
  }
};

export const deleteOrganization = async () => {
  try {
    const response = await fetchUtil(
      `${process.env.NEXT_PUBLIC_API_URL}/orgs`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    throw new Error("Error deleting Organization");
  }
};
