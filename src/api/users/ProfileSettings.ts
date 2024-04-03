import { IEditProfileFormInput } from "../../components/Profile/ProfileSettings";
import { postRequest } from "../api";

export async function editUserSettings(
    modifiedData: Partial<IEditProfileFormInput> 
  ) {
    const url = "/api/users/edit_user_settings";
  
    await postRequest(url, {
      displayName: modifiedData.displayName,
      password: modifiedData.password
    });
  }