import { IEditProfileFormInput } from "../../components/Profile/ProfileSettings";
import { putRequest } from "../api";

export async function editUserSettings(
    modifiedData: Partial<IEditProfileFormInput> 
  ) {
    const url = "/api/user/edit_user_settings";
  
    await putRequest(url, {
      displayName: modifiedData.displayName,
      password: modifiedData.password
    });
  }