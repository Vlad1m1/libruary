import { ILanguage } from "@/types/api/ILanguage";
import {
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useGetLanguagesMutation,
  useUpdateLanguageMutation,
} from "@/service/ApiService";
import { store } from "@/store";
import { updateLanguages } from "@/store/reducers/LanguageSlice";
import { useAppSelector } from "@/hooks/redux";

export default class LanguageService {
  static getLanguages() {
    const [getLanguages] = useGetLanguagesMutation();

    return async (updateStore = false) => {
      try {
        const response = await getLanguages(null).unwrap();

        if (updateStore) {
          store.dispatch(updateLanguages(response));
        }

        return response as ILanguage[];
      } catch (err) {}
    };
  }

  static updateLanguages() {
    const [updateLangs] = useUpdateLanguageMutation();

    const languages = useAppSelector((state) => state.languagesReducer);

    return async (
      data: Pick<ILanguage, "code" | "value" | "id">,
      updateStore = false,
    ) => {
      try {
        const response = await updateLangs(data).unwrap();

        const newLanguages = languages.map((lang) =>
          lang.id === response.id ? response : lang,
        );

        if (updateStore) {
          store.dispatch(updateLanguages(newLanguages));
        }

        return response;
      } catch (err) {}
    };
  }

  static createLanguage() {
    const [createLang] = useCreateLanguageMutation();

    const languages = useAppSelector((state) => state.languagesReducer);

    return async (
      data: Pick<ILanguage, "value" | "code">,
      updateStore: boolean = false,
    ) => {
      try {
        const response = await createLang(data).unwrap();

        if (updateStore) {
          const newLanguages = [...languages, response];

          store.dispatch(updateLanguages(newLanguages));
        }

        return response;
      } catch (err) {}
    };
  }

  static deleteLanguage() {
    const [deleteLang] = useDeleteLanguageMutation();

    const languages = useAppSelector((state) => state.languagesReducer);

    return async (
      data: Pick<ILanguage, "id">,
      updateStore: boolean = false,
    ) => {
      try {
        const response = await deleteLang(data).unwrap();

        if (updateStore) {
          const newLanguages = [
            ...languages.filter((lang) => lang.id !== data.id),
          ];

          store.dispatch(updateLanguages(newLanguages));
        }

        return response;
      } catch (err) {}
    };
  }
}
