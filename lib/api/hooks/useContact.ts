"use client";

import { useApiMutation } from "wire-axon/hooks";
import {
  ContactSchema,
  type ContactSchemaType,
  type ContactResponse,
} from "@/lib/api/utils/contact.schema";
import { BACKEND_URL } from "../constants";

interface UseContactOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

export function useContact(options?: UseContactOptions) {
  const { mutate, isPending, isSuccess, isError, error } =
    useApiMutation<ContactResponse>({
      url: "/contact",
      method: "post",
      baseURL: BACKEND_URL,
      bodyValidator: { bodySchema: ContactSchema },
      toastConfig: {
        successConfig: options?.successToast
          ? { customToast: options.successToast }
          : undefined,
        errorConfig: options?.errorToast
          ? { customToast: options.errorToast }
          : undefined,
      },
    });

  const submitContact = (contactData: ContactSchemaType) => {
    mutate(contactData);
  };

  return {
    submitContact,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
