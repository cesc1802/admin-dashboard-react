import React from "react";
import { useTranslation } from "react-i18next";

import { Input, Label } from "@/components/form-inputs";

interface LoginFormProps {
  onLoginSuccess?: VoidFunction;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoginSuccess?.();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="form-control w-full">
          <Label htmlFor="username">{t("features.login.username")}</Label>
          <Input id="username" placeholder="example@example.com" />
        </div>
        <div className="form-control w-full">
          <Label htmlFor="password">{t("features.login.password")}</Label>
          <Input id="password" type="password" autoComplete="on" placeholder="welcomeBack!@2022" />
        </div>
      </div>
      <div className="my-3 text-end">
        <button
          onClick={(event) => {
            event.preventDefault();
          }}
          className="btn btn-link p-0 font-normal normal-case text-base-content/50 hover:text-primary hover:no-underline"
        >
          {t("features.login.buttons.forgotPassword")}
        </button>
      </div>
      <div>
        <button type="submit" className="btn btn-primary btn-block">
          {t("features.login.buttons.login")}
        </button>
      </div>
    </form>
  );
};

export default React.memo(LoginForm);
