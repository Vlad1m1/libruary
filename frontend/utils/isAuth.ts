import TokenService from "@/service/TokenService";

export const isAuth = () => {
  try {
    if (!localStorage.getItem("refresh_token")) return false;

    if (localStorage.getItem("token")) {
      TokenService.refresh();
    }

    return true;
  } catch (e: any) {
    return false;
  }
};
